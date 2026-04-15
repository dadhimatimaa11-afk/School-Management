import { useEffect, useState } from "react";
import AttendanceTable from "./AttendanceTable";
import BiometricStatus from "./BiometricStatus";
import ExportButton from "./ExportButton";
import AlertsBanner from "./AlertsBanner";
import { getStudents } from "../services/students";  // ✅ direct students API
import axios from "axios";
import "../Styles/attendance.css";

export default function AttendancePage() {
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [course, setCourse] = useState("Full Stack Developer");
  const [search, setSearch] = useState("");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  // Modal state
  const [showModal, setShowModal] = useState(false);

  // Add Student form states
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newBranch, setNewBranch] = useState("Main Branch");
  const [newCourse, setNewCourse] = useState("Full Stack Developer");
  const [newBatch, setNewBatch] = useState("Batch A");
  const [newRoll, setNewRoll] = useState("");

  // ✅ Reload pe sab students fetch karo
  useEffect(() => {
    const fetchAllStudents = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const res = await getStudents(token);
        setStudents(res.students || []);
      } catch (err) {
        console.error("❌ Error fetching students:", err);
        setStudents([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAllStudents();
  }, []);

  // ✅ Safe filter
  const filtered = students.filter(
    (s) =>
      s?.name?.toLowerCase().includes(search.toLowerCase()) ||
      String(s?.roll).includes(search)
  );

  const markAll = (status) => {
    setStudents((prev) =>
      prev.map((s) => ({ ...s, statusForDate: status }))
    );
  };

  // ✅ Add new student
  const addStudent = async () => {
    if (!newName || !newRoll || !newPhone) return;
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5000/api/students",
        {
          name: newName,
          email: newEmail,
          phone: newPhone,
          roll: Number(newRoll),
          branch: newBranch,
          course: newCourse,
          batch: newBatch
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // ✅ backend returns student object
      setStudents([...students, res.data]);
      // Reset form + close modal
      setNewName("");
      setNewEmail("");
      setNewPhone("");
      setNewRoll("");
      setNewBranch("Main Branch");
      setNewCourse("Full Stack Developer");
      setNewBatch("Batch A");
      setShowModal(false);
    } catch (err) {
      console.error("❌ Add student error:", err.response?.data || err.message);
    }
  };

  return (
    <div className="att-page">
      {/* Header */}
      <div className="att-header">
        <span className="icon">📋</span>
        <h1>Attendance Management</h1>
      </div>

      {/* Filters */}
      <div className="att-card att-controls">
        <div className="row">
          <div className="field">
            <label>Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="field">
            <label>Course</label>
            <select value={course} onChange={(e) => setCourse(e.target.value)}>
              <option>Full Stack Developer</option>
              <option>Mobile App</option>
              <option>Digital Marketing</option>
              <option>Data Science</option>
            </select>
          </div>
          <div className="field grow">
            <label>Search</label>
            <input
              placeholder="Name or Roll"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="actions">
          <button className="btn-secondary" onClick={() => markAll("Present")}>
            Mark all Present
          </button>
          <button className="btn-secondary" onClick={() => markAll("Absent")}>
            Mark all Absent
          </button>
          <button className="btn-primary" onClick={() => setShowModal(true)}>
            ➕ Add Student
          </button>
        </div>
      </div>

      {/* ✅ Add Student Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Add Student</h2>

            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                placeholder="Student Name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Phone</label>
              <input
                type="text"
                placeholder="Phone Number"
                value={newPhone}
                onChange={(e) => setNewPhone(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Roll Number</label>
              <input
                type="text"
                placeholder="Roll Number"
                value={newRoll}
                onChange={(e) => setNewRoll(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Branch</label>
              <select value={newBranch} onChange={(e) => setNewBranch(e.target.value)}>
                <option>Main Branch</option>
                <option>Branch B</option>
                <option>Branch C</option>
              </select>
            </div>

            <div className="form-group">
              <label>Course</label>
              <select value={newCourse} onChange={(e) => setNewCourse(e.target.value)}>
                <option>Full Stack Developer</option>
                <option>Mobile App</option>
                <option>Digital Marketing</option>
                <option>Data Science</option>
              </select>
            </div>

            <div className="form-group">
              <label>Batch</label>
              <select value={newBatch} onChange={(e) => setNewBatch(e.target.value)}>
                <option>Batch A</option>
                <option>Batch B</option>
                <option>Batch C</option>
              </select>
            </div>

            <div className="modal-actions">
              <button className="btn-primary" onClick={addStudent}>Save</button>
              <button className="btn-danger" onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Alerts */}
      <AlertsBanner students={students} />

      {/* Table */}
      <div className="att-card">
        <h2>Daily Attendance</h2>
        {loading ? (
          <p className="muted">Loading...</p>
        ) : (
          <AttendanceTable
            date={date}
            students={filtered}
            onChange={(updated) => setStudents(updated)}
          />
        )}
      </div>

      {/* Biometric + Export */}
      <div className="grid-2">
        <div className="att-card">
          <h2>Biometric Status</h2>
          <BiometricStatus lastSync="Today, 09:42 AM" connected={true} />
        </div>
        <div className="att-card">
          <h2>Export</h2>
          <ExportButton
            rows={students}
            filename={`attendance_${course}_${date}.xlsx`}
          />
        </div>
      </div>
    </div>
  );
}
