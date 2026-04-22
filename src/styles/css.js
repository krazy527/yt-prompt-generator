export const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Bebas+Neue&family=Orbitron:wght@400;700;900&family=Share+Tech+Mono&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
:root{--bg:#080810;--surface:#0e0e1a;--card:#13131f;--card2:#181828;--border:rgba(120,80,255,0.18);--purple:#7c3aed;--purple2:#a855f7;--pink:#ec4899;--orange:#f97316;--cyan:#06b6d4;--yellow:#facc15;--green:#22c55e;--text:#e2e8f0;--muted:#64748b;--glow-p:rgba(124,58,237,0.45);}
body{background:var(--bg);color:var(--text);font-family:'Rajdhani',sans-serif;overflow-x:hidden;}
::-webkit-scrollbar{width:4px;}::-webkit-scrollbar-track{background:var(--bg);}::-webkit-scrollbar-thumb{background:var(--purple);border-radius:4px;}
.app{display:flex;min-height:100vh;}
.sidebar{width:64px;background:var(--surface);border-right:1px solid var(--border);display:flex;flex-direction:column;align-items:center;padding:20px 0;gap:8px;position:sticky;top:0;height:100vh;transition:width .3s cubic-bezier(.4,0,.2,1);overflow:hidden;flex-shrink:0;z-index:50;}
.sidebar.open{width:210px;align-items:flex-start;padding:20px 12px;}
.sidebar-logo{font-family:'Bebas Neue',sans-serif;font-size:20px;letter-spacing:3px;color:var(--purple2);text-shadow:0 0 20px var(--glow-p);white-space:nowrap;overflow:hidden;padding:0 8px;margin-bottom:16px;}
.nav-item{display:flex;align-items:center;gap:10px;width:100%;padding:10px 12px;border-radius:10px;cursor:pointer;color:var(--muted);font-size:14px;font-weight:600;letter-spacing:.5px;transition:all .2s;white-space:nowrap;overflow:hidden;border:1px solid transparent;}
.nav-item:hover{background:rgba(124,58,237,.12);color:var(--text);}
.nav-item.active{background:rgba(124,58,237,.2);color:var(--purple2);border-color:rgba(124,58,237,.3);text-shadow:0 0 10px var(--glow-p);}
.nav-icon{font-size:18px;flex-shrink:0;}
.toggle-btn{margin-top:auto;background:none;border:1px solid var(--border);color:var(--muted);cursor:pointer;padding:8px;border-radius:8px;transition:all .2s;font-size:14px;}
.toggle-btn:hover{color:var(--text);border-color:var(--purple);}
.main{flex:1;overflow-y:auto;padding:28px;}
.page-header{margin-bottom:28px;}
.page-title{font-family:'Bebas Neue',sans-serif;font-size:36px;letter-spacing:3px;background:linear-gradient(135deg,var(--purple2),var(--pink));-webkit-background-clip:text;-webkit-text-fill-color:transparent;line-height:1.2;}
.page-sub{color:var(--muted);font-size:14px;margin-top:4px;}
.tgen-grid{display:grid;grid-template-columns:340px 1fr;gap:20px;align-items:start;}
@media(max-width:900px){.tgen-grid{grid-template-columns:1fr;}}
.card{background:var(--card);border:1px solid var(--border);border-radius:14px;padding:18px;position:relative;overflow:hidden;}
.card::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(124,58,237,.04),transparent);pointer-events:none;}
.card.custom-card{border-color:rgba(236,72,153,0.28);background:linear-gradient(135deg,#13131f,#1a1026);}
.card.custom-card::after{content:'CUSTOM';position:absolute;top:13px;right:14px;font-family:'Orbitron',sans-serif;font-size:8px;font-weight:700;letter-spacing:2px;background:linear-gradient(135deg,var(--purple),var(--pink));-webkit-background-clip:text;-webkit-text-fill-color:transparent;}
.card-title{font-family:'Orbitron',sans-serif;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--purple2);margin-bottom:16px;display:flex;align-items:center;gap:8px;}
.card-title::before{content:'';display:inline-block;width:3px;height:12px;background:var(--pink);border-radius:2px;}
.section-divider{border:none;border-top:1px solid var(--border);margin:14px 0;}
.field{margin-bottom:14px;}
.field-label{display:flex;align-items:center;justify-content:space-between;font-size:12px;font-weight:600;letter-spacing:.8px;text-transform:uppercase;color:var(--muted);margin-bottom:6px;}
.tooltip-icon{width:16px;height:16px;border-radius:50%;background:rgba(124,58,237,.2);border:1px solid var(--purple);display:inline-flex;align-items:center;justify-content:center;font-size:9px;color:var(--purple2);cursor:default;position:relative;flex-shrink:0;}
.tooltip-icon:hover .tooltip-text{display:block;}
.tooltip-text{display:none;position:absolute;bottom:22px;right:0;background:#1e1e30;border:1px solid var(--border);border-radius:8px;padding:8px 10px;font-size:11px;color:var(--text);width:180px;line-height:1.5;text-transform:none;letter-spacing:0;font-weight:400;z-index:100;box-shadow:0 8px 32px rgba(0,0,0,.6);}
input[type=text],textarea,select{width:100%;background:var(--card2);border:1px solid var(--border);border-radius:8px;padding:9px 12px;color:var(--text);font-family:'Rajdhani',sans-serif;font-size:14px;font-weight:500;outline:none;transition:border-color .2s,box-shadow .2s;}
input[type=text]:focus,textarea:focus,select:focus{border-color:var(--purple);box-shadow:0 0 0 2px rgba(124,58,237,.2);}
select option{background:#1a1a2e;}
input.custom-input{border-color:rgba(236,72,153,.3);background:rgba(236,72,153,.04);}
input.custom-input:focus{border-color:var(--pink);box-shadow:0 0 0 2px rgba(236,72,153,.18);}
.seg-control{display:flex;gap:4px;background:var(--card2);border-radius:9px;padding:3px;border:1px solid var(--border);}
.seg-btn{flex:1;padding:7px 4px;border-radius:7px;border:none;background:none;color:var(--muted);cursor:pointer;font-family:'Rajdhani',sans-serif;font-size:12px;font-weight:700;letter-spacing:.5px;transition:all .2s;text-transform:uppercase;}
.seg-btn.active{background:var(--purple);color:#fff;box-shadow:0 2px 12px var(--glow-p);}
.seg-btn.active-pink{background:var(--pink);color:#fff;box-shadow:0 2px 12px rgba(236,72,153,.45);}
.toggle-row{display:flex;align-items:center;justify-content:space-between;padding:8px 0;}
.toggle-label{font-size:13px;font-weight:600;color:var(--text);display:flex;align-items:center;gap:8px;flex-wrap:wrap;}
.badge{font-size:10px;background:rgba(124,58,237,.2);color:var(--purple2);padding:2px 6px;border-radius:4px;}
.toggle{width:38px;height:20px;border-radius:10px;cursor:pointer;position:relative;transition:background .2s;border:none;padding:0;flex-shrink:0;}
.toggle.on{background:var(--purple);}
.toggle.off{background:rgba(255,255,255,.1);}
.toggle::after{content:'';position:absolute;width:14px;height:14px;border-radius:50%;background:#fff;top:3px;transition:left .2s;box-shadow:0 1px 4px rgba(0,0,0,.4);}
.toggle.on::after{left:21px;}
.toggle.off::after{left:3px;}
.color-row{display:flex;gap:8px;flex-wrap:wrap;}
.color-swatch{width:28px;height:28px;border-radius:6px;cursor:pointer;border:2px solid transparent;transition:transform .15s,border-color .15s;flex-shrink:0;}
.color-swatch.active{border-color:#fff;transform:scale(1.15);}
input[type=color]{width:28px;height:28px;padding:0;border:2px solid var(--border);border-radius:6px;cursor:pointer;background:none;}
.drop-zone{border:2px dashed var(--border);border-radius:10px;padding:16px 12px;text-align:center;cursor:pointer;transition:all .2s;position:relative;background:var(--card2);}
.drop-zone:hover,.drop-zone.drag-over{border-color:var(--pink);background:rgba(236,72,153,.07);}
.drop-zone.has-image{border-color:var(--green);border-style:solid;cursor:default;}
.drop-zone-preview{width:100%;height:80px;object-fit:cover;border-radius:7px;margin-bottom:6px;display:block;}
.drop-zone-text{font-size:12px;font-weight:600;color:var(--muted);line-height:1.7;}
.drop-zone-text span{color:var(--pink);}
.drop-zone-clear{position:absolute;top:6px;right:6px;background:rgba(0,0,0,.75);border:1px solid var(--border);color:var(--text);border-radius:5px;padding:2px 8px;font-size:10px;cursor:pointer;z-index:2;transition:background .2s;font-family:'Rajdhani',sans-serif;font-weight:700;}
.drop-zone-clear:hover{background:rgba(239,68,68,.35);border-color:#ef4444;}
.overlay-row{display:flex;align-items:center;gap:10px;background:var(--card2);border:1px solid var(--border);border-radius:8px;padding:8px 12px;}
.overlay-row label{font-size:11px;color:var(--muted);font-weight:600;white-space:nowrap;}
input[type=range]{width:100%;accent-color:var(--pink);cursor:pointer;}
.preview-wrap{display:flex;flex-direction:column;gap:14px;}
.preview-label{font-family:'Orbitron',sans-serif;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--purple2);display:flex;align-items:center;gap:8px;}
.preview-label::after{content:'LIVE';font-size:8px;background:var(--pink);color:#fff;padding:2px 6px;border-radius:4px;animation:pulse 2s infinite;}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}
.thumb-canvas{width:100%;aspect-ratio:16/9;border-radius:12px;position:relative;overflow:hidden;border:2px solid var(--border);box-shadow:0 8px 48px rgba(0,0,0,.8),0 0 0 1px rgba(124,58,237,.1);transition:box-shadow .3s;}
.thumb-canvas:hover{box-shadow:0 8px 64px rgba(124,58,237,.3),0 0 0 1px rgba(124,58,237,.3);}
.neon-border-overlay{position:absolute;inset:0;pointer-events:none;z-index:10;border-radius:10px;}
.vignette-overlay{position:absolute;inset:0;pointer-events:none;z-index:5;background:radial-gradient(ellipse at center,transparent 40%,rgba(0,0,0,.85) 100%);}
.particle{position:absolute;border-radius:50%;pointer-events:none;animation:floatP var(--dur,3s) ease-in-out infinite var(--delay,0s);z-index:4;}
@keyframes floatP{0%,100%{transform:translateY(0) scale(1);opacity:.7}50%{transform:translateY(-15px) scale(1.2);opacity:1}}
.face-placeholder{position:absolute;z-index:6;display:flex;flex-direction:column;align-items:center;gap:4px;}
.face-circle{border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:clamp(14px,4vw,32px);transition:all .3s;}
.face-name{font-family:'Bebas Neue',sans-serif;letter-spacing:2px;text-align:center;text-shadow:0 0 10px currentColor;font-size:clamp(6px,1.4vw,12px);}
.game-char{position:absolute;z-index:6;display:flex;flex-direction:column;align-items:center;transition:all .3s;}
.char-body{border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:clamp(14px,3.5vw,28px);position:relative;animation:charHover 2s ease-in-out infinite;}
@keyframes charHover{0%,100%{transform:translateY(0) rotate(-2deg)}50%{transform:translateY(-6px) rotate(2deg)}}
.arrow-element{position:absolute;z-index:7;pointer-events:none;font-size:clamp(12px,2.5vw,22px);filter:drop-shadow(0 0 8px var(--pink));animation:arrowPulse 1.2s ease-in-out infinite;}
@keyframes arrowPulse{0%,100%{transform:translateX(0)}50%{transform:translateX(6px)}}
.bg-word{position:absolute;z-index:2;left:50%;top:50%;transform:translate(-50%,-50%);font-family:'Bebas Neue',sans-serif;font-size:clamp(30px,10vw,80px);letter-spacing:8px;opacity:.08;pointer-events:none;text-align:center;white-space:nowrap;}
.thumb-title{position:absolute;z-index:8;left:50%;transform:translateX(-50%);text-align:center;white-space:nowrap;font-family:'Bebas Neue',sans-serif;letter-spacing:3px;text-shadow:3px 3px 0 rgba(0,0,0,.9),0 0 20px currentColor;bottom:12%;font-size:clamp(14px,4.5vw,38px);max-width:90%;overflow:hidden;text-overflow:ellipsis;}
.thumb-subtext{position:absolute;z-index:8;left:50%;transform:translateX(-50%);text-align:center;white-space:nowrap;font-family:'Rajdhani',sans-serif;font-weight:700;letter-spacing:2px;bottom:5%;font-size:clamp(8px,2.2vw,16px);opacity:.85;}
.brand-tag{position:absolute;z-index:9;top:5%;right:4%;font-family:'Orbitron',sans-serif;font-weight:900;font-size:clamp(6px,1.5vw,12px);letter-spacing:2px;padding:3px 8px;border-radius:4px;border:1px solid;transition:all .3s;}
.custom-expr-badge{position:absolute;z-index:11;bottom:5%;left:4%;font-family:'Rajdhani',sans-serif;font-size:clamp(6px,1.4vw,11px);font-weight:700;letter-spacing:1px;text-transform:uppercase;padding:2px 8px;border-radius:4px;border:1px solid;max-width:40%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.prompt-box{background:var(--card2);border:1px solid var(--border);border-radius:12px;padding:16px;font-family:'Share Tech Mono',monospace;font-size:12px;color:#a78bfa;line-height:1.7;max-height:200px;overflow-y:auto;}
.prompt-box .kw{color:var(--pink);font-weight:700;}
.copy-btn{display:flex;align-items:center;gap:6px;padding:9px 18px;border-radius:8px;cursor:pointer;font-family:'Rajdhani',sans-serif;font-size:13px;font-weight:700;letter-spacing:1px;text-transform:uppercase;border:none;transition:all .2s;}
.copy-btn.primary{background:linear-gradient(135deg,var(--purple),var(--pink));color:#fff;box-shadow:0 4px 20px var(--glow-p);}
.copy-btn.primary:hover{transform:translateY(-1px);box-shadow:0 6px 28px var(--glow-p);}
.copy-btn.ghost{background:var(--card2);border:1px solid var(--border);color:var(--muted);}
.copy-btn.ghost:hover{border-color:var(--purple);color:var(--purple2);}
.toast{position:fixed;bottom:24px;right:24px;z-index:9999;background:linear-gradient(135deg,var(--purple),var(--pink));color:#fff;padding:12px 20px;border-radius:10px;font-family:'Rajdhani',sans-serif;font-size:14px;font-weight:700;letter-spacing:.5px;box-shadow:0 8px 32px var(--glow-p);animation:slideIn .3s ease;display:flex;align-items:center;gap:8px;}
@keyframes slideIn{from{transform:translateX(80px);opacity:0}to{transform:none;opacity:1}}
.ctr-meter{margin-top:10px;}
.ctr-bar{height:6px;border-radius:3px;background:var(--card2);overflow:hidden;margin-top:4px;}
.ctr-fill{height:100%;border-radius:3px;transition:width .5s cubic-bezier(.4,0,.2,1);}
.ctr-labels{display:flex;justify-content:space-between;font-size:10px;color:var(--muted);margin-top:3px;}
.checklist{display:flex;flex-direction:column;gap:5px;margin-top:8px;}
.check-item{display:flex;align-items:center;gap:8px;font-size:12px;}
.check-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0;}
.hint-box{background:rgba(236,72,153,.07);border:1px solid rgba(236,72,153,.22);border-radius:8px;padding:10px 12px;}
`;