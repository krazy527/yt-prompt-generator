
function LayoutCard({ s, upd }) {
  return (
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
        <div className="field-label">Character Position <Tip t="Left = natural eye entry. Center = maximum dominance. Right = supporting role."/></div>
        <div className="seg-control">
          {["left","center","right"].map(v=>(
            <button key={v} className={`seg-btn ${s.charPosition===v?"active":""}`} onClick={()=>upd("charPosition",v)}>{v}</button>
          ))}
        </div>
      </div>
      <div className="field">
        <div className="field-label">Expression Mode <Tip t="Preset = quick emoji. Custom = type any emotion as free text — injected into AI prompt + shown as badge on preview."/></div>
        <div className="seg-control">
          <button className={`seg-btn ${!s.useCustomExpression?"active":""}`} onClick={()=>upd("useCustomExpression",false)}>🎭 Preset</button>
          <button className={`seg-btn ${s.useCustomExpression?"active-pink":""}`} onClick={()=>upd("useCustomExpression",true)}>✏️ Custom</button>
        </div>
      </div>
      {!s.useCustomExpression ? (
        <div className="field">
          <div className="seg-control">
            {Object.entries(PRESET_EXPR).map(([k,v])=>(
              <button key={k} className={`seg-btn ${s.expression===k?"active":""}`} onClick={()=>upd("expression",k)}>{v} {k}</button>
            ))}
          </div>
        </div>
      ) : (
        <div className="field">
          <div className="field-label" style={{color:"var(--pink)"}}>
            Your Expression Text
            <Tip t="Write any emotion/vibe. Examples: 'villain smirk', 'battle cry', 'triumphant', 'cold stare'. Goes directly into AI prompt."/>
          </div>
          <input type="text" className="custom-input" value={s.customExprText}
            onChange={e=>upd("customExprText",e.target.value)}
            placeholder="villain smirk · battle cry · triumphant · cold stare" maxLength={60}/>
          <div style={{fontSize:10,color:"var(--pink)",marginTop:5,fontStyle:"italic",lineHeight:1.5}}>
            ↳ Embedded in AI prompt as emotion · shows as badge in preview (bottom-left)
          </div>
        </div>
      )}
    </div>
  );
}
 
function TextCard({ s, upd }) {
  return (
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
      {s.subTextEnabled&&(
        <div className="field" style={{marginTop:8}}>
          <input type="text" value={s.subText} onChange={e=>upd("subText",e.target.value)} placeholder="e.g. SEASON 5 HIGHLIGHTS" maxLength={40}/>
        </div>
      )}
      <hr className="section-divider"/>
      <div className="field">
        <div className="field-label">Background Word <Tip t="Low-opacity giant word behind subject. e.g. OP, CLUTCH, LEGEND — adds depth without competing."/></div>
        <input type="text" value={s.bgWord} onChange={e=>upd("bgWord",e.target.value)} placeholder="OP / CLUTCH / LEGEND" maxLength={12}/>
      </div>
    </div>
  );
}
 
function ColorsCard({ s, upd }) {
  return (
    <div className="card">
      <div className="card-title">Colors</div>
      <div className="field">
        <div className="field-label">Glow Color <Tip t="Your glow color = brand signature. Purple = mystique. Pink = hype. Orange = danger. Cyan = futuristic."/></div>
        <GlowPicker value={s.glowColor} onChange={v=>upd("glowColor",v)}/>
      </div>
      <div className="field" style={{marginTop:8}}>
        <div className="field-label">Title Color</div>
        <TitleColorPicker value={s.mainTextColor} onChange={v=>upd("mainTextColor",v)}/>
      </div>
    </div>
  );
}
 
function SceneCard({ s, upd }) {
  return (
    <div className="card">
      <div className="card-title">Scene &amp; Effects</div>
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
      {EFFECT_TOGGLES.map(ef=>(
        <div key={ef.key} className="toggle-row">
          <span className="toggle-label">{ef.label}<span className="badge">{ef.badge}</span><Tip t={ef.tip}/></span>
          <Toggle on={s[ef.key]} fn={()=>upd(ef.key,!s[ef.key])}/>
        </div>
      ))}
    </div>
  );
}
 
function CustomCard({ s, upd, showToast }) {
  return (
    <div className="card custom-card">
      <div className="card-title" style={{color:"var(--pink)"}}>Custom Overrides</div>
      <div className="field">
        <div className="field-label" style={{color:"var(--pink)"}}>
          Custom Background Image
          <Tip t="Upload any PNG/JPG — game screenshot, map, cinematic frame, or AI art. Auto-selects Custom Image scene."/>
        </div>
        <BgUpload
          imageUrl={s.customBgImage}
          onImage={url=>{upd("customBgImage",url);upd("scene","custom");showToast("🖼️ Background set! Scene switched to Custom.");}}
          onClear={()=>{upd("customBgImage",null);upd("scene","explosion");}}
        />
        {s.customBgImage&&(
          <div style={{marginTop:12}}>
            <div className="field-label" style={{marginBottom:6,color:"var(--pink)"}}>
              Darkness Overlay
              <Tip t="Darken the image so face and title stay visible. 40–60% is the sweet spot."/>
            </div>
            <div className="overlay-row">
              <label>Light</label>
              <input type="range" min="0" max="0.85" step="0.05" value={s.customBgDim}
                onChange={e=>upd("customBgDim",parseFloat(e.target.value))}/>
              <label>Dark</label>
              <span style={{fontSize:11,color:"var(--pink)",fontWeight:700,minWidth:32,textAlign:"right"}}>{Math.round(s.customBgDim*100)}%</span>
            </div>
            <div style={{fontSize:10,color:"var(--muted)",marginTop:5}}>
              💡 Toggle <strong style={{color:"var(--cyan)"}}>BG Depth Blur</strong> to add cinematic blur to custom image
            </div>
          </div>
        )}
      </div>
      <hr className="section-divider"/>
      <div className="hint-box">
        <div style={{fontSize:11,fontWeight:700,color:"var(--pink)",letterSpacing:1,marginBottom:4}}>✏️ CUSTOM EXPRESSION</div>
        <div style={{fontSize:12,color:"var(--muted)",lineHeight:1.6}}>
          Switch to <strong style={{color:"var(--text)"}}>✏️ Custom</strong> mode in the Layout → Expression section to type any emotion as free text.
          It feeds directly into the AI prompt and appears as a label badge on the bottom-left of the preview.
        </div>
        {!s.useCustomExpression ? (
          <button className="copy-btn ghost" style={{marginTop:10,padding:"6px 14px",fontSize:11}}
            onClick={()=>{upd("useCustomExpression",true);showToast("✏️ Custom expression mode ON!");}}>
            → Enable Custom Expression
          </button>
        ) : (
          <div style={{marginTop:8,fontSize:11,color:"var(--green)",fontWeight:700}}>✓ Active — type your expression above in Layout section</div>
        )}
      </div>
    </div>
  );
}
 
/** Aggregates all left-column cards */
export default function LeftControls({ s, upd, showToast }) {
  return (
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      <LayoutCard  s={s} upd={upd}/>
      <TextCard    s={s} upd={upd}/>
      <ColorsCard  s={s} upd={upd}/>
      <SceneCard   s={s} upd={upd}/>
      <CustomCard  s={s} upd={upd} showToast={showToast}/>
    </div>
  );
}