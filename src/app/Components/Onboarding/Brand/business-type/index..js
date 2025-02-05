'use client'
import React,{ useEffect} from "react";
import ButtonComponent from "@/Components/SharedComponents/ButtonComponent";
import CustomizedTickBoxComponent from "@/Components/SharedComponents/CustomizedTickBoxComponent";
import { useDispatch } from "react-redux";
import { nextStep, setCurrentStep,previousStep } from "@/redux/features/stepper";
import CustomizedBackButton from "@/Components/SharedComponents/CustomizedBackComponent";

const BusinessType = () => {
  const dispatch = useDispatch();

  useEffect(() => {
        dispatch(setCurrentStep(2))
      },[dispatch])
  return (
    <section className="flex items-center justify-center h-screen w-4/12 mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-center my-2">Business Type</h1>
        <p className="text-center text-sm mb-3">
          What type of business do you run? Do you sell products, services or
          software? Is it online or in person?
        </p>
        <div className="space-y-4">
          <CustomizedTickBoxComponent
            label="E-Commerce"
            description="Your business sells products online and delivers across the country"
          />
          <CustomizedTickBoxComponent
            label="In Person Services"
            description="Your business offers services or products that necessitate an in-person presence, such as
            hotels, Airbnbs, gyms, beauty salons, or large furniture items."
          />
          {/* <CustomizedTickBoxComponent
            label="Marketplace"
            description="Your business is a marketplace"
          /> */}
          <CustomizedTickBoxComponent
            label="Digital Services"
            description="Your business provides services that don't require in-person attendance, such as online yoga classes and virtual training courses"
          />
          {/* <CustomizedTickBoxComponent
            label="Other"
            description="If your business doesn't fall into the categories mentioned above, please select this option."
          /> */}
          <CustomizedTickBoxComponent
            label="Software"
            description="Your business sells software e.g. photo editing tools, digital photo book "
          />
          <ButtonComponent onClick={() => dispatch(nextStep())} label="Next" />
          <CustomizedBackButton onClick={() => dispatch(previousStep())} />
        </div>
      </div>
    </section>
  );
};

export default BusinessType;
