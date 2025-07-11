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

const brandStepperPersistConfig = {
  key: 'stepper',
  storage,
  whitelist: ['currentStep', 'formData','currentStep','influencerData'],
};

const influencerStepperPersistConfig = {
  key: 'influencerStepper',
  storage,
  whitelist: ['currentStep','influencerData'],
};

const brandPersistedStepReducer = persistReducer(brandStepperPersistConfig, stepReducer);
const influencerPersistedStepReducer = persistReducer(influencerStepperPersistConfig, influencerReducer);

export const store = configureStore({
  reducer: {
    bucket: bucketReducer,
    stepper: brandPersistedStepReducer,
    influencerStepper: influencerPersistedStepReducer,
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
