import { fetchBucketList } from "@/redux/services/auth/brand/bucketList";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bucketList: [],
};

const BucketListSlice = createSlice({
  name: "buckets",
  initialState,
  reducers: {
    setBucketList: (state, action) => {
      state.bucketList = action.payload;
    },
    
  },
});

export const {
  setBucketList,
} = BucketListSlice.actions;


export const fetchAllBuckets = (auth) => async (dispatch) => {
  try {
    const data = await fetchBucketList(auth);
    dispatch(setBucketList(data));
  } catch (error) {
    console.log(error);
  }
};





export default BucketListSlice.reducer;
