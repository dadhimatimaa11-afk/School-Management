import { useEffect, useState } from "react";
import { getLeadsChartData } from "../services/leads";
import { Line } from "react-chartjs-2";

export default function LeadsChart() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    getLeadsChartData().then((data) => {
      setChartData({
        labels: data.items.map(item => item.source), // e.g. Website, Referral
        datasets: [
          {
            label: "Lead Conversion Rate",
            data: data.items.map(item => item.conversionRate),
            borderColor: "rgba(255,99,132,1)",
            fill: false,
          },
        ],
      });
    });
  }, []);

  if (!chartData) return <p>Loading...</p>;

  return <Line data={chartData} />;
}
