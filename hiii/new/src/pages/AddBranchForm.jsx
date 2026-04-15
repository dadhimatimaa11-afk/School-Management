import { useState, useEffect } from "react";
import "./../styles/branch.css";
import { createBranch, updateBranch } from "../services/branchService";

export default function AddBranchForm({ onSubmit, editData }) {
  const [branchName, setBranchName] = useState("");
  const [code, setCode] = useState("");
  const [location, setLocation] = useState("");
  const [state, setState] = useState("");
  const [students, setStudents] = useState("");
  const [staff, setStaff] = useState("");
  const [status, setStatus] = useState("Active");
  const [error, setError] = useState("");

  // 👇 Prefill form if editing
  useEffect(() => {
    if (editData) {
      setBranchName(editData.name || "");
      setCode(editData.code || "");
      setLocation(editData.city || "");
      setState(editData.state || "");
      setStudents(editData.students || "");
      setStaff(editData.staff || "");
      setStatus(editData.status || "Active");
    }
  }, [editData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!branchName || !location || !code || !state) {
      setError("Branch name, code, city, and state are required!");
      return;
    }
    setError("");

    const formData = {
      name: branchName,
      code,
      city: location,
      state,
      students: Number(students) || 0,
      staff: Number(staff) || 0,
      status: status || "Inactive",
    };

    try {
      if (editData?._id) {
        await updateBranch(editData._id, formData);
        alert("Branch updated successfully!");
      } else {
        await createBranch(formData);
        alert("Branch created successfully!");
      }
      if (onSubmit) onSubmit();
    } catch (err) {
      alert("Error: " + (err.response?.data?.message || err.message));
    }

    // Reset form after submit
    setBranchName("");
    setCode("");
    setLocation("");
    setState("");
    setStudents("");
    setStaff("");
    setStatus("Active");
  };

  return (
    <div className="card hoverable">
      <h2>{editData ? "Edit Branch" : "Add New Branch"}</h2>
      {error && <div className="alert error">{error}</div>}
      <form className="form-grid" onSubmit={handleSubmit}>
        <div className="field">
          <label>Branch Name</label>
          <input
            type="text"
            value={branchName}
            onChange={(e) => setBranchName(e.target.value)}
            placeholder="Enter branch name"
          />
        </div>
        <div className="field">
          <label>Branch Code</label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter unique code"
          />
        </div>
        <div className="field">
          <label>City</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter city"
          />
        </div>
        <div className="field">
          <label>State</label>
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            placeholder="Enter state"
          />
        </div>
        <div className="field">
          <label>Students</label>
          <input
            type="number"
            value={students}
            onChange={(e) => setStudents(e.target.value)}
            placeholder="Number of students"
          />
        </div>
        <div className="field">
          <label>Staff</label>
          <input
            type="number"
            value={staff}
            onChange={(e) => setStaff(e.target.value)}
            placeholder="Number of staff"
          />
        </div>
        <div className="field">
          <label>Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>
        <button type="submit" className="btn-primary">
          {editData ? "Update Branch" : "Save Branch"}
        </button>
      </form>
    </div>
  );
}
