import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
  Spinner,
} from "react-bootstrap";
import "./OrderDetail.css";
import "../Messages/style.css";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router";
import ChatContainer from "./Components/ChatContainer/ChatContainer";
import ChatHeader from "./Components/ChatHeader/ChatHeader";
import {
  extendOrderConfirmation,
  getOrderDetails,
  getOrderMessages,
  orderCancelConfirmation,
  orderZoomMeeting,
  sendMessages,
} from "../../../redux/Actions/orderActions";
import signalRService from "../../../services/SignalR";
import FileUploadButton from "../../../components/Custom/Button/fileUploadButton";
import { scrollToBottom } from "../../../utils/_helpers";
import Resolution from "./Components/Resolution/Resolution";
import OrderDelivery from "./Components/Delivery/OrderDelivery";

const OrderDetail = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sendLoader, setSendLoader] = useState(false);
  const [activeChats, setActiveChat] = useState(false);
  const [orderDetails, setOrderDetails] = useState({});
  const [messageTyped, setMessageTyped] = useState("");
  const [showSpinner, setShowSpinner] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const { userAuth } = useSelector((state) => state?.authentication);
  const [allButtonDisabled, setAllButtonDisabled] = useState(false);
  const chatContainerId = "chatbox-container";

  const fetchOrderDetails = () => {
    setShowSpinner(true);
    dispatch(getOrderDetails(params.id)).then((response) => {
      setOrderDetails(response?.payload);
      if (
        userAuth?.role === "Admin" ||
        response?.payload?.customerEncId === userAuth?.userEncId ||
        response?.payload?.valetEncId === userAuth?.userEncId
      ) {
        console.log(response?.payload);
        fetchMessages();
      } else {
        navigate("/not-found");
      }
    });
  };

  const fetchMessages = () => {
    dispatch(getOrderMessages(params.id)).then((response) => {
      setActiveChat(response?.payload);
      setShowSpinner(false);
    });
  };

  const handleTypeMessage = (value) => {
    setMessageTyped(value);
  };

  const handleSendMessage = (receiverId) => {
    if (messageTyped || (selectedFile && selectedFile.size > 0)) {
      setSendLoader(true);
      const data = {
        senderId: encodeURIComponent(userAuth?.userEncId),
        receiverId: encodeURIComponent(receiverId),
        messageDescription: encodeURIComponent(messageTyped),
        orderId: encodeURIComponent(params?.id),
        way: "",
        file: selectedFile ? selectedFile : null,
      };
      handleResponse(data);
    } else {
      console.log("No active chat or message text.");
    }
  };

  const handleResponse = (data) => {
    try {
      dispatch(sendMessages(data)).then((response) => {
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

        setMessageTyped("");
        setSendLoader(false);
      });
    } catch (error) {
      setMessageTyped("");
      setSendLoader(false);
    } finally {
      setMessageTyped("");
      setSelectedFile(null);
      setSendLoader(false);
    }
  };

  const handleSignalRCall = (newMessage) => {
    const data = {
      orderId: orderDetails.id,
      senderId: newMessage.senderId,
      receiverId: newMessage.receiverId,
      message: newMessage,
    };
    signalRService.sendOrderObject(data);
  };

  const handleFileUpload = (file) => {
    setSelectedFile(file);
  };

  const handleZoomMeeting = () => {
    const data = {
      orderId: encodeURIComponent(orderDetails.encId),
      senderId: encodeURIComponent(userAuth.userEncId),
      receiverId:
        userAuth?.role === "Valet"
          ? encodeURIComponent(orderDetails?.customerEncId)
          : encodeURIComponent(orderDetails?.valetEncId),
    };

    setSendLoader(true);
    dispatch(orderZoomMeeting(data)).then((response) => {
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

        if (String(userAuth.id) === newMessage.senderId) {
          window.open(newMessage?.startUrl, "_blank");
        } else if (String(userAuth.id) === newMessage.receiverId) {
          window.open(newMessage?.joinUrl, "_blank");
        }
      }
      setSendLoader(false);
    });
  };

  const handleAcceptRejectDate = (data) => {
    setSendLoader(true);
    dispatch(extendOrderConfirmation(data)).then((response) => {
      const newMessage = response?.payload;

      setActiveChat((prev) => {
        const messageDate = newMessage?.messageDate;
        const newMessages = { ...prev };

        if (newMessages[messageDate]) {
          const index = newMessages[messageDate].findIndex(
            (msg) => msg.orderReasonId === newMessage?.orderReasonId
          );

          if (index !== -1) {
            // Update the existing message instead of adding a new one
            newMessages[messageDate] = newMessages[messageDate].map((msg, i) =>
              i === index
                ? {
                    ...msg,
                    orderReasonIsActive: newMessage.orderReasonIsActive,
                  }
                : msg
            );
          } else {
            // If the message does not exist, add it
            newMessages[messageDate] = [
              ...newMessages[messageDate],
              newMessage,
            ];
          }
        } else {
          // Create a new date entry if it doesn't exist
          newMessages[messageDate] = [newMessage];
        }

        return newMessages;
      });
      setSendLoader(false);
    });
  };

  const handleAcceptRejectCancel = (data) => {
    setSendLoader(true);
    dispatch(orderCancelConfirmation(data)).then((response) => {
      const newMessage = response?.payload;
      setActiveChat((prev) => {
        const messageDate = newMessage?.messageDate;
        const newMessages = { ...prev };

        if (newMessages[messageDate]) {
          const index = newMessages[messageDate].findIndex(
            (msg) => msg.orderReasonId === newMessage?.orderReasonId
          );

          if (index !== -1) {
            // Update the existing message instead of adding a new one
            newMessages[messageDate] = newMessages[messageDate].map((msg, i) =>
              i === index
                ? {
                    ...msg,
                    orderReasonIsActive: newMessage.orderReasonIsActive,
                  }
                : msg
            );
          } else {
            // If the message does not exist, add it
            newMessages[messageDate] = [
              ...newMessages[messageDate],
              newMessage,
            ];
          }
        } else {
          // Create a new date entry if it doesn't exist
          newMessages[messageDate] = [newMessage];
        }

        return newMessages;
      });
      setSendLoader(false);
    });
  };

  useEffect(() => {
    fetchOrderDetails();
  }, [params.id]);

  useEffect(() => {
    if (!userAuth?.id) return;

    const handleIncomingData = (senderId, receiverId, model) => {
      console.log(model);
      if (String(params?.id) === String(model.orderEncId)) {
        if (userAuth?.id === receiverId) {
          setActiveChat((prev) => {
            const messageDate = model.messageDate;
            const newMessages = { ...prev };

            if (newMessages[messageDate]) {
              const exists = newMessages[messageDate].some(
                (msg) => msg.id === model.id
              );
              if (!exists) {
                newMessages[messageDate] = [...newMessages[messageDate], model];
              }
            } else {
              newMessages[messageDate] = [model];
            }

            return newMessages;
          });
        }
        setOrderDetails((prev) => ({
          ...prev,
          isDelivered: model.isDelivered,
        }));
      }
    };

    signalRService.subscribe(handleIncomingData);

    return () => {
      signalRService.unsubscribe(handleIncomingData);
      signalRService.disconnect();
    };
  }, [params?.id]);

  useEffect(() => {
    scrollToBottom(chatContainerId);
  }, [activeChats]);

  useEffect(() => {
    if (orderDetails?.orderStatus === "4") {
      setAllButtonDisabled(true);
    }
  }, [orderDetails?.orderStatus]);

  if (!params || !params.id) {
    return <Navigate to="/" />;
  }

  return (
    <Container className="pb-5">
      <Row className="mt-4">
        <Col xl={8} lg={8} md={8} sm={12} xs={12} className="mb-3">
          <div className="chat-card chat-app">
            <div className="chat" style={{ margin: 0 }}>
              <div className="chat-header clearfix">
                <div className="row">
                  <div className="col-sm-12">
                    {showSpinner ? (
                      <Spinner animation="grow" />
                    ) : (
                      orderDetails && (
                        <ChatHeader
                          userOnlineStatus={
                            userAuth?.role === "Valet"
                              ? parseInt(orderDetails?.valetStatus)
                              : parseInt(orderDetails?.customerStatus)
                          }
                          orderDetails={orderDetails}
                        />
                      )
                    )}
                  </div>
                  <div className="col-sm-12">
                    <div className="chatbox-container" id={chatContainerId}>
                      {showSpinner ? (
                        <div className="text-center">
                          <Spinner animation="grow" />
                        </div>
                      ) : (
                        activeChats && (
                          <ChatContainer
                            orderDetails={orderDetails}
                            messages={activeChats}
                            userAuth={userAuth}
                            handleAcceptRejectDate={handleAcceptRejectDate}
                            handleAcceptRejectCancel={handleAcceptRejectCancel}
                            sendLoader={sendLoader}
                          />
                        )
                      )}
                    </div>
                    <div className="clearfix">
                      <div className="input-group mb-0">
                        <div className="input-group-prepend">
                          <span
                            className="input-group-text"
                            style={{ borderRadius: "0px" }}
                          >
                            <i className="bi bi-send"></i>
                          </span>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter text here..."
                          rows={1}
                          value={messageTyped}
                          onChange={(e) => handleTypeMessage(e.target.value)}
                          readOnly={showSpinner}
                          disabled={
                            orderDetails &&
                            (orderDetails?.isDelivered === "2" ||
                              allButtonDisabled)
                          }
                        />
                      </div>
                      {orderDetails && orderDetails?.isDelivered !== "2" && (
                        <div className="row py-3">
                          <div className="col-6 mb-2">
                            <FileUploadButton
                              setSelectedFile={setSelectedFile}
                              onFileUpload={handleFileUpload}
                              disabled={
                                sendLoader ||
                                showSpinner ||
                                (orderDetails &&
                                  (orderDetails?.isDelivered === "2" ||
                                    allButtonDisabled) &&
                                  true)
                              }
                              classname="w-sm-100 btn-sm"
                            />
                            {selectedFile && (
                              <div className="mt-2">
                                <strong>Selected File:</strong>{" "}
                                {selectedFile.name}
                              </div>
                            )}
                          </div>
                          <div className="col-6 mb-2 text-end">
                            <Button
                              variant="primary-secondary"
                              className="btn-sm w-50"
                              onClick={() =>
                                handleSendMessage(
                                  userAuth?.role === "Valet"
                                    ? orderDetails?.customerEncId
                                    : orderDetails?.valetEncId
                                )
                              }
                              disabled={
                                sendLoader ||
                                showSpinner ||
                                (orderDetails &&
                                  (orderDetails?.isDelivered === "2" ||
                                    allButtonDisabled) &&
                                  true)
                              }
                            >
                              Send
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Col>
        <Col xl={4} lg={4} md={4} sm={12} xs={12} className="mb-3">
          {/* Order Info Card */}
          <Card className="shadow">
            <CardHeader className="card-headers order-Info-detail-flex">
              Order Info
              {orderDetails?.isDelivered === "0" &&
              orderDetails?.orderStatus === "0" ? (
                <span className="badge fw-normal bg-warning px-3">
                  In-Progress
                </span>
              ) : orderDetails?.isDelivered === "1" ? (
                <span className="badge fw-normal bg-success px-3">
                  DELIVERED
                </span>
              ) : ["2", "1"].includes(orderDetails?.orderStatus) ||
                orderDetails?.isDelivered === "2" ? (
                <span className="badge fw-normal bg-success px-3">
                  Completed
                </span>
              ) : orderDetails?.isDelivered === "4" ||
                orderDetails?.orderStatus === "4" ? (
                <span className="badge fw-normal bg-danger px-3">CANCELED</span>
              ) : null}
            </CardHeader>
            <CardBody>
              <div className="order-Info-detail-flex">
                Order ID <span className="fw-bold">{params.id}</span>
              </div>
              <hr />

              <div className="order-Info-detail-flex">
                Title{" "}
                <span className="fw-bold">{orderDetails?.orderTitle}</span>
              </div>
              <div className="order-Info-detail-flex">
                Start Date
                <span className="fw-bold">{orderDetails?.startDateTime}</span>
              </div>
              <div className="order-Info-detail-flex">
                Delivery date{" "}
                <span className="fw-bold">{orderDetails?.endDateTime}</span>
              </div>
              <div className="order-Info-detail-flex">
                Order Price{" "}
                <span className="fw-bold">${orderDetails?.orderPrice}</span>
              </div>
              <hr />
              <div>
                <OrderDelivery
                  userRole={userAuth?.role}
                  isDelivered={orderDetails?.isDelivered}
                  orderDetails={orderDetails}
                  userAuth={userAuth}
                  sendLoader={sendLoader}
                  setSendLoader={setSendLoader}
                  setActiveChat={setActiveChat}
                  handleSignalRCall={handleSignalRCall}
                  showSpinner={showSpinner}
                  allButtonDisabled={allButtonDisabled}
                />
              </div>
            </CardBody>
          </Card>
          {/* Zoom Meeting Card */}
          <Card className="shadow mt-3">
            <CardBody>
              <div className="card-headers mb-1">Zoom Meeting</div>

              {(orderDetails && orderDetails?.isDelivered === "2") ||
              allButtonDisabled ? (
                <>
                  <Button
                    className="w-100"
                    size="sm"
                    variant="primary-secondary"
                    disabled
                  >
                    Zoom Meeting
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={() => handleZoomMeeting()}
                    className="w-100"
                    size="sm"
                    disabled={showSpinner || sendLoader}
                  >
                    Zoom Meeting
                  </Button>
                </>
              )}
            </CardBody>
          </Card>
          {/* Resolution Card */}
          <Card className="shadow mt-3">
            <Card.Header className=" mb-1">Resolution Center</Card.Header>
            <CardBody>
              <Resolution
                orderDetails={orderDetails}
                userAuth={userAuth}
                sendLoader={sendLoader}
                setSendLoader={setSendLoader}
                setActiveChat={setActiveChat}
                handleSignalRCall={handleSignalRCall}
                showSpinner={showSpinner}
                allButtonDisabled={allButtonDisabled}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default OrderDetail;
