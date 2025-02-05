"use client";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCurrentStep, nextStep,previousStep } from "@/redux/features/stepper";
import TickBoxComponent from "@/app/Components/SharedComponents/TickBoxComponent";
import ButtonComponent from "@/app/Components/SharedComponents/ButtonComponent";
import CustomizedBackButton from "@/app/Components/SharedComponents/CustomizedBackComponent";

const Platforms = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentStep(7));
  }, [dispatch]);


  return (
    <section className="flex items-center justify-center h-screen w-4/12 mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-center my-2">Platforms</h1>
        <p className="text-center text-sm mb-3">
          We can connect you with influencers on these platforms, allowing you
          to collaborate on one, multiple, or all of them
        </p>
        <div className="space-y-4">
          <TickBoxComponent label="Instagram" />
          <TickBoxComponent label="Tiktok" />
          <TickBoxComponent label="Facebook" />
          <ButtonComponent onClick={() => dispatch(nextStep())} label="Next" />
          <CustomizedBackButton onClick={() => dispatch(previousStep())} />
        </div>
      </div>
    </section>
  );
};

export default Platforms;
