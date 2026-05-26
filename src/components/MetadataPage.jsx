export default function MetadataPage({ s, upd, showToast }) {
  return (
    <>
      <div className="page-header">
        <div className="page-title">VIDEO METADATA</div>
        <div className="page-sub">Craft your YouTube title and description for upload.</div>
      </div>
      <div style={{maxWidth:720,display:"flex",flexDirection:"column",gap:16}}>
        <div className="card">
          <div className="card-title">Video Title</div>
          <div className="field">
            <input
              type="text"
              value={s.videoTitle}
              onChange={e => upd("videoTitle", e.target.value)}
              placeholder="Enter your YouTube video title"
              maxLength={80}
            />
            <div style={{fontSize:12,color:"var(--muted)",marginTop:8}}>{s.videoTitle.length}/80 characters</div>
          </div>
        </div>

        <div className="card">
          <div className="card-title">Video Description</div>
          <div className="field">
            <textarea
              value={s.videoDescription}
              onChange={e => upd("videoDescription", e.target.value)}
              placeholder="Write your video description here"
              rows={8}
              style={{resize:"vertical"}}
            />
            <div style={{fontSize:12,color:"var(--muted)",marginTop:8}}>{s.videoDescription.length} characters</div>
          </div>
        </div>

        <div className="card" style={{display:"flex",justifyContent:"flex-end"}}>
          <button className="copy-btn primary" onClick={() => {
            navigator.clipboard.writeText(`${s.videoTitle}\n\n${s.videoDescription}`).then(()=>showToast("✅ Title and description copied!"));
          }}>
            Copy title + description
          </button>
        </div>
      </div>
    </>
  );
}
