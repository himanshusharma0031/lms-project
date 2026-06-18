import './Sidebar.css'

const navItems = [
  { icon: '📊', label: 'Dashboard' },
  { icon: '👥', label: 'Leads'     },
  { icon: '📈', label: 'Analytics' },
]

function Sidebar() {
  return (
    <div className="sidebar">

      <div className="sidebar-logo">📋 LeadMS</div>

      {navItems.map((item, i) => (
        <div
          key={item.label}
          className={`sidebar-nav ${i === 0 ? 'active' : ''}`}
        >
          {item.icon} {item.label}
        </div>
      ))}

      <div className="sidebar-spacer" />
      <div className="sidebar-admin">👤 Admin</div>

    </div>
  )
}

export default Sidebar