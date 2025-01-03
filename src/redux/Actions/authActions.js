import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  handleApiError,
  processApiResponse,
  rejectWithError,
} from "../../utils/_handler/_exceptions";
import { baseUrl } from "../../utils/_envConfig";
import { toast } from "react-toastify";
import { getToken } from "../../utils/_apiConfig";

const api = axios.create({
  baseURL: baseUrl,
});

// Async thunk for login
export const postLogin = createAsyncThunk(
  "user/postLogin",
  async (userData, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await api.post("/auth/login", userData);
      const { data } = processApiResponse(response, dispatch);
      localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      handleApiError(error, dispatch);
    }
  }
);

// Async thunk for registration
export const postRegister = createAsyncThunk(
  "user/postRegister",
  async (userData, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await api.post("/auth/register", userData);
      const { data, message } = processApiResponse(response, dispatch);
      if (message) {
        toast.success(message);
      }
      return data;
    } catch (error) {
      rejectWithError(error, dispatch);
    }
  }
);

//User Update Profile
export const postUserUpdate = createAsyncThunk(
  "user/postUserUpdate",
  async ({ userId, userData }, { rejectWithValue, getState, dispatch }) => {
    const { token, expired } = getToken(getState);
    try {
      const response = await api.put(
        `/Auth/UpdateProfile/${encodeURIComponent(userId)}`,
        userData,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      const { data, message } = processApiResponse(response, dispatch, expired);
      if (message) {
        toast.success(message);
      }
      localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      handleApiError(error, dispatch, expired);
    }
  }
);

//User Update Profile Image
export const UpdateProfileImage = createAsyncThunk(
  "user/UpdateProfileImage",
  async ({ userId, file }, { rejectWithValue, getState, dispatch }) => {
    const { token, expired } = getToken(getState);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await api.put(
        `/Auth/update-profile-image/${encodeURIComponent(userId)}`,
        formData,
        {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: `${token}`,
          },
        }
      );
      const { data, message } = processApiResponse(response, dispatch, expired);
      if (message) {
        toast.success(message);
      }
      return data;
    } catch (error) {
      handleApiError(error, dispatch, expired);
    }
  }
);

//User Online or Offline Status
export const postUserActivity = createAsyncThunk(
  "user/postUserActivity",
  async (
    { userId, activityStatus },
    { rejectWithValue, getState, dispatch }
  ) => {
    const { token, expired } = getToken(getState);
    try {
      const response = await api.put(
        `/Auth/user-activity-status/${String(
          encodeURIComponent(userId)
        )}?activityStatus=${String(activityStatus)}`,
        null,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      const { data, message } = processApiResponse(response, dispatch, expired);
      if (message) {
        toast.success(message);
      }
      return data;
    } catch (error) {
      handleApiError(error, dispatch, expired);
    }
  }
);

//User Avialable or Unavailable
export const postUserAvailable = createAsyncThunk(
  "user/postUserAvailable",
  async ({ userId, available }, { rejectWithValue, getState, dispatch }) => {
    const { token, expired } = getToken(getState);
    try {
      const response = await api.put(
        `/Auth/user-availability/${String(
          encodeURIComponent(userId)
        )}?availabilityOption=${String(available)}`,
        null,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      const { data, message } = processApiResponse(response, dispatch, expired);
      if (message) {
        toast.success(message);
      }
      return data;
    } catch (error) {
      handleApiError(error, dispatch, expired);
    }
  }
);

//Add User Skills
export const postAddUserSkill = createAsyncThunk(
  "user/postAddUserSkill",
  async ({ userId, skillsName }, { rejectWithValue, getState, dispatch }) => {
    const { token, expired } = getToken(getState);
    try {
      const response = await api.post(
        `/User/postAddSkills/${encodeURIComponent(
          userId
        )}?skillsName=${skillsName}`,
        null,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      const { data, message } = processApiResponse(response, dispatch, expired);
      if (message) {
        toast.success(message);
      }
      return data;
    } catch (error) {
      handleApiError(error, dispatch, expired);
    }
  }
);

//Get User Skills
export const getUserSkills = createAsyncThunk(
  "user/getUserSkills",
  async (userId, { rejectWithValue, getState, dispatch }) => {
    const { token, expired } = getToken(getState);
    try {
      const response = await api.get(
        `/User/GetSkills/${encodeURIComponent(userId)}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      const { data } = processApiResponse(response, dispatch, expired);
      return data;
    } catch (error) {
      handleApiError(error, dispatch, expired);
    }
  }
);
