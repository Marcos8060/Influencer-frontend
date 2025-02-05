'use client'
import React,{ useEffect} from "react";
import { useDispatch } from "react-redux";
import { nextStep, setCurrentStep,previousStep } from "@/redux/features/stepper";
import CustomizedTickBoxComponent from "@/app/Components/SharedComponents/CustomizedTickBoxComponent";
import ButtonComponent from "@/app/Components/SharedComponents/ButtonComponent";
import CustomizedBackButton from "@/app/Components/SharedComponents/CustomizedBackComponent";

const DecidingFactor = () => {
  const dispatch = useDispatch();

  useEffect(() => {
        dispatch(setCurrentStep(8))
      },[dispatch])
  return (
    <section className="flex items-center justify-center h-screen w-4/12 mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-center my-2">Deciding Factor</h1>
        <p className="text-center text-sm mb-3">
          What is the most important factor when deciding which influencer to collabotate with?
        </p>
        <div className="space-y-4">
          <CustomizedTickBoxComponent
            label="Quality of Content"
            description="For me the quality of content is the key factor"
          />
          <CustomizedTickBoxComponent
            label="Engagement Rate"
            description="For me the engagement rate is the key factor"
          />
          <CustomizedTickBoxComponent
            label="Quality of the Comments"
            description="For me the quality of the comments is the key factor"
          />
          <CustomizedTickBoxComponent
            label="Followers"
            description="For me the number of followers is the key factor"
          />
          <ButtonComponent onClick={() => dispatch(nextStep())} label="Next" />
          <CustomizedBackButton onClick={() => dispatch(previousStep())} />
        </div>
      </div>
    </section>
  );
};

export default DecidingFactor;
