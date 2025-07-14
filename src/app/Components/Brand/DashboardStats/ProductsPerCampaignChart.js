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

function getProductsPerCampaignData(brandCampaigns) {
  if (!Array.isArray(brandCampaigns)) return { labels: [], data: [] };
  const labels = brandCampaigns.map((c) => c.title || "Untitled");
  const data = brandCampaigns.map((c) => (c.products ? c.products.length : 0));
  return { labels, data };
}

const ProductsPerCampaignChart = ({ brandCampaigns }) => {
  const { labels, data } = getProductsPerCampaignData(brandCampaigns);
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
  if (!labels.length) return (
    <div className="bg-white rounded-2xl p-8 shadow-lg mt-8 flex flex-col items-center justify-center min-h-[220px]">
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description={<span className="text-lg font-semibold text-gray-500">No campaign data yet</span>}
      >
        <div className="text-gray-400 text-sm mt-2">Add products to your campaigns to see stats here!</div>
      </Empty>
    </div>
  );
  return (
    <div className="bg-white rounded-2xl p-4 shadow-lg mt-8">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default ProductsPerCampaignChart; 