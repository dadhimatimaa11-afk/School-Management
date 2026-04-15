import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const attendanceData = [
  { month: "Aug", percent: 78 },
  { month: "Sep", percent: 82 },
  { month: "Oct", percent: 85 },
  { month: "Nov", percent: 80 },
  { month: "Dec", percent: 83 },
  { month: "Jan", percent: 86 },
];

const feesData = [
  { month: "Aug", amount: 180000 },
  { month: "Sep", amount: 200000 },
  { month: "Oct", amount: 220000 },
  { month: "Nov", amount: 210000 },
  { month: "Dec", amount: 240000 },
  { month: "Jan", amount: 250000 },
];

export default function ReportCharts() {
  return (
    <div className="charts-grid">
      <div className="card hoverable">
        <h2>Attendance Trend</h2>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={attendanceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="percent" stroke="#4f46e5" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="card hoverable">
        <h2>Fees Collected</h2>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={feesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" fill="#0d9488" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
