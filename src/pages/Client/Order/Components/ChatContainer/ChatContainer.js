import React from "react";
import HandleImages from "../../../../../components/Custom/Avatars/HandleImages";
import RenderOfferStatus from "../../../Messages/RendersCard/RenderOfferStatus";
import { Card, Spinner } from "react-bootstrap";

const ChatContainer = ({
  messageLoader,
  messages,
  userAuth,
  handleOfferStatus,
}) => {
  console.log(userAuth);
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
            className="img-fluid mt-2"
            style={{ width: "150px", height: "150px" }}
            alt="File"
          />
        </a>
      ) : (
        <a
          className="btn btn-success btn-sm mt-2"
          target="_blank"
          rel="noopener noreferrer"
          href={fileUrl}
          download
          title="Download"
        >
          Download File
        </a>
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
            "If you do not respond, the order would be cancelled within the next 48 hours",
        },
        Extend: {
          type: "Days Extension",
          description:
            "If you do not respond, the date would be extended within the next 48 hours",
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
