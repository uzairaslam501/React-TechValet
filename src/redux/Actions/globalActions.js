import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  handleApiError,
  processApiResponse,
} from "../../utils/_handler/_exceptions";
import { baseUrl } from "../../utils/_envConfig";
import { getToken } from "../../utils/_apiConfig";
import { useSelector } from "react-redux";

const api = axios.create({
  baseURL: baseUrl,
});

export const getRecordById = createAsyncThunk(
  "global/getRecordById",
  async (endpoint, { rejectWithValue, getState, dispatch }) => {
    try {
      const jwtToken = getToken(getState);
      const response = await api.get(endpoint, {
        headers: {
          Authorization: `${jwtToken}`, // Token included in the request headers
        },
      });
      const { data, message } = processApiResponse(response, dispatch);
      return data;
    } catch (error) {
      handleApiError(error, dispatch);
    }
  }
);

export const postUpdate = createAsyncThunk(
  "global/postUpdate",
  async (endpoint, { rejectWithValue, getState, dispatch }) => {
    try {
      const userAuth = getState()?.authentication?.userAuth;
      console.log("userAuth", userAuth);
      const jwtToken = getToken(getState);
      const response = await api.post(endpoint, {
        headers: {
          Authorization: `${jwtToken}`, // Token included in the request headers
        },
      });
      const { data, message } = processApiResponse(response, dispatch);
      return data;
    } catch (error) {
      handleApiError(error, dispatch);
    }
  }
);
