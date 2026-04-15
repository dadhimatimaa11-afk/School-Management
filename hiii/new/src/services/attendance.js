import api from "./api"; // 👈 Axios instance with baseURL + token interceptor

// ✅ Mark attendance for a student
export const markAttendance = (data) => api.post("/attendance", data);

// ✅ Get attendance history for a student
export const getAttendanceByStudent = (studentId) =>
  api.get(`/attendance/student/${studentId}`);

// ✅ Get all attendance (admin only)
export const getAllAttendance = () => api.get("/attendance");



export const getAttendanceByDateAndCourse = async (date, course) => {
  const token = localStorage.getItem("token");
  return await axios.get(
    `http://localhost:5000/api/attendance/${course}?date=${date}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
};
