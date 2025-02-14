import { createSlice } from "@reduxjs/toolkit";
import {
  getRecordById,
  deleteRecords,
  postUpdate,
  getTimezones,
  postAddContact,
  putUpdate,
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

    // postUpdate
    builder
      .addCase(postUpdate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postUpdate.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(postUpdate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    //putUpdate
    builder
      .addCase(putUpdate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(putUpdate.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(putUpdate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // getTimezones
    builder
      .addCase(getTimezones.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTimezones.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getTimezones.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // postAddContact
    builder
      .addCase(postAddContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postAddContact.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(postAddContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default globalSlice.reducer;
