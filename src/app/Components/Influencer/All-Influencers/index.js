"use client";
import React, { useState } from "react";
import { HiArrowLongLeft } from "react-icons/hi2";
import { HiArrowLongRight } from "react-icons/hi2";
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "@/assets/hooks/use-auth";
import AddToBucketListModal from "./add-to-bucket-modal";

const chunkArray = (array, size) => {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, index) =>
    array.slice(index * size, index * size + size)
  );
};
const AllInfluencers = ({ filterResults }) => {
  const [selectedInfluencers, setSelectedInfluencers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(filterResults?.length / itemsPerPage);
  const auth = useAuth();

  //   get current page data
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData =
    Array.isArray(filterResults) &&
    filterResults.slice(startIndex, startIndex + itemsPerPage);
  const rows = chunkArray(currentData, 1);

  const handleCheckboxChange = (influencer) => {
    setSelectedInfluencers((prevSelected) => {
      const isSelected = prevSelected.some((item) => item.id === influencer.id);
      return isSelected
        ? prevSelected.filter((item) => item.id !== influencer.id) // Remove if already selected
        : [...prevSelected, influencer]; // Add if not selected
    });
  };


  return (
    <>
      {Array.isArray(selectedInfluencers) && selectedInfluencers.length > 0 && (
        <div className=" mb-2">
          <AddToBucketListModal data={selectedInfluencers} />
        </div>
      )}
      <section className="filterResult w-full">
        <div className="min-w-[800px] border-t border-input h-[70vh]">
          {rows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="border-b border-r border-l border-input p-4"
            >
              {row.map((data) => (
                <section
                  key={data.id}
                  className="flex items-center gap-4 justify-between w-full text-color"
                >
                  <div className="flex items-center gap-3">
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
                    <small className="font-bold">{data?.fullName}</small>
                  </div>
                  <div className="text-center">
                    <small className="font-light">{data?.email}</small>
                  </div>
                  <div className="text-center">
                    <small className="font-light">{data.country}</small>
                  </div>
                  <div className="text-center">
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
  );
};

export default AllInfluencers;
