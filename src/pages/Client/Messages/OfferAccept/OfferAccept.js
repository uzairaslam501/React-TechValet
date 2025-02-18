import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Dialogue from "../../../../components/Custom/Modal/modal";
import PayWithPaypal from "./Payment/PayWithPaypal";
import PayWithStripe from "./Payment/PayWithStripe";
import PayWithPackage from "./Payment/PayWithPackage";
import { useSelector } from "react-redux";

const OfferAccept = ({
  showAcceptOrderDialogue,
  handleOrderClose,
  selectedOfferValues,
  fetchMessages,
  setShowAcceptOrderDialogue,
}) => {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const { userAuth } = useSelector((state) => state?.authentication);

  const initialStripeValues = {
    customerId: encodeURIComponent(userAuth.userEncId),
    valetId: encodeURIComponent(selectedOfferValues.senderEncId),
    offerId: parseInt(selectedOfferValues.offerTitleId, 10),
    title: String(selectedOfferValues.offerTitle),
    description: selectedOfferValues.offerDescription,
    actualOrderPrice: selectedOfferValues.offerPrice,
    totalWorkCharges: String(
      parseFloat(selectedOfferValues.offerPrice || 0) +
        parseFloat(selectedOfferValues.transactionFee || 0)
    ),
    fromDateTime: selectedOfferValues.startedDateTime,
    toDateTime: selectedOfferValues.endedDateTime,
  };
  console.log("initialStripeValues", initialStripeValues);

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
            setButtonDisabled={setButtonDisabled}
            buttonDisabled={buttonDisabled}
          />
          <PayWithStripe
            selectedOfferValues={initialStripeValues}
            fetchMessages={fetchMessages}
            setButtonDisabled={setButtonDisabled}
            buttonDisabled={buttonDisabled}
          />
          <PayWithPaypal
            selectedOfferValues={selectedOfferValues}
            fetchMessages={fetchMessages}
            setButtonDisabled={setButtonDisabled}
            buttonDisabled={buttonDisabled}
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
