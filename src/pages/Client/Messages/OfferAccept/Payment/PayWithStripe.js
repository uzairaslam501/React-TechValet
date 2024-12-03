import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { createStripeCharge } from "../../../../../redux/Actions/stripeActions";
import "./style.css";

const PayWithStripe = ({ selectedOfferValues }) => {
  const { userAuth } = useSelector((state) => state?.authentication);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const initialValues = {
    CustomerId: String(userAuth?.id),
    ValetId: String(selectedOfferValues.valetId),
    OfferId: parseInt(selectedOfferValues.offerTitleId, 10),
    PaymentTitle: selectedOfferValues.offerTitle || null,
    PaymentDescription: selectedOfferValues.offerDescription || null,
    ActualOrderPrice: String(selectedOfferValues.offerPrice),
    TotalWorkCharges: String(
      parseFloat(selectedOfferValues.offerPrice || 0) +
        parseFloat(selectedOfferValues.transactionFee || 0)
    ),
    FromDateTime: selectedOfferValues.startedDateTime,
    ToDateTime: selectedOfferValues.endedDateTime,
  };

  const onToken = (token) => {
    setLoading(true);
    const values = {
      ...initialValues,
      StripeEmail: token.email,
      StripeToken: token.id,
    };
    handleSubmitPayment(values);
  };

  const handleSubmitPayment = (values) => {
    try {
      dispatch(createStripeCharge(values)).then((response) => {
        console.log("responseBack", response?.payload);
      });
    } catch (error) {
      console.log("handle Submit Payment", error);
    } finally {
      setLoading(false);
    }
  };

  const fromPriceToCent = initialValues.actualOrderPrice * 100;

  return (
    <Button
      className="w-100 my-2"
      style={{ backgroundColor: "#36A5E5", borderColor: "#36A5E5" }}
      disabled={loading}
    >
      <StripeCheckout
        name="Order"
        description={initialValues?.paymentDescription}
        amount={fromPriceToCent}
        token={!loading && onToken}
        stripeKey="pk_test_51Li8cOFgcaKUXyX31ffq4fo71006mzK5Um1fOqEDXARFoExd8ucm5yf7htkY7DYAgNZRhtMzmhBgKRATqIaJMO3B00zwvVefw5"
        style={{
          display: "block",
          width: "100%",
          border: "0px",
          borderRadius: "0px",
          boxShadow: "none",
        }} // Hide the actual Stripe button
      />
    </Button>
  );
};

export default PayWithStripe;
