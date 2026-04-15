import "./../styles/expense.css";
import { useState } from "react";

export default function ExpensePage() {
  const [expenses, setExpenses] = useState([
    { id: "E001", category: "Utilities", branch: "Jaipur", amount: 5000, date: "2026-01-10", period: "Monthly", status: "Within Budget" },
    { id: "E002", category: "Marketing", branch: "Sikar", amount: 12000, date: "2026-01-15", period: "Monthly", status: "Over Budget" },
  ]);

  return (
    <div className="expense-page">
      {/* Header */}
      <div className="expense-header">
        <h1>💰 Expense Management</h1>
        <button className="btn-primary">+ Add Expense</button>
      </div>

      {/* Summary Cards */}
      <div className="summary-grid">
        <div className="card hoverable">
          <h2>Daily Expenses</h2>
          <p className="big">₹ {expenses.reduce((acc,e)=>acc+e.amount,0)}</p>
          <span>Recorded today</span>
        </div>
        <div className="card hoverable">
          <h2>Monthly Expenses</h2>
          <p className="big">₹ 45,000</p>
          <span>Across all branches</span>
        </div>
        <div className="card hoverable">
          <h2>Yearly Expenses</h2>
          <p className="big">₹ 5,20,000</p>
          <span>Current financial year</span>
        </div>
        <div className="card hoverable alert">
          <h2>Budget Alerts</h2>
          <p className="big">3</p>
          <span>Categories exceeded limits</span>
        </div>
      </div>

      {/* Expense Table */}
      <div className="card hoverable">
        <h2>Expense Records</h2>
        <table className="expense-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Category</th>
              <th>Branch</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Period</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map(e => (
              <tr key={e.id}>
                <td>{e.id}</td>
                <td>{e.category}</td>
                <td>{e.branch}</td>
                <td>₹ {e.amount}</td>
                <td>{e.date}</td>
                <td>{e.period}</td>
                <td><span className={`pill ${e.status === "Over Budget" ? "fail" : "ok"}`}>{e.status}</span></td>
                <td>
                  <button className="btn-secondary small">Edit</button>
                  <button className="btn-danger small">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
