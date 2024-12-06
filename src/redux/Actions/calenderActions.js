import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  handleApiError,
  processApiResponse,
} from "../../utils/_handler/_exceptions";
import { baseUrl } from "../../utils/_envConfig";
import { getToken } from "../../utils/_apiConfig";

const api = axios.create({
  baseURL: baseUrl,
});

export const getOrderEventsByUserId = createAsyncThunk(
  "calendar/getOrderEventsByUserId",
  async (Id, { rejectWithValue, getState, dispatch }) => {
    const { token, expired } = getToken(getState);

    try {
      const response = await api.get(`/User/GetOrderEventsByUserId?Id=${Id}`, {
        headers: {
          Authorization: `${token}`,
        },
      });

      const { data, message } = processApiResponse(response, dispatch, expired);
      return data;
    } catch (error) {
      // Handle errors and propagate them
      handleApiError(error, dispatch, expired);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
