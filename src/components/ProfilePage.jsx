
const PROFILE_FIELDS = [
  { key:"channelName",   label:"Channel Name",      placeholder:"DRONE AISHU GAMING" },
  { key:"characterName", label:"Character / Alias",  placeholder:"AISHU"             },
  { key:"channelUrl",    label:"Channel URL",        placeholder:"youtube.com/@..."  },
];
 
export default function ProfilePage({ profile, setProfile, showToast }) {
  const prf = { channelName:"DRONE AISHU GAMING", characterName:"AISHU", channelUrl:"", ...profile };
  const handleSave = () => { localStorage.setItem("tgen_profile",JSON.stringify(profile)); showToast("✅ Profile saved!"); };
 
  return (
    <>
      <div className="page-header">
        <div className="page-title">CHANNEL PROFILE</div>
        <div className="page-sub">Used across all prompts and branding elements</div>
      </div>
      <div style={{maxWidth:500}}>
        <div className="card">
          <div className="card-title">Profile Setup</div>
          {PROFILE_FIELDS.map(f=>(
            <div key={f.key} className="field">
              <div className="field-label">{f.label}</div>
              <input type="text" value={profile[f.key]||""} placeholder={f.placeholder}
                onChange={e=>setProfile(prev=>({...prev,[f.key]:e.target.value}))}/>
            </div>
          ))}
          <button className="copy-btn primary" style={{marginTop:8}} onClick={handleSave}>💾 Save Profile</button>
        </div>
        <div className="card" style={{marginTop:16}}>
          <div className="card-title">Preview</div>
          <div style={{background:"linear-gradient(135deg,rgba(124,58,237,.13),rgba(236,72,153,.07))",border:"1px solid var(--purple)",borderRadius:10,padding:"20px 24px",fontFamily:"'Bebas Neue',sans-serif",letterSpacing:2}}>
            <div style={{fontSize:28,color:"var(--purple2)",textShadow:"0 0 20px var(--purple)"}}>{prf.channelName}</div>
            <div style={{fontSize:14,color:"var(--pink)",marginTop:4}}>✦ {prf.characterName}</div>
            {prf.channelUrl&&<div style={{fontSize:11,color:"var(--muted)",marginTop:6,fontFamily:"'Share Tech Mono'"}}>{prf.channelUrl}</div>}
          </div>
        </div>
      </div>
    </>
  );
}