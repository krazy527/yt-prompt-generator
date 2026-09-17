import { useEffect, useState } from "react";
import { Clapperboard, Clock3, Download, Scissors, Sparkles, Upload } from "lucide-react";

const defaultShorts = {
  youtubeUrl: "",
  startTime: "00:25",
  endTime: "00:52",
  resolution: "full-source",
  cookieMode: "none",
  browserName: "chrome",
};

const parseTimeToSeconds = (value) => {
  if (!value || typeof value !== "string") return 0;
  const parts = value.trim().split(":").map(part => Number(part));
  if (parts.some(part => Number.isNaN(part))) return 0;

  if (parts.length === 3) {
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  }

  if (parts.length === 2) {
    return parts[0] * 60 + parts[1];
  }

  return Number(parts[0] || 0);
};

export default function ShortsCutScreen({ showToast }) {
  const [form, setForm] = useState(() => {
    try {
      const saved = localStorage.getItem("tgen_shorts");
      return saved ? { ...defaultShorts, ...JSON.parse(saved) } : defaultShorts;
    } catch {
      return defaultShorts;
    }
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState("Ready to create a clip");
  const [selectedFile, setSelectedFile] = useState(null);
  const [cookieFile, setCookieFile] = useState(null);

  useEffect(() => {
    localStorage.setItem("tgen_shorts", JSON.stringify(form));
  }, [form]);

  const updateField = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const clipSeconds = Math.max(0, parseTimeToSeconds(form.endTime) - parseTimeToSeconds(form.startTime));

  const handleDownloadClip = async () => {
    const start = parseTimeToSeconds(form.startTime);
    const end = parseTimeToSeconds(form.endTime);

    if (!selectedFile && !form.youtubeUrl) {
      showToast("❌ Upload a video file or paste a YouTube link first.");
      return;
    }

    if (!start || !end || end <= start) {
      showToast("❌ Enter a valid start and end timestamp.");
      return;
    }

    setIsProcessing(true);
    setStatus("Cutting your selected segment and preparing the MP4...");

    try {
      let response;

      if (selectedFile) {
        const formData = new FormData();
        formData.append("videoFile", selectedFile);
        formData.append("startTime", form.startTime);
        formData.append("endTime", form.endTime);
        response = await fetch("/api/cut-video", {
          method: "POST",
          body: formData,
        });
      } else {
        const formData = new FormData();
        formData.append("videoUrl", form.youtubeUrl);
        formData.append("startTime", form.startTime);
        formData.append("endTime", form.endTime);
        formData.append("cookieMode", form.cookieMode);
        formData.append("browserName", form.browserName);
        if (cookieFile && form.cookieMode === "file") {
          formData.append("cookiesFile", cookieFile);
        }
        response = await fetch("/api/cut-video", {
          method: "POST",
          body: formData,
        });
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Clip generation failed.");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = "shorts-cut.mp4";
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      setTimeout(() => URL.revokeObjectURL(url), 10000);
      setStatus("Download started. Your cut is ready.");
      showToast("✅ Clip downloaded!");
    } catch (error) {
      setStatus(error.message || "Something went wrong while generating the clip.");
      showToast(`❌ ${error.message || "Clip generation failed."}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <div className="page-header">
        <div className="page-title">SHORTS CUT</div>
        <div className="page-sub">Paste a video link, set the timestamps, and download the exact selected clip</div>
      </div>

      <div style={{ maxWidth: 1200, display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 20 }}>
        <div className="card">
          <div className="card-title"><Scissors size={14} /> Video source</div>

          <div className="field">
            <div className="field-label">YouTube video link</div>
            <input
              type="text"
              value={form.youtubeUrl}
              onChange={e => updateField("youtubeUrl", e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
            />
          </div>

          <div className="field">
            <div className="field-label">Or upload a local video file</div>
            <label style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", border: "1px solid var(--border)", borderRadius: 8, background: "var(--card2)", color: "var(--text)", cursor: "pointer" }}>
              <Upload size={16} />
              <span>{selectedFile ? selectedFile.name : "Choose MP4 / WEBM / MOV file"}</span>
              <input type="file" accept="video/*" onChange={e => setSelectedFile(e.target.files?.[0] || null)} style={{ display: "none" }} />
            </label>
          </div>

          <div className="field">
            <div className="field-label">YouTube cookie method</div>
            <select value={form.cookieMode} onChange={e => updateField("cookieMode", e.target.value)}>
              <option value="none">No cookies</option>
              <option value="browser">Use browser cookies</option>
              <option value="file">Use cookies file</option>
            </select>
          </div>

          {form.cookieMode === "browser" && (
            <div className="field">
              <div className="field-label">Browser profile</div>
              <select value={form.browserName} onChange={e => updateField("browserName", e.target.value)}>
                <option value="chrome">Chrome</option>
                <option value="edge">Edge</option>
                <option value="firefox">Firefox</option>
              </select>
            </div>
          )}

          {form.cookieMode === "file" && (
            <div className="field">
              <div className="field-label">Cookies file (.txt / Netscape)</div>
              <label style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", border: "1px solid var(--border)", borderRadius: 8, background: "var(--card2)", color: "var(--text)", cursor: "pointer" }}>
                <Upload size={16} />
                <span>{cookieFile ? cookieFile.name : "Choose cookies.txt"}</span>
                <input type="file" accept=".txt" onChange={e => setCookieFile(e.target.files?.[0] || null)} style={{ display: "none" }} />
              </label>
            </div>
          )}

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div className="field">
              <div className="field-label">Start timestamp</div>
              <input
                type="text"
                value={form.startTime}
                onChange={e => updateField("startTime", e.target.value)}
                placeholder="00:25"
              />
            </div>

            <div className="field">
              <div className="field-label">End timestamp</div>
              <input
                type="text"
                value={form.endTime}
                onChange={e => updateField("endTime", e.target.value)}
                placeholder="00:52"
              />
            </div>
          </div>

          <div className="field">
            <div className="field-label">Output quality</div>
            <select value={form.resolution} onChange={e => updateField("resolution", e.target.value)}>
              <option value="full-source">Full source / max quality</option>
              <option value="4k">4K</option>
              <option value="1080p">1080p</option>
            </select>
          </div>
        </div>

        <div className="card" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div className="card-title"><Clock3 size={14} /> Clip summary</div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div className="card" style={{ background: "rgba(124,58,237,0.08)", padding: 12 }}>
              <div style={{ color: "var(--muted)", fontSize: 11, textTransform: "uppercase", letterSpacing: 1 }}>Clip length</div>
              <div style={{ fontSize: 22, fontWeight: 700, marginTop: 6 }}>{clipSeconds ? `${clipSeconds}s` : "--"}</div>
            </div>

            <div className="card" style={{ background: "rgba(6,182,212,0.08)", padding: 12 }}>
              <div style={{ color: "var(--muted)", fontSize: 11, textTransform: "uppercase", letterSpacing: 1 }}>Quality</div>
              <div style={{ fontSize: 18, fontWeight: 700, marginTop: 6 }}>{form.resolution === "full-source" ? "Full res" : form.resolution.toUpperCase()}</div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button className="btn btn-primary" onClick={handleDownloadClip} disabled={isProcessing}>
              <Download size={14} /> {isProcessing ? "Cutting..." : "Download Clip"}
            </button>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--muted)", fontSize: 12 }}>
            <Sparkles size={12} /> Files are exported as MP4 clips for Shorts / Reels / TikTok
          </div>
        </div>
      </div>

      <div className="card" style={{ maxWidth: 1200, marginTop: 20 }}>
        <div className="card-title"><Clapperboard size={14} /> Status</div>
        <div style={{ color: "var(--text)", fontSize: 14, lineHeight: 1.6 }}>
          {status}
          {!selectedFile && form.youtubeUrl && (
            <div style={{ marginTop: 8, color: "var(--muted)", lineHeight: 1.6 }}>
              Note: direct YouTube download may be blocked by YouTube anti-bot checks. For guaranteed download, upload the original video file instead.
            </div>
          )}
        </div>
      </div>
    </>
  );
}
