import React from "react";
import HandleImages from "../../../../../components/Custom/Avatars/HandleImages";
import RenderOfferStatus from "../../RendersCard/RenderOfferStatus";
import { Spinner } from "react-bootstrap";

const ChatContainer = ({
  messageLoader,
  messages,
  userAuth,
  handleOfferStatus,
}) => {
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
                imagePath={message.profileImage}
                imageAlt={message.name}
                imageStyle={{ width: "100%" }}
              />
            </div>
            <div className="message-content">
              <div className="sender-name">{message.name}</div>
              {message.offerTitle ? (
                <div>
                  {RenderOfferStatus(
                    message.offerStatus,
                    message,
                    userAuth,
                    handleOfferStatus
                  )}
                </div>
              ) : (
                <div>
                  <div className="message-text">
                    {message.messageDescription}
                  </div>
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
