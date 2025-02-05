'use client'
import React,{useEffect} from "react";
import InputComponent from "@/Components/SharedComponents/InputComponent";
import ButtonComponent from "@/Components/SharedComponents/ButtonComponent";
import TextAreaComponent from "@/Components/SharedComponents/TextAreaComponent";
import { useDispatch } from "react-redux";
import { setCurrentStep,nextStep,previousStep } from "@/redux/features/stepper";
import CustomizedBackButton from "@/Components/SharedComponents/CustomizedBackComponent";
const BrandDetails = () => {
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(setCurrentStep(1))
    },[dispatch])

  return (
    <section className="flex items-center justify-center h-screen w-4/12 mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-center my-2">Brand Details</h1>
        <p className="text-center text-sm mb-3">
          To effectively engage creators, ensure your description is concise and
          captivating.
        </p>
        <form className="space-y-4 mb-3">
          <div>
            <label className="text-xs" htmlFor="website">
              Website
            </label>
            <InputComponent />
          </div>
          <div>
            <label className="text-xs" htmlFor="brandname">
              Brand Name
            </label>
            <InputComponent />
          </div>
          {/* <div>
            <label className="text-xs" htmlFor="brand">
              What does your brand offer, please keep it brief
            </label>
            <TextAreaComponent />
          </div> */}
          <div>
            <label className="text-xs" htmlFor="brand">
              What sets your brand apart? Please provide a detailed explanation.
            </label>
            <TextAreaComponent />
          </div>
          <ButtonComponent onClick={() => dispatch(nextStep())} label="Next" />
        </form>
        <CustomizedBackButton onClick={() => dispatch(previousStep())} />
      </div>
    </section>
  );
};

export default BrandDetails;
