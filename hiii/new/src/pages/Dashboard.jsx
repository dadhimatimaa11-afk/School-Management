import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatsCard from "../components/StatsCard";
import Charts from "../components/Charts";
import "../styles/dashboard.css";
import axios from "axios";

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/reports/dashboard", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
        setDashboardData(res.data);
      } catch (err) {
        console.error("Error fetching dashboard:", err);
      }
    };
    fetchDashboard();
  }, []);

  if (!dashboardData) return <p>Loading...</p>;

  // Example chart data using backend values
  const feesData = {
    labels: ["Collected", "Pending"],
    datasets: [
      {
        label: "Fees",
        data: [dashboardData.fees.collected, dashboardData.fees.pending],
        backgroundColor: ["#4CAF50", "#FF4D94"]
      }
    ]
  };

  const leadsData = {
    labels: ["Total Leads"],
    datasets: [
      {
        label: "Leads",
        data: [dashboardData.leads.total],
        borderColor: "#4d79ff",
        fill: false
      }
    ]
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main">
        <Navbar />
        <div className="stats-grid">
          <StatsCard title="Pending Fees" value={`₹${dashboardData.fees.pending}`} icon="💰" />
          <StatsCard title="Active Leads" value={dashboardData.leads.total} icon="📈" />
          <StatsCard title="Total Students" value={dashboardData.students.total} icon="🎓" />
          <StatsCard title="Attendance Records" value={dashboardData.attendance.total} icon="📅" />
        </div>
        <Charts feesData={feesData} leadsData={leadsData} />
      </div>
    </div>
  );
}
