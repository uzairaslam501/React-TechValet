import {
  addEducation,
  updateEducation,
  getEducations,
} from "../Actions/educationActions";
import { createSlice } from "@reduxjs/toolkit";

// Create education slice
const educationSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addEducation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addEducation.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(addEducation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(updateEducation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateEducation.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateEducation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(getEducations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEducations.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(getEducations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default educationSlice.reducer;
