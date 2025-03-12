"use client";
import React, { useEffect,useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import {
  nextStep,
  setCurrentStep,
  previousStep,
} from "@/redux/features/stepper";
import { FaPerson } from "react-icons/fa6";
import { FaBuilding } from "react-icons/fa";
import TickBoxComponent from "@/app/Components/SharedComponents/TickBoxComponent";
import ButtonComponent from "@/app/Components/SharedComponents/ButtonComponent";
import CustomizedBackButton from "@/app/Components/SharedComponents/CustomizedBackComponent";
import { updateFormData } from "@/redux/features/stepper";
import toast from "react-hot-toast";

const CompanyDetails = () => {
  const [selectedOption,setSelectedOption] = useState("");
  const formData = useSelector((store) => store.stepper.formData);
  const dispatch = useDispatch();

  const options = ["1", "2-5", "6-19", "20+"];

  useEffect(() => {
    dispatch(setCurrentStep(4));
    setSelectedOption(formData.companySize || "")
  }, [dispatch, formData.companySize]);

  const handleNext = () => {
    if (!selectedOption) {
      toast.error("Please select an option");
      return;
    }
    dispatch(updateFormData({ companySize: selectedOption }));
    dispatch(nextStep());
  }
  return (
    <section className="flex items-center justify-center h-screen md:w-4/12 mx-auto px-4">
      <div>
        <h1 className="text-3xl font-bold text-center my-2">Company Details</h1>
        <p className="text-center text-sm mb-3">
          We aim to customize the experience based on your company size and your
          plans for using the influencer platform.
        </p>
        <div className="space-y-8">
          {/* <section className="flex items-center gap-4 justify-between">
            <div className="border border-background rounded w-full flex items-center justify-center gap-4 py-8">
              <div>
                <FaPerson className="text-3xl" />
              </div>
              <div>
                <p className="text-sm">Company</p>
                <p className="text-gray text-xs">Only for yourself</p>
              </div>
            </div>
            <div className="border border-background rounded w-full flex items-center justify-center gap-4 py-8">
              <div>
                <FaBuilding className="text-3xl" />
              </div>
              <div>
                <p className="text-sm">Agency</p>
                <p className="text-gray text-xs">You work with multiple</p>
              </div>
            </div>
          </section> */}
          <section className="">
            <h1 className="mb-2 text-center">
              What is your company size? (peope)
            </h1>
            <div className="flex items-center justify-between gap-4">
              <div className="w-full space-y-2">
                {options.map((option) => (
                  <TickBoxComponent
                  key={option}
                  label={option}
                  checked={selectedOption === option}
                  onChange={() => setSelectedOption(option)}
                />
                ))}
              </div>
            </div>
          </section>
          <section className="space-y-2">
            <ButtonComponent
              onClick={handleNext}
              label="Next"
            />
            <CustomizedBackButton onClick={() => dispatch(previousStep())} />
          </section>
        </div>
      </div>
    </section>
  );
};

export default CompanyDetails;
