import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function getApplicantsStatusData(brandCampaigns) {
  if (!Array.isArray(brandCampaigns)) return { labels: [], data: [] };
  const statusCounts = {};
  brandCampaigns.forEach((c) => {
    (c.collaborators || []).forEach((collab) => {
      const status = collab.status || "unknown";
      statusCounts[status] = (statusCounts[status] || 0) + 1;
    });
  });
  const labels = Object.keys(statusCounts);
  const data = labels.map((l) => statusCounts[l]);
  return { labels, data };
}

const ApplicantsStatusChart = ({ brandCampaigns }) => {
  const { labels, data } = getApplicantsStatusData(brandCampaigns);
  const chartData = {
    labels,
    datasets: [
      {
        label: "Applicants by Status",
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
      title: { display: true, text: "Applicants by Status" },
    },
  };
  if (!labels.length) return <div className="p-4">No applicant data available.</div>;
  return (
    <div className="bg-white rounded-2xl h-[50vh] p-4 shadow-lg mt-8 w-full flex items-center justify-center">
      <Doughnut data={chartData} options={options} />
    </div>
  );
};

export default ApplicantsStatusChart; 