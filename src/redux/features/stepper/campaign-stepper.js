import { createSlice } from "@reduxjs/toolkit";
import { fetchBrandCampaigns, fetchProducts } from "@/redux/services/campaign";

const initialState = {
  currentStep: 0,
  brandCampaigns: [],
  products: [],
  campaignData: {
    title: "",
    description: "",
    briefTitle: "",
    briefDescription: "",
    startDate: "",
    endDate: "",
    coverImage: null,
    products: [],
    services: [],
    exampleVideoUrl: "",
    campaignPreferences: {
      videoStyle: [],
      videosPerCreator: null,
      videoDuration: null,
      showFace: true,
      videoFormat: "vertical",
      socialChannels: [],
      collaborationType: [],
      campaignObjective: "",
      contentLanguages: "en,es,fr",
    },
    campaignCollaborators: [
      {
        influencerId: "4d757a99-183e-4fe1-a1b1-d3f23edb2791",
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
    setCampaigns: (state, action) => {
      state.brandCampaigns = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
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
    resetCampaignData: (state) => {
      state.campaignData = initialState.campaignData;
    }
  },
});

export const {
  setCurrentStep,
  nextStep,
  previousStep,
  updateFormData,
  setCampaigns,
  setProducts,
  resetCampaignData,
} = CampaignSlice.actions;

export const fetchAllBrandCampaigns = (auth) => async (dispatch) => {
  try {
    const data = await fetchBrandCampaigns(auth);
    dispatch(setCampaigns(data));
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllProducts = (auth) => async (dispatch) => {
  try {
    const data = await fetchProducts(auth);
    dispatch(setProducts(data));
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default CampaignSlice.reducer;
