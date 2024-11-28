import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  handleApiError,
  processApiResponse,
} from "../../utils/_handler/_exceptions";
import { baseUrl } from "../../utils/_envConfig";
import { getToken } from "../../utils/_apiConfig";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: baseUrl,
});

export const postCheckoutForOrder = createAsyncThunk(
  "paypal/postCheckoutForOrder",
  async (order, { rejectWithValue, getState, dispatch }) => {
    try {
      const jwtToken = getToken(getState);
      const response = await api.post(
        `PayPalGateWay/paypalCheckoutForOrder`,
        order,
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
