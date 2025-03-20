import { fetchInfluencers } from "@/redux/services/influencer";
import { filterInfluencer } from "@/redux/services/influencer/filter";
import { fetchInfluencerDetails, fetchInfluencerOnboarding, fetchInfluencerPreferences } from "@/redux/services/influencer/profile";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  influencerPreferences: {},
  influencerOnboarding: {},
  influencerDetails: {},
};

const profileSlice = createSlice({
  name: "influencerProfile",
  initialState,
  reducers: {
    setPreferences: (state, action) => {
      state.influencerPreferences = action.payload;
    },
    setOnboarding: (state, action) => {
      state.influencerOnboarding = action.payload;
    },
    setDetails: (state, action) => {
      state.influencerDetails = action.payload;
    },
  },
});

export const {
  setPreferences,
  setOnboarding,
  setDetails
} = profileSlice.actions;


export const fetchAllInfluencerPreferences = (auth,payload) => async (dispatch) => {
  try {
    const data = await fetchInfluencerPreferences(auth,payload);
    dispatch(setPreferences(data));
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const fetchAllInfluencerOnboarding = (auth) => async (dispatch) => {
  try {
    const data = await fetchInfluencerOnboarding(auth);
    dispatch(setOnboarding(data));
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const fetchAllInfluencerDetails = (auth) => async (dispatch) => {
  try {
    const data = await fetchInfluencerDetails(auth);
    dispatch(setDetails(data));
    return data;
  } catch (error) {
    console.log(error);
  }
};





export default profileSlice.reducer;
