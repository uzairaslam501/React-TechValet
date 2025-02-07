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
  const [refreshKey, setRefreshKey] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showDialogue, setShowDialogue] = useState(false);
  const [setDialoueType, isSetDialoueType] = useState("");

  const deleteOrderAndRefund = () => {
    setIsLoading(true);
    if (orderData) {
      dispatch(cancelOrderAndRevertStripe(orderData)).then((response) => {
        handleClose();
        setRefreshKey((prevKey) => prevKey + 1);
        if (response?.payload) {
        } else {
        }
      });
    }
  };

  const deleteOrderAndRevertSession = () => {
    setIsLoading(true);
    if (orderData) {
      dispatch(cancelOrderAndRevertSession(orderData)).then((response) => {
        handleClose();
        setRefreshKey((prevKey) => prevKey + 1);
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
    setIsLoading(false);
  };

  return (
    <div>
      <StripeOrder handleOpen={handleOpen} refreshKey={refreshKey} />

      <Dialogue
        show={showDialogue}
        onHide={handleClose}
        headerClass=""
        modalBodyClass="p-0"
        title={`Cancel Order & ${
          setDialoueType === "refund" ? "Refund" : "Revert Session"
        }`}
        size="lg"
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
            loader: isLoading,
          },
        ]}
      />
    </div>
  );
};

export default OrdersRecord;
