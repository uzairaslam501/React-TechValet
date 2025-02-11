import React, { useCallback, useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import "./dashboard.css";
import { getAdminDashboardCount } from "../../../redux/Actions/adminActions";
import { useDispatch } from "react-redux";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [isCount, setIsCount] = useState([]);
  const fetchCount = useCallback(() => {
    dispatch(getAdminDashboardCount()).then((response) => {
      console.log(response?.payload);
      setIsCount(response?.payload || []);
    });
  });

  useEffect(() => {
    fetchCount();
  }, [dispatch]);

  console.log("isCount ::", isCount);
  return (
    <>
      <section className="section">
        <Container>
          <Row
            data-aos="zoom-in"
            data-aos-delay="100"
            className="aos-init aos-animate d-flex align-items-center justify-content-center text-center"
          >
            <h3
              className="col-12 fw-bold mb-3"
              style={{ textDecoration: "underline" }}
            >
              Admin Dashboard
            </h3>
            <Col xl={{ span: 4 }}>
              <Card
                className="card-shadow py-4 mb-3"
                style={{
                  background:
                    "linear-gradient( -135deg, #FCD609 10%, #FCD609 20%, #9b9b9b 20%, #9b9b9b 22%, #FFE 20%, #000 24%, #000 30%, #000 4000%)",
                  border: "1px solid #000",
                  borderBottom: "8px solid #000",
                  borderRadius: "20px",
                  height: "180px",
                }}
              >
                <Card.Text className="pt-4 h5 text-white">
                  Total Active Customers
                </Card.Text>
                <Card.Body>
                  <Card.Text className="text-white h4">
                    {isCount && isCount.customer}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col xl={{ span: 4, offset: 1 }}>
              <Card
                className="card-shadow py-4 mb-3"
                style={{
                  background:
                    "linear-gradient( -135deg, #FCD609 10%, #FCD609 20%, #9b9b9b 20%, #9b9b9b 22%, #FFE 20%, #000 24%, #000 30%, #000 4000%)",
                  border: "1px solid #000",
                  borderBottom: "8px solid #000",
                  borderRadius: "20px",
                  height: "180px",
                }}
              >
                <Card.Text className="pt-4 h5 text-white">
                  Total Active Tech Valet
                </Card.Text>
                <Card.Body>
                  <Card.Text className="text-white h4">
                    {isCount && isCount.valet}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col xl={{ span: 4 }}>
              <Card
                className="card-shadow py-4 mb-3"
                style={{
                  background:
                    "linear-gradient( -135deg, #FCD609 10%, #FCD609 20%, #9b9b9b 20%, #9b9b9b 22%, #FFE 20%, #000 24%, #000 30%, #000 4000%)",
                  border: "1px solid #000",
                  borderBottom: "8px solid #000",
                  borderRadius: "20px",
                  height: "180px",
                }}
              >
                <Card.Text className="pt-4 h5 text-white">
                  Customers Verification Pending
                </Card.Text>
                <Card.Body>
                  <Card.Text className="text-white h4">
                    {isCount && isCount.customersVerificationPending}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col xl={{ span: 4, offset: 1 }}>
              <Card
                className="card-shadow py-4 mb-3"
                style={{
                  background:
                    "linear-gradient( -135deg, #FCD609 10%, #FCD609 20%, #9b9b9b 20%, #9b9b9b 22%, #FFE 20%, #000 24%, #000 30%, #000 4000%)",
                  border: "1px solid #000",
                  borderBottom: "8px solid #000",
                  borderRadius: "20px",
                  height: "180px",
                }}
              >
                <Card.Text className="pt-4 h5 text-white">
                  Valet Verification Pending
                </Card.Text>
                <Card.Body>
                  <Card.Text className="text-white h4">
                    {isCount && isCount.valetVerificationPending}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col xl={{ span: 4 }}>
              <Card
                className="card-shadow py-4 mb-3"
                style={{
                  background:
                    "linear-gradient( -135deg, #FCD609 10%, #FCD609 20%, #9b9b9b 20%, #9b9b9b 22%, #FFE 20%, #000 24%, #000 30%, #000 4000%)",
                  border: "1px solid #000",
                  borderBottom: "8px solid #000",
                  borderRadius: "20px",
                  height: "180px",
                }}
              >
                <Card.Text className="pt-4 h5 text-white">
                  Customers Under Review
                </Card.Text>
                <Card.Body>
                  <Card.Text className="text-white h4">
                    {isCount && isCount.customersUnderReview}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col xl={{ span: 4, offset: 1 }}>
              <Card
                className="card-shadow py-4 mb-3"
                style={{
                  background:
                    "linear-gradient( -135deg, #FCD609 10%, #FCD609 20%, #9b9b9b 20%, #9b9b9b 22%, #FFE 20%, #000 24%, #000 30%, #000 4000%)",
                  border: "1px solid #000",
                  borderBottom: "8px solid #000",
                  borderRadius: "20px",
                  height: "180px",
                }}
              >
                <Card.Text className="pt-4 h5 text-white">
                  Tech Valet Under Review
                </Card.Text>
                <Card.Body>
                  <Card.Text className="text-white h4">
                    {isCount && isCount.valetUnderReview}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Dashboard;
