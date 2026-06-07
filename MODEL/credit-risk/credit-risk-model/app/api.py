# app/api.py
from __future__ import annotations

from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Dict, Any, Iterable
from pathlib import Path
import sys, io
import pandas as pd
import numpy as np

# ==========================================================
# Adjust PATHs for Pylance and API execution
# - ALWAYS run from the project root:
#     python -m uvicorn app.api:app --reload --port 8000
# - Ensure scripts/__init__.py exists (empty)
# ==========================================================
ROOT = Path(__file__).resolve().parents[1]   # repo root (contains app/ and scripts/)
SCRIPTS = ROOT / "scripts"
for p in (ROOT, SCRIPTS):
    sp = str(p)
    if sp not in sys.path:
        sys.path.append(sp)

# Import core preprocessing functions
from scripts.preprocess import load_artifacts, assign_band  # always exists
try:
    from scripts.preprocess import score_with_decision      # may not exist in older versions
except Exception:
    score_with_decision = None

# ----------------------------------------------------------
# Load artifacts (preprocessor, model, calibrator, schema)
# ----------------------------------------------------------
ART = Path(__file__).resolve().parents[1] / "artifacts"
# {'preprocessor','model','calibrator','feature_names','raw_schema','bands_meta'}
ART_DATA = load_artifacts(ART)
PREP = ART_DATA["preprocessor"]
MODEL = ART_DATA["model"]
CAL  = ART_DATA["calibrator"]
SCHEMA = ART_DATA["raw_schema"]                 # raw schema
FEATURE_NAMES = ART_DATA.get("feature_names")   # transformed names (may not match)
BANDS_META = ART_DATA["bands_meta"]
THRESH = float(BANDS_META["threshold"]["value"])
BANDS_SCHEMA = BANDS_META["bands"]["schema"]

def _calibrate(prob: np.ndarray) -> np.ndarray:
    """Uses the isotonic calibrator (transform/predict according to saved object)."""
    if hasattr(CAL, "transform"):
        return CAL.transform(prob)
    if hasattr(CAL, "predict"):
        return CAL.predict(prob)
    raise RuntimeError("Calibrator has no transform/predict method.")

def _predict_proba_with_optional_names(Xt, df_cols: List[str]) -> np.ndarray:
    """
    Attempts prediction using a DataFrame with feature names (if size matches).
    If not, predicts directly with the array (avoids shape errors).
    """
    n_feats = Xt.shape[1]
    names = None

    # 1) Try artifact feature names
    if isinstance(FEATURE_NAMES, list) and len(FEATURE_NAMES) == n_feats:
        names = [str(c) for c in FEATURE_NAMES]
    else:
        # 2) Try preprocessor
        if hasattr(PREP, "get_feature_names_out"):
            try:
                candidate = PREP.get_feature_names_out(df_cols)
                if len(candidate) == n_feats:
                    names = [str(c) for c in candidate]
            except Exception:
                names = None

    if names is not None:
        X_dense = Xt.toarray() if hasattr(Xt, "toarray") else Xt
        X_df = pd.DataFrame(X_dense, columns=names)
        return MODEL.predict_proba(X_df)[:, 1]

    # fallback: predict with matrix directly (no names)
    return MODEL.predict_proba(Xt)[:, 1]

def _score_core(df_raw: pd.DataFrame) -> pd.DataFrame:
    """
    Fallback if 'score_with_decision' does not exist in preprocess.
    Ensures columns, transforms, predicts, calibrates, applies bands and decision.
    """
    df = df_raw.copy()
    for c in SCHEMA:
        if c not in df.columns:
            df[c] = np.nan
    df = df[SCHEMA]

    Xt = PREP.transform(df)
    pd_raw = _predict_proba_with_optional_names(Xt, df.columns.tolist())
    pd_cal = _calibrate(pd_raw)

    decision = np.where(pd_cal >= THRESH, "Decline/Review", "Approve")
    band = [assign_band(v, BANDS_SCHEMA) for v in pd_cal]

    out = pd.DataFrame(
        {
            "pd_raw": pd_raw,
            "pd_calibrated": pd_cal,
            "band": band,
            "decision": decision,
        }
    )
    if "SK_ID_CURR" in df_raw.columns:
        out.insert(0, "SK_ID_CURR", df_raw["SK_ID_CURR"].values)
    return out

def score_df(df_raw: pd.DataFrame) -> pd.DataFrame:
    """Routes to central preprocess function (if exists) or uses local fallback."""
    if callable(score_with_decision):
        return score_with_decision(df_raw, ART_DATA)
    return _score_core(df_raw)

# ------------------------------
# Input sanitization
# ------------------------------
ALLOWED_KEYS = set(SCHEMA) | {"SK_ID_CURR"}  # SK_ID_CURR is optional

def _sanitize_scalar(v: Any) -> Any:
    """Ensures simple scalar; empty strings become NaN; lists/dicts discarded."""
    if isinstance(v, (list, dict, tuple, set)):
        return np.nan
    if v == "" or v is None:
        return np.nan
    return v

def sanitize_row(row: Dict[str, Any]) -> Dict[str, Any]:
    """Keeps only known columns, normalizes values, returns cleaned dict."""
    clean = {}
    for k, v in row.items():
        if k in ALLOWED_KEYS:
            clean[k] = _sanitize_scalar(v)
    return clean

def ensure_any_feature(rows: Iterable[Dict[str, Any]]) -> None:
    """
    Validates that at least ONE known feature column exists (besides SK_ID_CURR).
    Prevents empty/irrelevant requests.
    """
    for r in rows:
        keys = set(r.keys()) - {"SK_ID_CURR"}
        if len(keys & set(SCHEMA)) > 0:
            return
    raise HTTPException(status_code=422, detail="No known feature was provided.")

# ------------------------------
# Pydantic Models (with Swagger examples)
# ------------------------------
class Record(BaseModel):
    data: Dict[str, Any] = Field(
        ...,
        description="Raw application fields to be scored. Unknown columns are ignored."
    )
    model_config = ConfigDict(
        json_schema_extra={
            "examples": [
                {
                    "data": {
                        "SK_ID_CURR": 100001,
                        "NAME_CONTRACT_TYPE": "Cash loans",
                        "CODE_GENDER": "M",
                        "FLAG_OWN_CAR": "Y",
                        "AMT_CREDIT": 450000,
                        "AMT_INCOME_TOTAL": 180000,
                        "DAYS_EMPLOYED": -1200,
                        "DAYS_BIRTH": -15000
                    }
                }
            ]
        }
    )

class Batch(BaseModel):
    rows: List[Dict[str, Any]] = Field(
        ...,
        description="List of records (each item is a dict with features)."
    )
    model_config = ConfigDict(
        json_schema_extra={
            "examples": [
                {
                    "rows": [
                        {
                            "SK_ID_CURR": 100001,
                            "NAME_CONTRACT_TYPE": "Cash loans",
                            "AMT_CREDIT": 450000
                        },
                        {
                            "SK_ID_CURR": 100002,
                            "NAME_CONTRACT_TYPE": "Revolving loans",
                            "AMT_CREDIT": 180000
                        }
                    ]
                }
            ]
        }
    )

# ------------------------------
# FastAPI app
# ------------------------------
app = FastAPI(
    title="Credit Risk Scoring API",
    description=(
        "Credit risk scoring service (Home Credit) with "
        "preprocessing, LGBM model, and isotonic calibration. "
        "Use /docs to test."
    ),
    version="1.0.0"
)

# ------------------------------
# Routes
# ------------------------------
@app.get("/health", tags=["Health"], summary="Service status")
def health():
    """Returns service status and current threshold used in decision."""
    return {"status": "ok", "threshold": THRESH}

@app.post("/score_one", tags=["Scoring"], summary="Score a single record (JSON)")
def score_one(item: Record):
    """
    Receives a dictionary of applicant fields, sanitizes, scores, and returns:
    - `pd_raw`: raw model probability
    - `pd_calibrated`: calibrated probability (PD)
    - `band`: risk band
    - `decision`: decision based on threshold (Approve / Decline/Review)
    """
    row = sanitize_row(item.data)
    ensure_any_feature([row])
    df = pd.DataFrame([row])
    res = score_df(df)
    return res.to_dict(orient="records")[0]

@app.post("/score_batch", tags=["Scoring"], summary="Score multiple records (JSON)")
def score_batch(batch: Batch):
    """
    Receives a list of dictionaries with applicant fields, sanitizes and scores all.
    Returns an object with `n` and `rows`.
    """
    rows = [sanitize_row(r) for r in batch.rows]
    ensure_any_feature(rows)
    df = pd.DataFrame(rows)
    res = score_df(df)
    return {"n": len(res), "rows": res.to_dict(orient="records")}

@app.post(
    "/score-file",
    tags=["Scoring"],
    summary="Upload CSV and download scored CSV",
    description=(
        "Receives a CSV file with columns (partially) compatible with the training schema "
        "and returns a CSV with columns `pd_raw`, `pd_calibrated`, `band`, `decision`."
    )
)
async def score_file(file: UploadFile = File(..., description="CSV of applications to score")):
    # Read CSV into DataFrame (tries to auto-detect separator)
    try:
        content = await file.read()
        if not content:
            raise HTTPException(status_code=400, detail="Empty file.")
        # Attempt 1: auto separator detection
        try:
            df = pd.read_csv(io.BytesIO(content), sep=None, engine="python", low_memory=False)
        except Exception:
            # Attempt 2: default comma separator
            df = pd.read_csv(io.BytesIO(content), low_memory=False)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to read CSV: {e}")

    # Sanitize unknown columns / composite values
    keep_cols = list((set(df.columns) & set(SCHEMA)) | {"SK_ID_CURR"})
    if not keep_cols:
        raise HTTPException(status_code=422, detail="CSV does not contain any known column.")
    df = df[keep_cols].copy()
    for c in df.columns:
        df[c] = df[c].map(_sanitize_scalar)

    # Ensure at least one known feature exists in any row
    ensure_any_feature(df.to_dict(orient="records"))

    # Scoring
    scored = score_df(df)

    # Return as CSV via streaming
    buf = io.StringIO()
    scored.to_csv(buf, index=False)
    buf.seek(0)
    headers = {"Content-Disposition": 'attachment; filename="scored_applications.csv"'}
    return StreamingResponse(iter([buf.getvalue()]), media_type="text/csv", headers=headers)

@app.get("/", include_in_schema=False)
def root():
    return {
        "message": "Credit Risk Scoring API. Access /docs for Swagger UI.",
        "docs": "/docs",
        "health": "/health"
    }
