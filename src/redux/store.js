import { configureStore } from "@reduxjs/toolkit";
import bucketReducer from "./features/bucket-list/index";
import stepReducer from "./features/stepper/index";
import influencerReducer from "./features/stepper/influencer-stepper";
import filterReducer from "./features/influencer/filter";
import influencerProfileReducer from "./features/influencer/profile";
import campaignReducer from "./features/stepper/campaign-stepper";
import socialsReducer from "./features/socials";
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const stepperPersistConfig = {
  key: 'stepper',
  storage,
  whitelist: ['currentStep', 'formData'],
};

const persistedStepReducer = persistReducer(stepperPersistConfig, stepReducer);

export const store = configureStore({
  reducer: {
    bucket: bucketReducer,
    stepper: persistedStepReducer,
    influencerStepper: influencerReducer,
    campaign: campaignReducer,
    filterResults: filterReducer,
    influencerProfile: influencerProfileReducer,
    socials: socialsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
