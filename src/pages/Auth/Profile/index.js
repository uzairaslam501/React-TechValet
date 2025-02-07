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
import { getRecordById } from "../../../redux/Actions/globalActions";
import { useNavigate } from "react-router";
import UserProfileImage from "./ProfileImage/UserProfileImage";
import SkillsAndEndorsements from "./ValetProfile/Skills/SkillsAndEndorsements";
import Services from "./ValetProfile/Services/Services";
import PayPalAccount from "./ValetProfile/PayPal/PayPalAccount";
import StripeAccount from "./ValetProfile/Stripe/StripeAccount";
import Education from "./ValetProfile/Education/Education";
import Slots from "./ValetProfile/Slots/Slots";

const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userRecords, setUserRecords] = useState(null);
  const [columns, setColumns] = useState(false);
  const [loading, setLoading] = useState(true);
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
          <Col
            xl={!columns ? 4 : 3}
            lg={!columns ? 4 : 3}
            md={!columns ? 4 : 3}
            sm={12}
            xs={12}
          >
            <Row>
              <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                <UserProfileImage userRecord={userRecords} />
              </Col>
              {userAuth?.isActive === "Active" && (
                <Col xl={12} lg={12} md={12} sm={12} xs={12} className="mt-4">
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
            xl={!columns ? 8 : 6}
            lg={!columns ? 8 : 6}
            md={!columns ? 8 : 6}
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
  );
};

export default UserProfile;
