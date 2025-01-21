import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import WelcomeHeader from "../../../components/Client/Navbar/welcomeHeader";
import background from "../../../assets/images/header-image.png";
import createAccount from "../../../assets/images/icons/create-your-account.svg";
import makeAppointment from "../../../assets/images/icons/make-an-appointment.svg";
import joinMeeting from "../../../assets/images/icons/join-meeting.svg";
import whatWeDoImage from "../../../assets/images/what-we-do-image.svg";
const Welcome = () => {
  return (
    <>
      <WelcomeHeader />
      <Container
        fluid
        style={{ backgroundColor: "#fcd609" }}
        className="pt-sm-3"
      >
        <Container className="pt-sm-5">
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
                  <Button
                    variant="primary"
                    size="lg"
                    className="border-1 border-dark px-4 py-2"
                  >
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

      {/* How Does It Work */}
      <Row style={{ position: "relative" }}>
        <Container fluid className="bg-white pt-5">
          {/* What We Do */}
          <Row
            className="mb-5 px-5"
            style={{ position: "relative", top: "25%" }}
          >
            <Container
              style={{ backgroundColor: "#f7f7f8", borderRadius: "15px" }}
            >
              <Container style={{ padding: "10rem 0 1rem 5rem" }}>
                <Row>
                  <h4 className="text-center text-danger">
                    * At the end of the appointment, our Valets will provide you
                    with a 1-page overview of the solution, so you can use it
                    any time you run into the same roadblock in the future!
                  </h4>
                </Row>

                <Row className="pt-5">
                  <Col xl={6} lg={6} md={6} sm={12}>
                    <h1 className="fw-bold mb-3" style={{ fontSize: "3rem" }}>
                      What we Do
                    </h1>
                    <h4 className="mt-5" style={{ lineHeight: "2.5rem" }}>
                      We connect you with people who are IT savvy, so they can
                      help you solve your techheadaches, quickly, at an
                      affordable price, and at a time that's convenient for you.
                    </h4>

                    <Button className="mt-5 mb-3 btn-white-secondary" size="lg">
                      Get Started <span className="bi bi-arrow-right"></span>
                    </Button>
                  </Col>

                  <Col xl={6} lg={6} md={6} sm={12} className="mb-5">
                    <img src={whatWeDoImage} alt="what-we-do-image" />
                  </Col>
                </Row>
              </Container>
            </Container>
          </Row>

          <Container style={{ position: "relative", bottom: "65%" }}>
            <Row>
              {/* Text Column */}
              <Col
                xl={12}
                lg={12}
                md={12}
                sm={12}
                className="text-center text-lg-start mb-4 mb-lg-0"
              >
                <h2
                  className="text-center fw-bold"
                  style={{
                    fontSize: "55px",
                    lineHeight: "1",
                  }}
                >
                  How Does It Work
                </h2>
                <p className="text-center mt-3 text-black">
                  We have a valet to walk you through it in 3-Easy-Steps
                </p>
              </Col>
            </Row>
            <Row className="mt-5 px-5">
              <Col
                style={{ backgroundColor: "#000000", borderRadius: "15px" }}
                xl={12}
                lg={12}
                md={12}
                sm={12}
                className="text-center text-lg-start mb-4 mb-lg-0"
              >
                <Row className="py-5 text-center">
                  <Col style={{ borderRight: "solid 1px #565252" }}>
                    <img src={createAccount} alt="account-icon" />
                    <h4 className="text-white">Create your account</h4>
                  </Col>
                  <Col style={{ borderRight: "solid 1px #565252" }}>
                    <img src={makeAppointment} alt="appointment-icon" />
                    <h4 className="text-white">Make an appointment</h4>
                  </Col>
                  <Col>
                    <img src={joinMeeting} alt="appointment-icon" />
                    <h4 className="text-white">Join the meeting</h4>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </Container>
      </Row>
    </>
  );
};

export default Welcome;
