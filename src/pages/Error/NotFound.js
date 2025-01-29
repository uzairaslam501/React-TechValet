import React from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import NotFoundImage from "../../assets/images/404.png";

const NotFound = () => {
  return (
    <Container className="d-flex flex-column justify-content-center align-items-center vh-100 text-center">
      <Row>
        <Col
          xl={{ span: 8, offset: 2 }}
          lg={{ span: 8, offset: 2 }}
          md={{ span: 8, offset: 2 }}
          sm={{ span: 12 }}
          xs={{ span: 12 }}
        >
          <img
            src={NotFoundImage}
            alt="404 Not Found"
            fluid
            className="w-100"
          />
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
