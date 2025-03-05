"use client";
import React, { useState } from "react";
import { datum } from "@/app/influencer/influencer-results/influencersData";
import { FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { IoLogoTiktok } from "react-icons/io5";
import { FaRegEnvelope } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import Footer from "@/app/Components/Footer";
import AllInfluencers from "@/app/Components/Influencer/All-Influencers";
import BucketList from "@/app/Components/Brand/BucketList";

const CreateCampaign = () => {
  const [currentTab, setCurrentTab] = useState(1);
  const tabHeadings = {
    1: "Influencers in your Bucket List",
    2: "All Influencers",
    3: "Influencers on Tab Three",
    4: "Influencers on Tab Four",
  };

  return (
    <>
      <div className="bg-primary p-4 text-white text-4xl font-bold h-[20vh] flex items-center justify-center">
        <h1>Find Influencers to collaborate with</h1>
      </div>
      <div className="bg-background md:px-12 px-4 py-4">
        <section className="bg-white w-full rounded p-1 shadow-2xl mx-auto flex items-center gap-4 text-color text-sm">
          <div
            className={`${
              currentTab === 1 ? "bg-background p-2 font-bold" : ""
            } cursor-pointer `}
            onClick={() => setCurrentTab(1)}
          >
            <p>Bucket List</p>
          </div>
          <div
            className={`${
              currentTab === 2 ? "bg-background p-2 font-bold" : ""
            } cursor-pointer `}
            onClick={() => setCurrentTab(2)}
          >
            <p>All Influencers</p>
          </div>
          <div
            className={`${
              currentTab === 3 ? "bg-background p-2 font-bold" : ""
            } cursor-pointer `}
            onClick={() => setCurrentTab(3)}
          >
            <p>Bucket List</p>
          </div>
          <div
            className={`${
              currentTab === 4 ? "bg-background p-2 font-bold" : ""
            } cursor-pointer `}
            onClick={() => setCurrentTab(4)}
          >
            <p>Tab Four</p>
          </div>
        </section>
        <h1 className="text-2xl font-bold text-color my-4">
          {tabHeadings[currentTab] || ""}
        </h1>
        {currentTab === 1 && (
          <section className="grid md:grid-cols-5 grid-cols-1 gap-4 mb-8">
            {datum.map((data, index) => (
              <div key={index} className="bg-white shadow-xl rounded-lg p-4">
                <img
                  className=" h-[180px] object-cover rounded-md mb-1"
                  src="/images/b18.png"
                  alt=""
                />
                <section className="border-b border-input flex items-center justify-between mb-2">
                  <div>
                    <p className="text-sm font-bold">Orkun Işıtmak</p>
                    <small className="text-color text-xs">Istanbul, TR</small>
                  </div>
                  <div>
                    <p className="text-sm font-bold">10M</p>
                    <small className="text-color text-xs">Followers</small>
                  </div>
                </section>
                <div className="space-y-2">
                  <section className="flex items-center justify-between">
                    <div className="flex items-center justify-between gap-4 text-xs">
                      <FaYoutube className="text-red" />
                      <FaInstagram />
                      <IoLogoTiktok />
                    </div>
                    <div>
                      <small className="text-[10px] bg-background rounded-3xl py-1 px-2">
                        Entertainment
                      </small>
                    </div>
                  </section>
                  <section className="flex items-center justify-between">
                    <div className="flex items-center justify-between gap-4 text-xs">
                      <small className="text-[11px]">Advertising Price</small>
                    </div>
                    <div>
                      <small className="text-xs font-bold">$5000</small>
                    </div>
                  </section>
                  <section className="flex items-center justify-between">
                    <div className="flex items-center justify-between gap-4 text-xs">
                      <FaRegEnvelope />
                      <FaHeart />
                    </div>
                    <div>
                      <small className="text-[10px] bg-background rounded py-2 px-2">
                        Send Message
                      </small>
                    </div>
                  </section>
                </div>
              </div>
            ))}
          </section>
        )}
        {currentTab === 2 && <AllInfluencers />}
        {currentTab === 3 && <BucketList />}
      </div>
      <Footer />
    </>
  );
};

export default CreateCampaign;
