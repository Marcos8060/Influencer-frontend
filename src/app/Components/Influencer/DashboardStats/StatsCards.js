import React from "react";
import { MdPendingActions, MdCheckCircle, MdOutlineAccessTime, MdTrendingUp } from "react-icons/md";
import { FaUsers } from "react-icons/fa6";

const StatsCards = ({
  pendingApplications = 0,
  approvedApplications = 0,
  upcomingDeadlines = 0,
  totalCollaborations = 0,
}) => {
  const cards = [
    {
      title: "Pending Applications",
      value: pendingApplications,
      subtitle: "Awaiting Approval",
      icon: <MdPendingActions size={28} className="text-yellow" />,
      bgIcon: <MdPendingActions size={80} className="absolute right-2 bottom-2 text-yellow/10" />,
      bg: "bg-yellow/10",
    },
    {
      title: "Approved Applications",
      value: approvedApplications,
      subtitle: "Total Offers",
      icon: <MdCheckCircle size={28} className="text-green" />,
      bgIcon: <MdCheckCircle size={80} className="absolute right-2 bottom-2 text-green/10" />,
      bg: "bg-green/10",
    },
    {
      title: "Upcoming Deadlines",
      value: upcomingDeadlines,
      subtitle: "Approaching Deadlines",
      icon: <MdOutlineAccessTime size={28} className="text-secondary" />,
      bgIcon: <MdOutlineAccessTime size={80} className="absolute right-2 bottom-2 text-secondary/10" />,
      bg: "bg-secondary/10",
    },
    {
      title: "Total Collaborations",
      value: totalCollaborations,
      subtitle: "All Campaigns",
      icon: <FaUsers size={28} className="text-primary" />,
      bgIcon: <FaUsers size={80} className="absolute right-2 bottom-2 text-primary/10" />,
      bg: "bg-primary/10",
    },
  ];

  return (
    <section className="grid md:grid-cols-4 grid-cols-1 gap-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className={`relative overflow-hidden rounded-2xl p-4 shadow bg-white transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl group ${card.bg}`}
        >
          {card.bgIcon}
          <div className="flex justify-between items-start mb-2">
            <div className="z-10">{card.icon}</div>
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