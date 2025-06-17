import { createSlice } from "@reduxjs/toolkit";
import { fetchAllCampaigns, fetchAppliedCampaigns, fetchApprovedCampaigns, fetchBrandCampaigns, fetchCampaignDetails, fetchCampaignPosts, fetchCampaignReport, fetchMedia, fetchPostInsights, fetchProducts } from "@/redux/services/campaign";

const initialState = {
  currentStep: 0,
  brandCampaigns: [],
  allCampaigns: [],
  appliedCampaigns: [],
  approvedCampaigns: [],
  products: [],
  postInsights: [],
  posts: [],
  campaignDetails: {},
  campaignReport: {},
  campaignPosts: [],
  campaignData: {
    title: null,
    description: null,
    briefTitle: null,
    briefDescription: null,
    startDate: null,
    endDate: null,
    coverImage: null,
    products: [],
    services: [],
    exampleVideoUrl: null,
    campaignPreferences: {
      videoStyle: [],
      videosPerCreator: null,
      videoDuration: null,
      showFace: true,
      videoFormat: "vertical",
      socialChannels: [],
      collaborationType: [],
      campaignObjective: null,
      contentLanguages: "en,es,fr",
    },
    campaignCollaborators: [
      // {
      //   influencerId: "4d757a99-183e-4fe1-a1b1-d3f23edb2791",
      //   status: "pending",
      // },
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
    setAllCampaigns: (state, action) => {
      state.allCampaigns = action.payload;
    },
    setAppliedCampaigns: (state, action) => {
      state.appliedCampaigns = action.payload;
    },
    setApprovedCampaigns: (state, action) => {
      state.approvedCampaigns = action.payload;
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
    },
    setPostInsights: (state,action) => {
      state.postInsights = action.payload;
    },
    setPosts: (state,action) => {
      state.posts = action.payload;
    },
    setCampaignDetails: (state,action) => {
      state.campaignDetails = action.payload;
    },
    setCampaignReport: (state,action) => {
      state.campaignReport = action.payload;
    },
    setCampaignPosts: (state,action) => {
      state.campaignPosts = action.payload;
    },
    updateCollaboratorStatus: (state, action) => {
      const { influencerId, campaignId, status } = action.payload;
      
      // Update in campaignData.campaignCollaborators if this is the current campaign
      if (state.campaignData.id === campaignId) {
        const collaboratorIndex = state.campaignData.campaignCollaborators.findIndex(
          c => c.influencerId === influencerId
        );
        
        if (collaboratorIndex !== -1) {
          state.campaignData.campaignCollaborators[collaboratorIndex].status = status;
        } else {
          state.campaignData.campaignCollaborators.push({
            influencerId,
            status
          });
        }
      }
      
      // Also update in campaignDetails if we're viewing that campaign
      if (state.campaignDetails.id === campaignId) {
        const collaboratorIndex = state.campaignDetails.campaignCollaborators?.findIndex(
          c => c.influencerId === influencerId
        );
        
        if (collaboratorIndex !== -1) {
          state.campaignDetails.campaignCollaborators[collaboratorIndex].status = status;
        }
      }
    },
  },
});

export const {
  setCurrentStep,
  nextStep,
  previousStep,
  updateFormData,
  setCampaigns,
  setAllCampaigns,
  setProducts,
  resetCampaignData,
  setPostInsights,
  setPosts,
  setAppliedCampaigns,
  setApprovedCampaigns,
  setCampaignDetails,
  setCampaignReport,
  updateCollaboratorStatus,
  setCampaignPosts
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

export const getAllCampaigns = (auth) => async (dispatch) => {
  try {
    const data = await fetchAllCampaigns(auth);
    dispatch(setAllCampaigns(data));
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getAppliedCampaigns = (auth) => async (dispatch) => {
  try {
    const data = await fetchAppliedCampaigns(auth);
    dispatch(setAppliedCampaigns(data));
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getApprovedCampaigns = (auth) => async (dispatch) => {
  try {
    const data = await fetchApprovedCampaigns(auth);
    dispatch(setApprovedCampaigns(data));
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

export const getAllPosts = (auth,userId) => async (dispatch) => {
  try {
    const data = await fetchMedia(auth,userId);
    dispatch(setPosts(data));
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllPostInsights = (auth,payload) => async (dispatch) => {
  try {
    const data = await fetchPostInsights(auth,payload);
    dispatch(setPostInsights(data));
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllCampaignDetails = (auth,campaign_id) => async (dispatch) => {
  try {
    const data = await fetchCampaignDetails(auth,campaign_id);
    dispatch(setCampaignDetails(data));
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllCampaignReport = (auth,campaign_id) => async (dispatch) => {
  try {
    const data = await fetchCampaignReport(auth,campaign_id);
    dispatch(setCampaignReport(data));
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllCampaignPosts = (auth,campaign_id) => async (dispatch) => {
  try {
    const data = await fetchCampaignPosts(auth,campaign_id);
    dispatch(setCampaignPosts(data));
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default CampaignSlice.reducer;
