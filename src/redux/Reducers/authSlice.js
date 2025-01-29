import {
  postLogin,
  postRegister,
  postUserUpdate,
  UpdateProfileImage,
  postUserActivity,
  postUserAvailable,
  postAddUserSkill,
  getUserSkills,
  postRenewToken,
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
    renewToken(state, payload) {
      state.userAuth.token = payload.token;
      state.userAuth.tokenExpire = payload.tokenExpire;
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
        state.userAuth = action.payload ? action.payload : state.userAuth; // Save updated user data
      })
      .addCase(postUserUpdate.rejected, (state, action) => {
        state.loading = false;
        state.error = "something went wrong"; // Save error message
      });

    // Handle profile image update actions
    builder
      .addCase(UpdateProfileImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UpdateProfileImage.fulfilled, (state, action) => {
        state.loading = false;
        state.userAuth = action.payload ? action.payload : state.userAuth;
      })
      .addCase(UpdateProfileImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Handle user activity update actions
    builder
      .addCase(postUserActivity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postUserActivity.fulfilled, (state, action) => {
        state.loading = false;
        state.userAuth = {
          ...state.userAuth,
          activity: action.payload, // Update activity in userAuth
        };
      })
      .addCase(postUserActivity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Handle user availability update actions
    builder
      .addCase(postUserAvailable.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postUserAvailable.fulfilled, (state, action) => {
        state.loading = false;
        state.userAuth = {
          ...state.userAuth,
          availability: action.payload, // Update availability in userAuth
        };
      })
      .addCase(postUserAvailable.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Handle add user skill actions
    builder
      .addCase(postAddUserSkill.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postAddUserSkill.fulfilled, (state, action) => {
        state.loading = false;
        state.userAuth = {
          ...state.userAuth,
          skills: [...(state.userAuth.skills || []), action.payload], // Add new skill
        };
      })
      .addCase(postAddUserSkill.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Handle get user skills actions
    builder
      .addCase(getUserSkills.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserSkills.fulfilled, (state, action) => {
        state.loading = false;
        state.skills = action.payload; // Save fetched skills
      })
      .addCase(getUserSkills.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Handle renew token actions
    builder
      .addCase(postRenewToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postRenewToken.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload; // Update token in the state
      })
      .addCase(postRenewToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export the reducer and actions
export const { logout, renewToken } = authSlice.actions;
export default authSlice.reducer;
