import React, { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Table,
  Spinner,
} from "react-bootstrap";
import "./style.css";
import { useDispatch } from "react-redux";
import { createPaymentIntent } from "../../../../redux/Actions/stripeActions";

const CheckoutForm = ({ checkoutData }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState(false);
  const [message, setMessage] = useState(null);
  console.log("checkoutData", checkoutData);
  const dispatch = useDispatch();

  const fetchPaymentIntent = () => {
    try {
      dispatch(createPaymentIntent(checkoutData)).then((response) => {
        console.log(response?.payload);
        setClientSecret(response?.payload);
      });
    } catch (error) {
      setMessage(`Error: ${error}`);
    } finally {
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        }
      );
      if (error) {
        setMessage(`Payment failed: ${error.message}`);
      } else if (paymentIntent.status === "succeeded") {
        setMessage("Payment successful!");
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPaymentIntent();
  }, [checkoutData]);

  return (
    <div className="checkout-container">
      <Container className="py-1">
        <Row>
          {/* Right Column: Payment Form */}
          <Col md={12}>
            <Card
              className="shadow-sm p-5"
              style={{
                backgroundColor: "transparent",
              }}
            >
              <Table className="striped bordered hover mb-3">
                <tr>
                  <td className="fw-bold">Order Title</td>
                  <td>{checkoutData?.paymentTitle}</td>
                </tr>
                <tr>
                  <td className="fw-bold">Description</td>
                  <td>{checkoutData?.paymentDescription}</td>
                </tr>
                <tr>
                  <td className="fw-bold">From</td>
                  <td>{checkoutData?.fromTime}</td>
                </tr>
                <tr>
                  <td className="fw-bold">To</td>
                  <td>{checkoutData?.toTime}</td>
                </tr>
                <tr>
                  <td className="fw-bold">Duration</td>
                  <td>{checkoutData?.duration}</td>
                </tr>
                <tr>
                  <td className="fw-bold">Order Price</td>
                  <td>{`$${checkoutData?.actualOrderPrice}`}</td>
                </tr>
              </Table>

              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formName" className="mb-3">
                  <Form.Control type="text" placeholder="John Doe" disabled />
                </Form.Group>

                <Form.Group controlId="formEmail" className="mb-3">
                  <Form.Control
                    type="email"
                    placeholder="john.doe@example.com"
                    disabled
                  />
                </Form.Group>

                <Form.Group controlId="formCard" className="mb-3">
                  <CardElement className="card-element form-control" />
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100"
                  disabled={loading}
                >
                  {loading ? (
                    <Spinner as="span" animation="border" size="sm" />
                  ) : (
                    "Pay Now"
                  )}
                </Button>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
      {message && <p className="payment-message">{message}</p>}
    </div>
  );
};

export default CheckoutForm;
