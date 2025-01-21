import { createSlice } from "@reduxjs/toolkit";
import {
  addServicesOrExperience,
  updateServicesOrExperience,
  getServicesRecord,
  updateSlotTimes,
  getAvailability,
  getUserEarnings,
} from "../Actions/serviceActions";

const initialState = {
  loading: false,
  error: null,
  servicesData: null,
  availabilityData: null,
  earningsData: null,
};

const servicesSlice = createSlice({
  name: "service",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle addServicesOrExperience
    builder
      .addCase(addServicesOrExperience.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addServicesOrExperience.fulfilled, (state, action) => {
        state.loading = false;
        state.servicesData = action.payload;
      })
      .addCase(addServicesOrExperience.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    // Handle updateServicesOrExperience
    builder
      .addCase(updateServicesOrExperience.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateServicesOrExperience.fulfilled, (state, action) => {
        state.loading = false;
        state.servicesData = action.payload;
      })
      .addCase(updateServicesOrExperience.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update the record";
      });

    // Handle getServicesRecord
    builder
      .addCase(getServicesRecord.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getServicesRecord.fulfilled, (state, action) => {
        state.loading = false;
        state.servicesData = action.payload;
      })
      .addCase(getServicesRecord.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Handle updateSlotTimes
    builder
      .addCase(updateSlotTimes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSlotTimes.fulfilled, (state, action) => {
        state.loading = false;
        state.servicesData = action.payload;
      })
      .addCase(updateSlotTimes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Handle getAvailability
    builder
      .addCase(getAvailability.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAvailability.fulfilled, (state, action) => {
        state.loading = false;
        state.availabilityData = action.payload;
      })
      .addCase(getAvailability.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Handle getUserEarnings
    builder
      .addCase(getUserEarnings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserEarnings.fulfilled, (state, action) => {
        state.loading = false;
        state.earningsData = action.payload;
      })
      .addCase(getUserEarnings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.message;
      });
  },
});

export default servicesSlice.reducer;
