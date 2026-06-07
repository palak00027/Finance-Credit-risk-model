// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
// Context
import { AuthProvider } from "./context/AuthContext";
import { RoleProvider } from "./context/RoleContext";

// Route Guard
import ProtectedRoute from "./routes/ProtectedRoute";

// Pages (Public)
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

// App Shell + Pages
import AppShell from "./pages/app/AppShell";
import DashboardPage from "./pages/app/Dashboardpage";
import FraudMonitorPage from "./pages/app/FraudMonitorPage";
import CreditScoringPage from "./pages/app/CreditScoringPage";
import RiskSimulationPage from "./pages/app/RiskSimulationPage";
import ApiSandboxPage from "./pages/app/ApiSandboxPage";
import RbacMatrixPage from "./pages/app/RbacMatrixPage";
import CompliancePage from "./pages/app/CompliancePage";
import ConsentEnginePage from "./pages/app/ConsentEnginePage";

function App() {
  return (
    <AuthProvider>
      <RoleProvider>
          <Routes>
            {/* 🌐 Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            {/* 🔐 Protected App Routes */}
            <Route
              path="/app"
              element={
                <ProtectedRoute>
                  <AppShell />
                </ProtectedRoute>
              }
            >
              {/* Default redirect */}
              <Route index element={<Navigate to="dashboard" replace />} />

              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="fraud" element={<FraudMonitorPage />} />
              <Route path="credit" element={<CreditScoringPage />} />
              <Route path="risk" element={<RiskSimulationPage />} />
              <Route path="sandbox" element={<ApiSandboxPage />} />
              <Route path="rbac" element={<RbacMatrixPage />} />
              <Route path="compliance" element={<CompliancePage />} />
              <Route path="consent" element={<ConsentEnginePage />} />
            </Route>

            {/* 🚫 Catch-all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
      </RoleProvider>
    </AuthProvider>
  );
}

export default App;
