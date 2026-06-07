# scripts/generate_raw_schema.py
from __future__ import annotations

from pathlib import Path
import json
import joblib

ART = Path(__file__).resolve().parents[1] / "artifacts"
TB_PATH = ART / "thresholds_bands.json"
PREP_PATH = ART / "preprocessor.joblib"

def _safe_float(x):
    # Ensures JSON-serializable values (no Infinity)
    if x is None:
        return None
    try:
        f = float(x)
    except Exception:
        return x
    # Clamp to a “large but finite” range
    if f == float("inf"):
        return 1e9
    if f == float("-inf"):
        return -1e9
    return f

def main():
    if not PREP_PATH.exists():
        raise FileNotFoundError(f"Could not find {PREP_PATH}")
    if not TB_PATH.exists():
        raise FileNotFoundError(f"Could not find {TB_PATH}")

    # 1) Extract raw_schema from the preprocessor
    preprocessor = joblib.load(PREP_PATH)
    if not hasattr(preprocessor, "feature_names_in_"):
        raise AttributeError(
            "The preprocessor does not have the attribute feature_names_in_. "
            "Check the scikit-learn version or consider extracting it from the training dataset."
        )
    raw_schema = [str(c) for c in preprocessor.feature_names_in_.tolist()]

    # 2) Load thresholds_bands.json
    with open(TB_PATH, "r", encoding="utf-8") as f:
        meta = json.load(f)

    # 3) Inject the schema
    meta.setdefault("schema", {})
    meta["schema"]["raw_schema"] = raw_schema

    # 4) Sanitize band limits (lower/upper) for pure JSON (no Infinity)
    bands = meta.get("bands", {})
    schema_bands = bands.get("schema", [])
    fixed_schema = []
    for band in schema_bands:
        fixed_schema.append({
            "name": band.get("name", "Unknown"),
            "lower": _safe_float(band.get("lower", -1e9)),
            "upper": _safe_float(band.get("upper", 1e9)),
        })
    if fixed_schema:
        meta["bands"]["schema"] = fixed_schema

    # 5) Save back to file
    with open(TB_PATH, "w", encoding="utf-8") as f:
        json.dump(meta, f, ensure_ascii=False, indent=2)

    print(f"✔ Updated {TB_PATH} with schema.raw_schema ({len(raw_schema)} columns) and sanitized bands.")

if __name__ == "__main__":
    main()