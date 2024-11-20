import React from "react";
import { useLocation } from "react-router";
import { Col, Container, Row, Form, Card, CardBody } from "react-bootstrap";
import logo from "../../../../assets/images/logo-for-white-bg.svg";
import RadioCheck from "../../../../components/Custom/RadioChecks/radioChecks";
import { options } from "../../../../utils/client/data/requestedData";
import { convertToFormattedDateTimeWithAMPM } from "../../../../utils/_helpers";
import LabeledDisplay from "../../../../components/Custom/LabeledDisplay/LabeledDisplay";
import BadgeDisplay from "../../../../components/Custom/BadgeDisplay/BadgeDisplay";
import RequestedUsers from "./requestedUsers";
import animationData from "../../../../assets/lottie/video-tablet.json";
import LottiePlayer from "../../../../components/Custom/LottiePlayer/LottiePlayer";

const RequestedService = () => {
  const { state } = useLocation();
  const recordForUpdate = state?.recordForUpdate || state;

  return (
    <>
      <Container className="py-5 text-black">
        <Row>
          <Col lg={6} sm={12} className="text-center my-auto p-4">
            <LottiePlayer
              src={animationData}
              style={{ height: "100%", width: "100%" }}
              loop="true"
              autoplay="true"
            />
          </Col>
          <Col lg={6} sm={12}>
            <Card
              className="shadow border-dark"
              style={{
                borderRadius: "25px",
                backgroundColor: "#f3f3f3",
              }}
            >
              <CardBody>
                <CardBody className="text-center">
                  <img
                    src={logo}
                    alt="Logo"
                    style={{ width: "140px", height: "65px" }}
                  />
                  <h5 className="fw-semibold mt-3 text-black">
                    Service Required
                  </h5>
                </CardBody>

                <CardBody>
                  {/* Radio Options */}
                  <Form.Group controlId="requestServiceType" className="mb-3">
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
                              value={convertToFormattedDateTimeWithAMPM(
                                recordForUpdate.fromDateTime
                              )}
                              readOnly
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group>
                            <Form.Label>
                              To Date Time<span className="text-danger">*</span>
                            </Form.Label>
                            <Form.Control
                              type="text"
                              value={convertToFormattedDateTimeWithAMPM(
                                recordForUpdate.toDateTime
                              )}
                              readOnly
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
                            <Col md={4} sm={6} xs={12} key={index}>
                              <Form.Check
                                disabled
                                type="switch"
                                label={problem.trim()}
                                id={`disabled-custom-switch-${index}`}
                                checked
                              />
                            </Col>
                          ))}
                    </Row>
                  </Form.Group>

                  {/* Other Sections */}
                  {recordForUpdate.requestServiceSkills && (
                    <BadgeDisplay
                      label="What best describes your problem"
                      values={recordForUpdate.requestServiceSkills}
                    />
                  )}

                  {recordForUpdate.issuesInCategoriesSelected && (
                    <BadgeDisplay
                      label="Issues"
                      values={recordForUpdate.issuesInCategoriesSelected}
                    />
                  )}

                  {recordForUpdate.serviceLanguage && (
                    <BadgeDisplay
                      label="Preferred Language"
                      values={recordForUpdate.serviceLanguage}
                    />
                  )}

                  {/* Additional Information */}
                  <Form.Group controlId="serviceDescription" className="mb-3">
                    <Form.Label>
                      Is there anything else we should know about?
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      value={recordForUpdate.serviceDescription}
                      readOnly
                    />
                  </Form.Group>
                </CardBody>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>

      <RequestedUsers skills={recordForUpdate?.requestServiceSkills} />
    </>
  );
};

export default RequestedService;
