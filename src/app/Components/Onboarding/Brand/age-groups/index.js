"use client";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  nextStep,
  setCurrentStep,
  previousStep,
} from "@/redux/features/stepper";
import TickBox from "@/app/Components/SharedComponents/TickBoxComponent";
import ButtonComponent from "@/app/Components/SharedComponents/ButtonComponent";
import CustomizedBackButton from "@/app/Components/SharedComponents/CustomizedBackComponent";

const AgeGroups = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentStep(12));
  }, [dispatch]);
  return (
    <section className="flex items-center justify-center h-screen md:w-4/12 mx-auto px-4">
      <div className="w-full">
        <h1 className="text-3xl font-bold text-center my-2">Age Groups</h1>
        <p className="text-center text-sm mb-3">
          What influencer age group(s) are you targeting?
        </p>
        <div className="flex items-center justify-center gap-4 w-full mb-4 text-center">
          <TickBox label="Any" />
          <TickBox label="45+" />
          <TickBox label="18-24" />
          <TickBox label="25-34" />
          <TickBox label="35-44" />
        </div>
        <div>
          <ButtonComponent onClick={() => dispatch(nextStep())} label="Next" />
          <CustomizedBackButton onClick={() => dispatch(previousStep())} />
        </div>
      </div>
    </section>
  );
};

export default AgeGroups;
