import React from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { postCheckoutForOrder } from "../../../../../redux/Actions/paypalActions";

const PayWithPaypal = ({
  selectedOfferValues,
  selectedOfferPayPalValues,
  setButtonDisabled,
  buttonDisabled,
  setShowAcceptOrderDialogue,
}) => {
  const dispatch = useDispatch();
  const { userAuth } = useSelector((state) => state?.authentication);

  let initialValues = {};

  if (selectedOfferValues) {
    initialValues = {
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
  } else if (selectedOfferPayPalValues) {
    initialValues = {
      ClientId: parseInt(userAuth?.id, 10),
      EncValetId: encodeURIComponent(selectedOfferPayPalValues.valetId),
      OfferId: parseInt(selectedOfferPayPalValues.offerId, 10) || 0,
      OrderId: 0,
      OrderTitle: selectedOfferPayPalValues.title || null,
      OrderDescription: selectedOfferPayPalValues.description || null,
      OrderPrice: parseFloat(selectedOfferPayPalValues.actualOrderPrice),
      TotalPrice: parseFloat(selectedOfferPayPalValues.totalWorkCharges),
      StartDate: selectedOfferPayPalValues.fromDateTime,
      EndDate: selectedOfferPayPalValues.toDateTime,
    };
  }

  const handleCheckout = () => {
    try {
      setButtonDisabled(true);
      const numericOfferPrices =
        selectedOfferValues?.offerPrice ||
        selectedOfferValues?.totalWorkCharges;
      const numericOfferPrice = parseFloat(numericOfferPrices) || 0;

      const stripeChargePercentage = 4; // 4% Stripe fee
      const stripeAmount = numericOfferPrice * (stripeChargePercentage / 100);
      const actualOfferPrice = Math.ceil(numericOfferPrice - stripeAmount);
      initialValues.TotalWorkCharges = String(stripeAmount);
      initialValues.ActualOrderPrice = String(actualOfferPrice);
      console.log(initialValues);
      dispatch(postCheckoutForOrder(initialValues)).then((response) => {
        if (response?.payload?.url) {
          window.location.href = response?.payload?.url;
        }
        setButtonDisabled(false);
      });
    } catch (error) {
      setButtonDisabled(false);
    }
  };

  return (
    <Button
      onClick={() => handleCheckout()}
      className="btn-primary-secondary w-100"
      disabled={buttonDisabled}
    >
      Pay With Paypal
    </Button>
  );
};

export default PayWithPaypal;
