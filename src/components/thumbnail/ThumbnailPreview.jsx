import { PRESET_EXPR, SCENE_OVERLAYS, SCENES } from "../../constants";

export default function ThumbnailPreview({ s, prf }) {
  const scene   = SCENES[s.scene]        || SCENES.explosion;
  const overlay = SCENE_OVERLAYS[s.scene] || SCENE_OVERLAYS.explosion;
  const glowC   = s.glowColor            || "#7c3aed";
  const textC   = s.mainTextColor        || "#ffffff";
  const faceLeft  = s.charPosition==="left"?"8%":s.charPosition==="center"?"50%":"auto";
  const faceRight = s.charPosition==="right"?"8%":"auto";
  const particles = s.particlesEnabled
    ? Array.from({length:14},(_,i)=>({
        x:Math.floor((i*137.508)%100), y:Math.floor((i*97.3)%80)+5,
        size:(i%3)+3, color:overlay.sparks[i%3],
        dur:(2+i*0.3).toFixed(1), delay:(i*0.18).toFixed(1),
      }))
    : [];
  const exprEmoji  = !s.useCustomExpression?(PRESET_EXPR[s.expression]||"😱"):null;
  const customLabel = s.useCustomExpression&&s.customExprText?.trim()?s.customExprText.trim():null;
  const isCustomBg  = s.scene==="custom"&&s.customBgImage;
 
  return (
    <div className="thumb-canvas" style={isCustomBg
      ?{backgroundImage:`url(${s.customBgImage})`,backgroundSize:"cover",backgroundPosition:"center"}
      :{background:scene.bg}
    }>
      {isCustomBg&&<div style={{position:"absolute",inset:0,zIndex:1,background:`rgba(0,0,0,${s.customBgDim??0.45})`,backdropFilter:s.bgBlurEnabled?"blur(3px)":"none",transition:"all .3s"}}/>}
      {!isCustomBg&&<div style={{position:"absolute",inset:0,zIndex:1,background:`radial-gradient(ellipse 70% 60% at 50% 50%,${scene.accent}22,transparent 70%)`,transition:"all .4s"}}/>}
      {s.layoutType==="dual"&&<>
        <div style={{position:"absolute",left:0,top:0,width:"50%",height:"100%",zIndex:2,background:"linear-gradient(90deg,rgba(0,50,150,.25),transparent)"}}/>
        <div style={{position:"absolute",right:0,top:0,width:"50%",height:"100%",zIndex:2,background:"linear-gradient(270deg,rgba(200,50,0,.25),transparent)"}}/>
      </>}
      {s.vignetteEnabled&&<div className="vignette-overlay" style={{zIndex:3}}/>}
      {particles.map((p,i)=>(
        <div key={i} className="particle" style={{left:`${p.x}%`,top:`${p.y}%`,width:p.size,height:p.size,background:p.color,boxShadow:`0 0 ${p.size*2}px ${p.color}`,"--dur":`${p.dur}s`,"--delay":`-${p.delay}s`}}/>
      ))}
      {s.bgWord?.trim()&&<div className="bg-word" style={{color:s.bgTextColor||"#ffffff"}}>{s.bgWord.toUpperCase()}</div>}
      <div className="face-placeholder" style={{bottom:"22%",left:faceLeft,right:faceRight,transform:s.charPosition==="center"?"translateX(-50%)":"none"}}>
        <div className="face-circle" style={{
          width:s.layoutType==="single"?"clamp(60px,15vw,120px)":"clamp(48px,11vw,90px)",
          height:s.layoutType==="single"?"clamp(60px,15vw,120px)":"clamp(48px,11vw,90px)",
          background:`radial-gradient(circle,${glowC}33,#1a1a1a)`,
          border:s.glowEnabled?`2px solid ${glowC}`:"2px solid rgba(255,255,255,.1)",
          boxShadow:s.glowEnabled?`0 0 20px ${glowC},0 0 40px ${glowC}44,inset 0 0 20px ${glowC}22`:"none",
        }}>{exprEmoji||"⚡"}</div>
        <div className="face-name" style={{color:glowC}}>{prf.characterName||"AISHU"}</div>
      </div>
      {(s.layoutType==="dual"||s.layoutType==="multi")&&(
        <div className="game-char" style={{bottom:"20%",right:"6%"}}>
          <div className="char-body" style={{width:"clamp(44px,10vw,80px)",height:"clamp(44px,10vw,80px)",background:"radial-gradient(circle,#ff660033,#1a1a1a)",border:"2px solid #f97316",boxShadow:"0 0 18px #f97316,0 0 36px #f9731644",borderRadius:"10px"}}>🗡️</div>
        </div>
      )}
      {s.layoutType==="multi"&&(
        <div className="game-char" style={{bottom:"18%",left:"6%"}}>
          <div className="char-body" style={{width:"clamp(36px,8vw,64px)",height:"clamp(36px,8vw,64px)",background:"radial-gradient(circle,#ec489933,#1a1a1a)",border:"2px solid #ec4899",boxShadow:"0 0 14px #ec4899,0 0 28px #ec489944",borderRadius:"10px"}}>🛡️</div>
        </div>
      )}
      {s.layoutType==="dual"&&<div className="arrow-element" style={{left:"44%",bottom:"36%"}}>⚡</div>}
      {s.neonBorderEnabled&&<div className="neon-border-overlay" style={{boxShadow:`inset 0 0 0 2px ${glowC},inset 0 0 20px ${glowC}44`}}/>}
      <div className="thumb-title" style={{color:textC,WebkitTextStroke:`1px ${overlay.sparks[0]}`,filter:`drop-shadow(0 0 8px ${glowC}88)`}}>{s.mainTitle||"YOUR TITLE HERE"}</div>
      {s.subTextEnabled&&s.subText?.trim()&&<div className="thumb-subtext" style={{color:glowC}}>{s.subText.toUpperCase()}</div>}
      <div className="brand-tag" style={{color:glowC,borderColor:`${glowC}66`,background:`${glowC}11`,textShadow:`0 0 8px ${glowC}`}}>{prf.channelName||"AISHU GAMING"}</div>
      {customLabel&&<div className="custom-expr-badge" style={{color:glowC,borderColor:`${glowC}88`,background:`${glowC}22`,textShadow:`0 0 6px ${glowC}`}}>{customLabel}</div>}
    </div>
  );
}