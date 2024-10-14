import React, { useState } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import "./headerSection.css";
import { useSelector } from "react-redux";
import SearchFilter from "../Section1/searchFilter";

const HeaderSection = () => {
  const { userAuth, loading, error } = useSelector(
    (state) => state.authentication
  );
  return (
    <>
      <section className="section">
        <Container>
          <Row
            data-aos="zoom-in"
            data-aos-delay="100"
            className="aos-init aos-animate d-flex align-items-center justify-content-center"
          >
            {/* Text Section */}
            <Col xl={6} className="text-center text-xl-start">
              <h1>Find The Perfect Freelance Services For Your Business</h1>
              <p>
                Millions of individuals utilize IT Valet to help them with all
                they need to make their ideas a reality.
              </p>
              {userAuth && userAuth.role === "Customer" && <SearchFilter />}
            </Col>

            <Col xl={3} className="text-center">
              <Card className="card-shadow custom-card">
                <Card.Body>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src="http://nodlayslahore-001-site50.atempurl.com/frontAssets/images/CustomImages/1.png"
                      className="img-fluid"
                      style={{
                        width: "100px",
                        height: "100px",
                      }}
                    />
                  </div>

                  <Card.Title className="text-white">Need Service?</Card.Title>

                  <Card.Text className="text-white">
                    An IT Valet Service Provider who’s already in your area will
                    complete your job at transparent rates you can feel good
                    about.
                  </Card.Text>

                  <Button
                    href="/Auth/Register?value=Customer"
                    className="custom-button"
                  >
                    Get Started
                  </Button>

                  <p className="mb-0 mt-3 text-white">
                    Already a member?{" "}
                    <a href="/Auth/UserLogin">
                      <u className="text-white">
                        <b>Login</b>
                      </u>
                    </a>
                  </p>
                </Card.Body>
              </Card>
            </Col>

            <Col xl={3} className="text-center">
              <Card className="card-shadow custom-card">
                <Card.Body>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src="http://nodlayslahore-001-site50.atempurl.com/frontAssets/images/CustomImages/2.png"
                      className="img-fluid"
                      style={{
                        width: "100px",
                        height: "100px",
                      }}
                    />
                  </div>
                  <Card.Title className="text-white">Need Service?</Card.Title>
                  <Card.Text className="text-white">
                    An IT Valet Service Provider who’s already in your area will
                    complete your job at transparent rates you can feel good
                    about.
                  </Card.Text>

                  <Button
                    href="/Auth/Register?value=Customer"
                    className="custom-button"
                  >
                    Get Started
                  </Button>

                  <p className="mb-0 mt-3 text-white">
                    Already a member?{" "}
                    <a href="/Auth/UserLogin">
                      <u className="text-white">
                        <b>Login</b>
                      </u>
                    </a>
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default HeaderSection;
