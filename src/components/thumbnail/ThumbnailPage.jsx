
export default function ThumbnailPage({ s, upd, prf, showToast }) {
  return (
    <>
      <div className="page-header">
        <div className="page-title">THUMBNAIL GENERATOR</div>
        <div className="page-sub">Build high-CTR gaming thumbnails · live preview · AI prompt</div>
      </div>
      <div className="tgen-grid">
        <LeftControls s={s} upd={upd} showToast={showToast}/>
        <RightPreview s={s} prf={prf} showToast={showToast}/>
      </div>
    </>
  );
}