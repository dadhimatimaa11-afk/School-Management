import { useState, useEffect } from "react";
import "../styles/students.css";
import { getStudents, addStudent } from "../services/students";

export default function Students() {
  const [showModal, setShowModal] = useState(false);
  const [students, setStudents] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    roll: "",
    email: "",
    phone: "",
    branch: "",
    course: "",
    batch: ""
  });

  // ✅ Token from localStorage (assuming login flow sets it)
  const token = localStorage.getItem("token");

  // Fetch students from backend
  const fetchStudents = async () => {
    try {
      const data = await getStudents(token);
      setStudents(data.students); // backend response should have {students: [...]}
    } catch (err) {
      console.error("❌ Error fetching students:", err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await addStudent(formData, token);   // ✅ save to backend
      setFormData({ name: "", email: "", phone: "", branch: "", course: "", batch: "" });
      setShowModal(false);
      fetchStudents();                     // ✅ refresh list from DB
    } catch (err) {
      console.error("❌ Error adding student:", err);
      alert("Failed to add student. Check token or required fields.");
    }
  };

  return (
    <div className="student-page">
      <h2>Student Management</h2>

      <button className="add-btn" onClick={() => setShowModal(true)}>Add Student</button>

      {/* Student Table */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>roll</th>
            <th>Branch</th>
            <th>Course</th>
            <th>Batch</th>
            <th>Phone</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map((s, i) => (
              <tr key={i}>
                <td>{s.name}</td>
                <td>{s.roll}</td>
                <td>{s.branch}</td>
                <td>{s.course}</td>
                <td>{s.batch}</td>
                <td>{s.phone}</td>
                <td>{s.email}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No students found</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal Box */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Add Student</h3>
            <form onSubmit={handleSubmit}>
              <label>Name:</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required />

              <label>Roll:</label>
              <input type="number" name="roll" value={formData.roll} onChange={handleChange} required />


              <label>Email:</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />

              <label>Phone:</label>
              <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />

              <label>Branch:</label>
              <input type="text" name="branch" value={formData.branch} onChange={handleChange} required />

              <label>Course:</label>
              <input type="text" name="course" value={formData.course} onChange={handleChange} required />

              <label>Batch:</label>
              <input type="text" name="batch" value={formData.batch} onChange={handleChange} required />

              <div className="modal-actions">
                <button type="submit">Save</button>
                <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
