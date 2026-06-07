# app/streamlit_app.py
from __future__ import annotations

import sys
from pathlib import Path
import pandas as pd
import numpy as np
import streamlit as st

# ==== PATHs ====
ROOT = Path(__file__).resolve().parents[2]
SCRIPTS = ROOT / "scripts"
for p in (ROOT, SCRIPTS):
    sp = str(p)
    if sp not in sys.path:
        sys.path.append(sp)

# Reuse core logic (avoid code duplication)
from scripts.preprocess import load_artifacts, score_df  # type: ignore

st.set_page_config(page_title="Credit Risk Dashboard", layout="wide")

# ===== Load artifacts once =====
@st.cache_resource
def _load():
    art = load_artifacts(ROOT /"credit-risk-model"/ "artifacts")  # {'preprocessor','model','calibrator','feature_names','raw_schema','bands_meta'}
    return art

ART = _load()
PREP = ART["preprocessor"]
MODEL = ART["model"]
CAL = ART["calibrator"]
RAW_SCHEMA = ART["raw_schema"]
FEATS = ART.get("feature_names")  # can be None
BANDS_META = ART["bands_meta"]
THR = float(BANDS_META["threshold"]["value"])
BANDS = BANDS_META["bands"]["schema"]

def band_of(p: float) -> str:
    for item in BANDS:
        lo = float(item.get("lower", -1e9))
        hi = float(item.get("upper",  1e9))
        if lo <= p < hi:
            return item["name"]
    return BANDS[-1]["name"]

st.sidebar.title("Credit Risk Dashboard")
st.sidebar.markdown(f"**KS** threshold: `{THR:.4f}`")

st.title("🏦 Credit Risk — Scoring & Explainability")

tab1, tab2 = st.tabs(["📤 Batch Scoring (CSV)", "🧭 Single Applicant (SHAP)"])

# =========================
# Tab 1 — CSV Scoring
# =========================
with tab1:
    st.subheader("Upload applications CSV")
    st.caption("The CSV may contain a subset of columns from the raw schema; missing columns will be imputed.")
    up = st.file_uploader("Choose a CSV file", type=["csv"])
    use_example = st.checkbox("Use minimal example", value=False)

    if use_example:
        df_in = pd.DataFrame(
            [
                {
                    "SK_ID_CURR": 100001,
                    "NAME_CONTRACT_TYPE": "Cash loans",
                    "AMT_CREDIT": 450000,
                    "AMT_INCOME_TOTAL": 180000,
                    "DAYS_EMPLOYED": -1200,
                    "DAYS_BIRTH": -15000,
                },
                {
                    "SK_ID_CURR": 100002,
                    "NAME_CONTRACT_TYPE": "Revolving loans",
                    "AMT_CREDIT": 200000,
                    "AMT_INCOME_TOTAL": 120000,
                    "DAYS_EMPLOYED": -900,
                    "DAYS_BIRTH": -14000,
                },
            ]
        )
    elif up is not None:
        try:
            df_in = pd.read_csv(up)
        except Exception as e:
            st.error(f"Failed to read CSV: {e}")
            df_in = None
    else:
        df_in = None

    if df_in is not None:
        st.subheader("Preview")
        st.dataframe(df_in.head(20), use_container_width=True)

        with st.spinner("Scoring..."):
            scored = score_df(df_in, ART)

        st.subheader("Sample Results")
        st.dataframe(scored.head(50), use_container_width=True)

        st.subheader("Distribution by Band")
        band_counts = scored["band"].value_counts().sort_index()
        st.bar_chart(band_counts)

        st.download_button(
            "⬇️ Download scored CSV",
            data=scored.to_csv(index=False).encode("utf-8"),
            file_name="scored_applications.csv",
            mime="text/csv",
            use_container_width=True,
        )

# =========================
# Tab 2 — SHAP Local
# =========================
with tab2:
    import shap
    from scipy import sparse
    import matplotlib.pyplot as plt

    st.subheader("Single Applicant — SHAP")
    st.caption("Fill in some fields or paste a JSON. Missing columns will be imputed.")

    sk = st.text_input("SK_ID_CURR (optional)")
    payload = st.text_area(
        "Applicant JSON (optional)",
        value='{"AMT_CREDIT": 500000, "NAME_CONTRACT_TYPE": "Cash loans"}'
    )
    run = st.button("Score & Explain")

    if run:
        try:
            row = {}
            if payload.strip():
                import json as _json
                row.update(_json.loads(payload))
            if sk.strip():
                row["SK_ID_CURR"] = int(sk)

            df_one = pd.DataFrame([row])

            # Scoring via preprocess function (ensures API consistency)
            scored = score_df(df_one, ART)
            st.write("**Score:**", scored)

            # ==== Local SHAP (robust to feature names) ====
            d = df_one.copy()
            for c in RAW_SCHEMA:
                if c not in d.columns:
                    d[c] = np.nan
            d = d[RAW_SCHEMA]
            xv = PREP.transform(d)

            # Get transformed feature names if possible
            names = None
            if isinstance(FEATS, list):
                names = FEATS
            elif hasattr(PREP, "get_feature_names_out"):
                try:
                    cand = PREP.get_feature_names_out(d.columns)
                    names = cand.tolist()
                except Exception:
                    names = None

            if sparse.issparse(xv):
                xv_dense = xv.toarray()
            else:
                xv_dense = xv

            # LGBM explainer
            explainer = shap.TreeExplainer(MODEL)
            if names is not None and len(names) == xv_dense.shape[1]:
                x_df = pd.DataFrame(xv_dense, columns=names)
                sv = explainer(x_df, check_additivity=False)
            else:
                sv = explainer(xv_dense, check_additivity=False)

            st.markdown("#### SHAP Waterfall (Local)")
            fig = plt.figure(figsize=(8, 6))
            shap.plots.waterfall(sv[0], max_display=20, show=False)
            st.pyplot(fig)

        except Exception as e:
            st.error(f"Error: {e}")
