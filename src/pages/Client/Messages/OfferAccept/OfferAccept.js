import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import Dialogue from "../../../../components/Custom/Modal/modal";
import PayWithPaypal from "./Payment/PayWithPaypal";
import PayWithStripe from "./Payment/PayWithStripe";
import PayWithPackage from "./Payment/PayWithPackage";

const OfferAccept = ({
  showAcceptOrderDialogue,
  handleOrderClose,
  selectedOfferValues,
  fetchMessages,
  setShowAcceptOrderDialogue,
}) => {
  const initialStripeValues = {
    customerId: selectedOfferValues.customerId,
    valetId: selectedOfferValues.valetId,
    offerId: parseInt(selectedOfferValues.offerTitleId, 10),
    title: selectedOfferValues.offerTitle || null,
    description: selectedOfferValues.offerDescription || null,
    actualOrderPrice: selectedOfferValues.offerPrice,
    totalWorkCharges: String(
      parseFloat(selectedOfferValues.offerPrice || 0) +
        parseFloat(selectedOfferValues.transactionFee || 0)
    ),
    fromDateTime: selectedOfferValues.startedDateTime,
    toDateTime: selectedOfferValues.endedDateTime,
  };

  return (
    <Dialogue
      show={showAcceptOrderDialogue}
      onHide={handleOrderClose}
      headerClass="px-3 py-2"
      title="Create Offer"
      bodyContent={
        <Container>
          <PayWithPackage
            selectedOfferValues={selectedOfferValues}
            fetchMessages={fetchMessages}
            setShowAcceptOrderDialogue={setShowAcceptOrderDialogue}
          />
          <PayWithStripe
            selectedOfferValues={initialStripeValues}
            fetchMessages={fetchMessages}
          />
          <PayWithPaypal
            selectedOfferValues={selectedOfferValues}
            fetchMessages={fetchMessages}
          />
        </Container>
      }
      backdrop="static"
      customFooterButtons={[
        {
          text: "Cancel",
          className: "btn-secondary-secondary",
          onClick: handleOrderClose,
        },
      ]}
    />
  );
};

export default OfferAccept;
