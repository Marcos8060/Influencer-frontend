"use client";
import React, { useEffect, useState } from "react";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";
import { FaUsersBetweenLines } from "react-icons/fa6";
import { FaUsersViewfinder } from "react-icons/fa6";
import { MdWorkHistory } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPostInsights,
  getAllPosts,
} from "@/redux/features/stepper/campaign-stepper";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useAuth } from "@/assets/hooks/use-auth";

const CampaignReport = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const { posts } = useSelector((store) => store.campaign);
  const auth = useAuth();

  const handleSubmit = async () => {
    try {
      const response = await dispatch(getAllPostInsights());
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const userId = "40678282-c173-4788-89c9-14ea5596651e";

  useEffect(() => {
    dispatch(getAllPosts(auth, userId))
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [auth]);

  return (
    <div className="bg-background">
      <section className=" text-link w-full mx-auto rounded p-4 flex gap-2 items-center">
        <HiOutlineArrowNarrowLeft />
        <Link
          href="/brand/influencer-discovery"
          className="font-semibold text-sm"
        >
          Back to Influencer Discovery
        </Link>
      </section>
      <section className="p-4 text-color space-y-8 mb-8">
        <div className="w-full mx-auto space-y-4">
          <section className="grid md:grid-cols-4 grid-cols-1 md:gap-8 gap-4">
            <div className="bg-white rounded-2xl p-4 text-color shadow-lg text-center space-y-4">
              <div className="flex gap-2 items-center justify-between">
                <p className="font-light">Active Influencers</p>
                <FaUsersViewfinder className="text-xl" />
              </div>
              <div className="flex gap-4 items-center">
                <p className="font-semibold text-2xl">23</p>
                <small className="text-secondary text-xs font-semibold">
                  Awaiting Approval
                </small>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-4 text-color shadow-lg text-center space-y-4">
              <div className="flex gap-2 items-center justify-between">
                <p className="font-light">Influencer Posts</p>
                <MdWorkHistory className="text-xl text-green" />
              </div>
              <div className="flex gap-4 items-center">
                <p className="font-semibold text-2xl">18</p>
                <small className="text-green text-xs font-semibold">
                  Total Offers
                </small>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-4 text-color shadow-lg text-center space-y-4">
              <div className="flex gap-2 items-center justify-between">
                <p className="font-light">Total Reach</p>
                <AiOutlineShopping className="text-xl" />
              </div>
              <div className="flex gap-4 items-center">
                <p className="font-semibold text-2xl">12</p>
                <small className="text-secondary text-xs font-semibold">
                  Approaching Deadlines
                </small>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-4 text-color shadow-lg text-center space-y-4">
              <div className="flex gap-2 items-center justify-between">
                <p className="font-light">Average Likes</p>
                <FaUsersBetweenLines className="text-xl" />
              </div>
              <div className="flex gap-4 items-center">
                <p className="font-semibold text-2xl">12%</p>
                <small className="text-primary text-xs font-semibold">
                  Average Engagement
                </small>
              </div>
            </div>
          </section>
          {/* <section className="grid md:grid-cols-4 grid-cols-2 gap-3">
            <div className="bg-white shadow-md rounded-2xl space-y-4 p-4 text-center">
              <p className="text-sm font-light">Active Influencers</p>
              <h2 className="font-bold text-primary text-2xl">42</h2>
            </div>
            <div className="bg-white shadow-md rounded-2xl space-y-4 p-4  text-center">
              <p className="text-sm font-light">Influencer Posts</p>
              <h2 className="font-bold text-2xl">42</h2>
            </div>
            <div className="bg-white shadow-md rounded-2xl space-y-4 p-4 text-center">
              <p className="text-sm font-light">Total Reach</p>
              <h2 className="font-bold text-2xl">42</h2>
            </div>
            <div className="bg-white shadow-md rounded-2xl space-y-4 p-4 text-center">
              <p className="text-sm font-light">Average Likes</p>
              <h2 className="font-bold text-2xl">42</h2>
            </div>
          </section> */}
        </div>
        {loading ? (
          <Skeleton
            baseColor="#c0c0c0"
            highlightColor="#f0f0f0"
            count={3}
            height={100}
          />
        ) : (
          <>
              <section
                className="border border-input rounded text-color w-full mx-auto p-4 "
              >
                <div className="space-y-2 md:flex items-center justify-between">
                  <div className="md:w-2/12">
                    <img
                      className="w-24 object-cover mx-auto h-24 rounded-full"
                      src={posts[0].profilePictureUrl}
                      alt=""
                    />
                    <p className="font-bold text-center mt-4">
                      {posts[0].ownerName}
                    </p>
                    <p className="font-light text-sm text-center">
                      Nairobi, Kenya
                    </p>
                  </div>
                  <div className="w-10/12 grid grid-cols-4 gap-3">
                    {posts[0].mediaUrls.map((media,index) => (
                      <div key={index}>
                        <img
                          className="w-40"
                          src={media}
                          alt=""
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </section>
          </>
        )}

        <section className="w-full mx-auto overflow-hidden">
          <h1 className="text-xl font-semibold my-2">Best Perfoming Media</h1>
          <div className="grid md:grid-cols-6 grid-cols-3 gap-3">
            <div className="">
              <img className="" src="/images/report.png" alt="" />
            </div>
            <div className="">
              <img className="" src="/images/report1.png" alt="" />
            </div>
            <div className="">
              <img className="" src="/images/report2.png" alt="" />
            </div>
            <div className="">
              <img className="" src="/images/report3.png" alt="" />
            </div>
            <div className="">
              <img className="" src="/images/report4.png" alt="" />
            </div>
            <div className="">
              <img className="" src="/images/report4.png" alt="" />
            </div>
          </div>
        </section>
      </section>
    </div>
  );
};

export default CampaignReport;
