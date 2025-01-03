import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { createStripeCharge } from "../../../../../redux/Actions/stripeActions";
import { useNavigate } from "react-router";
import "./style.css";

const PayWithStripe = ({ selectedOfferValues }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { userAuth } = useSelector((state) => state?.authentication);

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
    const numericOfferPrice = parseFloat(selectedOfferValues?.offerPrice) || 0;
    const stripeChargePercentage = 4; // 4% Stripe fee
    const stripeAmount = numericOfferPrice * (stripeChargePercentage / 100);
    const actualOfferPrice = Math.ceil(numericOfferPrice - stripeAmount);
    initialValues.TotalWorkCharges = String(stripeAmount);
    initialValues.ActualOrderPrice = String(actualOfferPrice);
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
        const values = {
          id: response?.payload,
          type: "Order",
        };
        navigate("/payment-success", { state: values });
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
        }}
      />
    </Button>
  );
};

export default PayWithStripe;
