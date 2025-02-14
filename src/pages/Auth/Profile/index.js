import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  OverlayTrigger,
  Row,
  Spinner,
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

const UserProfile = () => {
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
      return response.payload;
    } catch (e) {
      console.error("Error fetching user record", e);
    }
  };

  const sequentialApiCalls = async () => {
    try {
      const userRecord = await fetchUserRecord();

      // Exit early if userRecord is null
      if (!userRecord) return;

      setColumns(userRecord.role === "Valet");

      const fetchFunctions = [
        () => <UserProfileImage userRecord={userRecord} />,
        () => <Slots userRecord={userRecord} />,
        () => <Account userRecord={userRecord} />,
        () => <SkillsAndEndorsements userRecord={userRecord} />,
        () => <PayPalAccount userRecord={userRecord} />,
        () => <StripeAccount userRecord={userRecord} />,
        () => <Services userRecord={userRecord} />,
        () => <Education userRecord={userRecord} />,
      ];

      for (const fetchFunction of fetchFunctions) {
        // Render or call next component
        await fetchFunction();
      }

      setLoading(false);
    } catch (error) {
      console.error("Error in sequential API calls", error);
    }
  };

  const handleClose = () => {
    setShowModal(false);
  };

  useEffect(() => {
    sequentialApiCalls();
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
  }, []);

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
        ) : (
          <Row>
            <Col xl={3} lg={3} md={3} sm={12} xs={12}>
              <Row>
                <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                  <UserProfileImage userRecord={userRecords} />
                </Col>
                {userAuth?.role !== "Seo" &&
                  userAuth?.isActive === "Active" && (
                    <Col
                      xl={12}
                      lg={12}
                      md={12}
                      sm={12}
                      xs={12}
                      className="mt-4"
                    >
                      <Card className="shadow">
                        <Card.Header>
                          <OverlayTrigger
                            placement="top"
                            overlay={
                              <Tooltip id="orders-tooltip">
                                View and manage your placed orders here.
                              </Tooltip>
                            }
                          >
                            <span>Recent Orders</span>
                          </OverlayTrigger>
                        </Card.Header>
                        <Card.Body>
                          <Button
                            onClick={handleSchedule}
                            className="btn btn-success w-100"
                          >
                            Order History
                          </Button>
                        </Card.Body>
                      </Card>
                    </Col>
                  )}
                {columns && (
                  <Col xl={12} lg={12} md={12} sm={12} xs={12} className="mt-4">
                    <SkillsAndEndorsements userRecord={userRecords} />
                  </Col>
                )}
              </Row>
            </Col>
            <Col
              xl={!columns ? 9 : 6}
              lg={!columns ? 9 : 6}
              md={!columns ? 9 : 6}
              sm={12}
              xs={12}
            >
              <Row>
                <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                  <Account userRecord={userRecords} />
                </Col>
              </Row>
            </Col>
            {columns && (
              <>
                <Col xl={3} lg={3} md={3} sm={12} xs={12}>
                  <Row>
                    <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                      <PayPalAccount userRecord={userRecords} />
                    </Col>
                    <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                      <StripeAccount userRecord={userRecords} />
                    </Col>
                    <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                      <Services userRecord={userRecords} />
                    </Col>
                  </Row>
                </Col>
                <Col
                  xl={{ span: 9, offset: 3 }}
                  lg={{ span: 9, offset: 3 }}
                  md={{ span: 9, offset: 3 }}
                  sm={12}
                  xs={12}
                >
                  <Education userRecord={userRecords} />
                </Col>
              </>
            )}
          </Row>
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

export default UserProfile;
