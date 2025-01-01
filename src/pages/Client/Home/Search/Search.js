import "./style.css";
import React from "react";
import { useSelector } from "react-redux";
import SearchBar from "./SearchBar/SearchBar";
import { Container, Row, Col, Card } from "react-bootstrap";
import CustomCard from "../../../../components/Custom/Cards/CustomCard";
import Keywords from "./SearchBar/Keywords";

const SearchSection = () => {
  const { userAuth } = useSelector((state) => state.authentication);
  return (
    <>
      <section
        className="section"
        style={{
          backgroundColor: "#fff",
        }}
      >
        <Container>
          <Row className="d-flex justify-content-center">
            {/* Text Section */}
            <Col xl={6} className="text-center text-xl-start">
              <Card
                className="shadow py-5"
                style={{
                  backgroundColor: "#fcd609",
                  borderRadius: "20px",
                }}
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <h1 className="px-3">
                  Find The Perfect Freelance Services For Your Business
                </h1>
              </Card>
              <Card
                style={{
                  backgroundColor: "#fff",
                  boxShadow: "none",
                }}
                className="border-0"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <p
                  className="px-1"
                  style={{
                    fontSize: "20px",
                  }}
                >
                  Millions of individuals utilize IT Valet to help them with all
                  they need to make their ideas a reality.
                </p>
                {userAuth && userAuth.role === "Customer" && (
                  <>
                    <Container className="p-0">
                      <SearchBar
                        parentClass=""
                        boxClass="py-2 me-3"
                        boxStyle={{
                          boxShadow: "5px 5px 15px #999",
                          fontSize: "22px",
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
              </Card>
            </Col>

            <Col xl={3} className="text-center">
              <CustomCard
                imageSrc="https://techvalet.ca/frontAssets/images/CustomImages/1.png"
                cardTitle="Need Service?"
                cardText="An IT Valet Service Provider who’s already in your area will
                  complete your job at transparent rates you can feel good about."
                cardClass="custom-card dark py-4 shadow"
                buttonText="Get Started"
                buttonLink="/Auth/Register?value=Customer"
                buttonClass="btn-primary-secondary"
                titleClass="text-white"
                textClass="text-white"
                animationEffect="zoom-out-left"
                animationEffectDelay="300"
              >
                {!userAuth ? (
                  <p className="mb-0 mt-3 text-white">
                    Already a member?
                    <a href="/login">
                      <u className="text-white">
                        <b>Login</b>
                      </u>
                    </a>
                  </p>
                ) : (
                  <p className="mb-0 mt-3 text-white"> &nbsp;</p>
                )}
              </CustomCard>
            </Col>

            <Col xl={3} className="text-center">
              <CustomCard
                imageSrc="https://techvalet.ca/frontAssets/images/CustomImages/2 (1).png"
                cardTitle="Need Service?"
                cardText="An IT Valet Service Provider who’s already in your area will
                  complete your job at transparent rates you can feel good about."
                cardClass="custom-card primary py-4 shadow"
                buttonText="Get Started"
                buttonLink="/Auth/Register?value=Customer"
                buttonClass="btn-secondary-secondary"
                titleClass="text-black"
                textClass="text-black"
                animationEffect="zoom-out-left"
                animationEffectDelay="350"
              >
                {!userAuth ? (
                  <p className="mb-0 mt-3 text-white">
                    Already a member?
                    <a href="/login">
                      <u className="text-white">
                        <b>Login</b>
                      </u>
                    </a>
                  </p>
                ) : (
                  <p className="mb-0 mt-3 text-white"> &nbsp;</p>
                )}
              </CustomCard>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default SearchSection;
