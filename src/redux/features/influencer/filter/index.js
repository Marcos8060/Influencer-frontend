import { fetchBrands, fetchInfluencers, searchBrands } from "@/redux/services/influencer";
import { filterInfluencer, searchInfluencers } from "@/redux/services/influencer/filter";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filterResults: [],
  influencers: [],
  searchResults: [],
  brandResults:[],
  brands: []
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
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
    setBrandResults: (state, action) => {
      state.brandResults = action.payload;
    },
    setBrands: (state, action) => {
      state.brands = action.payload;
    },
  },
});

export const {
  setResults,
  setInfluencers,
  setBrandResults,
  setBrands,
  setSearchResults
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
export const fetchAllSearchResults = (auth,payload) => async (dispatch) => {
  try {
    const data = await searchInfluencers(auth,payload);
    dispatch(setSearchResults(data));
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
export const getAllBrandResults = (auth,payload) => async (dispatch) => {
  try {
    const data = await searchBrands(auth,payload);
    dispatch(setBrandResults(data));
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllBrands = (auth) => async (dispatch) => {
  try {
    const data = await fetchBrands(auth);
    dispatch(setBrands(data));
    return data;
  } catch (error) {
    console.log(error);
  }
};





export default FilterInfluencerSlice.reducer;
