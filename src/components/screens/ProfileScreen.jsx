const PROFILE_FIELDS = [
  { key:"channelName",  label:"Channel Name",     placeholder:"DRONE AISHU GAMING" },
  { key:"characterName",label:"Character / Alias", placeholder:"AISHU" },
  { key:"channelUrl",   label:"Channel URL",       placeholder:"youtube.com/@..." },
];

const CHANNEL_NICHES = [
  "Gaming",
  "Education",
  "Finance",
  "Technology",
  "Lifestyle",
  "Entertainment",
  "Music",
  "Sports",
  "Health & Fitness",
  "Travel",
  "Food & Cooking",
  "Art & Design",
  "Business",
  "Comedy",
  "News & Politics",
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
          <div className="field" style={{ marginBottom: 16 }}>
            <div className="field-label">Channel Niche / Type</div>
            <select
              value={profile.niche || ""}
              onChange={e => setProfile(prev => ({ ...prev, niche: e.target.value }))}
              style={{ width: "100%" }}
            >
              <option value="">Select a niche...</option>
              {CHANNEL_NICHES.map(niche => (
                <option key={niche} value={niche}>{niche}</option>
              ))}
            </select>
          </div>
          <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={handleSave}>Save Profile</button>
        </div>
      </div>
    </>
  );
}
