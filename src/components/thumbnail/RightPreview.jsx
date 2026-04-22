
export default function RightPreview({ s, prf, showToast }) {
  const ctr = calcCTR(s);
  return (
    <div className="preview-wrap">
      <div className="card-title preview-label">Live Preview</div>
      <ThumbnailPreview s={s} prf={prf}/>
      <CTRMeter score={ctr}/>
      <PromptOutput s={s} prf={prf} showToast={showToast}/>
      <div className="card">
        <div className="card-title">Best Practices</div>
        {BEST_PRACTICES.map((item,i)=>(
          <div key={i} style={{display:"flex",gap:10,alignItems:"flex-start",padding:"5px 0",borderBottom:"1px solid var(--border)",fontSize:12}}>
            <span>{item.icon}</span><span style={{color:"var(--text)"}}>{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}