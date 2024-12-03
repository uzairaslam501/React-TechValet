import React from "react";
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
            selectedOfferValues={selectedOfferValues}
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
