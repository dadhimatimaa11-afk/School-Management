import { useState, useEffect } from "react";
import "./../styles/branch.css";
import AddBranchForm from "./AddBranchForm";
import { getBranches, deleteBranch, updateBranch } from "../services/branchService";

export default function BranchPage() {
  const [branches, setBranches] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editBranch, setEditBranch] = useState(null);

  // 🔄 Fetch branches
  const fetchBranches = async () => {
    try {
      const res = await getBranches();
      const data = Array.isArray(res.data) ? res.data : res.data.branches;
      setBranches(data || []);
    } catch (err) {
      console.error("❌ Error fetching branches:", err);
      setBranches([]);
    }
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  // ✅ After branch added/edited, refresh list
  const handleFormSubmit = async () => {
    await fetchBranches();
    setShowForm(false);
    setEditBranch(null);
  };

  // ✅ Delete branch
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this branch?")) {
      try {
        await deleteBranch(id);
        alert("Branch deleted successfully!");
        fetchBranches();
      } catch (err) {
        alert("Error deleting branch: " + (err.response?.data?.message || err.message));
      }
    }
  };

  // ✅ Edit branch
  const handleEdit = (branch) => {
    setEditBranch(branch);
    setShowForm(true);
  };

  // ✅ Export Excel
  const handleExportExcel = () => {
    if (!branches.length) {
      alert("No branch data to export.");
      return;
    }

    const header = [
      "Branch Code",
      "Name",
      "City",
      "State",
      "Students",
      "Staff",
      "Status",
    ];

    const rows = branches.map((b) => [
      b.code,
      b.name,
      b.city,
      b.state,
      b.students ?? "–",
      b.staff ?? "–",
      b.status ?? "–",
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [header, ...rows].map((e) => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "branches.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="branch-page">
      {/* Header */}
      <div className="branch-header">
        <h1>🏢 Branch Management</h1>
        <div className="filters">
          <button
            className="btn-primary"
            onClick={() => {
              setShowForm(!showForm);
              setEditBranch(null);
            }}
          >
            + Add Branch
          </button>
          <button className="btn-secondary" onClick={handleExportExcel}>
            Export Excel
          </button>
        </div>
      </div>

      {/* Form Toggle */}
      {showForm && (
        <AddBranchForm
          onSubmit={handleFormSubmit}
          editData={editBranch}
        />
      )}

      {/* Summary Cards */}
      <div className="summary-grid">
        <div className="card hoverable">
          <h2>Total Branches</h2>
          <p className="big">{branches.length}</p>
          <span>Active branches</span>
        </div>
        <div className="card hoverable">
          <h2>Students</h2>
          <p className="big">
            {Array.isArray(branches)
              ? branches.reduce((sum, b) => sum + (b.students || 0), 0)
              : 0}
          </p>
          <span>Across all branches</span>
        </div>
        <div className="card hoverable">
          <h2>Staff</h2>
          <p className="big">
            {Array.isArray(branches)
              ? branches.reduce((sum, b) => sum + (b.staff || 0), 0)
              : 0}
          </p>
          <span>Teachers + Admin</span>
        </div>
        <div className="card hoverable alert">
          <h2>Alerts</h2>
          <p className="big">
            {Array.isArray(branches)
              ? branches.filter((b) => b.status === "Inactive").length
              : 0}
          </p>
          <span>Branches pending audit</span>
        </div>
      </div>

      {/* Branch Table */}
      <div className="card hoverable">
        <h2>Branch List</h2>
        <table className="branch-table">
          <thead>
            <tr>
              <th>Branch Code</th>
              <th>Name</th>
              <th>Location</th>
              <th>State</th>
              <th>Students</th>
              <th>Staff</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(branches) &&
              branches.map((branch) => (
                <tr key={branch._id}>
                  <td>{branch.code}</td>
                  <td>{branch.name}</td>
                  <td>{branch.city}</td>
                  <td>{branch.state}</td>
                  <td>{branch.students ?? "–"}</td>
                  <td>{branch.staff ?? "–"}</td>
                  <td>
                    <span
                      className={`pill ${
                        branch.status === "Active" ? "ok" : "fail"
                      }`}
                    >
                      {branch.status ?? "–"}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn-secondary small"
                      onClick={() => handleEdit(branch)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn-danger small"
                      onClick={() => handleDelete(branch._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
