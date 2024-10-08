import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import WelcomeHeader from "../../../components/Client/Navbar/welcomeHeader";
import WelcomeFooter from "../../../components/Client/Footer/welcomeFooter";
import background from "../../../assets/images/welcome-bg.jpg";
import logo from "../../../assets/images/welcome-logo.png";
const Welcome = () => {
  return (
    <>
      <WelcomeHeader />
      <section
        id="hero"
        className="hero section dark-background"
        style={{
          height: "90vh",
          backgroundPosition: "center center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundImage: `
          linear-gradient(
            to bottom right, 
            rgba(0, 0, 0, 0.6),        /* #000000 */
            rgba(0, 0, 0, 0.6)   /* #999999 */
        ),
        url(
            ${background}
          )`,
        }}
      >
        <Container>
          <Row className="gy-4">
            <Col
              className="text-center "
              data-aos="zoom-out"
              data-aos-delay="200"
            >
              <img
                src={logo}
                className="img-fluid animated"
                style={{
                  width: "400px",
                  height: "400px",
                }}
              />
            </Col>
          </Row>
        </Container>
      </section>
      <WelcomeFooter />
    </>
  );
};

export default Welcome;
