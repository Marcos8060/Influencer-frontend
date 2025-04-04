"use client";
import React from "react";
import { FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { IoLogoTiktok } from "react-icons/io5";
import { FaRegEnvelope } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { HiArrowNarrowLeft } from "react-icons/hi";
import Link from "next/link";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";
import { FaBoxOpen } from "react-icons/fa";

const BucketListInfluencers = ({ loading }) => {
  const { influencersInBucket } = useSelector((store) => store.bucket);
  return (
    <>
      <section className="py-4 bg-background">
        <Link
          href="/brand/influencer-discovery"
          className="text-color flex items-center gap-2"
        >
          <HiArrowNarrowLeft />
          <p className="font-semibold">Back to Buckets</p>
        </Link>
        {loading ? (
          <Skeleton
            baseColor="#E6E7EB"
            highlightColor="#f0f0f0"
            count={5}
            height={100}
          />
        ) : (
          <>
            {influencersInBucket.length > 0 ? (
              <section className="grid md:grid-cols-5 grid-cols-1 gap-4 mb-2">
                {influencersInBucket.map((data, index) => (
                  <div
                    key={index}
                    className="bg-white shadow-xl rounded-lg p-4"
                  >
                    <img
                      className="h-[180px] w-full object-cover rounded-md mb-1"
                      src={data.profilePicture}
                      alt=""
                    />
                    <section className="border-b border-input flex items-center justify-between mb-2">
                      <div>
                        <p className="text-sm font-bold">{data.fullName}</p>
                        <small className="text-color text-xs">
                          {data.city}, {data.country}
                        </small>
                      </div>
                      <div>
                        <p className="text-sm font-bold">10M</p>
                        <small className="text-color text-xs">Followers</small>
                      </div>
                    </section>
                    <div className="space-y-2">
                      <section className="flex items-center justify-between">
                        <div className="flex items-center justify-between gap-4 text-xs">
                          <FaYoutube className="text-red" />
                          <FaInstagram />
                          <IoLogoTiktok />
                        </div>
                        <div>
                          <small className="text-[10px] bg-background rounded-3xl py-1 px-2">
                            Entertainment
                          </small>
                        </div>
                      </section>
                      <section className="flex items-center justify-between">
                        <div className="flex items-center justify-between gap-4 text-xs">
                          <small className="text-[11px]">
                            Advertising Price
                          </small>
                        </div>
                        <div>
                          <small className="text-xs font-bold">$5000</small>
                        </div>
                      </section>
                      <section className="flex items-center justify-between">
                        <div className="flex items-center justify-between gap-4 text-xs">
                          <FaRegEnvelope />
                          <FaHeart />
                        </div>
                        <div>
                          <small className="text-[10px] bg-background rounded py-2 px-2">
                            Send Message
                          </small>
                        </div>
                      </section>
                    </div>
                  </div>
                ))}
              </section>
            ) : (
              <section className="h-[60vh] flex items-center justify-center">
                <div className="flex flex-col items-center justify-center">
                  <FaBoxOpen className="text-9xl text-gray" />
                  <p className="mr-4 text-sm font-light">
                    No Influencers available in this Bucket
                  </p>
                </div>
              </section>
            )}
          </>
        )}
      </section>
    </>
  );
};

export default BucketListInfluencers;
