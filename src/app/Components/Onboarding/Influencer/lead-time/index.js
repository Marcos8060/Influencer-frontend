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
const LeadTime = () => {
  const influencerData = useSelector(
    (store) => store.influencerStepper.influencerData
  );
  const dispatch = useDispatch();
  const [details, setDetails] = useState({
    preferredLeadTimeForProjectDays: influencerData.preferredLeadTimeForProjectDays || "",
  });

  useEffect(() => {
    dispatch(setCurrentStep(9));
  }, [dispatch, influencerData.preferredLeadTimeForProjectDays]);

  const handleNext = () => {
    dispatch(updateFormData(details));
    dispatch(nextStep());
  };

  return (
    <section className="flex items-center justify-center h-screen md:w-4/12 mx-auto px-4 text-color">
      <div>
        <h1 className="text-3xl font-bold text-center my-2">How much lead time do you typically require for a project?</h1>
        <p className="text-center text-sm mb-3">
        How long does it take you from the time you receive the product to create content?
        </p>
        <section className="space-y-4 mb-3">
          <div>
            <label className="text-xs" htmlFor="website">
              Days
            </label>
            <InputComponent
             type="number"
              value={details.preferredLeadTimeForProjectDays}
              onChange={(e) =>
                setDetails({
                  ...details,
                  preferredLeadTimeForProjectDays: e.target.value,
                })
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

export default LeadTime;
