import React from "react";
import { Button, Container, Row, Col, Image } from "react-bootstrap";

const Unauthorized = () => {
  return (
    <Container className="d-flex flex-column justify-content-center align-items-center vh-100 text-center">
      <Row>
        <Col>
          <Image
            src="https://via.placeholder.com/300"
            alt="Unauthorized Access"
            fluid
          />
          <h1 className="mt-4 display-4 text-danger">403 - Unauthorized</h1>
          <p className="lead">
            Oops! You don’t have permission to view this page. Please make sure
            you have the right credentials.
          </p>
          <Button variant="primary" href="/" size="lg" className="mt-3">
            Go to Home
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Unauthorized;
