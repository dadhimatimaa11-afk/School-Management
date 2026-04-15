import "./../styles/course.css";
import { useState, useEffect } from "react";
import {
  getCourses,
  addCourse,
  updateCourse,
  deleteCourse
} from "../services/courses";

export default function CoursePage() {
  const [courses, setCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [newCourse, setNewCourse] = useState({
    name: "",
    description: "",
    duration: "",
    fee: "",
    status: "Active"
  });

  // Fetch courses
  const fetchCourses = async () => {
    try {
      const data = await getCourses();
      setCourses(data.courses);
    } catch (err) {
      console.error("❌ Error fetching courses:", err.message);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // Add new course
  const handleAddCourse = async () => {
    try {
      if (!newCourse.name || !newCourse.duration || !newCourse.fee) {
        alert("Please fill all required fields");
        return;
      }
      await addCourse(newCourse);
      setNewCourse({ name: "", description: "", duration: "", fee: "", status: "Active" });
      setShowModal(false);
      fetchCourses();
    } catch (err) {
      console.error("❌ Error adding course:", err.message);
    }
  };

  // Update course
  const handleUpdate = async (id) => {
    const updatedName = prompt("Enter new course name:");
    if (updatedName) {
      await updateCourse(id, { name: updatedName });
      fetchCourses();
    }
  };

  // Delete course
  const handleDelete = async (id) => {
    try {
      await deleteCourse(id);
      fetchCourses();
    } catch (err) {
      console.error("❌ Error deleting course:", err.message);
    }
  };

  return (
    <div className="course-page">
      <div className="course-header">
        <h1>📚 Course Management</h1>
        <button className="btn-primary" onClick={() => setShowModal(true)}>
          ➕ Add Course
        </button>
      </div>

      {/* ✅ Add Course Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Add Course</h2>

            <div className="form-group">
              <label>Course Name</label>
              <input
                type="text"
                placeholder="Course Name"
                value={newCourse.name}
                onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <input
                type="text"
                placeholder="Description"
                value={newCourse.description}
                onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Duration</label>
              <input
                type="text"
                placeholder="Duration"
                value={newCourse.duration}
                onChange={(e) => setNewCourse({ ...newCourse, duration: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Fee</label>
              <input
                type="number"
                placeholder="Fee"
                value={newCourse.fee}
                onChange={(e) => setNewCourse({ ...newCourse, fee: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Status</label>
              <select
                value={newCourse.status}
                onChange={(e) => setNewCourse({ ...newCourse, status: e.target.value })}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div className="modal-actions">
              <button className="btn-primary" onClick={handleAddCourse}>Save</button>
              <button className="btn-danger" onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Summary Cards */}
      <div className="summary-grid">
        <div className="card hoverable">
          <h2>Total Courses</h2>
          <p className="big">{courses.length}</p>
          <span>Active offerings</span>
        </div>
        <div className="card hoverable">
          <h2>Active</h2>
          <p className="big">{courses.filter(c => c.status === "Active").length}</p>
          <span>Currently running</span>
        </div>
        <div className="card hoverable">
          <h2>Inactive</h2>
          <p className="big">{courses.filter(c => c.status === "Inactive").length}</p>
          <span>Not offered</span>
        </div>
      </div>

      {/* Course Table */}
      <div className="card hoverable">
        <h2>Course List</h2>
        <table className="course-table">
          <thead>
            <tr>
              <th>Course ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Fee</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.length > 0 ? (
              courses.map(c => (
                <tr key={c._id}>
                  <td>{c._id}</td>
                  <td>{c.name}</td>
                  <td>{c.description || "-"}</td>
                  <td>{c.duration}</td>
                  <td>₹{c.fee}</td>
                  <td><span className={`pill ${c.status?.toLowerCase()}`}>{c.status}</span></td>
                  <td>
                    <button className="btn-secondary small" onClick={() => handleUpdate(c._id)}>Edit</button>
                    <button className="btn-danger small" onClick={() => handleDelete(c._id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No courses found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
