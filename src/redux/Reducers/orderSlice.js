import { createSlice } from "@reduxjs/toolkit";
import { getOrderDetails, getOrderMessages } from "../Actions/orderActions";

const initialState = {
  loading: false,
  error: null,
  data: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle getOrderDetails
    builder
      .addCase(getOrderDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getOrderDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    // getOrderMessages
    builder
      .addCase(getOrderMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload; // Update the state with the server response if needed
      })
      .addCase(getOrderMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = "Failed to delete the record";
      });
  },
});

export default orderSlice.reducer;
