import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getMessagesSidebar,
  getUserStatus,
  getUsersMessages,
  handleOrderOffer,
  sendUsersMessages,
} from "../../../redux/Actions/messagesActions";
import HandleImages from "../../../components/Custom/Avatars/HandleImages";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import {
  checkIfStringIsValid,
  getFirstAndLastDayOfMonth,
  truncateCharacters,
} from "../../../utils/_helpers";
import RenderOfferStatus from "./RendersCard/RenderOfferStatus";
import "./style.css";
import OfferDialogue from "./OfferDialogue/OfferDialogue";
import signalRService from "../../../services/SignalR";
import { notificationURL } from "../../../utils/_envConfig";
import { debounce, set } from "lodash";
import OfferAccept from "./OfferAccept/OfferAccept";
import { useParams } from "react-router";
import { toast } from "react-toastify";

const Messages = () => {
  const { id } = useParams();
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

  const [showAcceptOrderDialogue, setShowAcceptOrderDialogue] = useState(false);
  const [selectedOfferValues, setSelectedOfferValues] = useState(null);
  const [noRecordToShow, setNoRecordToShow] = useState(false);
  const { userAuth } = useSelector((state) => state?.authentication);

  const activeChatRef = useRef(activeChat);

  const fetchSideBar = (findUser = "") => {
    try {
      setUserSideBarLoader(true);
      dispatch(
        getMessagesSidebar({
          findUser: findUser,
          userId: encodeURIComponent(id),
        })
      ).then((response) => {
        if (response?.payload) {
          setUsersList(response?.payload);
          if (findUser) {
            setUserSideBarLoader(false);
          } else {
            if (activeChat) {
              // Filter the payload based on userDecId and senderId
              const filteredPayload = response?.payload?.filter(
                (record) =>
                  record.userDecId === activeChat.userDecId &&
                  record.senderId === activeChat.senderId
              );
              setDefaultMessage(filteredPayload[0]);
            } else {
              if (id) {
                const filteredPayload = response?.payload?.find(
                  (record) => record.userEncId === id
                );
                setDefaultMessage(filteredPayload);
              } else {
                setDefaultMessage(response?.payload[0]);
              }
            }
          }
        } else {
          console.error("No payload received");
        }
        if (
          !Array.isArray(response?.payload) ||
          response.payload.length === 0
        ) {
          setUserSideBarLoader(false);
          setMessagesLoader(false);
          setNoRecordToShow(true);
        }
      });
    } catch (error) {
      console.error("Error fetching sidebar:", error);
    }
  };

  const fetchUserStatus = (userId) => {
    try {
      dispatch(getUserStatus(userId)).then((response) => {
        setUserOnlineStatus(response?.payload);
        fetchMessages(userId);
      });
    } catch (error) {
      console.error("Error fetching sidebar:", error);
    }
  };

  const fetchMessages = (userId) => {
    try {
      dispatch(getUsersMessages(userId)).then((response) => {
        if (response?.payload) {
          setMessages(response?.payload);
          setUserSideBarLoader(false);
          setMessagesLoader(false);
        }
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
      fetchUserStatus(user?.userEncId);

      setUsersList((prev) =>
        prev.map((u) =>
          u.userDecId === user.userDecId ? { ...u, hasNewMessage: false } : u
        )
      );
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
    setShowAcceptOrderDialogue(false);
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
    } else {
      console.log("No active chat or message text.");
    }
  };

  const handleSendOffer = (values) => {
    if (values) {
      setSendLoader(true);
      const data = {
        SenderId: String(userAuth?.id),
        CustomerId:
          userAuth?.role === "Customer"
            ? String(userAuth?.id)
            : String(values?.customerId),
        valetId:
          userAuth?.role === "Valet"
            ? String(userAuth?.id)
            : String(values?.valetId),
        ReceiverId: values.receiverId,
        MessageDescription: "Offer Send",
        OfferTitle: values.offerTitle,
        StartedDateTime: values.startedDateTime,
        EndedDateTime: values.endedDateTime,
        OfferDescription: values.offerDescription,
      };
      if (
        checkIfStringIsValid(data.SenderId) &&
        checkIfStringIsValid(data.CustomerId) &&
        checkIfStringIsValid(data.valetId) &&
        checkIfStringIsValid(data.ReceiverId)
      ) {
        handleResponse(data);
      } else {
        setSendLoader(false);
        toast.info(
          "Cann't create offer right now, System is going in under process. Try again after sometime or contact support team!"
        );
      }
    }
  };

  const handleResponse = (data) => {
    try {
      dispatch(sendUsersMessages(data)).then((response) => {
        if (response?.payload) {
          const newMessage = response.payload;
          setMessages((prev) => {
            const messageDate = newMessage?.model?.messageDate;

            // Clone previous state
            const newMessages = { ...prev };

            if (newMessages[messageDate]) {
              newMessages[messageDate] = [
                ...newMessages[messageDate],
                newMessage?.model,
              ];
            } else {
              newMessages[messageDate] = [newMessage?.model];
            }

            return newMessages;
          });

          handleSignalRCall(newMessage);
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

  const handleOfferStatus = (data) => {
    try {
      dispatch(handleOrderOffer(data)).then((response) => {
        if (response?.payload) {
          const newMessage = response.payload;

          setMessages((prev) => {
            const messageDate = newMessage?.model?.messageDate;
            const newMessages = { ...prev };

            if (newMessages[messageDate]) {
              const index = newMessages[messageDate].findIndex(
                (msg) => msg.offerTitleId === newMessage?.model?.offerTitleId
              );

              if (index !== -1) {
                // Update the existing message instead of adding a new one
                newMessages[messageDate] = newMessages[messageDate].map(
                  (msg, i) =>
                    i === index ? { ...msg, ...newMessage?.model } : msg
                );
              } else {
                // If the message does not exist, add it
                newMessages[messageDate] = [
                  ...newMessages[messageDate],
                  newMessage?.model,
                ];
              }
            } else {
              // Create a new date entry if it doesn't exist
              newMessages[messageDate] = [newMessage?.model];
            }

            return newMessages;
          });

          // Ensure the receiver gets the rejected status
          if (userAuth?.id !== newMessage.senderId) {
            handleSignalRCall(newMessage);
          }
        }
      });
    } catch (error) {
      console.error("Invalid response payload:", error);
    }
  };

  const handlePaymentModal = (data) => {
    setSelectedOfferValues(data);
    setShowAcceptOrderDialogue(true);
  };

  const handleSignalRCall = (newMessage) => {
    const data = {
      senderId: newMessage.senderId,
      receiverId: newMessage.receiverId,
      message: newMessage?.model,
    };
    signalRService.sendOfferObject(data);
  };

  const validRange = {
    start: getFirstAndLastDayOfMonth().currentDay,
    end: getFirstAndLastDayOfMonth().monthEnd,
  };

  useEffect(() => {
    activeChatRef.current = activeChat;
  }, [activeChat]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (defaultMessage && defaultMessage?.userDecId !== undefined) {
      fetchUserStatus(defaultMessage?.userEncId);
      setActiveChat(defaultMessage);
    }
  }, [defaultMessage]);

  useEffect(() => {
    if (userAuth?.id) {
      fetchSideBar();
    }
  }, [userAuth?.id]);

  useEffect(() => {
    if (!userAuth?.id) return;

    signalRService.initializeConnection(notificationURL, userAuth?.id);

    const handleIncomingData = (senderId, receiverId, model) => {
      if (model.messageDescription === "Reject") {
        if (userAuth?.id !== receiverId) {
          setMessages((prev) => {
            const messageDate = model.messageDate;
            const newMessages = { ...prev };

            if (newMessages[messageDate]) {
              const existsIndex = newMessages[messageDate].findIndex(
                (msg) => msg.offerTitleId === model?.offerTitleId
              );

              if (existsIndex !== -1) {
                // ✅ Update the existing message by replacing it
                newMessages[messageDate] = newMessages[messageDate].map(
                  (msg, index) =>
                    index === existsIndex ? { ...msg, ...model } : msg
                );
              } else {
                // ✅ Add new message if it doesn't exist
                newMessages[messageDate] = [...newMessages[messageDate], model];
              }
            } else {
              // ✅ Create new date entry if it doesn't exist
              newMessages[messageDate] = [model];
            }

            return newMessages;
          });
        }
      } else {
        if (userAuth?.id === receiverId) {
          if (activeChatRef.current?.userDecId === String(senderId)) {
            setMessages((prev) => {
              const messageDate = model.messageDate;
              const newMessages = { ...prev };

              if (newMessages[messageDate]) {
                const exists = newMessages[messageDate].some(
                  (msg) => msg.id === model.id
                );
                if (!exists) {
                  newMessages[messageDate] = [
                    ...newMessages[messageDate],
                    model,
                  ];
                }
              } else {
                newMessages[messageDate] = [model];
              }

              return newMessages;
            });

            setUsersList((prev) =>
              prev.map((u) => {
                return u.userDecId === String(senderId)
                  ? {
                      ...u,
                      messageDescription: model.messageDescription,
                      hasNewMessage: false,
                    }
                  : u;
              })
            );
          } else {
            setUsersList((prev) =>
              prev.map((u) => {
                return u.userDecId === String(senderId)
                  ? {
                      ...u,
                      messageDescription: model.messageDescription,
                      hasNewMessage: true,
                    }
                  : u;
              })
            );
          }
        }
      }
    };

    signalRService.subscribe(handleIncomingData);

    return () => {
      signalRService.unsubscribe(handleIncomingData);
      signalRService.disconnect();
    };
  }, [userAuth?.id]);

  return (
    <div>
      <Container className="py-5">
        <Row className="clearfix">
          <Col md={12}>
            <div className="chat-card chat-app shadow">
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
                    disabled={noRecordToShow}
                  />
                </div>
                <ul className="list-unstyled chat-list mt-2 mb-0">
                  {userSideBarLoader ? (
                    <div className="text-center">
                      <Spinner animation="grow" size="sm" />
                    </div>
                  ) : (
                    <div>
                      {usersList && usersList.length > 0 ? (
                        usersList.map((user, index) => {
                          return (
                            <li
                              className={`${
                                activeChat?.userDecId === user?.userDecId
                                  ? "active"
                                  : ""
                              } ${
                                user?.hasNewMessage ? "new-message" : ""
                              } clearfix`}
                              key={`${index}-${user?.userDecId}`}
                              onClick={() => handleSelectedChat(user)}
                            >
                              {user?.hasNewMessage && (
                                <i className="bi bi-circle-fill btn text-success border-0 btn-sm new-message-icon"></i>
                              )}
                              <HandleImages
                                imagePath={user?.userImage}
                                imageAlt={user?.username}
                                imageStyle={{ height: "42px" }}
                              />
                              <div className="about">
                                <div className="name">
                                  {truncateCharacters(user?.username, 15)}
                                </div>
                                <div className="status">
                                  {user?.hasNewMessage ? (
                                    <span className="text-success">
                                      New Message....
                                    </span>
                                  ) : (
                                    `${
                                      user?.lastMessageUsername !== ""
                                        ? user?.lastMessageUsername
                                        : "You"
                                    }: ${truncateCharacters(
                                      user?.messageDescription,
                                      12
                                    )}`
                                  )}
                                </div>
                              </div>
                            </li>
                          );
                        })
                      ) : (
                        <li
                          style={{
                            backgroundColor: "#fff",
                            cursor: "auto",
                            textAlign: "center",
                          }}
                        >
                          <p>No Results</p>
                        </li>
                      )}
                    </div>
                  )}
                </ul>
              </div>
              <div className="chat">
                <div className="chat-header clearfix">
                  <div className="row">
                    <div className="col-sm-12">
                      <div>
                        {activeChat && (
                          <div>
                            <HandleImages
                              imagePath={activeChat?.userImage}
                              imageAlt={activeChat?.username}
                            />
                            <div className="chat-about">
                              <h6 className="mb-0">{activeChat?.username}</h6>
                              <div>
                                {userOnlineStatus !== -1 && (
                                  <div>
                                    {userOnlineStatus === 1 ? (
                                      <small>
                                        Online
                                        <sup>
                                          <i className="bi bi-circle-fill online mx-1"></i>
                                        </sup>
                                      </small>
                                    ) : (
                                      <small>
                                        Offline
                                        <sup>
                                          <i className="bi bi-circle-fill offline mx-1"></i>
                                        </sup>
                                      </small>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="text-end">
                        <button
                          className="btn btn-light d-lg-none" // Visible on mobile only
                          onClick={toggleSidebar}
                        >
                          <i className="bi bi-list"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="chatbox-container" ref={chatContainerRef}>
                  {messageLoader ? (
                    <div className="text-center">
                      <Spinner animation="grow" />
                    </div>
                  ) : (
                    <>
                      <ul className="chatbox-list">
                        {messages &&
                          Object.entries(messages).map(
                            ([date, messagesOnDate]) => (
                              <div key={date}>
                                <div className="d-flex justify-content-center fixed-date">
                                  <h2 className="message-date">{date}</h2>
                                </div>
                                {/* Group header */}
                                {messagesOnDate.map((message) => (
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
                                        imageStyle={{
                                          width: "100%",
                                          height: "100%",
                                        }}
                                      />
                                    </div>
                                    <div className="message-content">
                                      <div className="sender-name">
                                        {message.name}
                                      </div>
                                      {message.offerTitle ? (
                                        <div>
                                          {RenderOfferStatus(
                                            message.offerStatus,
                                            message,
                                            userAuth,
                                            handleOfferStatus,
                                            handlePaymentModal
                                          )}
                                        </div>
                                      ) : (
                                        <div>
                                          <div className="message-text">
                                            {message.messageDescription}
                                          </div>
                                        </div>
                                      )}
                                      <div className="message-time">
                                        {message.time}
                                      </div>
                                    </div>
                                  </li>
                                ))}
                              </div>
                            )
                          )}
                      </ul>
                    </>
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
                      disabled={noRecordToShow}
                    />
                  </div>
                  <div className="row py-3">
                    {!noRecordToShow && (
                      <>
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
                            onClick={() =>
                              handleSendMessage(activeChat?.userDecId)
                            }
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
                      </>
                    )}
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

      {showAcceptOrderDialogue && (
        <OfferAccept
          showAcceptOrderDialogue={showAcceptOrderDialogue}
          handleOrderClose={handleOrderClose}
          selectedOfferValues={selectedOfferValues}
          fetchMessages={fetchMessages}
          setShowAcceptOrderDialogue={setShowAcceptOrderDialogue}
        />
      )}
    </div>
  );
};

export default Messages;
