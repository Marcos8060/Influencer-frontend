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

function getProductsPerCampaignData(appliedCampaigns, approvedCampaigns) {
  const all = [...(appliedCampaigns || []), ...(approvedCampaigns || [])];
  const labels = all.map((c) => c.title || "Untitled");
  const data = all.map((c) => (c.products ? c.products.length : 0));
  return { labels, data };
}

const ProductsPerCampaignChart = ({ appliedCampaigns, approvedCampaigns }) => {
  const { labels, data } = getProductsPerCampaignData(appliedCampaigns, approvedCampaigns);
  const chartData = {
    labels,
    datasets: [
      {
        label: "Products per Campaign",
        data,
        backgroundColor: "#6366f1",
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: "Products per Campaign" },
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

export default ProductsPerCampaignChart; 