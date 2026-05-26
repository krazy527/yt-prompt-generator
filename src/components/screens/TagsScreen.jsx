import React, { useState } from "react";
import { Copy } from "lucide-react";
import { AIGenerateButton } from "../AIGenerateButton";

export default function TagsScreen({ tags, setTags, showToast, profile }) {
  const [input, setInput] = useState("");

  const addTag = (t) => {
    const val = (t || input || "").trim();
    if (!val) return;
    // split on commas or new lines, keep spaces inside tags
    const parts = val.split(/[,\n\r]+/).map(p => p.trim()).filter(Boolean);
    const newTags = Array.from(new Set([...(tags || []), ...parts]));
    setTags(newTags);
    setInput("");
  };

  const removeTag = (t) => setTags((tags || []).filter(x => x !== t));

  const copyTags = () => {
    const text = (tags || []).join(", ");
    navigator.clipboard.writeText(text).then(() => showToast("✅ Tags copied!"));
  };

  const generateTags = async (result) => {
    addTag(result);
  };

  const tagsPrompt = `Generate 15-20 relevant YouTube tags for a ${profile?.characterName || 'gaming'} video.
Channel name: ${profile?.channelName || 'Gaming Channel'}
Separate each tag with a comma.
Include a mix of:
- Specific content keywords
- General gaming tags
- Channel brand tags
- Trending keywords
Return ONLY the tags separated by commas, no explanations.`;

  return (
    <>
      <div className="page-header">
        <div className="page-title">VIDEO TAGS</div>
        <div className="page-sub">Add tags for the video and copy them quickly</div>
      </div>

      <div style={{ maxWidth: 900, display: "flex", flexDirection: "column", gap: 16 }}>
        <div className="card">
          <div className="card-title">Add Tags</div>
          <div style={{ display: "flex", gap: 8, alignItems: "stretch" }}>
            <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Paste tags separated by commas or new lines" style={{ flex: 1, minHeight: 80 }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <button className="btn btn-primary" onClick={() => addTag(input)}>Add</button>
              <button className="btn btn-ghost" onClick={copyTags}><Copy size={14} /> Copy All</button>
              <AIGenerateButton
                prompt={tagsPrompt}
                onGenerate={generateTags}
                label="✨ Generate"
                showToast={showToast}
              />
            </div>
          </div>

          <div style={{ marginTop: 12, display: "flex", gap: 8, flexWrap: "wrap" }}>
            {(tags || []).map(t => (
              <div key={t} style={{ padding: "6px 10px", borderRadius: 999, background: "var(--card2)", border: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ fontSize: 13 }}>{t}</div>
                <button className="btn btn-ghost" onClick={() => removeTag(t)}>✕</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
