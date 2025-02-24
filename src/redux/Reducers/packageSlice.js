import { createSlice } from "@reduxjs/toolkit";
import {
  getUserPackageByUserId,
  getPackageById,
  getPackageByUserId,
  paymentWithPackage,
} from "../Actions/packageActions";

const initialState = {
  userPackage: null, // Stores the package for the authenticated user
  selectedPackage: null, // Stores details of a specific package
  loading: false, // General loading state
  error: null, // Error state for API requests
};

const packageSlice = createSlice({
  name: "package",
  initialState,
  reducers: {
    // Define synchronous actions if needed (e.g., resetting state)
  },
  extraReducers: (builder) => {
    builder
      // Handle getUserPackageByUserId
      .addCase(getUserPackageByUserId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserPackageByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.userPackage = action.payload;
      })
      .addCase(getUserPackageByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Handle getPackageById
      .addCase(getPackageById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPackageById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedPackage = action.payload;
      })
      .addCase(getPackageById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Handle getPackageByUserId
      .addCase(getPackageByUserId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPackageByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedPackage = action.payload;
      })
      .addCase(getPackageByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Handle PaymentWithPackage
      .addCase(paymentWithPackage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(paymentWithPackage.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedPackage = action.payload;
      })
      .addCase(paymentWithPackage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default packageSlice.reducer;
