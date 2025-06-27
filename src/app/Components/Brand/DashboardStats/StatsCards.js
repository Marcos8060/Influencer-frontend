import React from "react";
import { MdOutlineAccessTime } from "react-icons/md";
import { AiOutlineShopping } from "react-icons/ai";
import { FaUsers, FaTrophy } from "react-icons/fa6";
import { BsArrowUpShort, BsArrowDownShort } from "react-icons/bs";

// Accept all stats and optionally change data as props
const StatsCards = ({
  totalCampaigns = 0,
  activeCampaigns = 0,
  totalProducts = 0,
  totalCollaborators = 0,
  statsChange = {},
}) => {
  // statsChange: { campaigns: {change, direction}, ... }
  const cards = [
    {
      title: "Total Campaigns",
      value: totalCampaigns,
      subtitle: "vs last month",
      change: statsChange.campaigns?.change ?? 0,
      changeDirection: statsChange.campaigns?.direction ?? "up",
      icon: <FaTrophy size={28} className="text-secondary" />,
      bgIcon: <FaTrophy size={100} className="absolute right-2 bottom-2 text-secondary/10" />,
      bg: "bg-secondary/10",
    },
    {
      title: "Active Campaigns",
      value: activeCampaigns,
      subtitle: "vs last month",
      change: statsChange.activeCampaigns?.change ?? 0,
      changeDirection: statsChange.activeCampaigns?.direction ?? "up",
      icon: <MdOutlineAccessTime size={28} className="text-gray" />,
      bgIcon: <MdOutlineAccessTime size={100} className="absolute right-2 bottom-2 text-gray/10" />,
      bg: "bg-background",
    },
    {
      title: "Total Products",
      value: totalProducts,
      subtitle: "vs last month",
      change: statsChange.products?.change ?? 0,
      changeDirection: statsChange.products?.direction ?? "down",
      icon: <AiOutlineShopping size={28} className="text-primary" />,
      bgIcon: <AiOutlineShopping size={100} className="absolute right-2 bottom-2 text-primary/10" />,
      bg: "bg-primary/10",
    },
    {
      title: "Total Collaborators",
      value: totalCollaborators,
      subtitle: "vs last month",
      change: statsChange.collaborators?.change ?? 0,
      changeDirection: statsChange.collaborators?.direction ?? "up",
      icon: <FaUsers size={28} className="text-yellow" />,
      bgIcon: <FaUsers size={100} className="absolute right-2 bottom-2 text-yellow/10" />,
      bg: "bg-yellow/10",
    },
  ];

  return (
    <section className="grid md:grid-cols-4 grid-cols-1 gap-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className={`relative overflow-hidden rounded-2xl p-6 shadow bg-white transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl group ${card.bg}`}
        >
          {/* Faded background icon */}
          {card.bgIcon}
          <div className="flex justify-between items-start mb-2">
            <div className="z-10">{card.icon}</div>
            <div className="flex items-center gap-1 z-10">
              {card.changeDirection === "up" ? (
                <BsArrowUpShort className="text-green text-xl" />
              ) : (
                <BsArrowDownShort className="text-red text-xl" />
              )}
              <span className={`text-xs font-semibold ${card.changeDirection === "up" ? "text-green" : "text-red"}`}>
                {card.changeDirection === "up" ? "↑" : "↓"} {card.change}%
              </span>
            </div>
          </div>
          <div className="z-10 relative">
            <div className="text-gray font-medium text-sm mb-1">{card.title}</div>
            <div className="text-3xl font-extrabold text-color mb-1">{card.value}</div>
            <div className="text-xs text-gray mb-6">{card.subtitle}</div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default StatsCards; 