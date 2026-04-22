import { useState, useRef } from "react";
import { buildPrompt, calcCTR, PRESET_EXPR } from "./constants";
import { GlowPicker, Tip, Toggle } from "./components/ui/Primitives";
import CTRMeter from "./components/ui/CTRMeter";
import BgUpload from "./components/ui/BgUpload";
import { CSS } from "./styles/css";
import ThumbnailPreview from "./components/thumbnail/ThumbnailPreview";


// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [sbOpen, setSbOpen] = useState(false);
  const [page, setPage]     = useState("thumbnail");
  const [toast, setToast]   = useState(null);
  const toastRef            = useRef(null);

  const [profile, setProfile] = useState(()=>{
    try{return JSON.parse(localStorage.getItem("tgen_profile"))||{};}catch{return {};}
  });
  const prf = {channelName:"DRONE AISHU GAMING",characterName:"AISHU",channelUrl:"",...profile};

  const [s, setS] = useState({
    layoutType:"single", charPosition:"left",
    mainTitle:"INSANE CLUTCH", subText:"", subTextEnabled:false,
    bgWord:"OP", mainTextColor:"#ffffff", bgTextColor:"#ffffff",
    glowColor:"#7c3aed",
    glowEnabled:true, bgBlurEnabled:true, vignetteEnabled:true,
    neonBorderEnabled:true, particlesEnabled:true,
    scene:"explosion", expression:"shock",
    // ── NEW FIELDS ──
    useCustomExpression: false,
    customExprText: "",
    customBgImage: null,
    customBgDim: 0.45,
  });

  const upd = (k,v) => setS(p=>({...p,[k]:v}));
  const showToast = msg => {
    clearTimeout(toastRef.current);
    setToast(msg);
    toastRef.current = setTimeout(()=>setToast(null),2200);
  };

  const prompt = buildPrompt(s, prf);
  const ctr    = calcCTR(s);

  const NAV = [
    {id:"thumbnail",icon:"🖼",label:"Thumbnail"},
    {id:"dashboard",icon:"👤",label:"Profile"},
    {id:"guide",    icon:"📘",label:"Guide"},
  ];

  return (
    <>
      <style>{CSS}</style>
      <div className="app">

        {/* SIDEBAR */}
        <div className={`sidebar ${sbOpen?"open":""}`}>
          <div className="sidebar-logo">{profile?.characterName ? profile?.characterName?.split("").slice(0,1) : "A"}</div>
          {NAV.map(n=>(
            <div key={n.id} className={`nav-item ${page===n.id?"active":""}`} onClick={()=>setPage(n.id)}>
              <span className="nav-icon">{n.icon}</span>
              {sbOpen && <span>{n.label}</span>}
            </div>
          ))}
          <button className="toggle-btn" onClick={()=>setSbOpen(x=>!x)}>
            {sbOpen?"◀":"▶"}
          </button>
        </div>

        <div className="main">

          {/* ══════════ THUMBNAIL PAGE ══════════ */}
          {page==="thumbnail" && (
            <>
              <div className="page-header">
                <div className="page-title">THUMBNAIL GENERATOR</div>
                <div className="page-sub">Build high-CTR gaming thumbnails · live preview · AI prompt</div>
              </div>

              <div className="tgen-grid">

                {/* LEFT COLUMN */}
                <div style={{display:"flex",flexDirection:"column",gap:16}}>

                  {/* LAYOUT */}
                  <div className="card">
                    <div className="card-title">Layout</div>

                    <div className="field">
                      <div className="field-label">Type <Tip t="Single = face only. Dual = you + game char. Multi = squad. Dual/Multi add story tension."/></div>
                      <div className="seg-control">
                        {["single","dual","multi"].map(v=>(
                          <button key={v} className={`seg-btn ${s.layoutType===v?"active":""}`} onClick={()=>upd("layoutType",v)}>{v}</button>
                        ))}
                      </div>
                    </div>

                    <div className="field">
                      <div className="field-label">Character Position <Tip t="Left = natural eye entry for most viewers. Center = maximum dominance. Right = supporting role."/></div>
                      <div className="seg-control">
                        {["left","center","right"].map(v=>(
                          <button key={v} className={`seg-btn ${s.charPosition===v?"active":""}`} onClick={()=>upd("charPosition",v)}>{v}</button>
                        ))}
                      </div>
                    </div>

                    {/* EXPRESSION SECTION */}
                    <div className="field">
                      <div className="field-label">
                        Expression Mode
                        <Tip t="Preset = quick emoji expressions. Custom = type any emotion/mood as free text — injected into AI prompt and shown as badge on preview."/>
                      </div>
                      <div className="seg-control">
                        <button className={`seg-btn ${!s.useCustomExpression?"active":""}`} onClick={()=>upd("useCustomExpression",false)}>
                          🎭 Preset
                        </button>
                        <button className={`seg-btn ${s.useCustomExpression?"active-pink":""}`} onClick={()=>upd("useCustomExpression",true)}>
                          ✏️ Custom
                        </button>
                      </div>
                    </div>

                    {!s.useCustomExpression ? (
                      <div className="field">
                        <div className="seg-control">
                          {Object.entries(PRESET_EXPR).map(([k,v])=>(
                            <button key={k} className={`seg-btn ${s.expression===k?"active":""}`} onClick={()=>upd("expression",k)}>
                              {v} {k}
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="field">
                        <div className="field-label" style={{color:"var(--pink)"}}>
                          Your Expression Text
                          <Tip t="Write any emotion, mood, or vibe. Examples: 'villain smirk', 'battle cry', 'triumphant', 'cold stare', 'disbelief shock'. Goes directly into AI prompt."/>
                        </div>
                        <input
                          type="text"
                          className="custom-input"
                          value={s.customExprText}
                          onChange={e=>upd("customExprText",e.target.value)}
                          placeholder="villain smirk · battle cry · triumphant · broken · cold stare"
                          maxLength={60}
                        />
                        <div style={{fontSize:10,color:"var(--pink)",marginTop:5,fontStyle:"italic",lineHeight:1.5}}>
                          ↳ Embedded in AI prompt as emotion · shows as badge in preview (bottom-left)
                        </div>
                      </div>
                    )}
                  </div>

                  {/* TEXT */}
                  <div className="card">
                    <div className="card-title">Text</div>
                    <div className="field">
                      <div className="field-label">Main Title (0–3 words) <Tip t="Viewers have 0.5s. ALL CAPS + bold + thick outline = max readability at small size."/></div>
                      <input type="text" value={s.mainTitle} onChange={e=>upd("mainTitle",e.target.value)} placeholder="e.g. INSANE CLUTCH" maxLength={30}/>
                    </div>
                    <div className="toggle-row">
                      <span className="toggle-label">Sub Text <span className="badge">optional</span></span>
                      <Toggle on={s.subTextEnabled} fn={()=>upd("subTextEnabled",!s.subTextEnabled)}/>
                    </div>
                    {s.subTextEnabled && (
                      <div className="field" style={{marginTop:8}}>
                        <input type="text" value={s.subText} onChange={e=>upd("subText",e.target.value)} placeholder="e.g. SEASON 5 HIGHLIGHTS" maxLength={40}/>
                      </div>
                    )}
                    <hr className="section-divider"/>
                    <div className="field">
                      <div className="field-label">Background Word <Tip t="Low-opacity giant word behind subject. e.g. OP, CLUTCH, LEGEND, BROKEN — adds depth without competing."/></div>
                      <input type="text" value={s.bgWord} onChange={e=>upd("bgWord",e.target.value)} placeholder="OP / CLUTCH / LEGEND" maxLength={12}/>
                    </div>
                  </div>

                  {/* COLORS */}
                  <div className="card">
                    <div className="card-title">Colors</div>
                    <div className="field">
                      <div className="field-label">Glow Color <Tip t="Your glow color = brand signature. Purple = mystique. Pink = hype. Orange = danger. Cyan = futuristic."/></div>
                      <GlowPicker value={s.glowColor} onChange={v=>upd("glowColor",v)}/>
                    </div>
                    <div className="field" style={{marginTop:8}}>
                      <div className="field-label">Title Color</div>
                      <div className="color-row">
                        {["#ffffff","#facc15","#f97316","#ff00cc","#06b6d4"].map(c=>(
                          <div key={c} className={`color-swatch ${s.mainTextColor===c?"active":""}`}
                            style={{background:c}} onClick={()=>upd("mainTextColor",c)}/>
                        ))}
                        <input type="color" value={s.mainTextColor} onChange={e=>upd("mainTextColor",e.target.value)}/>
                      </div>
                    </div>
                  </div>

                  {/* SCENE & EFFECTS */}
                  <div className="card">
                    <div className="card-title">Scene & Effects</div>
                    <div className="field">
                      <div className="field-label">Background Scene <Tip t="Sets emotional backdrop. 'Custom Image' lets you upload your own game screenshot or artwork."/></div>
                      <select value={s.scene} onChange={e=>upd("scene",e.target.value)}>
                        <option value="explosion">🔥 Explosion / Action</option>
                        <option value="battle">⚔️ Battle Arena</option>
                        <option value="neon_city">🌆 Neon City</option>
                        <option value="map">🗺️ Game Map</option>
                        <option value="galaxy">🌌 Galaxy / Epic</option>
                        <option value="custom">🖼️ Custom Image ✦</option>
                      </select>
                    </div>
                    <hr className="section-divider"/>
                    {[
                      {key:"glowEnabled",      label:"Glow FX",       badge:"+10 CTR", tip:"Neon outlines make subjects pop on dark backgrounds and small screens."},
                      {key:"vignetteEnabled",   label:"Vignette",      badge:"+10 CTR", tip:"Darkened corners force the eye to the center subject. Subtle but very effective."},
                      {key:"particlesEnabled",  label:"Particles",     badge:"+8 CTR",  tip:"Floating sparks add kinetic energy and perceived production value."},
                      {key:"neonBorderEnabled", label:"Neon Border",   badge:"+7 CTR",  tip:"Glowing frame separates your thumbnail from adjacent videos."},
                      {key:"bgBlurEnabled",     label:"BG Depth Blur", badge:"+8 CTR",  tip:"Blur mimics camera depth-of-field. Makes subject feel 3D and cinematic."},
                    ].map(ef=>(
                      <div key={ef.key} className="toggle-row">
                        <span className="toggle-label">
                          {ef.label}
                          <span className="badge">{ef.badge}</span>
                          <Tip t={ef.tip}/>
                        </span>
                        <Toggle on={s[ef.key]} fn={()=>upd(ef.key,!s[ef.key])}/>
                      </div>
                    ))}
                  </div>

                  {/* ★★★ CUSTOM SECTION ★★★ */}
                  <div className="card custom-card">
                    <div className="card-title" style={{color:"var(--pink)"}}>Custom Overrides</div>

                    {/* CUSTOM BG IMAGE */}
                    <div className="field">
                      <div className="field-label" style={{color:"var(--pink)"}}>
                        Custom Background Image
                        <Tip t="Upload any PNG/JPG — your game screenshot, map, cinematic frame, or AI art. Selects 'Custom Image' scene automatically."/>
                      </div>
                      <BgUpload
                        imageUrl={s.customBgImage}
                        onImage={url=>{upd("customBgImage",url); upd("scene","custom"); showToast("🖼️ Background set! Scene switched to Custom.");}}
                        onClear={()=>{upd("customBgImage",null); upd("scene","explosion");}}
                      />

                      {s.customBgImage && (
                        <div style={{marginTop:12}}>
                          <div className="field-label" style={{marginBottom:6,color:"var(--pink)"}}>
                            Darkness Overlay
                            <Tip t="Darken the image so your face and title stay visible. 40–60% is the sweet spot for most gaming screenshots."/>
                          </div>
                          <div className="overlay-row">
                            <label>Light</label>
                            <input type="range" min="0" max="0.85" step="0.05"
                              value={s.customBgDim}
                              onChange={e=>upd("customBgDim",parseFloat(e.target.value))}/>
                            <label>Dark</label>
                            <span style={{fontSize:11,color:"var(--pink)",fontWeight:700,minWidth:32,textAlign:"right"}}>
                              {Math.round(s.customBgDim*100)}%
                            </span>
                          </div>
                          <div style={{fontSize:10,color:"var(--muted)",marginTop:5}}>
                            💡 Toggle <strong style={{color:"var(--cyan)"}}>BG Depth Blur</strong> to add cinematic blur to custom image
                          </div>
                        </div>
                      )}
                    </div>

                    <hr className="section-divider"/>

                    {/* CUSTOM EXPRESSION REMINDER */}
                    <div className="hint-box">
                      <div style={{fontSize:11,fontWeight:700,color:"var(--pink)",letterSpacing:1,marginBottom:4}}>
                        ✏️ CUSTOM EXPRESSION
                      </div>
                      <div style={{fontSize:12,color:"var(--muted)",lineHeight:1.6}}>
                        Switch to <strong style={{color:"var(--text)"}}>✏️ Custom</strong> mode in the Layout → Expression section to type any emotion as free text.
                        It feeds directly into the AI prompt and appears as a label badge on the bottom-left of the preview.
                      </div>
                      {!s.useCustomExpression && (
                        <button
                          className="copy-btn ghost"
                          style={{marginTop:10,padding:"6px 14px",fontSize:11}}
                          onClick={()=>{upd("useCustomExpression",true);showToast("✏️ Custom expression mode ON!");}}
                        >
                          → Enable Custom Expression
                        </button>
                      )}
                      {s.useCustomExpression && (
                        <div style={{marginTop:8,fontSize:11,color:"var(--green)",fontWeight:700}}>
                          ✓ Active — type your expression above in Layout section
                        </div>
                      )}
                    </div>
                  </div>

                </div>

                {/* RIGHT COLUMN — PREVIEW */}
                <div className="preview-wrap">
                  <div className="card-title preview-label">Live Preview</div>
                  <ThumbnailPreview s={s} prf={prf}/>
                  <CTRMeter score={ctr}/>

                  <div className="card" style={{marginTop:4}}>
                    <div className="card-title">AI Prompt Output</div>
                    <div className="prompt-box">
                      {prompt.split("\n").map((line,i)=>{
                        if (!line.trim()) return <br key={i}/>;
                        return (
                          <div key={i}>
                            {line.split(/(\*\*[^*]+\*\*)/g).map((p,j)=>
                              p.startsWith("**")&&p.endsWith("**")
                                ? <span key={j} className="kw">{p.slice(2,-2)}</span>
                                : <span key={j}>{p}</span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                    <div style={{display:"flex",gap:10,marginTop:12,flexWrap:"wrap"}}>
                      <button className="copy-btn primary" onClick={()=>{
                        navigator.clipboard.writeText(prompt.replace(/\*\*/g,"")).then(()=>showToast("✅ Full prompt copied!"));
                      }}>📋 Copy Full Prompt</button>
                      <button className="copy-btn ghost" onClick={()=>{
                        const expr = s.useCustomExpression&&s.customExprText?.trim() ? s.customExprText : s.expression;
                        const short = `YouTube gaming thumbnail, ${expr} face ${s.charPosition}, ${s.scene==="custom"?"custom background":s.scene.replace("_"," ")} scene, neon glow, cinematic lighting, title "${s.mainTitle||"YOUR TITLE"}", 16:9 1920x1080.`;
                        navigator.clipboard.writeText(short).then(()=>showToast("✅ Short prompt copied!"));
                      }}>Short</button>
                    </div>
                    <div style={{marginTop:10,fontSize:11,color:"var(--muted)",lineHeight:1.6}}>
                      💡 <strong style={{color:"var(--purple2)"}}>Midjourney</strong>: add <code style={{color:"var(--cyan)"}}>--ar 16:9 --v 6</code> &nbsp;·&nbsp;
                      <strong style={{color:"var(--pink)"}}>Leonardo AI</strong>: Lightning XL model &nbsp;·&nbsp;
                      <strong style={{color:"var(--yellow)"}}>DALL·E 3</strong>: paste short prompt
                    </div>
                  </div>

                  <div className="card">
                    <div className="card-title">Best Practices</div>
                    {[
                      {icon:"👁",  t:"Face/subject is the brightest focal point"},
                      {icon:"🎨", t:"High contrast: dark bg + vivid neon accents"},
                      {icon:"✍️", t:"Title is 0–3 words, bold, readable at 100px"},
                      {icon:"📐", t:"Single dominant composition — no clutter"},
                      {icon:"📱", t:"Test at mobile size (150×84px)"},
                      {icon:"🏷", t:"Channel branding consistent every video"},
                      {icon:"🎭", t:"Strong emotion — shock/hype outperform neutral 2–3×"},
                      {icon:"🖼️", t:"Custom BG: add 40–60% darkness overlay for contrast"},
                      {icon:"🔲", t:"Export 1920×1080 PNG, embed keywords in filename"},
                    ].map((c,i)=>(
                      <div key={i} style={{display:"flex",gap:10,alignItems:"flex-start",padding:"5px 0",borderBottom:"1px solid var(--border)",fontSize:12}}>
                        <span>{c.icon}</span><span style={{color:"var(--text)"}}>{c.t}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ══════════ PROFILE PAGE ══════════ */}
          {page==="dashboard" && (
            <>
              <div className="page-header">
                <div className="page-title">CHANNEL PROFILE</div>
                <div className="page-sub">Used across all prompts and branding elements</div>
              </div>
              <div style={{maxWidth:500}}>
                <div className="card">
                  <div className="card-title">Profile Setup</div>
                  {[
                    {key:"channelName",  label:"Channel Name",     ph:"DRONE AISHU GAMING"},
                    {key:"characterName",label:"Character / Alias", ph:"AISHU"},
                    {key:"channelUrl",   label:"Channel URL",       ph:"youtube.com/@..."},
                  ].map(f=>(
                    <div key={f.key} className="field">
                      <div className="field-label">{f.label}</div>
                      <input type="text" value={profile[f.key]||""} placeholder={f.ph}
                        onChange={e=>setProfile(p=>({...p,[f.key]:e.target.value}))}/>
                    </div>
                  ))}
                  <button className="copy-btn primary" style={{marginTop:8}} onClick={()=>{
                    localStorage.setItem("tgen_profile",JSON.stringify(profile));
                    showToast("✅ Profile saved!");
                  }}>💾 Save Profile</button>
                </div>
                <div className="card" style={{marginTop:16}}>
                  <div className="card-title">Preview</div>
                  <div style={{
                    background:"linear-gradient(135deg,rgba(124,58,237,.13),rgba(236,72,153,.07))",
                    border:"1px solid var(--purple)",borderRadius:10,padding:"20px 24px",
                    fontFamily:"'Bebas Neue',sans-serif",letterSpacing:2,
                  }}>
                    <div style={{fontSize:28,color:"var(--purple2)",textShadow:"0 0 20px var(--purple)"}}>{prf.channelName}</div>
                    <div style={{fontSize:14,color:"var(--pink)",marginTop:4}}>✦ {prf.characterName}</div>
                    {prf.channelUrl&&<div style={{fontSize:11,color:"var(--muted)",marginTop:6,fontFamily:"'Share Tech Mono'"}}>{prf.channelUrl}</div>}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ══════════ GUIDE PAGE ══════════ */}
          {page==="guide" && (
            <>
              <div className="page-header">
                <div className="page-title">PROMPT GUIDE</div>
                <div className="page-sub">Turn generated prompts into real thumbnails</div>
              </div>
              <div style={{maxWidth:720,display:"flex",flexDirection:"column",gap:16}}>
                {[
                  {title:"AI Tools to use",content:[
                    "🎨 Midjourney — Best cinematic quality. /imagine [prompt] --ar 16:9 --v 6",
                    "🖼 Leonardo AI — Free tier. Use 'Lightning XL' or 'Absolute Reality' model.",
                    "💬 ChatGPT DALL·E 3 — Paste short prompt. Say '16:9 YouTube gaming thumbnail'.",
                    "⚡ Adobe Firefly — Best for adding clean text. Use after generating base image.",
                  ]},
                  {title:"Custom Expression Tips",content:[
                    "✅ Be specific: 'villain smirk', 'battle-hardened stare', 'triumphant roar'",
                    "✅ Add intensity cues: 'cold calculating focus', 'unhinged rage', 'silent menace'",
                    "✅ Mix mood + body: 'fist raised screaming', 'head down defeated', 'jaw dropped'",
                    "❌ Avoid vague words: 'cool', 'happy', 'nice' — AI can't visualize these precisely",
                    "💡 The custom expression text flows directly into the AI prompt as the emotion descriptor.",
                  ]},
                  {title:"Custom Background Tips",content:[
                    "✅ Use in-game screenshots at max graphic settings for authenticity.",
                    "✅ Best shots: killcam, victory screen, map overview, cinematic cutscene frame.",
                    "✅ Set darkness overlay at 40–60% so face and title stay dominant.",
                    "✅ Enable BG Depth Blur to add cinematic separation between layers.",
                    "❌ Avoid: cluttered HUDs, busy UI elements, or overly bright images.",
                    "💡 Upload → auto-switches to Custom Image scene. Use the darkness slider to tune.",
                  ]},
                  {title:"How to Iterate for Max CTR",content:[
                    "1️⃣ Generate 4 variations. Pick best composition.",
                    "2️⃣ Upscale the winner (Midjourney U1–U4).",
                    "3️⃣ Add real face + title text in Canva or Photoshop.",
                    "4️⃣ A/B test on YouTube for 14 days minimum.",
                    "5️⃣ Aim >5% CTR. >7% is exceptional 🔥 Iterate the loser.",
                  ]},
                ].map((sec,i)=>(
                  <div key={i} className="card">
                    <div className="card-title">{sec.title}</div>
                    {sec.content.map((c,j)=>(
                      <div key={j} style={{padding:"6px 0",borderBottom:"1px solid var(--border)",fontSize:13,lineHeight:1.6,color:"var(--text)"}}>{c}</div>
                    ))}
                  </div>
                ))}
              </div>
            </>
          )}

        </div>
      </div>

      {toast && <div className="toast">{toast}</div>}
    </>
  );
}