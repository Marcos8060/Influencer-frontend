'use client'
import React,{ useEffect} from "react";
import { useDispatch } from "react-redux";
import { nextStep, setCurrentStep,previousStep } from "@/redux/features/stepper";
import TickBox from "@/app/Components/SharedComponents/TickBoxComponent";
import ButtonComponent from "@/app/Components/SharedComponents/ButtonComponent";
import CustomizedBackButton from "@/app/Components/SharedComponents/CustomizedBackComponent";

const MinimumFollowers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
        dispatch(setCurrentStep(9))
      },[dispatch])
  return (
    <section className="flex items-center justify-center h-screen w-4/12 mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-center my-2">Minimum Followers</h1>
        <p className="text-center text-sm mb-3">
          What is the most important factor when deciding which influencer to collabotate with?
        </p>
        <div className="space-y-4">
          <TickBox
            label="Above 1,000 followers"
          />
          <TickBox
            label="Need at least 3,000 followers"
          />
          <TickBox
            label="Only over 5,000 followers"
          />
          <ButtonComponent onClick={() => dispatch(nextStep())} label="Next" />
          <CustomizedBackButton onClick={() => dispatch(previousStep())} />
        </div>
      </div>
    </section>
  );
};

export default MinimumFollowers;
