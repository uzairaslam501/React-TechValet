import { createSlice } from "@reduxjs/toolkit";
import { getOrderEventsByUserId } from "../Actions/calenderActions"; // adjust path if needed

const initialState = {
  events: [],
  loading: false,
  error: null,
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    resetState: (state) => {
      state.events = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderEventsByUserId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderEventsByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(getOrderEventsByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || "An error occurred while fetching events.";
      });
  },
});

export const { resetState } = calendarSlice.actions;

export default calendarSlice.reducer;
