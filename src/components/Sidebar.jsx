
export default function Sidebar({ open, setOpen, page, setPage, characterName }) {
  return (
    <div className={`sidebar ${open?"open":""}`}>
      <div className="sidebar-logo">{characterName?characterName.slice(0,1):"A"}</div>
      {NAV_ITEMS.map(n=>(
        <div key={n.id} className={`nav-item ${page===n.id?"active":""}`} onClick={()=>setPage(n.id)}>
          <span className="nav-icon">{n.icon}</span>
          {open&&<span>{n.label}</span>}
        </div>
      ))}
      <button className="toggle-btn" onClick={()=>setOpen(x=>!x)}>{open?"◀":"▶"}</button>
    </div>
  );
}