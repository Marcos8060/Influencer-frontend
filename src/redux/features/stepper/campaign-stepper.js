import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentStep: 0,
  campaignData: {
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    coverImageUrl: null,
    products: [],
    services: [],
    exampleVideoUrl: "",
    numberOfInfluencers: 8,
    campaignPreferences: {
      videoStyle: "",
      videosPerCreator: null,
      videoDuration: null,
      showFace: true,
      videoFormat: "",
      socialChannels: "",
      collaborationType: "",
      campaignObjective: "",
      contentLanguages: "",
    },
    campaignCollaborators: [
      {
        influencerId: null,
        status: "pending",
      },
    ],
  },
};

const CampaignSlice = createSlice({
  name: "campaign",
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
      state.campaignData = { ...state.campaignData, ...action.payload };
    },
  },
});

export const { setCurrentStep, nextStep, previousStep, updateFormData } =
  CampaignSlice.actions;

export default CampaignSlice.reducer;
