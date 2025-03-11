import { createSlice } from "@reduxjs/toolkit";
import { fetchTrips } from '../../services/auth'

const initialState = {
  currentStep: 0,
  formData: {
    platformIntroductionSource: "",
    brandWebsite: "",
    brandName: "",
    brandDescription: "",
    brandUniqueness: "",
    businessType: "",
    businessIndustry: "",
    companySize: "",
    companyType: "",
    monthlyNumberOfInfluencers: "",
    geographicalScopeOfOperations: [],
    preferredSocialMediaPlatforms: [],
    mostImportantCollaborationFactor: [],
    preferredInfluencerMinimumFollowers: "",
    preferredInfluencerGenders: [],
    preferredInfluencerEthnicities: [],
    preferredInfluencerAgeGroups: [],
    preferredInfluencerCountries: [],
    preferredInfluencerCategories: [],
    preferredPaymentOption: [],
    preferredPaidMinimumPay: "",
    preferredPaidMaximumPay: "",
    campaignGoal: "",
    preferredContentFormats: [],
    preferredVideoType: [],
    userId: "", // Will be set when the user is authenticated
    agreedToTerms: false,
    finishedOnboarding: false
  }
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
        state.currentStep = Math.max(0, state.currentStep - 1)
    },
    updateFormData: (state,action) => {
      state.formData = {...state.formData,...action.payload };
    }
  },
});

export const {
  setCurrentStep,
  nextStep,
  previousStep,
  updateFormData
} = StepperSlice.actions;





export default StepperSlice.reducer;
