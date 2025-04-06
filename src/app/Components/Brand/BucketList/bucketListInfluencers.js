"use client";
import React from "react";
import { FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { IoLogoTiktok } from "react-icons/io5";
import { FaRegEnvelope } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { HiArrowNarrowLeft } from "react-icons/hi";
import Link from "next/link";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";
import { FaBoxOpen } from "react-icons/fa";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { removeFromBucket } from "@/redux/services/influencer/bucket";
import { usePathname } from "next/navigation";
import { useAuth } from "@/assets/hooks/use-auth";
import { fetchAllInfluencersInBucket } from "@/redux/features/bucket-list";
import toast from "react-hot-toast";

const BucketListInfluencers = ({ loading }) => {
  const { influencersInBucket } = useSelector((store) => store.bucket);
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);
  const bucketId = segments[segments.length - 1];
  const dispatch = useDispatch();
  const auth = useAuth();
  
  const handleSubmit = async(id) => {
    const payload = {
      brandBucketList: bucketId,
      influencerIds:[String(id)]
    }
    try {
      await removeFromBucket(auth,payload)
      dispatch(fetchAllInfluencersInBucket(auth,bucketId))
      toast.success('Influencer removed successfully')
    } catch (error) {
      toast.error(error.response.data.errorMessage[0])
      console.log(error)
    }
  }
  return (
    <>
      <section className="py-4 bg-background">
        <Link
          href="/brand/influencer-discovery"
          className="flex items-center gap-2 mb-3 text-link"
        >
          <HiArrowNarrowLeft />
          <p className="font-semibold text-sm">Back To My Buckets</p>
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
                          <small onClick={() => handleSubmit(data.influencerId)} className="text-[10px] cursor-pointer bg-secondary text-white rounded py-2 px-2">
                            Remove From Bucket
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
