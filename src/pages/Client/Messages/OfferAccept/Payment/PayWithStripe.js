import "./style.css";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { useNavigate } from "react-router";
import { stripePublishableKey } from "../../../../../utils/_envConfig";
import { calculateWorkingHours } from "../../../../../utils/_helpers";
import { createStripeCharge } from "../../../../../redux/Actions/stripeActions";

const PayWithStripe = ({
  selectedOfferValues,
  setButtonDisabled,
  buttonDisabled,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { userAuth } = useSelector((state) => state?.authentication);

  const initialValues = {
    valetId: String(selectedOfferValues.valetId),
    customerId: String(selectedOfferValues.customerId),
    title: selectedOfferValues.title,
    description: selectedOfferValues.description,
    fromDateTime: selectedOfferValues.fromDateTime,
    toDateTime: selectedOfferValues.toDateTime,
    actualOrderPrice: String(selectedOfferValues.actualOrderPrice),
    totalWorkCharges: String(selectedOfferValues.totalWorkCharges),
    workingHours: String(
      calculateWorkingHours(
        selectedOfferValues.fromDateTime,
        selectedOfferValues.toDateTime
      )
    ),
    offerId: String(selectedOfferValues.offerId) || "",
  };

  const onToken = (token) => {
    setLoading(true);
    const numericOfferPrice =
      parseFloat(selectedOfferValues?.actualOrderPrice) || 0;
    const stripeChargePercentage = 4; // 4% Stripe fee
    const stripeAmount = numericOfferPrice * (stripeChargePercentage / 100);
    const actualOfferPrice = Math.ceil(numericOfferPrice - stripeAmount);
    initialValues.totalWorkCharges =
      initialValues.totalWorkCharges || String(stripeAmount);
    initialValues.actualOrderPrice =
      initialValues.actualOrderPrice || String(actualOfferPrice);
    const values = {
      ...initialValues,
      StripeEmail: userAuth.email,
      StripeToken: token.id,
    };
    handleSubmitPayment(values);
  };

  const handleSubmitPayment = (values) => {
    setButtonDisabled(true);
    try {
      dispatch(createStripeCharge(values)).then((response) => {
        if (response?.payload) {
          const values = {
            id: response?.payload,
            type: "Order",
          };
          navigate("/payment-success", { state: values });
        }
        setButtonDisabled(false);
      });
    } catch (error) {
      console.log("handle Submit Payment", error);
      setButtonDisabled(false);
    } finally {
      setLoading(false);
    }
  };

  const fromPriceToCent = initialValues.actualOrderPrice * 100;

  return (
    <Button
      className="w-100 my-2"
      style={{ backgroundColor: "#36A5E5", borderColor: "#36A5E5" }}
      disabled={loading || buttonDisabled}
    >
      <StripeCheckout
        name="Order"
        email={userAuth?.email}
        description={initialValues?.paymentDescription}
        amount={fromPriceToCent}
        token={!loading && onToken}
        stripeKey={stripePublishableKey}
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
