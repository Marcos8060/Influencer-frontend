import { tiktokLogin } from "@/redux/services/auth/socials";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tiktokResponse: {},
};

const SocialsSlice = createSlice({
  name: "socials",
  initialState,
  reducers: {
    setTiktok: (state, action) => {
      state.tiktokResponse = action.payload;
    },
  },
});

export const {
  setTiktok,
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






export default SocialsSlice.reducer;
