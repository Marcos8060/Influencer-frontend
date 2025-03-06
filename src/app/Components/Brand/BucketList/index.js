"use client";
import React, { useState } from "react";
import { HiArrowLongLeft } from "react-icons/hi2";
import { HiArrowLongRight } from "react-icons/hi2";
import { results } from "../../Influencer/FilterInfluencer/filterResultsData";
import BucketListDialog from "./bucket-list-dialog";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { bucketList } from "./buketListData";

const chunkArray = (array, size) => {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, index) =>
    array.slice(index * size, index * size + size)
  );
};
const BucketList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(bucketList.length / itemsPerPage);

  //   get current page data
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = bucketList.slice(startIndex, startIndex + itemsPerPage);
  const rows = chunkArray(currentData, 1);
  return (
    <>
      <section className="flex items-center justify-end mb-4">
        <div className="flex items-center gap-4">
          <button className="border border-primary text-primary rounded text-xs px-4 py-2">
            Add to Campaign
          </button>
          <BucketListDialog />
        </div>
      </section>
      <section className="filterResult w-full">
        <section className="flex gap-4 items-center w-full justify-between px-4 font-bold text-color">
          <div className="text-center basis-5/12 flex items-center justify-center">
            <p>List Name</p>
          </div>
          <div className="text-center basis-5/12 flex items-center justify-center">
            <p>Description</p>
          </div>
          <div className="text-center basis-5/12 flex items-center justify-center">
            <p>No of Influencers</p>
          </div>
          <div className="text-center basis-5/12 flex items-center justify-center">
            <p>Created At</p>
          </div>
          <div className="text-center basis-5/12 flex items-center justify-center">
            <p>Action</p>
          </div>
        </section>
        <div className="min-w-[800px] border-t border-input">
          {rows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="border-b border-r border-l border-input p-4"
            >
              {row.map((data,index) => (
                <section
                  key={index}
                  className="flex items-center gap-4 justify-between w-full text-color"
                >
                  <div className="text-center basis-5/12 flex items-center justify-center">
                    <small className="font-light">Crypto Campaign</small>
                  </div>
                  <div className="text-center basis-5/12 flex items-center justify-center">
                    <small className="font-light">Test Description</small>
                  </div>
                  <div className="text-center basis-5/12 flex items-center justify-center">
                    <small className="font-light">50</small>
                  </div>
                  <div className="text-center basis-5/12 flex items-center justify-center">
                    <small className="font-light">14/02/2024</small>
                  </div>
                  <div className="text-center basis-5/12 flex items-center justify-center cursor-pointer">
                  <HiOutlineDotsVertical />
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

export default BucketList;
