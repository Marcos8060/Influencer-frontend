'use client'
import React,{ useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCurrentStep,nextStep } from "@/redux/features/stepper";
import TickBoxComponent from "@/app/Components/SharedComponents/TickBoxComponent";
import ButtonComponent from "@/app/Components/SharedComponents/ButtonComponent";
import BackComponent from "@/app/Components/SharedComponents/BackComponent";

const FindAboutUs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentStep(0))
  },[dispatch])

  return (
    <section className="flex items-center justify-center h-screen md:w-4/12 mx-auto px-4">
      <div>
        <h1 className="text-3xl font-bold text-center my-2">
          How did you find out about us?
        </h1>
        <p className="text-center text-sm mb-3">
          We would love to hear how you discovered us as it will help enhance
          our marketting strategies.
        </p>
        <div className="space-y-4">
          <TickBoxComponent label='Someone recommended me' />
          <TickBoxComponent label='Facebook or Instagram Ads' />
          <TickBoxComponent label='Google or Bing' />
          <TickBoxComponent label='Review on a blog, website, etc' />
          <TickBoxComponent label='Influencer Platform blog' />
          <TickBoxComponent label='Other' />
          <ButtonComponent onClick={() => dispatch(nextStep())} label="Next" />
          <BackComponent href="/auth/register/brand/otp" />
        </div>
      </div>
    </section>
  );
};

export default FindAboutUs;
