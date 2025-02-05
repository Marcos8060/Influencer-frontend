"use client";
import React, { useEffect,useState } from "react";
import ButtonComponent from "@/Components/SharedComponents/ButtonComponent";
import { useDispatch } from "react-redux";
import {
  setCurrentStep,
  nextStep,
  previousStep,
} from "@/redux/features/stepper";
import CustomizedBackButton from "@/Components/SharedComponents/CustomizedBackComponent";
import MultiSelectCheckBox from "@/Components/SharedComponents/MultiSelectCheckBox";


const Ethnicities = () => {
    const [selectedRaces,setSelectedRaces] = useState([]);
  const dispatch = useDispatch();

  const races = [
    { name: "Asian" },
    { name: "Black / African" },
    { name: "Hispanic / Latina" },
    { name: "American Indian / Alaskan Native" },
    { name: "Native Hawaian / Pacific Islander" },
    { name: "White" },
    { name: "Other" },
  ];

  useEffect(() => {
    dispatch(setCurrentStep(11));
  }, [dispatch]);

  return (
    <section className="flex items-center justify-center h-screen w-4/12 mx-auto">
      <div className="w-full">
        <h1 className="text-3xl font-bold text-center my-2">Ethnicities</h1>
        <p className="text-center text-sm mb-3">
          What influencer ethnicities are you aiming to target?
        </p>
        <div className="my-4">
          <MultiSelectCheckBox
            value={selectedRaces}
            onChange={(e) => setSelectedRaces(e.value)} 
            options={races}
            optionLabel="name"
            placeholder="Select Ethicity"
          />
        </div>
        <div className="mt-2 space-y-2">
          <ButtonComponent onClick={() => dispatch(nextStep())} label="Next" />
          <CustomizedBackButton onClick={() => dispatch(previousStep())} />
        </div>
      </div>
    </section>
  );
};

export default Ethnicities;
