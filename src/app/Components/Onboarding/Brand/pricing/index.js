"use client";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  nextStep,
  setCurrentStep,
  previousStep,
} from "@/redux/features/stepper";
import ButtonComponent from "@/app/Components/SharedComponents/ButtonComponent";
import CustomizedBackButton from "@/app/Components/SharedComponents/CustomizedBackComponent";

const Pricing = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentStep(19));
  }, [dispatch]);
  return (
    <section className="flex items-center justify-center h-screen md:w-5/12 mx-auto px-4">
      <div className="w-full">
        <h1 className="text-3xl font-bold text-center my-2 mb-8">
          7 Day Free Trial
        </h1>
        <div className="flex items-center justify-center text-xs gap-4 cursor-pointer">
          <p>Pay Monthly</p>
          <p className="bg-primary rounded px-4 py-3 text-white">
            Pay Annually, get 2 months free
          </p>
        </div>
        <section className="md:flex items-center justify-between gap-4 my-4">
          <div className="border border-background rounded p-4 text-center w-full">
            <p className="font-semibold">Up to the Creator</p>
            <div className="text-xs">
              <p>Unlimited content per collaboration</p>
              <p>Up to 5 campaigns</p>
              <p>Up to 3 members</p>
              <p>Content usage for all rights</p>
              <p>Unlimited content per collaboration</p>
              <p>Up to 3000 / yr</p>
              <p>Collaborate with up to 180 creators / yr</p>
              <p className="bg-primary shadow-2xl rounded px-4 py-3 text-white text-xs my-4">
                Start 7 day Free Trial
              </p>
            </div>
          </div>
          <div className="border border-background rounded p-4 text-center w-full">
            <p className="font-semibold">Pro Plan</p>
            <div className="text-xs">
              <p>Unlimited content per collaboration</p>
              <p>Up to 5 campaigns</p>
              <p>Up to 3 members</p>
              <p>Content usage for all rights</p>
              <p>Unlimited content per collaboration</p>
              <p>Up to 3000 / yr</p>
              <p>Collaborate with up to 180 creators / yr</p>
              <p className="bg-primary rounded px-4 py-3 text-white text-xs my-4">
                Start 7 day Free Trial
              </p>
            </div>
          </div>
          <div className="border border-background rounded p-4 text-center w-full">
            <p className="font-semibold">Essential Plan</p>
            <div className="text-xs">
              <p>Unlimited content per collaboration</p>
              <p>Up to 5 campaigns</p>
              <p>Up to 3 members</p>
              <p>Content usage for all rights</p>
              <p>Unlimited content per collaboration</p>
              <p>Up to 3000 / yr</p>
              <p>Collaborate with up to 180 creators / yr</p>
              <p className="bg-primary rounded px-4 py-3 text-white text-xs my-4">
                Start 7 day Free Trial
              </p>
            </div>
          </div>
        </section>
        <ButtonComponent onClick={() => dispatch(nextStep())} label="Next" />
          <CustomizedBackButton onClick={() => dispatch(previousStep())} />
      </div>
    </section>
  );
};

export default Pricing;
