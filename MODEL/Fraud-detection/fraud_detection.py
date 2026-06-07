import streamlit as st
import pandas as pd
import joblib

# Load the trained model
model = joblib.load("fraud_detection_model.pkl")

st.title("💳 Fraud Detection Prediction App")
st.markdown("Please enter the transaction details below and click **Predict** to check for fraud.")
st.divider()

# --- Input fields ---
transaction_type = st.selectbox(
    "Transaction Type", ["PAYMENT", "TRANSFER", "CASH_OUT"]
)
amount = st.number_input("Amount", min_value=0.0, value=1000.0)
oldbalanceOrg = st.number_input("Old Balance (Sender)", min_value=0.0, value=10000.0)
newbalanceOrig = st.number_input("New Balance (Sender)", min_value=0.0, value=9000.0)
oldbalanceDest = st.number_input("Old Balance (Receiver)", min_value=0.0, value=0.0)
newbalanceDest = st.number_input("New Balance (Receiver)", min_value=0.0, value=0.0)

# --- Predict button ---
if st.button("Predict"):
    # Compute derived features
    balanceDiffOrig = oldbalanceOrg - newbalanceOrig
    balanceDiffDest = newbalanceDest - oldbalanceDest

    # Create DataFrame in same structure as training data
    input_data = pd.DataFrame([{
        "type": transaction_type,
        "amount": amount,
        "oldbalanceOrg": oldbalanceOrg,
        "newbalanceOrig": newbalanceOrig,
        "oldbalanceDest": oldbalanceDest,
        "newbalanceDest": newbalanceDest,
        "balanceDiffOrig": balanceDiffOrig,
        "balanceDiffDest": balanceDiffDest
    }])

    # Make prediction
    prediction = model.predict(input_data)[0]

    # Display results
    st.subheader(f"Prediction: {int(prediction)}")
    if prediction == 1:
        st.error("⚠️ This transaction is likely fraudulent!")
    else:
        st.success("✅ This transaction appears to be non-fraudulent.")
