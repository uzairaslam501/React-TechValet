import { createSlice } from "@reduxjs/toolkit";
import {
  createCheckoutSession,
  createPaymentIntent,
  paymentSuccess,
  createStripeCharge,
  stripeCheckOutForPackages,
} from "../Actions/stripeActions";
import { toast } from "react-toastify";

const initialState = {
  session: null, // Stores checkout session details
  paymentIntent: null, // Stores payment intent data
  paymentStatus: null, // Indicates the payment status
  charge: null, // Stores Stripe charge data
  packageCheckout: null, // Stores package checkout details
  loading: false, // General loading state
  error: null, // Error state for API requests
};

const stripeSlice = createSlice({
  name: "stripe",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle createCheckoutSession
      .addCase(createCheckoutSession.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCheckoutSession.fulfilled, (state, action) => {
        state.loading = false;
        state.session = action.payload;
      })
      .addCase(createCheckoutSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        toast.error(action.error.message);
      })

      // Handle createPaymentIntent
      .addCase(createPaymentIntent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPaymentIntent.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentIntent = action.payload;
      })
      .addCase(createPaymentIntent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        toast.error(action.error.message);
      })

      // Handle paymentSuccess
      .addCase(paymentSuccess.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(paymentSuccess.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentStatus = action.payload;
      })
      .addCase(paymentSuccess.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        toast.error(action.error.message);
      })

      // Handle createStripeCharge
      .addCase(createStripeCharge.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createStripeCharge.fulfilled, (state, action) => {
        state.loading = false;
        state.charge = action.payload;
      })
      .addCase(createStripeCharge.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        toast.error(action.error.message);
      })

      // Handle stripeCheckOutForPackages
      .addCase(stripeCheckOutForPackages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(stripeCheckOutForPackages.fulfilled, (state, action) => {
        state.loading = false;
        state.packageCheckout = action.payload;
      })
      .addCase(stripeCheckOutForPackages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        toast.error(action.error.message);
      });
  },
});

export default stripeSlice.reducer;
