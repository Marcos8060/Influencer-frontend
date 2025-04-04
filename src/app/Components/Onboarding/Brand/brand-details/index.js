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
    legalCompanyName: formData.legalCompanyName || "",
    country: formData.country || "",
    state: formData.state || "",
    city: formData.city || "",
    address: formData.address || "",
    zipCode: formData.zipCode || "",
    brandName: formData.brandName || "",
    brandDescription: formData.brandDescription || "",
  });

  useEffect(() => {
    dispatch(setCurrentStep(0));
  }, [
    dispatch,
    formData.brandWebsite,
    formData.legalCompanyName,
    formData.country,
    formData.state,
    formData.city,
    formData.address,
    formData.zipCode,
    formData.brandName,
    formData.brandDescription,
  ]);

  const handleNext = () => {
    dispatch(
      updateFormData(details));
    dispatch(nextStep());
  };

  return (
    <section className="flex items-center justify-center my-4 md:w-4/12 mx-auto px-4 text-color">
      <div>
        <h1 className="text-3xl font-bold text-center my-2">Brand Details</h1>
        <p className="text-center text-sm mb-3">
          To effectively engage creators, ensure your description is concise and
          captivating.
        </p>
        <form className="space-y-2 mb-3">
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
              Legal Company Name
            </label>
            <InputComponent
              value={details.legalCompanyName}
              onChange={(e) => setDetails({ ...details,legalCompanyName: e.target.value })}
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
            <label className="text-xs" htmlFor="country">
              Country
            </label>
            <InputComponent
              value={details.country}
              onChange={(e) => setDetails({ ...details,country: e.target.value })}
            />
          </div>
          <div>
            <label className="text-xs" htmlFor="state">
              State
            </label>
            <InputComponent
              value={details.state}
              onChange={(e) => setDetails({ ...details,state: e.target.value })}
            />
          </div>
          <div>
            <label className="text-xs" htmlFor="city">
              City
            </label>
            <InputComponent
              value={details.city}
              onChange={(e) => setDetails({ ...details,city: e.target.value })}
            />
          </div>
          <div>
            <label className="text-xs" htmlFor="address">
              Address
            </label>
            <InputComponent
              value={details.address}
              onChange={(e) => setDetails({ ...details,address: e.target.value })}
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
