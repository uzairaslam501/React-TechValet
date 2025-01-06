import { createSlice } from "@reduxjs/toolkit";
import {
  getRecordById,
  deleteRecords,
  getTimezones,
} from "../Actions/globalActions";

const initialState = {
  loading: false,
  error: null,
  data: null,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle getRecordById
    builder
      .addCase(getRecordById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRecordById.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getRecordById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    // deleteRecords
    builder
      .addCase(deleteRecords.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteRecords.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload; // Update the state with the server response if needed
      })
      .addCase(deleteRecords.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete the record";
      });

    // getTimezones
    builder
      .addCase(getTimezones.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTimezones.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload; // Update the state with the server response if needed
      })
      .addCase(getTimezones.rejected, (state, action) => {
        state.loading = false;
        state.error = "Failed to delete the record";
      });
  },
});

export default globalSlice.reducer;
