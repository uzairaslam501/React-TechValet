import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import {
  createStripeCharge,
  paymentSuccess,
} from "../../../../redux/Actions/stripeActions";

const StripePaymentSuccess = () => {
  const dispatch = useDispatch();

  const [paymentData, setPaymentData] = useState(null);
  const queryParams = new URLSearchParams(window.location.search);
  const sessionId = queryParams.get("session_id");

  const createStripeCharges = (checkout) => {
    try {
      dispatch(createStripeCharge(checkout)).then((response) => {
        console.log(response);
      });
    } catch (error) {}
  };

  useEffect(() => {
    if (sessionId) {
      try {
        dispatch(paymentSuccess(sessionId)).then((response) => {
          console.log(response?.payload);
          setPaymentData(response?.payload);
          createStripeCharges(response?.payload);
        });
      } catch (error) {}
    }
  }, [sessionId]);

  return (
    <Container className="d-flex justify-content-center align-items-center py-5">
      <Card className="shadow-lg text-center p-4" style={{ maxWidth: "500px" }}>
        <i
          className="bi bi-check-circle text-success"
          style={{ fontSize: "5.5rem" }}
        ></i>
        <Card.Title className="text-success fw-bold fs-3">
          Payment Successful!
        </Card.Title>
        <Card.Text className="text-muted my-3">
          Thank you for your purchase. Your transaction was completed
          successfully.
        </Card.Text>
        <div className="text-start mb-4">
          <p className="fw-bold text-center">Order Summary:</p>
          {paymentData && (
            <table className="table">
              <tr>
                <td className="fw-semibold ps-xl-5 ps-lg-5 ps-md-5 ps-sm-5 px-xs-2">
                  Offer Title:
                </td>{" "}
                <td>{paymentData?.paymentTitle}</td>
              </tr>
              <tr>
                <td className="fw-semibold ps-xl-5 ps-lg-5 ps-md-5 ps-sm-5 px-xs-2">
                  Description:
                </td>
                <td>{`$${paymentData?.paymentDescription}`}</td>
              </tr>
              <tr>
                <td className="fw-semibold ps-xl-5 ps-lg-5 ps-md-5 ps-sm-5 px-xs-2">
                  Offer Price:
                </td>
                <td>{`$${paymentData?.actualOrderPrice}`}</td>
              </tr>
              <tr>
                <td className="fw-semibold ps-xl-5 ps-lg-5 ps-md-5 ps-sm-5 px-xs-2">
                  Offer Duration:
                </td>{" "}
                <td>{paymentData?.duration}</td>
              </tr>
            </table>
          )}
        </div>
        <Row className="g-3">
          <Col xl={6} lg={6} md={6} sm={12} xs={12} className="mb-1">
            <Button variant="primary" href="/messages" className="w-100">
              Back to Home
            </Button>
          </Col>
          <Col xl={6} lg={6} md={6} sm={12} xs={12} className="mb-1">
            <Button variant="outline-primary" href="/orders" className="w-100">
              Order Details
            </Button>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default StripePaymentSuccess;
