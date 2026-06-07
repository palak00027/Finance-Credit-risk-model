// ============================================================
// FinGuard — LandingPage.jsx
// All landing sub-components are inlined here for easy use.
// Split into separate files per the folder structure in the report.
// ============================================================

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// ─── DESIGN TOKENS ───────────────────────────────────────────
const C = {
  ink: "#0D0F1A",
  inkSoft: "#3A3D52",
  inkMuted: "#7A7D96",
  bg: "#F5F4F0",
  card: "#FFFFFF",
  accent: "#1A3FFF",
  accentL: "#E6EAFF",
  green: "#0F9060",
  greenL: "#E0F5EC",
  amber: "#D97706",
  amberL: "#FEF3C7",
  coral: "#E04040",
  coralL: "#FDEAEA",
  border: "rgba(13,15,26,0.10)",
};
const r = 14;
const rSm = 8;

// ─── GLOBAL STYLE INJECTOR ───────────────────────────────────
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --ink:#0D0F1A; --ink-soft:#3A3D52; --ink-muted:#7A7D96;
    --bg:#F5F4F0; --card:#FFFFFF;
    --accent:#1A3FFF; --accent-l:#E6EAFF;
    --green:#0F9060; --green-l:#E0F5EC;
    --amber:#D97706; --amber-l:#FEF3C7;
    --coral:#E04040; --coral-l:#FDEAEA;
    --border:rgba(13,15,26,0.10); --r:14px; --r-sm:8px;
  }
  html { scroll-behavior: smooth; }
  body { font-family: 'DM Sans', sans-serif; background: var(--bg); color: var(--ink); }
  h1,h2,h3,h4,h5 { font-family: 'Times New Roman', Times, serif; line-height: 1.15; }
  a { text-decoration: none; color: inherit; }
  button { cursor: pointer; border: none; outline: none; font-family: 'DM Sans', sans-serif; }
  .navbar { transition: box-shadow .3s, background .3s; }
  .navbar.scrolled { box-shadow: 0 2px 24px rgba(13,15,26,.08); background: rgba(245,244,240,.97) !important; }
  .hero-grid-bg {
    background-image: linear-gradient(rgba(13,15,26,.045) 1px,transparent 1px),
      linear-gradient(90deg,rgba(13,15,26,.045) 1px,transparent 1px);
    background-size: 48px 48px;
  }
  @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
  .fade-up{animation:fadeUp .65s ease both}
  .fade-up-d1{animation-delay:.10s} .fade-up-d2{animation-delay:.22s}
  .fade-up-d3{animation-delay:.34s} .fade-up-d4{animation-delay:.46s}
  @keyframes pulse2 { 0%,100%{opacity:1} 50%{opacity:.4} }
  .live-dot { animation: pulse2 2s infinite; }
  .feature-card { transition: transform .22s, box-shadow .22s; }
  .feature-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(13,15,26,.10); }
  .tab-pill { transition: background .18s, color .18s; }
  .hover-card { transition: background .18s; }
`;

function StyleInjector() {
  useEffect(() => {
    const id = "FinGuard-global";
    if (!document.getElementById(id)) {
      const el = document.createElement("style");
      el.id = id; el.textContent = GLOBAL_CSS;
      document.head.appendChild(el);
    }
  }, []);
  return null;
}

// ─── NAVBAR ──────────────────────────────────────────────────
function Navbar() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav
      className={`navbar${scrolled ? " scrolled" : ""}`}
      style={{
        position:"fixed",top:0,left:0,right:0,zIndex:100,
        background:"rgba(245,244,240,.85)",
        backdropFilter:"blur(14px)",
        borderBottom:`1px solid ${C.border}`,
      }}
    >
      <div style={{maxWidth:1200,margin:"0 auto",padding:"0 28px",height:64,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        {/* Logo */}
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:36,height:36,borderRadius:10,background:C.accent,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>🛡️</div>
          <span style={{fontFamily:"'Times New Roman', Times, serif",fontWeight:800,fontSize:18,color:C.ink}}>FinGuard</span>
        </div>

        {/* Links */}
        <div style={{display:"flex",gap:32,alignItems:"center"}}>
          {["Features","How It Works","Compliance","Stakeholders"].map(l => (
            <a key={l} href={`#${l.toLowerCase().replace(/ /g,"-")}`}
              style={{fontSize:14,fontWeight:500,color:C.inkSoft,transition:"color .15s"}}
              onMouseEnter={e=>(e.target.style.color=C.accent)}
              onMouseLeave={e=>(e.target.style.color=C.inkSoft)}
            >{l}</a>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={()=>navigate("/login")}
          style={{background:C.accent,color:"#fff",borderRadius:rSm,padding:"10px 22px",fontSize:14,fontWeight:600,letterSpacing:.3,transition:"opacity .18s,transform .18s"}}
          onMouseEnter={e=>{e.currentTarget.style.opacity=.85;e.currentTarget.style.transform="translateY(-1px)"}}
          onMouseLeave={e=>{e.currentTarget.style.opacity=1;e.currentTarget.style.transform="translateY(0)"}}
        >Get Demo →</button>
      </div>
    </nav>
  );
}

// ─── HERO ────────────────────────────────────────────────────
function Hero() {
  const navigate = useNavigate();
  const stats = [
    {value:"99.9%",label:"Fraud Detection Accuracy"},
    {value:"₹4.2Cr",label:"Protected This Week"},
    {value:"1.8s",label:"Credit Score Latency"},
  ];

  return (
    <section
      className="hero-grid-bg"
      style={{minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"130px 24px 90px",position:"relative",overflow:"hidden"}}
    >
      {/* Glow orbs */}
      <div style={{position:"absolute",top:"18%",left:"8%",width:420,height:420,borderRadius:"50%",background:"rgba(26,63,255,.07)",filter:"blur(80px)",pointerEvents:"none"}}/>
      <div style={{position:"absolute",bottom:"12%",right:"6%",width:320,height:320,borderRadius:"50%",background:"rgba(15,144,96,.08)",filter:"blur(64px)",pointerEvents:"none"}}/>

      <div style={{maxWidth:820,textAlign:"center",position:"relative"}}>
        {/* Live badge */}
        <div className="fade-up" style={{display:"inline-flex",alignItems:"center",gap:8,background:C.accentL,color:C.accent,borderRadius:100,padding:"6px 18px",fontSize:13,fontWeight:600,marginBottom:28}}>
          <span className="live-dot" style={{width:7,height:7,borderRadius:"50%",background:C.accent,display:"inline-block"}}/>
          India's AI-Native FinTech Compliance Platform
        </div>

        {/* H1 */}
        <h1 className="fade-up fade-up-d1"
          style={{fontFamily:"'Times New Roman', Times, serif",fontWeight:800,fontSize:"clamp(38px,6vw,72px)",lineHeight:1.1,color:C.ink,marginBottom:24}}
        >
          Stop Fraud. Score Credit.<br/>
          <span style={{color:C.accent}}>Stay Compliant.</span>
        </h1>

        {/* Sub */}
        <p className="fade-up fade-up-d2"
          style={{fontSize:"clamp(15px,2vw,19px)",color:C.inkSoft,lineHeight:1.75,maxWidth:580,margin:"0 auto 40px"}}
        >
          FinGuard gives banks, fintechs and regulators a unified AI layer for real-time fraud detection, alternative credit scoring, risk simulation, and RBI / DPDP compliance — all in one platform.
        </p>

        {/* CTAs */}
        <div className="fade-up fade-up-d3" style={{display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap",marginBottom:64}}>
          <button
            onClick={()=>navigate("/login")}
            style={{background:C.accent,color:"#fff",borderRadius:r,padding:"14px 30px",fontSize:15,fontWeight:700,letterSpacing:.3,boxShadow:"0 4px 22px rgba(26,63,255,.32)",transition:"transform .18s,box-shadow .18s"}}
            onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 8px 32px rgba(26,63,255,.42)"}}
            onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="0 4px 22px rgba(26,63,255,.32)"}}
          >Launch Demo →</button>
          <a href="#how-it-works"
            style={{background:C.card,color:C.ink,borderRadius:r,padding:"14px 30px",fontSize:15,fontWeight:600,border:`1.5px solid ${C.border}`,transition:"border-color .18s",display:"inline-block"}}
            onMouseEnter={e=>(e.currentTarget.style.borderColor=C.accent)}
            onMouseLeave={e=>(e.currentTarget.style.borderColor=C.border)}
          >See How It Works</a>
        </div>

        {/* Stats row */}
        <div className="fade-up fade-up-d4"
          style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:1,background:C.border,borderRadius:r,overflow:"hidden",border:`1px solid ${C.border}`}}
        >
          {stats.map((st,i)=>(
            <div key={i} style={{background:C.card,padding:"22px 20px",textAlign:"center"}}>
              <div style={{fontFamily:"'Times New Roman', Times, serif",fontWeight:800,fontSize:"clamp(22px,3vw,32px)",color:C.accent}}>{st.value}</div>
              <div style={{fontSize:12,color:C.inkMuted,marginTop:5}}>{st.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PROBLEMS ────────────────────────────────────────────────
function Problems() {
  const items = [
    {icon:"🕵️",title:"Fraud Blind Spots",desc:"Legacy rule-based systems miss 40% of sophisticated mule account networks and synthetic identity fraud."},
    {icon:"📋",title:"Credit Desert",desc:"Over 300 million Indians lack formal credit history, locking them out of loans due to thin-file exclusion."},
    {icon:"⚖️",title:"Regulatory Complexity",desc:"RBI, DPDP, PCI DSS and SEBI mandates change constantly — compliance teams drown in overlapping frameworks."},
    {icon:"🔒",title:"Data Privacy Gaps",desc:"Consent management is fragmented. DPDP Act violations can attract fines up to ₹250 Crore per breach."},
  ];

  return (
    <section style={{background:C.ink,padding:"100px 24px"}}>
      <div style={{maxWidth:1200,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:60}}>
          <div style={{display:"inline-block",background:"rgba(255,255,255,.08)",color:"rgba(255,255,255,.55)",borderRadius:100,padding:"6px 16px",fontSize:12,fontWeight:600,letterSpacing:1,textTransform:"uppercase",marginBottom:16}}>The Problem</div>
          <h2 style={{fontFamily:"'Times New Roman', Times, serif",fontSize:"clamp(26px,4vw,44px)",fontWeight:800,color:"#fff",maxWidth:520,margin:"0 auto"}}>Indian FinTech is Navigating Danger Blind</h2>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:20}}>
          {items.map((p,i)=>(
            <div key={i} className="hover-card"
              style={{background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.08)",borderRadius:r,padding:"28px 24px"}}
              onMouseEnter={e=>(e.currentTarget.style.background="rgba(255,255,255,.09)")}
              onMouseLeave={e=>(e.currentTarget.style.background="rgba(255,255,255,.05)")}
            >
              <div style={{fontSize:28,marginBottom:16}}>{p.icon}</div>
              <h3 style={{fontFamily:"'Times New Roman', Times, serif",fontWeight:700,fontSize:17,color:"#fff",marginBottom:10}}>{p.title}</h3>
              <p style={{fontSize:14,color:"rgba(255,255,255,.50)",lineHeight:1.7}}>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FEATURES ────────────────────────────────────────────────
function Features() {
  const accents = [C.accent,C.green,C.amber,C.coral,C.accent,C.green];
  const lights  = [C.accentL,C.greenL,C.amberL,C.coralL,C.accentL,C.greenL];
  const features = [
    {icon:"🧠",title:"GNN Fraud Detection",desc:"Graph Neural Networks map transaction relationships to identify mule rings, UPI fraud, and account takeovers in under 150ms."},
    {icon:"📊",title:"Alternative Credit Scoring",desc:"AA-framework compliant scoring using UPI history, utility bills, GST filings — covering thin-file and no-file customers."},
    {icon:"🔬",title:"Risk Simulation Engine",desc:"Monte Carlo stress testing with RBI-aligned scenarios. Simulate NPA projections, capital adequacy buffers and fraud losses."},
    {icon:"🔐",title:"Consent Vault (DPDP)",desc:"Purpose-bound consent management with differential privacy, erasure workflows, and full DPDP Act 2023 compliance."},
    {icon:"🤝",title:"RBAC Policy Engine",desc:"Role-based access for Banks, Fintechs, Regulators, and End Users — with partial view and full deny controls per feature."},
    {icon:"🧩",title:"API Sandbox",desc:"Certified partner onboarding with sandboxed endpoints for fraud scoring, credit APIs, and real-time risk simulation."},
  ];

  return (
    <section id="features" style={{background:C.bg,padding:"100px 24px"}}>
      <div style={{maxWidth:1200,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:60}}>
          <div style={{display:"inline-block",background:C.accentL,color:C.accent,borderRadius:100,padding:"6px 16px",fontSize:12,fontWeight:600,letterSpacing:1,textTransform:"uppercase",marginBottom:16}}>Platform Features</div>
          <h2 style={{fontFamily:"'Times New Roman', Times, serif",fontSize:"clamp(26px,4vw,44px)",fontWeight:800,color:C.ink,maxWidth:480,margin:"0 auto"}}>Everything Your FinTech Stack Needs</h2>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(310px,1fr))",gap:20}}>
          {features.map((f,i)=>(
            <div key={i} className="feature-card"
              style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:r,padding:"28px 24px",borderTop:`3px solid ${accents[i]}`}}
            >
              <div style={{width:44,height:44,borderRadius:rSm,background:lights[i],display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,marginBottom:18}}>{f.icon}</div>
              <h3 style={{fontFamily:"'Times New Roman', Times, serif",fontWeight:700,fontSize:17,color:C.ink,marginBottom:10}}>{f.title}</h3>
              <p style={{fontSize:14,color:C.inkSoft,lineHeight:1.7}}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── STAKEHOLDER TABS ────────────────────────────────────────
function StakeholderTabs() {
  const [active,setActive] = useState(0);
  const tabs = [
    {label:"🏦 Bank / NBFC",heading:"Full-Spectrum Access for Banks",desc:"Banks get unrestricted access to all fraud detection, credit scoring, risk simulation and compliance features with complete audit trails for RBI.",
      cards:[
        {icon:"✅",title:"Fraud Monitor",desc:"Live GNN alerts, mule ring detection, behavioural biometrics."},
        {icon:"✅",title:"Credit Scoring",desc:"AA-framework, thin-file, fairness metrics dashboard."},
        {icon:"✅",title:"Risk Simulation",desc:"Full scenario library, portfolio stress testing."},
        {icon:"✅",title:"Compliance Suite",desc:"RBI filings, DPDP audit logs, explainable AI decisions."},
      ]},
    {label:"🚀 Fintech",heading:"API-First Access for Fintechs",desc:"Fintechs access the API sandbox, consent management, and the RBAC matrix to integrate FinGuard services into their own products.",
      cards:[
        {icon:"✅",title:"API Sandbox",desc:"Certified onboarding, fraud & credit endpoints."},
        {icon:"✅",title:"Consent Engine",desc:"DPDP-compliant consent flows for user data."},
        {icon:"❌",title:"Fraud Monitor",desc:"Restricted — requires Bank-level license."},
        {icon:"❌",title:"Risk Simulation",desc:"Restricted — internal model access only."},
      ]},
    {label:"⚖️ Regulator / RBI",heading:"Oversight View for Regulators",desc:"Regulators get full compliance and consent visibility with partial read-only access to fraud and credit insights for systemic risk monitoring.",
      cards:[
        {icon:"✅",title:"Compliance Dashboard",desc:"All regulatory filings, audit statuses, explainable AI."},
        {icon:"✅",title:"Consent Engine",desc:"DPDP oversight, erasure request tracking."},
        {icon:"⚠️",title:"Fraud Insights",desc:"Partial — aggregate stats only, no PII."},
        {icon:"⚠️",title:"Credit Overview",desc:"Partial — distribution & fairness only."},
      ]},
    {label:"👤 End User",heading:"Transparency & Control for Users",desc:"End users get full control over their data consents, can revoke access, request deletion, and view what data is being used and for what purpose.",
      cards:[
        {icon:"✅",title:"Consent Dashboard",desc:"View, revoke, and manage all data consents."},
        {icon:"✅",title:"RBAC View",desc:"See which institutions have what access to your data."},
        {icon:"❌",title:"Fraud / Credit Data",desc:"Personal scores not visible — privacy protected."},
        {icon:"❌",title:"Risk / Compliance",desc:"Institutional features — not applicable to users."},
      ]},
  ];
  const tab = tabs[active];

  return (
    <section id="stakeholders" style={{background:"linear-gradient(160deg,#0D0F1A 0%,#1A1D2E 100%)",padding:"100px 24px"}}>
      <div style={{maxWidth:1100,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:48}}>
          <div style={{display:"inline-block",background:"rgba(255,255,255,.08)",color:"rgba(255,255,255,.55)",borderRadius:100,padding:"6px 16px",fontSize:12,fontWeight:600,letterSpacing:1,textTransform:"uppercase",marginBottom:16}}>Who It's For</div>
          <h2 style={{fontFamily:"'Times New Roman', Times, serif",fontSize:"clamp(26px,4vw,44px)",fontWeight:800,color:"#fff"}}>Built for Every Stakeholder</h2>
        </div>
        {/* Tabs */}
        <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap",marginBottom:48}}>
          {tabs.map((t,i)=>(
            <button key={i} className="tab-pill" onClick={()=>setActive(i)}
              style={{background:i===active?C.accent:"rgba(255,255,255,.07)",color:i===active?"#fff":"rgba(255,255,255,.55)",border:"none",borderRadius:100,padding:"10px 22px",fontSize:14,fontWeight:600}}
            >{t.label}</button>
          ))}
        </div>
        <div style={{textAlign:"center",marginBottom:40}}>
          <h3 style={{fontFamily:"'Times New Roman', Times, serif",fontSize:24,fontWeight:700,color:"#fff",marginBottom:12}}>{tab.heading}</h3>
          <p style={{fontSize:15,color:"rgba(255,255,255,.50)",maxWidth:560,margin:"0 auto"}}>{tab.desc}</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:16}}>
          {tab.cards.map((card,i)=>(
            <div key={i}
              style={{background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.09)",borderRadius:r,padding:"20px"}}
            >
              <div style={{fontSize:20,marginBottom:10}}>{card.icon}</div>
              <div style={{fontFamily:"'Times New Roman', Times, serif",fontWeight:700,fontSize:15,color:"#fff",marginBottom:6}}>{card.title}</div>
              <div style={{fontSize:13,color:"rgba(255,255,255,.45)",lineHeight:1.65}}>{card.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── METRICS ─────────────────────────────────────────────────
function Metrics() {
  const metrics = [
    {value:"99.9%",label:"Fraud Detection Accuracy",sub:"GNN + Behavioural AI"},
    {value:"₹4.2Cr",label:"Protected This Week",sub:"Across partner banks"},
    {value:"1.8s",label:"Credit Score Latency",sub:"Real-time AA framework"},
    {value:"300M+",label:"Thin-File Customers",sub:"No formal credit history"},
    {value:"100%",label:"Data Localisation",sub:"RBI-compliant servers"},
    {value:"24/24",label:"Audits Passed",sub:"Q1 2026 cycle"},
  ];

  return (
    <section style={{background:C.card,padding:"100px 24px"}}>
      <div style={{maxWidth:1100,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:60}}>
          <div style={{display:"inline-block",background:C.greenL,color:C.green,borderRadius:100,padding:"6px 16px",fontSize:12,fontWeight:600,letterSpacing:1,textTransform:"uppercase",marginBottom:16}}>By The Numbers</div>
          <h2 style={{fontFamily:"'Times New Roman', Times, serif",fontSize:"clamp(26px,4vw,44px)",fontWeight:800,color:C.ink}}>Proven at Scale</h2>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",border:`1px solid ${C.border}`,borderRadius:r,overflow:"hidden",gap:1,background:C.border}}>
          {metrics.map((m,i)=>(
            <div key={i} style={{background:C.card,padding:"32px 16px",textAlign:"center"}}>
              <div style={{fontFamily:"'Times New Roman', Times, serif",fontWeight:800,fontSize:"clamp(22px,2.5vw,34px)",color:C.accent,marginBottom:8}}>{m.value}</div>
              <div style={{fontSize:13,fontWeight:600,color:C.ink,marginBottom:4}}>{m.label}</div>
              <div style={{fontSize:12,color:C.inkMuted}}>{m.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── COMPLIANCE ──────────────────────────────────────────────
function Compliance() {
  const badges = [
    {label:"RBI Master Direction",bg:C.accentL,tc:C.accent},
    {label:"DPDP Act 2023",bg:C.greenL,tc:C.green},
    {label:"PCI DSS v4.0",bg:C.amberL,tc:C.amber},
    {label:"ISO 27001",bg:C.accentL,tc:C.accent},
    {label:"RBI CSCRF",bg:C.greenL,tc:C.green},
    {label:"SEBI Algos",bg:C.coralL,tc:C.coral},
  ];
  const list = [
    {label:"RBI Fraud Risk Management",green:true},
    {label:"DPDP Act — Data Processing",green:true},
    {label:"PCI DSS v4.0",green:true},
    {label:"ISO 27001:2022",green:false},
    {label:"RBI CSCRF Cybersecurity",green:true},
    {label:"SEBI Algo Governance",green:false},
  ];
  const flow = [
    {step:"User Consent",icon:"🔐",bg:C.accentL},
    {step:"Purpose-Bound Processing",icon:"⚙️",bg:C.greenL},
    {step:"RBI Data Centre (India)",icon:"🏠",bg:C.amberL},
    {step:"Audit Log → DPDP Vault",icon:"📁",bg:C.accentL},
  ];

  return (
    <section id="compliance" style={{ background: C.bg, padding: "100px 24px" }}>
      <div style={{maxWidth:1100,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:48}}>
          <div style={{display:"inline-block",background:C.accentL,color:C.accent,borderRadius:100,padding:"6px 16px",fontSize:12,fontWeight:600,letterSpacing:1,textTransform:"uppercase",marginBottom:16}}>Compliance Coverage</div>
          <h2 style={{fontFamily:"'Times New Roman', Times, serif",fontSize:"clamp(26px,4vw,44px)",fontWeight:800,color:C.ink}}>Regulatory-First by Design</h2>
        </div>
        <div style={{display:"flex",gap:10,flexWrap:"wrap",justifyContent:"center",marginBottom:52}}>
          {badges.map((b,i)=>(
            <span key={i} style={{background:b.bg,color:b.tc,borderRadius:100,padding:"8px 18px",fontSize:13,fontWeight:600}}>{b.label}</span>
          ))}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:24}}>
          {/* List */}
          <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:r,padding:"28px 24px"}}>
            <h3 style={{fontFamily:"'Times New Roman', Times, serif",fontWeight:700,fontSize:16,color:C.ink,marginBottom:20}}>Compliance Status</h3>
            {list.map((item,i)=>(
              <div key={i} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 0",borderBottom:i<list.length-1?`1px solid ${C.border}`:"none"}}>
                <span style={{fontSize:13,color:C.inkSoft}}>{item.label}</span>
                <span style={{background:item.green?C.greenL:C.amberL,color:item.green?C.green:C.amber,borderRadius:100,padding:"3px 12px",fontSize:12,fontWeight:600}}>{item.green?"Compliant":"In Progress"}</span>
              </div>
            ))}
          </div>
          {/* Flow */}
          <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:r,padding:"28px 24px"}}>
            <h3 style={{fontFamily:"'Times New Roman', Times, serif",fontWeight:700,fontSize:16,color:C.ink,marginBottom:20}}>Data Localisation Flow</h3>
            {flow.map((f,i)=>(
              <div key={i} style={{display:"flex",alignItems:"center",gap:14,padding:"12px 0",borderBottom:i<flow.length-1?`1px solid ${C.border}`:"none"}}>
                <div style={{width:36,height:36,borderRadius:rSm,background:f.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:17,flexShrink:0}}>{f.icon}</div>
                <span style={{fontSize:14,fontWeight:500,color:C.inkSoft}}>{f.step}</span>
                {i<flow.length-1&&<span style={{marginLeft:"auto",color:C.inkMuted}}>↓</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── HOW IT WORKS ────────────────────────────────────────────
function HowItWorks() {
  const steps = [
    {num:"01",icon:"🔌",title:"Connect via API or Dashboard",desc:"Integrate in minutes using our certified API sandbox, or log in to the FinGuard dashboard for direct access."},
    {num:"02",icon:"🧠",title:"AI Processes Your Data",desc:"Our GNN fraud engine, AA-credit model, and risk simulator run in real-time on your transaction data — fully within Indian data centres."},
    {num:"03",icon:"✅",title:"Decisions. Audits. Compliance.",desc:"Get explainable AI decisions, RBI-ready audit logs, and automatic DPDP consent management — all in one place."},
  ];

  return (
    <section id="how-it-works" style={{background:C.card,padding:"100px 24px"}}>
      <div style={{maxWidth:1000,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:64}}>
          <div style={{display:"inline-block",background:C.accentL,color:C.accent,borderRadius:100,padding:"6px 16px",fontSize:12,fontWeight:600,letterSpacing:1,textTransform:"uppercase",marginBottom:16}}>How It Works</div>
          <h2 style={{fontFamily:"'Times New Roman', Times, serif",fontSize:"clamp(26px,4vw,44px)",fontWeight:800,color:C.ink}}>Three Steps to Compliance</h2>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:32}}>
          {steps.map((s,i)=>(
            <div key={i} style={{textAlign:"center"}}>
              <div style={{width:72,height:72,borderRadius:"50%",background:C.accentL,display:"flex",alignItems:"center",justifyContent:"center",fontSize:30,margin:"0 auto 20px",boxShadow:`0 0 0 8px ${C.bg}`}}>{s.icon}</div>
              <div style={{fontFamily:"'Times New Roman', Times, serif",fontWeight:800,fontSize:12,color:C.accent,letterSpacing:2,marginBottom:8}}>{s.num}</div>
              <h3 style={{fontFamily:"'Times New Roman', Times, serif",fontWeight:700,fontSize:18,color:C.ink,marginBottom:12}}>{s.title}</h3>
              <p style={{fontSize:14,color:C.inkSoft,lineHeight:1.7}}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA SECTION ─────────────────────────────────────────────
function CTASection() {
  const navigate = useNavigate();
  return (
    <section style={{background:C.accent,padding:"100px 24px"}}>
      <div style={{maxWidth:680,margin:"0 auto",textAlign:"center"}}>
        <h2 style={{fontFamily:"'Times New Roman', Times, serif",fontWeight:800,fontSize:"clamp(28px,5vw,52px)",color:"#fff",marginBottom:20}}>
          Ready to Secure India's Financial Stack?
        </h2>
        <p style={{fontSize:17,color:"rgba(255,255,255,.70)",marginBottom:40,lineHeight:1.75}}>
          Join the banks, fintechs and regulators using FinGuard to stay ahead of fraud, credit exclusion, and compliance failure.
        </p>
        <div style={{display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap"}}>
          <button onClick={()=>navigate("/login")}
            style={{background:"#fff",color:C.accent,borderRadius:r,padding:"14px 30px",fontSize:15,fontWeight:700,transition:"transform .18s"}}
            onMouseEnter={e=>(e.currentTarget.style.transform="translateY(-2px)")}
            onMouseLeave={e=>(e.currentTarget.style.transform="translateY(0)")}
          >Launch Demo →</button>
          <button onClick={()=>navigate("/signup")}
            style={{background:"transparent",color:"#fff",border:"2px solid rgba(255,255,255,.45)",borderRadius:r,padding:"14px 30px",fontSize:15,fontWeight:600,transition:"border-color .18s"}}
            onMouseEnter={e=>(e.currentTarget.style.borderColor="#fff")}
            onMouseLeave={e=>(e.currentTarget.style.borderColor="rgba(255,255,255,.45)")}
          >Create Free Account</button>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{background:C.ink,padding:"32px 24px"}}>
      <div style={{maxWidth:1200,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:16}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:30,height:30,borderRadius:9,background:C.accent,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14}}>🛡️</div>
          <span style={{fontFamily:"'Times New Roman', Times, serif",fontWeight:800,fontSize:16,color:"#fff"}}>FinGuard</span>
        </div>
        <div style={{fontSize:13,color:"rgba(255,255,255,.30)"}}>© 2026 FinGuard. Built for India's FinTech ecosystem.</div>
        <div style={{display:"flex",gap:20}}>
          {["Privacy Policy","Terms of Use","Contact"].map(l=>(
            <a key={l} href="#" style={{fontSize:13,color:"rgba(255,255,255,.35)",transition:"color .15s"}}
              onMouseEnter={e=>(e.target.style.color="rgba(255,255,255,.8)")}
              onMouseLeave={e=>(e.target.style.color="rgba(255,255,255,.35)")}
            >{l}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}

// ─── MAIN EXPORT ─────────────────────────────────────────────
export default function LandingPage() {
  return (
    <>
      <StyleInjector />
      <div style={{fontFamily:"'DM Sans',sans-serif",background:C.bg,color:C.ink}}>
        <Navbar />
        <Hero />
        <Problems />
        <Features />
        <StakeholderTabs />
        <Metrics />
        <Compliance />
        <HowItWorks />
        <CTASection />
        <Footer />
      </div>
    </>
  );
}