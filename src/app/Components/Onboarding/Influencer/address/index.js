"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentStep,
  nextStep,
  previousStep,
  updateFormData,
} from "@/redux/features/stepper/influencer-stepper";
import InputComponent from "@/app/Components/SharedComponents/InputComponent";
import ButtonComponent from "@/app/Components/SharedComponents/ButtonComponent";
import CustomizedBackButton from "@/app/Components/SharedComponents/CustomizedBackComponent";
import toast from "react-hot-toast";
const Address = () => {
  const influencerData = useSelector((store) => store.influencerStepper.influencerData);
  const dispatch = useDispatch();
  const [details, setDetails] = useState({
    influencerAddressLine1: influencerData.influencerAddressLine1 || "",
    influencerAddressLine2: influencerData.influencerAddressLine2 || "",
    influencerCity: influencerData.influencerCity || "",
    influencerCountry: influencerData.influencerCountry || "",
    influencerZipCode: influencerData.influencerZipCode || "",
    influencerPhoneNumber: influencerData.influencerPhoneNumber || "",
  });

  useEffect(() => {
    dispatch(setCurrentStep(8));
  }, [
    dispatch,
    influencerData.influencerAddressLine1,
    influencerData.influencerAddressLine2,
    influencerData.influencerCity,
    influencerData.influencerCountry,
    influencerData.influencerZipCode,
    influencerData.influencerPhoneNumber,
  ]);

  const handleNext = () => {
    dispatch(updateFormData(details));
    dispatch(nextStep());
  };

  return (
    <section className="flex items-center justify-center h-screen md:w-4/12 mx-auto px-4 text-color">
      <div>
        <h1 className="text-3xl font-bold text-center my-2">Address</h1>
        <p className="text-center text-sm mb-3">
          We will use this to match you with brands in your local area and to
          easily share it with brands to get the products shipped
        </p>
        <section className="space-y-4 mb-3">
          <div>
            <label className="text-xs" htmlFor="website">
              Address Line
            </label>
            <InputComponent
              value={details.influencerAddressLine1}
              onChange={(e) =>
                setDetails({ ...details, influencerAddressLine1: e.target.value })
              }
            />
          </div>
          <div>
            <label className="text-xs" htmlFor="brandname">
              Address Line 2
            </label>
            <InputComponent
              value={details.influencerAddressLine2}
              onChange={(e) =>
                setDetails({ ...details, influencerAddressLine2: e.target.value })
              }
            />
          </div>
          <div>
            <label className="text-xs" htmlFor="brand">
              City
            </label>
            <InputComponent
              value={details.influencerCity}
              onChange={(e) =>
                setDetails({ ...details, influencerCity: e.target.value })
              }
            />
          </div>
          <div>
            <label className="text-xs" htmlFor="brand">
              Country
            </label>
            <InputComponent
              value={details.influencerCountry}
              onChange={(e) =>
                setDetails({ ...details, influencerCountry: e.target.value })
              }
            />
          </div>
          <div>
            <label className="text-xs" htmlFor="brand">
              Post Code
            </label>
            <InputComponent
              value={details.influencerZipCode}
              onChange={(e) =>
                setDetails({ ...details, influencerZipCode: e.target.value })
              }
            />
          </div>
          <div>
            <label className="text-xs" htmlFor="brand">
              Phone Number
            </label>
            <InputComponent
              value={details.influencerPhoneNumber}
              onChange={(e) =>
                setDetails({ ...details, influencerPhoneNumber: e.target.value })
              }
            />
          </div>
          <ButtonComponent onClick={handleNext} label="Next" />
        </section>
        <CustomizedBackButton onClick={() => dispatch(previousStep())} />
      </div>
    </section>
  );
};

export default Address;
