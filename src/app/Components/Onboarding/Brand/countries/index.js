"use client";
import React, { useEffect,useState } from "react";
import { useDispatch } from "react-redux";
import {
  setCurrentStep,
  nextStep,
  previousStep,
} from "@/redux/features/stepper";
import MultiSelectCheckBox from "@/app/Components/SharedComponents/MultiSelectCheckBox";
import ButtonComponent from "@/app/Components/SharedComponents/ButtonComponent";
import CustomizedBackButton from "@/app/Components/SharedComponents/CustomizedBackComponent";


const Countries = () => {
    const [selectedCountries,setSelectedCountries] = useState([]);
  const dispatch = useDispatch();

  const countries = [
    { name: "Australia", code: "AU" },
    { name: "Brazil", code: "BR" },
    { name: "China", code: "CN" },
    { name: "Egypt", code: "EG" },
    { name: "France", code: "FR" },
    { name: "Germany", code: "DE" },
    { name: "India", code: "IN" },
    { name: "Japan", code: "JP" },
    { name: "Spain", code: "ES" },
    { name: "United States", code: "US" },
  ];

  useEffect(() => {
    dispatch(setCurrentStep(13));
  }, [dispatch]);

  return (
    <section className="flex items-center justify-center h-screen w-4/12 mx-auto">
      <div className="w-full">
        <h1 className="text-3xl font-bold text-center my-2">Countries</h1>
        <p className="text-center text-sm mb-3">
          Which country should the influencer be based in?
        </p>
        <div className="my-4">
          <MultiSelectCheckBox
            value={selectedCountries}
            onChange={(e) => setSelectedCountries(e.value)} 
            options={countries}
            optionLabel="name"
            placeholder="Select Countries"
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

export default Countries;
