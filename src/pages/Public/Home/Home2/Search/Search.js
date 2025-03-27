import "./style.css";
import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Keywords from "../SearchBar/Keywords";
import SearchBar from "../SearchBar/SearchBar";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import HandleImages from "../../../../../components/Custom/Avatars/HandleImages";

const SearchSection = () => {
  const { userAuth } = useSelector((state) => state.authentication);
  return (
    <>
      <section className="bg-white py-5">
        <Container>
          <Row>
            {/* Text Section */}
            <Col xl={6} lg={6} md={12} sm={12} xs={12}>
              <Card className="border-0">
                <Card.Body
                  style={{
                    padding: "20px 30px",
                    backgroundColor: "#fcd609",
                    borderRadius: "20px",
                    boxShadow: "5px 5px 15px #999",
                  }}
                  data-aos="fade-up"
                  data-aos-delay="100"
                >
                  <h1 className="fw-bold headline">
                    Find The Perfect Freelance Services For Your Business
                  </h1>
                </Card.Body>

                <Card.Body className="pb-0">
                  <p className="fs-5">
                    Millions of individuals utilize IT Valet to help them with
                    all they need to make their ideas a reality.
                  </p>
                </Card.Body>

                <Card.Body data-aos="fade-up" data-aos-delay="200">
                  {userAuth && userAuth.role === "Customer" && (
                    <>
                      <Container className="p-0 justify-content-center">
                        <SearchBar
                          parentClass=""
                          boxClass="me-3"
                          boxStyle={{
                            boxShadow: "5px 5px 15px #999",
                            fontSize: "18px",
                            padding: "14px",
                          }}
                          buttonClass=""
                          buttonStyle={{
                            boxShadow: "5px 5px 15px #999",
                            width: "100px",
                            borderColor: "#999",
                          }}
                        />
                        <Keywords />
                      </Container>
                    </>
                  )}
                </Card.Body>
              </Card>
            </Col>

            <Col xl={3} lg={3} md={12} sm={12} xs={12} className="text-center">
              <Card className="custom-card dark py-4 px-2 shadow">
                <Card.Body className="justify-content-center custom-header-cards">
                  <HandleImages
                    imagePath={
                      "https://techvalet.ca/frontAssets/images/CustomImages/1.png"
                    }
                    imageAlt={`${"Need Service?"}` || ""}
                    imageStyle={{}}
                  />
                  <Card.Title className="text-white">Need Service?</Card.Title>
                  <Card.Text className="text-white">
                    An IT Valet Service Provider who’s already in your area will
                    complete your job at transparent rates you can feel good
                    about.
                  </Card.Text>
                  <Button
                    href={"/register/customer"}
                    className="btn-primary-secondary"
                  >
                    Get Started
                  </Button>
                  {!userAuth && (
                    <div className="mb-0 mt-3 text-white d-flex justify-content-center">
                      Already a member?
                      <NavLink to="/login">
                        <u className="text-white mx-1">
                          <b>Login</b>
                        </u>
                      </NavLink>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Col>

            <Col xl={3} lg={3} md={12} sm={12} xs={12} className="text-center">
              <Card className="custom-card primary py-4 px-2 shadow">
                <Card.Body className="justify-content-center custom-header-cards">
                  <HandleImages
                    imagePath={
                      "https://techvalet.ca/frontAssets/images/CustomImages/2 (1).png"
                    }
                    imageAlt={`${"Need Service?"}` || ""}
                    imageStyle={{}}
                  />
                  <Card.Title className="text-black">
                    Offering Service?
                  </Card.Title>
                  <Card.Text className="text-black">
                    Tech Valet connects with top quality service professionals
                    in real-time. Tech Valet team handles all the details of
                    each job.
                  </Card.Text>
                  <NavLink to={"/register/valet"}>
                    <Button className="btn-secondary-secondary">Join Us</Button>
                  </NavLink>
                  {!userAuth && (
                    <div className="mb-0 mt-3 text-black d-flex justify-content-center">
                      Already a member?
                      <NavLink to="/login">
                        <u className="text-black mx-1">
                          <b>Login</b>
                        </u>
                      </NavLink>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default SearchSection;
