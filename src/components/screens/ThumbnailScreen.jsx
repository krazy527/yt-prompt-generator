import { Copy, Download, RotateCcw, Upload } from "lucide-react";
import CTRMeter from "../ui/CTRMeter";
import ThumbnailPreview from "../thumbnail/ThumbnailPreview";
import LayerPanel from "../thumbnail/LayerPanel";
import PropertiesPanel from "../thumbnail/PropertiesPanel";

export default function ThumbnailScreen({
  layers,
  setLayers,
  activeLayerId,
  setActiveLayerId,
  activeLayer,
  updateLayer,
  prf,
  prompt,
  ctr,
  projectSettings,
  setProjectSettings,
  handleImport,
  handleExport,
  onReset
}) {
  return (
    <>
      <div className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <div>
          <div className="page-title">THUMBNAIL ENGINE</div>
          <div className="page-sub">Layer-based builder & Smart Prompt generator</div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12, background: "var(--card2)", padding: "4px 8px", borderRadius: 8, border: "1px solid var(--border)" }}>
          <span style={{ fontSize: 12, fontWeight: 500, color: "var(--muted)", paddingLeft: 8 }}>Layout:</span>
          <div className="seg-control" style={{ border: "none", background: "transparent" }}>
            {['single', 'dual', 'multi'].map(v => (
              <button key={v} className={`seg-btn ${projectSettings.layoutType===v?"active":""}`} onClick={()=>setProjectSettings({layoutType: v})} style={{ textTransform: "capitalize", padding: "4px 10px" }}>{v}</button>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <button className="btn btn-ghost" onClick={() => document.getElementById('import-json').click()}>
            <Upload size={16} /> Import
          </button>
          <input type="file" id="import-json" style={{ display: "none" }} accept=".json" onChange={handleImport} />
          <button className="btn btn-ghost" onClick={handleExport}>
            <Download size={16} /> Export Preset
          </button>
          <button className="btn btn-primary" onClick={onReset}>
            <RotateCcw size={16} /> Reset
          </button>
        </div>
      </div>

      <div className="tgen-grid">
        <LayerPanel
          layers={layers}
          setLayers={setLayers}
          activeLayerId={activeLayerId}
          setActiveLayerId={setActiveLayerId}
        />

        <div className="center-column">
          <div className="preview-wrap">
            <ThumbnailPreview layers={layers} prf={prf}/>
            <CTRMeter score={ctr}/>
          </div>

          <div className="card" style={{ flexShrink: 0 }}>
            <div className="card-title">Smart AI Prompt Output</div>
            <div className="prompt-box">
              {prompt.split("\\n").map((line,i)=>{
                if (!line.trim()) return <br key={i}/>;
                return (
                  <div key={i}>
                    {line.split(/(\*\*[^*]+\*\*)/g).map((p,j)=>
                      p.startsWith("**")&&p.endsWith("**")
                        ? <span key={j} className="kw">{p.slice(2,-2)}</span>
                        : <span key={j}>{p}</span>
                    )}
                  </div>
                );
              })}
            </div>
            <div style={{marginTop:16}}>
              <button className="btn btn-primary" onClick={() => {
                navigator.clipboard.writeText(prompt.replace(/\*\*/g,"")).then(() => showToast("✅ Prompt copied!"));
              }}><Copy size={16} /> Copy Full Prompt</button>
            </div>
          </div>
        </div>

        <PropertiesPanel
          layer={activeLayer}
          updateLayer={updateLayer}
        />
      </div>
    </>
  );
}
