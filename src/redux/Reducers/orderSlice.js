import { createSlice } from "@reduxjs/toolkit";
import {
  getOrderDetails,
  getOrderMessages,
  sendMessages,
  deliverOrder,
  orderRevision,
  orderZoomMeeting,
  extendOrderRequest,
  cancelOrder,
  extendOrderConfirmation,
  orderCancelConfirmation,
} from "../Actions/orderActions";

const initialState = {
  loading: false,
  error: null,
  data: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle getOrderDetails
    builder
      .addCase(getOrderDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getOrderDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    // Handle getOrderMessages
    builder
      .addCase(getOrderMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getOrderMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = "Failed to fetch messages";
      });

    // Handle sendMessages
    builder
      .addCase(sendMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(sendMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = "Failed to send messages";
      });

    // Handle deliverOrder
    builder
      .addCase(deliverOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deliverOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(deliverOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = "Failed to deliver order";
      });

    // Handle orderRevision
    builder
      .addCase(orderRevision.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(orderRevision.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(orderRevision.rejected, (state, action) => {
        state.loading = false;
        state.error = "Failed to process revision";
      });

    // Handle orderZoomMeeting
    builder
      .addCase(orderZoomMeeting.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(orderZoomMeeting.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(orderZoomMeeting.rejected, (state, action) => {
        state.loading = false;
        state.error = "Failed to schedule Zoom meeting";
      });

    // Handle extendOrderRequest
    builder
      .addCase(extendOrderRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(extendOrderRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(extendOrderRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = "Failed to process order extension request";
      });

    // Handle cancelOrder
    builder
      .addCase(cancelOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(cancelOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = "Failed to cancel order";
      });

    // Handle extendOrderConfirmation
    builder
      .addCase(extendOrderConfirmation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(extendOrderConfirmation.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(extendOrderConfirmation.rejected, (state, action) => {
        state.loading = false;
        state.error = "Failed to confirm order extension";
      });

    // Handle orderCancelConfirmation
    builder
      .addCase(orderCancelConfirmation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(orderCancelConfirmation.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(orderCancelConfirmation.rejected, (state, action) => {
        state.loading = false;
        state.error = "Failed to confirm order cancellation";
      });
  },
});

export default orderSlice.reducer;
