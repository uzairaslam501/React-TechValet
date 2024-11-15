import {
  getValetsList,
  getKeywords,
  getValetsBySearch,
  getRecords,
  getOrderRecords,
  getUserPackagesRecords,
  getUserPackagesConsumptionRecords,
  requestService,
  getUserForSkills,
} from "../Actions/customerActions";
import { createSlice } from "@reduxjs/toolkit";

// Create auth slice
const customerSlice = createSlice({
  name: "customer",
  initialState: {
    loading: false,
    error: null,
  },
  reducers: {
    logout(state) {
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = undefined;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/fulfilled"),
        (state, { payload }) => {
          state.message = payload?.message;
          state.loading = false;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, { payload }) => {
          state.loading = false;
          state.error = payload?.message || "Something went wrong";
        }
      );
  },
});

export default customerSlice.reducer;
