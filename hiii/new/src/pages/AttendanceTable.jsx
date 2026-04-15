import AttendanceFormRow from "./AttendanceFormRow";

export default function AttendanceTable({ date, students, onChange }) {
  const updateRow = (id, patch) => {
    const next = students.map(s => s._id === id ? { ...s, ...patch } : s);
    onChange(next);
  };

  return (
    <table className="att-table">
      <thead>
        <tr>
          <th>Roll</th>
          <th>Name</th>
          <th>Status</th>
          <th>Note</th>
          <th>Save</th>
        </tr>
      </thead>
      <tbody>
        {students.length === 0 ? (
          <tr><td colSpan="5" className="empty">No students found.</td></tr>
        ) : students.map(s => (
          <AttendanceFormRow
            key={s._id}
            student={s}
            onUpdate={(patch) => updateRow(s._id, patch)}
            date={date}
          />
        ))}
      </tbody>
    </table>
  );
}
