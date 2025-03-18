import { fetchInfluencers } from "@/redux/services/influencer";
import { filterInfluencer } from "@/redux/services/influencer/filter";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filterResults: [],
  influencers: [],
};

const FilterInfluencerSlice = createSlice({
  name: "filterResults",
  initialState,
  reducers: {
    setResults: (state, action) => {
      state.filterResults = action.payload;
    },
    setInfluencers: (state, action) => {
      state.influencers = action.payload;
    },
  },
});

export const {
  setResults,
  setInfluencers
} = FilterInfluencerSlice.actions;


export const fetchAllFilterResults = (auth,payload) => async (dispatch) => {
  try {
    const data = await filterInfluencer(auth,payload);
    dispatch(setResults(data));
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const getAllInfluencers = (auth) => async (dispatch) => {
  try {
    const data = await fetchInfluencers(auth);
    dispatch(setInfluencers(data));
    return data;
  } catch (error) {
    console.log(error);
  }
};





export default FilterInfluencerSlice.reducer;
