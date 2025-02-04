import { configureStore } from "@reduxjs/toolkit";
import tripReducer from "./features/trips/index";
import stepReducer from "./features/stepper/index";

export const store = configureStore({
  reducer: {
    trips: tripReducer,
    stepper: stepReducer,
  },
});
