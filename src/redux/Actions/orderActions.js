import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  handleApiError,
  processApiResponse,
} from "../../utils/_handler/_exceptions";
import { baseUrl } from "../../utils/_envConfig";
import { getToken, getUserId } from "../../utils/_apiConfig";
import { setLoading } from "../Reducers/loadingSlice";

const api = axios.create({
  baseURL: baseUrl,
});

// Handle getOrderDetails
export const getOrderDetails = createAsyncThunk(
  "orders/getOrderDetails",
  async (orderId, { rejectWithValue, getState, dispatch }) => {
    const { token, expired } = getToken(getState);
    try {
      const userId = getUserId(getState);

      // Show loader for calendar loading
      dispatch(setLoading({ key: "orderLoading", value: true }));

      const response = await api.get(
        `User/GetOrderById/${encodeURIComponent(
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
    } finally {
      // Hide loader after the API call is done
      dispatch(setLoading({ key: "orderLoading", value: false }));
    }
  }
);

//Handle getOrderSlots
export const getTimeSlots = createAsyncThunk(
  "orders/getTimeSlots",
  async ({ userId, date }, { rejectWithValue, getState, dispatch }) => {
    const { token, expired } = getToken(getState);
    try {
      const response = await api.get(
        `User/GetSlots/${encodeURIComponent(userId)}?date=${date}`,
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
    } finally {
    }
  }
);

// Handle getOrderMessages
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

// Handle sendMessages
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

// Handle deliverOrder
export const deliverOrder = createAsyncThunk(
  "order/deliverOrder",
  async (obj, { rejectWithValue, getState, dispatch }) => {
    const { token, expired } = getToken(getState);
    const formData = new FormData();
    formData.append("senderId", obj.senderId);
    formData.append("receiverId", obj.receiverId);
    formData.append("messageDescription", obj.messageDescription);
    formData.append("orderId", obj.orderId);
    formData.append("way", obj.way);

    formData.append("iFilePath", obj.file);

    try {
      const response = await api.post(
        `/Message/PostDeliverOrder/${obj.orderId}`,
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

// Handle orderRevision
export const orderRevision = createAsyncThunk(
  "order/orderRevision",
  async (obj, { rejectWithValue, getState, dispatch }) => {
    const { token, expired } = getToken(getState);

    try {
      const response = await api.put(
        `/Message/PostSendRevision/${obj.orderId}`,
        obj,
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

// Handle deliverOrderAccept
export const deliverOrderAccept = createAsyncThunk(
  "order/deliverOrderAccept",
  async (obj, { rejectWithValue, getState, dispatch }) => {
    const { token, expired } = getToken(getState);

    try {
      const response = await api.post(
        `/Message/AcceptOrder/${obj.orderId}`,
        obj,
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

// Handle orderZoomMeeting
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

// Handle extendOrderRequest
export const extendOrderRequest = createAsyncThunk(
  "order/extendOrderRequest",
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

// Handle cancelOrder
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

// Handle extendOrderConfirmation
export const extendOrderConfirmation = createAsyncThunk(
  "order/extendOrderConfirmation",
  async (obj, { rejectWithValue, getState, dispatch }) => {
    const { token, expired } = getToken(getState);
    try {
      const response = await api.put(
        "/Message/ExtendDateApproval/" + obj.orderId,
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

// Handle orderCancelConfirmation
export const orderCancelConfirmation = createAsyncThunk(
  "order/orderCancelConfirmation",
  async (obj, { rejectWithValue, getState, dispatch }) => {
    const { token, expired } = getToken(getState);
    try {
      const response = await api.put(
        "/Message/HandleCancelOrderRequest/" + obj.orderId,
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

//#region AdminFunctions
// Handle revert Sessions
export const cancelOrderAndRevertStripe = createAsyncThunk(
  "order/cancelOrderAndRevertStripe",
  async (obj, { rejectWithValue, getState, dispatch }) => {
    console.log(obj);
    const { token, expired } = getToken(getState);
    try {
      const response = await api.post(
        `/StripePayment/StripeRefund/${obj.orderEncId}?chargeId=${obj.stripeId}`,
        null,
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

// Handle revert Sessions
export const cancelOrderAndRevertSession = createAsyncThunk(
  "order/cancelOrderAndRevertSession",
  async (obj, { rejectWithValue, getState, dispatch }) => {
    const { token, expired } = getToken(getState);
    try {
      const response = await api.post(
        "/StripePayment/CancelOrderAndRevertSession/" + obj.orderEncId,
        null,
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
//#endregion
