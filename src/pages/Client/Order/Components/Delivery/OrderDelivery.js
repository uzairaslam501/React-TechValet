import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Form, FloatingLabel } from "react-bootstrap";
import Dialogue from "../../../../../components/Custom/Modal/modal";
import {
  deliverOrder,
  deliverOrderAccept,
  orderRevision,
} from "../../../../../redux/Actions/orderActions";
import FileUploadButton from "../../../../../components/Custom/Button/fileUploadButton";
import RenderButton from "./RenderButton";
import StarRating from "./StarRating";

const OrderDelivery = ({
  userRole,
  isDelivered,
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
  const [selectedFile, setSelectedFile] = useState(null);
  const [messageDescription, setMessageDescription] = useState("");
  const [isDialogueVisible, setIsDialogueVisible] = useState(false);
  const [isRevisionDialogue, setRevisionDialogue] = useState(false);
  const [isAcceptOrderDialogue, setAcceptOrderDialogue] = useState(false);
  const [isRating, setRating] = useState(0);

  // Handlers
  const openDialogue = (type) => {
    setActionType(type);
    if (type === "revision") {
      setRevisionDialogue(true);
    }
    if (type === "acceptOrder") {
      setAcceptOrderDialogue(true);
    }
    setIsDialogueVisible(true);
  };

  const closeDialogue = () => {
    setIsDialogueVisible(false);
    setActionType("");
    setMessageDescription("");
  };

  const handleActionSubmit = () => {
    if (!messageDescription.trim()) return;

    const payload = {
      orderId: encodeURIComponent(orderDetails?.encId),
      senderId: encodeURIComponent(userAuth.userEncId),
      receiverId:
        userAuth?.role === "Valet"
          ? encodeURIComponent(orderDetails?.customerEncId)
          : encodeURIComponent(orderDetails?.valetEncId),
      orderStatus: actionType,
      messageDescription: messageDescription,
      file: selectedFile,
    };

    setSendLoader(true);
    if (actionType === "revision") {
      handleOrderRevision(payload);
    } else if (actionType === "delivery") {
      handleOrderDeliver(payload);
    } else if (actionType === "acceptOrder") {
      handleOrderAccept(payload);
    }
  };

  const handleFileUpload = (file) => {
    setSelectedFile(file);
  };

  const handleOrderDeliver = (payload) => {
    dispatch(deliverOrder(payload)).then((response) => {
      if (response?.payload) {
        const newMessage = response.payload;
        setActiveChat((prev) => [...prev, newMessage]);
        handleSignalRCall(newMessage);
      }
      setSendLoader(false);
      closeDialogue();
    });
  };

  const handleOrderRevision = (payload) => {
    dispatch(orderRevision(payload)).then((response) => {
      if (response?.payload) {
        const newMessage = response.payload;
        setActiveChat((prev) => [...prev, newMessage]);
        handleSignalRCall(newMessage);
      }
      setSendLoader(false);
      closeDialogue();
    });
  };

  const handleOrderAccept = (payload) => {
    const extraPayload = {
      orderId: payload?.orderId,
      senderId: payload?.senderId,
      receiverId: payload?.receiverId,
      messageDescription: messageDescription,
      rating: String(isRating),
    };
    if (
      orderDetails?.capturedId != null ||
      orderDetails?.packageBuyFrom == "PAYPAL"
    ) {
      //For PayPal
      // dispatch(orderRevision(extraPayload)).then((response) => {
      //   if (response?.payload) {
      //     const newMessage = response.payload;
      //     setActiveChat((prev) => [...prev, newMessage]);
      //     handleSignalRCall(newMessage);
      //   }
      //   setSendLoader(false);
      //   closeDialogue();
      // });
    } else {
      dispatch(deliverOrderAccept(extraPayload)).then((response) => {
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
    }
  };

  return (
    <>
      <RenderButton
        isDelivered={isDelivered}
        userRole={userRole}
        openDialogue={openDialogue}
        showSpinner={showSpinner}
      />
      <Dialogue
        show={isDialogueVisible}
        onHide={closeDialogue}
        headerClass="px-3 py-2"
        title={!isRevisionDialogue ? `Deliver Order` : `Send Revision`}
        bodyContent={
          <Form>
            {isAcceptOrderDialogue && (
              <>
                <Form.Label className="mb-0">Ratings:</Form.Label>
                <StarRating totalStars={5} onRatingSubmit={setRating} />
              </>
            )}

            <Form.Label>Message</Form.Label>
            <FloatingLabel
              controlId="floatingTextarea2"
              className="mb-3"
              label={`Order  ${
                !isRevisionDialogue ? `delivery ` : `revision`
              } - please be as detailed as possible:`}
            >
              <Form.Control
                as="textarea"
                placeholder="Enter a message here"
                style={{ height: "100px" }}
                value={messageDescription}
                onChange={(e) => setMessageDescription(e.target.value)}
                isInvalid={!messageDescription.trim()}
              />
              <Form.Control.Feedback type="invalid">
                This field is required.
              </Form.Control.Feedback>
            </FloatingLabel>

            {!isRevisionDialogue && !isAcceptOrderDialogue && (
              <Form.Group className="mb-3">
                <FileUploadButton
                  setSelectedFile={setSelectedFile}
                  onFileUpload={handleFileUpload}
                  classname="btn-sm w-100"
                />
                {selectedFile && (
                  <div className="mt-2">
                    <strong>Selected File:</strong> {selectedFile.name}
                  </div>
                )}
                <Form.Control.Feedback type="invalid">
                  This field is required.
                </Form.Control.Feedback>
              </Form.Group>
            )}
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

export default OrderDelivery;
