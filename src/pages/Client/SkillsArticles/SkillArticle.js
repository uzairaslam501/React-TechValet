import React from "react";
import { skillsOptions } from "../../../utils/client/data/requestedData";
import { Card, Col, Container, Row } from "react-bootstrap";
import "./style.css";
import { Link } from "react-router-dom";

const SkillArticle = () => {
  return (
    <Container className="my-4" style={{ backgroundColor: "#f9f9f9" }}>
      <Row className="g-4">
        {skillsOptions.map((option) => (
          <Col xl={4} lg={4} md={6} sm={6} xs={12} key={option.id}>
            <Card className="skill-card shadow-sm text-center h-100">
              <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                <div className="skill-icon mb-3">
                  <i
                    className="bi bi-lightbulb-fill"
                    style={{ fontSize: "2rem", color: "#f39c12" }}
                  ></i>
                </div>
                <Link to={`/skill/${option.value}`}>
                  <Card.Title
                    className="mb-2"
                    style={{ fontWeight: "bold", fontSize: "1.2rem" }}
                  >
                    {option.value}
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
  );
};

export default SkillArticle;
