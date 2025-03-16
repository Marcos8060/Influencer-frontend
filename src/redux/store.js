import { configureStore } from "@reduxjs/toolkit";
import bucketReducer from "./features/bucket-list/index";
import stepReducer from "./features/stepper/index";
import influencerReducer from "./features/stepper/influencer-stepper";

export const store = configureStore({
  reducer: {
    bucket: bucketReducer,
    stepper: stepReducer,
    influencerStepper: influencerReducer,
  },
});
