import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentStep: 0,
  formData: {
    platformIntroductionSource: null,
    brandWebsite: null,
    legalCompanyName: null,
    address: null,
    city: null,
    country: null,
    state: null,
    phoneNumber: null,
    zipCode: null,
    brandName: null,
    brandDescription: null,
    businessType: null,
    businessIndustry: null,
    preferredSocialMediaPlatforms: [],
    preferredInfluencerCountries: [],
    agreedToTerms: false,
    finishedOnboarding: false,
  },
};

const StepperSlice = createSlice({
  name: "stepper",
  initialState,
  reducers: {
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
    nextStep: (state) => {
      state.currentStep += 1;
    },
    previousStep: (state) => {
      state.currentStep = Math.max(0, state.currentStep - 1);
    },
    updateFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    resetStepper: () => ({
      currentStep: 0,
      formData: {
        platformIntroductionSource: null,
        brandWebsite: null,
        legalCompanyName: null,
        address: null,
        city: null,
        country: null,
        state: null,
        phoneNumber: null,
        zipCode: null,
        brandName: null,
        brandDescription: null,
        businessType: null,
        businessIndustry: null,
        preferredSocialMediaPlatforms: [],
        preferredInfluencerCountries: [],
        agreedToTerms: false,
        finishedOnboarding: false,
      },
    }),
  },
});

export const { setCurrentStep, nextStep, previousStep, updateFormData,resetStepper } =
  StepperSlice.actions;

export default StepperSlice.reducer;
