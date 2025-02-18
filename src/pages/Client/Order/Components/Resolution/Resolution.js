import React, { useState } from "react";
import { Button, Form, FloatingLabel, Badge } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  cancelOrder,
  extendOrderRequest,
} from "../../../../../redux/Actions/orderActions";
import {
  disabledPreviousDateTime,
  getFirstAndLastDayOfMonth,
  setDateTimeRestrictions,
} from "../../../../../utils/_helpers";
import Dialogue from "../../../../../components/Custom/Modal/modal";

const OrderResolution = ({
  orderDetails,
  userAuth,
  sendLoader,
  setSendLoader,
  setActiveChat,
  handleSignalRCall,
  showSpinner,
}) => {
  const dispatch = useDispatch();

  // States
  const [actionType, setActionType] = useState("");
  const [reason, setReason] = useState("");
  const [extensionDate, setExtensionDate] = useState("");
  const [isDialogueVisible, setIsDialogueVisible] = useState(false);

  const validDateRange = {
    start: getFirstAndLastDayOfMonth().currentDay,
    end: getFirstAndLastDayOfMonth().monthEnd,
  };

  // Handlers
  const openDialogue = (type) => {
    setActionType(type);
    setIsDialogueVisible(true);
  };

  const closeDialogue = () => {
    setIsDialogueVisible(false);
    setReason("");
    setActionType("");
    setExtensionDate("");
  };

  const handleActionSubmit = () => {
    if (!reason.trim()) return;

    const payload = {
      orderId: encodeURIComponent(orderDetails?.encId),
      senderId: encodeURIComponent(userAuth.userEncId),
      receiverId:
        userAuth?.role === "Valet"
          ? encodeURIComponent(orderDetails?.customerEncId)
          : encodeURIComponent(orderDetails?.valetEncId),
      orderStatus: actionType,
      explanation: reason,
    };

    if (actionType === "Cancel") {
      setSendLoader(true);
      requestCancelOrder(payload);
    } else if (actionType === "Extend" && extensionDate) {
      setSendLoader(true);
      requestExtendOrder(payload);
    }
  };

  const requestCancelOrder = (payload) => {
    dispatch(cancelOrder(payload)).then((response) => {
      if (response?.payload) {
        const newMessage = response.payload;
        setActiveChat((prev) => {
          const messageDate = newMessage?.messageDate;

          // Clone previous state
          const newMessages = { ...prev };

          if (newMessages[messageDate]) {
            newMessages[messageDate] = [
              ...newMessages[messageDate],
              newMessage,
            ];
          } else {
            newMessages[messageDate] = [newMessage];
          }

          return newMessages;
        });

        handleSignalRCall(newMessage);
      }
      setSendLoader(false);
      closeDialogue();
    });
  };

  const requestExtendOrder = (payload) => {
    const extendedPayload = { ...payload, dateExtension: extensionDate };

    dispatch(extendOrderRequest(extendedPayload)).then((response) => {
      if (response?.payload) {
        const newMessage = response.payload;
        setActiveChat((prev) => {
          const messageDate = newMessage?.messageDate;

          // Clone previous state
          const newMessages = { ...prev };

          if (newMessages[messageDate]) {
            newMessages[messageDate] = [
              ...newMessages[messageDate],
              newMessage,
            ];
          } else {
            newMessages[messageDate] = [newMessage];
          }

          return newMessages;
        });
        handleSignalRCall(newMessage);
      }
      setSendLoader(false);
      closeDialogue();
    });
  };

  return (
    <>
      {orderDetails &&
      orderDetails?.isDelivered === "2" &&
      userAuth?.role === "Valet" ? (
        <>
          <Button
            className="w-100 mb-2"
            variant="primary-secondary"
            size="sm"
            disabled
          >
            Extend Deadline
          </Button>

          <Button className="w-100" variant="secondary" size="sm" disabled>
            Cancel Order
          </Button>
        </>
      ) : (
        <>
          {userAuth?.role === "Valet" && (
            <Button
              onClick={() => openDialogue("Extend")}
              className="w-100 mb-2"
              variant="outline-primary"
              size="sm"
              disabled={showSpinner}
            >
              Extend Deadline
            </Button>
          )}
          <Button
            onClick={() => openDialogue("Cancel")}
            className="w-100"
            variant="outline-danger"
            size="sm"
            disabled={
              showSpinner || (orderDetails && orderDetails?.isDelivered === "2")
            }
          >
            Cancel Order
          </Button>
        </>
      )}
      <Dialogue
        show={isDialogueVisible}
        onHide={closeDialogue}
        headerClass="px-3 py-2"
        title={`${actionType} Order`}
        bodyContent={
          <Form>
            {actionType === "Extend" && (
              <Form.Group className="mb-3">
                <Form.Label>Extend Deadline:</Form.Label>
                <Form.Control
                  type="datetime-local"
                  value={extensionDate}
                  onChange={(e) => setExtensionDate(e.target.value)}
                  min={disabledPreviousDateTime()}
                  max={setDateTimeRestrictions("max", validDateRange.end)}
                  isInvalid={!extensionDate}
                  onKeyDown={(e) => e.preventDefault()}
                />
                <Form.Control.Feedback type="invalid">
                  This field is required.
                </Form.Control.Feedback>
              </Form.Group>
            )}

            <FloatingLabel
              controlId="floatingTextarea2"
              label={`Reason for ${actionType} order - please be as detailed as possible:`}
            >
              <Form.Control
                as="textarea"
                placeholder="Enter a reason here"
                style={{ height: "100px" }}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                isInvalid={!reason.trim()}
              />
              <Form.Control.Feedback type="invalid">
                This field is required.
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form>
        }
        backdrop="static"
        customFooterButtons={[
          {
            text: "Cancel",
            className: "btn-secondary-secondary",
            onClick: closeDialogue,
          },
          {
            text: "Submit",
            variant: "primary",
            onClick: handleActionSubmit,
            loader: sendLoader,
          },
        ]}
      />
    </>
  );
};

export default OrderResolution;
