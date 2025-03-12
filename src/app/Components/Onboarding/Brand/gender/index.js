"use client";
import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  nextStep,
  setCurrentStep,
  previousStep,
} from "@/redux/features/stepper";
import TickBoxComponent from "@/app/Components/SharedComponents/TickBoxComponent";
import ButtonComponent from "@/app/Components/SharedComponents/ButtonComponent";
import CustomizedBackButton from "@/app/Components/SharedComponents/CustomizedBackComponent";
import { updateFormData } from "@/redux/features/stepper";
import toast from "react-hot-toast";

const Gender = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.stepper.formData);

  const [selectedGenders, setSelectedGenders] = useState(
    formData.preferredInfluencerGenders || []
  );
  const genders = ["Any", "Male", "Female", "Other"];

  const toggleGender = (platform) => {
    setSelectedGenders((prev) =>
      prev.includes(platform)
        ? prev.filter((p) => p !== platform)
        : [...prev, platform]
    );
  };

  const handleNext = () => {
    if (selectedGenders.length === 0) {
      toast.error("Please select at least one option.");
      return;
    }

    dispatch(
      updateFormData({
        preferredInfluencerGenders: selectedGenders, // Store in Redux
      })
    );
    dispatch(nextStep());
  };

  useEffect(() => {
    dispatch(setCurrentStep(10));
  }, [dispatch]);
  return (
    <section className="flex items-center justify-center h-screen md:w-4/12 mx-auto px-4">
      <div className="w-full">
        <h1 className="text-3xl font-bold text-center my-2">Gender</h1>
        <p className="text-center text-sm mb-3">
          What gender(s) of influencers are you looking at?
        </p>
        <div className="space-y-4 w-full">
          {genders.map((option) => (
            <TickBoxComponent
              key={option}
              label={option}
              checked={selectedGenders.includes(option)}
              onChange={() => toggleGender(option)}
            />
          ))}
          <ButtonComponent onClick={handleNext} label="Next" />
          <CustomizedBackButton onClick={() => dispatch(previousStep())} />
        </div>
      </div>
    </section>
  );
};

export default Gender;
