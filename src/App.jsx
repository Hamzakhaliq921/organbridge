import { useState, useEffect, useRef } from "react";

const ORGANS = ["Kidney","Liver","Heart","Lungs","Cornea/Eyes","Pancreas","Bone Marrow"];
const BLOOD_GROUPS = ["A+","A-","B+","B-","AB+","AB-","O+","O-"];
const CITIES = ["Karachi","Lahore","Islamabad","Rawalpindi","Peshawar","Quetta","Multan","Faisalabad"];
const URGENCY_LEVELS = ["critical","high","medium","low"];
const URGENCY_COLOR = { critical:"#ff2020", high:"#ff8800", medium:"#ffcc00", low:"#55efc4" };

const MOCK_DONORS = [
  { id:1, name:"Ali Hassan",       bg:"A+",  city:"Karachi",    organs:["Kidney","Liver"],           age:28, available:true },
  { id:2, name:"Sara Ahmed",       bg:"O+",  city:"Lahore",     organs:["Cornea/Eyes","Kidney"],      age:34, available:true },
  { id:3, name:"Muhammad Khan",    bg:"B+",  city:"Islamabad",  organs:["Liver","Heart"],             age:42, available:false },
  { id:4, name:"Fatima Malik",     bg:"AB+", city:"Karachi",    organs:["Bone Marrow"],               age:25, available:true },
  { id:5, name:"Ahmed Raza",       bg:"A-",  city:"Multan",     organs:["Kidney"],                   age:38, available:true },
  { id:6, name:"Zainab Ali",       bg:"O-",  city:"Peshawar",   organs:["Cornea/Eyes","Pancreas"],   age:31, available:true },
];

const MOCK_EMERGENCY = [
  { id:1, organ:"Kidney",   bg:"O+",  urgency:"critical", hospital:"Aga Khan Hospital",   city:"Karachi",   posted:"2h ago", patient:"Male, 34 yrs", condition:"End-stage renal disease" },
  { id:2, organ:"Liver",    bg:"A+",  urgency:"high",     hospital:"PIMS Hospital",        city:"Islamabad", posted:"5h ago", patient:"Female, 28 yrs", condition:"Acute liver failure" },
  { id:3, organ:"Cornea",   bg:"B+",  urgency:"medium",   hospital:"Mayo Hospital",        city:"Lahore",    posted:"1d ago", patient:"Female, 19 yrs", condition:"Corneal dystrophy" },
  { id:4, organ:"Heart",    bg:"O-",  urgency:"critical", hospital:"Shaukat Khanum",       city:"Lahore",    posted:"30m ago", patient:"Male, 45 yrs", condition:"Dilated cardiomyopathy" },
  { id:5, organ:"Pancreas", bg:"AB+", urgency:"high",     hospital:"Liaquat National",     city:"Karachi",   posted:"3h ago", patient:"Male, 52 yrs", condition:"Type 1 diabetes" },
  { id:6, organ:"Lungs",    bg:"B-",  urgency:"medium",   hospital:"Services Hospital",    city:"Lahore",    posted:"8h ago", patient:"Female, 41 yrs", condition:"COPD – final stage" },
];

const ORGAN_EMOJI = { Kidney:"🫘", Liver:"🧬", Heart:"🫀", Lungs:"🫁", "Cornea/Eyes":"👁️", Pancreas:"🔬", "Bone Marrow":"🦷" };

const STEPS = [
  { emoji:"📝", color:"#4ecdc4", title:"Register as Donor", desc:"Create your profile with blood group, location, and the organs you wish to donate." },
  { emoji:"🔍", color:"#74b9ff", title:"Find a Match", desc:"Our system matches donors with patients by organ type, blood group, and proximity." },
  { emoji:"🏥", color:"#a29bfe", title:"Hospital Verification", desc:"Certified hospitals review and approve matches, ensuring medical compatibility." },
  { emoji:"💚", color:"#55efc4", title:"Save a Life", desc:"Complete the transplant process and track your life-saving impact in real time." },
];

const AWARENESS_TOPICS = [
  { icon:"❌", title:"Common Myths Debunked", desc:"Many believe doctors won't try as hard to save registered donors. This is completely false — medical care is never compromised by donor status." },
  { icon:"📋", title:"Eligibility Rules", desc:"Almost anyone can be a donor regardless of age. Medical suitability of each organ is assessed at the time of death to determine what can be donated." },
  { icon:"☪️", title:"Islamic Perspective", desc:"The majority of Islamic scholars agree organ donation is permissible and considered a noble act (Sadaqah Jariyah) when done to save another human life." },
  { icon:"📖", title:"Success Stories", desc:"Thousands of Pakistanis have received a second chance at life through transplants. One donor's decision can ripple through eight different families." },
  { icon:"🔬", title:"The Donation Process", desc:"Brain death is declared by multiple independent doctors. Family consent is obtained, and organs are retrieved with utmost dignity, care, and respect." },
  { icon:"❤️", title:"Why Donate?", desc:"Over 50,000 patients are waiting for transplants in Pakistan. Most will die waiting. Your decision to donate is literally a decision to give the gift of life." },
];

export default function OrganBridge() {
  const [page, setPage] = useState("home");
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [loggedIn, setLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("donor");
  const canvasRef = useRef(null);

  const [authForm, setAuthForm] = useState({ name:"", email:"", password:"", role:"donor", bloodGroup:"", city:"" });
  const [donorForm, setDonorForm] = useState({ fullName:"", age:"", gender:"", bloodGroup:"", cnic:"", phone:"", city:"", area:"", medicalHistory:"", organs:[] });
  const [reqForm, setReqForm] = useState({ organ:"", bloodGroup:"", urgency:"medium", hospital:"", condition:"", city:"", phone:"", notes:"" });
  const [search, setSearch] = useState({ organ:"", bloodGroup:"", city:"" });

  /* ── Particle Canvas Animation ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const particles = [];
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);
    
    // Create particles
    for (let i = 0; i < 130; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 2.2 + 0.4,
        red: Math.random() > 0.62,
        a: Math.random() * 0.55 + 0.18
      });
    }
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.red ? `rgba(224,32,32,${p.a})` : `rgba(160,160,160,${p.a * 0.35})`;
        ctx.fill();
      });
      requestAnimationFrame(animate);
    };
    animate();
    
    return () => window.removeEventListener('resize', resize);
  }, []);

  const nav = (p) => { setPage(p); window.scrollTo(0,0); };

  const toggleOrgan = (o) => setDonorForm(f => ({ ...f, organs: f.organs.includes(o) ? f.organs.filter(x=>x!==o) : [...f.organs, o] }));

  const filtered = MOCK_DONORS.filter(d => {
    if(search.organ && !d.organs.some(o => o.includes(search.organ))) return false;
    if(search.bloodGroup && d.bg !== search.bloodGroup) return false;
    if(search.city && d.city !== search.city) return false;
    return true;
  });

  /* ════════════════════════════
      STYLES (HTML-inspired)
  ════════════════════════════ */
  const s = {
    root: { 
      fontFamily:"'DM Sans', -apple-system, sans-serif", 
      background:"#0d0d0d", 
      color:"#f0f0f0", 
      minHeight:"100vh",
      position:"relative"
    },
    canvas: {
      position:"fixed",
      inset:0,
      pointerEvents:"none",
      zIndex:0
    },
    content: {
      position:"relative",
      zIndex:1
    },
    navWrap: { 
      position:"fixed", 
      top:0, 
      left:0, 
      right:0, 
      zIndex:200, 
      height:62, 
      background:"rgba(10,10,10,0.9)", 
      backdropFilter:"blur(20px)", 
      borderBottom:"1px solid rgba(255,255,255,0.07)",
      display:"flex",
      alignItems:"center"
    },
    navInner: { 
      maxWidth:1280, 
      margin:"0 auto", 
      padding:"0 28px", 
      width:"100%",
      display:"flex", 
      alignItems:"center", 
      justifyContent:"space-between",
      gap:16
    },
    page: { 
      maxWidth:1280, 
      margin:"0 auto", 
      padding:"2rem 28px",
      paddingTop:"100px"
    },
    card: { 
      background:"#181818", 
      border:"1px solid rgba(255,255,255,0.07)", 
      borderRadius:20, 
      padding:"1.75rem",
      transition:"all 0.3s"
    },
    label: { 
      display:"block", 
      marginBottom:7, 
      fontSize:12.5, 
      fontWeight:600, 
      color:"#888",
      letterSpacing:"0.03em"
    },
    input: { 
      width:"100%", 
      padding:"11px 15px", 
      borderRadius:10, 
      border:"1px solid rgba(255,255,255,0.08)", 
      background:"#1c1c1c", 
      color:"#f0f0f0", 
      fontSize:14, 
      outline:"none", 
      boxSizing:"border-box", 
      fontFamily:"inherit",
      transition:"border-color 0.2s"
    },
    select: { 
      width:"100%", 
      padding:"11px 15px", 
      borderRadius:10, 
      border:"1px solid rgba(255,255,255,0.08)", 
      background:"#1c1c1c", 
      color:"#f0f0f0", 
      fontSize:14, 
      outline:"none", 
      boxSizing:"border-box", 
      fontFamily:"inherit",
      cursor:"pointer"
    },
    textarea: { 
      width:"100%", 
      padding:"11px 15px", 
      borderRadius:10, 
      border:"1px solid rgba(255,255,255,0.08)", 
      background:"#1c1c1c", 
      color:"#f0f0f0", 
      fontSize:14, 
      outline:"none", 
      boxSizing:"border-box", 
      resize:"vertical", 
      minHeight:120, 
      fontFamily:"inherit"
    },
    btnPrimary: { 
      background:"#e02020", 
      color:"#fff", 
      padding:"10px 22px", 
      borderRadius:9, 
      border:"none", 
      cursor:"pointer", 
      fontWeight:600, 
      fontSize:14, 
      fontFamily:"inherit",
      transition:"all 0.25s"
    },
    btnOutline: { 
      background:"transparent", 
      color:"#f0f0f0", 
      padding:"9px 22px", 
      borderRadius:9, 
      border:"1px solid rgba(255,255,255,0.13)", 
      cursor:"pointer", 
      fontWeight:500, 
      fontSize:14, 
      fontFamily:"inherit",
      transition:"all 0.25s"
    },
    btnGhost: { 
      background:"transparent", 
      color:"#888", 
      padding:"9px 16px", 
      borderRadius:8, 
      border:"1px solid rgba(255,255,255,0.07)", 
      cursor:"pointer", 
      fontWeight:500, 
      fontSize:14, 
      fontFamily:"inherit"
    },
    sectionH: { 
      fontFamily:"'Syne', sans-serif",
      fontSize:"clamp(30px, 4.5vw, 48px)", 
      fontWeight:800, 
      color:"#f0f0f0", 
      marginBottom:14,
      lineHeight:1.1
    },
    sectionLabel: {
      display:"inline-flex",
      alignItems:"center",
      gap:10,
      fontSize:11,
      fontWeight:700,
      letterSpacing:"0.14em",
      textTransform:"uppercase",
      color:"#e02020",
      marginBottom:14
    },
    grid2: { 
      display:"grid", 
      gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", 
      gap:18 
    },
    grid3: { 
      display:"grid", 
      gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", 
      gap:18 
    },
    grid4: { 
      display:"grid", 
      gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))", 
      gap:18 
    },
    badge: (c) => ({ 
      display:"inline-block", 
      padding:"3px 11px", 
      borderRadius:100, 
      fontSize:11, 
      fontWeight:700, 
      background:`${c}22`, 
      color:c,
      letterSpacing:"0.06em"
    }),
    divider: { 
      borderTop:"1px solid rgba(255,255,255,0.07)", 
      margin:"28px 0" 
    },
    navLink: (active) => ({ 
      padding:"7px 13px", 
      borderRadius:8, 
      cursor:"pointer", 
      fontWeight:active?600:400, 
      color:active?"#e02020":"#888", 
      background:active?"rgba(224,32,32,0.08)":"transparent", 
      border:"none", 
      fontSize:13.5, 
      fontFamily:"inherit",
      transition:"all 0.2s"
    }),
    heroSection: {
      minHeight:"100vh",
      display:"flex",
      alignItems:"center",
      justifyContent:"center",
      textAlign:"center",
      padding:"140px 28px 80px"
    },
    heroTitle: {
      fontFamily:"'Syne', sans-serif",
      fontSize:"clamp(52px, 9vw, 100px)",
      fontWeight:800,
      lineHeight:1.0,
      marginBottom:22,
      color:"#f0f0f0"
    },
    heroAccent: {
      color:"#e02020"
    },
    fadeUp: {
      animation:"fadeUp 0.65s ease forwards"
    }
  };

  /* ════════════════════════════
      NAVBAR
  ════════════════════════════ */
  const Navbar = () => (
    <nav style={s.navWrap}>
      <div style={s.navInner}>
        {/* Logo */}
        <div onClick={() => nav("home")} style={{ display:"flex", alignItems:"center", gap:10, cursor:"pointer" }}>
          <div style={{ width:34, height:34, background:"#e02020", borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", fontSize:17, color:"#fff", flexShrink:0 }}>🫀</div>
          <span style={{ fontFamily:"'Syne', sans-serif", fontSize:19, fontWeight:800, color:"#f0f0f0" }}>Organ<span style={{color:"#e02020"}}>Bridge</span></span>
        </div>

        {/* Links */}
        <div style={{ display:"flex", gap:2, alignItems:"center", flexWrap:"wrap" }}>
          {[["home","Home"],["search","Find Donors"],["organ-request","Request Organ"],["emergency","Emergency"]].map(([p,l]) =>
            <button key={p} style={s.navLink(page===p)} onClick={() => nav(p)}>{l}</button>
          )}
          {loggedIn && <button style={s.navLink(page==="dashboard")} onClick={() => nav("dashboard")}>Dashboard</button>}
          <button style={s.navLink(page==="awareness")} onClick={() => nav("awareness")}>Awareness</button>
        </div>

        {/* Right controls */}
        <div style={{ display:"flex", gap:10, alignItems:"center" }}>
          {loggedIn
            ? <button style={s.btnGhost} onClick={() => { setLoggedIn(false); nav("home"); }}>Logout</button>
            : <>
                <button style={s.btnGhost} onClick={() => { setAuthMode("login"); setShowAuth(true); }}>Login</button>
                <button style={s.btnPrimary} onClick={() => { setAuthMode("register"); setShowAuth(true); }}>Register</button>
              </>
          }
        </div>
      </div>
    </nav>
  );

  /* ════════════════════════════
      URGENT BANNER
  ════════════════════════════ */
  const UrgentBanner = () => (
    <div style={{ 
      background:"#e02020", 
      height:38, 
      overflow:"hidden", 
      marginTop:62,
      display:"flex",
      alignItems:"center"
    }}>
      <div style={{ 
        display:"flex", 
        alignItems:"center", 
        whiteSpace:"nowrap",
        animation:"marquee 30s linear infinite"
      }}>
        {['🚨 URGENT: Kidney (O+) needed • Karachi', '🔴 CRITICAL: Liver (A+) needed • Lahore', '🚨 URGENT: Heart (B+) needed • Islamabad', '⚠️ HIGH: Bone Marrow (A-) • Children Hospital Lahore', '🚨 URGENT: Lungs (O-) • Civil Hospital Karachi', '📞 Emergency Helpline: 1115'].map((text, i) => (
          <span key={i} style={{ fontSize:12.5, fontWeight:700, color:"#fff", letterSpacing:"0.03em", margin:"0 18px" }}>
            {text} <span style={{ width:5, height:5, background:"rgba(255,255,255,0.5)", borderRadius:"50%", display:"inline-block", margin:"0 18px", verticalAlign:"middle" }}></span>
          </span>
        ))}
      </div>
    </div>
  );

  /* ════════════════════════════
      AUTH MODAL
  ════════════════════════════ */
  const AuthModal = () => (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,.82)", zIndex:500, display:"flex", alignItems:"center", justifyContent:"center", padding:20, backdropFilter:"blur(10px)" }}
         onClick={() => setShowAuth(false)}>
      <div style={{ ...s.card, maxWidth:400, width:"100%", boxShadow:"0 24px 60px rgba(0,0,0,.65)" }} onClick={e => e.stopPropagation()}>
        {/* Tabs */}
        <div style={{ display:"flex", gap:4, background:"#1c1c1c", borderRadius:10, padding:3, marginBottom:26 }}>
          {["login","register"].map(m => (
            <button key={m} onClick={() => setAuthMode(m)}
              style={{ 
                flex:1, 
                padding:8, 
                fontSize:12.5,
                fontWeight:600,
                borderRadius:8,
                cursor:"pointer",
                fontFamily:"inherit",
                border:"none",
                background:authMode===m?"#e02020":"transparent",
                color:authMode===m?"#fff":"#888",
                textTransform:"capitalize",
                transition:"all 0.2s"
              }}>
              {m}
            </button>
          ))}
        </div>

        <form onSubmit={e => { e.preventDefault(); setLoggedIn(true); setUserRole(authForm.role||"donor"); setShowAuth(false); nav("dashboard"); }}>
          {authMode==="register" && (
            <div style={{ marginBottom:18 }}>
              <label style={s.label}>Full Name</label>
              <input style={s.input} placeholder="Your name" value={authForm.name} onChange={e=>setAuthForm({...authForm,name:e.target.value})} required />
            </div>
          )}
          <div style={{ marginBottom:18 }}>
            <label style={s.label}>Email</label>
            <input type="email" style={s.input} placeholder="email@example.com" value={authForm.email} onChange={e=>setAuthForm({...authForm,email:e.target.value})} required />
          </div>
          <div style={{ marginBottom:18 }}>
            <label style={s.label}>Password</label>
            <input type="password" style={s.input} placeholder="••••••••" value={authForm.password} onChange={e=>setAuthForm({...authForm,password:e.target.value})} required />
          </div>
          {authMode==="register" && (
            <>
              <div style={{ marginBottom:18 }}>
                <label style={s.label}>I am a</label>
                <select style={s.select} value={authForm.role} onChange={e=>setAuthForm({...authForm,role:e.target.value})}>
                  <option value="donor">Donor</option>
                  <option value="patient">Patient / Recipient</option>
                  <option value="hospital">Hospital</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:18, marginBottom:18 }}>
                <div>
                  <label style={s.label}>Blood Group</label>
                  <select style={s.select} value={authForm.bloodGroup} onChange={e=>setAuthForm({...authForm,bloodGroup:e.target.value})}>
                    <option value="">Select</option>
                    {BLOOD_GROUPS.map(b=><option key={b}>{b}</option>)}
                  </select>
                </div>
                <div>
                  <label style={s.label}>City</label>
                  <select style={s.select} value={authForm.city} onChange={e=>setAuthForm({...authForm,city:e.target.value})}>
                    <option value="">Select</option>
                    {CITIES.map(c=><option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
            </>
          )}
          <button type="submit" style={{ ...s.btnPrimary, width:"100%", padding:13, fontSize:15, borderRadius:11 }}>
            {authMode==="login" ? "Sign In →" : "Create Account"}
          </button>
        </form>

        <p style={{ textAlign:"center", marginTop:18, fontSize:13, color:"#888" }}>
          {authMode==="login" ? "No account? " : "Already registered? "}
          <span style={{ color:"#e02020", cursor:"pointer", fontWeight:600 }} onClick={() => setAuthMode(authMode==="login"?"register":"login")}>
            {authMode==="login" ? "Register" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );

  /* ════════════════════════════
      HOME PAGE
  ════════════════════════════ */
  const HomePage = () => (
    <div>
      {/* Hero */}
      <section style={s.heroSection}>
        <div style={{ maxWidth:900, width:"100%" }}>
          <div style={{ 
            display:"inline-flex", 
            alignItems:"center", 
            gap:8, 
            background:"rgba(224,32,32,0.1)", 
            border:"1px solid rgba(224,32,32,0.3)", 
            borderRadius:100, 
            padding:"8px 22px", 
            fontSize:11.5, 
            fontWeight:700, 
            color:"#e02020", 
            letterSpacing:"0.1em", 
            textTransform:"uppercase", 
            marginBottom:28,
            ...s.fadeUp
          }}>
            💓 Connecting Donors · Saving Lives
          </div>
          <h1 style={{ ...s.heroTitle, ...s.fadeUp, animationDelay:"0.1s", opacity:0 }}>
            Donate an Organ.<br/>
            <span style={s.heroAccent}>Save a Life Today.</span>
          </h1>
          <p style={{ 
            fontSize:17.5, 
            color:"#888", 
            maxWidth:560, 
            margin:"0 auto 36px", 
            lineHeight:1.8,
            ...s.fadeUp,
            animationDelay:"0.2s",
            opacity:0
          }}>
            Pakistan's first unified platform bridging verified organ donors, patients, and certified hospitals for faster, safer, life‑saving transplants.
          </p>
          
          {/* Hero Tags */}
          <div style={{ 
            display:"flex", 
            flexWrap:"wrap", 
            justifyContent:"center", 
            gap:10, 
            marginBottom:44,
            ...s.fadeUp,
            animationDelay:"0.3s",
            opacity:0
          }}>
            {["Verified Hospitals","24/7 Emergency","Nationwide Network","Secure & Encrypted"].map(tag => (
              <div key={tag} style={{ 
                display:"flex", 
                alignItems:"center", 
                gap:8, 
                background:"rgba(255,255,255,0.04)", 
                border:"1px solid rgba(255,255,255,0.13)", 
                borderRadius:100, 
                padding:"8px 18px", 
                fontSize:13, 
                color:"#888" 
              }}>
                <span style={{ width:7, height:7, background:"#e02020", borderRadius:"50%", flexShrink:0 }}></span>
                {tag}
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div style={{ 
            display:"flex", 
            gap:14, 
            justifyContent:"center", 
            flexWrap:"wrap",
            ...s.fadeUp,
            animationDelay:"0.4s",
            opacity:0
          }}>
            <button style={{ ...s.btnPrimary, padding:"13px 32px", borderRadius:11, fontSize:15 }} 
              onClick={() => loggedIn ? nav("donor-register") : (setAuthMode("register"), setShowAuth(true))}>
              Register as Donor →
            </button>
            <button style={{ ...s.btnOutline, padding:"13px 32px", borderRadius:11, fontSize:15 }} 
              onClick={() => nav("organ-request")}>
              Request an Organ
            </button>
            <button style={{ ...s.btnGhost, padding:"13px 32px", borderRadius:11, fontSize:15, color:"#f0f0f0" }} 
              onClick={() => nav("search")}>
              Search Donors
            </button>
          </div>

          {/* Stats */}
          <div style={{ 
            display:"flex", 
            gap:56, 
            justifyContent:"center", 
            marginTop:72, 
            flexWrap:"wrap", 
            paddingTop:56, 
            borderTop:"1px solid rgba(255,255,255,0.07)",
            ...s.fadeUp,
            animationDelay:"0.5s",
            opacity:0
          }}>
            {[["12,400+","Registered Donors"],["3,200+","Lives Saved"],["280+","Partner Hospitals"],["98%","Match Success"]].map(([num,label])=>(
              <div key={label}>
                <div style={{ fontFamily:"'Syne', sans-serif", fontSize:38, fontWeight:800, color:"#e02020" }}>{num}</div>
                <div style={{ fontSize:13, color:"#888", marginTop:4 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Organs Section */}
      <section style={{ background:"rgba(255,255,255,0.012)", padding:"88px 0" }}>
        <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 28px" }}>
          <div style={{ textAlign:"center", marginBottom:60 }}>
            <div style={s.sectionLabel}>
              <span style={{ width:22, height:1, background:"#e02020", opacity:0.5 }}></span>
              What We Connect
              <span style={{ width:22, height:1, background:"#e02020", opacity:0.5 }}></span>
            </div>
            <h2 style={s.sectionH}>Organs Available for <span style={s.heroAccent}>Donation</span></h2>
            <p style={{ fontSize:16, color:"#888", maxWidth:540, margin:"0 auto", lineHeight:1.75 }}>
              Browse our verified donor registry by organ type and find the right match for patients in critical need.
            </p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(150px,1fr))", gap:14 }}>
            {ORGANS.map(organ=>(
              <div key={organ} onClick={() => nav("search")}
                style={{ 
                  ...s.card, 
                  padding:"26px 14px", 
                  textAlign:"center", 
                  cursor:"pointer",
                  position:"relative",
                  overflow:"hidden"
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = "rgba(224,32,32,0.3)";
                  e.currentTarget.style.transform = "translateY(-5px)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}>
                <span style={{ fontSize:38, marginBottom:12, display:"block", lineHeight:1 }}>{ORGAN_EMOJI[organ] || "🫀"}</span>
                <div style={{ fontFamily:"'Syne', sans-serif", fontSize:14.5, fontWeight:700, color:"#f0f0f0" }}>{organ}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section style={{ padding:"88px 0" }}>
        <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 28px" }}>
          <div style={{ textAlign:"center", marginBottom:60 }}>
            <div style={s.sectionLabel}>
              <span style={{ width:22, height:1, background:"#e02020", opacity:0.5 }}></span>
              Simple Process
              <span style={{ width:22, height:1, background:"#e02020", opacity:0.5 }}></span>
            </div>
            <h2 style={s.sectionH}>How <span style={s.heroAccent}>OrganBridge</span> Works</h2>
            <p style={{ fontSize:16, color:"#888", maxWidth:540, margin:"0 auto", lineHeight:1.75 }}>
              Four clear steps to register, match, verify and save a life through our trusted platform.
            </p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))", gap:18 }}>
            {STEPS.map((step, i)=>(
              <div key={i} style={{ 
                ...s.card, 
                padding:"28px 24px",
                position:"relative",
                overflow:"hidden"
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = "rgba(224,32,32,0.25)";
                e.currentTarget.style.transform = "translateY(-5px)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                e.currentTarget.style.transform = "translateY(0)";
              }}>
                <div style={{ 
                  width:52, 
                  height:52, 
                  borderRadius:14, 
                  background:`${step.color}22`, 
                  display:"flex", 
                  alignItems:"center", 
                  justifyContent:"center", 
                  marginBottom:18, 
                  fontSize:24 
                }}>
                  {step.emoji}
                </div>
                <h3 style={{ fontFamily:"'Syne', sans-serif", fontSize:17, fontWeight:700, color:"#f0f0f0", marginBottom:10 }}>
                  {step.title}
                </h3>
                <p style={{ fontSize:13.5, color:"#888", lineHeight:1.65 }}>{step.desc}</p>
                <div style={{ 
                  position:"absolute", 
                  bottom:12, 
                  right:18, 
                  fontFamily:"'Syne', sans-serif", 
                  fontSize:56, 
                  fontWeight:800, 
                  color:"rgba(255,255,255,0.03)", 
                  lineHeight:1 
                }}>
                  0{i+1}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 28px" }}>
        <div style={{ 
          background:"linear-gradient(135deg,rgba(224,32,32,0.11),rgba(224,32,32,0.04))",
          border:"1px solid rgba(224,32,32,0.18)",
          borderRadius:24,
          padding:56,
          textAlign:"center",
          margin:"80px 0"
        }}>
          <h2 style={{ fontFamily:"'Syne', sans-serif", fontSize:"clamp(28px, 4vw, 38px)", fontWeight:800, color:"#f0f0f0", marginBottom:14 }}>
            Ready to Save Lives?
          </h2>
          <p style={{ fontSize:16, color:"#888", maxWidth:480, margin:"0 auto 30px", lineHeight:1.75 }}>
            Join thousands of donors making a difference across Pakistan. One decision — up to eight lives saved.
          </p>
          <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
            <button style={{ ...s.btnPrimary, padding:"13px 32px", borderRadius:11, fontSize:15 }} 
              onClick={() => { setAuthMode("register"); setShowAuth(true); }}>
              Register as Donor Now
            </button>
            <button style={{ ...s.btnOutline, padding:"13px 32px", borderRadius:11, fontSize:15 }} 
              onClick={() => nav("awareness")}>
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  /* ════════════════════════════
      DONOR REGISTRATION
  ════════════════════════════ */
  const DonorRegisterPage = () => (
    <div style={s.page}>
      <div style={{ maxWidth:820, margin:"0 auto" }}>
        <div style={s.sectionLabel} style={{ justifyContent:"flex-start", marginBottom:12 }}>
          <span style={{ width:22, height:1, background:"#e02020", opacity:0.5 }}></span>
          New Registration
        </div>
        <h1 style={{ fontFamily:"'Syne', sans-serif", fontSize:28, fontWeight:800, color:"#f0f0f0", marginBottom:8 }}>
          Register as Organ Donor
        </h1>
        <p style={{ fontSize:14, color:"#888", marginBottom:32 }}>
          Your registration can save up to 8 lives. Fill in the details below to join our verified donor network.
        </p>

        <div style={{ ...s.card, padding:40 }}>
          <h3 style={{ fontFamily:"'Syne', sans-serif", fontSize:14.5, fontWeight:700, color:"#e02020", marginBottom:18, display:"flex", alignItems:"center", gap:8 }}>
            👤 Personal Information
          </h3>
          
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:18, marginBottom:18 }}>
            {[["Full Name","text","fullName","Enter full legal name"],["Age","number","age","Your age"]].map(([l,t,f,p])=>(
              <div key={f}>
                <label style={s.label}>{l} <span style={{color:"#e02020"}}>*</span></label>
                <input type={t} style={s.input} placeholder={p} value={donorForm[f]} onChange={e=>setDonorForm({...donorForm,[f]:e.target.value})} />
              </div>
            ))}
          </div>
          
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:18, marginBottom:18 }}>
            {[["Gender","gender",["Male","Female","Other"]],["Blood Group","bloodGroup",BLOOD_GROUPS],["City","city",CITIES]].map(([l,f,opts])=>(
              <div key={f}>
                <label style={s.label}>{l} <span style={{color:"#e02020"}}>*</span></label>
                <select style={s.select} value={donorForm[f]} onChange={e=>setDonorForm({...donorForm,[f]:e.target.value})}>
                  <option value="">Select</option>
                  {opts.map(o=><option key={o}>{o}</option>)}
                </select>
              </div>
            ))}
          </div>
          
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:18, marginBottom:18 }}>
            {[["CNIC","cnic","42101-1234567-1"],["Phone","phone","+92 300 1234567"]].map(([l,f,p])=>(
              <div key={f}>
                <label style={s.label}>{l} <span style={{color:"#e02020"}}>*</span></label>
                <input style={s.input} placeholder={p} value={donorForm[f]} onChange={e=>setDonorForm({...donorForm,[f]:e.target.value})} />
              </div>
            ))}
          </div>
          
          <div style={{ marginBottom:18 }}>
            <label style={s.label}>Area / Neighborhood</label>
            <input style={s.input} placeholder="e.g. DHA Phase 5, Gulshan-e-Iqbal" value={donorForm.area} onChange={e=>setDonorForm({...donorForm,area:e.target.value})} />
          </div>

          <hr style={s.divider} />

          <h3 style={{ fontFamily:"'Syne', sans-serif", fontSize:14.5, fontWeight:700, color:"#e02020", marginBottom:18, display:"flex", alignItems:"center", gap:8 }}>
            🏥 Medical Information
          </h3>
          <div style={{ marginBottom:18 }}>
            <label style={s.label}>Medical History</label>
            <textarea style={s.textarea} placeholder="Any relevant conditions, allergies, or medications..." value={donorForm.medicalHistory} onChange={e=>setDonorForm({...donorForm,medicalHistory:e.target.value})} />
          </div>

          <hr style={s.divider} />

          <h3 style={{ fontFamily:"'Syne', sans-serif", fontSize:14.5, fontWeight:700, color:"#e02020", marginBottom:18, display:"flex", alignItems:"center", gap:8 }}>
            🫀 Organs Willing to Donate
          </h3>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(145px,1fr))", gap:11, marginTop:6 }}>
            {ORGANS.map(organ=>{
              const sel = donorForm.organs.includes(organ);
              return (
                <label key={organ} 
                  style={{ 
                    display:"flex", 
                    alignItems:"center", 
                    gap:9, 
                    background:"#1c1c1c", 
                    border:`1px solid ${sel?"#e02020":"rgba(255,255,255,0.07)"}`, 
                    borderRadius:10, 
                    padding:"11px 13px", 
                    cursor:"pointer",
                    transition:"all 0.2s",
                    userSelect:"none"
                  }}
                  onClick={()=>toggleOrgan(organ)}>
                  <div style={{ 
                    width:17, 
                    height:17, 
                    border:"2px solid rgba(255,255,255,0.2)", 
                    borderRadius:4, 
                    display:"flex", 
                    alignItems:"center", 
                    justifyContent:"center", 
                    flexShrink:0,
                    background:sel?"#e02020":"transparent",
                    borderColor:sel?"#e02020":"rgba(255,255,255,0.2)",
                    color:"#fff",
                    fontSize:10
                  }}>
                    {sel && "✓"}
                  </div>
                  <span style={{ fontSize:13, color:"#f0f0f0" }}>{organ}</span>
                </label>
              );
            })}
          </div>

          <div style={{ 
            display:"flex", 
            alignItems:"flex-start", 
            gap:12, 
            padding:16, 
            background:"rgba(224,32,32,0.06)", 
            border:"1px solid rgba(224,32,32,0.14)", 
            borderRadius:13, 
            marginTop:28,
            marginBottom:22 
          }}>
            <span style={{ flexShrink:0, fontSize:18 }}>ℹ️</span>
            <p style={{ fontSize:13, color:"#888", lineHeight:1.7, margin:0 }}>
              By registering, you consent to your information being shared with verified hospitals and patients in need. Your data is encrypted and will only be used for organ matching. You may withdraw consent at any time from your profile settings.
            </p>
          </div>

          <button style={{ ...s.btnPrimary, width:"100%", padding:14, fontSize:15, borderRadius:12 }}
            onClick={() => alert("✅ Donor registration submitted! You'll receive a confirmation email within 24 hours.")}>
            ✓ Submit Registration
          </button>
        </div>
      </div>
    </div>
  );

  /* ════════════════════════════
      ORGAN REQUEST PAGE
  ════════════════════════════ */
  const OrganRequestPage = () => (
    <div style={s.page}>
      <div style={{ maxWidth:700, margin:"0 auto" }}>
        <h1 style={{ fontFamily:"'Syne', sans-serif", fontSize:28, fontWeight:800, color:"#f0f0f0", marginBottom:8 }}>
          Request an Organ
        </h1>
        <p style={{ fontSize:14, color:"#888", marginBottom:32 }}>
          Submit an organ request. Our team will coordinate with partner hospitals to find a match.
        </p>

        <div style={s.card}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:18, marginBottom:18 }}>
            <div>
              <label style={s.label}>Required Organ <span style={{color:"#e02020"}}>*</span></label>
              <select style={s.select} value={reqForm.organ} onChange={e=>setReqForm({...reqForm,organ:e.target.value})}>
                <option value="">Select Organ</option>
                {ORGANS.map(o=><option key={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label style={s.label}>Patient Blood Group <span style={{color:"#e02020"}}>*</span></label>
              <select style={s.select} value={reqForm.bloodGroup} onChange={e=>setReqForm({...reqForm,bloodGroup:e.target.value})}>
                <option value="">Select</option>
                {BLOOD_GROUPS.map(b=><option key={b}>{b}</option>)}
              </select>
            </div>
          </div>

          <div style={{ marginBottom:18 }}>
            <label style={s.label}>Urgency Level <span style={{color:"#e02020"}}>*</span></label>
            <div style={{ display:"flex", gap:8 }}>
              {URGENCY_LEVELS.map(u=>{
                const c = URGENCY_COLOR[u];
                const sel = reqForm.urgency===u;
                return (
                  <button key={u} type="button" onClick={()=>setReqForm({...reqForm,urgency:u})}
                    style={{ 
                      flex:1, 
                      padding:"10px 6px", 
                      borderRadius:8,
                      border:`1.5px solid ${sel?c:"rgba(255,255,255,0.07)"}`, 
                      background:sel?`${c}15`:"transparent",
                      color:sel?c:"#888", 
                      cursor:"pointer", 
                      fontSize:13, 
                      fontWeight:700,
                      textTransform:"capitalize", 
                      fontFamily:"inherit",
                      transition:"all 0.2s"
                    }}>
                    {u}
                  </button>
                );
              })}
            </div>
          </div>

          <div style={{ marginBottom:18 }}>
            <label style={s.label}>Hospital Name <span style={{color:"#e02020"}}>*</span></label>
            <input style={s.input} placeholder="e.g. Aga Khan University Hospital" value={reqForm.hospital} onChange={e=>setReqForm({...reqForm,hospital:e.target.value})} />
          </div>

          <div style={{ marginBottom:18 }}>
            <label style={s.label}>Patient Condition</label>
            <textarea style={s.textarea} placeholder="Describe the patient's current medical condition and why the organ is needed..." value={reqForm.condition} onChange={e=>setReqForm({...reqForm,condition:e.target.value})} />
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:18, marginBottom:18 }}>
            <div>
              <label style={s.label}>City <span style={{color:"#e02020"}}>*</span></label>
              <select style={s.select} value={reqForm.city} onChange={e=>setReqForm({...reqForm,city:e.target.value})}>
                <option value="">Select City</option>
                {CITIES.map(c=><option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={s.label}>Contact Number <span style={{color:"#e02020"}}>*</span></label>
              <input style={s.input} placeholder="+92 300 0000000" value={reqForm.phone} onChange={e=>setReqForm({...reqForm,phone:e.target.value})} />
            </div>
          </div>

          <div style={{ marginBottom:20 }}>
            <label style={s.label}>Additional Notes</label>
            <textarea style={{ ...s.textarea, minHeight:60 }} placeholder="Any other relevant information..." value={reqForm.notes} onChange={e=>setReqForm({...reqForm,notes:e.target.value})} />
          </div>

          <button style={{ ...s.btnPrimary, width:"100%", padding:13, fontSize:15 }}
            onClick={() => alert("✅ Organ request submitted! Our coordination team will contact you within 2 hours.")}>
            Submit Organ Request
          </button>
        </div>
      </div>
    </div>
  );

  /* ════════════════════════════
      SEARCH DONORS PAGE
  ════════════════════════════ */
  const SearchPage = () => (
    <div style={s.page}>
      <h1 style={{ fontFamily:"'Syne', sans-serif", fontSize:28, fontWeight:800, color:"#f0f0f0", marginBottom:8 }}>
        Find Organ Donors
      </h1>
      <p style={{ fontSize:14, color:"#888", marginBottom:28 }}>
        Search our verified donor database across Pakistan.
      </p>

      {/* Filter card */}
      <div style={{ ...s.card, marginBottom:20 }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))", gap:14, alignItems:"end" }}>
          <div>
            <label style={s.label}>Organ Type</label>
            <select style={s.select} value={search.organ} onChange={e=>setSearch({...search,organ:e.target.value})}>
              <option value="">All Organs</option>
              {ORGANS.map(o=><option key={o}>{o}</option>)}
            </select>
          </div>
          <div>
            <label style={s.label}>Blood Group</label>
            <select style={s.select} value={search.bloodGroup} onChange={e=>setSearch({...search,bloodGroup:e.target.value})}>
              <option value="">All Groups</option>
              {BLOOD_GROUPS.map(b=><option key={b}>{b}</option>)}
            </select>
          </div>
          <div>
            <label style={s.label}>City</label>
            <select style={s.select} value={search.city} onChange={e=>setSearch({...search,city:e.target.value})}>
              <option value="">All Cities</option>
              {CITIES.map(c=><option key={c}>{c}</option>)}
            </select>
          </div>
          <button style={{ ...s.btnGhost, color:"#f0f0f0", height:46 }} onClick={()=>setSearch({organ:"",bloodGroup:"",city:""})}>
            Clear Filters
          </button>
        </div>
      </div>

      <p style={{ color:"#888", fontSize:14, marginBottom:14 }}>
        Showing <strong style={{color:"#f0f0f0"}}>{filtered.length}</strong> donor(s)
        {(search.organ||search.bloodGroup||search.city) && " matching your filters"}
      </p>

      <div style={s.grid2}>
        {filtered.length === 0
          ? <div style={{ ...s.card, textAlign:"center", padding:"3rem", gridColumn:"1/-1" }}>
              <p style={{ fontSize:32, marginBottom:12 }}>🔍</p>
              <p style={{ fontWeight:700, color:"#f0f0f0", marginBottom:6 }}>No donors found</p>
              <p style={{ color:"#888", fontSize:14 }}>Try adjusting your filters</p>
            </div>
          : filtered.map(d=>(
            <div key={d.id} style={s.card}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = "rgba(224,32,32,0.25)";
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                e.currentTarget.style.transform = "translateY(0)";
              }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"start" }}>
                <div style={{ display:"flex", gap:13, alignItems:"center" }}>
                  <div style={{ 
                    width:50, 
                    height:50, 
                    borderRadius:13, 
                    background:"linear-gradient(135deg,rgba(224,32,32,0.18),rgba(224,32,32,0.05))", 
                    border:"1px solid rgba(224,32,32,0.18)", 
                    display:"flex", 
                    alignItems:"center", 
                    justifyContent:"center", 
                    fontFamily:"'Syne', sans-serif", 
                    fontSize:18, 
                    fontWeight:800, 
                    color:"#e02020", 
                    flexShrink:0 
                  }}>
                    {d.name.split(" ").map(n=>n[0]).join("")}
                  </div>
                  <div>
                    <p style={{ fontFamily:"'Syne', sans-serif", fontSize:15.5, fontWeight:700, color:"#f0f0f0", margin:0 }}>{d.name}</p>
                    <p style={{ color:"#888", fontSize:12, margin:0 }}>Age {d.age} · 📍 {d.city}</p>
                  </div>
                </div>
                <div style={{ textAlign:"right" }}>
                  <span style={{ ...s.badge("#e02020"), display:"block", marginBottom:4, fontSize:13, padding:"3px 10px" }}>{d.bg}</span>
                  <span style={{ ...s.badge(d.available?"#55efc4":"#6b7280"), fontSize:11 }}>
                    {d.available?"✓ Available":"Unavailable"}
                  </span>
                </div>
              </div>
              <div style={{ marginTop:12, paddingTop:12, borderTop:"1px solid rgba(255,255,255,0.07)" }}>
                <p style={{ fontSize:12, color:"#888", marginBottom:8 }}>Willing to donate:</p>
                <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                  {d.organs.map(o=>
                    <span key={o} style={{ 
                      background:"rgba(255,255,255,0.05)", 
                      border:"1px solid rgba(255,255,255,0.08)", 
                      color:"#888", 
                      padding:"3px 10px", 
                      borderRadius:7, 
                      fontSize:11 
                    }}>
                      {o}
                    </span>
                  )}
                </div>
              </div>
              <div style={{ marginTop:12, display:"flex", gap:8 }}>
                <button style={{ ...s.btnPrimary, flex:1, padding:"9px", fontSize:13, borderRadius:9 }}>Contact</button>
                <button style={{ ...s.btnOutline, flex:1, padding:"9px", fontSize:13, borderRadius:9 }}>View Profile</button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );

  /* ════════════════════════════
      EMERGENCY PAGE
  ════════════════════════════ */
  const EmergencyPage = () => (
    <div style={s.page}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:28, flexWrap:"wrap", gap:10 }}>
        <div>
          <div style={s.sectionLabel} style={{ justifyContent:"flex-start", color:"#ff6060" }}>
            <span style={{ width:22, height:1, background:"#ff6060", opacity:0.5 }}></span>
            🚨 Urgent Cases
          </div>
          <h1 style={{ fontFamily:"'Syne', sans-serif", fontSize:28, fontWeight:800, color:"#f0f0f0", margin:0 }}>
            Emergency Organ Requests
          </h1>
          <p style={{ color:"#888", fontSize:14, marginTop:4 }}>
            These patients require immediate transplants. Every minute counts. Contact the hospitals directly.
          </p>
        </div>
        <button style={s.btnPrimary} onClick={() => nav("organ-request")}>+ New Request</button>
      </div>

      {/* Legend */}
      <div style={{ display:"flex", gap:11, justifyContent:"center", marginBottom:38, flexWrap:"wrap" }}>
        {Object.entries(URGENCY_COLOR).map(([u,c])=>(
          <div key={u} style={{ 
            display:"flex", 
            alignItems:"center", 
            gap:7, 
            padding:"9px 20px", 
            borderRadius:100, 
            fontSize:13, 
            fontWeight:700,
            background:`${c}12`,
            border:`1px solid ${c}25`,
            color:c
          }}>
            <span style={{ 
              width:7, 
              height:7, 
              background:c, 
              borderRadius:"50%",
              animation:"pulse 1.4s infinite"
            }}></span>
            <span style={{ textTransform:"capitalize" }}>{u} Priority</span>
          </div>
        ))}
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))", gap:18 }}>
        {MOCK_EMERGENCY.map(req=>(
          <div key={req.id} 
            style={{ 
              ...s.card, 
              borderLeft:`3px solid ${URGENCY_COLOR[req.urgency]}`
            }}
            onMouseEnter={e => e.currentTarget.style.transform = "translateY(-3px)"}
            onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
            <div style={s.badge(URGENCY_COLOR[req.urgency])} style={{ 
              display:"inline-flex", 
              alignItems:"center", 
              gap:6, 
              padding:"4px 13px", 
              borderRadius:100, 
              fontSize:10.5, 
              fontWeight:800, 
              letterSpacing:"0.06em", 
              textTransform:"uppercase", 
              marginBottom:12,
              background:`${URGENCY_COLOR[req.urgency]}13`,
              color:URGENCY_COLOR[req.urgency]
            }}>
              <span style={{ 
                width:6, 
                height:6, 
                borderRadius:"50%", 
                background:URGENCY_COLOR[req.urgency],
                animation:"pulse 1.4s infinite"
              }}></span>
              {req.urgency} Priority
            </div>
            <div style={{ fontFamily:"'Syne', sans-serif", fontSize:21, fontWeight:800, color:"#f0f0f0", marginBottom:7 }}>
              {req.organ} Needed
            </div>
            <div style={{ fontSize:13, color:"#888", display:"flex", alignItems:"center", gap:6, marginBottom:3 }}>
              👤 {req.patient}
            </div>
            <div style={{ fontSize:13, color:"#888", display:"flex", alignItems:"center", gap:6, marginBottom:3 }}>
              📍 {req.city}
            </div>
            <div style={{ fontSize:13, color:"#888", display:"flex", alignItems:"center", gap:6, marginBottom:3 }}>
              🩺 {req.condition}
            </div>
            <div style={{ 
              display:"inline-flex", 
              alignItems:"center", 
              background:"rgba(224,32,32,0.1)", 
              border:"1px solid rgba(224,32,32,0.22)", 
              color:"#e02020", 
              fontWeight:800, 
              fontFamily:"'Syne', sans-serif", 
              padding:"4px 13px", 
              borderRadius:9, 
              fontSize:15.5, 
              marginTop:11 
            }}>
              🩸 {req.bg}
            </div>
            <div style={{ 
              display:"flex", 
              alignItems:"center", 
              justifyContent:"space-between", 
              marginTop:16, 
              paddingTop:16, 
              borderTop:"1px solid rgba(255,255,255,0.07)" 
            }}>
              <div style={{ fontSize:11.5, color:"#4a4a4a" }}>🏥 {req.hospital}</div>
              <button style={{ ...s.btnPrimary, padding:"6px 14px", fontSize:12, borderRadius:8 }}>
                Contact
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  /* ════════════════════════════
      AWARENESS PAGE
  ════════════════════════════ */
  const AwarenessPage = () => (
    <div style={s.page}>
      <div style={{ 
        background:"linear-gradient(135deg,rgba(224,32,32,0.1),rgba(224,32,32,0.03))",
        border:"1px solid rgba(224,32,32,0.15)",
        borderRadius:22,
        padding:40,
        marginBottom:48,
        display:"grid",
        gridTemplateColumns:"1fr 1fr",
        gap:32,
        alignItems:"center"
      }}>
        <div>
          <div style={s.sectionLabel} style={{ justifyContent:"flex-start" }}>
            <span style={{ width:22, height:1, background:"#e02020", opacity:0.5 }}></span>
            Education & Awareness
          </div>
          <h2 style={{ fontFamily:"'Syne', sans-serif", fontSize:"clamp(28px, 4vw, 38px)", fontWeight:800, color:"#f0f0f0", marginBottom:14, textAlign:"left" }}>
            Know the Facts.<br/>Save <span style={s.heroAccent}>More Lives.</span>
          </h2>
          <p style={{ color:"#888", fontSize:15, lineHeight:1.8, marginBottom:24 }}>
            Understanding organ donation can break barriers and save lives. Learn the truth, eligibility rules, and how the process works in Pakistan.
          </p>
          <button style={{ ...s.btnPrimary, padding:"13px 32px", borderRadius:11, fontSize:15 }} 
            onClick={() => nav("donor-register")}>
            Become a Donor Today →
          </button>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
          {[["8","Lives one donor can save"],["50K+","Pakistanis waiting"],["✓","Islamically permissible"],["Free","No cost to donors"]].map(([num,label],i)=>(
            <div key={i} style={{ 
              background:i%2===0?"rgba(224,32,32,0.08)":"rgba(255,255,255,0.03)",
              border:i%2===0?"1px solid rgba(224,32,32,0.15)":"1px solid rgba(255,255,255,0.07)",
              borderRadius:14,
              padding:20,
              textAlign:"center"
            }}>
              <div style={{ fontFamily:"'Syne', sans-serif", fontSize:32, fontWeight:800, color:i%2===0?"#e02020":"#f0f0f0" }}>
                {num}
              </div>
              <div style={{ fontSize:13, color:"#888", marginTop:5 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ textAlign:"center", marginBottom:60, marginTop:40 }}>
        <div style={s.sectionLabel} style={{ justifyContent:"center" }}>
          <span style={{ width:22, height:1, background:"#e02020", opacity:0.5 }}></span>
          Key Topics
          <span style={{ width:22, height:1, background:"#e02020", opacity:0.5 }}></span>
        </div>
        <h2 style={s.sectionH}>Awareness & <span style={s.heroAccent}>Education</span></h2>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:22 }}>
        {AWARENESS_TOPICS.map(topic=>(
          <div key={topic.title} style={s.card}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = "rgba(224,32,32,0.2)";
              e.currentTarget.style.transform = "translateY(-4px)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
              e.currentTarget.style.transform = "translateY(0)";
            }}>
            <div style={{ fontSize:34, marginBottom:16 }}>{topic.icon}</div>
            <h3 style={{ fontFamily:"'Syne', sans-serif", fontSize:17.5, fontWeight:700, color:"#f0f0f0", marginBottom:10 }}>
              {topic.title}
            </h3>
            <p style={{ fontSize:13.5, color:"#888", lineHeight:1.75 }}>{topic.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );

  /* ════════════════════════════
      DASHBOARD PAGE
  ════════════════════════════ */
  const DashboardPage = () => (
    <div style={s.page}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:28, flexWrap:"wrap", gap:10 }}>
        <div>
          <p style={{ fontSize:13, color:"#888", marginBottom:5 }}>
            Welcome back, <strong style={{color:"#e02020",textTransform:"capitalize"}}>{userRole}</strong>
          </p>
          <h1 style={{ fontFamily:"'Syne', sans-serif", fontSize:28, fontWeight:800, color:"#f0f0f0", margin:0 }}>
            OrganBridge Dashboard
          </h1>
        </div>
        <div style={{ display:"flex", gap:8 }}>
          <button style={s.btnOutline} onClick={() => nav(userRole==="donor"?"donor-register":"organ-request")}>
            {userRole==="donor" ? "Update Donor Info" : "New Request"}
          </button>
        </div>
      </div>

      {/* Stat cards */}
      <div style={{ ...s.grid4, marginBottom:28 }}>
        {[["Total Donors","12,408","↑ 8.2% this month"],["Active Requests","2,341","↑ 14 today"],["Transplants Done","3,892","↑ 23 this week"],["Hospitals","284","Stable"]].map(([l,n,t])=>(
          <div key={l} style={{ 
            ...s.card, 
            textAlign:"center",
            position:"relative",
            overflow:"hidden"
          }}>
            <div style={{ 
              position:"absolute", 
              top:-10, 
              right:-10, 
              width:70, 
              height:70, 
              background:"radial-gradient(circle,rgba(224,32,32,0.28),transparent)",
              pointerEvents:"none"
            }}></div>
            <div style={{ fontSize:12, color:"#888", fontWeight:600, marginBottom:7, textTransform:"uppercase", letterSpacing:"0.04em" }}>
              {l}
            </div>
            <div style={{ fontFamily:"'Syne', sans-serif", fontSize:32, fontWeight:800, color:"#e02020" }}>{n}</div>
            <div style={{ fontSize:11.5, color:t.includes("↑")?"#4ade80":"#888", marginTop:6 }}>{t}</div>
          </div>
        ))}
      </div>

      <p style={{ color:"#888", fontSize:14, textAlign:"center", marginTop:40 }}>
        Additional dashboard charts and analytics coming soon...
      </p>
    </div>
  );

  /* ════════════════════════════
      FOOTER
  ════════════════════════════ */
  const Footer = () => (
    <footer style={{ background:"#141414", borderTop:"1px solid rgba(255,255,255,0.07)", padding:"64px 0 28px", marginTop:80 }}>
      <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 28px" }}>
        <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr", gap:44, marginBottom:48 }}>
          <div>
            <div style={{ display:"flex", gap:8, alignItems:"center", marginBottom:14 }}>
              <div style={{ width:28, height:28, background:"#e02020", borderRadius:6, display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, color:"#fff" }}>🫀</div>
              <span style={{ fontFamily:"'Syne', sans-serif", fontWeight:800, color:"#f0f0f0", fontSize:16 }}>OrganBridge</span>
            </div>
            <p style={{ fontSize:14, color:"#888", lineHeight:1.75, margin:"14px 0 18px", maxWidth:300 }}>
              Pakistan's unified organ donation and transplant management platform connecting donors, patients, and hospitals to save lives together.
            </p>
          </div>
          <div>
            <p style={{ fontFamily:"'Syne', sans-serif", fontSize:13.5, fontWeight:700, color:"#f0f0f0", marginBottom:18 }}>
              Quick Links
            </p>
            {[["Home","home"],["Find Donors","search"],["Emergency Requests","emergency"],["Request Organ","organ-request"]].map(([l,p])=>(
              <p key={l} style={{ marginBottom:10 }}>
                <span onClick={()=>nav(p)} style={{ color:"#888", fontSize:13.5, cursor:"pointer", transition:"color 0.2s" }}
                  onMouseEnter={e => e.target.style.color = "#e02020"}
                  onMouseLeave={e => e.target.style.color = "#888"}>
                  {l}
                </span>
              </p>
            ))}
          </div>
          <div>
            <p style={{ fontFamily:"'Syne', sans-serif", fontSize:13.5, fontWeight:700, color:"#f0f0f0", marginBottom:18 }}>
              Resources
            </p>
            {["Donor Eligibility","Donation Process","Organ Types Guide","Islamic Perspective","FAQ"].map(l=>(
              <p key={l} style={{ color:"#888", fontSize:13.5, marginBottom:10, cursor:"pointer", transition:"color 0.2s" }}
                onClick={() => nav("awareness")}
                onMouseEnter={e => e.target.style.color = "#e02020"}
                onMouseLeave={e => e.target.style.color = "#888"}>
                {l}
              </p>
            ))}
          </div>
          <div>
            <p style={{ fontFamily:"'Syne', sans-serif", fontSize:13.5, fontWeight:700, color:"#f0f0f0", marginBottom:18 }}>
              Contact
            </p>
            <p style={{ color:"#888", fontSize:13.5, marginBottom:6 }}>📧 info@organbridge.pk</p>
            <p style={{ color:"#888", fontSize:13.5, marginBottom:6 }}>📞 0800-ORGAN-PK</p>
            <p style={{ color:"#888", fontSize:13.5, marginBottom:6 }}>📍 Karachi, Pakistan</p>
            <p style={{ color:"#888", fontSize:13.5 }}>🕐 24/7 Emergency Support</p>
          </div>
        </div>
        <div style={{ borderTop:"1px solid rgba(255,255,255,0.07)", paddingTop:22, display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:14 }}>
          <p style={{ color:"#4a4a4a", fontSize:13 }}>© 2025 OrganBridge. All rights reserved. Built with ❤️ to save lives.</p>
          <div style={{ display:"flex", gap:18 }}>
            <a href="#" style={{ fontSize:13, color:"#4a4a4a", textDecoration:"none" }}>Privacy Policy</a>
            <a href="#" style={{ fontSize:13, color:"#4a4a4a", textDecoration:"none" }}>Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );

  /* ════════════════════════════
      PAGE ROUTER
  ════════════════════════════ */
  const renderPage = () => {
    if (page === "home") return <HomePage />;
    if (page === "donor-register") return loggedIn ? <DonorRegisterPage /> : <HomePage />;
    if (page === "organ-request") return <OrganRequestPage />;
    if (page === "search") return <SearchPage />;
    if (page === "emergency") return <EmergencyPage />;
    if (page === "awareness") return <AwarenessPage />;
    if (page === "dashboard") return loggedIn ? <DashboardPage /> : <HomePage />;
    return <HomePage />;
  };

  useEffect(() => {
    if ((page === "donor-register" || page === "dashboard") && !loggedIn) {
      setShowAuth(true);
    }
  }, [page, loggedIn]);

  return (
    <div style={s.root}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap');
        
        * { box-sizing:border-box; margin:0; padding:0; }
        
        input:focus, select:focus, textarea:focus, button:focus {
          outline: none;
          border-color: rgba(224,32,32,0.4) !important;
        }
        
        button:hover {
          opacity: 0.9;
          transform: translateY(-1px);
        }
        
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.09); border-radius: 4px; }
        
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.35; transform: scale(1.5); }
        }
      `}</style>
      
      <canvas ref={canvasRef} style={s.canvas} />
      <div style={s.content}>
        <Navbar />
        <UrgentBanner />
        {showAuth && <AuthModal />}
        {renderPage()}
        <Footer />
      </div>
    </div>
  );
}