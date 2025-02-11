import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Nav,
  NavDropdown,
  Badge,
  ListGroup,
  Button,
  Spinner,
} from "react-bootstrap";
import "./NotificationCard.css";
import { truncateCharacters } from "../../../utils/_helpers";
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
      dispatch(getNotifications(userAuth?.id)).then((response) => {
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
      });
    } catch (error) {
      console.error("Error fetching notifications:", error);
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
      dispatch(deleteNotification(id)).then((response) => {
        fetchNotificationsCount();
        fetchNotificationsList();
      });
    } catch (error) {
      console.error("Error fetching notifications:", error);
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
        toast.success(description);
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
        <div className="notification-dropdown">
          <h6 className="dropdown-header text-center mb-3">
            Notification Center
          </h6>
          {notificationLoader ? (
            <div className="text-center">
              <Spinner animation="grow" />
            </div>
          ) : (
            <>
              {notifications.length > 0 ? (
                <ListGroup>
                  {notifications.map((notification) => (
                    <ListGroup.Item
                      key={notification.notificationId}
                      className={`d-flex justify-content-between align-items-start shadow-sm`}
                      style={{
                        borderRadius: "8px",
                        marginBottom: "10px",
                        backgroundColor:
                          notification.isRead === 0 ? "#ebeaea" : "",
                      }}
                    >
                      <div>
                        <NavLink
                          to={notification.url}
                          target="_blank"
                          className="text-decoration-none"
                        >
                          <div
                            className="fw-bold"
                            style={{
                              wordBreak: "break-all",
                            }}
                          >
                            {truncateCharacters(notification.title, 33)}
                          </div>
                          <small
                            style={{
                              wordBreak: "break-all",
                            }}
                          >
                            {truncateCharacters(notification.description, 76)}
                          </small>
                        </NavLink>
                      </div>
                      <div className="d-flex flex-column">
                        {notification.isRead === 0 && (
                          <Button
                            variant="outline-primary bg-light text-primary border-0"
                            size="sm"
                            onClick={() =>
                              handleMarkAsRead(notification.notificationId)
                            }
                            className="bi bi-circle-fill"
                          ></Button>
                        )}
                        <Button
                          variant="outline-danger border-0"
                          size="sm"
                          onClick={() =>
                            handleDelete(notification.notificationId)
                          }
                          className="bi bi-trash"
                        ></Button>
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              ) : (
                <p className="text-center">No notifications</p>
              )}
              <div className="notification-footer">
                {notifications.length > 0 && (
                  <Button
                    onClick={() => handleDeleteAll()}
                    type="button"
                    size="sm"
                    variant="danger"
                  >
                    Delete All
                  </Button>
                )}
                {notifications.some((n) => n.isRead === 0) && (
                  <Button
                    onClick={() => handleMarkAll()}
                    type="button"
                    size="sm"
                    variant="primary"
                  >
                    Read All
                  </Button>
                )}
              </div>
            </>
          )}
        </div>
      </NavDropdown>
    </Nav>
  );
};

export default NotificationCard;
