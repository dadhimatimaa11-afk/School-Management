import { useState } from "react";
import api from "../services/api";

export default function ReceiptInvoice({ paymentId }) {
  const [receipt, setReceipt] = useState(null);
  const [invoice, setInvoice] = useState(null);

  const fetchReceipt = async () => {
    try {
      const res = await api.get(`/payments/receipt/${paymentId}`);
      setReceipt(res.data.receipt);
    } catch (err) {
      console.error("Error fetching receipt:", err.response?.data);
    }
  };

  const fetchInvoice = async () => {
    try {
      const res = await api.get(`/payments/invoice/${paymentId}`);
      setInvoice(res.data.invoice);
    } catch (err) {
      console.error("Error fetching invoice:", err.response?.data);
    }
  };

  return (
    <div className="receipt-invoice">
      <h3>Receipt & Invoice</h3>
      <button onClick={fetchReceipt}>View Receipt</button>
      <button onClick={fetchInvoice}>View Invoice</button>

      {receipt && (
        <div className="receipt-block">
          <h4>Receipt</h4>
          <pre>{JSON.stringify(receipt, null, 2)}</pre>
        </div>
      )}

      {invoice && (
        <div className="invoice-block">
          <h4>Invoice</h4>
          <pre>{JSON.stringify(invoice, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
