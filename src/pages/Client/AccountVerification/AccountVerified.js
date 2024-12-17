import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const AccountVerified = () => {
  return (
    <Container className="d-flex justify-content-center align-items-center py-5">
      <Card className="shadow-lg text-center p-4" style={{ maxWidth: "500px" }}>
        <i
          className="bi bi-check-circle text-success"
          style={{ fontSize: "5.5rem" }}
        ></i>
        <Card.Title className="text-success fw-bold fs-3">
          Account Verification Successfull
        </Card.Title>
        <Card.Text className="text-muted my-3">
          Your Account verification has been Successfull. If you have inquiries
          contact support for assistance.
        </Card.Text>
        <Row className="g-3">
          <Col xl={12} lg={12} md={12} sm={12} xs={12} className="mb-1">
            <Button variant="primary" href="/account" className="w-100">
              Profile
            </Button>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default AccountVerified;
