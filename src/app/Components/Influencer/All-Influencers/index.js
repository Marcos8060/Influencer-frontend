'use client'
import React,{ useState } from "react";
import { results } from "../FilterInfluencer/filterResultsData";
import { HiArrowLongLeft } from "react-icons/hi2";
import { HiArrowLongRight } from "react-icons/hi2";

const chunkArray = (array, size) => {
    return Array.from({ length: Math.ceil(array.length / size) }, (_, index) =>
      array.slice(index * size, index * size + size)
    );
  };
const AllInfluencers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(results.length / itemsPerPage);

  //   get current page data
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = results.slice(startIndex, startIndex + itemsPerPage);
  const rows = chunkArray(currentData, 1);
  return (
    <>
      <section className="filterResult w-full">
        <div className="min-w-[800px] border-t border-input">
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
                  <div className="flex items-center gap-2">
                    <img
                      className="w-16 h-16 rounded-full object-cover"
                      src={data.img}
                      alt=""
                    />
                    <small className="font-bold">katiebrueckner</small>
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-sm">1.3M</p>
                    <small className="font-light">Followers</small>
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-sm">15.43%</p>
                    <small className="font-light">Engagement Rate</small>
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-sm">193169</p>
                    <small className="font-light">Average Likes</small>
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-sm">193169</p>
                    <small className="font-light">Average Comments</small>
                  </div>
                  <div className="text-center">
                    <button className="border border-primary text-xs px-3 py-2 rounded ">
                      Add To Bucket List
                    </button>
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
