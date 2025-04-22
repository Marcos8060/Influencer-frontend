"use client";
import { useAuth } from "@/assets/hooks/use-auth";
import { getTiktokProfile, getTiktokResponse } from "@/redux/features/socials";
import React, { useEffect, useState } from "react";
import { MdVerifiedUser } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";

const TiktokProfile = () => {
  const [loading, setLoading] = useState(false);
  const { tiktokProfile } = useSelector((store) => store.socials);
  const [isTiktokConnected, setIsTiktokConnected] = useState(false);
  const dispatch = useDispatch();
  const auth = useAuth();

  const handleTiktok = async () => {
    try {
      const response = await dispatch(getTiktokResponse(auth));
      const authUrl = response.message;
      // Redirect user to TikTok's authorization page
      window.location.href = authUrl;
    } catch (error) {
      console.error("TikTok auth failed:", error);
    }
  };

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await dispatch(getTiktokProfile(auth));
      if (response.statusCode === 404) {
        setIsTiktokConnected(false);
      } else {
        setIsTiktokConnected(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth) {
      fetchProfile();
    }
  }, []);
  return (
    <>
      {loading ? (
        <Skeleton
          baseColor="#E6E7EB"
          highlightColor="#f0f0f0"
          count={4}
          height={100}
        />
      ) : (
        <>
          {isTiktokConnected ? (
            <section className="flex flex-col text-color">
              <div className="bg-white shadow-sm rounded-xl p-4">
                <section className="md:flex justify-between">
                  <div className="flex gap-4">
                    <a href={tiktokProfile?.profileDeepLink} target="_blank">
                      <img
                        className="h-20 w-20 mx-auto object-cover rounded-full"
                        src={tiktokProfile?.avatarUrl}
                        alt=""
                      />
                    </a>
                    <div className="space-y-3">
                      <section className="flex items-center gap-2">
                        <p className="font-bold text-xl">
                          {tiktokProfile?.displayName}
                        </p>
                        {tiktokProfile?.isVerified && (
                          <MdVerifiedUser className="text-link" />
                        )}
                      </section>
                      <section>
                        <p>{tiktokProfile?.username}</p>
                      </section>
                      <section className="flex items-center gap-6">
                        <p className="font-light">
                          <span className="font-bold">
                            {tiktokProfile?.followingCount}
                          </span>{" "}
                          Following
                        </p>
                        <p className="font-light">
                          <span className="font-bold">
                            {tiktokProfile?.followerCount}
                          </span>{" "}
                          Followers
                        </p>
                        <p className="font-light">
                          <span className="font-bold">
                            {tiktokProfile?.likesCount}
                          </span>{" "}
                          Likes
                        </p>
                      </section>
                      <section>
                        <p className="italic font-light text-sm">
                          {tiktokProfile?.bioDescription}
                        </p>
                      </section>
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={handleTiktok}
                      className="bg-gradient-to-r from-primary to-secondary text-xs text-white px-4 py-2 rounded"
                    >
                      Reconnect Account
                    </button>
                  </div>
                </section>
              </div>
            </section>
          ) : (
            <section className="flex items-center justify-center h-[50vh] text-color border border-dashed  border-primary rounded-xl">
              <button
                onClick={handleTiktok}
                className="bg-gradient-to-r from-primary to-secondary text-xs text-white px-4 py-2 rounded"
              >
                Connect My Account
              </button>
            </section>
          )}
        </>
      )}
    </>
  );
};

export default TiktokProfile;
