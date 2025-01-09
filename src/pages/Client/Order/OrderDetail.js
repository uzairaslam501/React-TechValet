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
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router";
import ChatContainer from "./Components/ChatContainer/ChatContainer";
import ChatHeader from "./Components/ChatHeader/ChatHeader";
import "../Messages/style.css";
import {
  getOrderDetails,
  getOrderMessages,
} from "../../../redux/Actions/orderActions";

const OrderDetail = () => {
  const dispatch = useDispatch();
  const [sendLoader, setSendLoader] = useState(false);
  const [messageTyped, setMessageTyped] = useState("");
  const [orderDetails, setOrderDetails] = useState({});
  const [showSpinner, setShowSpinner] = useState(false);
  const [activeChats, setActiveChat] = useState(false);
  const { userAuth } = useSelector((state) => state?.authentication);
  const params = useParams();

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
      setShowSpinner(false);
    });
  };

  const handleTypeMessage = (value) => {
    setMessageTyped(value);
  };

  const handleSendMessage = (receiverId) => {
    if (messageTyped) {
      setSendLoader(true);
      const data = {
        senderId: String(userAuth?.id),
        receiverId: receiverId,
        messageDescription: messageTyped,
        orderId: params?.id,
      };
      handleResponse(data);
    } else {
      console.log("No active chat or message text.");
    }
  };

  const handleResponse = (data) => {
    try {
      console.log("data", data);
      setMessageTyped("");
      setSendLoader(false);
    } catch (error) {
      setMessageTyped("");
      setSendLoader(false);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, [params.id]);

  if (!params || !params.id) {
    return <Navigate to="/" />;
  }

  return (
    <Container className="pb-5">
      <Row className="mt-4">
        {showSpinner ? (
          <Col xl={12} lg={12} md={12} sm={12} xs={12} className="text-center">
            <Spinner animation="grow" />
          </Col>
        ) : (
          <>
            <Col xl={8} lg={8} md={8} sm={12} xs={12} className="mb-3">
              <div className="chat-card chat-app">
                <div className="chat" style={{ margin: 0 }}>
                  <div className="chat-header clearfix">
                    <div className="row">
                      <div className="col-sm-12">
                        {activeChats && (
                          <ChatHeader
                            activeChat={activeChats[0]}
                            userOnlineStatus={
                              userAuth?.role === "Valet"
                                ? parseInt(orderDetails?.valetStatus)
                                : parseInt(orderDetails?.customerStatus)
                            }
                            userAuth={userAuth}
                          />
                        )}
                      </div>
                      <div className="col-sm-12">
                        <div className="chatbox-container">
                          {activeChats && (
                            <ChatContainer
                              messageLoader={null}
                              messages={activeChats}
                              userAuth={userAuth}
                            />
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
                              onChange={(e) =>
                                handleTypeMessage(e.target.value)
                              }
                            />
                          </div>
                          <div className="row py-3">
                            <div className="col-md-2 col-sm-12 mb-2">
                              <Button
                                variant="secondary-secondary"
                                className="btn-sm w-100"
                                // onClick={() => handleCreateOrder()}
                              >
                                <i className="bi bi-upload me-2"></i> Upload
                              </Button>
                            </div>
                            <div className="col-md-2 offset-md-8 col-sm-12 mb-2 text-end">
                              <Button
                                variant="primary-secondary"
                                className="btn-sm w-100"
                                onClick={() =>
                                  handleSendMessage(
                                    userAuth?.role === "Valet"
                                      ? orderDetails?.customerId
                                      : orderDetails?.valetId
                                  )
                                }
                                disabled={sendLoader}
                              >
                                {/* {sendLoader ? (
                                  <Spinner
                                    animation="border"
                                    size="sm"
                                    className="me-1"
                                  />
                                ) : (
                                  <i className="bi bi-send-check me-1"></i>
                                )} */}
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
                    <span className="badge fw-normal bg-danger px-3">
                      CANCELED
                    </span>
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
                    <span className="fw-bold">
                      {orderDetails?.startDateTime}
                    </span>
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
                    <Button className="w-100 btn-sm">Accept Order</Button>
                  </div>
                </CardBody>
              </Card>
              {/* Zoom Meeting Card */}
              <Card className="shadow mt-3">
                <CardBody>
                  <div className="card-headers mb-1">Zoom Meeting</div>

                  <Button className="w-100 btn btn-sm">Zoom Meeting</Button>
                </CardBody>
              </Card>
              {/* Resolution Card */}
              <Card className="shadow mt-3">
                <CardBody>
                  <div className="card-headers mb-1">Resolution Center</div>

                  <button className="w-100 btn btn-sm btn-outline-danger">
                    Cancel Order
                  </button>
                </CardBody>
              </Card>
            </Col>
          </>
        )}
      </Row>
    </Container>
  );
};

export default OrderDetail;
