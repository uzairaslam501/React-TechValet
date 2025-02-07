import React, { useState } from "react";
import { useLocation } from "react-router";
import {
  Col,
  Container,
  Row,
  Form,
  Card,
  CardBody,
  ProgressBar,
  ButtonGroup,
  Button,
} from "react-bootstrap";
import RadioCheck from "../../../../components/Custom/RadioChecks/radioChecks";
import { options } from "../../../../utils/client/data/requestedData";
import { formatDateTimeWithAmPm } from "../../../../utils/_helpers";
import LabeledDisplay from "../../../../components/Custom/LabeledDisplay/LabeledDisplay";
import BadgeDisplay from "../../../../components/Custom/BadgeDisplay/BadgeDisplay";
import RequestedUsers from "./requestedUsers";
import "./style.css";

const RequestedService = () => {
  const { state } = useLocation();
  const recordForUpdate = state?.recordForUpdate || state;
  const [step, setStep] = useState(1);

  // Handle Next & Previous
  const nextStep = () => {
    setStep(step + 1);
  };
  const prevStep = () => {
    setStep(step - 1);
  };

  return (
    <>
      <Container className="py-5">
        <Row>
          <Col xl={12} lg={12} md={12} sm={12} xs={12}>
            <Card
              className="shadow border-0 rounded"
              style={{
                backgroundColor: "#f3f3f3",
              }}
            >
              <CardBody>
                <div className="text-center">
                  <h3 className="fw-semibold mt-3 text-black">
                    Requested a Valet!
                  </h3>
                  <p>
                    You have Completed this form to help us match you with the
                    perfect Valet based on your needs.
                  </p>
                </div>

                <Row>
                  <Col xl={6} lg={6} md={6} sm={12} xs={12}>
                    <Card className="border-0">
                      <CardBody
                        style={{
                          minHeight: "300px",
                        }}
                      >
                        {/* Radio Options */}
                        <Form.Group
                          controlId="requestServiceType"
                          className="mb-3"
                        >
                          <Form.Label className="text-black">
                            When do you want help from your Tech Valet
                            <span className="text-danger"> *</span>
                          </Form.Label>
                          <RadioCheck
                            checkType="radio"
                            inlineOrNot={true}
                            options={options}
                            name="requestServiceType"
                            selectedValue={recordForUpdate.requestServiceType}
                            disabled
                          />
                        </Form.Group>

                        {/* Service Time Section */}
                        {recordForUpdate.requestServiceType === "2" && (
                          <>
                            <Row className="mb-3">
                              <Col>
                                <Form.Group controlId="Time">
                                  <Form.Label>
                                    Preferred Service Time
                                    <span className="text-danger">*</span>
                                  </Form.Label>
                                  <LabeledDisplay
                                    preferredServiceTime={
                                      recordForUpdate.prefferedServiceTime
                                    }
                                    background={"black"}
                                    className={""}
                                  />
                                </Form.Group>
                              </Col>
                            </Row>

                            <Row className="mb-3">
                              <Col md={6}>
                                <Form.Group>
                                  <Form.Label>
                                    From Date Time
                                    <span className="text-danger">*</span>
                                  </Form.Label>
                                  <Form.Control
                                    type="text"
                                    value={formatDateTimeWithAmPm(
                                      recordForUpdate.fromDateTime
                                    )}
                                    disabled
                                    className="border-0"
                                  />
                                </Form.Group>
                              </Col>
                              <Col md={6}>
                                <Form.Group>
                                  <Form.Label>
                                    To Date Time
                                    <span className="text-danger">*</span>
                                  </Form.Label>
                                  <Form.Control
                                    type="text"
                                    value={formatDateTimeWithAmPm(
                                      recordForUpdate.toDateTime
                                    )}
                                    disabled
                                    className="border-0"
                                  />
                                </Form.Group>
                              </Col>
                            </Row>
                          </>
                        )}

                        {/* Problem Categories */}
                        <Form.Group
                          controlId="requestCategoryProblem"
                          className="mb-3"
                        >
                          <Form.Label className="text-black">
                            Categories of Problem{" "}
                            <span className="text-danger">*</span>
                          </Form.Label>
                          <Row>
                            {recordForUpdate.categoriesOfProblems &&
                              recordForUpdate.categoriesOfProblems
                                .split(",")
                                .map((problem, index) => (
                                  <Col
                                    xl={6}
                                    lg={6}
                                    md={6}
                                    sm={12}
                                    xs={12}
                                    key={index}
                                  >
                                    <i className="bi bi-check"></i>{" "}
                                    {problem.trim()}
                                  </Col>
                                ))}
                          </Row>
                        </Form.Group>

                        {/* Other Sections */}
                        {recordForUpdate.requestServiceSkills && (
                          <Form.Group className="mb-3">
                            <BadgeDisplay
                              label="What best describes your problem"
                              values={recordForUpdate.requestServiceSkills}
                              background={"success"}
                            />
                          </Form.Group>
                        )}
                      </CardBody>
                    </Card>
                  </Col>

                  <Col xl={6} lg={6} md={6} sm={12} xs={12}>
                    <Card className="border-0">
                      <CardBody
                        style={{
                          minHeight: "300px",
                        }}
                      >
                        {recordForUpdate.issuesInCategoriesSelected && (
                          <BadgeDisplay
                            label="Issues"
                            values={recordForUpdate.issuesInCategoriesSelected}
                            background={"primary"}
                          />
                        )}

                        {recordForUpdate.serviceLanguage && (
                          <BadgeDisplay
                            label="Preferred Language"
                            values={recordForUpdate.serviceLanguage}
                            background={"black"}
                            className={"mb-3"}
                          />
                        )}

                        {/* Additional Information */}
                        <Form.Group
                          controlId="serviceDescription"
                          className="mb-3"
                        >
                          <Form.Label>
                            Is there anything else we should know about?
                          </Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={9}
                            value={recordForUpdate.serviceDescription}
                            disabled
                            className="border-0"
                          />
                        </Form.Group>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>

                <Row className="py-4">
                  <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                    <div className="d-flex align-items-center">
                      <span
                        style={{
                          border: "10px solid #fcd609",
                          borderRadius: "50px",
                        }}
                      ></span>
                      <h2 className="ps-2 mb-0">Matching Valets:</h2>
                    </div>
                    <RequestedUsers
                      skills={recordForUpdate?.requestServiceSkills}
                    />
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default RequestedService;
