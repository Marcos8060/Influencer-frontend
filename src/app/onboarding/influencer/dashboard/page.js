"use client";
import React from "react";
import { MdCampaign } from "react-icons/md";
import { AiOutlineShopping } from "react-icons/ai";
import { FaUsersBetweenLines } from "react-icons/fa6";
import { FaUsersViewfinder } from "react-icons/fa6";
import { MdWorkHistory } from "react-icons/md";


const InfluencerDashboard = () => {
  return (
    <div>
      <section className="grid md:grid-cols-4 grid-cols-1 md:gap-8 gap-4">
        <div className="bg-white rounded-2xl p-4 text-color shadow-lg text-center space-y-4">
          <div className="flex gap-2 items-center justify-between">
            <p className="font-light">Pending Collabs</p>
            <FaUsersViewfinder className="text-xl" />
          </div>
          <div className="flex gap-4 items-center">
            <p className="font-semibold text-2xl">23</p>
            <small className="text-secondary text-xs font-semibold">Awaiting Approval</small>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 text-color shadow-lg text-center space-y-4">
          <div className="flex gap-2 items-center justify-between">
            <p className="font-light">Brand Offers</p>
            <MdWorkHistory className="text-xl text-green" />
          </div>
          <div className="flex gap-4 items-center">
            <p className="font-semibold text-2xl">18</p>
            <small className="text-green text-xs font-semibold">Total Offers</small>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 text-color shadow-lg text-center space-y-4">
          <div className="flex gap-2 items-center justify-between">
            <p className="font-light">Upcoming Deadlines</p>
            <AiOutlineShopping className="text-xl" />
          </div>
          <div className="flex gap-4 items-center">
            <p className="font-semibold text-2xl">12</p>
            <small className="text-secondary text-xs font-semibold">Approaching Deadlines</small>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 text-color shadow-lg text-center space-y-4">
          <div className="flex gap-2 items-center justify-between">
            <p className="font-light">Engagement Rate</p>
            <FaUsersBetweenLines className="text-xl" />
          </div>
          <div className="flex gap-4 items-center">
            <p className="font-semibold text-2xl">12%</p>
            <small className="text-primary text-xs font-semibold">Average Engagement</small>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InfluencerDashboard;
