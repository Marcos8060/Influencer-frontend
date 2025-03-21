"use client";
import React, { useEffect, useState } from "react";
import { HiArrowLongLeft } from "react-icons/hi2";
import { HiArrowLongRight } from "react-icons/hi2";
import BucketListDialog from "./bucket-list-dialog";
import { fetchAllBuckets } from "@/redux/features/bucket-list";
import { useAuth } from "@/assets/hooks/use-auth";
import { useSelector, useDispatch } from "react-redux";
import ConfirmDialog from "./confirmDialog";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";
import EditBucketListDialog from "./edit-bucket-list";

const chunkArray = (array, size) => {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, index) =>
    array.slice(index * size, index * size + size)
  );
};
const BucketList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { bucketList } = useSelector((store) => store.bucket);
  const dispatch = useDispatch();

  const itemsPerPage = 8;
  const totalPages = Math.ceil(bucketList.length / itemsPerPage);

  const auth = useAuth();

  //   get current page data
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData =
    Array.isArray(bucketList) &&
    bucketList.slice(startIndex, startIndex + itemsPerPage);
  const rows = chunkArray(currentData, 1);

  useEffect(() => {
    if (auth && bucketList.length === 0) {
      setLoading(true);
      dispatch(fetchAllBuckets(auth))
        .then(() => {})
        .catch(() => {
          setLoading(false);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [auth, bucketList.length]);

  return (
    <>
      <section className="flex items-center justify-end my-4">
        <div className="flex items-center gap-4">
          <button className="border border-primary text-primary rounded-3xl text-xs px-4 py-3">
            Add to Campaign
          </button>
          <BucketListDialog />
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
        <div>
          <section className="filterResult w-full h-[70vh]">
            {/* Table Header */}
            <div className="min-w-[800px] flex items-center justify-between bg-background uppercase text-xs text-color p-3 border border-input rounded-t-lg">
              <div className="text-center w-1/5">Bucket Name</div>
              <div className="text-center w-1/5">Description</div>
              <div className="text-center w-1/5">No. Of Influencers</div>
              <div className="text-center w-1/5">Created At</div>
              <div className="text-center w-1/5">Action</div>
            </div>

            {/* Table Body */}
            <div className="min-w-[800px] border border-input border-t-0">
              {rows.map((row, rowIndex) => (
                <div key={rowIndex} className="border-b border-input">
                  {row.map((data) => (
                    <section
                      key={data.id}
                      className="flex items-center justify-between w-full text-color p-4"
                    >
                      <div className="text-left w-1/5">
                        <small className="font-light">{data?.name}</small>
                      </div>
                      <div className="text-center w-1/5">
                        <small className="font-light">
                          {data?.description}
                        </small>
                      </div>
                      <div className="text-center w-1/5">
                        <small className="font-light">{data.influencers.length}</small>
                      </div>
                      <div className="text-center w-1/5">
                        <small className="font-light">
                          {new Date(data.createdAt).toLocaleDateString()}
                        </small>
                      </div>
                      <div className="text-center w-1/5 flex justify-center gap-2">
                        <EditBucketListDialog {...{ data }} />
                        <ConfirmDialog {...{ data }} />
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
        </div>
      )}
    </>
  );
};

export default BucketList;
