import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  handleApiError,
  processApiResponse,
} from "../../utils/_handler/_exceptions";
import { baseUrl } from "../../utils/_envConfig";
import { toast } from "react-toastify";
import { getToken, getUserId } from "../../utils/_apiConfig";
import { setLoading } from "../Reducers/loadingSlice";

const api = axios.create({
  baseURL: baseUrl,
});

export const getKeywords = createAsyncThunk(
  "user/getKeywords",
  async (_, { rejectWithValue, getState, dispatch }) => {
    const { token, expired } = getToken(getState);
    try {
      const response = await api.get("/User/GetHighSearchedKeys", {
        headers: {
          Authorization: `${token}`, // Token included in the request headers
        },
      });
      const responseBack = processApiResponse(response, dispatch, expired);
      return responseBack?.data;
    } catch (error) {
      handleApiError(error, dispatch, expired);
    }
  }
);

export const getValetsList = createAsyncThunk(
  "user/getValetsList",
  async (_, { rejectWithValue, getState, dispatch }) => {
    const { token, expired } = getToken(getState);
    try {
      const response = await api.get("/User/GetUserListAsync", {
        headers: {
          Authorization: `${token}`, // Token included in the request headers
        },
      });
      const responseBack = processApiResponse(response, dispatch, expired);
      return responseBack?.data;
    } catch (error) {
      handleApiError(error, dispatch, expired);
    }
  }
);

export const getValetsBySearch = createAsyncThunk(
  "user/getValetsBySearch",
  async (keyword, { rejectWithValue, getState, dispatch }) => {
    const { token, expired } = getToken(getState);
    try {
      const response = await api.get(`/User/SearchValet?keyword=${keyword}`, {
        headers: {
          Authorization: `${token}`, // Token included in the request headers
        },
      });
      const responseBack = processApiResponse(response, dispatch, expired);
      return responseBack?.data;
    } catch (error) {
      handleApiError(error, dispatch, expired);
    }
  }
);

//#region  RequestService
export const requestService = createAsyncThunk(
  "user/requestService",
  async (record, { rejectWithValue, getState, dispatch }) => {
    const { token, expired } = getToken(getState);
    try {
      const response = await api.post(
        "/Customer/PostAddRequestService",
        record,
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

export const getUserForSkills = createAsyncThunk(
  "user/getUserForSkills",
  async (skills, { rejectWithValue, getState, dispatch }) => {
    const { token, expired } = getToken(getState);
    try {
      const response = await api.get(
        `/User/GetItValetsByRequestSkills?RequestSkills=${skills}`,
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

//#region Packages
export const requestGetUserPackages = createAsyncThunk(
  "packages/requestGetUserPackages",
  async (_, { rejectWithValue, getState, dispatch }) => {
    const { token, expired } = getToken(getState);
    try {
      const userId = getUserId(getState);
      const response = await api.get(
        `/Customer/GetUserSessionStatus/${encodeURIComponent(userId)}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      const { data, message } = processApiResponse(response, dispatch, expired);
      if (data > 0) {
        toast.success(
          `Your package is activated. You have ${data} remaining session(s).`
        );
      }

      return data;
    } catch (error) {
      handleApiError(error, dispatch, expired);
    }
  }
);
//#endregion

//#region Order
export const getOrderById = createAsyncThunk(
  "user/getOrderById",
  async (orderId, { rejectWithValue, getState, dispatch }) => {
    const { token, expired } = getToken(getState);
    try {
      const response = await api.get(`/Customer/GetOrderById/${orderId}`, {
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
//#endregion

//#region Tables

export const getAppointments = createAsyncThunk(
  "customer/getAppointments",
  async (
    { pageNumber, pageLength, sortColumn, sortDirection, searchParam },
    { rejectWithValue, getState, dispatch }
  ) => {
    // Show loader for calendar loading
    dispatch(setLoading({ key: "orderLoading", value: true }));
    const { token, expired } = getToken(getState);
    try {
      const response = await api.get(
        `${baseUrl}/Datatable/GetRequestServicesDatatableByUserIdAsync?start=${pageNumber}&length=${pageLength}&sortColumnName=${sortColumn}
        &sortDirection=${sortDirection}&searchValue=${searchParam}`,
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
      rejectWithValue(error);
    } finally {
      dispatch(setLoading({ key: "orderLoading", value: false }));
    }
  }
);

export const getOrderRecords = createAsyncThunk(
  "customer/getOrderRecords",
  async (
    { pageNumber, pageLength, sortColumn, sortDirection, searchParam },
    { rejectWithValue, getState, dispatch }
  ) => {
    const { token, expired } = getToken(getState);
    // Show loader for calendar loading
    dispatch(setLoading({ key: "orderLoading", value: true }));
    try {
      const response = await api.get(
        `${baseUrl}/Datatable/orders-by-userId?start=${pageNumber}&length=${pageLength}&sortColumnName=${sortColumn}
        &sortDirection=${sortDirection}&searchValue=${searchParam}`,
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
      rejectWithValue(error);
    } finally {
      dispatch(setLoading({ key: "orderLoading", value: false }));
    }
  }
);

export const userPackageByUserId = createAsyncThunk(
  "customer/userPackageByUserId",
  async (
    { pageNumber, pageLength, sortColumn, sortDirection, searchParam },
    { rejectWithValue, getState, dispatch }
  ) => {
    const { token, expired } = getToken(getState);
    dispatch(setLoading({ key: "orderLoading", value: true }));
    const userId = getUserId(getState);
    try {
      const response = await api.get(
        `${baseUrl}/Customer/GetUserPackageByUserId/?start=${pageNumber}&length=${pageLength}&sortColumnName=${sortColumn}
        &sortDirection=${sortDirection}&searchValue=${searchParam}&userId=${encodeURIComponent(
          userId
        )}`,
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
      rejectWithValue(error);
    } finally {
      dispatch(setLoading({ key: "orderLoading", value: false }));
    }
  }
);

export const getUserPackagesConsumptionRecords = createAsyncThunk(
  "customer/getUserPackagesConsumptionRecords",
  async (
    {
      pageNumber,
      pageLength,
      sortColumn,
      sortDirection,
      searchParam,
      packageId,
    },
    { rejectWithValue, getState, dispatch }
  ) => {
    const { token, expired } = getToken(getState);
    try {
      const response = await api.get(
        `${baseUrl}/Datatable/GetOrdersDatatableByPackageId?start=${pageNumber}&length=${pageLength}&sortColumnName=${sortColumn}
        &sortDirection=${sortDirection}&searchValue=${searchParam}&packageId=${packageId}`,
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
      rejectWithValue(error);
    }
  }
);

//#endregion
