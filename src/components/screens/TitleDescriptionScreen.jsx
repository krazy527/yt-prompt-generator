import React from "react";
import { Copy } from "lucide-react";

export default function TitleDescriptionScreen({ title, setTitle, description, setDescription, showToast }) {
  const copyTitle = () => {
    navigator.clipboard.writeText(title || "").then(() => showToast("✅ Title copied!"));
  };
  const copyDescription = () => {
    navigator.clipboard.writeText(description || "").then(() => showToast("✅ Description copied!"));
  };

  return (
    <>
      <div className="page-header">
        <div className="page-title">VIDEO TITLE & DESCRIPTION</div>
        <div className="page-sub">Edit the title and description for your upload</div>
      </div>

      <div style={{maxWidth:900, display:"flex", flexDirection:"column", gap:16}}>
        <div className="card">
          <div className="card-title">Title</div>
          <div style={{display:"flex", gap:8, alignItems:"center"}}>
            <input type="text" value={title} onChange={e=>setTitle(e.target.value)} style={{flex:1}} />
            <button className="btn btn-ghost" onClick={copyTitle}><Copy size={14} /> Copy</button>
          </div>
        </div>

        <div className="card">
          <div className="card-title">Description</div>
          <div style={{display:"flex", gap:8}}>
            <textarea value={description} onChange={e=>setDescription(e.target.value)} style={{flex:1, minHeight:160}} />
            <div style={{display:"flex", flexDirection:"column", gap:8}}>
              <button className="btn btn-ghost" onClick={copyDescription}><Copy size={14} /> Copy</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
