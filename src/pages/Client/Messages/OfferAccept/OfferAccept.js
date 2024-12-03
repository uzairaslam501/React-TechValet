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
}) => {
  return (
    <Dialogue
      show={showAcceptOrderDialogue}
      onHide={handleOrderClose}
      headerClass="px-3 py-2"
      title="Create Offer"
      bodyContent={
        <Container>
          <PayWithPackage selectedOfferValues={selectedOfferValues} />
          <PayWithStripe selectedOfferValues={selectedOfferValues} />
          <PayWithPaypal selectedOfferValues={selectedOfferValues} />
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
