import { useState, useRef, useEffect } from "react";
import { buildPrompt, calcCTR, DEFAULT_LAYERS } from "./constants";
import { CSS } from "./styles/css";
import { LayoutDashboard, Image as ImageIcon, BookOpen, Copy, ChevronLeft, ChevronRight, Settings } from "lucide-react";
import Sidebar from "./components/Sidebar";
import AISettingsModal from "./components/AISettingsModal";
import ThumbnailScreen from "./components/screens/ThumbnailScreen";
import ProfileScreen from "./components/screens/ProfileScreen";
import GuideScreen from "./components/screens/GuideScreen";
import TitleDescriptionScreen from "./components/screens/TitleDescriptionScreen";
import TagsScreen from "./components/screens/TagsScreen";

export default function App() {
  const [sbOpen, setSbOpen] = useState(false);
  const [page, setPage]     = useState("thumbnail");
  const [toast, setToast]   = useState(null);
  const [showAISettings, setShowAISettings] = useState(false);
  const toastRef            = useRef(null);

  const [profile, setProfile] = useState(()=>{
    try{return JSON.parse(localStorage.getItem("tgen_profile"))||{};}catch{return {};}
  });
  const prf = {channelName:"DRONE AISHU GAMING",characterName:"AISHU",channelUrl:"",niche:"Gaming",...profile};

  const [layers, setLayers] = useState(() => {
    try {
      const saved = localStorage.getItem("tgen_layers");
      if (saved) return JSON.parse(saved);
    } catch {}
    return DEFAULT_LAYERS;
  });
  const [activeLayerId, setActiveLayerId] = useState(layers[0]?.id || null);

  const [projectSettings, setProjectSettings] = useState(() => {
    try {
      const saved = localStorage.getItem("tgen_settings");
      if (saved) return JSON.parse(saved);
    } catch {}
    return { layoutType: "single" };
  });

  const [videoTitle, setVideoTitle] = useState(() => localStorage.getItem("tgen_video_title") || "");
  const [videoDescription, setVideoDescription] = useState(() => localStorage.getItem("tgen_video_description") || "");
  const [videoTags, setVideoTags] = useState(() => {
    try { return JSON.parse(localStorage.getItem("tgen_video_tags")) || []; } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem("tgen_layers", JSON.stringify(layers));
    localStorage.setItem("tgen_settings", JSON.stringify(projectSettings));
    localStorage.setItem("tgen_profile", JSON.stringify(profile));
    localStorage.setItem("tgen_video_title", videoTitle);
    localStorage.setItem("tgen_video_description", videoDescription);
    localStorage.setItem("tgen_video_tags", JSON.stringify(videoTags));
  }, [layers, projectSettings, profile, videoTitle, videoDescription, videoTags]);

  const showToast = msg => {
    clearTimeout(toastRef.current);
    setToast(msg);
    toastRef.current = setTimeout(()=>setToast(null),2200);
  };

  const updateLayer = (id, updates) => {
    setLayers(prev => prev.map(l => l.id === id ? { ...l, ...updates } : l));
  };

  const prompt = buildPrompt(layers, prf, projectSettings);
  const ctr    = calcCTR(layers, projectSettings);
  const activeLayer = layers.find(l => l.id === activeLayerId);
  const NAV = [
    {id:"thumbnail", icon: <ImageIcon size={20} />, label:"Thumbnail"},
    {id:"dashboard", icon: <LayoutDashboard size={20} />, label:"Profile"},
    {id:"guide",     icon: <BookOpen size={20} />, label:"Guide"},
    {id:"meta",      icon: <Copy size={20} />, label:"Title / Description"},
    {id:"tags",      icon: <Copy size={20} />, label:"Tags"},
    {id:"ai-settings", icon: <Settings size={20} />, label:"AI Settings", action: () => setShowAISettings(true), isAction: true},
  ];

  const handleExport = () => {
    const data = { profile, layers };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "thumbnail-preset.json";
    a.click();
    showToast("✅ Preset exported!");
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        if (data.layers) setLayers(data.layers);
        if (data.profile) setProfile(data.profile);
        showToast("✅ Preset imported!");
      } catch (err) {
        showToast("❌ Invalid JSON file.");
      }
    };
    reader.readAsText(file);
    e.target.value = null;
  };

  return (
    <>
      <style>{CSS}</style>
      <div className="app">

        <Sidebar
          open={sbOpen}
          setOpen={setSbOpen}
          page={page}
          setPage={setPage}
          navItems={NAV}
          characterName={profile.channelName || "T"}
        />

        <AISettingsModal isOpen={showAISettings} onClose={() => setShowAISettings(false)} onSave={() => showToast('✅ AI settings saved!')} />

        <div className="main">
          {page==="thumbnail" && (
            <ThumbnailScreen
              layers={layers}
              setLayers={setLayers}
              activeLayerId={activeLayerId}
              setActiveLayerId={setActiveLayerId}
              activeLayer={activeLayer}
              updateLayer={updateLayer}
              prf={prf}
              prompt={prompt}
              ctr={ctr}
              projectSettings={projectSettings}
              setProjectSettings={setProjectSettings}
              handleImport={handleImport}
              handleExport={handleExport}
              onReset={() => { setLayers(DEFAULT_LAYERS); showToast("🔄 Workspace Reset"); }}
              showToast={showToast}
            />
          )}

          {page==="dashboard" && (
            <ProfileScreen profile={profile} setProfile={setProfile} showToast={showToast} />
          )}

          {page==="guide" && (
            <GuideScreen />
          )}

          {/* ══════════ TITLE / DESCRIPTION PAGE ══════════ */}
          {page==="meta" && (
            <TitleDescriptionScreen
              title={videoTitle}
              setTitle={setVideoTitle}
              description={videoDescription}
              setDescription={setVideoDescription}
              showToast={showToast}
              profile={prf}
            />
          )}

          {/* ══════════ TAGS PAGE ══════════ */}
          {page==="tags" && (
            <TagsScreen
              tags={videoTags}
              setTags={setVideoTags}
              showToast={showToast}
              profile={prf}
            />
          )}

        </div>
      </div>

      {toast && (
        <div style={{
          position:"fixed", bottom:24, right:24, zIndex:9999,
          background:"var(--card)", color:"var(--text)", padding:"12px 20px",
          borderRadius:8, border:"1px solid var(--border-focus)",
          boxShadow:"0 8px 32px var(--glow-p)", display:"flex", alignItems:"center", gap:10,
          fontFamily:"var(--font-sans)", fontSize:14, fontWeight:500
        }}>
          {toast}
        </div>
      )}
    </>
  );
}