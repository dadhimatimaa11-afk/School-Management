import axios from "axios";

const API_URL = "http://localhost:5000/api/students";

// ➕ Add Student
export const addStudent = async (studentData, token) => {
  try {
    const res = await axios.post(API_URL, studentData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    throw err.response?.data || err.message;
  }
};

// 📄 Get all students
export const getStudents = async (token) => {
  try {
    const res = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    throw err.response?.data || err.message;
  }
};

// 📄 Get student by ID
export const getStudentById = async (id, token) => {
  try {
    const res = await axios.get(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    throw err.response?.data || err.message;
  }
};

// ✏️ Update student
export const updateStudent = async (id, studentData, token) => {
  try {
    const res = await axios.put(`${API_URL}/${id}`, studentData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    throw err.response?.data || err.message;
  }
};

// ❌ Delete student
export const deleteStudent = async (id, token) => {
  try {
    const res = await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    throw err.response?.data || err.message;
  }
};
