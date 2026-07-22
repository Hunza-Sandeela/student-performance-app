"""
Machine learning loading & prediction logic.

IMPORTANT: This module intentionally mirrors the original Streamlit app's
prediction logic 1:1 (feature order, encoding scheme, scaling, model choice).
Nothing about the ML behaviour has been changed - only the delivery
mechanism (Streamlit UI -> REST API) has.
"""
import pickle
from pathlib import Path
from typing import Literal

import numpy as np

MODELS_DIR = Path(__file__).parent / "models"

# ---------------------------------------------------------------------------
# Load models once at import time (same models, same files, unchanged)
# ---------------------------------------------------------------------------
log_model = pickle.load(open(MODELS_DIR / "logistic.pkl", "rb"))
knn_model = pickle.load(open(MODELS_DIR / "knn.pkl", "rb"))
tree_model = pickle.load(open(MODELS_DIR / "tree.pkl", "rb"))
lr_model = pickle.load(open(MODELS_DIR / "linear.pkl", "rb"))
scaler = pickle.load(open(MODELS_DIR / "scaler.pkl", "rb"))

CLASSIFIERS = {
    "logistic": log_model,
    "knn": knn_model,
    "tree": tree_model,
}

ModelOption = Literal["best", "logistic", "knn", "tree"]

# Feature order the scaler/models were fit on (unchanged from original app.py)
FEATURE_ORDER = [
    "hours",
    "attendance",
    "parent",
    "resources",
    "activities",
    "sleep",
    "previous",
    "motivation",
    "internet",
    "tutoring",
    "physical",
]


def encode(val: str) -> int:
    """Identical categorical encoding used by the original Streamlit app."""
    if val in ("Low", "No"):
        return 0
    elif val == "Medium":
        return 1
    else:
        return 2


def build_feature_vector(payload: dict) -> np.ndarray:
    """Builds the exact same ordered feature vector as the original app.py."""
    return np.array([[
        payload["hours"],
        payload["attendance"],
        encode(payload["parent"]),
        encode(payload["resources"]),
        encode(payload["activities"]),
        payload["sleep"],
        payload["previous"],
        encode(payload["motivation"]),
        encode(payload["internet"]),
        payload["tutoring"],
        payload["physical"],
    ]])


def predict(payload: dict, model_option: ModelOption = "best") -> dict:
    """
    Runs the same two-stage prediction as the original app:
      1. Classification (Pass/Fail) using the selected classifier
      2. Regression (predicted exam score) using the linear model

    Defaults to the Logistic Regression model when "best" is selected,
    exactly like the original app's fallback behaviour.
    """
    input_data = build_feature_vector(payload)
    input_scaled = scaler.transform(input_data)

    clf_model = CLASSIFIERS.get(model_option, log_model)

    class_pred = int(clf_model.predict(input_scaled)[0])

    confidence = None
    if hasattr(clf_model, "predict_proba"):
        proba = clf_model.predict_proba(input_scaled)[0]
        confidence = float(np.max(proba))

    marks_pred = float(lr_model.predict(input_scaled)[0])

    return {
        "pass_prediction": bool(class_pred == 1),
        "predicted_score": round(marks_pred, 2),
        "confidence": round(confidence, 4) if confidence is not None else None,
        "model_used": model_option,
    }
