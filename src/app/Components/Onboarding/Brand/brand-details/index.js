"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
    brandWebsite: formData.brandWebsite || null,
    legalCompanyName: formData.legalCompanyName || null,
    country: formData.country || null,
    state: formData.state || null,
    city: formData.city || null,
    address: formData.address || null,
    zipCode: formData.zipCode || null,
    brandName: formData.brandName || null,
    brandDescription: formData.brandDescription || null,
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

  const handleNext = (e) => {
    e.preventDefault();
    const requiredFields = [
      "brandWebsite",
      "legalCompanyName",
      "brandName",
      "country",
      "state",
      "city",
      "address",
      "zipCode",
    ];
  
    const emptyFields = requiredFields.filter(
      (field) => !details[field] || details[field].trim() === ""
    );
  
    if (emptyFields.length > 0) {
      toast.error("Please fill out all required fields.");
      return;
    }
  
    dispatch(updateFormData(details));
    dispatch(nextStep());
  };
  

  return (
    <section className="flex items-center justify-center h-screen md:w-4/12 mx-auto px-4 text-color">
      <div className="w-full">
        <section className="mb-8">
          <h1 className="text-2xl font-bold text-center my-2">
            Lets Get to Know Your Brand
          </h1>
          <p className="text-center text-sm mb-3">
            Help us create the perfect influencer matches for you.
          </p>
        </section>
        <form className="space-y-6 mb-2 mt-4">
          <section>
            <h3 className="font-bold text-xl mb-3">Brand Information</h3>
            <div>
              <label className="text-xs" htmlFor="website">
                Website
              </label>
              <InputComponent
                value={details.brandWebsite}
                required
                onChange={(e) =>
                  setDetails({ ...details, brandWebsite: e.target.value })
                }
              />
            </div>
            <section className="flex gap-4 justify-between mt-2">
              <div className="w-full">
                <label className="text-xs" htmlFor="brandname">
                  Legal Company Name
                </label>
                <InputComponent
                  value={details.legalCompanyName}
                  onChange={(e) =>
                    setDetails({ ...details, legalCompanyName: e.target.value })
                  }
                />
              </div>
              <div className="w-full">
                <label className="text-xs" htmlFor="brandname">
                  Brand Name
                </label>
                <InputComponent
                  value={details.brandName}
                  onChange={(e) =>
                    setDetails({ ...details, brandName: e.target.value })
                  }
                />
              </div>
            </section>
          </section>
          <section>
            <h3 className="font-bold text-xl mb-2">Company Details</h3>
            <section className="flex gap-4 justify-between">
              <div className="w-full">
                <label className="text-xs" htmlFor="country">
                  Country
                </label>
                <InputComponent
                  value={details.country}
                  onChange={(e) =>
                    setDetails({ ...details, country: e.target.value })
                  }
                />
              </div>
              <div className="w-full">
                <label className="text-xs" htmlFor="state">
                  State
                </label>
                <InputComponent
                  value={details.state}
                  onChange={(e) =>
                    setDetails({ ...details, state: e.target.value })
                  }
                />
              </div>
            </section>
            <section className="flex gap-4 justify-between my-2">
              <div className="w-full">
                <label className="text-xs" htmlFor="city">
                  City
                </label>
                <InputComponent
                  value={details.city}
                  onChange={(e) =>
                    setDetails({ ...details, city: e.target.value })
                  }
                />
              </div>
              <div className="w-full">
                <label className="text-xs" htmlFor="address">
                  Address
                </label>
                <InputComponent
                  value={details.address}
                  onChange={(e) =>
                    setDetails({ ...details, address: e.target.value })
                  }
                />
              </div>
            </section>
            <div>
              <label className="text-xs" htmlFor="zipCode">
                Zip code
              </label>
              <InputComponent
                value={details.zipCode}
                onChange={(e) =>
                  setDetails({ ...details, zipCode: e.target.value })
                }
              />
            </div>
            <div className="mt-2">
              <label className="text-xs" htmlFor="brand">
                What does your brand offer please keep it brief.
              </label>
              <TextAreaComponent
                value={details.brandDescription}
                onChange={(e) =>
                  setDetails({ ...details, brandDescription: e.target.value })
                }
              />
            </div>
            <ButtonComponent onClick={handleNext} label="Next" />
          </section>
        </form>
      </div>
    </section>
  );
};

export default BrandDetails;
