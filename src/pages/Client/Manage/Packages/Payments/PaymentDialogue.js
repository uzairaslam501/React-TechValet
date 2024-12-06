import React from "react";
import Dialogue from "../../../../../components/Custom/Modal/modal";
import { Container } from "react-bootstrap";
import PackagePaymentWithPaypal from "./PayPal";
import PackagePaymentWithStripe from "./Stripe";

const PaymentDialogue = ({ selectedPackage, showModal, handleClose }) => {
  return (
    <Dialogue
      show={showModal}
      onHide={handleClose}
      headerClass=""
      modalBodyClass="p-0"
      title={
        selectedPackage === "one-year" ? "One Year Package" : "Two Year Package"
      }
      size="md"
      bodyContent={
        <Container className="py-3 px-4">
          <PackagePaymentWithStripe selectedPackage={selectedPackage} />
          <PackagePaymentWithPaypal selectedPackage={selectedPackage} />
        </Container>
      }
      backdrop="static"
      showFooter={false}
    />
  );
};

export default PaymentDialogue;
