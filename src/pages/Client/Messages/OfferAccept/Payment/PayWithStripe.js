import React, { useState } from "react";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { createCheckoutSession } from "../../../../../redux/Actions/stripeActions";
import { useNavigate } from "react-router";

const stripePromise = loadStripe(
  "pk_test_51Li8cOFgcaKUXyX31ffq4fo71006mzK5Um1fOqEDXARFoExd8ucm5yf7htkY7DYAgNZRhtMzmhBgKRATqIaJMO3B00zwvVefw5"
); // replace with your Stripe public key

const PayWithStripe = ({ selectedOfferValues }) => {
  const navigate = useNavigate();
  const { userAuth } = useSelector((state) => state?.authentication);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  const handleCheckout = () => {
    try {
      setLoading(true);
      setError(null);
      console.log("Pay With Stripe", initialValues);
      dispatch(createCheckoutSession(initialValues)).then((response) => {
        //console.log(response);
        window.open(response?.payload?.checkOutURL, "_blank");
        //navigate("/checkout", { state: response?.payload });
      });
    } catch (error) {}
  };

  return (
    <Button
      onClick={() => handleCheckout()}
      className="btn-secondary-secondary w-100 my-2"
    >
      Pay With Stripe
    </Button>
  );
};

export default PayWithStripe;
