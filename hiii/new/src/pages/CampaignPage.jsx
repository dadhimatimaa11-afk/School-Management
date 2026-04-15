import "./../styles/campaign.css";
import { useState, useEffect } from "react";
import { getCampaigns, addCampaign, updateCampaign, deleteCampaign } from "../services/campaigns";

export default function CampaignPage() {
  const [campaigns, setCampaigns] = useState([]);
  const [newCampaign, setNewCampaign] = useState({
    title: "",
    type: "",
    audience: "",
    status: "Pending",
    date: ""
  });

  // Fetch campaigns
  const fetchCampaigns = async () => {
    try {
      const data = await getCampaigns();
      setCampaigns(data.campaigns);
    } catch (err) {
      console.error("❌ Error fetching campaigns:", err.message);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  // Add campaign
  const handleAddCampaign = async () => {
    try {
      if (!newCampaign.title || !newCampaign.type || !newCampaign.audience) {
        alert("Please fill all required fields");
        return;
      }
      await addCampaign(newCampaign);
      setNewCampaign({ title: "", type: "", audience: "", status: "Pending", date: "" });
      fetchCampaigns();
    } catch (err) {
      console.error("❌ Error adding campaign:", err.message);
    }
  };

  // Update campaign
  const handleUpdate = async (id) => {
    const updatedStatus = prompt("Enter new status (Pending/Scheduled/Sent):");
    if (updatedStatus) {
      await updateCampaign(id, { status: updatedStatus });
      fetchCampaigns();
    }
  };

  // Delete campaign
  const handleDelete = async (id) => {
    try {
      await deleteCampaign(id);
      fetchCampaigns();
    } catch (err) {
      console.error("❌ Error deleting campaign:", err.message);
    }
  };

  return (
    <div className="campaign-page">
      {/* Header */}
      <div className="campaign-header">
        <h1>📢 Campaign & Updates</h1>
      </div>

      {/* Form for new campaign */}
      <div className="form">
        <input
          type="text"
          placeholder="Title"
          value={newCampaign.title}
          onChange={(e) => setNewCampaign({ ...newCampaign, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Type (WhatsApp, SMS, Email)"
          value={newCampaign.type}
          onChange={(e) => setNewCampaign({ ...newCampaign, type: e.target.value })}
        />
        <input
          type="text"
          placeholder="Audience"
          value={newCampaign.audience}
          onChange={(e) => setNewCampaign({ ...newCampaign, audience: e.target.value })}
        />
        <input
          type="date"
          placeholder="Date"
          value={newCampaign.date}
          onChange={(e) => setNewCampaign({ ...newCampaign, date: e.target.value })}
        />
        <select
          value={newCampaign.status}
          onChange={(e) => setNewCampaign({ ...newCampaign, status: e.target.value })}
        >
          <option value="Pending">Pending</option>
          <option value="Scheduled">Scheduled</option>
          <option value="Sent">Sent</option>
        </select>
        <button className="btn-primary" onClick={handleAddCampaign}>+ Create Campaign</button>
      </div>

      {/* Summary Cards */}
      <div className="summary-grid">
        <div className="card hoverable">
          <h2>Total Campaigns</h2>
          <p className="big">{campaigns.length}</p>
          <span>Created so far</span>
        </div>
        <div className="card hoverable">
          <h2>WhatsApp</h2>
          <p className="big">{campaigns.filter(c => c.type === "WhatsApp").length}</p>
          <span>Integrated campaigns</span>
        </div>
        <div className="card hoverable alert">
          <h2>Pending</h2>
          <p className="big">{campaigns.filter(c => c.status === "Pending").length}</p>
          <span>Awaiting send</span>
        </div>
      </div>

      {/* Campaign Table */}
      <div className="card hoverable">
        <h2>Campaign Records</h2>
        <table className="campaign-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Type</th>
              <th>Audience</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.length > 0 ? (
              campaigns.map(c => (
                <tr key={c._id}>
                  <td>{c._id}</td>
                  <td>{c.title}</td>
                  <td>{c.type}</td>
                  <td>{c.audience}</td>
                  <td><span className={`pill ${c.status?.toLowerCase()}`}>{c.status}</span></td>
                  <td>{c.date ? new Date(c.date).toLocaleDateString() : "-"}</td>
                  <td>
                    <button className="btn-secondary small" onClick={() => handleUpdate(c._id)}>Edit</button>
                    <button className="btn-danger small" onClick={() => handleDelete(c._id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No campaigns found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
