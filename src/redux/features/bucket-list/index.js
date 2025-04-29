import { fetchBucketList, fetchExcludedBucketList } from "@/redux/services/auth/brand/bucketList";
import { fetchInfluencersInBucket } from "@/redux/services/influencer/bucket";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bucketList: [],
  influencersInBucket: [],
  excludedBuckets: [],
};

const BucketListSlice = createSlice({
  name: "buckets",
  initialState,
  reducers: {
    setBucketList: (state, action) => {
      state.bucketList = action.payload;
    },
    setInfluencers: (state, action) => {
      state.influencersInBucket = action.payload;
    },
    setExcludedBuckets: (state, action) => {
      state.excludedBuckets = action.payload;
    },
    
  },
});

export const {
  setBucketList,
  setInfluencers,
  setExcludedBuckets
} = BucketListSlice.actions;


export const fetchAllBuckets = (auth) => async (dispatch) => {
  try {
    const data = await fetchBucketList(auth);
    dispatch(setBucketList(data));
  } catch (error) {
    console.log(error);
  }
};

export const fetchExcludedBuckets = (auth,influencer_id) => async (dispatch) => {
  try {
    const data = await fetchExcludedBucketList(auth,influencer_id);
    dispatch(setExcludedBuckets(data));
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchAllInfluencersInBucket = (auth,id) => async (dispatch) => {
  try {
    const data = await fetchInfluencersInBucket(auth,id);
    dispatch(setInfluencers(data));
  } catch (error) {
    console.log(error);
  }
};





export default BucketListSlice.reducer;
