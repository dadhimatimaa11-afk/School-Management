import { useEffect, useState } from "react";
import "./../styles/report.css";
import ReportCharts from "./ReportCharts";
import { getDashboardReport } from "../services/report";

export default function ReportPage() {
  const [report, setReport] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await getDashboardReport(); // API call
        setReport(res.data);
      } catch (err) {
        console.error("❌ Error fetching reports:", err.response?.data || err.message);
      }
    };
    fetchReports();
  }, []);

  if (!report) return <p>Loading reports...</p>;

  return (
    <div className="report-page">
      {/* Header */}
      <div className="report-header">
        <h1>📊 Reports & Analytics</h1>
        <div className="filters">
          <input type="date" />
          <button className="btn-secondary">Export PDF</button>
          <button className="btn-primary">Export Excel</button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="summary-grid">
        <div className="card hoverable">
          <h2>👩‍🎓 Students</h2>
          <p className="big">{report.students.total}</p>
          <span>Active this semester</span>
        </div>
        <div className="card hoverable">
          <h2>📅 Attendance</h2>
          <p className="big">
            {(
              (report.attendance.present / report.attendance.total) *
              100
            ).toFixed(2)}%
          </p>
          <span>Average attendance</span>
        </div>
        <div className="card hoverable">
          <h2>💰 Fees</h2>
          <p className="big">₹{report.fees.collected}</p>
          <span>Collected so far</span>
        </div>
        <div className="card hoverable alert">
          <h2>⚠ Alerts</h2>
          <p className="big">
            {
              report.attendance.absent > 0
                ? report.attendance.absent
                : 0
            }
          </p>
          <span>Students below 75%</span>
        </div>
      </div>

      {/* Detailed Table */}
      <div className="card hoverable">
        <h2>Detailed Report</h2>
        <table className="report-table">
          <thead>
            <tr>
              <th>Roll</th>
              <th>Name</th>
              <th>Attendance %</th>
              <th>Fees Paid</th>
              <th>Alerts</th>
            </tr>
          </thead>
          <tbody>
            {/* Example: map students if backend sends list */}
            {report.studentsList?.map((s) => (
              <tr key={s._id}>
                <td>{s.roll}</td>
                <td>{s.name}</td>
                <td>{s.attendancePercent}%</td>
                <td>₹{s.paidFee}</td>
                <td>{s.attendancePercent < 75 ? "⚠ Low Attendance" : "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Charts Section */}
      <ReportCharts data={report} />
    </div>
  );
}
