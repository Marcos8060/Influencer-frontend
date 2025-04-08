import { tiktokLogin } from "@/redux/services/auth/socials";
import { fetchTiktokProfile } from "@/redux/services/socials";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tiktokResponse: {},
  tiktokProfile: {},
};

const SocialsSlice = createSlice({
  name: "socials",
  initialState,
  reducers: {
    setTiktok: (state, action) => {
      state.tiktokResponse = action.payload;
    },
    setTiktokProfile: (state, action) => {
      state.tiktokProfile = action.payload;
    },
  },
});

export const {
  setTiktok,
  setTiktokProfile
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

export const getTiktokProfile = (auth) => async (dispatch) => {
  try {
    const data = await fetchTiktokProfile(auth);
    dispatch(setTiktokProfile(data));
    return data;
  } catch (error) {
    console.log(error);
  }
};






export default SocialsSlice.reducer;
