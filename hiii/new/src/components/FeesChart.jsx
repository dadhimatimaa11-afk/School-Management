import { useEffect, useState } from "react";
import { getFeesChartData } from "../services/fees";
import { Bar } from "react-chartjs-2";

export default function FeesChart() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    getFeesChartData().then((data) => {
      setChartData({
        labels: data.payments.map(p => new Date(p.paidAt).toLocaleDateString()),
        datasets: [
          {
            label: "Fees Collected",
            data: data.payments.map(p => p.amountPaid),
            backgroundColor: "rgba(75,192,192,0.6)",
          },
        ],
      });
    });
  }, []);

  if (!chartData) return <p>Loading...</p>;

  return <Bar data={chartData} />;
}
