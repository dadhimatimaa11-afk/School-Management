import { useState } from "react";
import axios from "axios";
import "../styles/fees.css";

export default function Fee() {
  const [searchName, setSearchName] = useState("");
  const [student, setStudent] = useState(null);
  const [amount, setAmount] = useState("");
  const [mode, setMode] = useState("Cash");
  const [reference, setReference] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [payments, setPayments] = useState([]);
  const [message, setMessage] = useState("");

  // ✅ Search student by name
  const fetchStudent = async () => {
    if (!searchName) return;
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `http://localhost:5000/api/students/search/${searchName}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.students && res.data.students.length > 0) {
        const s = res.data.students[0];
        setStudent(s);

        // ✅ Agar feeId null hai to assignFee call karo
        if (!s.feeId) {
          const assignRes = await axios.post(
            "http://localhost:5000/api/fees/assign",
            { studentId: s._id, totalFee: 10000 }, // apna totalFee set kar
            { headers: { Authorization: `Bearer ${token}` } }
          );
          s.feeId = assignRes.data.fee._id; // assign ke baad feeId attach karo
          setStudent(s);
        }

        fetchHistory(s._id);
      } else {
        setStudent(null);
        setPayments([]);
        setMessage("No student found");
      }
    } catch (err) {
      console.error("❌ Student search error:", err.response?.data || err.message);
      setMessage("Failed to search student");
    }
  };

  // ✅ Fetch payment history by studentId
  const fetchHistory = async (studentId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `http://localhost:5000/api/payments/history/${studentId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPayments(res.data.payments || []);
    } catch (err) {
      console.error("❌ History error:", err.response?.data || err.message);
      setMessage("Failed to load history");
    }
  };

  // ✅ Submit payment
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!student || !student.feeId) {
      setMessage("No fee record found for this student");
      return;
    }

    const token = localStorage.getItem("token");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/fees/payment",
        {
          feeId: student.feeId,
          amount: Number(amount),
          mode,
          transactionId: "TXN" + Date.now(),
          reference,
          date,
          note: description,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.status === 201) {
        setMessage(res.data.message || "Payment recorded successfully!");
        setPayments([...payments, res.data.payment]);
        setAmount("");
        setReference("");
        setDate("");
        setDescription("");
      } else {
        setMessage("Payment failed");
      }
    } catch (err) {
      console.error("❌ Payment error:", err.response?.data || err.message);
      setMessage(err.response?.data?.message || "Payment failed");
    }
  };

  return (
    <div className="fee-page">
      <div className="fee-header">
        <span className="icon">💼</span>
        <h1>Fee Management</h1>
      </div>

      {/* Search by student name */}
      <div className="fee-card">
        <label>Search Student</label>
        <input
          type="text"
          placeholder="Enter Student Name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <button onClick={fetchStudent} className="btn-primary">Search</button>
      </div>

      {/* Add Payment Section */}
      {student ? (
        <div className="fee-card">
          <h2>Add Payment for {student.name}</h2>
          {message && <div className="alert">{message}</div>}
          <form onSubmit={handleSubmit} className="form-grid">
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
            <select value={mode} onChange={(e) => setMode(e.target.value)}>
              <option>Cash</option>
              <option>Bank</option>
              <option>UPI</option>
            </select>
            <input
              type="text"
              placeholder="Reference"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
            />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button type="submit" className="btn-primary">
              Submit Payment
            </button>
          </form>
        </div>
      ) : (
        <p className="empty">Search a student to manage fees.</p>
      )}

      {/* Payment History Section */}
      {student && (
        <div className="fee-card">
          <h2>Payment History</h2>
          <table className="payment-history">
            <thead>
              <tr>
                <th>Date</th>
                <th>Mode</th>
                <th>Amount</th>
                <th>Discount</th>
                <th>Net</th>
                <th>Due Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.length === 0 ? (
                <tr>
                  <td colSpan="6" className="empty">
                    No payments found.
                  </td>
                </tr>
              ) : (
                payments.map((p,i) => (
                  <tr key={i}>
                    <td>{new Date(p.createdAt).toLocaleDateString()}</td>
                    <td>{p.mode}</td>
                    <td>{p.amount}</td>
                    <td>{p.discountApplied ?? "-"}</td>
                    <td>{p.netAmount ?? p.amount}</td>
                    <td>{p.dueDate ? new Date(p.dueDate).toLocaleDateString() : "-"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
