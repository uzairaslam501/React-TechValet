import React from "react";
import { Button, Container, Row, Col, Image } from "react-bootstrap";
import UnauthorizedImage from "../../assets/images/unauthorized.svg";

const Unauthorized = () => {
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
            src={UnauthorizedImage}
            alt="Unauthorized Access"
            fluid
            className="w-100"
          />
          <p className="lead">
            Oops! You don’t have permission to view this page. Please make sure
            you have the right credentials.
          </p>
          <Button variant="secondary" href="/" size="md" className="mt-3">
            Back to Home
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Unauthorized;
