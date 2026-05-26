import React, { useState } from "react";
import { Copy } from "lucide-react";

export default function TagsScreen({ tags, setTags, showToast }) {
  const [input, setInput] = useState("");

  const addTag = (t) => {
    const val = (t||input||"").trim();
    if (!val) return;
    const parts = val.split(/[,\s]+/).map(p=>p.trim()).filter(Boolean);
    const newTags = Array.from(new Set([...(tags||[]), ...parts]));
    setTags(newTags);
    setInput("");
  };

  const removeTag = (t) => setTags((tags||[]).filter(x=>x!==t));

  const onKey = (e) => {
    if (e.key === "Enter") { e.preventDefault(); addTag(); }
  };

  const copyTags = () => {
    const text = (tags||[]).join(", ");
    navigator.clipboard.writeText(text).then(()=>showToast("✅ Tags copied!"));
  };

  return (
    <>
      <div className="page-header">
        <div className="page-title">VIDEO TAGS</div>
        <div className="page-sub">Add tags for the video and copy them quickly</div>
      </div>

      <div style={{maxWidth:900, display:"flex", flexDirection:"column", gap:16}}>
        <div className="card">
          <div className="card-title">Add Tags</div>
          <div style={{display:"flex", gap:8}}>
            <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={onKey} placeholder="type tag and press Enter or comma" />
            <button className="btn btn-primary" onClick={()=>addTag(input)}>Add</button>
            <button className="btn btn-ghost" onClick={copyTags}><Copy size={14} /> Copy All</button>
          </div>

          <div style={{marginTop:12, display:"flex", gap:8, flexWrap:"wrap"}}>
            {(tags||[]).map(t=> (
              <div key={t} style={{padding:"6px 10px", borderRadius:999, background:"var(--card2)", border:"1px solid var(--border)", display:"flex", alignItems:"center", gap:8}}>
                <div style={{fontSize:13}}>{t}</div>
                <button className="btn btn-ghost" onClick={()=>removeTag(t)}>✕</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
