
export default function GuidePage() {
  return (
    <>
      <div className="page-header">
        <div className="page-title">PROMPT GUIDE</div>
        <div className="page-sub">Turn generated prompts into real thumbnails</div>
      </div>
      <div style={{maxWidth:720,display:"flex",flexDirection:"column",gap:16}}>
        {GUIDE_SECTIONS.map((sec,i)=>(
          <div key={i} className="card">
            <div className="card-title">{sec.title}</div>
            {sec.content.map((line,j)=>(
              <div key={j} style={{padding:"6px 0",borderBottom:"1px solid var(--border)",fontSize:13,lineHeight:1.6,color:"var(--text)"}}>{line}</div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}