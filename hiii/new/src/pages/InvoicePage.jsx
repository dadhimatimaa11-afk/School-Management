import "./../styles/invoice.css";
import { useState, useEffect } from "react";
import { getInvoices, addInvoice, updateInvoice, deleteInvoice } from "../services/invoices";

export default function InvoicePage() {
  const [invoices, setInvoices] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [newInvoice, setNewInvoice] = useState({
    invoiceNumber: "",
    customerName: "",
    amount: "",
    status: "Pending",
    issueDate: ""
  });

  // Fetch invoices
  const fetchInvoices = async () => {
    try {
      const data = await getInvoices();
      setInvoices(data.invoices);
    } catch (err) {
      console.error("❌ Error fetching invoices:", err.message);
    }
  };

  useEffect(() => { fetchInvoices(); }, []);

  // Add invoice
  const handleAddInvoice = async () => {
    try {
      if (!newInvoice.invoiceNumber || !newInvoice.customerName || !newInvoice.amount) {
        alert("Please fill all required fields");
        return;
      }

      await addInvoice({
        invoiceNumber: newInvoice.invoiceNumber,
        customerName: newInvoice.customerName,
        amount: Number(newInvoice.amount),
        status: newInvoice.status,
        issueDate: newInvoice.issueDate ? new Date(newInvoice.issueDate) : undefined
      });

      setNewInvoice({
        invoiceNumber: "",
        customerName: "",
        amount: "",
        status: "Pending",
        issueDate: ""
      });
      setShowModal(false);
      fetchInvoices();
    } catch (err) {
      console.error("❌ Error adding invoice:", err.message);
    }
  };

  // Update invoice
  const handleUpdate = async (id) => {
    const updatedStatus = prompt("Enter new status (Pending/Paid):");
    if (updatedStatus) {
      await updateInvoice(id, { status: updatedStatus });
      fetchInvoices();
    }
  };

  // Delete invoice
  const handleDelete = async (id) => {
    try {
      await deleteInvoice(id);
      fetchInvoices();
    } catch (err) {
      console.error("❌ Error deleting invoice:", err.message);
    }
  };

  return (
    <div className="invoice-page">
      <div className="invoice-header">
        <h1>🧾 Invoice Management</h1>
        <button className="btn-primary" onClick={() => setShowModal(true)}>+ Generate Invoice</button>
      </div>

      {/* ✅ Modal for new invoice */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Generate Invoice</h2>

            <div className="form-group">
              <label>Invoice Number</label>
              <input
                type="text"
                value={newInvoice.invoiceNumber}
                onChange={(e)=>setNewInvoice({...newInvoice, invoiceNumber:e.target.value})}
              />
            </div>

            <div className="form-group">
              <label>Customer Name</label>
              <input
                type="text"
                value={newInvoice.customerName}
                onChange={(e)=>setNewInvoice({...newInvoice, customerName:e.target.value})}
              />
            </div>

            <div className="form-group">
              <label>Amount</label>
              <input
                type="number"
                value={newInvoice.amount}
                onChange={(e)=>setNewInvoice({...newInvoice, amount:e.target.value})}
              />
            </div>

            <div className="form-group">
              <label>Issue Date</label>
              <input
                type="date"
                value={newInvoice.issueDate}
                onChange={(e)=>setNewInvoice({...newInvoice, issueDate:e.target.value})}
              />
            </div>

            <div className="form-group">
              <label>Status</label>
              <select
                value={newInvoice.status}
                onChange={(e)=>setNewInvoice({...newInvoice, status:e.target.value})}
              >
                <option value="Pending">Pending</option>
                <option value="Paid">Paid</option>
              </select>
            </div>

            <div className="modal-actions">
              <button className="btn-primary" onClick={handleAddInvoice}>Save</button>
              <button className="btn-danger" onClick={()=>setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Summary Cards */}
      <div className="summary-grid">
        <div className="card hoverable">
          <h2>Total Invoices</h2>
          <p className="big">{invoices.length}</p>
          <span>Generated so far</span>
        </div>
        <div className="card hoverable">
          <h2>Paid</h2>
          <p className="big">{invoices.filter(i => i.status === "Paid").length}</p>
          <span>Invoices cleared</span>
        </div>
        <div className="card hoverable alert">
          <h2>Pending</h2>
          <p className="big">{invoices.filter(i => i.status === "Pending").length}</p>
          <span>Awaiting payment</span>
        </div>
      </div>

      {/* Invoice Table */}
      <div className="card hoverable">
        <h2>Invoice Records</h2>
        <table className="invoice-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Invoice Number</th>
              <th>Customer Name</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Issue Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.length > 0 ? (
              invoices.map(inv => (
                <tr key={inv._id}>
                  <td>{inv._id}</td>
                  <td>{inv.invoiceNumber}</td>
                  <td>{inv.customerName}</td>
                  <td>₹ {inv.amount}</td>
                  <td><span className={`pill ${inv.status === "Paid" ? "ok" : "fail"}`}>{inv.status}</span></td>
                  <td>{inv.issueDate ? new Date(inv.issueDate).toLocaleDateString() : "-"}</td>
                  <td>
                    <button className="btn-secondary small" onClick={() => handleUpdate(inv._id)}>Edit</button>
                    <button className="btn-danger small" onClick={() => handleDelete(inv._id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No invoices found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
