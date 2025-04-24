"use client";
import React, { useEffect, useState } from "react";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";
import { FaUsersBetweenLines } from "react-icons/fa6";
import { FaUsersViewfinder } from "react-icons/fa6";
import { MdWorkHistory } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useAuth } from "@/assets/hooks/use-auth";
import { usePathname } from "next/navigation";
import { getAllCampaignDetails } from "@/redux/features/stepper/campaign-stepper";
import toast from "react-hot-toast";
import { GrInstagram } from "react-icons/gr";
import { IoLogoTiktok } from "react-icons/io5";


const CampaignReport = () => {
  const { campaignDetails } = useSelector((store) => store.campaign);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const auth = useAuth();

  const segments = pathname.split("/");
  const id = segments[segments.length - 1]; // Get last part of the URL

  const getCampaignDetails = async () => {
    try {
      setLoading(true);
      await dispatch(getAllCampaignDetails(auth, id));
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth) {
      getCampaignDetails();
    }
  }, [auth]);

  return (
    <div className="bg-background">
      <section className=" text-link w-full mx-auto rounded p-4 flex gap-2 items-center">
        <HiOutlineArrowNarrowLeft />
        <Link href="/brand/view-campaigns" className="font-semibold text-sm">
          Back Campaigns
        </Link>
      </section>
      <section className="p-4 text-color space-y-8 mb-8">
        <div className="w-full mx-auto space-y-4">
          <section className="grid md:grid-cols-4 grid-cols-1 md:gap-8 gap-4">
            <div className="bg-white rounded-2xl p-4 text-color shadow-lg text-center space-y-4">
              <div className="flex gap-2 items-center justify-between">
                <p className="font-light">No. of Applicants</p>
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
        </div>
      </section>
      <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-sm text-color">
        {/* Campaign Header */}
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          {/* Cover Image */}
          <div className="w-full md:w-2/5">
            <img
              src={campaignDetails.coverImage}
              alt={campaignDetails.title}
              className="w-full h-64 object-cover rounded-xl shadow-md"
            />
          </div>

          {/* Campaign Metadata */}
          <div className="w-full md:w-3/5 space-y-4">
            <div className="flex justify-between items-start">
              <h1 className="text-3xl font-bold text-gray-900">
                {campaignDetails.title}
              </h1>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                Active
              </span>
            </div>

            <p className="text-gray-600">{campaignDetails.description}</p>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Start Date</p>
                <p className="font-medium">
                  {new Date(campaignDetails.startDate).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">End Date</p>
                <p className="font-medium">
                  {new Date(campaignDetails.endDate).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="pt-4">
              <a
                href={campaignDetails.exampleVideoUrl}
                target="_blank"
                className="inline-flex items-center text-blue-600 hover:underline"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M6.3 2.8L14 7.5l-7.7 4.7L2 7.5l4.3-4.7zM2 12.5l7.7 4.7 7.7-4.7-7.7 4.7L2 12.5z" />
                </svg>
                View Example Video
              </a>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.isArray(campaignDetails.products) &&
              campaignDetails.products.map((product) => (
                <div
                  key={product.id}
                  className="border border-input rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                >
                  <img
                    src={product.productImages[0]?.url}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-medium text-lg">{product.name}</h3>
                    <p className="text-gray-600 text-sm mt-1">
                      {product.description}
                    </p>
                    <div className="mt-3 flex justify-start items-center">
                      <span className="font-bold text-sm">
                        ${product.price}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </section>

        {/* Campaign Brief */}
        <section className="mb-12 bg-gray-50 p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Campaign Brief
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">{campaignDetails.briefTitle}</h3>
              <p className="mt-1 text-sm">{campaignDetails.briefDescription}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">
                  Content Requirements
                </h4>
                <ul className="space-y-2 text-sm">
                  {Array.isArray(campaignDetails.preferences?.videoStyle) &&
                    campaignDetails.preferences?.videoStyle.map((style, i) => (
                      <li key={i} className="flex items-center">
                        <svg
                          className="w-4 h-4 mr-2 text-green"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {style}
                      </li>
                    ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Technical Specs</h4>
                <div className="space-y-3 text-sm">
                  <p>
                    <span className="text-secondary">Format:</span>{" "}
                    {campaignDetails.preferences?.videoFormat}
                  </p>
                  <p>
                    <span className="text-secondary">Duration:</span>{" "}
                    {campaignDetails.preferences?.videoDuration}s
                  </p>
                  <p>
                    <span className="text-secondary">Deliverables:</span>{" "}
                    {campaignDetails.preferences?.videosPerCreator} videos
                  </p>
                  <p>
                    <span className="text-secondary">Channels:</span>{" "}
                    {campaignDetails.preferences?.socialChannels.join(", ")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Influencer Collaborators Section */}
        <section className="mb-12">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                Collaboration Requests
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                {campaignDetails.collaborators?.length || 0} pending
                applications
              </p>
            </div>
            <button className="bg-gradient-to-r from-primary to-secondary text-white px-4 py-2 rounded-lg text-sm hover:opacity-90 transition-opacity shadow-sm flex items-center gap-2">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Invite Influencers
            </button>
          </div>

          {campaignDetails.collaborators?.length > 0 ? (
            <div className="bg-white rounded-xl border border-input overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-primary">
                  <thead className="bg-background">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Influencer
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Bio
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Platforms
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {campaignDetails.collaborators.map((collab, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                              {collab.influencerName.charAt(0)}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {collab.influencerName}
                              </div>
                              <div className="text-sm text-gray-500">
                                @
                                {collab.influencerName
                                  .toLowerCase()
                                  .replace(/\s+/g, "")}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 max-w-xs">
                          <p className="text-sm text-gray-500 line-clamp-2">
                            {collab.bio || "No bio provided"}
                          </p>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex gap-2">
                            {collab.isInstagramAccountConnected && (
                              <span className="text-xs">
                                <GrInstagram />
                              </span>
                            )}
                            {collab.isTiktokAccountConnected && (
                              <span className="text-xs">
                                <IoLogoTiktok />
                              </span>
                            )}
                            {collab.isTwitterAccountConnected && (
                              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                                X
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              collab.status === "approved"
                                ? "bg-green-100 text-green-800"
                                : collab.status === "rejected"
                                ? "bg-red-100 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {collab.status.charAt(0).toUpperCase() +
                              collab.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          {collab.status === "pending" ? (
                            <div className="flex justify-end gap-3">
                              <button
                                onClick={() =>
                                  handleApprove(collab.influencerId)
                                }
                                className="text-green-600 hover:text-green-900 font-medium text-sm"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() =>
                                  handleReject(collab.influencerId)
                                }
                                className="text-red-600 hover:text-red-900 font-medium text-sm"
                              >
                                Reject
                              </button>
                            </div>
                          ) : (
                            <button
                              className="text-gray-400 cursor-not-allowed text-sm"
                              disabled
                            >
                              Action taken
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-input p-8 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No collaboration requests
              </h3>
              <p className="mt-1 text-sm text-gray-500 mb-4">
                Get started by inviting influencers to your campaign.
              </p>
              <button className="bg-gradient-to-r from-primary to-secondary text-white px-4 py-2 rounded-lg text-sm hover:opacity-90 transition-opacity inline-flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Invite Influencers
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default CampaignReport;
