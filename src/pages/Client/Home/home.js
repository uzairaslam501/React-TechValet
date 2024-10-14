import React from "react";
import { Button, Col, Container, Row, Card, Image } from "react-bootstrap";
import TestimonialSlider from "../../../components/Custom/Testimonials/Testimonial";
import CustomCarousel from "../../../components/Custom/CardCarousal/cardCarousal";
import { testimonials } from "../../../utils/client/data/carousalData";
import HeaderSection from "../../../components/HomeSections/Section2/headerSection";
import ValetSliders from "../../../components/HomeSections/Section1/valetSliders";
import { useSelector } from "react-redux";

const Home = () => {
  const { userAuth } = useSelector((state) => state?.authentication);
  return (
    <>
      <HeaderSection />

      <section className="custom-section">
        <Container>
          <Row>
            <Col>
              <h2>Services</h2>
              <CustomCarousel />
            </Col>
          </Row>
        </Container>
      </section>

      {userAuth && userAuth?.role === "Customer" && (
        <section className="py-5">
          <ValetSliders />
        </section>
      )}

      <section
        className=""
        style={{
          backgroundColor: "#9b9b9b",
        }}
      >
        <Container>
          <Row>
            <Col md={{ span: 8, offset: 2 }} sm={12}>
              <TestimonialSlider testimonials={testimonials} />
            </Col>
          </Row>
        </Container>
      </section>

      <section className="section">
        <Container>
          <Row
            data-aos="zoom-in"
            data-aos-delay="100"
            className="aos-init aos-animate d-flex align-items-center justify-content-center"
          ></Row>
          <Col md={12} className="text-center text-white">
            <h2 className="text-black">
              Find Freelance Services For Your Business Today
            </h2>
            <p className="text-black">
              We've got you covered for all your business needs
            </p>
            <Button
              size="md"
              style={{
                padding: "6px 18px",
              }}
              variant="secondary"
              className="custom-button"
            >
              Get Started
            </Button>
          </Col>
        </Container>
      </section>
    </>
  );
};

export default Home;
