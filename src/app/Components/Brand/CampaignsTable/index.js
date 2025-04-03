"use client";
import React, { useState, useEffect, Suspense } from "react";
import { HiArrowLongLeft } from "react-icons/hi2";
import { HiArrowLongRight } from "react-icons/hi2";
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "@/assets/hooks/use-auth";
import { getAllInfluencers } from "@/redux/features/influencer/filter";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";
import { useRouter } from "next/navigation";
import { fetchAllBrandCampaigns } from "@/redux/features/stepper/campaign-stepper";

const chunkArray = (array, size) => {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, index) =>
    array.slice(index * size, index * size + size)
  );
};
const CampaignsTable = () => {
  const { brandCampaigns } = useSelector((store) => store.campaign);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(brandCampaigns?.length / itemsPerPage);
  const dispatch = useDispatch();
  const router = useRouter();
  const auth = useAuth();

  //   get current page data
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData =
    Array.isArray(brandCampaigns) &&
    brandCampaigns.slice(startIndex, startIndex + itemsPerPage);

  const getCampaigns = async () => {
    try {
      setLoading(true);
      await dispatch(fetchAllBrandCampaigns(auth));
      toast.success('Campaigns fetched successfully')
    } catch (error) {
        toast.error('Something went wrong')
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth && brandCampaigns.length === 0) {
      getCampaigns();
    }
  }, [auth]);

  const handleViewProfile = (data) => {
    localStorage.setItem("influencerData", JSON.stringify(data));
    router.push(`/brand/campaign-report/${data.brandId}`);
  };

  return (
    <>
      {loading ? (
        <Skeleton
          baseColor="#E6E7EB"
          highlightColor="#f0f0f0"
          count={4}
          height={100}
        />
      ) : (
        <>
          <div className="w-full overflow-x-auto h-[65vh] my-2">
            <table className="w-full min-w-[1000px] border border-input table-fixed">
              <thead className="bg-background uppercase text-xs text-color border-b border-input">
                <tr>
                  <th className="w-[150px] p-3">Title</th>
                  <th className="w-[150px] p-3">Status</th>
                  <th className="w-[150px] p-3">Description</th>
                  <th className="w-[150px] p-3">No. of Influencers</th>
                  <th className="w-[150px] p-3 text-center">Start Date</th>
                  <th className="w-[150px] p-3 text-center">End Date</th>
                  <th className="w-[150px] p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((data) => (
                  <tr
                    key={data.id}
                    className="border-b border-input text-center text-xs"
                  >
                    <td className="p-3 flex items-center gap-3">
                      <p className="font-semibold text-color">{data.title}</p>
                    </td>
                    <td className="p-3">{data.status}</td>
                    <td className="p-3">{data?.description}</td>
                    <td className="p-3">{data?.numberOfInfluencers}</td>
                    <td className="p-3">{data.startDate}</td>
                    <td className="p-3">{data.endDate}</td>

                    {/* ✅ FIXED: Center the eye icon correctly */}
                    <td className="p-3">
                      <div className="flex justify-center">
                        <button onClick={() => handleViewProfile(data)} className="border border-primary rounded px-4 py-2 text-xs">View Report</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* pagination */}
            <section className="flex gap-4 items-center justify-around my-8">
              <div className="flex items-center gap-2">
                <HiArrowLongLeft />
                <small className="text-xs">Prev {itemsPerPage}</small>
              </div>
              <div className="space-x-6 text-sm">
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    className={` ${
                      currentPage === index + 1
                        ? "font-bold text-primary border-b-2"
                        : "font-thin text-color"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <small className="text-xs">Next {itemsPerPage}</small>
                <HiArrowLongRight />
              </div>
            </section>
          </div>
        </>
      )}
    </>
  );
};

export default CampaignsTable;
