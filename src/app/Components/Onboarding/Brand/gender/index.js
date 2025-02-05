'use client'
import React,{ useEffect} from "react";
import { useDispatch } from "react-redux";
import { nextStep, setCurrentStep,previousStep } from "@/redux/features/stepper";
import TickBox from "@/app/Components/SharedComponents/TickBoxComponent";
import ButtonComponent from "@/app/Components/SharedComponents/ButtonComponent";
import CustomizedBackButton from "@/app/Components/SharedComponents/CustomizedBackComponent";

const Gender = () => {
  const dispatch = useDispatch();

  useEffect(() => {
        dispatch(setCurrentStep(10))
      },[dispatch])
  return (
    <section className="flex items-center justify-center h-screen w-4/12 mx-auto">
      <div className="w-full">
        <h1 className="text-3xl font-bold text-center my-2">Gender</h1>
        <p className="text-center text-sm mb-3">
          What gender(s) of influencers are you looking at?
        </p>
        <div className="space-y-4 w-full">
          <TickBox
            label="Any"
          />
          <TickBox
            label="Male"
          />
          <TickBox
            label="Female"
          />
          <TickBox
            label="Other"
          />
          <ButtonComponent onClick={() => dispatch(nextStep())} label="Next" />
          <CustomizedBackButton onClick={() => dispatch(previousStep())} />
        </div>
      </div>
    </section>
  );
};

export default Gender;
