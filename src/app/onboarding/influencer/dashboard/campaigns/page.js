"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { getAllCampaigns } from "@/redux/features/stepper/campaign-stepper";
import { IoMdCheckmark } from "react-icons/io";
import { useAuth } from "@/assets/hooks/use-auth";
import { applyCampaign } from "@/redux/services/campaign";
import toast from "react-hot-toast";
import { FaUsersBetweenLines } from "react-icons/fa6";
import { AiOutlineShopping } from "react-icons/ai";
import { MdCampaign } from "react-icons/md";
import AppliedCampaignsTable from "@/app/Components/Influencer/Applied-Campaigns";
import ApprovedCampaignsTable from "@/app/Components/Influencer/Approved-Campaigns";
import { useProtectedRoute } from "@/assets/hooks/authGuard";
import { FaBoxOpen } from "react-icons/fa";

const Campaigns = () => {
  const { allCampaigns } = useSelector((store) => store.campaign);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [applyLoading, setApplyLoading] = useState(false);
  const [applied, setApplied] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(allCampaigns[0])
  const [currentTab, setCurrentTab] = useState(1)
  const auth = useAuth();

  const handleSelect = (job) => {
    setSelectedCampaign(job);
    setApplied(false);
  };

  const handleApply = async (id) => {
    try {
      setApplyLoading(true);
      const response = await applyCampaign(auth, id);
      console.log("APPLY_RESPONSE ", response.status);
      if (response.status === 200) {
        toast.success("Application sent successfully");
        setApplied(true);
      } else {
        toast.error(response.response.data.errorMessage[0]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setApplyLoading(false);
    }
  };

  useEffect(() => {
    if (!selectedCampaign) {
      setSelectedCampaign(allCampaigns[0]);
    }
  }, [allCampaigns, selectedCampaign]);

  useEffect(() => {
    dispatch(getAllCampaigns(auth))
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [auth]);

  const isAuthorized = useProtectedRoute();

  if (!isAuthorized) {
    return null;
  }

  return (
    <div className="bg-background mb-4">
      <section className="border-b border-b-input w-full pt-1 px-2 mx-auto flex items-center justify-between text-color text-sm mb-6">
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
            <p>All Campaigns</p>
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
            <p>Applied Campaigns</p>
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
            <p>Approved Campaigns</p>
          </div>
          {/* <div
            className={`${
              currentTab === 4
                ? "text-link p-2 font-semibold border-b-2 border-link"
                : ""
            } cursor-pointer flex items-center gap-2`}
            onClick={() => setCurrentTab(4)}
          >
            <MdCampaign className="text-xl" />
            <p>Rejected Campaigns</p>
          </div> */}
        </div>
      </section>

      {currentTab === 1 && (
        <>
          {allCampaigns.length > 0 ? (
            <section className="mx-auto flex gap-4 overflow-y-auto">
              <div className="w-4/12 space-y-3">
                {loading ? (
                  <Skeleton
                    baseColor="#c0c0c0"
                    highlightColor="#f0f0f0"
                    count={3}
                    height={100}
                  />
                ) : (
                  <>
                    {Array.isArray(allCampaigns) &&
                      allCampaigns.map((campaign, index) => (
                        <section
                          onClick={() => handleSelect(campaign)}
                          key={index}
                          className={`${
                            selectedCampaign?.id === campaign.id
                              ? "border-2 border-primary"
                              : ""
                          } w-full bg-white shadow rounded-lg p-4 cursor-pointer`}
                        >
                          <div>
                            <h1 className="font-bold text-primary">
                              {campaign.title}
                            </h1>
                            <p className="text-xs mt-2">{campaign.subTitle}</p>
                            <div className=" border-b border-input my-2"></div>
                            <footer className="flex items-center justify-between text-xs">
                              <div className="space-y-3 font-light">
                                <p className="">{campaign.briefTitle}</p>
                                <p className="">{campaign.briefDescription}</p>
                              </div>
                            </footer>
                          </div>
                        </section>
                      ))}
                  </>
                )}
              </div>
              <div className="w-8/12 text-color">
                {applied ? (
                  <div className="flex items-center justify-center h-[50vh]">
                    <section className="bg-white rounded-lg shadow-sm p-4 md:w-5/12 w-full flex items-center justify-center">
                      <div className="space-y-4">
                        <h2 className="text-xl font-bold text-green text-center">
                          🎉 Application sent Successfully!
                        </h2>
                        <p className="font-light text-sm text-center leading-6">
                          Your application is now pending waiting for approval.
                          You can track its performance in your dashboard.
                        </p>
                      </div>
                    </section>
                  </div>
                ) : (
                  <>
                    {loading && allCampaigns.length === 0 ? (
                      <Skeleton
                        baseColor="#c0c0c0"
                        highlightColor="#f0f0f0"
                        count={4}
                        height={100}
                      />
                    ) : (
                      <section className="w-full bg-white shadow rounded p-4">
                        <div className="space-y-3">
                          <h1 className="font-light text-3xl text-center text-color">
                            {selectedCampaign !== null
                              ? selectedCampaign?.title
                              : allCampaigns[0]?.title}
                          </h1>
                          <img
                            className="rounded h-[30vh] w-full object-cover"
                            src={
                              selectedCampaign !== null
                                ? selectedCampaign?.coverImageUrl
                                : allCampaigns[0]?.coverImageUrl
                            }
                            alt=""
                          />
                        </div>
                        <div className="border-b border-input py-4">
                          <p className="font-light text-center mt-4">
                            {selectedCampaign !== null
                              ? selectedCampaign?.description
                              : allCampaigns[0]?.description}
                          </p>
                        </div>
                        <div className="space-y-4 mt-4">
                          <section className="flex items-center justify-between">
                            <div className="flex gap-2 text-sm">
                              <p className="font-thin">Start Date:</p>
                              <p className="font-semibold">
                                {selectedCampaign !== null
                                  ? selectedCampaign?.startDate
                                  : allCampaigns[0]?.startDate}
                              </p>
                            </div>
                            <div className="flex gap-2 text-sm">
                              <p className="font-thin">End Date:</p>
                              <p className="font-semibold">
                                {selectedCampaign !== null
                                  ? selectedCampaign?.startDate
                                  : allCampaigns[0]?.endDate}
                              </p>
                            </div>
                          </section>

                          <section className="flex items-center justify-between text-sm">
                            <div className="flex gap-2">
                              <p className="font-thin">Videos Per Creator:</p>
                              <p className="font-semibold">
                                {selectedCampaign !== null
                                  ? selectedCampaign?.preferences
                                      .videosPerCreator
                                  : allCampaigns[0]?.preferences
                                      .videosPerCreator}
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <p className="font-thin">Video Duration:</p>
                              <p className="font-semibold">
                                {selectedCampaign !== null
                                  ? selectedCampaign?.preferences.videoDuration
                                  : allCampaigns[0]?.preferences.videoDuration}
                                s
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <p className="font-thin">Video Format:</p>
                              <p className="font-semibold">
                                {selectedCampaign !== null
                                  ? selectedCampaign?.preferences.videoFormat
                                  : allCampaigns[0]?.preferences.videoFormat}
                              </p>
                            </div>
                          </section>
                          <div className="flex gap-2">
                            <p className="font-thin">Video URL:</p>
                            <a
                              className="font-light text-sm text-link"
                              target="_blank"
                              href={
                                selectedCampaign !== null
                                  ? selectedCampaign?.exampleVideoUrl
                                  : allCampaigns[0]?.exampleVideoUrl
                              }
                            >
                              {selectedCampaign !== null
                                ? selectedCampaign?.exampleVideoUrl
                                : allCampaigns[0]?.exampleVideoUrl}
                            </a>
                          </div>
                          <section className=" border-b border-input py-4 text-sm">
                            <div className="space-y-4">
                              <div className="flex gap-2">
                                <p className="font-thin w-2/12">Brief Title:</p>
                                <p className="font-semibold">
                                  {selectedCampaign !== null
                                    ? selectedCampaign?.briefTitle
                                    : allCampaigns[0]?.briefTitle}
                                </p>
                              </div>
                              <div className="flex gap-2">
                                <p className="font-thin w-2/12">
                                  Brief Description:
                                </p>
                                <p className="font-semibold">
                                  {selectedCampaign !== null
                                    ? selectedCampaign?.briefDescription
                                    : allCampaigns[0]?.briefDescription}
                                </p>
                              </div>
                            </div>
                          </section>
                          <section className=" border-b border-input py-4 text-sm">
                            <div className="space-y-4">
                              <div className="flex gap-2">
                                <p className="font-thin w-2/12">Show Face:</p>
                                <p className="font-semibold">
                                  {selectedCampaign !== null
                                    ? selectedCampaign?.showFace
                                    : allCampaigns[0]?.showFace}
                                </p>
                              </div>
                              <div className="flex gap-2">
                                <p className="font-thin w-2/12">
                                  Social Channels:
                                </p>
                                <p className="">
                                  {(() => {
                                    // Safely get the channels with null checks
                                    const channels =
                                      selectedCampaign !== null
                                        ? selectedCampaign?.preferences
                                            ?.socialChannels
                                        : allCampaigns[0]?.preferences
                                            ?.socialChannels;

                                    // Ensure we always work with an array
                                    const safeChannels = []
                                      .concat(channels || [])
                                      .filter(Boolean);

                                    return safeChannels.map((item, index) => (
                                      <div
                                        key={index}
                                        className="flex items-center gap-2"
                                      >
                                        <IoMdCheckmark />
                                        <li className="list-none font-semibold">
                                          {item}
                                        </li>
                                      </div>
                                    ));
                                  })()}
                                </p>
                              </div>
                            </div>
                          </section>
                          <section className=" border-b border-input py-4">
                            <div className="space-y-4">
                              <div className="flex gap-4">
                                <p className="font-thin w-2/12">Video Style:</p>
                                <p className="font-light">
                                  {(() => {
                                    // Safely get video styles with null checks
                                    const videoStyles =
                                      selectedCampaign !== null
                                        ? selectedCampaign?.preferences
                                            ?.videoStyle
                                        : allCampaigns[0]?.preferences
                                            ?.videoStyle;

                                    // Ensure we always work with an array (handles undefined, single items, or arrays)
                                    const safeVideoStyles = Array.isArray(
                                      videoStyles
                                    )
                                      ? videoStyles.filter(Boolean)
                                      : videoStyles
                                      ? [videoStyles].filter(Boolean)
                                      : [];

                                    return safeVideoStyles.map(
                                      (item, index) => (
                                        <div
                                          key={index}
                                          className="flex items-center gap-2"
                                        >
                                          <IoMdCheckmark />
                                          <li className="list-none font-semibold">
                                            {item}
                                          </li>
                                        </div>
                                      )
                                    );
                                  })()}
                                </p>
                              </div>
                            </div>
                          </section>
                          <section className="flex justify-end">
                            <button
                              disabled={applyLoading}
                              onClick={() => handleApply(selectedCampaign.id)}
                              className="bg-gradient-to-r from-primary to-secondary text-white text-xs rounded px-8 py-2 font-semibold"
                            >
                              {applyLoading ? "Processing..." : "Apply"}
                            </button>
                          </section>
                        </div>
                      </section>
                    )}
                  </>
                )}
              </div>
            </section>
          ) : (
            <section className="h-[60vh] flex items-center justify-center">
              <div className="flex flex-col items-center justify-center">
                <FaBoxOpen className="text-9xl text-gray" />
                <p className="mr-4 text-sm font-light">
                  No Active Campaigns at the Moment
                </p>
              </div>
            </section>
          )}
        </>
      )}

      {currentTab === 2 && <AppliedCampaignsTable />}
      {currentTab === 3 && <ApprovedCampaignsTable />}
    </div>
  );
};

export default Campaigns;
