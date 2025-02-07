import {
  getValetsList,
  getKeywords,
  getValetsBySearch,
  getAppointments,
  getOrderRecords,
  userPackageByUserId,
  getUserPackagesConsumptionRecords,
  requestService,
  getUserForSkills,
  requestGetUserPackages,
  getOrderById,
} from "../Actions/customerActions";
import { createSlice } from "@reduxjs/toolkit";

// Create auth slice
const customerSlice = createSlice({
  name: "customer",
  initialState: {
    loading: false,
    error: null,
    valetsList: null,
    keywords: null,
    searchResults: null,
    appointments: null,
    orderRecords: null,
    packageConsumption: null,
    serviceRequest: null,
    userSkills: null,
    userPackages: null,
  },
  reducers: {
    logout(state) {
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Handle getValetsList
    builder
      .addCase(getValetsList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getValetsList.fulfilled, (state, action) => {
        state.loading = false;
        state.valetsList = action.payload; // Save valets list
      })
      .addCase(getValetsList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Save error message
      });

    // Handle getKeywords
    builder
      .addCase(getKeywords.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getKeywords.fulfilled, (state, action) => {
        state.loading = false;
        state.keywords = action.payload; // Save keywords
      })
      .addCase(getKeywords.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Handle getValetsBySearch
    builder
      .addCase(getValetsBySearch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getValetsBySearch.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload; // Save search results
      })
      .addCase(getValetsBySearch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Handle getAppointments
    builder
      .addCase(getAppointments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = action.payload; // Save appointments
      })
      .addCase(getAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Handle getOrderRecords
    builder
      .addCase(getOrderRecords.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderRecords.fulfilled, (state, action) => {
        state.loading = false;
        state.orderRecords = action.payload; // Save order records
      })
      .addCase(getOrderRecords.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Handle userPackageByUserId
    builder
      .addCase(userPackageByUserId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userPackageByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.userPackages = action.payload; // Save user packages records
      })
      .addCase(userPackageByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Handle getUserPackagesConsumptionRecords
    builder
      .addCase(getUserPackagesConsumptionRecords.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserPackagesConsumptionRecords.fulfilled, (state, action) => {
        state.loading = false;
        state.packageConsumption = action.payload; // Save package consumption records
      })
      .addCase(getUserPackagesConsumptionRecords.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Handle requestService
    builder
      .addCase(requestService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(requestService.fulfilled, (state, action) => {
        state.loading = false;
        state.serviceRequest = action.payload; // Save service request response
      })
      .addCase(requestService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Handle getUserForSkills
    builder
      .addCase(getUserForSkills.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserForSkills.fulfilled, (state, action) => {
        state.loading = false;
        state.userSkills = action.payload; // Save user skills
      })
      .addCase(getUserForSkills.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Handle requestGetUserPackages
    builder
      .addCase(requestGetUserPackages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(requestGetUserPackages.fulfilled, (state, action) => {
        state.loading = false;
        state.userPackages = action.payload; // Save user packages
      })
      .addCase(requestGetUserPackages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Handle getOrderById
    builder
      .addCase(getOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(getOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default customerSlice.reducer;
