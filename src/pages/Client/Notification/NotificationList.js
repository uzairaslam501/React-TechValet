import React, { useEffect, useState } from "react";
import {
  ListGroup,
  Button,
  Spinner,
  Row,
  Col,
  Badge,
  Container,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAllNotifications,
  deleteNotification,
  getNotifications,
  getNotificationsCount,
  markAllNotificationsAsRead,
  markNotifications,
} from "../../../redux/Actions/notificationActions";
import { NavLink } from "react-router-dom";
import { truncateCharacters } from "../../../utils/_helpers";
import moment from "moment";
import "./style.css";

const NotificationList = () => {
  const dispatch = useDispatch();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userAuth } = useSelector((state) => state?.authentication);

  useEffect(() => {
    fetchNotifications();
  }, [dispatch]);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      dispatch(getNotifications(-1)).then((response) => {
        setNotifications(response?.payload);
        setLoading(false);
      });
    } catch (error) {
      console.error("Error fetching notifications:", error);
      setLoading(false);
    } finally {
    }
  };

  const handleMarkAsRead = (id) => {
    setLoading(true);
    dispatch(markNotifications(id)).then((response) => {
      if (response?.payload === true) {
        setNotifications((prev) =>
          prev.map((notification) =>
            notification.notificationId === id
              ? { ...notification, isRead: 1 }
              : notification
          )
        );
      }
      setLoading(false);
    });
  };

  const handleDelete = (id) => {
    setLoading(true);
    dispatch(deleteNotification(id)).then(() => {
      setNotifications((prev) => prev.filter((n) => n.notificationId !== id));
      setLoading(false);
    });
  };

  const handleDeleteAll = () => {
    setLoading(true);
    dispatch(deleteAllNotifications()).then(() => {
      setNotifications([]);
      setLoading(false);
    });
  };

  const handleMarkAll = () => {
    setLoading(true);
    dispatch(markAllNotificationsAsRead()).then(() => {
      setNotifications((prev) =>
        prev.map((notification) => ({ ...notification, isRead: 1 }))
      );
      setLoading(false);
    });
  };

  return (
    <Container className="py-5">
      <Row>
        <Col
          xl={{ span: 8, offset: 2 }}
          lg={{ span: 8, offset: 2 }}
          md={{ span: 8, offset: 2 }}
          sm={12}
          xs={12}
        >
          <div className="notification-list-container">
            <h4 className="text-center mb-3">Notifications</h4>
            {loading ? (
              <div className="text-center">
                <Spinner animation="grow" />
              </div>
            ) : notifications.length > 0 ? (
              <>
                <ListGroup className="notification-list">
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
                        >
                          <div
                            className="fw-bold"
                            style={{ wordBreak: "break-word" }}
                          >
                            {notification.title}{" "}
                            {notification.isRead === 0 && (
                              <span>
                                <Badge bg="primary">New</Badge>
                              </span>
                            )}
                          </div>
                          <small style={{ wordBreak: "break-word" }}>
                            {notification.description}
                          </small>
                          <div
                            className="text-start mt-1 text-muted"
                            style={{ fontSize: "13px" }}
                          >
                            <span className="">
                              {moment(notification.createdAt).fromNow()}
                            </span>
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
                <div className="text-center mt-3">
                  {notifications.length > 0 && (
                    <Button
                      onClick={handleDeleteAll}
                      type="button"
                      size="sm"
                      variant="danger"
                      className="me-2"
                    >
                      Delete All
                    </Button>
                  )}
                  {notifications.some((n) => n.isRead === 0) && (
                    <Button
                      onClick={handleMarkAll}
                      type="button"
                      size="sm"
                      variant="primary"
                    >
                      Read All
                    </Button>
                  )}
                </div>
              </>
            ) : (
              <p className="text-center">No notifications available</p>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default NotificationList;
