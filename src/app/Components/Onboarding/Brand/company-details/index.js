"use client";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  nextStep,
  setCurrentStep,
  previousStep,
} from "@/redux/features/stepper";
import { FaPerson } from "react-icons/fa6";
import { FaBuilding } from "react-icons/fa";
import TickBox from "@/app/Components/SharedComponents/TickBoxComponent";
import ButtonComponent from "@/app/Components/SharedComponents/ButtonComponent";
import CustomizedBackButton from "@/app/Components/SharedComponents/CustomizedBackComponent";

const CompanyDetails = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentStep(4));
  }, [dispatch]);
  return (
    <section className="flex items-center justify-center h-screen w-4/12 mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-center my-2">Company Details</h1>
        <p className="text-center text-sm mb-3">
          We aim to customize the experience based on your company size and your
          plans for using the influence platform.
        </p>
        <div className="space-y-8">
          <section className="flex items-center gap-4 justify-between">
            <div className="border border-background rounded w-full flex items-center justify-center gap-4 py-8">
              <div>
                <FaPerson className="text-3xl" />
              </div>
              <div>
                <p className="text-sm">Company</p>
                <p className="text-gray text-xs">Only for yourself</p>
              </div>
            </div>
            <div className="border border-background rounded w-full flex items-center justify-center gap-4 py-8">
              <div>
                <FaBuilding className="text-3xl" />
              </div>
              <div>
                <p className="text-sm">Agency</p>
                <p className="text-gray text-xs">You work with multiple</p>
              </div>
            </div>
          </section>
          <section className="">
            <h1 className="mb-2">What is your company size? (peope)</h1>
            <div className="flex items-center justify-between gap-4">
              <div className="w-full space-y-2">
                <TickBox label="1" />
                <TickBox label="6-19" />
              </div>
              <div className="w-full space-y-2">
                <TickBox label="2-5" />
                <TickBox label="20+" />
              </div>
            </div>
          </section>
          <section className="space-y-2">
            <ButtonComponent
              onClick={() => dispatch(nextStep())}
              label="Next"
            />
            <CustomizedBackButton onClick={() => dispatch(previousStep())} />
          </section>
        </div>
      </div>
    </section>
  );
};

export default CompanyDetails;
