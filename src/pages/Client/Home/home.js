import React from "react";
import { Button, Col, Container, Row, Card } from "react-bootstrap";
import logo from "../../../assets/images/welcome-logo.png";

const Home = () => {
  return (
    <>
      <section
        id="call-to-action"
        className="call-to-action section"
        style={{ background: "#9b9b9b" }}
      >
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
            </Col>

            {/* Button Section */}
            <Col xl={3} className="text-center">
              <Card className="">
                <Card.Body>
                  <img src="" />

                  {/* Card Title */}
                  <Card.Title>Need Service?</Card.Title>

                  {/* Card Text */}
                  <Card.Text>
                    An IT Valet Service Provider who’s already in your area will
                    complete your job at transparent rates you can feel good
                    about.
                  </Card.Text>

                  {/* Get Started Button */}
                  <Button
                    href="/Auth/Register?value=Customer"
                    variant="success"
                  >
                    Get Started
                  </Button>

                  {/* Login Link */}
                  <p className="mb-0 mt-3">
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
              <Card className="">
                <Card.Body>
                  <img src="" />
                  <Card.Title>Need Service?</Card.Title>
                  <Card.Text>
                    An IT Valet Service Provider who’s already in your area will
                    complete your job at transparent rates you can feel good
                    about.
                  </Card.Text>

                  {/* Get Started Button */}
                  <Button
                    href="/Auth/Register?value=Customer"
                    variant="success"
                  >
                    Get Started
                  </Button>

                  {/* Login Link */}
                  <p className="mb-0 mt-3">
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

export default Home;
