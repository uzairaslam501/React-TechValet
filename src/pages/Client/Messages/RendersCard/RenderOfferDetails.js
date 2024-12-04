import React from "react";

const RenderOfferDetails = (message, userAuth) => {
  return (
    <div>
      <div
        className="p-3 border-bottom text-dark"
        style={{ maxWidth: "295px" }}
      >
        <h6>
          <span
            style={{ wordBreak: "break-all" }}
            className="fw-bold"
            id={`offerTitle${message.offerTitleId}`}
          >
            {message.offerTitle}
          </span>
        </h6>
        <p
          className="mb-0 text-muted-black mb-3"
          style={{ wordBreak: "break-all" }}
          id={`offerDescription${message.offerTitleId}`}
        >
          {message.offerDescription}
        </p>
        <p className="mb-1">
          <span className="fw-bold">Offer price:</span>{" "}
          <i className="bi bi-coin"></i> $
          <span id={`offerPrice${message.offerTitleId}`}>
            {message.offerPrice}
          </span>
        </p>
        {userAuth?.role === "Customer" && (
          <p className="mb-1">
            <span className="fw-bold">Transaction Fee:</span>{" "}
            <i className="bi bi-coin"></i> $
            <span id={`transactionFee${message.offerTitleId}`}>
              {message.transactionFee}
            </span>
          </p>
        )}
        <p className="mb-1">
          <span className="fw-bold">Started From:</span>{" "}
          <i className="bi bi-clock"></i>
          <span id={`startedDateTime${message.offerTitleId}`}>
            {message.startedDateTime}
          </span>
        </p>
        <p className="mb-1">
          <span className="fw-bold">Ending Time:</span>{" "}
          <i className="bi bi-clock"></i>{" "}
          <span id={`endedDateTime${message.offerTitleId}`}>
            {message.endedDateTime}
          </span>
        </p>
      </div>
    </div>
  );
};

export default RenderOfferDetails;
