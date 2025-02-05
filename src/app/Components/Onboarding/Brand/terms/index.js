"use client";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  nextStep,
  setCurrentStep,
  previousStep,
} from "@/redux/features/stepper";
import Link from "next/link";
import CustomizedBackButton from "@/app/Components/SharedComponents/CustomizedBackComponent";

const Terms = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentStep(20));
  }, [dispatch]);
  return (
    <section className="flex items-center justify-center h-screen w-5/12 mx-auto">
      <div className="w-full">
        <h1 className="text-3xl font-bold text-center my-2">Agree Terms</h1>
        <p className="mb-4">
          To collaborate with brands on the influencer platform, you need to
          agree the following
        </p>
        <div className="space-y-4">
          <Link
            className="bg-primary text-white rounded px-6 py-3 text-sm w-full"
            href="/onboarding/brand/dashboard"
          >
            Next
          </Link>
          <CustomizedBackButton onClick={() => dispatch(previousStep())} />
        </div>
      </div>
    </section>
  );
};

export default Terms;
