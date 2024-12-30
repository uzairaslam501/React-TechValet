import React, { useEffect, useState } from "react";
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
  Spinner,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { getRecordById } from "../../../redux/Actions/globalActions";
import { useNavigate, useParams } from "react-router";
import UserProfileImage from "../ClientAuth/Profile/ProfileImage/UserProfileImage";
import SkillsAndEndorsements from "../ClientAuth/Profile/ValetProfile/Skills/SkillsAndEndorsements";
import Services from "../ClientAuth/Profile/ValetProfile/Services/Services";
import Education from "../ClientAuth/Profile/ValetProfile/Education/Education";
import Slots from "../ClientAuth/Profile/ValetProfile/Slots/Slots";

const UserProfile = () => {
  const { id } = useParams();
  console.log("userEncId", id);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userRecords, setUserRecords] = useState(null);
  const [columns, setColumns] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchUserRecord = async () => {
    try {
      const response = await dispatch(
        getRecordById(`/User/user-by-id/${encodeURIComponent(id)}`)
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
        () => <UserProfileImage userRecord={userRecord} preview={true} />,
        () => <Slots userRecord={userRecord} />,
        () => <SkillsAndEndorsements userRecord={userRecord} />,
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

  useEffect(() => {
    sequentialApiCalls();
  }, []);

  const handleSchedule = () => {
    navigate("/scheduled-appointment");
  };

  return (
    <Container className="py-5">
      {loading ? (
        <Row>
          <Col xl={12} lg={12} md={12} sm={12} xs={12} className="text-center">
            <Spinner animation="grow" />
          </Col>
        </Row>
      ) : (
        <Row>
          <Col xl={3} lg={3} md={3} sm={12} xs={12}>
            <Row>
              <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                <UserProfileImage userRecord={userRecords} preview={true} />
              </Col>

              <Col xl={12} lg={12} md={12} sm={12} xs={12} className="mt-4">
                <Card className="shadow">
                  <CardHeader>Description</CardHeader>
                  <CardBody>{userRecords?.description}</CardBody>
                </Card>
              </Col>

              <Col xl={12} lg={12} md={12} sm={12} xs={12} className="mt-4">
                <Education userRecord={userRecords} preview={true} />
              </Col>
            </Row>
          </Col>
          <Col xl={6} lg={6} md={6} sm={12} xs={12}>
            <Row>
              <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                <Card className="shadow">
                  <CardBody>
                    <Row>
                      <Col xl={6} lg={6} md={6} sm={12} xs={12}>
                        <h6>From: </h6>
                      </Col>
                      <Col xl={6} lg={6} md={6} sm={12} xs={12}>
                        <div className="d-flex">
                          <h6>Description: </h6>
                          <span
                            className="px-2"
                            style={{ wordBreak: "break-all" }}
                          >
                            {userRecords?.description}
                          </span>
                        </div>
                      </Col>
                      <Col xl={6} lg={6} md={6} sm={12} xs={12}>
                        <h6>From: </h6>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Col>
          {columns && (
            <>
              <Col xl={3} lg={3} md={3} sm={12} xs={12}>
                <Row>
                  <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                    <Card className="shadow">
                      <CardHeader>Details</CardHeader>
                      <CardBody>
                        <ul className="list">
                          <li>
                            <span className="fw-bold me-1">From:</span>
                            <span>{userRecords?.country}</span>
                          </li>
                          <li className="my-2">
                            <span className="fw-bold"> Languages: </span>
                            <div>
                              {userRecords?.language
                                ?.split(",")
                                .map((lang, index) => (
                                  <Badge
                                    className="bg-secondary"
                                    style={{
                                      padding: "4px 8px",
                                      fontSize: "12px",
                                    }}
                                  >
                                    <span className="fw-normal">
                                      {lang.trim()}
                                    </span>
                                  </Badge>
                                ))}
                            </div>
                          </li>
                          <li>
                            <span className="fw-bold me-1">
                              Valet's Current Time:
                            </span>

                            <div>
                              <span class="text-success">
                                {userRecords?.currentTime}
                              </span>
                            </div>
                          </li>
                        </ul>
                      </CardBody>
                    </Card>
                  </Col>

                  <Col xl={12} lg={12} md={12} sm={12} xs={12} className="mt-4">
                    <SkillsAndEndorsements
                      userRecord={userRecords}
                      preview={true}
                    />
                  </Col>

                  <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                    <Services userRecord={userRecords} preview={true} />
                  </Col>
                </Row>
              </Col>
            </>
          )}
        </Row>
      )}
    </Container>
  );
};

export default UserProfile;
