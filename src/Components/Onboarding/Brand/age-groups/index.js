"use client";
import React, { useEffect } from "react";
import ButtonComponent from "@/Components/SharedComponents/ButtonComponent";
import { useDispatch } from "react-redux";
import {
  nextStep,
  setCurrentStep,
  previousStep,
} from "@/redux/features/stepper";
import CustomizedBackButton from "@/Components/SharedComponents/CustomizedBackComponent";
import TickBox from "@/Components/SharedComponents/TickBoxComponent";

const AgeGroups = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentStep(12));
  }, [dispatch]);
  return (
    <section className="flex items-center justify-center h-screen w-4/12 mx-auto">
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
