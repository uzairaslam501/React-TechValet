import {
  postLogin,
  postRegister,
  postUserUpdate,
} from "../Actions/authActions";
import { createSlice } from "@reduxjs/toolkit";

const userLoginFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

// Create auth slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    userAuth: userLoginFromStorage,
    loading: false,
    error: null,
  },
  reducers: {
    logout(state) {
      state.userAuth = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Handle login actions
    builder
      .addCase(postLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.userAuth = action.payload; // Save user data in the state
      })
      .addCase(postLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Save error message
      });
    // Handle registration actions
    builder
      .addCase(postRegister.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postRegister.fulfilled, (state, action) => {
        state.loading = false;
        // Optionally, handle successful registration (e.g., auto-login)
        // state.userAuth = action.payload;
      })
      .addCase(postRegister.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Save error message
      });
    // Handle user update actions
    builder
      .addCase(postUserUpdate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postUserUpdate.fulfilled, (state, action) => {
        state.loading = false;
        state.userAuth = action.payload;
      })
      .addCase(postUserUpdate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Save error message
      });
  },
});

// Export the reducer and actions
export const { logout } = authSlice.actions;
export default authSlice.reducer;
