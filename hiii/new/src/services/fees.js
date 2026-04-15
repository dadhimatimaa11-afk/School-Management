import api from "./api"; // 👈 api.js me axios instance bana hoga

// ✅ Assign fee to a student
export const assignFee = (data) => api.post("/fees/assign", data);

// ✅ Record payment (with discount, coupon, transactionId, note, dueDate)
export const recordPayment = (data) => api.post("/fees/payment", data);

// ✅ Get fee by student ID
export const getFeeByStudent = (studentId) =>
  api.get(`/fees/student/${studentId}`);

// ✅ Get all fees (Admin)
export const getAllFees = () => api.get("/fees");

// ✅ Get pending fee report (Admin)
export const getPendingFees = () => api.get("/fees/pending");

// ✅ Get payment history by student ID
export const getPaymentHistory = (studentId) =>
  api.get(`/payments/history/${studentId}`);
