"use client";
import { useAuth } from "@/assets/hooks/use-auth";
import { getInstagramProfile, getInstagramResponse, getTiktokProfile } from "@/redux/features/socials";
import React, { useEffect, useState } from "react";
import { MdVerifiedUser } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";

const InstagramProfile = () => {
  const [loading, setLoading] = useState(false);
  const { instagramProfile } = useSelector((store) => store.socials);
  const [isInstagramConnected,setisInstagramConnected] = useState(false)
  const dispatch = useDispatch();
  const auth = useAuth();
  console.log(instagramProfile)

  const handleInstagramLogin = async () => {
    try {
      const response = await dispatch(getInstagramResponse(auth));
      const authUrl = response.message;
      // Redirect user to TikTok's authorization page
      const url = 'https://www.instagram.com/oauth/authorize?enable_fb_login=0&force_authentication=1&client_id=1630927701133160&redirect_uri=https://influencer-frontend-nu.vercel.app/auth/instagram-callback&response_type=code&scope=instagram_business_basic%2Cinstagram_business_manage_messages%2Cinstagram_business_manage_comments%2Cinstagram_business_content_publish%2Cinstagram_business_manage_insights';
      window.location.href =  url
    } catch (error) {
      console.error("Instagram auth failed:", error);
    }
  };

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await dispatch(getInstagramProfile(auth));
      if(response.statusCode === 404){
        setisInstagramConnected(false);
      }else{
        setisInstagramConnected(true);
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
          {isInstagramConnected ? (
            <section className="flex flex-col items-center justify-center h-[50vh] text-color">
              <div className="bg-white rounded-xl p-4">
                <section className="md:flex gap-6 justify-between">
                  <a href={instagramProfile?.profileDeepLink} target="_blank">
                    <img
                      className="h-36 w-36 mx-auto object-cover rounded-full"
                      src={instagramProfile?.avatarUrl}
                      alt=""
                    />
                  </a>
                  <div className="space-y-3">
                    <section className="flex items-center gap-2">
                      <p className="font-bold text-xl">
                        {instagramProfile?.displayName}
                      </p>
                      {instagramProfile?.isVerified && (
                        <MdVerifiedUser className="text-link" />
                      )}
                    </section>
                    <section>
                      <p>{instagramProfile?.username}</p>
                    </section>
                    <section className="flex items-center gap-6">
                      <p className="font-light">
                        <span className="font-bold">
                          {instagramProfile?.followingCount}
                        </span>{" "}
                        Following
                      </p>
                      <p className="font-light">
                        <span className="font-bold">
                          {instagramProfile?.followerCount}
                        </span>{" "}
                        Followers
                      </p>
                      <p className="font-light">
                        <span className="font-bold">
                          {instagramProfile?.likesCount}
                        </span>{" "}
                        Likes
                      </p>
                    </section>
                    <section>
                      <p className="italic font-light text-sm">
                        {instagramProfile?.bioDescription}
                      </p>
                    </section>
                  </div>
                </section>
              </div>
              <section className="flex justify-center mt-2 text-color">
              <button
                onClick={handleInstagramLogin}
                className="border border-rounded-xl text-xs text-color px-4 py-2 rounded"
              >
                Reconnect Account
              </button>
            </section>
            </section>
          ) : (
            <section className="flex items-center justify-center h-[50vh] text-color border border-dashed  border-primary rounded-xl">
              <button
                onClick={handleInstagramLogin}
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

export default InstagramProfile;
