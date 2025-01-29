import React, { useState } from "react";
import StripeOrder from "./StripeOrders/StripeOrder";
import { useDispatch } from "react-redux";
import Dialogue from "../../../components/Custom/Modal/modal";
import {
  cancelOrderAndRevertSession,
  cancelOrderAndRevertStripe,
} from "../../../redux/Actions/orderActions";

const OrdersRecord = () => {
  const dispatch = useDispatch();
  const [orderData, setOrderData] = useState();
  const [showDialogue, setShowDialogue] = useState(false);
  const [setDialoueType, isSetDialoueType] = useState("");

  const deleteOrderAndRefund = () => {
    if (orderData) {
      dispatch(cancelOrderAndRevertStripe(orderData)).then((response) => {
        if (response?.payload) {
        } else {
        }
      });
    }
  };

  const deleteOrderAndRevertSession = () => {
    if (orderData) {
      dispatch(cancelOrderAndRevertSession(orderData)).then((response) => {
        if (response?.payload) {
        } else {
        }
      });
    }
  };
  const handleOpen = (record, dialoueType) => {
    setOrderData(record);
    isSetDialoueType(dialoueType);
    setShowDialogue(true);
  };

  const handleClose = () => {
    setShowDialogue(false);
  };

  return (
    <div>
      <StripeOrder handleOpen={handleOpen} />

      <Dialogue
        show={showDialogue}
        onHide={handleClose}
        headerClass=""
        modalBodyClass="p-0"
        title={"Cancel Order"}
        size="md"
        bodyContent={
          <p className="p-3 fs-5">
            Canceling this order will stop all further processing and any
            associated actions. If the order has already been paid for, a refund
            may be issued based on the cancellation policy. Please confirm to
            proceed.
          </p>
        }
        backdrop="static"
        centered={true}
        showFooter={true}
        customFooterButtons={[
          { text: "Cancel", onClick: handleClose },
          {
            text: "Confirm",
            variant: "danger",
            onClick: () =>
              setDialoueType === "session"
                ? deleteOrderAndRevertSession()
                : deleteOrderAndRefund(),
          },
        ]}
      />
    </div>
  );
};

export default OrdersRecord;
