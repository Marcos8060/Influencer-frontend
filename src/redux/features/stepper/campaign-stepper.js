import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentStep: 0,
  campaignData: {
    title: "",
    description: "",
    briefTitle: "",
    briefDescription: "",
    startDate: "",
    endDate: "",
    coverImageUrl: "",
    products: [],
    services: [],
    exampleVideoUrl: "",
    campaignPreferences: {
      videoStyle: "",
      videosPerCreator: null,
      videoDuration: null,
      showFace: true,
      videoFormat: "vertical",
      socialChannels: "",
      collaborationType: "",
      campaignObjective: "",
      contentLanguages: "",
    },
    campaignCollaborators: [
      {
        influencerId: '4d757a99-183e-4fe1-a1b1-d3f23edb2791',
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
