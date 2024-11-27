import React from "react";
import RenderOfferDetails from "./RenderOfferDetails";

const RenderOfferStatus = (status, message, userAuth, handleOfferStatus) => {
  const statusMessages = {
    1: "Offer Sent",
    2: "Offer Accepted",
    3: "Offer Cancelled",
  };

  return (
    <div
      className="box shadow-sm mb-3 rounded bg-white p-2"
      style={{ width: "fit-content" }}
    >
      {RenderOfferDetails(message, userAuth)}
      <p
        id={`offerRequestText-${message.offerTitleId}`}
        className="fw-bold font-italic text-center py-2"
        style={{
          backgroundColor: "#deb887",
        }}
      >
        <span>
          {message.messageDescription === "Offer Send" &&
          status === "1" &&
          message.senderId !== String(userAuth?.id)
            ? "Offer Recieved"
            : statusMessages[status]}
        </span>
      </p>
      {status === "1" &&
        message.senderId !== String(userAuth?.id) &&
        userAuth?.role === "Customer" && (
          <>
            <button
              id={`offerRequestBtnA-${message.offerTitleId}`}
              className="btn btn-sm btn-success w-100 mb-1"
              // onClick={() => handlePaymentModal(message.offerTitleId)}
            >
              Accept
            </button>
            {message?.offerTitleId != null && (
              <button
                id={`offerRequestBtnR-${message.offerTitleId}`}
                className="btn btn-sm btn-danger w-100"
                onClick={() => {
                  const offerModel = {
                    OfferDetailId: message.offerTitleId,
                    MessageDescription: "Reject",
                    OfferTitle: message.offerTitle,
                    OfferDescription: message.offerDescription,
                    OfferPrice: message.offerPrice,
                    StartedDateTime: message.startedDateTime,
                    EndedDateTime: message.endedDateTime,
                  };
                  handleOfferStatus(offerModel);
                }}
              >
                Reject
              </button>
            )}
          </>
        )}
    </div>
  );
};

export default RenderOfferStatus;
