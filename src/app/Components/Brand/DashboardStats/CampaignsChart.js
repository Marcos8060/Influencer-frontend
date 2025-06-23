import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function getCampaignsOverTimeData(brandCampaigns) {
  if (!Array.isArray(brandCampaigns)) return { labels: [], data: [] };
  // Group campaigns by month-year
  const counts = {};
  brandCampaigns.forEach((c) => {
    const date = new Date(c.createdAt);
    const label = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    counts[label] = (counts[label] || 0) + 1;
  });
  const labels = Object.keys(counts).sort();
  const data = labels.map((l) => counts[l]);
  return { labels, data };
}

const CampaignsChart = ({ brandCampaigns }) => {
  const { labels, data } = getCampaignsOverTimeData(brandCampaigns);
  const chartData = {
    labels,
    datasets: [
      {
        label: "Campaigns Created",
        data,
        fill: false,
        borderColor: "#6366f1",
        backgroundColor: "#6366f1",
        tension: 0.3,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: "Campaigns Created Over Time" },
    },
  };
  return (
    <div className="bg-white rounded-2xl p-4 shadow-lg mt-8">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default CampaignsChart; 