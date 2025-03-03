import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { stripeCheckOutForPackages } from "../../../../../redux/Actions/stripeActions";
import { useNavigate } from "react-router";
import { stripePublishableKey } from "../../../../../utils/_envConfig";

const PackagePaymentWithStripe = ({
  selectedPackage,
  setIsDisabled,
  isDisabled,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userAuth } = useSelector((state) => state?.authentication);
  const [loading, setLoading] = useState(false);

  const initialValues = {
    ClientId: parseInt(userAuth?.id, 10),
    SelectedPackage: selectedPackage === "one-year" ? "IYear" : "2Year",
  };

  const onToken = (token) => {
    setLoading(true);
    setIsDisabled(true);
    const values = {
      ...initialValues,
      StripeEmail: userAuth.email,
      StripeToken: token.id,
    };
    handleSubmitPayment(values);
  };

  const handleSubmitPayment = (values) => {
    try {
      dispatch(stripeCheckOutForPackages(values)).then((response) => {
        if (response.payload) {
          const values = {
            id: response?.payload,
            type: "Package",
          };
          navigate("/payment-success", { state: values });
        }
        setIsDisabled(false);
        setLoading(false);
      });
    } catch (error) {
      console.log("handle Submit Payment", error);
      setIsDisabled(false);
      setLoading(false);
    }
  };

  return (
    <Button
      className="w-100 my-2"
      style={{ backgroundColor: "#36A5E5", borderColor: "#36A5E5" }}
      disabled={loading || isDisabled}
    >
      <StripeCheckout
        name="Package"
        email={userAuth?.email}
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

export default PackagePaymentWithStripe;
