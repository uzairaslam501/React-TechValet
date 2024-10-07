import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const About = () => {
  return (
    <>
      <section id="about" className="about section">
        {/* Section Title */}
        <Container className="section-title" data-aos="fade-up">
          <h2>About Us</h2>
        </Container>

        <Container>
          <Row className="gy-4">
            {/* Left Column with List */}
            <Col
              lg={6}
              className="content"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <ul>
                <li>
                  <i class="bi bi-check2-circle"></i>{" "}
                  <span>
                    Ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </span>
                </li>
                <li>
                  <i className="bi bi-check2-circle"></i>{" "}
                  <span>
                    Duis aute irure dolor in reprehenderit in voluptate velit.
                  </span>
                </li>
                <li>
                  <i className="bi bi-check2-circle"></i>{" "}
                  <span>Ullamco laboris nisi ut aliquip ex ea commodo</span>
                </li>
              </ul>
            </Col>

            {/* Right Column with Read More */}
            <Col lg={6} data-aos="fade-up" data-aos-delay="200">
              <p>
                Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
                aute irure dolor in reprehenderit in voluptate velit esse cillum
                dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum.
              </p>
              <a href="#" className="read-more">
                <span>Read More</span>
                <i className="bi bi-arrow-right"></i>
              </a>
            </Col>
          </Row>
        </Container>
      </section>

      <section id="services" className="services section light-background">
        {/* Section Title */}
        <Container className="section-title" data-aos="fade-up">
          <h2>Services</h2>
          <p>
            Necessitatibus eius consequatur ex aliquid fuga eum quidem sint
            consectetur velit
          </p>
        </Container>

        <Container>
          <Row className="gy-4">
            {/* Service Item 1 */}
            <Col
              xl={3}
              md={6}
              className="d-flex"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="service-item position-relative">
                <div className="icon">
                  <i className="bi bi-activity icon"></i>
                </div>
                <h4>
                  <a href="#" className="stretched-link">
                    Lorem Ipsum
                  </a>
                </h4>
                <p>
                  Voluptatum deleniti atque corrupti quos dolores et quas
                  molestias excepturi
                </p>
              </div>
            </Col>

            {/* Service Item 2 */}
            <Col
              xl={3}
              md={6}
              className="d-flex"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="service-item position-relative">
                <div className="icon">
                  <i className="bi bi-bounding-box-circles icon"></i>
                </div>
                <h4>
                  <a href="#" className="stretched-link">
                    Sed ut perspici
                  </a>
                </h4>
                <p>
                  Duis aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore
                </p>
              </div>
            </Col>

            {/* Service Item 3 */}
            <Col
              xl={3}
              md={6}
              className="d-flex"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="service-item position-relative">
                <div className="icon">
                  <i className="bi bi-calendar4-week icon"></i>
                </div>
                <h4>
                  <a href="#" className="stretched-link">
                    Magni Dolores
                  </a>
                </h4>
                <p>
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa
                  qui officia
                </p>
              </div>
            </Col>

            {/* Service Item 4 */}
            <Col
              xl={3}
              md={6}
              className="d-flex"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <div className="service-item position-relative">
                <div className="icon">
                  <i className="bi bi-broadcast icon"></i>
                </div>
                <h4>
                  <a href="#" className="stretched-link">
                    Nemo Enim
                  </a>
                </h4>
                <p>
                  At vero eos et accusamus et iusto odio dignissimos ducimus qui
                  blanditiis
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default About;
