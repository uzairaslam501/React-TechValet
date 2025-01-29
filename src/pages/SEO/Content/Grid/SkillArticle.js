import "./style.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row, Spinner } from "react-bootstrap";
import { GetSkills } from "../../../../redux/Actions/seoActions";

const SkillArticle = () => {
  const dispatch = useDispatch();
  const [skills, setSkills] = useState([]);
  const [loader, setLoader] = useState(false);

  const fetchSkillRecords = () => {
    setLoader(true);
    dispatch(GetSkills())
      .then((response) => {
        console.log(response?.payload);
        setSkills(response?.payload);
        setLoader(false);
      })
      .catch((err) => {
        console.error("Error fetching skills:", err);
        setLoader(false);
      });
  };

  useEffect(() => {
    fetchSkillRecords();
  }, [dispatch]);

  return (
    <Container fluid className="bg-white py-5" style={{ minHeight: "100vh" }}>
      {!loader ? (
        <Container className="my-4 py-4">
          <Row className="g-4">
            {skills && skills.length > 0 ? (
              skills.map((option, index) => (
                <Col xl={4} lg={4} md={6} sm={6} xs={12} key={index}>
                  <Card className="skill-card shadow-sm text-center h-100">
                    <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                      <div className="skill-icon mb-3">
                        <i
                          className="bi bi-lightbulb-fill"
                          style={{ fontSize: "2rem", color: "#f39c12" }}
                        ></i>
                      </div>
                      <Link to={`/skill/${option}`}>
                        <Card.Title
                          className="mb-2"
                          style={{ fontWeight: "bold", fontSize: "1.2rem" }}
                        >
                          {option}
                        </Card.Title>
                      </Link>
                      <Card.Text className="text-muted">
                        Find the valets based on this skill!
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <>
                <Col xl={12} lg={12} md={12} sm={12} className="text-center">
                  <h3>No Record Found</h3>
                </Col>
              </>
            )}
          </Row>
        </Container>
      ) : (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      )}
    </Container>
  );
};

export default SkillArticle;
