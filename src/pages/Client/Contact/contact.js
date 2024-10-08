import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

const Contact = () => {
  return (
    <>
      <section id="contact" className="contact section">
        {/* Section Title */}
        <Container className="section-title" data-aos="fade-up">
          <h2>Contact</h2>
          <p>
            Necessitatibus eius consequatur ex aliquid fuga eum quidem sint
            consectetur velit
          </p>
        </Container>

        <Container data-aos="fade-up" data-aos-delay="100">
          <Row className="gy-4">
            <Col lg={5}>
              <div className="info-wrap">
                {/* Address */}
                <div
                  className="info-item d-flex"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  <i className="bi bi-geo-alt flex-shrink-0"></i>
                  <div>
                    <h3>Address</h3>
                    <p>A108 Adam Street, New York, NY 535022</p>
                  </div>
                </div>

                {/* Call Us */}
                <div
                  className="info-item d-flex"
                  data-aos="fade-up"
                  data-aos-delay="300"
                >
                  <i className="bi bi-telephone flex-shrink-0"></i>
                  <div>
                    <h3>Call Us</h3>
                    <p>+1 5589 55488 55</p>
                  </div>
                </div>

                {/* Email Us */}
                <div
                  className="info-item d-flex"
                  data-aos="fade-up"
                  data-aos-delay="400"
                >
                  <i className="bi bi-envelope flex-shrink-0"></i>
                  <div>
                    <h3>Email Us</h3>
                    <p>info@example.com</p>
                  </div>
                </div>

                {/* Google Map */}
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d48389.78314118045!2d-74.006138!3d40.710059!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a22a3bda30d%3A0xb89d1fe6bc499443!2sDowntown%20Conference%20Center!5e0!3m2!1sen!2sus!4v1676961268712!5m2!1sen!2sus"
                  frameBorder="0"
                  style={{ border: 0, width: "100%", height: "270px" }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </Col>

            {/* Contact Form */}
            <Col lg={7}>
              <Form
                action="forms/contact.php"
                method="post"
                className="php-email-form"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <Row className="gy-4">
                  <Col md={6}>
                    <Form.Group controlId="name-field" className="pb-2">
                      <Form.Label>Your Name</Form.Label>
                      <Form.Control type="text" name="name" required />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group controlId="email-field" className="pb-2">
                      <Form.Label>Your Email</Form.Label>
                      <Form.Control type="email" name="email" required />
                    </Form.Group>
                  </Col>

                  <Col md={12}>
                    <Form.Group controlId="subject-field" className="pb-2">
                      <Form.Label>Subject</Form.Label>
                      <Form.Control type="text" name="subject" required />
                    </Form.Group>
                  </Col>

                  <Col md={12}>
                    <Form.Group controlId="message-field" className="pb-2">
                      <Form.Label>Message</Form.Label>
                      <Form.Control
                        as="textarea"
                        name="message"
                        rows={10}
                        required
                      />
                    </Form.Group>
                  </Col>

                  <Col md={12} className="text-center">
                    <div className="loading">Loading</div>
                    <div className="error-message"></div>
                    <div className="sent-message">
                      Your message has been sent. Thank you!
                    </div>
                    <Button type="submit">Send Message</Button>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Contact;
