import React, { useState } from "react";
import { Card, Row, Col, Form, Button } from "react-bootstrap";

const Services = ({ userRecord }) => {
  const [showAddExperienceSection, setShowAddExperienceSection] =
    useState(false);
  const [userExperience, setUserExperience] = useState("");
  const [experienceError, setExperienceError] = useState("");

  const handleAddNewExperience = () => {
    setShowAddExperienceSection(true);
  };

  const handleHideExperienceSection = () => {
    setShowAddExperienceSection(false);
    setUserExperience("");
    setExperienceError("");
  };

  const handleAddUpdateExperience = () => {
    if (!userExperience.trim()) {
      setExperienceError("Please enter your services offered.");
    } else {
      // Add logic to handle adding/updating the experience
      console.log("Experience added/updated:", userExperience);
      setShowAddExperienceSection(false);
      setUserExperience("");
      setExperienceError("");
    }
  };

  return (
    <Card className="shadow-sm rounded bg-white mb-3">
      <Card.Header className="border-bottom p-3">
        <Row>
          <Col md={6} xs={6} className="d-flex justify-content-start">
            <h6 className="m-0">Services Offered</h6>
          </Col>
          <Col md={6} xs={6} className="d-flex justify-content-end">
            <p className="m-0">
              <span
                onClick={handleAddNewExperience}
                style={{ cursor: "pointer", color: "#fcd609" }}
              >
                Add New
              </span>
            </p>
          </Col>
        </Row>
      </Card.Header>
      <Card.Body>
        <div className="box-body">
          {showAddExperienceSection && (
            <div className="py-3">
              <Form.Group controlId="userExperience">
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={userExperience}
                  onChange={(e) => setUserExperience(e.target.value)}
                  placeholder="Enter Your services offered"
                  aria-label="Enter Your services"
                />
              </Form.Group>
              {experienceError && (
                <span className="text-danger">{experienceError}</span>
              )}
              <Row className="mt-3">
                <Col xs={6}>
                  <Button
                    variant="danger"
                    className="w-100"
                    onClick={handleHideExperienceSection}
                  >
                    Cancel
                  </Button>
                </Col>
                <Col xs={6}>
                  <Button
                    variant="success"
                    className="w-100"
                    onClick={handleAddUpdateExperience}
                  >
                    Add
                  </Button>
                </Col>
              </Row>
            </div>
          )}

          <div className="py-3" id="myExperienceDisplaySection">
            {/* Map and display experiences here */}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Services;
