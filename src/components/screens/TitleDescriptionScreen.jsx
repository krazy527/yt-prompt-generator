import React from "react";
import { Copy } from "lucide-react";
import { AIGenerateButton } from "../AIGenerateButton";

export default function TitleDescriptionScreen({ title, setTitle, description, setDescription, showToast, profile }) {
  const copyTitle = () => {
    navigator.clipboard.writeText(title || "").then(() => showToast("✅ Title copied!"));
  };
  const copyDescription = () => {
    navigator.clipboard.writeText(description || "").then(() => showToast("✅ Description copied!"));
  };

  const generateTitle = async (result) => {
    setTitle(result);
  };

  const generateDescription = async (result) => {
    setDescription(result);
  };

  const titlePrompt = `Generate a catchy and engaging YouTube video title for a ${profile?.niche || 'gaming'} channel. 
Make it 5-7 words, attention-grabbing, and include power words. 
Channel: ${profile?.channelName || 'Gaming Channel'}
Character/Style: ${profile?.characterName || 'default'}
Niche: ${profile?.niche || 'Gaming'}
Return only the title, no quotes or explanations.`;

  const descriptionPrompt = `Generate a YouTube video description for a ${profile?.niche || 'gaming'} channel.
Channel: ${profile?.channelName || 'Gaming Channel'}
Character: ${profile?.characterName || 'default'}
Niche: ${profile?.niche || 'Gaming'}
Include:
- Hook (first line to grab attention for ${profile?.niche || 'this'} content)
- What the video is about
- Call to action
- Relevant hashtags for ${profile?.niche || 'gaming'}
Keep it under 500 words.`;

  return (
    <>
      <div className="page-header">
        <div className="page-title">VIDEO TITLE & DESCRIPTION</div>
        <div className="page-sub">Edit the title and description for your upload</div>
      </div>

      <div style={{maxWidth:900, display:"flex", flexDirection:"column", gap:16}}>
        <div className="card">
          <div className="card-title">Title</div>
          <div style={{display:"flex", gap:8, alignItems:"center", marginBottom: 10}}>
            <input type="text" value={title} onChange={e=>setTitle(e.target.value)} style={{flex:1}} />
            <button className="btn btn-ghost" onClick={copyTitle}><Copy size={14} /> Copy</button>
          </div>
          <AIGenerateButton
            prompt={titlePrompt}
            onGenerate={generateTitle}
            label="Generate Title"
            showToast={showToast}
          />
        </div>

        <div className="card">
          <div className="card-title">Description</div>
          <div style={{display:"flex", gap:8, marginBottom: 10}}>
            <textarea value={description} onChange={e=>setDescription(e.target.value)} style={{flex:1, minHeight:160}} />
            <div style={{display:"flex", flexDirection:"column", gap:8}}>
              <button className="btn btn-ghost" onClick={copyDescription}><Copy size={14} /> Copy</button>
              <AIGenerateButton
                prompt={descriptionPrompt}
                onGenerate={generateDescription}
                label="Generate"
                showToast={showToast}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
