import { useEffect, useState } from 'react'
import axios from 'axios'
import StatCards    from '../components/StatCards'
import Charts       from '../components/Charts'
import LeadTable    from '../components/LeadTable'
import AddLeadModal from '../components/AddLeadModal'
import './Dashboard.css'
import BASE_URL from '../api'

function Dashboard() {

  const [leads, setLeads]     = useState([])
  const [modal, setModal]     = useState(false)

  const fetchLeads = async () => {
    const res = await axios.get(`${BASE_URL}/api/leads`)
    setLeads(res.data.leads)
  }

  useEffect(() => { fetchLeads() }, [])

  return (
    <div className="dashboard">

      <div className="dash-topbar">
        <div>
          <div className="dash-title">Dashboard</div>
          <div className="dash-sub">All Leads</div>
        </div>
        <button className="btn-add" onClick={() => setModal(true)}>
          + Add Lead
        </button>
      </div>

      <StatCards leads={leads} />
      <Charts    leads={leads} />
      <LeadTable leads={leads} onRefresh={fetchLeads} />

      {modal && (
        <AddLeadModal
          onClose={()   => setModal(false)}
          onRefresh={fetchLeads}
        />
      )}

    </div>
  )
}

export default Dashboard