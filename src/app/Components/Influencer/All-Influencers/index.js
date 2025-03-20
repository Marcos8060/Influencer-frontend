"use client";
import React, { useState, useEffect } from "react";
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

const chunkArray = (array, size) => {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, index) =>
    array.slice(index * size, index * size + size)
  );
};
const AllInfluencers = () => {
  const { influencers } = useSelector((store) => store.filterResults);
  const [selectedInfluencers, setSelectedInfluencers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(influencers?.length / itemsPerPage);
  const dispatch = useDispatch();
  const auth = useAuth();

  //   get current page data
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData =
    Array.isArray(influencers) &&
    influencers.slice(startIndex, startIndex + itemsPerPage);
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
        <div className="">
          <FiltersDrawer />
        </div>
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
          <section className="filterResult w-full mt-2 ">
            <div className="min-w-[800px] h-[65vh] ">
              <div className="flex items-center justify-between w-full bg-gradient-to-r from-background text-xs text-color uppercase px-2 py-3 border border-input rounded-t-lg">
                <div className="text-center w-1/6">Full Name</div>
                <div className="text-center w-1/6">Country</div>
                <div className="text-center w-1/6">City</div>
                <div className="text-center w-1/6">Race</div>
                <div className="text-center w-1/6">Tags</div>
                <div className="text-center w-1/6">Actions</div>
              </div>
              {rows.map((row, rowIndex) => (
                <div
                  key={rowIndex}
                  className="border-b border-r border-l border-input p-4"
                >
                  {row.map((data) => (
                    <section
                      key={data.id}
                      className="flex items-center justify-between w-full text-color"
                    >
                      <div className="flex items-center gap-3 w-1/6">
                        <input
                          className="cursor-pointer scale-150"
                          type="checkbox"
                          checked={selectedInfluencers.some(
                            (item) => item.id === data.id
                          )}
                          onChange={() => handleCheckboxChange(data)}
                        />
                        {!data.img ? (
                          <FaUserCircle className="text-2xl" />
                        ) : (
                          <img
                            className="w-16 h-16 rounded-full object-cover"
                            src={data.img}
                            alt=""
                          />
                        )}
                        <small className="font-semibold text-color">{data?.fullName}</small>
                      </div>
                      <div className="text-center w-1/6">
                        <small className="font-light">{data?.country}</small>
                      </div>
                      <div className="text-center w-1/6">
                        <small className="font-light">{data.city}</small>
                      </div>
                      <div className="text-center w-1/6">
                        <small className="font-light">
                          {data.ethnicBackground.map((item, index) => (
                            <small key={index}>{item}</small>
                          ))}
                        </small>
                      </div>
                      <div className="text-center w-1/6">
                        <small className="font-light">
                          {Array.isArray(data.tags) &&
                            data.tags.map((item, index) => (
                              <small key={index}>{item}</small>
                            ))}
                        </small>
                      </div>

                      <div className="text-center w-1/6">
                        <AddToBucketListModal {...{ data }} />
                      </div>
                    </section>
                  ))}
                </div>
              ))}
            </div>
          </section>
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
        </>
      )}
    </>
  );
};

export default AllInfluencers;
