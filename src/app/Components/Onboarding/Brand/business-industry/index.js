"use client";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setCurrentStep,
  nextStep,
  previousStep,
} from "@/redux/features/stepper";
import TickBoxComponent from "@/app/Components/SharedComponents/TickBoxComponent";
import ButtonComponent from "@/app/Components/SharedComponents/ButtonComponent";
import CustomizedBackButton from "@/app/Components/SharedComponents/CustomizedBackComponent";

const BusinessIndustry = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentStep(3));
  }, [dispatch]);

  return (
    <section className="flex items-center justify-center h-screen w-4/12 mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-center my-2">
          Business Industry
        </h1>
        <p className="text-center text-sm mb-3">
          Which products does your business primarily offer for sale? Please
          choose the industry that best matches your business
        </p>
        <section className="flex items-center justify-center gap-4 mb-2">
          <div className="space-y-3 w-full">
            <TickBoxComponent label="Beauty and Care" />
            <TickBoxComponent label="Electronics" />
            <TickBoxComponent label="Fashion and Apparel" />
            <TickBoxComponent label="Sports and Fitness" />
            {/* <TickBoxComponent label="Gaming" /> */}
            {/* <TickBoxComponent label="Home Goods" />
            <TickBoxComponent label="Kids & Family" />
            <TickBoxComponent label="Other" /> */}
            <TickBoxComponent label="Pets" />
            <TickBoxComponent label="Skincare" />
            <TickBoxComponent label="Health & Wellness" />
          </div>
          <div className="space-y-3 w-full">
            <TickBoxComponent label="Consumer Goods" />
            <TickBoxComponent label="Essentials" />
            <TickBoxComponent label="Fintech" />
            {/* <TickBoxComponent label="Food & Beverages" />
            <TickBoxComponent label="Hair" />
            <TickBoxComponent label="Jewellery & Extras" />
            <TickBoxComponent label="Makeup" /> */}
            <TickBoxComponent label="Outdoors" />
            <TickBoxComponent label="Indoors" />
            <TickBoxComponent label="Services" />
            <TickBoxComponent label="Software" />
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

export default BusinessIndustry;
