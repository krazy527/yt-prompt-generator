import { GLOW_PRESETS } from "../../constants";

export function Tip({ t }) {
  return <span className="tooltip-icon">?<span className="tooltip-text">{t}</span></span>;
}
 
export function Toggle({ on, fn }) {
  return <button className={`toggle ${on?"on":"off"}`} onClick={fn} aria-pressed={on} />;
}
 
export function GlowPicker({ value, onChange }) {
  return (
    <div className="color-row">
      {GLOW_PRESETS.map(c=>(
        <div key={c} className={`color-swatch ${value===c?"active":""}`}
          style={{background:c,boxShadow:`0 0 6px ${c}`}} onClick={()=>onChange(c)}/>
      ))}
      <input type="color" value={value} onChange={e=>onChange(e.target.value)}/>
    </div>
  );
}
 
export function TitleColorPicker({ value, onChange }) {
  return (
    <div className="color-row">
      {TITLE_COLORS.map(c=>(
        <div key={c} className={`color-swatch ${value===c?"active":""}`}
          style={{background:c}} onClick={()=>onChange(c)}/>
      ))}
      <input type="color" value={value} onChange={e=>onChange(e.target.value)}/>
    </div>
  );
}
 
export function Toast({ message }) {
  if (!message) return null;
  return <div className="toast">{message}</div>;
}