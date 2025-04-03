"use client";
import React, { useEffect,useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import {
  setCurrentStep,
  nextStep,
  previousStep,
  updateFormData,
} from "@/redux/features/stepper";
import InputComponent from "@/app/Components/SharedComponents/InputComponent";
import TextAreaComponent from "@/app/Components/SharedComponents/TextAreaComponent";
import ButtonComponent from "@/app/Components/SharedComponents/ButtonComponent";
import CustomizedBackButton from "@/app/Components/SharedComponents/CustomizedBackComponent";
import toast from "react-hot-toast";
const BrandDetails = () => {
  const formData = useSelector((store) => store.stepper.formData);
  const dispatch = useDispatch();
  const [details, setDetails] = useState({
    brandWebsite: formData.brandWebsite || "",
    brandName: formData.brandName || "",
    brandDescription: formData.brandDescription || "",
  });

  useEffect(() => {
    dispatch(setCurrentStep(0));
  }, [
    dispatch,
    formData.brandWebsite,
    formData.brandName,
    formData.brandDescription,
  ]);

  const handleNext = () => {
    dispatch(
      updateFormData(details));
    dispatch(nextStep());
  };

  return (
    <section className="flex items-center justify-center h-screen md:w-4/12 mx-auto px-4 text-color">
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
            <InputComponent
              value={details.brandWebsite}
              onChange={(e) => setDetails({ ...details,brandWebsite: e.target.value })}
            />
          </div>
          <div>
            <label className="text-xs" htmlFor="brandname">
              Brand Name
            </label>
            <InputComponent
              value={details.brandName}
              onChange={(e) => setDetails({ ...details,brandName: e.target.value })}
            />
          </div>
          <div>
            <label className="text-xs" htmlFor="brand">
              What does your brand offer please keep it brief.
            </label>
            <TextAreaComponent
              value={details.brandDescription}
              onChange={(e) => setDetails({ ...details,brandDescription: e.target.value })}
            />
          </div>
          <ButtonComponent onClick={handleNext} label="Next" />
        </form>
      </div>
    </section>
  );
};

export default BrandDetails;
