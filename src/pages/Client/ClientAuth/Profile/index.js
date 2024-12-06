import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import Account from "./Account/account";
import { useDispatch, useSelector } from "react-redux";
import { getRecordById } from "../../../../redux/Actions/globalActions";
import { useNavigate } from "react-router";
import UserProfileImage from "./ProfileImage/UserProfileImage";
import SkillsAndEndorsements from "./ValetProfile/Skills/SkillsAndEndorsements";

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
        <Row>
          <Col md={4} sm={12}>
            <Row>
              <Col sm={12}>
                <UserProfileImage userRecord={userRecords} />
              </Col>

              <Col sm={12} className="mt-4">
                <Card>
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
                  <Col sm={12} className="mt-4">
                    <SkillsAndEndorsements userRecord={userRecords} />
                  </Col>
                </>
              )}
            </Row>
          </Col>
          <Col md={8} sm={12}>
            {userRecords && <Account userRecord={userRecords} />}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Index;
