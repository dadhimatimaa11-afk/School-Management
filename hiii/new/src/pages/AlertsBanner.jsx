export default function AlertsBanner({ students }) {
  const low = students.filter(s => (s.percent ?? 0) < 75);
  if (low.length === 0) return null;

  return (
    <div className="att-card alert-wrap">
      <div className="alert error">
        <strong>Attendance Alerts:</strong> {low.length} students below 75%.
      </div>
      <div className="chips">
        {low.map(s => (
          <span key={s._id} className="chip">
            {s.name} — {s.percent}%
          </span>
        ))}
      </div>
    </div>
  );
}
