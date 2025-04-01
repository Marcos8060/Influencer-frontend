"use client";
import React, { useEffect, useState } from "react";
import { datum } from "@/app/influencer/influencer-results/influencersData";
import { FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { IoLogoTiktok } from "react-icons/io5";
import { FaRegEnvelope } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import Footer from "@/app/Components/Footer";
import AllInfluencers from "@/app/Components/Influencer/All-Influencers";
import BucketList from "@/app/Components/Brand/BucketList";
import LogoutComponent from "@/app/Components/LogoutComponent";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllBuckets } from "@/redux/features/bucket-list";
import { useAuth } from "@/assets/hooks/use-auth";
import { FaUsersBetweenLines } from "react-icons/fa6";
import { AiOutlineShopping } from "react-icons/ai";
import { MdCampaign } from "react-icons/md";
import CampaignsTable from "@/app/Components/Brand/CampaignsTable";


const CreateCampaign = () => {
  const { bucketList } = useSelector((store) => store.bucket);
  const { influencers } = useSelector((store) => store.filterResults);
  const dispatch = useDispatch();
  const [currentTab, setCurrentTab] = useState(1);
  const auth = useAuth();

  const tabHeadings = {
    1: (
      <>
        We found <span className="font-black text-sm">{influencers.length}</span> Total Influencers
      </>
    ),
    2: (
      <>
        We found <span className="font-black text-sm">{bucketList.length}</span> Bucket(s)
        in your Repository.
      </>
    ),
    3: (
      <>
        We found <span className="font-black text-sm">{bucketList.length}</span> Campaigns
        in your Repository.
      </>
    )
  };

  useEffect(() => {
    if (auth) {
      dispatch(fetchAllBuckets(auth));
    }
  }, [auth]);

  return (
    <>
      <div className="md:px-12 px-4 py-4">
        <section className="border-b border-b-input w-full pt-1 px-2 mx-auto flex items-center justify-between text-color text-sm">
          <div className="flex items-center gap-8">
            <div
              className={`${
                currentTab === 1
                  ? "text-link p-2 font-semibold border-b-2 border-link"
                  : ""
              } cursor-pointer flex gap-2 items-center`}
              onClick={() => setCurrentTab(1)}
            >
              <FaUsersBetweenLines className="text-xl" />
              <p>Influencers</p>
            </div>
            <div
              className={`${
                currentTab === 2
                  ? "text-link p-2 font-semibold border-b-2 border-link"
                  : ""
              } cursor-pointer flex items-center gap-2`}
              onClick={() => setCurrentTab(2)}
            >
              <AiOutlineShopping className="text-xl" />
              <p>Bucket List</p>
            </div>
            <div
              className={`${
                currentTab === 3
                  ? "text-link p-2 font-semibold border-b-2 border-link"
                  : ""
              } cursor-pointer flex items-center gap-2`}
              onClick={() => setCurrentTab(3)}
            >
              <MdCampaign className="text-xl" />
              <p>Campaigns</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <p className="font-bold">Marcos</p>
            <LogoutComponent />
          </div>
        </section>
        <h1 className="bg-background text-link text-xs p-2 rounded-md mt-8">
          {tabHeadings[currentTab] || ""}
        </h1>
        {currentTab === 0 && (
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
        {currentTab === 1 && <AllInfluencers />}
        {currentTab === 2 && <BucketList />}
        {currentTab === 3 && <CampaignsTable />}
      </div>
      <Footer />
    </>
  );
};

export default CreateCampaign;
