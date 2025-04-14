"use client";
import React, { useEffect, useState } from "react";
import { MdVerified } from "react-icons/md";
// import ApplyJobModal from "./apply-job-modal";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { fetchAllBrandCampaigns } from "@/redux/features/stepper/campaign-stepper";
import { campaigns } from "./samples";
import { IoMdCheckmark } from "react-icons/io";

const Campaigns = () => {
  const { brandCampaigns } = useSelector((store) => store.campaign);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(campaigns[0]);

  const handleSelect = (job) => {
    setSelectedCampaign(job);
  };

  // useEffect(() => {
  //   dispatch(fetchAllBrandCampaigns())
  //     .then(() => {
  //       setLoading(false);
  //     })
  //     .catch(() => {
  //       setLoading(false);
  //     });
  // }, []);
  return (
    <div className="bg-background mb-4">
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
              {Array.isArray(campaigns) &&
                campaigns.map((campaign, index) => (
                  <section
                    onClick={() => handleSelect(campaign)}
                    key={index}
                    className={`${selectedCampaign?.id === campaign.id ? 'border border-primary' : ''} w-full bg-white shadow rounded-lg p-4 cursor-pointer`}
                  >
                    <div>
                      <h1 className="font-bold text-primary">{campaign.title}</h1>
                      <p className="text-xs mt-2">{campaign.subTitle}</p>
                      <div className=" border-b border-input my-2"></div>
                      <footer className="flex items-center justify-between text-xs">
                        <div className="space-y-3 font-light">
                          <p className="">
                            {campaign.briefTitle}
                          </p>
                          <p className="">
                            {campaign.briefDescription}
                          </p>
                        </div>
                        
                      </footer>
                    </div>
                  </section>
                ))}
            </>
          )}
        </div>
        <div className="w-8/12 text-color">
          {loading ? (
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
                    : campaigns[0]?.title}
                </h1>
                <img
                  className="rounded h-[30vh] w-full object-cover"
                  src="/images/workout.jpg"
                  alt=""
                />
              </div>
              <div className="border-b border-input py-4">
                <p className="font-light text-center mt-4">
                  {selectedCampaign !== null
                    ? selectedCampaign?.description
                    : campaigns[0]?.description}
                </p>
              </div>
              <div className="space-y-4">
                <section className="flex items-center justify-between">
                  <div className="flex gap-2 text-sm">
                    <p className="font-thin">Start Date:</p>
                    <p className="font-semibold">
                      {selectedCampaign !== null
                        ? selectedCampaign?.startDate
                        : campaigns[0]?.startDate}
                    </p>
                  </div>
                  <div className="flex gap-2 text-sm">
                    <p className="font-thin">End Date:</p>
                    <p className="font-semibold">
                      {selectedCampaign !== null
                        ? selectedCampaign?.startDate
                        : campaigns[0]?.endDate}
                    </p>
                  </div>
                </section>

                <section className="flex items-center justify-between text-sm">
                  <div className="flex gap-2">
                    <p className="font-thin">Videos Per Creator:</p>
                    <p className="font-semibold">
                      {selectedCampaign !== null
                        ? selectedCampaign?.preferences.videosPerCreator
                        : campaigns[0]?.preferences.videosPerCreator}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <p className="font-thin">Video Duration:</p>
                    <p className="font-semibold">
                      {selectedCampaign !== null
                        ? selectedCampaign?.preferences.videoDuration
                        : campaigns[0]?.preferences.videoDuration}
                      s
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <p className="font-thin">Video Format:</p>
                    <p className="font-semibold">
                      {selectedCampaign !== null
                        ? selectedCampaign?.preferences.videoFormat
                        : campaigns[0]?.preferences.videoFormat}
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
                        : campaigns[0]?.exampleVideoUrl
                    }
                  >
                    {selectedCampaign !== null
                      ? selectedCampaign?.exampleVideoUrl
                      : campaigns[0]?.exampleVideoUrl}
                  </a>
                </div>
                <section className=" border-b border-input py-4 text-sm">
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <p className="font-thin w-2/12">Brief Title:</p>
                      <p className="font-semibold">{
                      selectedCampaign !== null
                        ? selectedCampaign?.briefTitle
                        : campaigns[0]?.briefTitle
                    }</p>
                    </div>
                    <div className="flex gap-2">
                      <p className="font-thin w-2/12">Brief Description:</p>
                      <p className="font-semibold">
                      {
                      selectedCampaign !== null
                        ? selectedCampaign?.briefDescription
                        : campaigns[0]?.briefDescription
                    }
                      </p>
                    </div>
                  </div>
                </section>
                <section className=" border-b border-input py-4 text-sm">
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <p className="font-thin w-2/12">Show Face:</p>
                      <p className="font-semibold">{
                      selectedCampaign !== null
                        ? selectedCampaign?.showFace
                        : campaigns[0]?.showFace
                    }</p>
                    </div>
                    <div className="flex gap-2">
                      <p className="font-thin w-2/12">Social Channels:</p>
                      <p className="">
                        {selectedCampaign !== null ? selectedCampaign.preferences.socialChannels.map(
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
                        ) : campaigns[0].preferences.socialChannels.map(
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
                        )}
                      </p>
                    </div>
                  </div>
                </section>
                <section className=" border-b border-input py-4">
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <p className="font-thin w-2/12">Video Style:</p>
                      <p className="font-light">
                        {selectedCampaign !== null ? selectedCampaign.preferences.videoStyle.map(
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
                        ) : campaigns[0].preferences.videoStyle.map(
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
                        )}
                      </p>
                    </div>
                  </div>
                </section>
                <section className="flex justify-end">
                  <button className="bg-gradient-to-r from-primary to-secondary text-white text-xs rounded px-8 py-2 font-semibold">Apply</button>
                </section>
              </div>
            </section>
          )}
        </div>
      </section>
    </div>
  );
};

export default Campaigns;
