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
  deleteNotification,
  getNotifications,
  getNotificationsCount,
  markNotifications,
} from "../../../redux/Actions/notificationActions";
import signalRService from "../../../services/SignalR";
import { notificationURL } from "../../../utils/_envConfig";

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
    } catch (error) {}
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

  const handleNotificationPanel = async () => {
    await fetchNotificationsList();
  };

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
      setUnReadCount((prev) => prev + 1);
    },
    []
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
            {unReadCount && (
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
            )}
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
            </>
          )}
        </div>
      </NavDropdown>
    </Nav>
  );
};

export default NotificationCard;
