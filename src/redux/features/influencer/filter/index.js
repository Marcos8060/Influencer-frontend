import { filterInfluencer } from "@/redux/services/influencer/filter";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filterResults: [],
};

const FilterInfluencerSlice = createSlice({
  name: "filterResults",
  initialState,
  reducers: {
    setResults: (state, action) => {
      state.filterResults = action.payload;
    },
    
  },
});

export const {
  setResults,
} = FilterInfluencerSlice.actions;


export const fetchAllFilterResults = (auth,payload) => async (dispatch) => {
  try {
    const data = await filterInfluencer(auth,payload);
    dispatch(setResults(data));
  } catch (error) {
    console.log(error);
  }
};





export default FilterInfluencerSlice.reducer;
