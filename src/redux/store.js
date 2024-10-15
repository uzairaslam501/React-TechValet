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
import customerSlice from "./Reducers/customerSlice";

// Combine your reducers here
const rootReducer = combineReducers({
  authentication: authSlice,
  customer: customerSlice,
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
