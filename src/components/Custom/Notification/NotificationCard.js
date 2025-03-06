import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Nav,
  NavDropdown,
  Badge,
  ListGroup,
  Button,
  Spinner,
  Row,
  Col,
  ButtonGroup,
} from "react-bootstrap";
import "./NotificationCard.css";
import {
  checkIfStringIsValid,
  truncateCharacters,
} from "../../../utils/_helpers";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAllNotifications,
  deleteNotification,
  getNotifications,
  getNotificationsCount,
  markAllNotificationsAsRead,
  markNotifications,
} from "../../../redux/Actions/notificationActions";
import signalRService from "../../../services/SignalR";
import { notificationURL } from "../../../utils/_envConfig";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";

const NotificationCard = () => {
  const dispatch = useDispatch();
  const isSubscribed = useRef(false);
  const [unReadCount, setUnReadCount] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [notificationLoader, setNotificationLoader] = useState(false);
  const { userAuth } = useSelector((state) => state?.authentication);

  const fetchNotificationsList = async () => {
    try {
      dispatch(getNotifications(20)).then((response) => {
        console.log(response?.payload);
        setNotifications(response?.payload);
        setNotificationLoader(false);
      });
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
    }
  };

  const fetchNotificationsCount = () => {
    try {
      dispatch(getNotificationsCount(userAuth?.id)).then((response) => {
        setUnReadCount(response?.payload);
      });
    } catch (error) {
      console.error("Error fetching unread count:", error);
    }
  };

  // Mark notification as read
  const handleMarkAsRead = (id) => {
    try {
      setNotificationLoader(true);
      dispatch(markNotifications(id)).then((response) => {
        if (response?.payload === true) {
          setNotifications((prev) =>
            prev.map((notification) =>
              notification.notificationId === id
                ? { ...notification, isRead: 1 }
                : notification
            )
          );
          setUnReadCount(unReadCount - 1);
        }
        setNotificationLoader(false);
      });
    } catch (error) {
      console.error("Error fetching notifications:", error);
      setNotificationLoader(false);
    } finally {
    }
  };

  const handleMarkAll = () => {
    try {
      setNotificationLoader(true);
      dispatch(markAllNotificationsAsRead()).then((response) => {
        fetchNotificationsCount();
        fetchNotificationsList();
      });
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
    }
  };

  // Delete notification
  const handleDelete = (id) => {
    try {
      setNotificationLoader(true);
      dispatch(deleteNotification(id)).then((response) => {
        fetchNotificationsCount();
        fetchNotificationsList();
        setNotificationLoader(false);
      });
    } catch (error) {
      console.error("Error fetching notifications:", error);
      setNotificationLoader(false);
    } finally {
    }
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const handleDeleteAll = () => {
    try {
      setNotificationLoader(true);
      dispatch(deleteAllNotifications()).then((response) => {
        fetchNotificationsCount();
        fetchNotificationsList();
      });
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
    }
  };

  const handleNotificationPanel = async () => {
    await fetchNotificationsList();
  };

  const [receivedNotifications, setReceivedNotifications] = useState(new Set());

  const handleIncomingNotification = useCallback(
    (
      receiverId,
      title,
      isRead,
      isActive,
      url,
      createdAt,
      description,
      notificationType
    ) => {
      const notificationKey = `${receiverId}-${createdAt}`;
      if (!receivedNotifications.has(notificationKey)) {
        receivedNotifications.add(notificationKey);
        setReceivedNotifications(new Set(receivedNotifications));
        setUnReadCount((prev) => prev + 1); // Only increment if notification is unique
        if (checkIfStringIsValid(description)) {
          toast.success(`${title} - ${description}`);
        }
      }
    },
    [receivedNotifications]
  );

  useEffect(() => {
    fetchNotificationsCount();
  }, [dispatch]);

  useEffect(() => {
    signalRService.initializeConnection(notificationURL, userAuth?.id);

    if (!isSubscribed.current) {
      signalRService.subscribe(handleIncomingNotification);
      isSubscribed.current = true;
    }

    return () => {
      signalRService.unsubscribe(handleIncomingNotification);
      isSubscribed.current = false;
      signalRService.disconnect();
    };
  }, [handleIncomingNotification, userAuth?.id]);

  return (
    <Nav
      className="border border-secondary"
      style={{
        borderRadius: "50px",
        padding: "0px 4px",
        background: "#e1e1e1",
        color: "#000",
        position: "relative",
      }}
    >
      <NavDropdown
        title={
          <div style={{ position: "relative" }}>
            <i className="bi bi-bell-fill"></i>
            {unReadCount ? (
              <Badge
                bg="danger"
                pill
                style={{
                  position: "absolute",
                  top: "-5px",
                  right: "-5px",
                  transform: "translate(50%, -50%)",
                  zIndex: 1,
                }}
              >
                {unReadCount > 9 ? `9+` : unReadCount}
              </Badge>
            ) : null}
          </div>
        }
        id="notification-dropdown"
        className="custom-notification-dropdown"
        onClick={handleNotificationPanel}
      >
        <div className="notifications-panel">
          <h6
            className="m-0 text-center px-0 rounded py-3"
            style={{
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            }}
          >
            Notification Center
          </h6>
          <div className="notification-dropdown px-3 pt-2">
            {notificationLoader ? (
              <div className="text-center">
                <Spinner animation="grow" />
              </div>
            ) : (
              <>
                {notifications && notifications.length > 0 ? (
                  <>
                    <ListGroup>
                      {notifications.map((notification) => (
                        <Row
                          key={notification.notificationId}
                          className="mx-0 mb-2 py-2 px-2 rounded align-items-center"
                          style={{
                            backgroundColor:
                              notification.isRead === 0 ? "#ebeaea" : "#f7f7f7",
                            cursor: "pointer",
                          }}
                        >
                          {/* Left Column - Notification Content (Clickable) */}
                          <Col xl={10} lg={10} md={10} sm={10} xs={10}>
                            <NavLink
                              to={notification.url}
                              target="_blank"
                              className="text-decoration-none text-dark d-block w-100 h-100 p-2"
                              onClick={(e) => {
                                e.preventDefault(); // Stop default navigation first
                                handleMarkAsRead(notification.notificationId);

                                // Redirect after performing the function
                                setTimeout(() => {
                                  window.open(notification.url, "_blank");
                                }, 500); // Delay to ensure `handleMarkAsRead` executes
                              }}
                            >
                              <div
                                className="fw-bold"
                                style={{ wordBreak: "break-word" }}
                              >
                                {truncateCharacters(notification.title, 33)}
                              </div>
                              <small style={{ wordBreak: "break-word" }}>
                                {truncateCharacters(
                                  notification.description,
                                  76
                                )}
                              </small>
                              <div
                                className="text-start mt-1"
                                style={{ fontSize: "13px" }}
                              >
                                {notification.createdAt}
                              </div>
                            </NavLink>
                          </Col>

                          {/* Right Column - Buttons (Not Clickable as a Link) */}
                          <Col
                            xl={2}
                            lg={2}
                            md={2}
                            sm={2}
                            xs={2}
                            className="text-end"
                          >
                            {notification.isRead === 0 && (
                              <Button
                                variant="outline-primary text-primary border-0"
                                size="sm"
                                onClick={(e) => {
                                  e.preventDefault(); // Stop NavLink from triggering
                                  handleMarkAsRead(notification.notificationId);
                                }}
                                style={{
                                  backgroundColor: "#ebeaea",
                                }}
                                className="bi bi-check-circle-fill"
                              ></Button>
                            )}
                            <Button
                              variant="outline-danger border-0"
                              size="sm"
                              onClick={(e) => {
                                e.preventDefault(); // Stop NavLink from triggering
                                handleDelete(notification.notificationId);
                              }}
                              className="bi bi-trash"
                            ></Button>
                          </Col>
                        </Row>
                      ))}
                    </ListGroup>
                  </>
                ) : (
                  <p className="text-center">No notifications</p>
                )}
              </>
            )}
          </div>
          {notifications.length > 0 && (
            <div className="notification-footer py-2 px-3 rounded">
              <ButtonGroup className="w-100">
                <Button
                  onClick={() => handleDeleteAll()}
                  type="button"
                  size="sm"
                  variant="danger"
                  className="w-100"
                >
                  Delete All
                </Button>

                <Button
                  as={NavLink}
                  to="/notifications"
                  type="button"
                  size="sm"
                  variant="success"
                  className="w-100"
                >
                  View All
                </Button>

                {notifications.some((n) => n.isRead === 0) && (
                  <Button
                    onClick={() => handleMarkAll()}
                    type="button"
                    size="sm"
                    variant="primary"
                    className="w-100"
                  >
                    Read All
                  </Button>
                )}
              </ButtonGroup>
            </div>
          )}
        </div>
      </NavDropdown>
    </Nav>
  );
};

export default NotificationCard;
