import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  handleApiError,
  processApiResponse,
} from "../../utils/_handler/_exceptions";
import { baseUrl } from "../../utils/_envConfig";
import { toast } from "react-toastify";
import { getToken } from "../../utils/_apiConfig";

const api = axios.create({
  baseURL: baseUrl,
});

const initialState = {
  loading: false,
  error: null,
};

export const getKeywords = createAsyncThunk(
  "user/getKeywords",
  async (_, { rejectWithValue, getState, dispatch }) => {
    try {
      const jwtToken = getToken(getState);
      const response = await api.get("/User/GetHighSearchedKeys", {
        headers: {
          Authorization: `${jwtToken}`, // Token included in the request headers
        },
      });
      const responseBack = processApiResponse(response, dispatch);
      console.log(responseBack.data);
      return responseBack?.data;
    } catch (error) {
      handleApiError(error, dispatch);
    }
  }
);

export const getValetsList = createAsyncThunk(
  "user/getValetsList",
  async (_, { rejectWithValue, getState, dispatch }) => {
    try {
      const jwtToken = getToken(getState);
      const response = await api.get("/User/GetUserListAsync", {
        headers: {
          Authorization: `${jwtToken}`, // Token included in the request headers
        },
      });
      const responseBack = processApiResponse(response, dispatch);
      console.log(responseBack.data);
      return responseBack?.data;
    } catch (error) {
      handleApiError(error, dispatch);
    }
  }
);
