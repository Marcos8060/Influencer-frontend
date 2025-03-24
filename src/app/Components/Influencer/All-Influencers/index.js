"use client";
import React, { useState, useEffect, Suspense } from "react";
import { HiArrowLongLeft } from "react-icons/hi2";
import { HiArrowLongRight } from "react-icons/hi2";
import { FaUserCircle } from "react-icons/fa";
import AddToBucketListModal from "./add-to-bucket-modal";
import { useAuth } from "@/assets/hooks/use-auth";
import { getAllInfluencers } from "@/redux/features/influencer/filter";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";
import FiltersDrawer from "./filters-drawer";
import { TiEye } from "react-icons/ti";
import { useRouter } from "next/navigation";

const chunkArray = (array, size) => {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, index) =>
    array.slice(index * size, index * size + size)
  );
};
const AllInfluencers = () => {
  const { influencers, filterResults } = useSelector(
    (store) => store.filterResults
  );
  const [selectedInfluencers, setSelectedInfluencers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const itemsPerPage = 8;
  const displayedInfluencers =
    filterResults.length > 0 ? filterResults : influencers;
  const totalPages = Math.ceil(displayedInfluencers?.length / itemsPerPage);
  const dispatch = useDispatch();
  const auth = useAuth();

  //   get current page data
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData =
    Array.isArray(displayedInfluencers) &&
    displayedInfluencers.slice(startIndex, startIndex + itemsPerPage);
  const rows = chunkArray(currentData, 1);

  const handleCheckboxChange = (influencer) => {
    setSelectedInfluencers((prevSelected) => {
      const isSelected = prevSelected.some((item) => item.id === influencer.id);
      return isSelected
        ? prevSelected.filter((item) => item.id !== influencer.id)
        : [...prevSelected, influencer];
    });
  };

  useEffect(() => {
    if (auth && influencers.length === 0) {
      setLoading(true);
      dispatch(getAllInfluencers(auth))
        .then((response) => {
          if (response.error) {
            throw new Error(response.error.message);
          }
        })
        .catch((error) => {
          toast.error(error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [auth, dispatch, influencers.length]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filterResults]);

  const handleViewProfile = (data) => {
    localStorage.setItem("influencerData", JSON.stringify(data));
    router.push(`/brand/influencer-discovery/influencerProfile/${data.userId}`);
  };

  return (
    <>
      <section className="flex items-center justify-between mt-4">
        <div>
          {Array.isArray(selectedInfluencers) &&
            selectedInfluencers.length > 0 && (
              <div className="">
                <AddToBucketListModal data={selectedInfluencers} />
              </div>
            )}
        </div>
        <Suspense fallback={<div>Loading filters...</div>}>
          <FiltersDrawer />
        </Suspense>
      </section>

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
                  <th className="w-[150px] p-3">Full Name</th>
                  <th className="w-[150px] p-3">Country</th>
                  <th className="w-[150px] p-3">City</th>
                  <th className="w-[150px] p-3">Race</th>
                  <th className="w-[150px] p-3 text-center">View Profile</th>
                  <th className="w-[150px] p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((data) => (
                  <tr
                    key={data.id}
                    className="border-b border-input text-center text-xs"
                  >
                    <td className="p-3 flex items-center gap-3">
                      <input
                        className="cursor-pointer scale-150"
                        type="checkbox"
                        checked={selectedInfluencers.some(
                          (item) => item.id === data.id
                        )}
                        onChange={() => handleCheckboxChange(data)}
                      />
                      {!data.profilePicture ? (
                        <FaUserCircle className="w-12 h-12" />
                      ) : (
                        <img
                          className="w-12 h-12 rounded-full object-cover"
                          src={data.profilePicture}
                          alt=""
                        />
                      )}
                      <p className="font-semibold text-color">
                        {data?.fullName}
                      </p>
                    </td>
                    <td className="p-3">{data?.country}</td>
                    <td className="p-3">{data?.city}</td>
                    <td className="p-3">{data.ethnicBackground}</td>

                    {/* ✅ FIXED: Center the eye icon correctly */}
                    <td className="p-3">
                      <div className="flex justify-center">
                        <TiEye
                          onClick={() => handleViewProfile(data)}
                          className="text-xl text-color cursor-pointer"
                        />
                      </div>
                    </td>

                    <td className="p-3 flex justify-center">
                      <AddToBucketListModal {...{ data }} />
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

export default AllInfluencers;
