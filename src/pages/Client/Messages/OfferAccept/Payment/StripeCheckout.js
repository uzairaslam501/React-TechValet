import React, { useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";

const stripePromise = loadStripe(
  "pk_test_51Li8cOFgcaKUXyX31ffq4fo71006mzK5Um1fOqEDXARFoExd8ucm5yf7htkY7DYAgNZRhtMzmhBgKRATqIaJMO3B00zwvVefw5"
); // replace with your Stripe public key

const StripeCheckout = ({ checkoutData }) => {
  const { userAuth } = useSelector((state) => state?.authentication);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCheckout = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https:localhost:7240/api/StripePayment/create-checkout-session/${userAuth?.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: {
            // replace with actual user id
            checkoutDTO: checkoutData, // pass the necessary checkout data (e.g., price, description)
          },
        }
      );

      const session = await response.json();

      if (session.Status === false) {
        setError(session.Message);
        setLoading(false);
        return;
      }

      // Get the Stripe session ID from your server response
      const { sessionId, CheckOutURL } = session.data;

      const stripe = await stripePromise;

      // Redirect to Stripe Checkout
      const { error } = await stripe.redirectToCheckout({
        sessionId: sessionId,
      });

      if (error) {
        setError(error.message);
        setLoading(false);
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <>
          {error && <div className="alert alert-danger">{error}</div>}
          <Button
            onClick={handleCheckout}
            variant="secondary-secondary"
            className="w-100"
          >
            Pay With Stripe
          </Button>
        </>
      )}
    </div>
  );
};

export default StripeCheckout;
