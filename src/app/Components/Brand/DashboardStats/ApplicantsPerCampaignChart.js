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
import { Empty } from "antd";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function getApplicantsPerCampaignData(brandCampaigns) {
  if (!Array.isArray(brandCampaigns)) return { labels: [], data: [] };
  const labels = brandCampaigns.map((c) => c.title || "Untitled");
  const data = brandCampaigns.map((c) => (c.collaborators ? c.collaborators.length : 0));
  return { labels, data };
}

const ApplicantsPerCampaignChart = ({ brandCampaigns }) => {
  const { labels, data } = getApplicantsPerCampaignData(brandCampaigns);
  const chartData = {
    labels,
    datasets: [
      {
        label: "Applicants per Campaign",
        data,
        backgroundColor: "#22c55e",
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: "Applicants per Campaign" },
    },
    indexAxis: "y",
  };
  if (!labels.length) return (
    <div className="bg-white rounded-2xl p-8 shadow-lg mt-8 flex flex-col items-center justify-center min-h-[220px]">
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description={<span className="text-lg font-semibold text-gray-500">No campaign data yet</span>}
      >
        <div className="text-gray-400 text-sm mt-2">Start your first campaign to see stats here!</div>
      </Empty>
    </div>
  );
  return (
    <div className="bg-white rounded-2xl p-4 shadow-lg mt-8">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default ApplicantsPerCampaignChart; 