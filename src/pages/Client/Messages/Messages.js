import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getMessagesSidebar,
  sendUsersMessages,
} from "../../../redux/Actions/messagesAction";
import HandleImages from "../../../components/Custom/Avatars/HandleImages";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import { truncateCharacters } from "../../../utils/_helpers";
import RenderOfferStatus from "./RendersCard/RenderOfferStatus";
import "./style.css";
import OfferDialogue from "./OfferDialogue/OfferDialogue";
import signalRService from "../../../services/SignalR";
import { notificationURL } from "../../../utils/_envConfig";
import { debounce } from "lodash";

const Messages = () => {
  const dispatch = useDispatch();
  const chatContainerRef = useRef(null);
  const [messages, setMessages] = useState();
  const [usersList, setUsersList] = useState();
  const [activeChat, setActiveChat] = useState();
  const [sendLoader, setSendLoader] = useState(false);
  const [messageTyped, setMessageTyped] = useState("");
  const [defaultMessage, setDefaultMessage] = useState();
  const [messageLoader, setMessagesLoader] = useState(true);
  const [userOnlineStatus, setUserOnlineStatus] = useState(-1);
  const [userSideBarLoader, setUserSideBarLoader] = useState(true);
  const [showOrderDialogue, setShowOrderDialogue] = useState(false);
  const [isMessageSidebarOpen, setMessageSidebarOpen] = useState(false);
  const { userAuth } = useSelector((state) => state?.authentication);

  const fetchSideBar = (findUser = "") => {
    try {
      setUserSideBarLoader(true);
      dispatch(
        getMessagesSidebar(
          `Message/GetMessageSideBarLists?loggedInUserId=${userAuth?.id}&Name=${findUser}`
        )
      ).then((response) => {
        setDefaultMessage(response?.payload[0]);
        setUsersList(response?.payload);
        setUserSideBarLoader(false);
      });
    } catch (error) {
      console.error("Error fetching sidebar:", error);
    } finally {
    }
  };

  const fetchUserStatus = (userId) => {
    try {
      dispatch(
        getMessagesSidebar(`Message/GetReceiverStatuses/${userId}`)
      ).then((response) => {
        setUserOnlineStatus(response?.payload);
      });
    } catch (error) {
      console.error("Error fetching sidebar:", error);
    } finally {
      fetchMessages(userId);
    }
  };

  const fetchMessages = (userId) => {
    try {
      dispatch(
        getMessagesSidebar(
          `Message/GetMessagesForUsers?loggedInUserId=${userAuth?.id}&userId=${userId}`
        )
      ).then((response) => {
        console.log(response?.payload);
        setMessages(response?.payload);
        setMessagesLoader(false);
      });
    } catch (error) {
      console.error("Error fetching messages:", error);
      setMessagesLoader(false);
    }
  };

  const handleSearchMessage = debounce((value) => {
    fetchSideBar(value);
  }, 300);

  const handleSelectedChat = (user) => {
    if (user?.userDecId !== activeChat?.userDecId) {
      setMessagesLoader(true);
      setActiveChat(user);
      fetchUserStatus(user?.userDecId);
    }
  };

  const toggleSidebar = () => {
    setMessageSidebarOpen(!isMessageSidebarOpen);
  };

  const handleTypeMessage = (value) => {
    setMessageTyped(value);
  };

  const handleCreateOrder = async () => {
    setShowOrderDialogue(true);
  };

  const handleOrderClose = () => {
    setShowOrderDialogue(false);
  };

  const handleSendMessage = (receiverId) => {
    if (messageTyped) {
      setSendLoader(true);
      const data = {
        SenderId: String(userAuth?.id),
        ReceiverId: receiverId,
        MessageDescription: messageTyped,
      };
      handleResponse(data);
    }
  };

  const handleSendOffer = (values) => {
    if (values) {
      setSendLoader(true);
      const data = {
        SenderId: String(userAuth?.id),
        CustomerId: String(userAuth?.id),
        valetId: String(values?.valetId),
        ReceiverId: values.receiverId,
        MessageDescription: "Offer Send",
        OfferTitle: values.offerTitle,
        StartedDateTime: values.startedDateTime,
        EndedDateTime: values.endedDateTime,
        OfferDescription: values.offerDescription,
      };
      handleResponse(data);
    }
  };

  const handleResponse = (data) => {
    try {
      dispatch(sendUsersMessages(data)).then((response) => {
        if (response?.payload) {
          const newMessage = response.payload;
          setMessages((prev) => [...prev, newMessage?.model]);
          if (userAuth?.id === newMessage.senderId) {
            const data = {
              senderId: newMessage.senderId,
              receiverId: newMessage.receiverId,
              message: newMessage?.model,
            };
            signalRService.sendOfferObject(data);
          }
        }

        setShowOrderDialogue(false);
        setMessageTyped("");
        setSendLoader(false);
      });
    } catch (error) {
      console.error("Invalid response payload:", error);
      setShowOrderDialogue(false);
      setMessageTyped("");
      setSendLoader(false);
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (defaultMessage && defaultMessage?.userDecId !== undefined) {
      fetchUserStatus(defaultMessage?.userDecId);
      setActiveChat(defaultMessage);
    }
  }, [defaultMessage]);

  useEffect(() => {
    if (userAuth?.id) {
      fetchSideBar();
    }
  }, [userAuth?.id]);

  useEffect(() => {
    signalRService.initializeConnection(notificationURL, userAuth?.id);

    const handleIncomingData = (senderId, receiverId, model) => {
      if (userAuth?.id === receiverId) {
        setMessages((prev) => {
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
  }, [userAuth?.id]);

  return (
    <>
      <Container className="py-5">
        <Row className="clearfix">
          <Col md={12}>
            <div className="card chat-app shadow">
              <div
                id="plist"
                className={`people-list ${isMessageSidebarOpen ? "open" : ""}`}
              >
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="bi bi-search"></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search..."
                    onChange={(e) => handleSearchMessage(e.target.value)}
                  />
                </div>
                <ul className="list-unstyled chat-list mt-2 mb-0">
                  {userSideBarLoader ? (
                    <div className="text-center" key="spinner-loader">
                      <Spinner animation="grow" />
                    </div>
                  ) : (
                    <>
                      {usersList && usersList.length > 0 ? (
                        usersList.map((user, index) => {
                          return (
                            <>
                              <li
                                className={`${
                                  activeChat?.userDecId === user?.userDecId &&
                                  "active"
                                } clearfix`}
                                key={`${index}-${user.username}`}
                                onClick={() => handleSelectedChat(user)}
                              >
                                <HandleImages
                                  imagePath={user?.userImage}
                                  imageAlt={user?.username}
                                />

                                <div className="about">
                                  <div className="name">
                                    {truncateCharacters(user?.username, 15)}
                                  </div>
                                  <div className="status">
                                    {`${
                                      user?.lastMessageUsername != ""
                                        ? user?.lastMessageUsername
                                        : "You"
                                    }: ${truncateCharacters(
                                      user?.messageDescription,
                                      12
                                    )}`}
                                  </div>
                                </div>
                              </li>
                            </>
                          );
                        })
                      ) : (
                        <>
                          <li
                            style={{
                              backgroundColor: "#fff",
                              cursor: "auto",
                              textAlign: "center",
                            }}
                          >
                            <p>No Results</p>
                          </li>
                        </>
                      )}
                    </>
                  )}
                </ul>
              </div>
              <div className="chat">
                <div className="chat-header clearfix">
                  <div className="row">
                    <div className="col-sm-10">
                      <div>
                        {activeChat && (
                          <>
                            <HandleImages
                              imagePath={activeChat?.userImage}
                              imageAlt={activeChat?.username}
                            />
                            <div className="chat-about">
                              <h6 className="mb-0">{activeChat?.username}</h6>
                              <div>
                                {userOnlineStatus === -1 ? (
                                  <></>
                                ) : (
                                  <>
                                    {userOnlineStatus === 1 ? (
                                      <>
                                        <small>
                                          Online
                                          <sup>
                                            <i className="bi bi-circle-fill online mx-1"></i>
                                          </sup>
                                        </small>
                                      </>
                                    ) : (
                                      <>
                                        <small>
                                          Offline
                                          <sup>
                                            <i className="bi bi-circle-fill offline mx-1"></i>
                                          </sup>
                                        </small>
                                      </>
                                    )}
                                  </>
                                )}
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                      <div className="text-end">
                        <button
                          className="btn btn-light d-md-none" // Visible on mobile only
                          onClick={toggleSidebar}
                        >
                          <i className="bi bi-list"></i>
                        </button>
                      </div>
                    </div>
                    <div className="col-sm-2"></div>
                  </div>
                </div>
                <div className="chatbox-container" ref={chatContainerRef}>
                  {messageLoader ? (
                    <>
                      <div className="text-center">
                        <Spinner animation="grow" />
                      </div>
                    </>
                  ) : (
                    <ul className="chatbox-list">
                      {messages &&
                        messages.length > 0 &&
                        messages.map((message) => (
                          <li
                            key={message.id}
                            className={`chatbox-message ${
                              message.senderId === String(userAuth?.id)
                                ? "sent"
                                : "received"
                            }`}
                          >
                            <div className="profile-image">
                              <HandleImages
                                imagePath={message.profileImage}
                                imageAlt={message.name}
                                imageStyle={{ width: "100%" }}
                              />
                            </div>
                            <div className="message-content">
                              <div className="sender-name">{message.name}</div>
                              {message.offerTitle ? (
                                <>
                                  {RenderOfferStatus(
                                    message.offerStatus,
                                    message,
                                    userAuth
                                  )}
                                </>
                              ) : (
                                <>
                                  <div className="message-text">
                                    {message.messageDescription}
                                  </div>
                                </>
                              )}

                              <div className="message-time">
                                {message.messageTime}
                              </div>
                            </div>
                          </li>
                        ))}
                    </ul>
                  )}
                </div>
                <div className="chat-message clearfix">
                  <div className="input-group mb-0">
                    <div className="input-group-prepend">
                      <span
                        className="input-group-text"
                        style={{ borderRadius: "0px" }}
                      >
                        <i className="bi bi-send"></i>
                      </span>
                    </div>
                    <textarea
                      className="form-control"
                      placeholder="Enter text here..."
                      rows={1}
                      value={messageTyped}
                      onChange={(e) => handleTypeMessage(e.target.value)}
                    />
                  </div>
                  <div className="row py-3">
                    <div className="col-md-2 col-sm-12 mb-2">
                      <Button
                        variant="secondary-secondary"
                        className="btn-sm w-100"
                        onClick={() => handleCreateOrder()}
                      >
                        <i className="bi bi-coin"></i> Create Offer
                      </Button>
                    </div>
                    <div className="col-md-2 offset-md-8 col-sm-12 mb-2 text-end">
                      <Button
                        variant="primary-secondary"
                        className="btn-sm w-100"
                        onClick={() => handleSendMessage(activeChat?.userDecId)}
                        disabled={sendLoader}
                      >
                        {sendLoader ? (
                          <Spinner
                            animation="border"
                            size="sm"
                            className="me-1"
                          />
                        ) : (
                          <i className="bi bi-send-check me-1"></i>
                        )}
                        Send
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      {showOrderDialogue && (
        <OfferDialogue
          handleOrderClose={handleOrderClose}
          messageObject={defaultMessage}
          showOrderDialogue={showOrderDialogue}
          handleSendOffer={handleSendOffer}
          loader={sendLoader}
        />
      )}
    </>
  );
};

export default Messages;
