import React from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { postCheckoutForOrder } from "../../../../../redux/Actions/paypalActions";

const PayWithPaypal = ({
  selectedOfferValues,
  fetchMessages,
  setShowAcceptOrderDialogue,
}) => {
  const dispatch = useDispatch();
  const { userAuth } = useSelector((state) => state?.authentication);

  const initialValues = {
    ClientId: parseInt(userAuth?.id, 10),
    ValetId: parseInt(selectedOfferValues.valetId, 10),
    OfferId: parseInt(selectedOfferValues.offerTitleId, 10),
    OrderId: 0,
    OrderTitle: selectedOfferValues.offerTitle || null,
    OrderDescription: selectedOfferValues.offerDescription || null,
    OrderPrice: parseFloat(selectedOfferValues.offerPrice),
    TotalPrice:
      parseFloat(selectedOfferValues.offerPrice || 0) +
      parseFloat(selectedOfferValues.transactionFee || 0),
    StartDate: selectedOfferValues.startedDateTime,
    EndDate: selectedOfferValues.endedDateTime,
  };

  const handleCheckout = () => {
    try {
      const numericOfferPrice =
        parseFloat(selectedOfferValues?.offerPrice) || 0;
      const stripeChargePercentage = 4; // 4% Stripe fee
      const stripeAmount = numericOfferPrice * (stripeChargePercentage / 100);
      const actualOfferPrice = Math.ceil(numericOfferPrice - stripeAmount);
      initialValues.TotalWorkCharges = String(stripeAmount);
      initialValues.ActualOrderPrice = String(actualOfferPrice);

      dispatch(postCheckoutForOrder(initialValues)).then((response) => {
        console.log(response);
        window.location.href = response?.payload?.url;
      });
    } catch (error) {}
  };

  return (
    <Button
      onClick={() => handleCheckout()}
      className="btn-primary-secondary w-100"
    >
      Pay With Paypal
    </Button>
  );
};

export default PayWithPaypal;
