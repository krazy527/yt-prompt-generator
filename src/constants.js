
export const SCENES = {
  explosion: { bg:"linear-gradient(135deg,#0d0005 0%,#2d0520 30%,#1a0a00 60%,#0d0000 100%)", accent:"#ff4400" },
  battle:    { bg:"linear-gradient(135deg,#000d1a 0%,#001533 40%,#0a0020 70%,#050010 100%)", accent:"#0044ff" },
  neon_city: { bg:"linear-gradient(135deg,#000014 0%,#0a0030 35%,#14002a 65%,#000014 100%)", accent:"#cc00ff" },
  map:       { bg:"linear-gradient(135deg,#001a0a 0%,#003315 40%,#001408 70%,#000c04 100%)", accent:"#00ff88" },
  galaxy:    { bg:"linear-gradient(135deg,#000008 0%,#050020 35%,#0a001a 65%,#000010 100%)", accent:"#6600ff" },
  custom:    { bg:"#0a0a14", accent:"#7c3aed" },
};
 
export const SCENE_OVERLAYS = {
  explosion: { sparks:["#ff6600","#ff4400","#ffaa00"] },
  battle:    { sparks:["#0066ff","#00aaff","#ffffff"] },
  neon_city: { sparks:["#cc00ff","#ff00cc","#00ccff"] },
  map:       { sparks:["#00ff88","#00ffcc","#66ff00"] },
  galaxy:    { sparks:["#9900ff","#cc66ff","#ffffff"] },
  custom:    { sparks:["#7c3aed","#ec4899","#f97316"] },
};
 
export const PRESET_EXPR = { shock:"😱", hype:"🤩", angry:"😤", focus:"🎯" };
 
export const GLOW_PRESETS = ["#7c3aed","#ec4899","#f97316","#06b6d4","#facc15","#00ff88","#ff0066"];
export const TITLE_COLORS = ["#ffffff","#facc15","#f97316","#ff00cc","#06b6d4"];
 
export const NAV_ITEMS = [
  { id:"thumbnail", icon:"🖼", label:"Thumbnail" },
  { id:"dashboard", icon:"👤", label:"Profile"   },
  { id:"guide",     icon:"📘", label:"Guide"     },
];
 
export const EFFECT_TOGGLES = [
  { key:"glowEnabled",       label:"Glow FX",       badge:"+10 CTR", tip:"Neon outlines make subjects pop on dark backgrounds and small screens." },
  { key:"vignetteEnabled",   label:"Vignette",       badge:"+10 CTR", tip:"Darkened corners force the eye to the center subject. Subtle but very effective." },
  { key:"particlesEnabled",  label:"Particles",      badge:"+8 CTR",  tip:"Floating sparks add kinetic energy and perceived production value." },
  { key:"neonBorderEnabled", label:"Neon Border",    badge:"+7 CTR",  tip:"Glowing frame separates your thumbnail from adjacent videos." },
  { key:"bgBlurEnabled",     label:"BG Depth Blur",  badge:"+8 CTR",  tip:"Blur mimics camera depth-of-field. Makes subject feel 3D and cinematic." },
];
 
export const BEST_PRACTICES = [
  { icon:"👁",  text:"Face/subject is the brightest focal point" },
  { icon:"🎨",  text:"High contrast: dark bg + vivid neon accents" },
  { icon:"✍️",  text:"Title is 0–3 words, bold, readable at 100px" },
  { icon:"📐",  text:"Single dominant composition — no clutter" },
  { icon:"📱",  text:"Test at mobile size (150×84px)" },
  { icon:"🏷",  text:"Channel branding consistent every video" },
  { icon:"🎭",  text:"Strong emotion — shock/hype outperform neutral 2–3×" },
  { icon:"🖼️",  text:"Custom BG: add 40–60% darkness overlay for contrast" },
  { icon:"🔲",  text:"Export 1920×1080 PNG, embed keywords in filename" },
];
 
export const GUIDE_SECTIONS = [
  { title:"AI Tools to use", content:[
    "🎨 Midjourney — Best cinematic quality. /imagine [prompt] --ar 16:9 --v 6",
    "🖼 Leonardo AI — Free tier. Use 'Lightning XL' or 'Absolute Reality' model.",
    "💬 ChatGPT DALL·E 3 — Paste short prompt. Say '16:9 YouTube gaming thumbnail'.",
    "⚡ Adobe Firefly — Best for adding clean text. Use after generating base image.",
  ]},
  { title:"Custom Expression Tips", content:[
    "✅ Be specific: 'villain smirk', 'battle-hardened stare', 'triumphant roar'",
    "✅ Add intensity cues: 'cold calculating focus', 'unhinged rage', 'silent menace'",
    "✅ Mix mood + body: 'fist raised screaming', 'head down defeated', 'jaw dropped'",
    "❌ Avoid vague words: 'cool', 'happy', 'nice' — AI can't visualize these precisely",
    "💡 The custom expression text flows directly into the AI prompt as the emotion descriptor.",
  ]},
  { title:"Custom Background Tips", content:[
    "✅ Use in-game screenshots at max graphic settings for authenticity.",
    "✅ Best shots: killcam, victory screen, map overview, cinematic cutscene frame.",
    "✅ Set darkness overlay at 40–60% so face and title stay dominant.",
    "✅ Enable BG Depth Blur to add cinematic separation between layers.",
    "❌ Avoid: cluttered HUDs, busy UI elements, or overly bright images.",
    "💡 Upload → auto-switches to Custom Image scene. Use the darkness slider to tune.",
  ]},
  { title:"How to Iterate for Max CTR", content:[
    "1️⃣ Generate 4 variations. Pick best composition.",
    "2️⃣ Upscale the winner (Midjourney U1–U4).",
    "3️⃣ Add real face + title text in Canva or Photoshop.",
    "4️⃣ A/B test on YouTube for 14 days minimum.",
    "5️⃣ Aim >5% CTR. >7% is exceptional 🔥 Iterate the loser.",
  ]},
];
 
export const DEFAULT_THUMB_STATE = {
  layoutType:"single", charPosition:"left",
  mainTitle:"INSANE CLUTCH", subText:"", subTextEnabled:false,
  bgWord:"OP", mainTextColor:"#ffffff", bgTextColor:"#ffffff",
  glowColor:"#7c3aed",
  glowEnabled:true, bgBlurEnabled:true, vignetteEnabled:true,
  neonBorderEnabled:true, particlesEnabled:true,
  scene:"explosion", expression:"shock",
  useCustomExpression:false, customExprText:"",
  customBgImage:null, customBgDim:0.45,
};
 
export function calcCTR(s) {
  let n = 0;
  if (s.mainTitle?.trim())                        n += 15;
  if ((s.mainTitle?.trim().length||0) <= 20)     n += 5;
  if (s.glowEnabled)      n += 10;
  if (s.vignetteEnabled)  n += 10;
  if (s.particlesEnabled) n += 8;
  if (s.neonBorderEnabled)n += 7;
  if (s.bgBlurEnabled)    n += 8;
  if (s.layoutType==="dual") n += 7;
  if (s.subTextEnabled && s.subText?.trim()) n += 5;
  if (s.bgWord?.trim()) n += 5;
  if (s.useCustomExpression && s.customExprText?.trim()) n += 5;
  if (s.scene==="custom" && s.customBgImage) n += 8;
  if (n>90) n = 90 + Math.min(10,(n-90)/2);
  return Math.min(100, n);
}
 
export function buildPrompt(s, prf) {
  const sceneLabel = s.scene==="custom" ? "custom uploaded background" : s.scene.replace("_"," ");
  const layoutDesc = {single:"single character",dual:"dual character split",multi:"multi character group"}[s.layoutType];
  const exprText = s.useCustomExpression && s.customExprText?.trim()
    ? s.customExprText.trim()
    : {shock:"shocked, wide-eyed",hype:"hyped, ecstatic, huge grin",angry:"furious, intense",focus:"laser-focused, determined"}[s.expression];
  return [
    `**YouTube gaming thumbnail**, ${layoutDesc} composition.`,
    ``,
    `**SUBJECT:** Close-up portrait of ${prf.characterName||"AISHU"} positioned ${s.charPosition} frame, expression: ${exprText}. Face is #1 focal point — sharp, high-detail, outlined with ${s.glowColor} neon halo.`,
    s.layoutType==="dual" ? `**RIGHT SIDE:** Game character in dynamic action pose, orange-yellow neon outline, split composition tension.` : "",
    s.layoutType==="multi"? `**SUPPORT CHARS:** Two flanking characters at smaller scale, purple and orange neon outlines.` : "",
    ``,
    `**BACKGROUND:** ${s.scene==="custom"&&s.customBgImage ? "Custom image provided — apply cinematic color grade, dark overlay for contrast, keep subject dominant." : `${sceneLabel} scene, cinematic dark atmosphere.`} ${s.bgBlurEnabled?"Depth-of-field blur so subject dominates.":""} ${s.vignetteEnabled?"Heavy radial vignette — face is brightest zone.":""}`,
    ``,
    `**LIGHTING:** Dramatic rim lighting, neon spill from environment. Deep blacks + vivid neon highlights. Cinematic grade. Accent: ${SCENES[s.scene]?.accent??"#7c3aed"}.`,
    s.glowEnabled       ? `**GLOW FX:** Subject outlined with ${s.glowColor} bloom. Atmospheric halos.` : "",
    s.particlesEnabled  ? `**PARTICLES:** Floating embers/sparks for kinetic energy and depth.` : "",
    s.neonBorderEnabled ? `**FRAME:** Thin neon border in ${s.glowColor}.` : "",
    s.bgWord?.trim()    ? `**BG TEXT:** "${s.bgWord.toUpperCase()}" — massive translucent neon (8–12% opacity) behind subject.` : "",
    ``,
    `**TYPOGRAPHY:** Main title "${s.mainTitle||"YOUR TITLE"}" bottom-center — Bebas Neue ALL CAPS, white + yellow-orange outline, heavy shadow. ${s.subTextEnabled&&s.subText?`Sub: "${s.subText}".`:""} Channel: "${prf.channelName||"AISHU GAMING"}".`,
    ``,
    `**STYLE:** Hyper-stylized gaming art, 8K cinematic, CTR-optimized, 16:9, 1920×1080. Single dominant focal point, zero clutter.`,
  ].filter(Boolean).join("\n");
}