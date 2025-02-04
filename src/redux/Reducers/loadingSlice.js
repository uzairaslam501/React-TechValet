import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authLoading: false,
  adminLoading: false,
  calendarLoading: false,
  customerLoading: false,
  globalLoading: false,
  messageLoading: false,
  notificationLoading: false,
  orderLoading: false,
  packageLoading: false,
  paypalLoading: false,
  stripeLoading: false,
  seoLoading: false,
};

const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setLoading(state, action) {
      const { key, value } = action.payload; // e.g., { key: "orderLoading", value: true }
      if (state.hasOwnProperty(key)) {
        state[key] = value;
      }
    },
  },
});

export const { setLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
