"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  nextStep,
  setCurrentStep,
  previousStep,
  updateFormData
} from "@/redux/features/stepper/influencer-stepper";
import ButtonComponent from "@/app/Components/SharedComponents/ButtonComponent";
import CustomizedBackButton from "@/app/Components/SharedComponents/CustomizedBackComponent";
import DateFieldComponent from "@/app/Components/SharedComponents/DateFieldComponent";
import toast from "react-hot-toast";

const DateOfBirth = () => {
  const dispatch = useDispatch();
  const influencerData = useSelector((store) => store.influencerStepper.influencerData);
  
  // Convert stored date string back to Date object if exists
  const [dateOfBirth, setDateOfBirth] = useState(
    influencerData.dateOfBirth ? new Date(influencerData.dateOfBirth) : null
  );

  useEffect(() => {
    dispatch(setCurrentStep(2));
  }, [dispatch]);

  const handleDateChange = (date) => {
    if (date) {
      const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
      setDateOfBirth(date);
      dispatch(updateFormData({ dateOfBirth: formattedDate })); 
    }
  };  

  const handleNext = () => {
    if (!dateOfBirth) {
      toast.error("Please select your date of birth.");
      return;
    }
    dispatch(nextStep());
  };

  return (
    <section className="flex items-center justify-center h-screen md:w-4/12 mx-auto px-4">
      <div>
        <h1 className="text-3xl font-bold text-center my-2">What is your date of birth?</h1>
        <div className="space-y-4">
          {/* Pass value and onChange to DateFieldComponent */}
          <DateFieldComponent value={dateOfBirth} onChange={handleDateChange} />
          <ButtonComponent onClick={handleNext} label="Next" />
          <CustomizedBackButton onClick={() => dispatch(previousStep())} />
        </div>
      </div>
    </section>
  );
};

export default DateOfBirth;
