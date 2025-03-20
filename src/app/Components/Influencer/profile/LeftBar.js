"use client";
import React, { useContext, useEffect } from "react";
import { authContext } from "@/assets/context/use-context";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "@/assets/hooks/use-auth";
import { fetchAllInfluencerDetails } from "@/redux/features/influencer/profile";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import { FaPhoneAlt } from "react-icons/fa";
import { RiGenderlessLine } from "react-icons/ri";
import { MdEdit } from "react-icons/md";
import EditDetailsModal from "./edit-details";

const LeftBar = () => {
  const { user } = useContext(authContext);
  const { influencerDetails } = useSelector((store) => store.influencerProfile);
  const dispatch = useDispatch();
  const auth = useAuth();

  useEffect(() => {
    if (auth && Object.keys(influencerDetails).length === 0) {
      dispatch(fetchAllInfluencerDetails(auth));
    }
  }, [auth, influencerDetails]);
  return (
    <section className="bg-white shadow-sm rounded-lg p-4 h-[70vh] text-color">
      <div className="flex items-center justify-between text-xs text-secondary font-bold mb-8">
        <p>Active</p>
        <p>{user?.roleName}</p>
      </div>
      <section className="flex items-center justify-center">
        <img
          className="w-28 h-28 rounded-full object-cover"
          src="https://images.pexels.com/photos/3779676/pexels-photo-3779676.jpeg?auto=compress&cs=tinysrgb&w=1200"
          alt=""
        />
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
          <EditDetailsModal {...{ influencerDetails }} />
        </div>
      </section>
    </section>
  );
};

export default LeftBar;
