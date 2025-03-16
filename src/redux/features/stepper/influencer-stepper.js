import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentStep: 0,
  influencerData: {
    platformIntroductionSource: "",
    isInstagramAccountConnected: false,
    isTwitterAccountConnected: false,
    isFacebookAccountConnected: false,
    isTiktokAccountConnected: false,
    gender: "",
    dateOfBirth: "",
    ethnicBackground: "",
    contentCategories: "",
    preferredCompaniesType: "",
    brandTypes: "",
    influencerTopics: "",
    influencerAddressLine1: null,
    influencerAddressLine2: null,
    influencerCity: null,
    influencerCountry: null,
    influencerZipCode: null,
    influencerPhoneNumber: null,
    preferredCollaborationContentFormat: "",
    preferredPaymentOption: [],
    preferredPaidMinimumPay: null,
    preferredPaidMaximumPay: null,
    preferredLeadTimeForProjectDays: 0,
    agreedToTerms: false,
    finishedOnboarding: false,
    userId: null,
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
  },
});

export const {
  setCurrentStep,
  nextStep,
  previousStep,
  updateFormData,
} = InfluencerStepperSlice.actions;

export default InfluencerStepperSlice.reducer;
