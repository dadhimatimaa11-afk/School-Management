import api from "./api";

// 📊 Dashboard summary report
export const getDashboardReport = () => api.get("/reports/dashboard");

// 📄 Batch report
export const getBatchReport = (batch, startDate, endDate) =>
  api.get(`/reports/batch?batch=${batch}&startDate=${startDate}&endDate=${endDate}`);

// 📄 Student report
export const getStudentReport = (studentId, startDate, endDate) =>
  api.get(`/reports/student?studentId=${studentId}&startDate=${startDate}&endDate=${endDate}`);
