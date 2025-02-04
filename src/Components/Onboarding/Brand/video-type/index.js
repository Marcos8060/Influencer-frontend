"use client";
import React, { useEffect } from "react";
import ButtonComponent from "@/Components/SharedComponents/ButtonComponent";
import CustomizedTickBoxComponent from "@/Components/SharedComponents/CustomizedTickBoxComponent";
import { useDispatch } from "react-redux";
import {
  nextStep,
  setCurrentStep,
  previousStep,
} from "@/redux/features/stepper";
import CustomizedBackButton from "@/Components/SharedComponents/CustomizedBackComponent";

const VideoType = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentStep(18));
  }, [dispatch]);
  return (
    <section className="flex items-center justify-center h-screen w-4/12 mx-auto">
      <div className="w-full">
        <h1 className="text-3xl font-bold text-center my-2">Video Type</h1>
        <p className="text-center text-sm mb-3">
          Which type of videos do you want?
        </p>
        <div className="space-y-2">
          <CustomizedTickBoxComponent
            label="Up to the creator"
            description="Our creators will send you their most creative takes"
          />
          <CustomizedTickBoxComponent
            label="Testimonial"
            description="our creators will send you their most creative takes"
          />
          <CustomizedTickBoxComponent
            label="Unboxing"
            description="our creators will send you their most creative takes"
          />
          <CustomizedTickBoxComponent
            label="How to"
            description="Creators will record themselves explaining how your products work"
          />
          <ButtonComponent onClick={() => dispatch(nextStep())} label="Next" />
          <CustomizedBackButton onClick={() => dispatch(previousStep())} />
        </div>
      </div>
    </section>
  );
};

export default VideoType;
