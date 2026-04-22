
const CTR_CHECKS = [
  { label:"Title present",    minScore:15 },
  { label:"Glow effects",     minScore:30 },
  { label:"Vignette",         minScore:40 },
  { label:"Particles",        minScore:55 },
  { label:"Neon border",      minScore:65 },
  { label:"Custom elements",  minScore:75 },
];
 
export default function CTRMeter({ score }) {
  const color = score<40?"#ef4444":score<65?"#f97316":score<80?"#facc15":"#22c55e";
  const label = score<40?"Low":score<65?"Average":score<80?"Good":"Excellent";
  return (
    <div className="ctr-meter">
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
        <span style={{fontSize:11,fontWeight:700,letterSpacing:1,textTransform:"uppercase",color:"var(--muted)"}}>CTR Potential</span>
        <span style={{fontFamily:"'Orbitron',sans-serif",fontSize:13,fontWeight:700,color}}>{score}% · {label}</span>
      </div>
      <div className="ctr-bar">
        <div className="ctr-fill" style={{width:`${score}%`,background:`linear-gradient(90deg,var(--purple),${color})`}}/>
      </div>
      <div className="ctr-labels"><span>0%</span><span>4–5% avg</span><span>7%+ 🔥</span></div>
      <div className="checklist">
        {CTR_CHECKS.map((c,i)=>{
          const pass = score>=c.minScore;
          return (
            <div key={i} className="check-item">
              <div className="check-dot" style={{background:pass?"#22c55e":"var(--card2)",border:pass?"none":"1px solid var(--border)"}}/>
              <span style={{color:pass?"var(--text)":"var(--muted)"}}>{c.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}