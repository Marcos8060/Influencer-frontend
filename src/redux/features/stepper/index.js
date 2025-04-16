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
    zipCode: null,
    brandName: null,
    brandDescription: null,
    // brandUniqueness: null,
    businessType: null,
    businessIndustry: null,
    // companySize: null,
    // companyType: null,
    // monthlyNumberOfInfluencers: null,
    // geographicalScopeOfOperations: [],
    preferredSocialMediaPlatforms: [],
    // mostImportantCollaborationFactor: [],
    // preferredInfluencerMinimumFollowers: null,
    // preferredInfluencerGenders: [],
    // preferredInfluencerEthnicities: [],
    // preferredInfluencerAgeGroups: [],
    preferredInfluencerCountries: [],
    // preferredInfluencerCategories: [],
    // preferredPaymentOption: [],
    // preferredPaidMinimumPay: null,
    // preferredPaidMaximumPay: null,
    // campaignGoal: null,
    // preferredContentFormats: [],
    // preferredVideoType: [],
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
  },
});

export const { setCurrentStep, nextStep, previousStep, updateFormData } =
  StepperSlice.actions;

export default StepperSlice.reducer;
