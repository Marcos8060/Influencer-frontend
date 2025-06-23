import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function getDeadlinesData(appliedCampaigns, approvedCampaigns) {
  const all = [...(appliedCampaigns || []), ...(approvedCampaigns || [])];
  const now = new Date();
  const weekLabels = [];
  const weekCounts = Array(6).fill(0);
  for (let i = 0; i < 6; i++) {
    const start = new Date(now);
    start.setDate(now.getDate() + i * 7);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    weekLabels.push(
      `${start.getMonth() + 1}/${start.getDate()} - ${end.getMonth() + 1}/${end.getDate()}`
    );
  }
  all.forEach((c) => {
    const endDate = new Date(c.endDate);
    for (let i = 0; i < 6; i++) {
      const weekStart = new Date(now);
      weekStart.setDate(now.getDate() + i * 7);
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      if (endDate >= weekStart && endDate <= weekEnd) {
        weekCounts[i]++;
        break;
      }
    }
  });
  return { labels: weekLabels, data: weekCounts };
}

const DeadlinesChart = ({ appliedCampaigns, approvedCampaigns }) => {
  const { labels, data } = getDeadlinesData(appliedCampaigns, approvedCampaigns);
  const chartData = {
    labels,
    datasets: [
      {
        label: "Campaigns Ending",
        data,
        backgroundColor: "#f59e42",
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: "Upcoming Campaign Deadlines (Next 6 Weeks)" },
    },
    indexAxis: "y",
  };
  if (!labels.length) return <div className="p-4">No campaign data available.</div>;
  return (
    <div className="bg-white rounded-2xl p-4 shadow-lg mt-8 w-full">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default DeadlinesChart; 