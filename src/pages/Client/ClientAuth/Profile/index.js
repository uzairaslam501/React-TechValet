import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Spinner } from "react-bootstrap";
import Account from "./Account/account";
import { useDispatch, useSelector } from "react-redux";
import { getRecordById } from "../../../../redux/Actions/globalActions";
import { useNavigate } from "react-router";
import UserProfileImage from "./ProfileImage/UserProfileImage";
import SkillsAndEndorsements from "./ValetProfile/Skills/SkillsAndEndorsements";
import Services from "./ValetProfile/Services/Services";
import PayPalAccount from "./ValetProfile/PayPal/PayPalAccount";

const Index = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userRecords, setUserRecords] = useState(null);
  const { userAuth } = useSelector((state) => state?.authentication);

  const fetchUserRecord = () => {
    try {
      dispatch(getRecordById(`/Admin/GetUserById?id=${userAuth.id}`)).then(
        (response) => {
          console.log(response?.payload);
          setUserRecords(response.payload);
        }
      );
    } catch (e) {
      console.log("error on Fetching Get USer on Account Index Page", e);
    } finally {
    }
  };

  const handleSchedule = () => {
    navigate("/scheduled-appointment");
  };

  useEffect(() => {
    fetchUserRecord();
  }, [userRecords?.userName]);

  return (
    <>
      <Container className="py-5">
        {userRecords ? (
          <Row>
            <Col xl={4} lg={4} md={4} sm={12} xs={12}>
              <Row>
                <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                  <UserProfileImage userRecord={userRecords} />
                </Col>

                <Col xl={12} lg={12} md={12} sm={12} xs={12} className="mt-4">
                  <Card className="shadow">
                    <Card.Header>Scheduled Customer Appointments</Card.Header>
                    <Card.Body>
                      <Button
                        onClick={handleSchedule}
                        className="btn btn-success w-100"
                      >
                        View Scheduling
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>

                {userRecords?.role === "Valet" && (
                  <>
                    <Col
                      xl={12}
                      lg={12}
                      md={12}
                      sm={12}
                      xs={12}
                      className="mt-4"
                    >
                      <SkillsAndEndorsements userRecord={userRecords} />
                    </Col>

                    <Col
                      xl={12}
                      lg={12}
                      md={12}
                      sm={12}
                      xs={12}
                      className="mt-4"
                    >
                      <Services userRecord={userRecords} />
                    </Col>
                  </>
                )}
              </Row>
            </Col>
            <Col xl={8} lg={8} md={8} sm={12} xs={12}>
              <Row>
                <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                  {userRecords && <Account userRecord={userRecords} />}
                </Col>

                <Col xl={12} lg={12} md={12} sm={12} xs={12} className="mt-4">
                  <Row>
                    <Col xl={6} lg={6} md={6} sm={12} xs={12}>
                      {<PayPalAccount userRecord={userRecords} />}
                    </Col>

                    <Col xl={6} lg={6} md={4} sm={12} xs={12}>
                      <Services userRecord={userRecords} />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        ) : (
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
        )}
      </Container>
    </>
  );
};

export default Index;
