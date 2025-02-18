import React from "react";
import { NavLink } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import { extractDate } from "../../../../../utils/_helpers";
import CustomButtons from "../../../../../components/Custom/Button/buttons";
import HandleImages from "../../../../../components/Custom/Avatars/HandleImages";

const ChatContainer = ({
  orderDetails,
  messages,
  userAuth,
  handleAcceptRejectDate,
  handleAcceptRejectCancel,
  sendLoader,
}) => {
  const handleAccept = (message, type) => {
    console.log(message);
    const data = {
      orderId: encodeURIComponent(message?.orderEncId),
      orderReasonId: encodeURIComponent(message?.orderReasonEncId),
      orderStatus: "Accept",
      receiverId:
        userAuth?.role === "Valet"
          ? encodeURIComponent(orderDetails?.customerEncId)
          : encodeURIComponent(orderDetails?.valetEncId),
      senderId: encodeURIComponent(userAuth?.userEncId),
      dateExtension: extractDate(message?.messageDescription),
    };
    if (type === "extend") {
      handleAcceptRejectDate(data);
    } else {
      handleAcceptRejectCancel(data);
    }
  };

  const handleReject = (message, type) => {
    const data = {
      orderId: encodeURIComponent(message?.orderEncId),
      orderReasonId: encodeURIComponent(message?.orderReasonEncId),
      orderStatus: "Cancel",
      receiverId:
        userAuth?.role === "Valet"
          ? encodeURIComponent(orderDetails?.customerEncId)
          : encodeURIComponent(orderDetails?.valetEncId),
      senderId: encodeURIComponent(userAuth?.userEncId),
      dateExtension: extractDate(message?.messageDescription),
    };
    if (type === "extend") {
      handleAcceptRejectDate(data);
    } else {
      handleAcceptRejectCancel(data);
    }
  };

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

  const renderStatusType = (
    orderReasonType,
    orderReasonIsActive,
    senderId,
    messageDescription,
    message
  ) => {
    if (orderReasonType) {
      const statusMapping = {
        Cancel: {
          type: "Cancellation",
          description:
            senderId !== String(userAuth?.id)
              ? "If you do not respond, the order would be cancelled within the next 48 hours"
              : "You have sent the request of cancelling the order",
          buttons: [
            {
              id: 1,
              title: "Accept",
              label: "Accept",
              onClick: () => handleAccept(message, "cancel"),
              variant: "success",
              className: "w-100",
              disabled: sendLoader,
            },
            {
              id: 2,
              title: "Reject",
              label: "Reject",
              onClick: () => handleReject(message, "cancel"),
              variant: "outline-danger",
              className: "w-100",
              disabled: sendLoader,
            },
          ],
        },
        Extend: {
          type: "Days Extension",
          description:
            senderId !== String(userAuth?.id)
              ? "If you do not respond, the date would be extended within the next 48 hours"
              : "You have sent the request of extended the date",
          buttons: [
            {
              id: 1,
              title: "Accept",
              label: "Accept",
              onClick: () => handleAccept(message, "extend"),
              variant: "success",
              className: "w-100",
              disabled: sendLoader,
            },
            {
              id: 2,
              title: "Reject",
              label: "Reject",
              onClick: () => handleReject(message, "extend"),
              variant: "outline-danger",
              className: "w-100",
              disabled: sendLoader,
            },
          ],
        },
        Revision: { type: "Revision", description: "" },
        Zoom: { type: "Zoom Meeting", description: "" },
      };

      const status = statusMapping[orderReasonType] || {};
      const buttons = status.buttons || [];
      return (
        <div>
          <Card style={{ width: "20rem" }}>
            <Card.Header>
              <div className="font-weight-bold">{status.type} Request:</div>
            </Card.Header>
            <Card.Body>
              <p>
                <div dangerouslySetInnerHTML={{ __html: messageDescription }} />
              </p>
              {message.orderReasonIsActive === "2" ? (
                <Button
                  className="w-100"
                  size="sm"
                  variant="primary-secondary"
                  disabled
                >
                  Accepted
                </Button>
              ) : message?.orderReasonIsActive === "3" ? (
                <Button className="w-100" size="sm" variant="danger" disabled>
                  Rejected
                </Button>
              ) : (
                senderId !== String(userAuth?.id) &&
                userAuth?.role !== "Valet" &&
                message.orderReasonIsActive === "1" && (
                  <CustomButtons
                    buttons={buttons}
                    row={message}
                    className="w-100"
                  />
                )
              )}
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
    startUrl,
    messageDescription
  ) => {
    if (orderReasonType) {
      if (isZoomMeeting === 1 && senderId !== String(userAuth?.id)) {
        return (
          <div>
            <Card style={{ width: "20rem" }}>
              <Card.Header>
                <div className="font-weight-bold">Join Meeting</div>
              </Card.Header>
              <Card.Body>
                <p className="text-muted">
                  You have received a Zoom meeting invitation. Click the button
                  below to join the meeting.
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
            <Card style={{ width: "20rem" }}>
              <Card.Header>
                <div className="font-weight-bold">Start Meeting</div>
              </Card.Header>
              <Card.Body>
                <p className="text-muted">
                  You have sent a Zoom meeting invitation. Click the button
                  below to start the meeting.
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

  return (
    <ul className="chatbox-list">
      {messages &&
        Object.entries(messages).map(([date, messagesOnDate]) => (
          <div key={date}>
            <div className="d-flex justify-content-center fixed-date">
              <h2 className="message-date">{date}</h2>
            </div>
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
                    imagePath={
                      message.profileImage ||
                      "../frontAssets/images/user/s1.png"
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
                        message.senderId,
                        message.messageDescription,
                        message
                      )}
                    </div>
                  ) : message.isZoomMeeting === 1 ? (
                    <div>
                      {renderZoomMeeting(
                        message.orderReasonType,
                        message.isZoomMeeting,
                        message.senderId,
                        message.joinUrl,
                        message.messageDescription
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

                  <div
                    className={`message-time `}
                    style={{
                      color:
                        message.senderId === String(userAuth?.id)
                          ? "#f9f9f9"
                          : "#111111",
                    }}
                  >
                    {message.time}
                  </div>
                </div>
              </li>
            ))}
          </div>
        ))}
    </ul>
  );
};

export default ChatContainer;
