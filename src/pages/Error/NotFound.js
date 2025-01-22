import React from "react";
import { Button, Container, Row, Col, Image } from "react-bootstrap";

const NotFound = () => {
  return (
    <Container className="d-flex flex-column justify-content-center align-items-center vh-100 text-center">
      <Row>
        <Col>
          <Image
            src="https://via.placeholder.com/300"
            alt="404 Not Found"
            fluid
          />
          <h1 className="mt-4 display-4 text-warning">404 - Page Not Found</h1>
          <p className="lead">
            The page you’re looking for doesn’t exist. It might have been moved
            or deleted.
          </p>
          <Button variant="secondary" href="/" size="md" className="mt-3">
            Back to Home
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;
