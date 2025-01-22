import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authSlice from "./Reducers/authSlice";
import calendarSlice from "./Reducers/calenderSlice";
import customerSlice from "./Reducers/customerSlice";
import globalSlice from "./Reducers/globalSlice";
import messagesSlice from "./Reducers/messagesSlice";
import notificationSlice from "./Reducers/notificationSlice";
import orderSlice from "./Reducers/orderSlice";
import packageSlice from "./Reducers/packageSlice";
import paypalSlice from "./Reducers/paypalSlice";
import stripeSlice from "./Reducers/stripeSlice";
import servicesSlice from "./Reducers/serviceSlice";
import loadingSlice from "./Reducers/loadingSlice";

// Combine your reducers here
const rootReducer = combineReducers({
  authentication: authSlice,
  calender: calendarSlice,
  customer: customerSlice,
  global: globalSlice,
  message: messagesSlice,
  notification: notificationSlice,
  order: orderSlice,
  package: packageSlice,
  paypal: paypalSlice,
  service: servicesSlice,
  stripe: stripeSlice,
  loading: loadingSlice,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["authentication"], // Include only necessary slices for persistence
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV !== "production", // Automatically enables DevTools in development
});

export const persistor = persistStore(store);
