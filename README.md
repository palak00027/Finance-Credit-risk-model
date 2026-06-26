# 💳 FinGuard — AI-Powered Credit Risk & Fraud Detection Platform

<p align="center">

![Python](https://img.shields.io/badge/Python-3.11-blue?style=for-the-badge&logo=python)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![LightGBM](https://img.shields.io/badge/LightGBM-ML-orange?style=for-the-badge)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38BDF8?style=for-the-badge&logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

</p>

> **FinGuard** is an end-to-end AI-powered financial risk intelligence platform that combines **Credit Risk Prediction**, **Fraud Detection**, and **Loan Approval Prediction** into a single production-ready ecosystem.

The platform leverages modern Machine Learning, Explainable AI (SHAP), FastAPI microservices, and a React dashboard to help banks and fintech organizations make **faster, safer, and more transparent lending decisions**.

---

# 🌟 Highlights

- 🎯 Probability of Default (PD) Prediction
- 💰 Credit Risk Scoring
- 🚨 Real-Time Fraud Detection
- ✅ Loan Approval Prediction
- 🔍 Explainable AI using SHAP
- 📊 Interactive Analytics Dashboard
- 🔐 Role-Based Access Control (RBAC)
- ⚡ FastAPI REST APIs
- 📈 Business Performance Metrics
- 🧪 Production-Ready ML Pipeline

---

# 💡 Why FinGuard?

Financial institutions process thousands of loan applications every day. Traditional rule-based systems often struggle with:

- Manual risk assessment
- Slow loan approvals
- Fraudulent transactions
- Poor model interpretability
- Regulatory compliance challenges

FinGuard addresses these challenges by combining machine learning with explainable AI, enabling institutions to make data-driven decisions while maintaining transparency and regulatory compliance.

---

# ✨ Features

## 📊 Credit Risk Scoring

- Predicts Probability of Default (PD)
- Risk Band Classification
- Credit Score Generation
- Customer Risk Profiling
- SHAP Explainability
- Confidence Scores

---

## 🚨 Fraud Detection

- Detects suspicious financial transactions
- Real-time fraud prediction
- Fraud probability scoring
- Transaction monitoring dashboard
- Streamlit-based visualization

---

## 🏦 Loan Approval Prediction

- Loan eligibility prediction
- Approval probability
- FastAPI prediction endpoint
- Feature preprocessing pipeline
- Model serialization

---

## 🔍 Explainable AI

Every prediction includes:

- SHAP Feature Importance
- Local Explanations
- Global Feature Importance
- Risk Drivers
- Waterfall Plots
- Force Plots

This ensures every lending decision is transparent and interpretable.

---

## 📈 Analytics Dashboard

React dashboard includes:

- Credit Risk Dashboard
- Fraud Monitoring
- Risk Simulation
- Portfolio Analytics
- Compliance Dashboard
- API Sandbox
- RBAC Matrix

---

# 🏗️ System Architecture

```text
                           React Dashboard
                (Risk Analytics • Fraud • Compliance)

                              │
                              ▼
                    FastAPI Backend APIs
          ┌──────────────┬──────────────┬──────────────┐
          │              │              │
          ▼              ▼              ▼
 Credit Risk API   Fraud Detection   Loan Approval
 (LightGBM)         (ML Model)         (SVC Model)
          │              │              │
          └──────────────┴──────────────┘
                         │
                  ML Artifacts
      (Models • SHAP • Thresholds • Scalers)
```

---

# 🔄 End-to-End Workflow

```text
Loan Application
        │
        ▼
Data Validation
        │
        ▼
Feature Engineering
        │
        ▼
Credit Risk Model
        │
        ▼
Probability Calibration
        │
        ▼
SHAP Explainability
        │
        ▼
Risk Categorization
        │
        ▼
FastAPI Prediction
        │
        ▼
React Dashboard
```

---

# 📂 Repository Structure

```text
Finance-Credit-risk-model/

├── MODEL/
│
├── credit-risk/
│   ├── notebooks/
│   ├── scripts/
│   ├── tests/
│   ├── app/
│   ├── artifacts/
│   └── dashboard/
│
├── Fraud-detection/
│
├── Loan-approval-Prediction-System/
│
└── FRONTEND/
    └── finguard/
        ├── components/
        ├── context/
        ├── pages/
        ├── hooks/
        └── assets/
```

---

# 🧠 Machine Learning Models

| Model | Purpose |
|---------|---------|
| **LightGBM** | Credit Risk Prediction |
| **Logistic Regression** | Baseline Credit Model |
| **Support Vector Classifier (SVC)** | Loan Approval Prediction |
| **Fraud Detection Model** | Fraudulent Transaction Classification |

---

# 📊 Model Performance

| Metric | Logistic Regression | Tuned LightGBM |
|---------|-------------------:|---------------:|
| ROC-AUC | 0.746 | **0.761** |
| KS Statistic | 0.365 | **0.391** |
| Precision@20% | 0.200 | **0.212** |
| Recall@20% | **0.500** | **0.526** |

---

# 🔍 Explainability

The platform integrates SHAP (SHapley Additive Explanations) to provide interpretable predictions.

Capabilities include:

- Global Feature Importance
- Local Feature Contribution
- Waterfall Charts
- Force Plots
- Risk Driver Analysis
- Individual Customer Explanations

This enables analysts to understand *why* a prediction was made rather than relying solely on probability scores.

---

# 🌐 API Reference

| Endpoint | Method | Description |
|-----------|--------|-------------|
| `/score` | POST | Predict Credit Risk |
| `/predict` | POST | Loan Approval Prediction |
| `/fraud` | POST | Fraud Detection |
| `/health` | GET | API Health Check |
| `/docs` | GET | Swagger Documentation |

---

# ⚙️ Technology Stack

## Languages

- Python
- JavaScript

## Machine Learning

- Scikit-learn
- LightGBM
- SHAP
- Optuna
- Pandas
- NumPy

## Backend

- FastAPI
- Pydantic
- Uvicorn

## Frontend

- React
- Vite
- Tailwind CSS
- Recharts
- React Router

## Visualization

- Streamlit
- Power BI

## Testing

- Pytest

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/palak00027/Finance-Credit-risk-model.git

cd Finance-Credit-risk-model
```

---

## Backend

```bash
cd MODEL/credit-risk

python -m venv .venv

# Windows
.venv\Scripts\activate

# Linux / macOS
source .venv/bin/activate

pip install -r requirements.txt
```

Train Model

```bash
python scripts/train_model.py
```

Run FastAPI

```bash
uvicorn credit-risk-model.app.api:app --reload
```

---

## Fraud Detection

```bash
cd MODEL/Fraud-detection

streamlit run fraud_detection.py
```

---

## Frontend

```bash
cd FRONTEND/finguard

npm install

npm run dev
```

---

# 📸 Screenshots

## 🏠 Dashboard

<img width="1911" height="1042" alt="image" src="https://github.com/user-attachments/assets/03423dc7-3fbe-4e88-b60f-10220c228f19" />


---

## 📊 Credit Risk Analysis

<img width="1026" height="1281" alt="image" src="https://github.com/user-attachments/assets/c6a77b7a-9839-46c8-a45f-40d6633f6ed4" />
<img width="1026" height="609" alt="image" src="https://github.com/user-attachments/assets/bbe112fd-24fe-4a05-92a8-5249be3d7f20" />


---

## 🚨 Fraud Detection

<img width="1026" height="609" alt="image" src="https://github.com/user-attachments/assets/73a9aa34-f211-4d27-b49f-c2c6b34ac874" />


---

## 🔍 Loan Approval

<img width="1026" height="1126" alt="image" src="https://github.com/user-attachments/assets/b231749a-2594-4451-a5e5-f7aa2c9de1bd" />


---



# 📈 Business Impact

FinGuard enables organizations to:

- Reduce loan defaults
- Improve lending accuracy
- Detect financial fraud
- Increase operational efficiency
- Enhance regulatory compliance
- Build trust through Explainable AI

---

# 🚀 Future Roadmap

- Docker Deployment
- Kubernetes Support
- MLflow Experiment Tracking
- Kafka Streaming
- Model Drift Detection
- Account Aggregator Integration
- Multi-Tenant Support
- Cloud Deployment (AWS/Azure/GCP)
- CI/CD Pipeline
- Real-Time Monitoring

---

# 🙏 Acknowledgements

- Home Credit Default Risk Dataset (Kaggle)
- LightGBM
- SHAP
- FastAPI
- React
- Streamlit
- Scikit-learn

---

# 👩‍💻 Author

**Palak Upadhyay**

🎓 B.E. Computer Science & Engineering (Cyber Security)

💡 Passionate about Machine Learning, Artificial Intelligence, Full Stack Development, Cloud Computing, and Building Intelligent Financial Systems.

**GitHub:**  
https://github.com/palak00027

---

# ⭐ Show Your Support

If you found this project helpful, consider giving it a **⭐ Star** on GitHub. It motivates further development and helps others discover the project.
