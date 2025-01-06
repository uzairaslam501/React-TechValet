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
import { useParams } from "react-router";
import UserProfileImage from "../ClientAuth/Profile/ProfileImage/UserProfileImage";
import SkillsAndEndorsements from "../ClientAuth/Profile/ValetProfile/Skills/SkillsAndEndorsements";
import Services from "../ClientAuth/Profile/ValetProfile/Services/Services";
import Education from "../ClientAuth/Profile/ValetProfile/Education/Education";
import Slots from "../ClientAuth/Profile/ValetProfile/Slots/Slots";
import ReviewList from "../../../components/Custom/Reviews/ReviewList";
import CalenderOrders from "./calender/calenderOrders";

const UserProfile = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [userRecords, setUserRecords] = useState(null);
  const [ratingRecords, setRatingRecords] = useState(null);

  const fetchUserRecord = async () => {
    try {
      const response = await dispatch(
        getRecordById(`/User/user-by-id/${encodeURIComponent(id)}`)
      );
      console.log("Fetch User", response.payload);
      setUserRecords(response.payload);
      fetchUserRating();
    } catch (e) {
      console.error("Error fetching user record", e);
    }
  };

  const fetchUserRating = async () => {
    try {
      const response = await dispatch(
        getRecordById(`/User/users-rating/${encodeURIComponent(id)}`)
      );
      console.log("ratings", response.payload);
      setRatingRecords(response.payload);
      setLoading(false);
    } catch (e) {
      console.error("Error fetching user record", e);
    }
  };

  const sequentialApiCalls = async () => {
    try {
      const userRecord = await fetchUserRecord();

      // Exit early if userRecord is null
      if (!userRecord) return;

      const fetchFunctions = [
        () => <UserProfileImage userRecord={userRecord} preview={true} />,
        () => <Slots userRecord={userRecord} preview={true} />,
        () => <SkillsAndEndorsements userRecord={userRecord} preview={true} />,
        () => <Services userRecord={userRecord} preview={true} />,
        () => <Education userRecord={userRecord} preview={true} />,
      ];

      for (const fetchFunction of fetchFunctions) {
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
                  <CardBody
                    style={{
                      height: "150px",
                      overflowY: "scroll",
                    }}
                  >
                    {userRecords?.description}
                  </CardBody>
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
                  <CardHeader>
                    <h4 className="mb-0">Appointment Booking Scheduler</h4>
                  </CardHeader>
                  <CardBody
                    style={{
                      height: "500px",
                    }}
                  >
                    <Row
                      className=""
                      style={{ overflowY: "hidden", height: "100%" }}
                    >
                      <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                        <CalenderOrders id={id} />
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>

              <Col xl={12} lg={12} md={12} sm={12} xs={12} className="mt-4">
                <Card className="shadow">
                  <CardHeader>
                    <h4 className="mb-0">Reviews</h4>
                  </CardHeader>
                  <CardBody style={{ height: "300px", overflowY: "auto" }}>
                    <ReviewList reviews={ratingRecords} />
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Col>

          <Col xl={3} lg={3} md={3} sm={12} xs={12}>
            <Row>
              <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                <Card className="shadow">
                  <CardHeader>Details</CardHeader>
                  <CardBody
                    style={{
                      height: "245px",
                    }}
                  >
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
                                <span className="fw-normal">{lang.trim()}</span>
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
        </Row>
      )}
    </Container>
  );
};

export default UserProfile;
