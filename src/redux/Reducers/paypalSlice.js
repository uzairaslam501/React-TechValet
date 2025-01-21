import { createSlice } from "@reduxjs/toolkit";
import {
  postCheckoutForOrder,
  postCheckoutForPackage,
  checkPaymentStatusForOrder,
  checkPaymentStatusForPackage,
  chargeByPackage,
  addPayPalAccount,
} from "../Actions/paypalActions";

const initialState = {
  loading: false,
  error: null,
  data: null,
};

const paypalSlice = createSlice({
  name: "paypal",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle postCheckoutForOrder
      .addCase(postCheckoutForOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postCheckoutForOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(postCheckoutForOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Handle postCheckoutForPackage
      .addCase(postCheckoutForPackage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postCheckoutForPackage.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(postCheckoutForPackage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Handle checkPaymentStatusForOrder
      .addCase(checkPaymentStatusForOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkPaymentStatusForOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(checkPaymentStatusForOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Handle checkPaymentStatusForPackage
      .addCase(checkPaymentStatusForPackage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkPaymentStatusForPackage.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(checkPaymentStatusForPackage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Handle chargeByPackage
      .addCase(chargeByPackage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(chargeByPackage.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(chargeByPackage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Handle AddPayPalAccount
      .addCase(addPayPalAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addPayPalAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(addPayPalAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default paypalSlice.reducer;
