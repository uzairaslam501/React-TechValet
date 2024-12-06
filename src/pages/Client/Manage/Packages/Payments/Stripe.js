import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { stripeCheckOutForPackages } from "../../../../../redux/Actions/stripeActions";
import { useNavigate } from "react-router";

const PackagePaymentWithStripe = ({ selectedPackage }) => {
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
    const values = {
      ...initialValues,
      StripeEmail: token.email,
      StripeToken: token.id,
    };
    handleSubmitPayment(values);
  };

  const handleSubmitPayment = (values) => {
    try {
      dispatch(stripeCheckOutForPackages(values)).then((response) => {
        console.log("responseBack", response?.payload);
        const values = {
          id: response?.payload,
          type: "Package",
        };
        navigate("/payment-success", { state: values });
      });
    } catch (error) {
      console.log("handle Submit Payment", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      className="w-100 my-2"
      style={{ backgroundColor: "#36A5E5", borderColor: "#36A5E5" }}
      disabled={loading}
    >
      <StripeCheckout
        name="Package"
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

export default PackagePaymentWithStripe;
