import React from "react";
import Footer from "@/app/Components/Footer";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import Link from "next/link";


const CampaignReport = () => {
  return (
    <>
    <section className="bg-background text-link md:w-7/12 w-full mx-auto rounded my-2 p-4 flex gap-2 items-center">
    <HiOutlineArrowNarrowLeft />
      <Link href="/brand/influencer-discovery" className="font-bold text-sm">Back to Influencer Discovery</Link>
    </section>
      <section className=" p-4 text-color space-y-4 mb-8">
        <div className="md:w-7/12 w-full mx-auto space-y-4">
          <section className="grid md:grid-cols-3 grid-cols-2 gap-3">
            <div className="bg-white shadow rounded space-y-4 p-4 text-center">
              <p className="text-sm font-light">Active Influencers</p>
              <h2 className="font-bold text-primary text-2xl">42</h2>
            </div>
            <div className="bg-white shadow rounded space-y-4 p-4  text-center">
              <p className="text-sm font-light">Influencer Posts</p>
              <h2 className="font-bold text-2xl">42</h2>
            </div>
            <div className="bg-white shadow rounded space-y-4 p-4  text-center">
              <p className="text-sm font-light">Engagement Rate</p>
              <h2 className="font-bold text-2xl">42</h2>
            </div>
            <div className="bg-white shadow rounded space-y-4 p-4 text-center">
              <p className="text-sm font-light">Total Reach</p>
              <h2 className="font-bold text-2xl">42</h2>
            </div>
            <div className="bg-white shadow rounded space-y-4 p-4 text-center">
              <p className="text-sm font-light">Average Likes</p>
              <h2 className="font-bold text-2xl">42</h2>
            </div>
          </section>
        </div>
        <section className="border border-input rounded text-color md:w-7/12 w-full mx-auto p-4">
          <div className="space-y-2 md:flex items-center justify-between">
            <div className="md:w-3/12">
              <img
                className="w-36 object-cover mx-auto h-36 rounded-full"
                src="/images/b11.png"
                alt=""
              />
              <p className="font-bold text-center mt-4">Storyteller</p>
              <p className="font-light text-sm text-center">Nairobi, Kenya</p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <img className="w-40" src="/images/report4.png" alt="" />
              <img className="w-40" src="/images/report2.png" alt="" />
              <img className="w-40" src="/images/report1.png" alt="" />
            </div>
          </div>
        </section>
        <section className="md:w-7/12 w-full mx-auto overflow-hidden">
          <h1 className="text-xl font-semibold my-2">Best Perfoming Media</h1>
          <div className="grid md:grid-cols-6 grid-cols-3 gap-3">
            <div className="">
              <img className="w-40" src="/images/report.png" alt="" />
            </div>
            <div className="">
              <img className="w-40" src="/images/report1.png" alt="" />
            </div>
            <div className="">
              <img className="w-40" src="/images/report2.png" alt="" />
            </div>
            <div className="">
              <img className="w-40" src="/images/report3.png" alt="" />
            </div>
            <div className="">
              <img className="w-40" src="/images/report4.png" alt="" />
            </div>
            <div className="">
              <img className="w-40" src="/images/report4.png" alt="" />
            </div>
          </div>
        </section>
      </section>
      <Footer />
    </>
  );
};

export default CampaignReport;
