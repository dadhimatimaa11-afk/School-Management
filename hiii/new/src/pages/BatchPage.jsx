import "./../styles/batch.css";
import { useState, useEffect } from "react";
import {
  getBatches,
  addBatch,
  updateBatch,
  deleteBatch,
  assignStudentToBatch
} from "../services/batch";

export default function BatchPage() {
  const [batches, setBatches] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [newBatch, setNewBatch] = useState({
    name: "",
    course: "",
    startDate: "",
    endDate: "",
    status: "Upcoming"
  });

  // Fetch batches
  const fetchBatches = async () => {
    try {
      const data = await getBatches();
      setBatches(data.batches);
    } catch (err) {
      console.error("❌ Error fetching batches:", err.message);
    }
  };

  useEffect(() => {
    fetchBatches();
  }, []);

  // Add new batch
  const handleAddBatch = async () => {
    try {
      if (!newBatch.name || !newBatch.course || !newBatch.startDate) {
        alert("Please fill all required fields");
        return;
      }
      await addBatch(newBatch);
      setNewBatch({ name: "", course: "", startDate: "", endDate: "", status: "Upcoming" });
      setShowModal(false);
      fetchBatches();
    } catch (err) {
      console.error("❌ Error adding batch:", err.message);
    }
  };

  // Update batch
  const handleUpdate = async (id) => {
    const updatedCourse = prompt("Enter new course name:");
    if (updatedCourse) {
      await updateBatch(id, { course: updatedCourse });
      fetchBatches();
    }
  };

  // Delete batch
  const handleDelete = async (id) => {
    try {
      await deleteBatch(id);
      fetchBatches();
    } catch (err) {
      console.error("❌ Error deleting batch:", err.message);
    }
  };

  // Assign student
  const handleAssign = async (batchId) => {
    const studentId = prompt("Enter Student ID to assign:");
    if (studentId) {
      try {
        await assignStudentToBatch(batchId, studentId);
        fetchBatches();
      } catch (err) {
        console.error("❌ Error assigning student:", err.message);
      }
    }
  };

  return (
    <div className="batch-page">
      <div className="batch-header">
        <h1>📆 Batch Management</h1>
        <button className="btn-primary" onClick={() => setShowModal(true)}>
          ➕ Create Batch
        </button>
      </div>

      {/* ✅ Create Batch Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Create Batch</h2>

            <div className="form-group">
              <label>Batch Name</label>
              <input
                type="text"
                placeholder="Batch Name"
                value={newBatch.name}
                onChange={(e) => setNewBatch({ ...newBatch, name: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Course</label>
              <input
                type="text"
                placeholder="Course"
                value={newBatch.course}
                onChange={(e) => setNewBatch({ ...newBatch, course: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Start Date</label>
              <input
                type="date"
                value={newBatch.startDate}
                onChange={(e) => setNewBatch({ ...newBatch, startDate: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>End Date</label>
              <input
                type="date"
                value={newBatch.endDate || ""}
                onChange={(e) => setNewBatch({ ...newBatch, endDate: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Status</label>
              <select
                value={newBatch.status}
                onChange={(e) => setNewBatch({ ...newBatch, status: e.target.value })}
              >
                <option value="Upcoming">Upcoming</option>
                <option value="Running">Running</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div className="modal-actions">
              <button className="btn-primary" onClick={handleAddBatch}>Save</button>
              <button className="btn-danger" onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Summary Cards */}
      <div className="summary-grid">
        <div className="card hoverable">
          <h2>Total Batches</h2>
          <p className="big">{batches.length}</p>
        </div>
        <div className="card hoverable">
          <h2>Upcoming</h2>
          <p className="big">{batches.filter(b => b.status === "Upcoming").length}</p>
        </div>
        <div className="card hoverable">
          <h2>Completed</h2>
          <p className="big">{batches.filter(b => b.status === "Completed").length}</p>
        </div>
      </div>

      {/* Batch Table */}
      <div className="card hoverable">
        <h2>Batch List</h2>
        <table className="batch-table">
          <thead>
            <tr>
              <th>Batch ID</th>
              <th>Course</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Students</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {batches.length > 0 ? (
              batches.map(b => (
                <tr key={b._id}>
                  <td>{b._id}</td>
                  <td>{b.course}</td>
                  <td>{new Date(b.startDate).toLocaleDateString()}</td>
                  <td>{b.endDate ? new Date(b.endDate).toLocaleDateString() : "-"}</td>
                  <td>{b.students?.length || 0}</td>
                  <td><span className={`pill ${b.status?.toLowerCase()}`}>{b.status}</span></td>
                  <td>
                    <button className="btn-secondary small" onClick={() => handleUpdate(b._id)}>Edit</button>
                    <button className="btn-danger small" onClick={() => handleDelete(b._id)}>Delete</button>
                    <button className="btn-primary small" onClick={() => handleAssign(b._id)}>
                      Assign Student
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No batches found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
