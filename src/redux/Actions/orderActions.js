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

export const sendMessages = createAsyncThunk(
  "order/sendMessages",
  async (message, { rejectWithValue, getState, dispatch }) => {
    const { token, expired } = getToken(getState);

    const formData = new FormData();
    formData.append("senderId", message.senderId);
    formData.append("receiverId", message.receiverId);
    formData.append("messageDescription", message.messageDescription);
    formData.append("orderId", message.orderId);
    formData.append("way", message.way);

    formData.append("iFilePath", message.file);

    try {
      const response = await api.post(
        "/Message/PostAddOrderMessage",
        formData,
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

export const orderZoomMeeting = createAsyncThunk(
  "order/orderZoomMeeting",
  async (obj, { rejectWithValue, getState, dispatch }) => {
    const { token, expired } = getToken(getState);

    try {
      const response = await api.post(
        `/Message/CreateZoomMeeting?receiverId=${obj.receiverId}&senderId=${obj.senderId}&orderId=${obj.orderId}`,
        null,
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

export const cancelOrder = createAsyncThunk(
  "order/cancelOrder",
  async (obj, { rejectWithValue, getState, dispatch }) => {
    const { token, expired } = getToken(getState);
    try {
      const response = await api.put(
        "/Message/CancelOrder/" + obj.orderId,
        obj,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      const { data, message } = processApiResponse(response, dispatch, expired);
      return data;
    } catch (error) {
      handleApiError(error, dispatch, expired);
    }
  }
);

export const extendOrder = createAsyncThunk(
  "order/extendOrder",
  async (obj, { rejectWithValue, getState, dispatch }) => {
    const { token, expired } = getToken(getState);
    try {
      const response = await api.put(
        "/Message/RequestExtendDate/" + obj.orderId,
        obj,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      const { data, message } = processApiResponse(response, dispatch, expired);      
      return data;
    } catch (error) {
      handleApiError(error, dispatch, expired);
    }
  }
);
