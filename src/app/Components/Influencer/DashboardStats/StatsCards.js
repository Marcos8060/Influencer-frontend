import React from "react";
import { FaUsersViewfinder, FaUsersBetweenLines } from "react-icons/fa6";
import { MdWorkHistory } from "react-icons/md";
import { AiOutlineShopping } from "react-icons/ai";

const StatsCards = ({
  pendingApplications = 0,
  approvedApplications = 0,
  upcomingDeadlines = 0,
  totalCollaborations = 0,
  engagementRate = null,
}) => {
  return (
    <section className="grid md:grid-cols-5 grid-cols-1 md:gap-8 gap-4">
      <div className="bg-white rounded-2xl p-4 text-color shadow-lg text-center space-y-4">
        <div className="flex gap-2 items-center justify-between">
          <p className="font-light">Pending Applications</p>
          <FaUsersViewfinder className="text-xl" />
        </div>
        <div className="flex gap-4 items-center">
          <p className="font-semibold text-2xl">{pendingApplications}</p>
          <small className="text-secondary text-xs font-semibold">Awaiting Approval</small>
        </div>
      </div>
      <div className="bg-white rounded-2xl p-4 text-color shadow-lg text-center space-y-4">
        <div className="flex gap-2 items-center justify-between">
          <p className="font-light">Approved Applications</p>
          <MdWorkHistory className="text-xl text-green" />
        </div>
        <div className="flex gap-4 items-center">
          <p className="font-semibold text-2xl">{approvedApplications}</p>
          <small className="text-green text-xs font-semibold">Total Offers</small>
        </div>
      </div>
      <div className="bg-white rounded-2xl p-4 text-color shadow-lg text-center space-y-4">
        <div className="flex gap-2 items-center justify-between">
          <p className="font-light">Upcoming Deadlines</p>
          <AiOutlineShopping className="text-xl" />
        </div>
        <div className="flex gap-4 items-center">
          <p className="font-semibold text-2xl">{upcomingDeadlines}</p>
          <small className="text-secondary text-xs font-semibold">Approaching Deadlines</small>
        </div>
      </div>
      <div className="bg-white rounded-2xl p-4 text-color shadow-lg text-center space-y-4">
        <div className="flex gap-2 items-center justify-between">
          <p className="font-light">Total Collaborations</p>
          <FaUsersBetweenLines className="text-xl" />
        </div>
        <div className="flex gap-4 items-center">
          <p className="font-semibold text-2xl">{totalCollaborations}</p>
          <small className="text-primary text-xs font-semibold">All Campaigns</small>
        </div>
      </div>
      <div className="bg-white rounded-2xl p-4 text-color shadow-lg text-center space-y-4">
        <div className="flex gap-2 items-center justify-between">
          <p className="font-light">Engagement Rate</p>
          <FaUsersBetweenLines className="text-xl" />
        </div>
        <div className="flex gap-4 items-center">
          <p className="font-semibold text-2xl">{engagementRate !== null ? engagementRate + "%" : "-"}</p>
          <small className="text-primary text-xs font-semibold">Average Engagement</small>
        </div>
      </div>
    </section>
  );
};

export default StatsCards; 