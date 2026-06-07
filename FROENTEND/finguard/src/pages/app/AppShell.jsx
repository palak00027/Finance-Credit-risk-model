// src/pages/app/AppShell.jsx
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/app/Sidebar";
import Topbar from "../../components/app/TopBar";

export default function AppShell() {
  return (
    <div style={{ display: "flex", height: "100vh", background: "var(--bg)", overflow: "hidden" }}>
      <Sidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <Topbar />
        <main
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "24px",
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}