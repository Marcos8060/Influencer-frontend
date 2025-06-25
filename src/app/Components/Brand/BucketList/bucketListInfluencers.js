"use client";
import React from "react";
import { FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { IoLogoTiktok } from "react-icons/io5";
import { FaRegEnvelope } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { HiArrowNarrowLeft } from "react-icons/hi";
import Link from "next/link";
import "react-loading-skeleton/dist/skeleton.css";
import { FaBoxOpen } from "react-icons/fa";
import { removeFromBucket } from "@/redux/services/influencer/bucket";
import { usePathname } from "next/navigation";
import { useAuth } from "@/assets/hooks/use-auth";
import { fetchAllInfluencersInBucket } from "@/redux/features/bucket-list";
import { Spin, Modal, Button, Tooltip, Tag, message } from "antd";
import { FaFacebook, FaTwitter } from "react-icons/fa";

const BucketListInfluencers = ({ loading }) => {
  const { influencersInBucket } = useSelector((store) => store.bucket);
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);
  const bucketId = segments[segments.length - 1];
  const dispatch = useDispatch();
  const auth = useAuth();
  const [removingId, setRemovingId] = React.useState(null);
  
  const handleSubmit = async(id) => {
    setRemovingId(id);
    const payload = {
      brandBucketList: bucketId,
      influencerIds:[String(id)]
    }
    try {
      await removeFromBucket(auth,payload)
      dispatch(fetchAllInfluencersInBucket(auth,bucketId))
      message.success('Influencer removed successfully')
    } catch (error) {
      message.error(error?.response?.data?.errorMessage?.[0] || 'Failed to remove influencer')
      console.log(error)
    } finally {
      setRemovingId(null);
    }
  }

  // Helper to truncate bio
  const truncate = (str, n) => (str && str.length > n ? str.slice(0, n) + '...' : str);

  return (
    <>
      <section className="py-4 bg-background">
        <Link
          href="/brand/buckets"
          className="flex items-center gap-2 mb-3 text-link"
        >
          <HiArrowNarrowLeft />
          <p className="font-semibold text-sm">Back To My Buckets</p>
        </Link>
        {loading ? (
          <div className="flex justify-center items-center h-[40vh]">
            <Spin size="large" tip="Loading influencers..." />
          </div>
        ) : (
          <>
            {influencersInBucket.length > 0 ? (
              <section className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 mb-2">
                {influencersInBucket.map((data, index) => (
                  <div
                    key={index}
                    className="bg-white shadow-lg rounded-2xl p-5 flex flex-col hover:shadow-2xl transition-shadow duration-200 border border-input relative min-h-[420px]"
                  >
                    <div className="relative mb-4 flex flex-col items-center">
                      <img
                        className="h-[120px] w-[120px] object-cover rounded-full border-4 border-primary shadow"
                        src={data.profilePicture}
                        alt={data.fullName}
                      />
                      <div className="flex gap-2 mt-3">
                        {data.isInstagramAccountConnected && (
                          <Tooltip title="Instagram"><FaInstagram className="text-pink-500 text-xl" /></Tooltip>
                        )}
                        {data.isTiktokAccountConnected && (
                          <Tooltip title="TikTok"><IoLogoTiktok className="text-black text-xl" /></Tooltip>
                        )}
                        {data.isFacebookAccountConnected && (
                          <Tooltip title="Facebook"><FaFacebook className="text-blue-600 text-xl" /></Tooltip>
                        )}
                        {data.isTwitterAccountConnected && (
                          <Tooltip title="Twitter"><FaTwitter className="text-blue-400 text-xl" /></Tooltip>
                        )}
                        {/* YouTube not in object, but if you add, use: data.isYoutubeAccountConnected */}
                      </div>
                    </div>
                    <section className="flex flex-col items-center text-center mb-2">
                      <Tooltip title={data.fullName}>
                        <p className="text-lg font-bold truncate max-w-[180px]">{data.fullName}</p>
                      </Tooltip>
                      <small className="text-color text-xs mb-1">
                        {data.city}{data.city && data.country ? ',' : ''} {data.country}
                      </small>
                      <span className="text-xs text-gray-500 font-medium mb-2">{data.gender}, Age {data.age}</span>
                      <span className="text-xs text-gray-500 font-medium mb-2">{data.email}</span>
                    </section>
                    <div className="mb-2 min-h-[40px]">
                      <Tooltip>
                        <span className="text-xs text-gray-700 block mb-1">{truncate(data.bio, 80)}</span>
                      </Tooltip>
                    </div>
                    <div className="flex flex-wrap gap-2 justify-center mb-3">
                      {(data.contentCategories || []).map((cat, i) => (
                        <Tag color="purple" key={i} className="text-[10px] px-2 py-1 rounded-3xl">{cat}</Tag>
                      ))}
                    </div>
                    <div className="flex-1" />
                    <div className="flex items-center justify-between mt-2">
                      <Button
                        type="primary"
                        danger
                        size="small"
                        loading={removingId === data.influencerId}
                        disabled={removingId === data.influencerId}
                        onClick={() => handleSubmit(data.influencerId)}
                        className="rounded px-4 text-xs font-semibold"
                      >
                        Remove
                      </Button>
                      <Tooltip title="Contact via Email">
                        <a href={`mailto:${data.email}`} target="_blank" rel="noopener noreferrer">
                          <Button icon={<FaRegEnvelope />} size="small" />
                        </a>
                      </Tooltip>
                    </div>
                  </div>
                ))}
              </section>
            ) : (
              <section className="h-[60vh] flex items-center justify-center">
                <div className="flex flex-col items-center justify-center">
                  <FaBoxOpen className="text-9xl text-gray-300" />
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
