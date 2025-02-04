import { createSlice } from "@reduxjs/toolkit";
import { fetchTrips } from '../../services/trips'

const initialState = {
  trips: [],
};

const TripSlice = createSlice({
  name: "trips",
  initialState,
  reducers: {
    setTrips: (state, action) => {
      state.trips = action.payload;
    },
    
  },
});

export const {
  setTrips,
} = TripSlice.actions;


export const fetchAllTrips = () => async (dispatch) => {
    
  try {
    const data = await fetchTrips();
    dispatch(setTrips(data));
  } catch (error) {
    dispatch(setError(error.message));
  }
};





export default TripSlice.reducer;
