"use client";
import React, { useEffect, useState } from "react";
import { HiArrowLongLeft, HiArrowLongRight } from "react-icons/hi2";
import BucketListDialog from "./bucket-list-dialog";
import { fetchAllBuckets } from "@/redux/features/bucket-list";
import { useAuth } from "@/assets/hooks/use-auth";
import { useSelector, useDispatch } from "react-redux";
import ConfirmDialog from "./confirmDialog";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";
import EditBucketListDialog from "./edit-bucket-list";
import { TiEye } from "react-icons/ti";
import Link from "next/link";
import { FaBoxOpen } from "react-icons/fa";

const BucketList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { bucketList } = useSelector((store) => store.bucket);
  const dispatch = useDispatch();

  const itemsPerPage = 8;
  const totalPages = Math.ceil(bucketList.length / itemsPerPage);
  const auth = useAuth();

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData =
    Array.isArray(bucketList) &&
    bucketList.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    if (auth && bucketList.length === 0) {
      setLoading(true);
      dispatch(fetchAllBuckets(auth)).finally(() => setLoading(false));
    }
  }, [auth, bucketList.length]);

  return (
    <>
      <section className="flex items-center justify-end my-4">
        <div className="flex items-center gap-4">
          <button className="border border-primary text-primary rounded text-xs px-4 py-3">
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
        <>
          {currentData.length > 0 ? (
            <div className="w-full overflow-x-auto h-[65vh]">
              <table className="w-full min-w-[1000px] border border-input table-fixed">
                <thead className="bg-gradient-to-r from-primary to-secondary uppercase text-xs text-white ">
                  <tr>
                    <th className="w-[150px] p-3">Bucket Name</th>
                    <th className="w-[200px] p-3">Description</th>
                    <th className="w-[150px] p-3">No. Of Influencers</th>
                    <th className="w-[150px] p-3">Created At</th>
                    <th className="w-[150px] p-3 text-center">View</th>
                    <th className="w-[200px] p-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.map((data) => (
                    <tr
                      key={data.id}
                      className="border-b border-input text-center text-xs"
                    >
                      <td className="p-3">{data?.name}</td>
                      <td className="p-3 truncate">{data?.description}</td>
                      <td className="p-3">{data.influencers.length}</td>
                      <td className="p-3">
                        {new Date(data.createdAt).toLocaleDateString()}
                      </td>

                      {/* ✅ FIXED: Center the eye icon correctly */}
                      <td className="p-3">
                        <Link
                          href={`/brand/influencer-discovery/influencerBuckets/${data.id}`}
                          className="flex justify-center"
                        >
                          <TiEye className="text-xl text-color cursor-pointer" />
                        </Link>
                      </td>

                      <td className="p-3 flex justify-center gap-2">
                        <EditBucketListDialog {...{ data }} />
                        <ConfirmDialog {...{ data }} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination */}
              <section className="flex gap-4 items-center justify-around my-8">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  className="flex items-center gap-2 text-xs"
                >
                  <HiArrowLongLeft />
                  Prev {itemsPerPage}
                </button>
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
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  className="flex items-center gap-2 text-xs"
                >
                  Next {itemsPerPage}
                  <HiArrowLongRight />
                </button>
              </section>
            </div>
          ) : (
            <section className="h-[60vh] flex items-center justify-center">
              <div className="flex flex-col items-center justify-center">
                <FaBoxOpen className="text-9xl text-gray" />
                <p className="mr-4 text-sm font-light">No Buckets available in your Repository</p>
              </div>
            </section>
          )}
        </>
      )}
    </>
  );
};

export default BucketList;
