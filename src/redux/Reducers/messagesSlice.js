import { createSlice } from "@reduxjs/toolkit";
import {
  getMessagesSidebar,
  getUserStatus,
  getUsersMessages,
  sendUsersMessages,
  handleOrderOffer,
} from "../Actions/messagesActions";

const initialState = {
  sidebarMessages: [], // Stores sidebar messages
  userStatus: null, // Stores user status
  userMessages: [], // Stores messages for a specific user
  loading: false, // General loading state
  error: null, // General error state
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    // Define any synchronous reducers if needed
  },
  extraReducers: (builder) => {
    builder
      // Handle getMessagesSidebar
      .addCase(getMessagesSidebar.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMessagesSidebar.fulfilled, (state, action) => {
        state.loading = false;
        state.sidebarMessages = action.payload;
      })
      .addCase(getMessagesSidebar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Handle getUserStatus
      .addCase(getUserStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.userStatus = action.payload;
      })
      .addCase(getUserStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Handle getUsersMessages
      .addCase(getUsersMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsersMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.userMessages = action.payload;
      })
      .addCase(getUsersMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Handle sendUsersMessages
      .addCase(sendUsersMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendUsersMessages.fulfilled, (state, action) => {
        state.loading = false;
        // Optionally append new messages to the existing list
        //state.userMessages = [...state.userMessages, action.payload];
      })
      .addCase(sendUsersMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Handle handleOrderOffer
      .addCase(handleOrderOffer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleOrderOffer.fulfilled, (state, action) => {
        state.loading = false;
        // Optionally update state based on the returned data
      })
      .addCase(handleOrderOffer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default messagesSlice.reducer;
