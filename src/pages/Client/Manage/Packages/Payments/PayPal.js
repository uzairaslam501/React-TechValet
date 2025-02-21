import React from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { postCheckoutForPackage } from "../../../../../redux/Actions/paypalActions";

const PackagePaymentWithPaypal = ({
  selectedPackage,
  setIsDisabled,
  isDisabled,
}) => {
  const dispatch = useDispatch();
  const { userAuth } = useSelector((state) => state?.authentication);

  const initialValues = {
    ClientId: parseInt(userAuth?.id, 10),
    SelectedPackage: selectedPackage === "one-year" ? "IYear" : "2Year",
  };

  const handleCheckout = () => {
    try {
      setIsDisabled(true);
      dispatch(postCheckoutForPackage(initialValues)).then((response) => {
        if (response?.payload) {
          window.location.href = response?.payload?.url;
        }
        setIsDisabled(false);
      });
    } catch (error) {
      setIsDisabled(false);
    }
  };

  return (
    <Button
      onClick={() => handleCheckout()}
      className="btn-primary-secondary w-100"
      disabled={isDisabled}
    >
      Pay With Paypal
    </Button>
  );
};

export default PackagePaymentWithPaypal;
