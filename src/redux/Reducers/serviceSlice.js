import { createSlice } from "@reduxjs/toolkit";
import {
  addServicesOrExperience,
  updateServicesOrExperience,
  getServicesRecord,
} from "../Actions/serviceActions";

const initialState = {
  loading: false,
  error: null,
  data: null,
};

const serviceSlice = createSlice({
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
        state.data = action.payload;
      })
      .addCase(addServicesOrExperience.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    // updateServicesOrExperience
    builder
      .addCase(updateServicesOrExperience.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateServicesOrExperience.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(updateServicesOrExperience.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete the record";
      });

    // getServicesRecord
    builder
      .addCase(getServicesRecord.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getServicesRecord.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getServicesRecord.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default stripeSlice.reducer;
