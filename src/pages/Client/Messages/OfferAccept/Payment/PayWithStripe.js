import React from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

const PayWithStripe = ({ selectedOfferValues }) => {
  const dispatch = useDispatch();
  const { userAuth } = useSelector((state) => state?.authentication);

  const initialValues = {
    CustomerId: parseInt(userAuth?.id, 10),
    ValetId: parseInt(selectedOfferValues.valetId, 10),
    OfferId: parseInt(selectedOfferValues.offerTitleId, 10),
    PaymentTitle: selectedOfferValues.offerTitle || null,
    PaymentDescription: selectedOfferValues.offerDescription || null,
    ActualOrderPrice: parseFloat(selectedOfferValues.offerPrice),
    TotalWorkCharges:
      parseFloat(selectedOfferValues.offerPrice || 0) +
      parseFloat(selectedOfferValues.transactionFee || 0),
    FromDateTime: selectedOfferValues.startedDateTime,
    ToDateTime: selectedOfferValues.endedDateTime,
  };

  const handleCheckout = () => {
    try {
      console.log("Pay With Stripe", initialValues);
      //   dispatch(postCheckoutForOrder(initialValues)).then((response) => {
      //     console.log(response);
      //     window.location.href = response?.payload?.url;
      //   });
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
