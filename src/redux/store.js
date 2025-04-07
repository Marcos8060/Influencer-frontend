import { configureStore } from "@reduxjs/toolkit";
import bucketReducer from "./features/bucket-list/index";
import stepReducer from "./features/stepper/index";
import influencerReducer from "./features/stepper/influencer-stepper";
import filterReducer from "./features/influencer/filter";
import influencerProfileReducer from "./features/influencer/profile";
import campaignReducer from "./features/stepper/campaign-stepper";
import socialsReducer from "./features/socials";

export const store = configureStore({
  reducer: {
    bucket: bucketReducer,
    stepper: stepReducer,
    influencerStepper: influencerReducer,
    campaign: campaignReducer,
    filterResults: filterReducer,
    influencerProfile: influencerProfileReducer,
    socials: socialsReducer,
  },
});
