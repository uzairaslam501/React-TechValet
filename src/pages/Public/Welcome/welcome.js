import "./style.css";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import background from "../../../assets/images/header-image.png";
import joinMeeting from "../../../assets/images/icons/join-meeting.svg";
import whatWeDoImage from "../../../assets/images/what-we-do-image.svg";
import createAccount from "../../../assets/images/icons/create-your-account.svg";
import makeAppointment from "../../../assets/images/icons/make-an-appointment.svg";
import { useDispatch, useSelector } from "react-redux";
import { getBlogsList } from "../../../redux/Actions/seoActions";
import BlogSlider from "../../../components/Custom/BlogSlider/BlogSlider";
import { NavLink } from "react-router-dom";

const Welcome = () => {
  const dispatch = useDispatch();
  const [isLoading, setLoader] = useState(false);
  const [recentPosts, setRecentPosts] = useState(null);
  const { userAuth } = useSelector((state) => state?.authentication);

  const fetchPosts = (pageNumber = 0, pageLength = 9) => {
    const params = {
      pageNumber,
      pageLength,
      sortColumn: "publishedDate",
      sortDirection: "desc",
      searchParam: "",
    };
    setLoader(true);
    dispatch(getBlogsList(params))
      .then((response) => {
        console.log(response?.payload);
        const posts = response?.payload?.data || [];
        setRecentPosts(posts);
        setLoader(false);
      })
      .catch((err) => {
        console.error("Error fetching profiles:", err);
        setLoader(false);
      });
  };

  useEffect(() => {
    fetchPosts();
  }, [dispatch]);

  return (
    <>
      <Container fluid style={{ backgroundColor: "#fcd609" }} className="pt-5">
        <Container className="">
          <Row className="align-items-center">
            {/* Text Column */}
            <Col
              xl={6}
              lg={6}
              md={12}
              sm={12}
              className="text-center text-lg-start mb-4 mb-lg-0"
            >
              <div>
                <h4 className="text-responsive text-uppercase">Who We Are</h4>
                <h1 className="text-responsive-heading">
                  Community-Driven Tech Assistance
                </h1>
                <p className="fs-3 mt-3 text-responsive-paragraph">
                  We are a community of people who have IT know-how with
                  computers, smartphones and other devices - and we’re here to
                  help.
                </p>
                {!userAuth && (
                  <div className="mt-4 d-flex">
                    <Button
                      as={NavLink}
                      to={"/register/customer"}
                      variant="secondary"
                      size="md"
                      className="border-1 border-dark me-3 px-4 py-2 mb-3"
                    >
                      Need Service
                    </Button>
                    <Button
                      as={NavLink}
                      to={"/register/valet"}
                      variant="primary"
                      size="md"
                      className="border-1 border-dark px-4 py-2 mb-3"
                    >
                      Offering Service
                    </Button>
                  </div>
                )}
              </div>
            </Col>

            {/* Image Column */}
            <Col xl={6} lg={6} md={12} sm={12} className="text-end">
              <img
                src={background}
                alt="Community Assistance"
                className="img-fluid"
              />
            </Col>
          </Row>
        </Container>
      </Container>

      {/* How Does It Work */}

      <Container className="py-5">
        <Row>
          {/* Text Column */}
          <Col xl={12} lg={12} md={12} sm={12} xs={12} className="">
            <h2 className="text-center fw-bold text-responsive-heading text-uppercase">
              How Does It Work
            </h2>
            <p className="text-center mt-3 text-black text-responsive-paragraph">
              We have a valet to walk you through it in 3-Easy-Steps
            </p>
          </Col>

          <Col
            style={{
              backgroundColor: "#000000",
              borderRadius: "15px",
              zIndex: 9,
            }}
            xl={{ span: 10, offset: 1 }}
            lg={{ span: 10, offset: 1 }}
            md={{ span: 10, offset: 1 }}
            sm={{ span: 10, offset: 1 }}
            xs={{ span: 10, offset: 1 }}
            className="text-center text-lg-start mb-4 mb-lg-0"
          >
            <Row className="py-5 text-center">
              <Col
                xl={4}
                lg={4}
                md={4}
                sm={12}
                xs={12}
                className="py-2"
                style={{ borderRight: "solid 1px #565252" }}
              >
                <img
                  src={createAccount}
                  alt="account-icon"
                  className="img-fluid"
                />
                <h5 className="text-white pt-3">Create your Account</h5>
              </Col>
              <Col
                xl={4}
                lg={4}
                md={4}
                sm={12}
                xs={12}
                className="py-2"
                style={{ borderRight: "solid 1px #565252" }}
              >
                <img
                  src={makeAppointment}
                  alt="appointment-icon"
                  className="img-fluid"
                />
                <h5 className="text-white pt-3">Make an Appointment</h5>
              </Col>
              <Col xl={4} lg={4} md={4} sm={12} xs={12} className="py-2">
                <img
                  src={joinMeeting}
                  alt="appointment-icon"
                  className="img-fluid"
                />
                <h5 className="text-white pt-3">Join the Meeting</h5>
              </Col>
            </Row>
          </Col>

          <Col
            xl={12}
            lg={12}
            md={12}
            sm={12}
            xs={12}
            className="p-5 custom-margin"
            style={{ backgroundColor: "#f3f3f3", borderRadius: "25px" }}
          >
            <Row className="m-0 custom-padding">
              <Col
                xl={{ span: 10, offset: 1 }}
                lg={{ span: 10, offset: 1 }}
                md={{ span: 10, offset: 1 }}
                sm={{ span: 12 }}
                xs={{ span: 12 }}
              >
                <h4
                  className="text-center"
                  style={{
                    color: "#B51D1D",
                  }}
                >
                  <i>
                    <span className="fs-1">*</span> At the end of the
                    appointment, our Valets will provide you with a 1-page
                    overview of the solution, so you can use it any time you run
                    into the same roadblock in the future!
                  </i>
                </h4>

                <Container className="pt-5">
                  <Row className="justify-content-center align-items-center">
                    <Col xl={6} lg={6} md={6} sm={12} xs={12}>
                      <h1 className="fw-bold mb-3 text-uppercase">
                        What we Do
                      </h1>
                      <p className="mt-2 text-dark text-responsive-paragraph fs-3 fw-normal">
                        We connect you with people who are IT savvy, so they can
                        help you solve your tech headaches, quickly, at an
                        affordable price, and at a time that's convenient for
                        you.
                      </p>

                      <Button
                        as={NavLink}
                        className="mt-3 mb-3 btn-white-secondary"
                        size="lg"
                        to={"/login"}
                      >
                        Get Started <span className="bi bi-arrow-right"></span>
                      </Button>
                    </Col>

                    <Col
                      xl={6}
                      lg={6}
                      md={6}
                      sm={12}
                      xs={12}
                      className="text-center"
                    >
                      <img
                        src={whatWeDoImage}
                        alt="what-we-do-image"
                        className="img-fluid w-100"
                      />
                    </Col>
                  </Row>
                </Container>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>

      <Container className="pb-5">
        <Row>
          <Col xl={12} lg={12} md={12} sm={12} xs={12}>
            {!isLoading ? (
              recentPosts &&
              recentPosts.length > 0 && (
                <>
                  <div className="d-flex align-items-center">
                    <span
                      style={{
                        border: "10px solid #fcd609",
                        borderRadius: "50px",
                      }}
                    ></span>
                    <h2 className="ps-2 mb-0">Recent Posts</h2>
                  </div>
                  <BlogSlider articles={recentPosts} />
                </>
              )
            ) : (
              <div className="text-center">
                <Spinner animation="border" />
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Welcome;
