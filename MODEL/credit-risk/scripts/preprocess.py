from __future__ import annotations

from pathlib import Path
from typing import Dict, Any, List
import json
import joblib
import numpy as np
import pandas as pd

ROOT = Path(__file__).resolve().parents[1]  # repository root
ART = ROOT / "artifacts"

REQUIRED = [
    "preprocessor.joblib",
    "lgbm_model.joblib",
    "isotonic.joblib",
    "train_columns.csv",          # names of transformed features (ideal)
    "thresholds_bands.json",      # thresholds + bands + raw schema
]


def _assert_artifacts(art_dir: Path = ART) -> None:
    missing = [f for f in REQUIRED if not (art_dir / f).exists()]
    if missing:
        raise FileNotFoundError(
            f"Missing artifacts in {art_dir}: {missing}. "
            "Train/extract the artifacts (notebook or train_model.py) "
            "or copy the correct artifacts folder."
        )


def _load_feature_names(art_dir: Path) -> List[str]:
    """
    Reads train_columns.csv containing the NAMES OF TRANSFORMED FEATURES
    (output of the preprocessor) to align during predict_proba.
    Accepts:
      - CSV with one column (list format)
      - CSV with multiple columns (uses header)
    """
    df = pd.read_csv(art_dir / "train_columns.csv")
    if df.shape[1] == 1:
        col = df.columns[0]
        return df[col].astype(str).tolist()
    return df.columns.astype(str).tolist()


def _load_raw_schema(bands_meta: Dict[str, Any]) -> List[str]:
    """
    Retrieves the raw schema (list of input columns before preprocessing)
    from thresholds_bands.json (key 'schema.raw_schema').
    """
    schema = bands_meta.get("schema", {})
    raw_schema = schema.get("raw_schema")
    if not raw_schema or not isinstance(raw_schema, list):
        raise KeyError(
            "Could not find 'schema.raw_schema' in thresholds_bands.json. "
            "Include the list of raw columns used during training in "
            "bands_meta['schema']['raw_schema']."
        )
    return [str(c) for c in raw_schema]


def load_artifacts(art_dir: Path = ART) -> Dict[str, Any]:
    """
    Loads artifacts for scoring:
      - preprocessor, model, calibrator
      - feature_names (transformed)
      - raw_schema (input features)
      - bands_meta (thresholds and bands)
    """
    _assert_artifacts(art_dir)

    preprocessor = joblib.load(art_dir / "preprocessor.joblib")
    model = joblib.load(art_dir / "lgbm_model.joblib")
    calibrator = joblib.load(art_dir / "isotonic.joblib")

    feature_names = _load_feature_names(art_dir)

    with open(art_dir / "thresholds_bands.json", "r", encoding="utf-8") as f:
        bands_meta = json.load(f)

    raw_schema = _load_raw_schema(bands_meta)

    return {
        "preprocessor": preprocessor,
        "model": model,
        "calibrator": calibrator,
        "feature_names": feature_names,  # transformed features (ideally matches X_t.shape[1])
        "raw_schema": raw_schema,        # raw input features
        "bands_meta": bands_meta,
    }


def assign_band(pd_value: float, bands_schema: List[Dict[str, Any]]) -> str:
    """Returns the band name based on lower/upper limits."""
    for b in bands_schema:
        lo = b.get("lower", float("-inf"))
        hi = b.get("upper", float("inf"))
        if lo <= pd_value < hi:
            return b["name"]
    return bands_schema[-1]["name"]


def _calibrate(calibrator: Any, pd_raw: np.ndarray) -> np.ndarray:
    """Applies isotonic calibration; supports transform() or predict()."""
    if hasattr(calibrator, "transform"):
        return calibrator.transform(pd_raw)
    if hasattr(calibrator, "predict"):
        return calibrator.predict(pd_raw)
    raise RuntimeError("Calibrator has no transform/predict method.")


def _best_feature_names(art: Dict[str, Any], X_t, df: pd.DataFrame) -> List[str] | None:
    """
    Attempts to find feature names matching X_t.shape[1].
    Order:
      1) art['feature_names'] if length matches
      2) preprocessor.get_feature_names_out(df.columns) if available and matches
      3) None (fallback to matrix-only inference)
    """
    n_feats = X_t.shape[1]

    # 1) Feature list from artifacts (train_columns.csv)
    feat_names = art.get("feature_names")
    if isinstance(feat_names, list) and len(feat_names) == n_feats:
        return [str(c) for c in feat_names]

    # 2) Try from preprocessor
    prep = art.get("preprocessor")
    if hasattr(prep, "get_feature_names_out"):
        try:
            candidate = prep.get_feature_names_out(df.columns)
            if len(candidate) == n_feats:
                return [str(c) for c in candidate]
        except Exception:
            pass

    # 3) No reliable names
    return None


def score_df(df_raw: pd.DataFrame, art: Dict[str, Any]) -> pd.DataFrame:
    """
    Takes RAW DataFrame and returns:
      - pd_raw, pd_calibrated, band
      (Keeps SK_ID_CURR if present.)
    """
    # 1) Ensure raw schema order/presence
    df = df_raw.copy()
    for c in art["raw_schema"]:
        if c not in df.columns:
            df[c] = np.nan
    df = df[art["raw_schema"]]

    # 2) Transform features
    X_t = art["preprocessor"].transform(df)

    # 3) Convert to dense if needed
    if hasattr(X_t, "toarray"):
        X_dense = X_t.toarray()
    else:
        X_dense = X_t

    # 4) Try to assign feature names
    names = _best_feature_names(art, X_t, df)
    if names is not None:
        X_infer = pd.DataFrame(X_dense, columns=names)
        pd_raw = art["model"].predict_proba(X_infer)[:, 1]
    else:
        pd_raw = art["model"].predict_proba(X_dense)[:, 1]

    # 5) Calibration
    pd_cal = _calibrate(art["calibrator"], pd_raw)

    # 6) Band assignment
    bands_schema = art["bands_meta"]["bands"]["schema"]
    bands = [assign_band(v, bands_schema) for v in pd_cal]

    # 7) Output (preserve SK_ID_CURR if exists)
    out = pd.DataFrame({
        "pd_raw": pd_raw,
        "pd_calibrated": pd_cal,
        "band": bands,
    })
    if "SK_ID_CURR" in df_raw.columns:
        out.insert(0, "SK_ID_CURR", df_raw["SK_ID_CURR"].values)

    return out


def score_records(records: List[Dict[str, Any]], art: Dict[str, Any]) -> pd.DataFrame:
    """Helper to score a list of JSON records."""
    return score_df(pd.DataFrame.from_records(records), art)