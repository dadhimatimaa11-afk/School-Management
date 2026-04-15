import { Bar, Line } from "react-chartjs-2";
import "../styles/dashboard.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);


export default function Charts({ feesData, leadsData }) {
  return (
    <div className="charts">
      <div className="chart">
        <h4>Fees Collected</h4>
        <Bar data={feesData} />
      </div>
      <div className="chart">
        <h4>Leads</h4>
        <Line data={leadsData} />
      </div>
    </div>
  );
}
