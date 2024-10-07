import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Footer from "../../../components/Client/Footer/footer";
import WelcomeHeader from "../../../components/Client/Navbar/welcomeHeader";
import ClientTopbar from "../../../components/Client/Navbar/Topbar/clientTopbar";
import WelcomeFooter from "../../../components/Client/Footer/welcomeFooter";

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
            "https://wallpapersmug.com/download/1920x1080/abfc00/vector-design-retro-4k.jpg"
          )`,
        }}
      >
        <Container>
          {/* <Row className="gy-4">
            <Col
              lg={6}
              className="d-flex flex-column justify-content-center order-lg-1"
              data-aos="zoom-out"
            >
              <h1>Better Solutions For Your Business</h1>
              <p>
                We are a team of talented designers making websites with
                Bootstrap
              </p>
              <div className="d-flex">
                <Button href="#about" className="btn-get-started me-3">
                  Get Started
                </Button>
                <a
                  href="https://www.youtube.com/watch?v=Y7f98aduVJ8"
                  className="glightbox btn-watch-video d-flex align-items-center"
                >
                  <i className="bi bi-play-circle me-2"></i>
                  <span>Watch Video</span>
                </a>
              </div>
            </Col>

            <Col
              lg={6}
              className="hero-img order-lg-2"
              data-aos="zoom-out"
              data-aos-delay="200"
            >
              <img
                src="assets/img/hero-img.png"
                className="img-fluid animated"
                alt="Hero"
              />
            </Col>
          </Row> */}
          <Row className="gy-4">
            <Col
              className="text-center "
              data-aos="zoom-out"
              data-aos-delay="200"
            >
              <img
                src="https://wallpapersmug.com/download/1920x1080/abfc00/vector-design-retro-4k.jpg"
                className="img-fluid animated"
                style={{
                  width: "200px",
                  height: "200px",
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
