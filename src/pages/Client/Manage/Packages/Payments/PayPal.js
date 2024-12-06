import React from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { postCheckoutForPackage } from "../../../../../redux/Actions/paypalActions";

const PackagePaymentWithPaypal = ({ selectedPackage }) => {
  const dispatch = useDispatch();
  const { userAuth } = useSelector((state) => state?.authentication);

  const initialValues = {
    ClientId: parseInt(userAuth?.id, 10),
    SelectedPackage: selectedPackage === "one-year" ? "IYear" : "2Year",
  };

  const handleCheckout = () => {
    try {
      dispatch(postCheckoutForPackage(initialValues)).then((response) => {
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

export default PackagePaymentWithPaypal;
