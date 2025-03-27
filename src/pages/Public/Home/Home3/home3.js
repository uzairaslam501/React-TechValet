import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import whatWeDoImage from "../../../../assets/images/welcome-bg.jpg";
import logo from "../../../../assets/images/welcome-logo.png";
import "./style.css";

const Home3 = () => {
  return (
    <div>
      {/* Header Section */}
      <div
        className="d-flex justify-content-center align-items-center position-relative text-center"
        style={{
          backgroundImage: `url(${whatWeDoImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "90vh",
          width: "100%",
        }}
      >
        <div className="header-overlay w-100 d-flex justify-content-center align-items-center bg-opacity-50 p-4">
          <img
            src={logo}
            alt="TechValet Logo"
            className="img-fluid"
            style={{
              maxWidth: "80%",
              maxHeight: "70vh",
            }}
          />
        </div>
      </div>

      {/* At Your Service Section */}
      <Container
        fluid
        className="text-end text-white py-4 px-5"
        style={{
          background: "#fcd609",
        }}
      >
        <h3 className="fw-bold text-dark">
          <i>At your service ____</i>
        </h3>
      </Container>

      {/* Who We Are & What We Do */}
      <Container className="my-5">
        <Row className="row py-4">
          <Col md={6} className="border-end text-center p-4">
            <h2
              className="fw-semibold text-dark"
              style={{
                fontSize: "50px",
              }}
            >
              Who We Are
            </h2>
            <img
              src="/FrontAssets/images/Logo Web Black svg.svg"
              className="w-25 mb-3"
              alt="Logo"
            />
            <p
              className="text-start  text-dark"
              style={{
                fontSize: "36px",
              }}
            >
              We are a community of people who have IT know-how — with
              computers, smartphones and other devices — and we’re here to help
            </p>
          </Col>
          <Col md={6} className="text-center p-4">
            <h1
              className="fw-semibold text-dark"
              style={{
                fontSize: "50px",
              }}
            >
              What We Do
            </h1>
            <img
              src="/FrontAssets/images/Logo Web Black svg.svg"
              className="w-25 mb-3"
              alt="Logo"
            />
            <p
              className="text-start  text-dark"
              style={{
                fontSize: "36px",
              }}
            >
              We connect you with people who are IT savvy, so they can help you
              solve your tech headaches, quickly, at an affordable price, and at
              a time that’s convenient for you
            </p>
          </Col>
        </Row>
      </Container>

      <div class="howitworks">How Does It work</div>
      <div class="container">
        <div class="cstmtext text-dark">
          We know that lots of smart people can’t keep up with the technology
          learning curve, so we formed a community of tech savvy people who can
          help solve a variety of problems the moment you need them. From
          getting your new printer to print to how to manage a group video call
          with the family to how to set up a local network for your home once —
          We have a Valet to walk you through it in 3-Easy-Steps.
          <div class="steps-container">
            <div class="step">
              <span class="step-number">1</span>
              <p>
                <span className="text-bold">
                  Click here to create your account{" "}
                </span>
                it’s also easy and you only have to do it once!
              </p>
            </div>
            <div class="step">
              <span class="step-number">2</span>
              <p>
                <span className="text-bold">Make an appointment</span> to meet
                (online) with a Valet one-on-one, for a time that works best for
                you.
              </p>
            </div>
            <div class="step">
              <span class="step-number">3</span>
              <p>
                <span className="text-bold">
                  Click the link to join the meeting
                </span>{" "}
                and the Valet will help you solve your tech problem. You pay a
                pre-specified amount for the time it will take to solve the
                question you have.
              </p>
            </div>

            <p class="note">
              At the end of the appointment, our Valets will provide you with a
              1-page overview of the solution, so you can use it any time you
              run into the same roadblock in the future!
            </p>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      {/* <footer className="bg-dark text-white text-center py-3">
        <p className="mb-0">
          &copy; {new Date().getFullYear()} TechValet. All rights reserved.
        </p>
      </footer> */}
    </div>
  );
};

export default Home3;
