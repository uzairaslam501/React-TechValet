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

export const getMessagesSidebar = createAsyncThunk(
  "messages/getMessagesSidebar",
  async (findUser, { rejectWithValue, getState, dispatch }) => {
    const { token, expired } = getToken(getState);
    try {
      const authId = getUserId(getState);
      const response = await api.get(
        `Message/GetMessageSideBarLists/${authId}?Name=${findUser}`,
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

export const getUserStatus = createAsyncThunk(
  "messages/getUserStatus",
  async (userId, { rejectWithValue, getState, dispatch }) => {
    const { token, expired } = getToken(getState);
    try {
      const response = await api.get(`Message/GetReceiverStatuses/${userId}`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      const { data } = processApiResponse(response, dispatch, expired);
      return data;
    } catch (error) {
      handleApiError(error, dispatch, expired);
    }
  }
);

export const getUsersMessages = createAsyncThunk(
  "messages/getUsersMessages",
  async (userId, { rejectWithValue, getState, dispatch }) => {
    const { token, expired } = getToken(getState);
    try {
      const authId = getUserId(getState);
      const response = await api.get(
        `Message/GetMessagesForUsers/${authId}?messageUserId=${userId}`,
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

export const sendUsersMessages = createAsyncThunk(
  "messages/sendUsersMessages",
  async (records, { rejectWithValue, getState, dispatch }) => {
    const { token, expired } = getToken(getState);
    try {
      const response = await api.post("/Message/PostAddMessages", records, {
        headers: {
          Authorization: `${token}`,
        },
      });
      const { data, message } = processApiResponse(response, dispatch, expired);
      if (data) {
        toast.success(message);
      }
      return data;
    } catch (error) {
      handleApiError(error, dispatch, expired);
    }
  }
);

export const handleOrderOffer = createAsyncThunk(
  "messages/handleOrderOffer",
  async (records, { rejectWithValue, getState, dispatch }) => {
    const { token, expired } = getToken(getState);
    try {
      const response = await api.put(
        "/Message/UpdateOrderOfferStatus",
        records,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      const { data, message } = processApiResponse(response, dispatch, expired);
      if (data) {
        toast.success(message);
      }
      return data;
    } catch (error) {
      handleApiError(error, dispatch, expired);
    }
  }
);
