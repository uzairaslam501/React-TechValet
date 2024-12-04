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
  "paypal/PayPalCheckoutForOrder",
  async (orderDto, { rejectWithValue, getState, dispatch }) => {
    try {
      const jwtToken = getToken(getState);
      const response = await api.post(
        `PayPalGateWay/PayPalCheckoutForOrder`,
        orderDto,
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

export const checkPaymentStatusForOrder = createAsyncThunk(
  "paypal/checkPaymentStatusForOrder",
  async (model, { rejectWithValue, getState, dispatch }) => {
    try {
      const jwtToken = getToken(getState);
      const response = await api.get(
        `PayPalGateWay/CheckPaymentStatusForOrder?paymentId=${model.paymentId}&token=${model.token}&payerID=${model.payerId}`,
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

export const chargeByPackage = createAsyncThunk(
  "paypal/chargeByPackage",
  async (checkoutDto, { rejectWithValue, getState, dispatch }) => {
    try {
      const jwtToken = getToken(getState);
      const response = await api.post(
        `PayPalGateWay/CreateOrderBySession/`,
        checkoutDto,
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
