import {
  getAdminDashboardCount,
  userAccountActivation,
  setAccountOnHold,
  postAddUser,
  postUpdateUser,
  getUserRecords,
  getUserPackagesRecords,
  getPackagesRecord,
  getStripeRecords,
  getPaypalOrderDetailRecords,
  getPaypalTransactionRecords,
  getPaypalUnclaimedRecords,
  getFeedbackRecords,
} from "../Actions/adminActions";
import { createSlice } from "@reduxjs/toolkit";

// Create admin slice
const adminSlice = createSlice({
  name: "admin",
  initialState: {
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Handle Dashboard Count
    builder
      .addCase(getAdminDashboardCount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAdminDashboardCount.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(getAdminDashboardCount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    // Handle userAccountActivation actions
    builder
      .addCase(userAccountActivation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userAccountActivation.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(userAccountActivation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    // Handle setAccountOnHold actions
    builder
      .addCase(setAccountOnHold.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(setAccountOnHold.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(setAccountOnHold.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    // Handle postAddUser actions
    builder
      .addCase(postAddUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postAddUser.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(postAddUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    // Handle postUpdateUser actions
    builder
      .addCase(postUpdateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postUpdateUser.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(postUpdateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    // Handle getUserRecords actions
    builder
      .addCase(getUserRecords.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserRecords.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(getUserRecords.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    // Handle getUserPackagesRecords actions
    builder
      .addCase(getUserPackagesRecords.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserPackagesRecords.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(getUserPackagesRecords.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    // Handle getPackagesRecord actions
    builder
      .addCase(getPackagesRecord.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPackagesRecord.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(getPackagesRecord.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    // Handle getStripeRecords actions
    builder
      .addCase(getStripeRecords.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStripeRecords.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(getStripeRecords.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    // Handle getPaypalOrderDetailRecords actions
    builder
      .addCase(getPaypalOrderDetailRecords.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPaypalOrderDetailRecords.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(getPaypalOrderDetailRecords.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    // Handle getPaypalTransactionRecords actions
    builder
      .addCase(getPaypalTransactionRecords.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPaypalTransactionRecords.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(getPaypalTransactionRecords.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    // Handle getPaypalUnclaimedRecords actions
    builder
      .addCase(getPaypalUnclaimedRecords.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPaypalUnclaimedRecords.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(getPaypalUnclaimedRecords.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    // Handle getFeedbackRecords actions
    builder
      .addCase(getFeedbackRecords.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFeedbackRecords.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(getFeedbackRecords.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default adminSlice.reducer;
