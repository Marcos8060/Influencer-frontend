"use client";
import React, { useState } from "react";
import FilterInfuencer from "./FilterInfuencer";
import { influencerData } from "./influencerData";
import { HiArrowLongLeft } from "react-icons/hi2";
import { HiArrowLongRight } from "react-icons/hi2";
import Link from "next/link";

const chunkArray = (array, size) => {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, index) =>
    array.slice(index * size, index * size + size)
  );
};

const InfluencerArchives = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 30;
  const totalPages = Math.ceil(influencerData.length / itemsPerPage);

  //   get current page data
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = influencerData.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  const rows = chunkArray(currentData, 4);

  return (
    <div className="mt-16 md:px-12 px-4 mb-12 md:w-9/12 mx-auto">
      <h1 className="font-bold md:text-3xl text-2xl text-center">
        Influencers By Archives: Find Influencers
      </h1>
      <p className="text-center text-sm font-light">
        Make your data invisible by generating unlimited identities. The
        next-level in privacy protection for online and travel.
      </p>
      <FilterInfuencer />

      <div className="">
        {rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="grid md:grid-cols-4 gap-4 md:border-b border-input"
          >
            {row.map((data) => (
              <Link
                href={`/influencer/filter-influencer/${data.id}`}
                key={data.id}
                className="space-y-3 text-sm cursor-pointer hover:bg-background p-2 font-light text-color"
              >
                <p>{data.name}</p>
              </Link>
            ))}
          </div>
        ))}
      </div>
      <section className="flex gap-4 items-center justify-around my-8">
        <div className="flex items-center gap-2">
          <HiArrowLongLeft />
          <small className="text-xs">Prev 10</small>
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
          <small className="text-xs">Next 10</small>
          <HiArrowLongRight />
        </div>
      </section>
    </div>
  );
};

export default InfluencerArchives;
