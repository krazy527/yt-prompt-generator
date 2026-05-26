const PROFILE_FIELDS = [
  { key:"channelName",  label:"Channel Name",     placeholder:"DRONE AISHU GAMING" },
  { key:"characterName",label:"Character / Alias", placeholder:"AISHU" },
  { key:"channelUrl",   label:"Channel URL",       placeholder:"youtube.com/@..." },
];

export default function ProfileScreen({ profile, setProfile, showToast }) {
  const handleSave = () => {
    localStorage.setItem("tgen_profile", JSON.stringify(profile));
    showToast("✅ Profile saved!");
  };

  return (
    <>
      <div className="page-header">
        <div className="page-title">CHANNEL PROFILE</div>
        <div className="page-sub">Used across all prompts and branding elements</div>
      </div>
      <div style={{ maxWidth: 600 }}>
        <div className="card">
          <div className="card-title">Profile Setup</div>
          {PROFILE_FIELDS.map(f => (
            <div key={f.key} className="field">
              <div className="field-label">{f.label}</div>
              <input
                type="text"
                value={profile[f.key] || ""}
                placeholder={f.placeholder}
                onChange={e => setProfile(prev => ({ ...prev, [f.key]: e.target.value }))}
              />
            </div>
          ))}
          <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={handleSave}>Save Profile</button>
        </div>
      </div>
    </>
  );
}
