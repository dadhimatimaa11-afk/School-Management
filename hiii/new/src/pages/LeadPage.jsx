import "./../styles/lead.css";
import { useState, useEffect } from "react";
import { getLeads, updateLeadStatus, convertLeadToStudent, createLead } from "../services/leads";
import { exportLeadsToExcel } from "../utils/exportExcel";

export default function LeadPerformancePage() {
  const [leads, setLeads] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [newLead, setNewLead] = useState({
    name: "",
    email: "",
    phone: "",
    courseInterested: "",
    branch: "",
    source: "Call",
    status: "new"
  });

  // Fetch leads
  const fetchLeads = async () => {
    try {
      const data = await getLeads();
      setLeads(data);
    } catch (err) {
      console.error("❌ Error fetching leads:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  // Add Lead
  const handleAddLead = async () => {
    try {
      if (!newLead.name || !newLead.phone || !newLead.courseInterested || !newLead.branch) {
        alert("Please fill all required fields");
        return;
      }
      await createLead(newLead);   // ✅ use createLead service
      setNewLead({
        name: "",
        email: "",
        phone: "",
        courseInterested: "",
        branch: "",
        source: "Call",
        status: "new"
      });
      setShowModal(false);
      fetchLeads();
    } catch (err) {
      console.error("❌ Error adding lead:", err.message);
    }
  };

  // Status + Convert handlers
  const handleUpdateStatus = async (id, status) => {
    try {
      await updateLeadStatus(id, status);
      await fetchLeads();
    } catch (err) {
      console.error("❌ Error updating status:", err.message);
    }
  };

  const handleConvert = async (id) => {
    try {
      await convertLeadToStudent(id, { batch: "Batch A" });
      await fetchLeads();
    } catch (err) {
      console.error("❌ Error converting lead:", err.message);
    }
  };

  // Summary counts
  const converted = leads.filter(l => l.status === "converted").length;
  const contacted = leads.filter(l => l.status === "contacted").length;
  const lost = leads.filter(l => l.status === "lost").length;
  const newLeads = leads.filter(l => l.status === "new").length;

  return (
    <div className="lead-performance-page">
      {/* Header */}
      <div className="lead-header">
        <h1>📈 Lead Performance</h1>
        <div className="actions">
          <button className="btn-primary" onClick={() => exportLeadsToExcel(leads)}>
            Export Excel
          </button>
          <button className="btn-secondary" onClick={() => setShowModal(true)}>
            ➕ Add Lead
          </button>
        </div>
      </div>

      {/* ✅ Add Lead Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Add Lead</h2>

            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                value={newLead.name}
                onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={newLead.email}
                onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Phone</label>
              <input
                type="text"
                value={newLead.phone}
                onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Course Interested</label>
              <input
                type="text"
                value={newLead.courseInterested}
                onChange={(e) => setNewLead({ ...newLead, courseInterested: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Branch</label>
              <select
                value={newLead.branch}
                onChange={(e) => setNewLead({ ...newLead, branch: e.target.value })}
              >
                <option>Main Branch</option>
                <option>Branch B</option>
                <option>Branch C</option>
              </select>
            </div>

            <div className="form-group">
              <label>Source</label>
              <select
                value={newLead.source}
                onChange={(e) => setNewLead({ ...newLead, source: e.target.value })}
              >
                <option>Call</option>
                <option>WhatsApp</option>
                <option>Walk-in</option>
                <option>Website</option>
              </select>
            </div>

            <div className="form-group">
              <label>Status</label>
              <select
                value={newLead.status}
                onChange={(e) => setNewLead({ ...newLead, status: e.target.value })}
              >
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="converted">Converted</option>
                <option value="lost">Lost</option>
              </select>
            </div>

            <div className="modal-actions">
              <button className="btn-primary" onClick={handleAddLead}>Save</button>
              <button className="btn-danger" onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Summary Cards */}
      <div className="summary-grid">
        <div className="card hoverable">
          <h2>Total Leads</h2>
          <p className="big">{leads.length}</p>
          <span>Captured</span>
        </div>
        <div className="card hoverable">
          <h2>Converted</h2>
          <p className="big">{converted}</p>
          <span>Successful conversions</span>
        </div>
        <div className="card hoverable">
          <h2>Contacted</h2>
          <p className="big">{contacted}</p>
          <span>Follow‑ups done</span>
        </div>
        <div className="card hoverable">
          <h2>Lost</h2>
          <p className="big">{lost}</p>
          <span>Not converted</span>
        </div>
        <div className="card hoverable alert">
          <h2>New Leads</h2>
          <p className="big">{newLeads}</p>
          <span>Awaiting action</span>
        </div>
      </div>

      {/* Lead Table */}
      <div className="card hoverable">
        <h2>Lead Records</h2>
        <table className="lead-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Source</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {leads.length > 0 ? (
              leads.map(l => (
                <tr key={l._id}>
                  <td>{l._id}</td>
                  <td>{l.name}</td>
                  <td>{l.source}</td>
                  <td>
                    <span className={`pill ${l.status?.toLowerCase()}`}>{l.status}</span>
                  </td>
                  <td>{new Date(l.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button onClick={() => handleUpdateStatus(l._id, "contacted")}>Contact</button>
                    <button onClick={() => handleUpdateStatus(l._id, "lost")}>Lost</button>
                    <button onClick={() => handleConvert(l._id)}>Convert → Student</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No leads found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
