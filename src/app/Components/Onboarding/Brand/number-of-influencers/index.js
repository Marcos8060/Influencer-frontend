"use client";
import React, { useEffect } from "react";
import ButtonComponent from "@/Components/SharedComponents/ButtonComponent";
import TickBoxComponent from "@/Components/SharedComponents/TickBoxComponent";
import { useDispatch } from "react-redux";
import {
  setCurrentStep,
  nextStep,
  previousStep,
} from "@/redux/features/stepper";
import CustomizedBackButton from "@/Components/SharedComponents/CustomizedBackComponent";

const NumberOfInfluencers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentStep(5));
  }, [dispatch]);

  return (
    <section className="flex items-center justify-center h-screen w-4/12 mx-auto">
      <div className="w-full">
        <h1 className="text-3xl font-bold text-center my-2">
          Desired Number of influencers (Monthly)
        </h1>
        <p className="text-center text-sm mb-3">
          How many influencers are you looking to collaborate with?
        </p>
        <section className="flex items-center justify-center gap-4 mb-2">
          <div className="space-y-3 w-full">
            <TickBoxComponent label="1-5" />
            <TickBoxComponent label="11-19" />
            
          </div>
          <div className="space-y-3 w-full">
            <TickBoxComponent label="6-10" />
            <TickBoxComponent label="20+" />
          </div>
        </section>
        <div className="mt-2 space-y-2">
          <ButtonComponent onClick={() => dispatch(nextStep())} label="Next" />
          <CustomizedBackButton onClick={() => dispatch(previousStep())} />
        </div>
      </div>
    </section>
  );
};

export default NumberOfInfluencers;
