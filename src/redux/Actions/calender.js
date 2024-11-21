import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  handleApiError,
  processApiResponse,
} from "../../utils/_handler/_exceptions";
import { baseUrl } from "../../utils/_envConfig";
import { toast } from "react-toastify";
import { getAuthConfig } from "../../utils/_apiConfig";

export const getOrderEventsByUserId = createAsyncThunk(
  "calendar/getOrderEventsByUserId",
  async (Id, { rejectWithValue, getState, dispatch }) => {
    try {
      const config = getAuthConfig(getState);
      const response = await axios.get(
        `${baseUrl}/User/GetOrderEventsByUserId?Id=${Id}`,
        config
      );
      const responseBack = response?.data;
      return responseBack;
    } catch (error) {
      handleApiError(error, dispatch, getState().authentication?.userAuth);
      rejectWithValue(error);
    }
  }
);
