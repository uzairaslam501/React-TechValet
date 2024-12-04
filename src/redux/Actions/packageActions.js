import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  handleApiError,
  processApiResponse,
} from "../../utils/_handler/_exceptions";
import { baseUrl } from "../../utils/_envConfig";
import { getAuthUserId, getToken } from "../../utils/_apiConfig";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: baseUrl,
});

export const getUserPackageByUserId = createAsyncThunk(
  "package/getUserPackageByUserId",
  async (_, { rejectWithValue, getState, dispatch }) => {
    try {
      const jwtToken = getToken(getState);
      const userId = getAuthUserId(getState);
      const response = await api.get(
        `Customer/GetUserPackageByUserId/${userId}`,
        {
          headers: {
            Authorization: `${jwtToken}`, // Token included in the request headers
          },
        }
      );
      const { data, message } = processApiResponse(response, dispatch);
      return data;
    } catch (error) {
      handleApiError(error, dispatch);
    }
  }
);

export const getPackageById = createAsyncThunk(
  "pakcage/gePackageById",
  async (id, { rejectWithValue, getState, dispatch }) => {
    try {
      const jwtToken = getToken(getState);
      const response = await api.get(`Customer/GetPackageById/${id}`, {
        headers: {
          Authorization: `${jwtToken}`,
        },
      });
      const { data, message } = processApiResponse(response, dispatch);
      return data;
    } catch (error) {
      handleApiError(error, dispatch);
    }
  }
);
