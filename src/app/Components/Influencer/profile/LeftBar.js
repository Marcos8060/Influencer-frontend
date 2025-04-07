"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "@/assets/hooks/use-auth";
import { fetchAllInfluencerDetails } from "@/redux/features/influencer/profile";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import { FaPhoneAlt } from "react-icons/fa";
import { RiGenderlessLine } from "react-icons/ri";
import EditDetailsModal from "./edit-details";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";
import EditProfilePhotoModal from "./edit-profile-photo";
import ConnectToSocialsMenu from "./connect-socials";

const LeftBar = () => {
  const { influencerDetails } = useSelector((store) => store.influencerProfile);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const auth = useAuth();

  useEffect(() => {
    if (auth && Object.keys(influencerDetails).length === 0) {
      setLoading(true);
      dispatch(fetchAllInfluencerDetails(auth))
        .then(() => {})
        .catch(() => {
          setLoading(false);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [auth, influencerDetails]);
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
        <section className="bg-white shadow-sm rounded-lg p-4 md:h-[70vh] text-color">
          <div className="flex items-center justify-between text-xs text-secondary font-bold mb-8">
            <p>Active</p>
            <EditDetailsModal {...{ influencerDetails }} />
          </div>
          <section className="flex items-center justify-center">
            <EditProfilePhotoModal {...{ influencerDetails }} />
          </section>
          <section className="flex items-center justify-center">
            <div className="flex items-center justify-center gap-1 my-4 text-color font-bold text-xl">
              <span>{influencerDetails?.firstName}</span>
              <span>{influencerDetails?.lastName}</span>
            </div>
          </section>
          <section className="flex items-center justify-center">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <MdOutlineMarkEmailRead />
                <small>{influencerDetails?.email}</small>
              </div>
              <div className="flex items-center gap-4">
                <FaPhoneAlt />
                <small>
                  {influencerDetails?.phoneNumber
                    ? influencerDetails.phoneNumber
                    : "Phone number not set"}
                </small>
              </div>
              <div className="flex items-center gap-4">
                <SlCalender />
                <small>
                  {influencerDetails?.dateOfBirth
                    ? influencerDetails.dateOfBirth
                    : "Date of Birth not set"}
                </small>
              </div>
              <div className="flex items-center gap-4">
                <RiGenderlessLine />
                <small>
                  {influencerDetails?.gender
                    ? influencerDetails.gender
                    : "Gender not set"}
                </small>
              </div>
              
            </div>
          </section>
        </section>
      )}
    </>
  );
};

export default LeftBar;
