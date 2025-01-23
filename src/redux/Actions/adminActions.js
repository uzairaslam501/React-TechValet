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
import { logout, renewToken } from "../Reducers/authSlice";

const api = axios.create({
  baseURL: baseUrl,
});



// Add User
export const postAddUser = createAsyncThunk(
  "admin/postAddUser",
  async (userData, { rejectWithValue, getState, dispatch }) => {
    const { token, expired } = getToken(getState);
    try {
        const response = await api.post(
        `/Admin/PostAddUser`,
        userData,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
    //   const response1 = await api.post("/Admin/PostAddUser", userData,
    //     {
    //       headers: {
    //         Authorization: `${token}`,
    //       },
    //     }
    // );
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


//User Update
export const postUpdateUser = createAsyncThunk(
  "admin/postUpdateUser",
  async (
    { userId, userData },
    { rejectWithValue, getState, dispatch }
  ) => {
    const { token, expired } = getToken(getState);
    try {
      const response = await api.put(
        `/Admin/PostUpdateUser/${String(
          encodeURIComponent(userId)
        )}`,
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
      return data;
    } catch (error) {
      handleApiError(error, dispatch, expired);
    }
  }
);