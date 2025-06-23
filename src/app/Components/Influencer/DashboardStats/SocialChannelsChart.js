import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function getSocialChannelsData(appliedCampaigns, approvedCampaigns) {
  const all = [...(appliedCampaigns || []), ...(approvedCampaigns || [])];
  const channelCounts = {};
  all.forEach((c) => {
    const channels = c.preferences?.socialChannels || [];
    channels.forEach((ch) => {
      channelCounts[ch] = (channelCounts[ch] || 0) + 1;
    });
  });
  const labels = Object.keys(channelCounts);
  const data = labels.map((l) => channelCounts[l]);
  return { labels, data };
}

const SocialChannelsChart = ({ appliedCampaigns, approvedCampaigns }) => {
  const { labels, data } = getSocialChannelsData(appliedCampaigns, approvedCampaigns);
  const chartData = {
    labels,
    datasets: [
      {
        label: "Social Channels",
        data,
        backgroundColor: [
          "#6366f1",
          "#22c55e",
          "#f59e42",
          "#ef4444",
          "#a3a3a3",
          "#f472b6",
          "#0ea5e9",
        ],
        borderWidth: 1,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" },
      title: { display: true, text: "Social Channels Required by Campaigns" },
    },
  };
  if (!labels.length) return <div className="p-4">No social channel data available.</div>;
  return (
    <div className="bg-white rounded-2xl p-4 shadow-lg mt-8 w-full h-[50vh] flex items-center justify-center">
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default SocialChannelsChart; 