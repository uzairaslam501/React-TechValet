import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  OverlayTrigger,
  Row,
  Spinner,
  Tab,
  Tabs,
  Tooltip,
} from "react-bootstrap";
import Account from "./Account/account";
import { useDispatch, useSelector } from "react-redux";
import { getRecordById, putUpdate } from "../../../redux/Actions/globalActions";
import { useNavigate } from "react-router";
import UserProfileImage from "./ProfileImage/UserProfileImage";
import SkillsAndEndorsements from "./ValetProfile/Skills/SkillsAndEndorsements";
import Services from "./ValetProfile/Services/Services";
import PayPalAccount from "./ValetProfile/PayPal/PayPalAccount";
import StripeAccount from "./ValetProfile/Stripe/StripeAccount";
import Education from "./ValetProfile/Education/Education";
import Slots from "./ValetProfile/Slots/Slots";
import Dialogue from "../../../components/Custom/Modal/modal";
import "./style.css";

const Index = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userRecords, setUserRecords] = useState(null);
  const [columns, setColumns] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const { userAuth } = useSelector((state) => state?.authentication);

  const fetchUserRecord = async () => {
    try {
      const response = await dispatch(
        getRecordById(`/Admin/GetUserById?id=${userAuth.id}`)
      );
      setUserRecords(response.payload);
      setColumns(response.payload.role === "Valet");
      setLoading(false);
      return response.payload;
    } catch (e) {
      console.error("Error fetching user record", e);
    }
  };

  const handleClose = () => {
    setShowModal(false);
  };

  useEffect(() => {
    fetchUserRecord();
  }, []);

  useEffect(() => {
    if (userAuth && userAuth?.role === "Valet") {
      if (
        userAuth.isStripeAccountComplete === false ||
        userAuth.isPaypalAccountComplete === false ||
        userAuth.isProfileComplete === false ||
        userAuth.isSkillsComplete === false
      ) {
        setShowModal(true);
      }
    }
  }, []);

  useEffect(() => {
    if (
      userAuth &&
      userAuth?.role === "Valet" &&
      userAuth?.isActive === "AccountCompletion" &&
      userAuth.isStripeAccountComplete === true &&
      userAuth.isPaypalAccountComplete === true &&
      userAuth.isProfileComplete === true &&
      userAuth.isSkillsComplete === true
    ) {
      setValetProfileComplete();
    }
  }, [userAuth]);

  const setValetProfileComplete = async () => {
    try {
      const response = await dispatch(
        putUpdate(
          `/Admin/VerifyUserAccount/${encodeURIComponent(
            userAuth?.userEncId
          )}?type=ValetAccountCompletion`
        )
      );
      setUserRecords(response.payload);
      return response.payload;
    } catch (e) {
      console.error("Error fetching user record", e);
    }
  };

  const handleSchedule = () => {
    navigate("/scheduled-appointment");
  };

  return (
    <>
      <Container className="py-5">
        {loading ? (
          <Row>
            <Col
              xl={12}
              lg={12}
              md={12}
              sm={12}
              xs={12}
              className="text-center"
            >
              <Spinner animation="grow" />
            </Col>
          </Row>
        ) : !columns ? (
          <Container className="py-3 px-3">
            <Row>
              <Col xl={3} lg={3} md={3} sm={12} xs={12}>
                <Row>
                  <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                    <UserProfileImage userRecord={userRecords} />
                  </Col>
                </Row>
              </Col>
              <Col xl={9} lg={9} md={9} sm={12} xs={12}>
                <Row>
                  <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                    <Account userRecord={userRecords} />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        ) : (
          <Tabs
            defaultActiveKey="home"
            id="justify-tab-example"
            variant="pills"
            justify
          >
            <Tab
              eventKey="home"
              title="Home"
              className=""
              style={{
                border: "1px solid #dee2e6",
              }}
            >
              <Container className="py-3 px-3">
                <Row>
                  <Col xl={3} lg={3} md={3} sm={12} xs={12}>
                    <Row>
                      <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                        <UserProfileImage userRecord={userRecords} />
                      </Col>
                    </Row>
                  </Col>
                  <Col xl={9} lg={9} md={9} sm={12} xs={12}>
                    <Row>
                      <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                        <Account userRecord={userRecords} />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Container>
            </Tab>
            <Tab
              eventKey="skils"
              title="Skills & Payments"
              style={{
                border: "1px solid #dee2e6",
              }}
            >
              <Container className="py-3 px-3">
                <Row
                  className=""
                  style={{
                    justifyContent: "space-evenly",
                  }}
                >
                  <Col xl={5} lg={5} md={5} sm={12} xs={12}>
                    <SkillsAndEndorsements userRecord={userRecords} />
                  </Col>
                  <Col xl={4} lg={4} md={4} sm={12} xs={12}>
                    <Row>
                      <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                        <PayPalAccount userRecord={userRecords} />
                      </Col>
                      <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                        <StripeAccount userRecord={userRecords} />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Container>
            </Tab>
            <Tab
              eventKey="profile"
              title="Education"
              style={{
                border: "1px solid #dee2e6",
              }}
            >
              <Container className="py-3 px-3">
                <Row className="justify-content-center">
                  <Col xl={10} lg={10} md={10} sm={12} xs={12}>
                    <Education userRecord={userRecords} />
                  </Col>
                </Row>
              </Container>
            </Tab>
          </Tabs>
        )}
      </Container>
      <Dialogue
        show={showModal}
        centered={true}
        onHide={handleClose}
        titleClass="fw-bold"
        title="Warning"
        bodyContent={
          <>
            <center>
              <p className="p-0">Please complete your profile.</p>
            </center>
            <p>
              Attach your PayPal account.{" "}
              {userAuth && userAuth?.isPaypalAccountComplete === true ? (
                <i className="bi bi-check2-circle text-success p-2">Complete</i>
              ) : (
                <i className="bi bi-x-circle text-danger p-2">Incomplete</i>
              )}
            </p>
            <p>
              Attach and verify your Stripe account.{" "}
              {userAuth && userAuth?.isStripeAccountComplete === true ? (
                <i className="bi bi-check2-circle text-success p-2">Complete</i>
              ) : (
                <i className="bi bi-x-circle text-danger p-2">Incomplete</i>
              )}
            </p>
            <p>
              Add your skills that matches your abilities.{" "}
              {userAuth && userAuth?.isSkillsComplete === true ? (
                <i className="bi bi-check2-circle text-success p-2">Complete</i>
              ) : (
                <i className="bi bi-x-circle text-danger p-2">Incomplete</i>
              )}
            </p>
            <p>
              Must fill out your basic profile.{" "}
              {userAuth && userAuth?.isProfileComplete === true ? (
                <i className="bi bi-check2-circle text-success p-2">Complete</i>
              ) : (
                <i className="bi bi-x-circle text-danger p-2">Incomplete</i>
              )}
            </p>
          </>
        }
        backdrop="static"
        customFooterButtons={[
          {
            text: "Cancel",
            className: "btn-secondary-secondary",
            onClick: handleClose,
          },
        ]}
      />
      ;
    </>
  );
};

export default Index;
