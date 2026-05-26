const GUIDE_SECTIONS = [
  {
    title: "AI Tools to use",
    content: [
      "🎨 Midjourney — Best cinematic quality. /imagine [prompt] --ar 16:9 --v 6",
      "🖼 Leonardo AI — Free tier. Use 'Lightning XL' model.",
      "💬 ChatGPT DALL·E 3 — Paste short prompt. Say '16:9 YouTube gaming thumbnail'.",
    ],
  },
  {
    title: "Thumbnail Tips",
    content: [
      "Use high contrast text and bold fonts.",
      "Keep the subject large and centered.",
      "Use bright accent colors to catch attention.",
    ],
  },
];

export default function GuideScreen() {
  return (
    <>
      <div className="page-header">
        <div className="page-title">PROMPT GUIDE</div>
        <div className="page-sub">Turn generated prompts into real thumbnails</div>
      </div>
      <div style={{ maxWidth: 720, display: "flex", flexDirection: "column", gap: 20 }}>
        {GUIDE_SECTIONS.map((sec, i) => (
          <div key={i} className="card">
            <div className="card-title">{sec.title}</div>
            {sec.content.map((c, j) => (
              <div key={j} style={{ padding: "8px 0", borderBottom: "1px solid var(--border)", fontSize: 14, lineHeight: 1.6, color: "var(--text)" }}>{c}</div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
