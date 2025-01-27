import React from "react";
import {
  Row,
  Col,
  Form,
  Container,
  Button,
  InputGroup,
  Nav,
} from "react-bootstrap";
import "../css/main.css";
const WelcomeFooter = () => {
  return (
    <>
      <div style={{ padding: "7px 0" }}>
        {/* <Container>
            <Row className="justify-content-center">
              <Col md={6}>
                <span>2024 © IT Valet</span>
              </Col>
              <Col md={6} className="text-end me-auto">
                <a href="#" className="text-white">
                  Privacy Policy
                </a>{" "}
                <span> | </span>
                <a href="#" className="text-white">
                  Terms of Service
                </a>{" "}
                <span> | </span>
                <a href="#" className="text-white">
                  Help & Support
                </a>
              </Col>
            </Row>
          </Container> */}
        <Container fluid>
          <Row>
            <Col className="text-end">
              <h1 style={{ color: "#000" }}>
                <i>At Your Service _____</i>
              </h1>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default WelcomeFooter;
