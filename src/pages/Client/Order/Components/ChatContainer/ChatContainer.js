import React from "react";
import HandleImages from "../../../../../components/Custom/Avatars/HandleImages";
import { Button, Card, Spinner } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const ChatContainer = ({ messageLoader, messages, userAuth }) => {
  console.log(messages);
  const getFileElement = (filePath) => {
    if (filePath) {
      const fileUrl = filePath;
      const isImage = [".png", ".jpeg", ".jpg", ".svg", ".webp"].some((ext) =>
        filePath.includes(ext)
      );

      return isImage ? (
        <a href={fileUrl} target="_blank" rel="noopener noreferrer">
          <img
            src={fileUrl}
            className="img-fluid my-2 border-0"
            style={{ width: "150px", height: "150px", borderRadius: "0" }}
            alt="File"
          />
        </a>
      ) : (
        <div className="text-end">
          <Button
            as={NavLink}
            variant="success"
            size="sm"
            className="my-2"
            target="_blank"
            rel="noopener noreferrer"
            to={fileUrl}
            download
            title="Download"
          >
            Download File
          </Button>
        </div>
      );
    }
    return null;
  };

  const renderStatusType = (orderReasonType, orderReasonIsActive, senderId) => {
    if (orderReasonType) {
      const statusMapping = {
        Cancel: {
          type: "Cancellation",
          description:
            senderId !== String(userAuth?.id)
              ? "If you do not respond, the order would be cancelled within the next 48 hours"
              : "You have sent the request of cancelling the order",
        },
        Extend: {
          type: "Days Extension",
          description:
            senderId !== String(userAuth?.id)
              ? "If you do not respond, the date would be extended within the next 48 hours"
              : "You have sent the request of extended the date",
        },
        Revision: { type: "Revision", description: "" },
        Zoom: { type: "Zoom Meeting", description: "" },
      };

      const status = statusMapping[orderReasonType] || {};

      if (orderReasonIsActive === 1 && senderId !== String(userAuth?.id)) {
        return (
          <button type="button" className="btn btn-success btn-block" disabled>
            Accepted
          </button>
        );
      }

      if (orderReasonIsActive === 3 && senderId !== String(userAuth?.id)) {
        return (
          <button type="button" className="btn btn-danger btn-block" disabled>
            Rejected
          </button>
        );
      }

      return (
        <div>
          <Card>
            <Card.Body>
              <div className="font-weight-bold">{status.type} Request:</div>
              <p className="text-muted">{status.description}</p>
            </Card.Body>
          </Card>
        </div>
      );
    }
    return null;
  };

  const renderZoomMeeting = (
    orderReasonType,
    isZoomMeeting,
    senderId,
    joinUrl,
    startUrl
  ) => {
    if (orderReasonType) {
      if (isZoomMeeting === 1 && senderId !== String(userAuth?.id)) {
        return (
          <div>
            <Card>
              <Card.Body>
                <div className="font-weight-bold">Join Meeting</div>
                <p className="text-muted">
                  you have recieved the invitation of zoom meeting
                </p>
                <div className="text-end">
                  <Button
                    variant="success"
                    size="sm"
                    as={NavLink}
                    to={joinUrl}
                    target="_blank"
                    className="btn-block"
                  >
                    Join Meeting
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </div>
        );
      } else if (isZoomMeeting === 1 && senderId === String(userAuth?.id)) {
        return (
          <div>
            <Card>
              <Card.Body>
                <div className="font-weight-bold">Meeting Invitation Sent</div>
                <p className="text-muted">
                  you have sent the invitation of zoom meeting
                </p>
                <div className="text-end">
                  <Button
                    variant="success"
                    size="sm"
                    as={NavLink}
                    to={startUrl}
                    target="_blank"
                    className="btn-block"
                  >
                    Start Meeting
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </div>
        );
      }
    }
    return null;
  };

  return messageLoader ? (
    <div className="text-center">
      <Spinner animation="grow" />
    </div>
  ) : (
    <ul className="chatbox-list">
      {messages &&
        messages.length > 0 &&
        messages.map((message) => (
          <li
            key={message.id}
            className={`chatbox-message ${
              message.senderId === String(userAuth?.id) ? "sent" : "received"
            }`}
          >
            <div className="profile-image">
              <HandleImages
                imagePath={
                  message.profileImage || "../frontAssets/images/user/s1.png"
                }
                imageAlt={message.name}
                imageStyle={{ width: "100%" }}
              />
            </div>
            <div className="message-content">
              <div className="sender-name">{message.name}</div>
              {message.orderReasonIsActive ? (
                <div>
                  {renderStatusType(
                    message.orderReasonType,
                    message.orderReasonIsActive,
                    message.senderId
                  )}
                </div>
              ) : message.isZoomMeeting === 1 ? (
                <div>
                  {renderZoomMeeting(
                    message.orderReasonType,
                    message.isZoomMeeting,
                    message.senderId,
                    message.joinUrl
                  )}
                </div>
              ) : (
                <div>
                  <div className="message-text">
                    {message.messageDescription}
                  </div>
                  {getFileElement(message.filePath)}
                </div>
              )}

              <div className="message-time">{message.messageTime}</div>
            </div>
          </li>
        ))}
    </ul>
  );
};

export default ChatContainer;
