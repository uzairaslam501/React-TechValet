import "./style.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { GetSkills } from "../../../../redux/Actions/seoActions";

const SkillArticle = () => {
  const dispatch = useDispatch();
  const [skills, setSkills] = useState([]);

  const fetchSkillRecords = () => {
    dispatch(GetSkills())
      .then((response) => {
        console.log(response?.payload);
        setSkills(response?.payload);
      })
      .catch((err) => {
        console.error("Error fetching skills:", err);
      });
  };

  useEffect(() => {
    fetchSkillRecords();
  }, [dispatch]);

  return (
    <Container fluid className="vh-100 bg-white py-5">
      <Container className="vh-100 my-4" style={{ backgroundColor: "#f9f9f9" }}>
        <Row className="g-4">
          {skills.map((option, index) => (
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
          ))}
        </Row>
      </Container>
    </Container>
  );
};

export default SkillArticle;
