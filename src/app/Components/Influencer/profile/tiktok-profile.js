"use client";
import { useAuth } from "@/assets/hooks/use-auth";
import { getTiktokProfile } from "@/redux/features/socials";
import React, { useEffect, useState } from "react";
import { MdVerifiedUser } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";

const TiktokProfile = () => {
  const [loading, setLoading] = useState(false);
  const { tiktokProfile } = useSelector((store) => store.socials);
  const dispatch = useDispatch();
  const auth = useAuth();

  const fetchProfile = async () => {
    try {
      setLoading(true);
      await dispatch(getTiktokProfile(auth));
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
  }, [auth]);
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
        <section className="flex items-center justify-center h-[50vh] text-color">
          <div className="bg-white rounded-xl p-4">
            <section className="flex gap-6 justify-between">
              <a href={tiktokProfile.profileDeepLink} target="_blank">
                <img
                  className="h-36 w-36 object-cover rounded-full"
                  src={tiktokProfile.avatarUrl}
                  alt=""
                />
              </a>
              <div className="space-y-3">
                <section className="flex items-center gap-2">
                  <p className="font-bold text-xl">
                    {tiktokProfile.displayName}
                  </p>
                  {tiktokProfile.isVerified && (
                    <MdVerifiedUser className="text-link" />
                  )}
                </section>
                <section>
                  <p>{tiktokProfile.username}</p>
                </section>
                <section className="flex items-center gap-6">
                  <p className="font-light">
                    <span className="font-bold">
                      {tiktokProfile.followingCount}
                    </span>{" "}
                    Following
                  </p>
                  <p className="font-light">
                    <span className="font-bold">
                      {tiktokProfile.followerCount}
                    </span>{" "}
                    Followers
                  </p>
                  <p className="font-light">
                    <span className="font-bold">
                      {tiktokProfile.likesCount}
                    </span>{" "}
                    Likes
                  </p>
                </section>
                <section>
                  <p className="italic font-light text-sm">
                    {tiktokProfile.bioDescription}
                  </p>
                </section>
              </div>
            </section>
          </div>
        </section>
      )}
    </>
  );
};

export default TiktokProfile;
