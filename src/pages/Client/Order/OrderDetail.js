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
import { Navigate, useParams } from "react-router";
import ChatContainer from "./Components/ChatContainer/ChatContainer";
import ChatHeader from "./Components/ChatHeader/ChatHeader";
import {
  extendOrderConfirmation,
  getOrderDetails,
  getOrderMessages,
  orderZoomMeeting,
  sendMessages,
} from "../../../redux/Actions/orderActions";
import signalRService from "../../../services/SignalR";
import FileUploadButton from "../../../components/Custom/Button/fileUploadButton";
import { scrollToBottom } from "../../../utils/_helpers";
import OrderButton from "./Components/Buttons/OrderButtons";
import Resolution from "./Components/Resolution/Resolution";

const OrderDetail = () => {
  const dispatch = useDispatch();
  const [sendLoader, setSendLoader] = useState(false);
  const [messageTyped, setMessageTyped] = useState("");
  const [orderDetails, setOrderDetails] = useState({});
  const [showSpinner, setShowSpinner] = useState(false);
  const [activeChats, setActiveChat] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const { userAuth } = useSelector((state) => state?.authentication);
  const params = useParams();
  const chatContainerId = "chatbox-container";

  const fetchOrderDetails = () => {
    setShowSpinner(true);
    dispatch(getOrderDetails(params.id)).then((response) => {
      setOrderDetails(response?.payload);
      fetchMessages();
    });
  };

  const fetchMessages = () => {
    setShowSpinner(true);
    dispatch(getOrderMessages(params.id)).then((response) => {
      setActiveChat(response?.payload);
      console.log("messages", response?.payload);
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
          setActiveChat((prev) => [...prev, newMessage]);
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
        setActiveChat((prev) => [...prev, newMessage]);

        console.log("orderZoomMeeting newMessage ::: ", newMessage);
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
    dispatch(extendOrderConfirmation(data)).then((response) => {
      const newMessage = response?.payload;
      setActiveChat((prev) =>
        prev.map((msg) =>
          msg.orderReasonId === newMessage?.orderReasonId
            ? { ...msg, orderReasonIsActive: newMessage.orderReasonIsActive }
            : msg
        )
      );
      setActiveChat((prev) => [...prev, newMessage]);
    });
  };

  useEffect(() => {
    fetchOrderDetails();
  }, [params.id]);

  useEffect(() => {
    if (!userAuth?.id) return;

    const handleIncomingData = (senderId, receiverId, model) => {
      if (orderDetails?.id === model.orderId && userAuth?.id === receiverId) {
        setActiveChat((prev) => {
          if (!prev.some((msg) => msg.messageTime === model.messageTime)) {
            return [...prev, model];
          }
          return prev;
        });
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

  if (!params || !params.id) {
    return <Navigate to="/" />;
  }

  console.log("orderDetails", orderDetails);
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
                      activeChats && (
                        <ChatHeader
                          activeChat={activeChats[0]}
                          userOnlineStatus={
                            userAuth?.role === "Valet"
                              ? parseInt(orderDetails?.valetStatus)
                              : parseInt(orderDetails?.customerStatus)
                          }
                          userAuth={userAuth}
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
                            messageLoader={null}
                            messages={activeChats}
                            userAuth={userAuth}
                            handleAcceptRejectDate={handleAcceptRejectDate}
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
                        />
                      </div>
                      <div className="row py-3">
                        <div className="col-md-6 col-sm-12 mb-2">
                          <FileUploadButton
                            setSelectedFile={setSelectedFile}
                            onFileUpload={handleFileUpload}
                            disabled={showSpinner}
                          />
                          {selectedFile && (
                            <div className="mt-2">
                              <strong>Selected File:</strong>{" "}
                              {selectedFile.name}
                            </div>
                          )}
                        </div>
                        <div className="col-md-6 col-sm-12 mb-2 text-end">
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
                            disabled={sendLoader || showSpinner}
                          >
                            Send
                          </Button>
                        </div>
                      </div>
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
              ) : orderDetails?.isDelivered === "4" ? (
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
              <div className="order-Info-detail-flex">
                <OrderButton
                  userRole={userAuth?.role}
                  orderStatus={orderDetails?.orderStatus}
                  isDelivered={orderDetails?.isDelivered}
                />
              </div>
            </CardBody>
          </Card>
          {/* Zoom Meeting Card */}
          <Card className="shadow mt-3">
            <CardBody>
              <div className="card-headers mb-1">Zoom Meeting</div>

              <Button
                onClick={() => handleZoomMeeting()}
                className="w-100 btn btn-sm"
                disabled={showSpinner}
              >
                Zoom Meeting
              </Button>
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
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default OrderDetail;
