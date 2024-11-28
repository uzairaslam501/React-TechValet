import React from "react";
import { Button, Container } from "react-bootstrap";
import Dialogue from "../../../../components/Custom/Modal/modal";
import PayWithPaypal from "./Payment/PayWithPaypal";

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
          <Button variant="success" className="w-100">
            Buy with Package
          </Button>
          <Button className="btn-secondary-secondary w-100 my-2">
            Buy with Package
          </Button>
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
