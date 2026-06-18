import './StatCards.css'

function StatCards({ leads }) {

  const total   = leads.length
  const website = leads.filter(l => l.source === 'website').length
  const meta    = leads.filter(l => l.source === 'meta').length
  const google  = leads.filter(l => l.source === 'google').length
  const pct     = (n) => total ? Math.round((n / total) * 100) : 0

  const cards = [
    { label: 'Total Leads', num: total,   color: '#1e293b', sub: '+today'          },
    { label: 'Website',     num: website, color: '#1d4ed8', sub: pct(website)+'%' },
    { label: 'Meta Ads',    num: meta,    color: '#6d28d9', sub: pct(meta)+'%'    },
    { label: 'Google Ads',  num: google,  color: '#15803d', sub: pct(google)+'%'  },
  ]

  return (
    <div className="stat-grid">
      {cards.map(c => (
        <div key={c.label} className="stat-card">
          <div className="stat-label">{c.label}</div>
          <div className="stat-num" style={{ color: c.color }}>{c.num}</div>
          <div className="stat-sub" style={{ color: c.color }}>{c.sub}</div>
        </div>
      ))}
    </div>
  )
}

export default StatCards