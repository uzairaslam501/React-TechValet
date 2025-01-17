import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import WelcomeHeader from "../../../components/Client/Navbar/welcomeHeader";
import WelcomeFooter from "../../../components/Client/Footer/welcomeFooter";
import background from "../../../assets/images/header-image.png";
import logo from "../../../assets/images/welcome-logo.png";
const Welcome = () => {
  return (
    <>
      <WelcomeHeader />
      <Container
        fluid
        style={{ backgroundColor: "#fcd609" }}
        className="pt-md-5 pt-sm-3"
      >
        <Container className="pt-5">
          <Row className="align-items-center pt-md-5">
            {/* Text Column */}
            <Col
              xl={6}
              lg={6}
              md={12}
              sm={12}
              className="text-center text-lg-start mb-4 mb-lg-0"
            >
              <div>
                <h4>Who We Are</h4>
                <h1
                  className="fw-bold"
                  style={{
                    fontSize: "60px",
                    lineHeight: "1.2",
                  }}
                >
                  Community-Driven Tech Assistance
                </h1>
                <p className="fs-5 mt-3">
                  We are a community of people with IT expertise in computers,
                  smartphones, and other devices. We are here to help you.
                </p>
                <div className="mt-4">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="me-3 px-4 py-2"
                  >
                    Need Service
                  </Button>
                  <Button variant="primary" size="lg" className="px-4 py-2">
                    Offering Service
                  </Button>
                </div>
              </div>
            </Col>

            {/* Image Column */}
            <Col xl={6} lg={6} md={12} sm={12} className="text-end">
              <img
                src={background}
                alt="Community Assistance"
                style={{
                  width: "100%",
                  maxWidth: "500px",
                  height: "auto",
                }}
              />
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
};

export default Welcome;
