import "./../styles/salary.css";
import { useState, useEffect } from "react";
import { getSalaries, addSalary, updateSalary, deleteSalary } from "../services/salaries";

export default function SalaryPage() {
  const [salaries, setSalaries] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [newSalary, setNewSalary] = useState({
    employeeId: "",
    amount: "",
    month: "",
    kpiBonus: "",
    status: "Pending"
  });

  // Fetch salaries
  const fetchSalaries = async () => {
    try {
      const data = await getSalaries();
      setSalaries(data.salaries);
    } catch (err) {
      console.error("❌ Error fetching salaries:", err.message);
    }
  };

  useEffect(() => {
    fetchSalaries();
  }, []);

  // Add salary
  const handleAddSalary = async () => {
    try {
      if (!newSalary.employeeId || !newSalary.amount || !newSalary.month) {
        alert("Please fill all required fields");
        return;
      }
      const total = Number(newSalary.amount) + Number(newSalary.kpiBonus || 0);
      await addSalary({ ...newSalary, total });
      setNewSalary({ employeeId: "", amount: "", month: "", kpiBonus: "", status: "Pending" });
      setShowModal(false);
      fetchSalaries();
    } catch (err) {
      console.error("❌ Error adding salary:", err.message);
    }
  };

  // Update salary
  const handleUpdate = async (id) => {
    const updatedStatus = prompt("Enter new status (Pending/Paid):");
    if (updatedStatus) {
      await updateSalary(id, { status: updatedStatus });
      fetchSalaries();
    }
  };

  // Delete salary
  const handleDelete = async (id) => {
    try {
      await deleteSalary(id);
      fetchSalaries();
    } catch (err) {
      console.error("❌ Error deleting salary:", err.message);
    }
  };

  // Generate slip
  const generateSlip = (s) => {
    alert(`Salary Slip\n\nEmployee: ${s.employeeId?.name || s.employeeId}\nMonth: ${s.month}\nBase: ₹${s.amount}\nKPI Bonus: ₹${s.kpiBonus || 0}\nTotal: ₹${s.total}\nStatus: ${s.status}`);
  };

  return (
    <div className="salary-page">
      {/* Header */}
      <div className="salary-header">
        <h1>💵 Salary Management</h1>
        <button className="btn-primary" onClick={() => setShowModal(true)}>
          ➕ Add Salary Record
        </button>
      </div>

      {/* ✅ Add Salary Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Add Salary Record</h2>

            <div className="form-group">
              <label>Employee ID</label>
              <input
                type="text"
                value={newSalary.employeeId}
                onChange={(e) => setNewSalary({ ...newSalary, employeeId: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Base Salary</label>
              <input
                type="number"
                value={newSalary.amount}
                onChange={(e) => setNewSalary({ ...newSalary, amount: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>KPI Bonus</label>
              <input
                type="number"
                value={newSalary.kpiBonus}
                onChange={(e) => setNewSalary({ ...newSalary, kpiBonus: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Month</label>
              <input
                type="text"
                placeholder="e.g. Jan-2026"
                value={newSalary.month}
                onChange={(e) => setNewSalary({ ...newSalary, month: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Status</label>
              <select
                value={newSalary.status}
                onChange={(e) => setNewSalary({ ...newSalary, status: e.target.value })}
              >
                <option value="Pending">Pending</option>
                <option value="Paid">Paid</option>
              </select>
            </div>

            <div className="modal-actions">
              <button className="btn-primary" onClick={handleAddSalary}>Save</button>
              <button className="btn-danger" onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Summary Cards */}
      <div className="summary-grid">
        <div className="card hoverable">
          <h2>Total Staff</h2>
          <p className="big">{salaries.length}</p>
          <span>Salary records this month</span>
        </div>
        <div className="card hoverable">
          <h2>Total Payout</h2>
          <p className="big">₹ {salaries.reduce((acc,s)=>acc+(s.total || (s.amount + (s.kpiBonus||0))),0)}</p>
          <span>Combined salaries</span>
        </div>
        <div className="card hoverable">
          <h2>KPI Bonuses</h2>
          <p className="big">₹ {salaries.reduce((acc,s)=>acc+(s.kpiBonus||0),0)}</p>
          <span>Performance incentives</span>
        </div>
      </div>

      {/* Salary Table */}
      <div className="card hoverable">
        <h2>Salary Records</h2>
        <table className="salary-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Employee</th>
              <th>Base Salary</th>
              <th>KPI Bonus</th>
              <th>Total</th>
              <th>Month</th>
              <th>Status</th>
              <th>Slip</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {salaries.length > 0 ? (
              salaries.map(s => (
                <tr key={s._id}>
                  <td>{s._id}</td>
                  <td>{s.employeeId?.name || s.employeeId}</td>
                  <td>₹ {s.amount}</td>
                  <td>₹ {s.kpiBonus || 0}</td>
                  <td>₹ {s.total || (s.amount + (s.kpiBonus||0))}</td>
                  <td>{s.month}</td>
                  <td><span className={`pill ${s.status?.toLowerCase()}`}>{s.status}</span></td>
                  <td>
                    <button className="btn-secondary small" onClick={() => generateSlip(s)}>Generate</button>
                  </td>
                  <td>
                    <button className="btn-secondary small" onClick={() => handleUpdate(s._id)}>Edit</button>
                    <button className="btn-danger small" onClick={() => handleDelete(s._id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9">No salaries found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
