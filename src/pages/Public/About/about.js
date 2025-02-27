import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import mission from "../../../assets/images/About/mission.png";
import vission from "../../../assets/images/About/vission.png";
import vector from "../../../assets/images/About/Vector.svg";
import marketIcon from "../../../assets/images/About/healthicons_market-stall.svg";
import jobSearchIcon from "../../../assets/images/About/hugeicons_job-search.svg";
import teacherIcon from "../../../assets/images/About/hugeicons_teacher.svg";
import helpIcon from "../../../assets/images/About/material-symbols_help-outline-rounded.svg";
import informationIcon from "../../../assets/images/About/streamline_information-desk-customer.svg";
import HandleImages from "../../../components/Custom/Avatars/HandleImages";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const About = () => {
  const { userAuth } = useSelector((state) => state?.authentication);

  return (
    <>
      <Container fluid>
        <Container>
          <Row className="justify-content-center align-items-center py-5">
            <Col
              xl={6}
              lg={6}
              md={6}
              sm={12}
              xs={12}
              className="text-center text-lg-start mb-4 mb-lg-0"
            >
              <div>
                <h1 className="fw-bold">Our Vision</h1>
                <p className="fs-5 mt-3 text-responsive-paragraph">
                  Our purpose at Tech Valet is to empower individuals by
                  offering great online services that improve their lives and
                  allow them to succeed in the digital age.
                </p>
                <p className="fs-5 mt-3">
                  We are dedicated to providing creative solutions that meet
                  customers specific requirements, making their online
                  experiences smooth, convenient, and pleasurable.
                </p>
              </div>
            </Col>

            <Col xl={6} lg={6} md={6} sm={12} xs={12} className="text-center">
              <HandleImages
                imagePath={vission}
                imageAlt="Our Vission"
                imageStyle={{
                  width: "400px",
                  height: "auto",
                }}
                className="img-fluid rounded"
              />
            </Col>
          </Row>
        </Container>
      </Container>

      <Container
        fluid
        style={{
          backgroundColor: "#F9FFF8",
        }}
      >
        <Container>
          <Row className="justify-content-center align-items-center py-5">
            <Col xl={6} lg={6} md={12} sm={12} className="py-5">
              <HandleImages
                imagePath={mission}
                imageAlt="Our Mission"
                imageStyle={{
                  width: "400px",
                  height: "auto",
                }}
                className="img-fluid rounded"
              />
            </Col>

            <Col
              xl={6}
              lg={6}
              md={6}
              sm={12}
              xs={12}
              className="text-center text-lg-start mb-4 mb-lg-0"
            >
              <div>
                <h1 className="fw-bold">Our Mission</h1>
                <p className="fs-5 mt-3 text-responsive-paragraph">
                  Our mission is to improve people's lives by providing
                  revolutionary online services that enable them to achieve
                  their goals and live fulfilling digital lives.
                </p>
                <p className="fs-5 mt-3">
                  We are committed to delivering solutions that not only address
                  immediate requirements but also inspire personal development,
                  career development, and general well-being.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </Container>

      <Container fluid className="py-5">
        <Container
          className=""
          style={{
            padding: "100px 0px",
          }}
        >
          <Row className="align-items-center">
            <Col
              xl={12}
              lg={12}
              md={12}
              sm={12}
              xs={12}
              className="text-center"
            >
              <h1 className="fw-bold">
                Comprehensive range of services
                <br /> and commitment to quality
              </h1>
              <Button
                variant="secondary-secondary"
                className="circle mt-3"
                as={NavLink}
                to={"/login"}
              >
                {`${!userAuth ? "Need" : "Offer"} Service`}
              </Button>
            </Col>
          </Row>
        </Container>
      </Container>

      <Container
        fluid
        className="py-5 mb-5"
        style={{
          backgroundColor: "#F9FFF8",
        }}
      >
        <Container>
          <Row>
            <Col
              xl={{ span: 6, offset: 3 }}
              lg={{ span: 6, offset: 3 }}
              md={{ span: 6, offset: 3 }}
              sm={12}
              xs={12}
              className="text-center"
            >
              <h1 className="fw-bold ">What We Provide?</h1>
              <p className="text-dark mt-2">
                Discover a world of convenience with our services, which provide
                seamless solutions adapted to your specific need.
              </p>
            </Col>
          </Row>
          <Row className="gy-4">
            {/* Service Item 1 */}
            <Col
              xl={6}
              lg={6}
              md={6}
              sm={12}
              xs={12}
              className="d-flex"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <Card className="p-3">
                <Card.Body>
                  <div className="d-flex align-items-center">
                    <div>
                      <img
                        src={vector}
                        className="img-fluid"
                        style={{
                          width: "40px",
                          height: "40px",
                        }}
                        alt="tech-valet"
                      />
                    </div>
                    <div className="ms-3">
                      <h4 className=" fw-bold">Transforming Lives</h4>
                    </div>
                  </div>
                  <p className="text-dark fs-5 mt-3">
                    Where we are committed to changing people's lives with our
                    extensive suite of online offerings. We recognize the power
                    of technology and its ability to effect positive change. We
                    seek to empower individuals, businesses, and communities by
                    giving them with the tools they need to prosper in today's
                    digital environment through our innovative solutions.
                  </p>
                </Card.Body>
              </Card>
            </Col>

            <Col
              xl={6}
              lg={6}
              md={6}
              sm={12}
              xs={12}
              className="d-flex"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <Card className="p-3">
                <Card.Body>
                  <div className="d-flex align-items-center">
                    <div>
                      <img
                        src={informationIcon}
                        className="img-fluid"
                        style={{
                          width: "40px",
                          height: "40px",
                        }}
                        alt="tech-valet"
                      />
                    </div>
                    <div className="ms-3">
                      <h4 className=" fw-bold">Our Customers</h4>
                    </div>
                  </div>
                  <p className="text-dark fs-5">
                    Where we are committed to changing people's lives with our
                    extensive suite of online offerings. We recognize the power
                    of technology and its ability to effect positive change. We
                    seek to empower individuals, businesses, and communities by
                    giving them with the tools they need to prosper in today's
                    digital environment through our innovative solutions.
                  </p>
                </Card.Body>
              </Card>
            </Col>

            <Col
              xl={6}
              lg={6}
              md={6}
              sm={12}
              xs={12}
              className="d-flex"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <Card className="p-3">
                <Card.Body>
                  <div className="d-flex align-items-center">
                    <div>
                      <img
                        src={marketIcon}
                        className="img-fluid"
                        style={{
                          width: "40px",
                          height: "40px",
                        }}
                        alt="tech-valet"
                      />
                    </div>
                    <div className="ms-3">
                      <h4 className=" fw-bold">Our Marketplace</h4>
                    </div>
                  </div>
                  <p className="text-dark fs-5">
                    Where we are committed to changing people's lives with our
                    extensive suite of online offerings. We recognize the power
                    of technology and its ability to effect positive change. We
                    seek to empower individuals, businesses, and communities by
                    giving them with the tools they need to prosper in today's
                    digital environment through our innovative solutions.
                  </p>
                </Card.Body>
              </Card>
            </Col>

            <Col
              xl={6}
              lg={6}
              md={6}
              sm={12}
              xs={12}
              className="d-flex"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <Card className="p-3">
                <Card.Body>
                  <div className="d-flex align-items-center">
                    <div>
                      <img
                        src={teacherIcon}
                        className="img-fluid"
                        style={{
                          width: "40px",
                          height: "40px",
                        }}
                        alt="tech-valet"
                      />
                    </div>
                    <div className="ms-3">
                      <h4 className=" fw-bold">Our Instructors</h4>
                    </div>
                  </div>
                  <p className="text-dark fs-5">
                    Where we are committed to changing people's lives with our
                    extensive suite of online offerings. We recognize the power
                    of technology and its ability to effect positive change. We
                    seek to empower individuals, businesses, and communities by
                    giving them with the tools they need to prosper in today's
                    digital environment through our innovative solutions.
                  </p>
                </Card.Body>
              </Card>
            </Col>

            <Col
              xl={6}
              lg={6}
              md={6}
              sm={12}
              xs={12}
              className="d-flex"
              data-aos="fade-up"
              data-aos-delay="500"
            >
              <Card className="p-3">
                <Card.Body>
                  <div className="d-flex align-items-center">
                    <div>
                      <img
                        src={jobSearchIcon}
                        className="img-fluid"
                        style={{
                          width: "40px",
                          height: "40px",
                        }}
                        alt="tech-valet"
                      />
                    </div>
                    <div className="ms-3">
                      <h4 className=" fw-bold">Jobs</h4>
                    </div>
                  </div>
                  <p className="text-dark fs-5">
                    Where we are committed to changing people's lives with our
                    extensive suite of online offerings. We recognize the power
                    of technology and its ability to effect positive change. We
                    seek to empower individuals, businesses, and communities by
                    giving them with the tools they need to prosper in today's
                    digital environment through our innovative solutions.
                  </p>
                </Card.Body>
              </Card>
            </Col>

            <Col
              xl={6}
              lg={6}
              md={6}
              sm={12}
              xs={12}
              className="d-flex"
              data-aos="fade-up"
              data-aos-delay="600"
            >
              <Card className="p-3">
                <Card.Body>
                  <div className="d-flex align-items-center">
                    <div>
                      <img
                        src={helpIcon}
                        className="img-fluid"
                        style={{
                          width: "40px",
                          height: "40px",
                        }}
                        alt="tech-valet"
                      />
                    </div>
                    <div className="ms-3">
                      <h4 className=" fw-bold">Help</h4>
                    </div>
                  </div>
                  <p className="text-dark fs-5">
                    Where we are committed to changing people's lives with our
                    extensive suite of online offerings. We recognize the power
                    of technology and its ability to effect positive change. We
                    seek to empower individuals, businesses, and communities by
                    giving them with the tools they need to prosper in today's
                    digital environment through our innovative solutions.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
};

export default About;
