import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Empty } from 'antd';

ChartJS.register(ArcElement, Tooltip, Legend);

function getStatusData(appliedCampaigns, approvedCampaigns) {
  const statusCounts = {};
  // Applied campaigns
  (appliedCampaigns || []).forEach((c) => {
    (c.collaborators || []).forEach((collab) => {
      const status = collab.status || "unknown";
      statusCounts[status] = (statusCounts[status] || 0) + 1;
    });
  });
  // Approved campaigns
  (approvedCampaigns || []).forEach((c) => {
    (c.collaborators || []).forEach((collab) => {
      const status = collab.status || "unknown";
      statusCounts[status] = (statusCounts[status] || 0) + 1;
    });
  });
  const labels = Object.keys(statusCounts);
  const data = labels.map((l) => statusCounts[l]);
  return { labels, data };
}

const StatusDistributionChart = ({ appliedCampaigns, approvedCampaigns }) => {
  const { labels, data } = getStatusData(appliedCampaigns, approvedCampaigns);
  const chartData = {
    labels,
    datasets: [
      {
        label: "Applications by Status",
        data,
        backgroundColor: [
          "#6366f1",
          "#22c55e",
          "#f59e42",
          "#ef4444",
          "#a3a3a3",
        ],
        borderWidth: 1,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" },
      title: { display: true, text: "Applications by Status" },
    },
  };
  if (!labels.length) return (
    <div className="bg-white rounded-2xl p-8 shadow-lg mt-8 w-full h-[40vh] flex flex-col items-center justify-center">
      <Empty description="No application data yet" />
      <div className="mt-2 text-gray-400 text-sm">Apply to campaigns to see your application stats here!</div>
    </div>
  );
  return (
    <div className="bg-white rounded-2xl p-4 shadow-lg mt-8 w-full flex items-center justify-center">
      <Doughnut data={chartData} options={options} />
    </div>
  );
};

export default StatusDistributionChart; 