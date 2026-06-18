import { useState } from 'react'
import axios from 'axios'
import './LeadTable.css'

function LeadTable({ leads, onRefresh }) {

  const [source, setSource] = useState('')
  const [status, setStatus] = useState('')
  const [search, setSearch] = useState('')

  //delete lead
   const deleteLead=async(id)=>{
      await axios.delete(`http://localhost:5000/api/leads/${id}`)
      onRefresh()
   }

  // filter
  const filtered = leads.filter(l => {
    if (source && l.source !== source) return false
    if (status && l.status !== status) return false
    if (search && !l.name.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  // Status update
  const updateStatus = async (id, val) => {
    await axios.patch(`http://localhost:5000/api/leads/${id}/status`, { status: val })
    onRefresh()
  }

  return (
    <div className="tbl-wrap">

      <div className="tbl-filters">
        <select onChange={e => setSource(e.target.value)}>
          <option value="">All Sources</option>
          <option value="website">Website</option>
          <option value="meta">Meta</option>
          <option value="google">Google</option>
        </select>
        <select onChange={e => setStatus(e.target.value)}>
          <option value="">All Status</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="converted">Converted</option>
        </select>
        <input
          placeholder="Search naam "
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <table className="leads-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Source</th>
            <th>Status</th>
            <th>Date</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(lead => (
            <tr key={lead._id}>
              <td><b>{lead.name}</b></td>
              <td style={{ color: '#94a3b8' }}>{lead.email}</td>
              <td>{lead.phone}</td>
              <td>
                <span className={`badge badge-${lead.source}`}>
                  {lead.source}
                </span>
              </td>
              <td>
                <span className={`badge badge-${lead.status}`}>
                  {lead.status}
                </span>
              </td>
              <td style={{ color: '#94a3b8' }}>
                {new Date(lead.createdAt).toLocaleDateString()}
              </td>
              <td>
                <select
                  className="status-select"
                  value={lead.status}
                  onChange={e => updateStatus(lead._id, e.target.value)}
                >
                  <option value="new">new</option>
                  <option value="contacted">contacted</option>
                  <option value="converted">converted</option>
                </select>
              </td>
              <td>
                <button className ="delete_btn" onClick={()=>deleteLead(lead._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="tbl-foot">{filtered.length} leads </div>

    </div>
  )
}

export default LeadTable