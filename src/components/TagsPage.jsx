export default function TagsPage({ s, upd, showToast }) {
  const tags = s.videoTags.split(",").map(tag => tag.trim()).filter(Boolean);
  return (
    <>
      <div className="page-header">
        <div className="page-title">VIDEO TAGS</div>
        <div className="page-sub">Add tags to help YouTube discover your video.</div>
      </div>
      <div style={{maxWidth:720,display:"flex",flexDirection:"column",gap:16}}>
        <div className="card">
          <div className="card-title">Tags</div>
          <div className="field">
            <input
              type="text"
              value={s.videoTags}
              onChange={e => upd("videoTags", e.target.value)}
              placeholder="gaming, clutch, highlights, FPS, funny moments"
            />
            <div style={{fontSize:12,color:"var(--muted)",marginTop:8}}>Separate tags with commas. YouTube supports about 500 characters total.</div>
          </div>
        </div>

        <div className="card">
          <div className="card-title">Preview</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
            {tags.map((tag,i)=>(
              <span key={i} style={{padding:"8px 12px",borderRadius:999,background:"rgba(124,58,237,.12)",color:"var(--purple2)",fontSize:13,letterSpacing:0.3}}>{tag}</span>
            ))}
          </div>
        </div>

        <div className="card" style={{display:"flex",justifyContent:"flex-end"}}>
          <button className="copy-btn primary" onClick={() => {
            navigator.clipboard.writeText(s.videoTags);
            showToast("✅ Tags copied!");
          }}>
            Copy tags
          </button>
        </div>
      </div>
    </>
  );
}
