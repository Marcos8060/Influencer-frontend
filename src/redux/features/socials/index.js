import { instagramLogin, tiktokLogin } from "@/redux/services/auth/socials";
import { fetchInfluencerProfileByBrand, fetchInstagramProfile, fetchTiktokPosts, fetchTiktokProfile } from "@/redux/services/socials";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tiktokResponse: {},
  instagramResponse: {},
  tiktokProfile: {},
  instagramProfile: {},
  brandInfluencerProfile: {},
  tiktokPosts: []
};

const SocialsSlice = createSlice({
  name: "socials",
  initialState,
  reducers: {
    setTiktok: (state, action) => {
      state.tiktokResponse = action.payload;
    },
    setInstagram: (state, action) => {
      state.instagramResponse = action.payload;
    },
    setTiktokProfile: (state, action) => {
      state.tiktokProfile = action.payload;
    },
    setInstagramProfile: (state, action) => {
      state.instagramProfile = action.payload;
    },
    setTiktokPosts: (state, action) => {
      state.tiktokPosts = action.payload;
    },
    setBrandInfluencerProfile: (state, action) => {
      state.brandInfluencerProfile = action.payload;
    },
  },
});

export const {
  setTiktok,
  setTiktokProfile,
  setInstagram,
  setInstagramProfile,
  setTiktokPosts,
  setBrandInfluencerProfile
} = SocialsSlice.actions;


export const getTiktokResponse = (auth) => async (dispatch) => {
  try {
    const data = await tiktokLogin(auth);
    dispatch(setTiktok(data));
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getInstagramResponse = (auth) => async (dispatch) => {
  try {
    const data = await instagramLogin(auth);
    dispatch(setInstagram(data));
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getTiktokProfile = (auth) => async (dispatch) => {
  try {
    const data = await fetchTiktokProfile(auth);
    dispatch(setTiktokProfile(data));
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getInstagramProfile = (auth) => async (dispatch) => {
  try {
    const data = await fetchInstagramProfile(auth);
    dispatch(setInstagramProfile(data));
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllTiktokPosts = (auth) => async (dispatch) => {
  try {
    const data = await fetchTiktokPosts(auth);
    dispatch(setTiktokPosts(data));
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getInfluencerProfileByBrand = (auth,influencerId) => async (dispatch) => {
  try {
    const data = await fetchInfluencerProfileByBrand(auth,influencerId);
    dispatch(setBrandInfluencerProfile(data));
    return data;
  } catch (error) {
    console.log(error);
  }
};






export default SocialsSlice.reducer;
