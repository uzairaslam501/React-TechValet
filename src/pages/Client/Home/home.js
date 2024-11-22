import React from "react";
import { Button, Col, Container, Row, Card, CardBody } from "react-bootstrap";
import TestimonialSlider from "../../../components/Custom/Testimonials/Testimonial";
import CustomCarousel from "../../../components/Custom/CardCarousal/cardCarousal";
import {
  CategoriesList,
  testimonials,
} from "../../../utils/client/data/carousalData";
import HeaderSection from "../../../components/HomeSections/Section2/headerSection";
import ValetSliders from "../../../components/HomeSections/Section1/valetSliders";
import { useSelector } from "react-redux";
import MyCalendar from "../../../components/Custom/Calendar/calender";

const Home = () => {
  const { userAuth } = useSelector((state) => state?.authentication);
  return (
    <>
      <HeaderSection />

      <section className="">
        <Container>
          <Row>
            <Col md={{ span: 10, offset: 1 }}>
              <h4 style={{ background: "#fcd609", width: "fit-content" }}>
                Popular Professional Services
              </h4>
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
          backgroundColor: "#f3f3f3",
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

      <section id="marketplace">
        <Container>
          <Row>
            {CategoriesList.map((category, index) => (
              <Col md={3} sm={6} key={index} className="my-2">
                <Card
                  className="text-center"
                  style={{
                    background: "#fcd609",
                  }}
                >
                  <Card.Img
                    variant="top"
                    src={`https://techvalet.ca/${category.src}`}
                    alt={category.alt}
                    loading="lazy"
                    style={{
                      width: "70px",
                      margin: "0 auto", // Centers the image horizontally
                      display: "block", // Ensures it behaves as a block element
                    }}
                    className="mx-auto" // Bootstrap class to center the image
                  />
                  <CardBody>{category.name}</CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section className="section" style={{ background: "#F3F3F3" }}>
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
              className="btn-primary"
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
