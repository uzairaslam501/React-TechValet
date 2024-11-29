import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const PaymentCancelled = () => {
  return (
    <Container className="d-flex justify-content-center align-items-center py-5">
      <Card className="shadow-lg text-center p-4" style={{ maxWidth: "500px" }}>
        <i
          className="bi bi-x-circle text-danger"
          style={{ fontSize: "5.5rem" }}
        ></i>
        <Card.Title className="text-danger fw-bold fs-3">
          Payment Cancelled
        </Card.Title>
        <Card.Text className="text-muted my-3">
          We're sorry, but your payment has been cancelled. Please try again or
          contact support for assistance.
        </Card.Text>
        <Row className="g-3">
          <Col xl={6} lg={6} md={6} sm={12} xs={12} className="mb-1">
            <Button variant="primary" href="/retry" className="w-100">
              Try Again
            </Button>
          </Col>
          <Col xl={6} lg={6} md={6} sm={12} xs={12} className="mb-1">
            <Button variant="outline-danger" href="/support" className="w-100">
              Contact Support
            </Button>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default PaymentCancelled;
