import React, { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { useLocation } from "react-router";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../../../../../components/Custom/Checkout/Stripe/StripeCheckout";

// Load Stripe instance with your public key
const stripePromise = loadStripe(
  "pk_test_51Li8cOFgcaKUXyX31ffq4fo71006mzK5Um1fOqEDXARFoExd8ucm5yf7htkY7DYAgNZRhtMzmhBgKRATqIaJMO3B00zwvVefw5"
); // replace with your Stripe public key

const CustomCheckoutPage = () => {
  const { state } = useLocation();
  const checkoutData = state;
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm checkoutData={checkoutData} />
    </Elements>
  );
};

export default CustomCheckoutPage;
