 
export default function PromptOutput({ s, prf, showToast }) {
  const prompt = buildPrompt(s, prf);
 
  const renderLine = (line, i) => {
    if (!line.trim()) return <br key={i}/>;
    return (
      <div key={i}>
        {line.split(/(\*\*[^*]+\*\*)/g).map((p,j)=>
          p.startsWith("**")&&p.endsWith("**")
            ?<span key={j} className="kw">{p.slice(2,-2)}</span>
            :<span key={j}>{p}</span>
        )}
      </div>
    );
  };
 
  const copyFull = () => navigator.clipboard.writeText(prompt.replace(/\*\*/g,"")).then(()=>showToast("✅ Full prompt copied!"));
  const copyShort = () => {
    const expr = s.useCustomExpression&&s.customExprText?.trim()?s.customExprText:s.expression;
    const sceneLabel = s.scene==="custom"?"custom background":s.scene.replace("_"," ");
    const short = `YouTube gaming thumbnail, ${expr} face ${s.charPosition}, ${sceneLabel} scene, neon glow, cinematic lighting, title "${s.mainTitle||"YOUR TITLE"}", 16:9 1920x1080.`;
    navigator.clipboard.writeText(short).then(()=>showToast("✅ Short prompt copied!"));
  };
 
  return (
    <div className="card" style={{marginTop:4}}>
      <div className="card-title">AI Prompt Output</div>
      <div className="prompt-box">{prompt.split("\n").map(renderLine)}</div>
      <div style={{display:"flex",gap:10,marginTop:12,flexWrap:"wrap"}}>
        <button className="copy-btn primary" onClick={copyFull}>📋 Copy Full Prompt</button>
        <button className="copy-btn ghost"   onClick={copyShort}>Short</button>
      </div>
      <div style={{marginTop:10,fontSize:11,color:"var(--muted)",lineHeight:1.6}}>
        💡 <strong style={{color:"var(--purple2)"}}>Midjourney</strong>: add <code style={{color:"var(--cyan)"}}>--ar 16:9 --v 6</code>
        &nbsp;·&nbsp;<strong style={{color:"var(--pink)"}}>Leonardo AI</strong>: Lightning XL model
        &nbsp;·&nbsp;<strong style={{color:"var(--yellow)"}}>DALL·E 3</strong>: paste short prompt
      </div>
    </div>
  );
}