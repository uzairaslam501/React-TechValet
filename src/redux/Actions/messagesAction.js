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

export const getMessagesSidebar = createAsyncThunk(
  "messages/getMessagesSidebar",
  async (findUser, { rejectWithValue, getState, dispatch }) => {
    try {
      const jwtToken = getToken(getState);
      const userId = getAuthUserId(getState);
      const response = await api.get(
        `Message/GetMessageSideBarLists?loggedInUserId=${userId}&Name=${findUser}`,
        {
          headers: {
            Authorization: `${jwtToken}`, // Token included in the request headers
          },
        }
      );
      const { data } = processApiResponse(response, dispatch);
      return data;
    } catch (error) {
      handleApiError(error, dispatch);
    }
  }
);

export const getUserStatus = createAsyncThunk(
  "messages/getUserStatus",
  async (userId, { rejectWithValue, getState, dispatch }) => {
    try {
      const jwtToken = getToken(getState);
      const response = await api.get(`Message/GetReceiverStatuses/${userId}`, {
        headers: {
          Authorization: `${jwtToken}`, // Token included in the request headers
        },
      });
      const { data } = processApiResponse(response, dispatch);
      return data;
    } catch (error) {
      handleApiError(error, dispatch);
    }
  }
);

export const getUsersMessages = createAsyncThunk(
  "messages/getUsersMessages",
  async (userId, { rejectWithValue, getState, dispatch }) => {
    try {
      const loggedInUser = getAuthUserId(getState);
      const jwtToken = getToken(getState);
      const response = await api.get(
        `Message/GetMessagesForUsers?loggedInUserId=${loggedInUser}&userId=${userId}`,
        {
          headers: {
            Authorization: `${jwtToken}`, // Token included in the request headers
          },
        }
      );
      const { data } = processApiResponse(response, dispatch);
      return data;
    } catch (error) {
      handleApiError(error, dispatch);
    }
  }
);

export const sendUsersMessages = createAsyncThunk(
  "messages/sendUsersMessages",
  async (records, { rejectWithValue, getState, dispatch }) => {
    try {
      const jwtToken = getToken(getState);
      const response = await api.post("/Message/PostAddMessages", records, {
        headers: {
          Authorization: `${jwtToken}`, // Token included in the request headers
        },
      });
      const { data, message } = processApiResponse(response, dispatch);
      if (data) {
        toast.success(message);
      }
      return data;
    } catch (error) {
      handleApiError(error, dispatch);
    }
  }
);

export const handleOrderOffer = createAsyncThunk(
  "messages/handleOrderOffer",
  async (records, { rejectWithValue, getState, dispatch }) => {
    try {
      const jwtToken = getToken(getState);
      const response = await api.put(
        "/Message/UpdateOrderOfferStatus",
        records,
        {
          headers: {
            Authorization: `${jwtToken}`, // Token included in the request headers
          },
        }
      );
      const { data, message } = processApiResponse(response, dispatch);
      if (data) {
        toast.success(message);
      }
      return data;
    } catch (error) {
      handleApiError(error, dispatch);
    }
  }
);
