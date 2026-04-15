import { useState } from "react";

export default function AttendanceFormRow({ student, onUpdate, date }) {
  const [status, setStatus] = useState(student.statusForDate || "Present");
  const [note, setNote] = useState(student.note || "");
  const [saving, setSaving] = useState(false);

  const save = async () => {
    setSaving(true);
    // POST /api/attendance/mark { studentId, date, status, note }
    setTimeout(() => {
      onUpdate({ statusForDate: status, note });
      setSaving(false);
    }, 300);
  };

  return (
    <tr>
      <td>{student.roll}</td>
      <td>{student.name}</td>
      <td>
        <div className="status-group">
          <label><input type="radio" name={`st-${student._id}`} checked={status==="Present"} onChange={() => setStatus("Present")} /> Present</label>
          <label><input type="radio" name={`st-${student._id}`} checked={status==="Absent"} onChange={() => setStatus("Absent")} /> Absent</label>
          <label><input type="radio" name={`st-${student._id}`} checked={status==="Leave"} onChange={() => setStatus("Leave")} /> Leave</label>
        </div>
      </td>
      <td>
        <input
          className="note-input"
          placeholder="Optional note"
          value={note}
          onChange={e => setNote(e.target.value)}
        />
      </td>
      <td>
        <button className="btn-primary" onClick={save} disabled={saving}>
          {saving ? "Saving..." : "Save"}
        </button>
      </td>
    </tr>
  );
}
