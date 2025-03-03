import { createSlice } from "@reduxjs/toolkit";
import { fetchTrips } from '../../services/auth'

const initialState = {
  currentStep: 0,
};

const StepperSlice = createSlice({
  name: "stepper",
  initialState,
  reducers: {
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
    nextStep: (state) => {
        state.currentStep += 1;
    },
    previousStep: (state) => {
        state.currentStep = Math.max(0, state.currentStep - 1)
    }
  },
});

export const {
  setCurrentStep,
  nextStep,
  previousStep,
} = StepperSlice.actions;





export default StepperSlice.reducer;
