import { createSlice } from "@reduxjs/toolkit";
import {
  getNotificationsCount,
  getNotifications,
  markNotifications,
  markAllNotificationsAsRead,
  deleteNotification,
  deleteAllNotifications,
} from "../Actions/notificationActions";

const initialState = {
  notifications: [],
  notificationsCount: 0,
  loading: false,
  error: null,
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    // Define synchronous actions here if needed
  },
  extraReducers: (builder) => {
    builder
      // Handle getNotificationsCount
      .addCase(getNotificationsCount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getNotificationsCount.fulfilled, (state, action) => {
        state.loading = false;
        state.notificationsCount = action.payload;
      })
      .addCase(getNotificationsCount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Handle getNotifications
      .addCase(getNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload;
      })
      .addCase(getNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Handle markNotifications
      .addCase(markNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(markNotifications.fulfilled, (state, action) => {
        state.loading = false;
        // Optionally update notification state based on response
      })
      .addCase(markNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Handle markAllAsRead
      .addCase(markAllNotificationsAsRead.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(markAllNotificationsAsRead.fulfilled, (state, action) => {
        state.loading = false;
        // Optionally update notification state based on response
      })
      .addCase(markAllNotificationsAsRead.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Handle deleteNotification
      .addCase(deleteNotification.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteNotification.fulfilled, (state, action) => {
        state.loading = false;
        // Optionally filter out the deleted notification from the state
        state.notifications = state.notifications.filter(
          (notification) => notification.id !== action.meta.arg
        );
      })
      .addCase(deleteNotification.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Handle deleteAll
      .addCase(deleteAllNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAllNotifications.fulfilled, (state, action) => {
        state.loading = false;
        // Optionally filter out the deleted notification from the state
        state.notifications = state.notifications.filter(
          (notification) => notification.id !== action.meta.arg
        );
      })
      .addCase(deleteAllNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default notificationsSlice.reducer;
