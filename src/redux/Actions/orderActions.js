import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  handleApiError,
  processApiResponse,
} from "../../utils/_handler/_exceptions";
import { baseUrl } from "../../utils/_envConfig";
import { getToken, getUserId } from "../../utils/_apiConfig";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: baseUrl,
});

export const getOrderDetails = createAsyncThunk(
  "orders/getOrderDetails",
  async (orderId, { rejectWithValue, getState, dispatch }) => {
    const { token, expired } = getToken(getState);
    try {
      const userId = getUserId(getState);
      const response = await api.get(
        `User/GetOrderById/${encodeURIComponent(orderId)}`,
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

export const getOrderMessages = createAsyncThunk(
  "orders/getOrderMessages",
  async (orderId, { rejectWithValue, getState, dispatch }) => {
    const { token, expired } = getToken(getState);
    try {
      const userId = getUserId(getState);
      const response = await api.get(
        `Message/GetMessagesForOrder/${encodeURIComponent(
          orderId
        )}?userId=${encodeURIComponent(userId)}`,
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
