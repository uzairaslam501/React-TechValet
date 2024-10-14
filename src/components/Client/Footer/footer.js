import React from "react";
import { Row, Col, Form, Container, Button, InputGroup } from "react-bootstrap";
import "../css/main.css";
const Footer = () => {
  return (
    <>
      <footer
        id="footer"
        className="footer"
        style={{
          borderTop: "1px solid #000",
        }}
      >
        <Container className="footer-top">
          <Row>
            <Col lg={4} md={6}>
              <h4>Contact Us</h4>
              <p>A108 Adam Street, New York, NY 535022</p>
              <p>
                <strong>Phone:</strong> +1 5589 55488 55
              </p>
              <p>
                <strong>Email:</strong> info@example.com
              </p>
            </Col>
            <Col lg={2} md={3}>
              <h4>Useful Links</h4>
              <ul className="list-unstyled">
                <li>
                  <i className="bi bi-chevron-right"></i> <a href="#">Home</a>
                </li>
                <li>
                  <i className="bi bi-chevron-right"></i>{" "}
                  <a href="#">About Us</a>
                </li>
                <li>
                  <i className="bi bi-chevron-right"></i>{" "}
                  <a href="#">Services</a>
                </li>
              </ul>
            </Col>
            <Col lg={2} md={3}>
              <h4>Our Services</h4>
              <ul className="list-unstyled">
                <li>
                  <i className="bi bi-chevron-right"></i>{" "}
                  <a href="#">Web Design</a>
                </li>
                <li>
                  <i className="bi bi-chevron-right"></i>{" "}
                  <a href="#">Marketing</a>
                </li>
              </ul>
            </Col>
            <Col lg={4} md={12}>
              <h4>Follow Us</h4>
              <p>Cras fermentum odio eu feugiat...</p>
              <div className="social-links d-flex">
                <a href="#">
                  <i className="bi bi-twitter"></i>
                </a>
                <a href="#">
                  <i className="bi bi-facebook"></i>
                </a>
                <a href="#">
                  <i className="bi bi-instagram"></i>
                </a>
                <a href="#">
                  <i className="bi bi-linkedin"></i>
                </a>
              </div>
            </Col>
          </Row>
        </Container>

        <Container className="text-center mt-4">
          <p>
            © <span>Copyright</span>{" "}
            <strong className="px-1 sitename">Arsha</strong>{" "}
            <span>All Rights Reserved</span>
          </p>
        </Container>
      </footer>
    </>
  );
};

export default Footer;
