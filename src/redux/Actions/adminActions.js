import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  handleApiError,
  processApiResponse,
  rejectWithError,
} from "../../utils/_handler/_exceptions";
import { baseUrl } from "../../utils/_envConfig";
import { toast } from "react-toastify";
import { getToken } from "../../utils/_apiConfig";
import { logout, renewToken } from "../Reducers/authSlice";
import { setLoading } from "../Reducers/loadingSlice";

const api = axios.create({
  baseURL: baseUrl,
});

// Add User
export const postAddUser = createAsyncThunk(
  "admin/postAddUser",
  async (userData, { rejectWithValue, getState, dispatch }) => {
    const { token, expired } = getToken(getState);
    try {
      const response = await api.post(`/Admin/PostAddUser`, userData, {
        headers: {
          Authorization: `${token}`,
        },
      });
      //   const response1 = await api.post("/Admin/PostAddUser", userData,
      //     {
      //       headers: {
      //         Authorization: `${token}`,
      //       },
      //     }
      // );
      const { data, message } = processApiResponse(response, dispatch);
      if (message) {
        toast.success(message);
      }
      return data;
    } catch (error) {
      rejectWithError(error, dispatch);
    }
  }
);

//User Update
export const postUpdateUser = createAsyncThunk(
  "admin/postUpdateUser",
  async ({ userId, userData }, { rejectWithValue, getState, dispatch }) => {
    const { token, expired } = getToken(getState);
    try {
      const response = await api.put(
        `/Admin/PostUpdateUser/${String(encodeURIComponent(userId))}`,
        userData,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      const { data, message } = processApiResponse(response, dispatch, expired);
      if (message) {
        toast.success(message);
      }
      return data;
    } catch (error) {
      handleApiError(error, dispatch, expired);
    }
  }
);

//#region  tables
export const getUserRecords = createAsyncThunk(
  "admin/getUserRecords",
  async (
    { role, pageNumber, pageLength, sortColumn, sortDirection, searchParam },
    { rejectWithValue, getState, dispatch }
  ) => {
    const { token, expired } = getToken(getState);
    dispatch(setLoading({ key: "orderLoading", value: true }));
    try {
      const response = await api.get(
        `${baseUrl}/Datatable/GetUserListAsync?role=${role}&start=${pageNumber}&length=${pageLength}&sortColumnName=${sortColumn}
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

export const getUserPackagesRecords = createAsyncThunk(
  "customer/getUserPackagesRecords",
  async (
    { pageNumber, pageLength, sortColumn, sortDirection, searchParam },
    { rejectWithValue, getState, dispatch }
  ) => {
    const { token, expired } = getToken(getState);
    // Show loader for calendar loading
    dispatch(setLoading({ key: "orderLoading", value: true }));
    try {
      const response = await api.get(
        `${baseUrl}/Datatable/GetUserPackageDatatableAsync?start=${pageNumber}&length=${pageLength}&sortColumnName=${sortColumn}
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

export const getPackagesRecord = createAsyncThunk(
  "admin/getPackagesRecord",
  async (
    { pageNumber, pageLength, sortColumn, sortDirection, searchParam },
    { rejectWithValue, getState, dispatch }
  ) => {
    const { token, expired } = getToken(getState);
    dispatch(setLoading({ key: "orderLoading", value: true }));
    try {
      const response = await api.get(
        `${baseUrl}/Datatable/GetPackagesRecord/?start=${pageNumber}&length=${pageLength}&sortColumnName=${sortColumn}
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

export const getStripeRecords = createAsyncThunk(
  "admin/getStripeRecords",
  async (
    { pageNumber, pageLength, sortColumn, sortDirection, searchParam },
    { rejectWithValue, getState, dispatch }
  ) => {
    const { token, expired } = getToken(getState);
    dispatch(setLoading({ key: "orderLoading", value: true }));
    try {
      const response = await api.get(
        `${baseUrl}/Datatable/GetStripeOrdersRecord?start=${pageNumber}&length=${pageLength}&sortColumnName=${sortColumn}
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
//#endregion
