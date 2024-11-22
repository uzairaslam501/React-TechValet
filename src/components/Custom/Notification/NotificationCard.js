import React, { useState } from "react";
import { Nav, NavDropdown, Badge, ListGroup, Button } from "react-bootstrap";
import "./NotificationCard.css";
import { truncateCharacters } from "../../../utils/_helpers";

const NotificationCard = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New Message",
      description: "You received a new message",
      isNew: true,
    },
    {
      id: 2,
      title: "System Update",
      description: "Your system was updated",
      isNew: false,
    },
    {
      id: 3,
      title: "Promotion",
      description: "Check out our latest offers",
      isNew: true,
    },
    {
      id: 4,
      title: "Promotion",
      description: "Check out our latest offers",
      isNew: true,
    },
    {
      id: 5,
      title: "Promotion",
      description: "Check out our latest offers",
      isNew: true,
    },
  ]);

  // Delete notification
  const handleDelete = (id) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  // Mark notification as read
  const handleMarkAsRead = (id) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, isNew: false } : n))
    );
  };

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
            {notifications.some((n) => n.isNew) && (
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
                {notifications.filter((n) => n.isNew).length}
              </Badge>
            )}
          </div>
        }
        id="notification-dropdown"
        className="custom-notification-dropdown"
      >
        <div className="notification-dropdown">
          <h6 className="dropdown-header text-center mb-3">
            Notification Center
          </h6>
          {notifications.length > 0 ? (
            <ListGroup>
              {notifications.map((notification) => (
                <ListGroup.Item
                  key={notification.id}
                  className={`d-flex justify-content-between align-items-start ${
                    notification.isNew ? "bg-light" : ""
                  }`}
                  style={{
                    borderRadius: "8px",
                    marginBottom: "10px",
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
                    {notification.isNew && (
                      <Button
                        variant="outline-primary bg-light text-primary border-0"
                        size="sm"
                        onClick={() => handleMarkAsRead(notification.id)}
                        className="bi bi-circle-fill"
                      ></Button>
                    )}
                    <Button
                      variant="outline-danger border-0"
                      size="sm"
                      onClick={() => handleDelete(notification.id)}
                      className="bi bi-trash"
                    ></Button>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            <p className="text-center">No notifications</p>
          )}
        </div>
      </NavDropdown>
    </Nav>
  );
};

export default NotificationCard;
