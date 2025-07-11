import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentStep: 0,
  influencerData: {
    platformIntroductionSource: null,
    isInstagramAccountConnected: false,
    isTwitterAccountConnected: false,
    isFacebookAccountConnected: false,
    isTiktokAccountConnected: false,
    gender: null,
    dateOfBirth: null,
    contentCategories: null,
    preferredCompaniesType: null,
    influencerTopics: null,
    influencerAddressLine1: null,
    influencerAddressLine2: null,
    influencerCity: null,
    influencerCountry: null,
    influencerZipCode: null,
    influencerPhoneNumber: null,
    preferredLeadTimeForProjectDays: 0,
    agreedToTerms: false,
    finishedOnboarding: false,
  },
};

const InfluencerStepperSlice = createSlice({
  name: "influencerStepper",
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
      state.influencerData = { ...state.influencerData, ...action.payload };
    },
    resetStepper: () => ({
      currentStep: 0,
      influencerData: {
        platformIntroductionSource: null,
        isInstagramAccountConnected: false,
        isTwitterAccountConnected: false,
        isFacebookAccountConnected: false,
        isTiktokAccountConnected: false,
        gender: null,
        dateOfBirth: null,
        contentCategories: null,
        preferredCompaniesType: null,
        influencerTopics: null,
        influencerAddressLine1: null,
        influencerAddressLine2: null,
        influencerCity: null,
        influencerCountry: null,
        influencerZipCode: null,
        influencerPhoneNumber: null,
        preferredLeadTimeForProjectDays: 0,
        agreedToTerms: false,
        finishedOnboarding: false,
      },
    }),
  },
});

export const { setCurrentStep, nextStep, previousStep, updateFormData,resetStepper } =
  InfluencerStepperSlice.actions;

export default InfluencerStepperSlice.reducer;
