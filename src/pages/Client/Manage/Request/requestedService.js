import React from "react";
import { useLocation } from "react-router";
import { Col, Container, Row, Form } from "react-bootstrap";
import logo from "../../../../assets/images/logo-for-white-bg.svg";
import RadioCheck from "../../../../components/Custom/RadioChecks/radioChecks";
import { options } from "../../../../utils/client/data/requestedData";
import { convertToFormattedDateTimeWithAMPM } from "../../../../utils/_helpers";
import LabeledDisplay from "../../../../components/Custom/LabeledDisplay/LabeledDisplay";
import BadgeDisplay from "../../../../components/Custom/BadgeDisplay/BadgeDisplay";

const RequestedService = () => {
  const { state: recordForUpdate } = useLocation();
  console.log("stateRecords:", recordForUpdate);
  if (!recordForUpdate) {
    return <div>No data available.</div>;
  }

  return (
    <Container className="py-5 text-black">
      <Row>
        <Col lg={6} className="text-center my-auto">
          <img
            src={logo}
            style={{ width: "100%", height: "500px" }}
            alt="Request Service"
          />
        </Col>
        <Col lg={6} className="mx-auto shadow-sm">
          <div className="py-4">
            <div className="text-center mb-4">
              <a href="/">
                <img
                  src={logo}
                  alt="Logo"
                  style={{ width: "140px", height: "65px" }}
                />
              </a>
              <h5 className="fw-semibold mt-3 text-black">Service Required</h5>
            </div>

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
                        From Date Time<span className="text-danger">*</span>
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
            <Form.Group controlId="requestCategoryProblem" className="mb-3">
              <Form.Label className="text-black">
                Categories of Problem <span className="text-danger">*</span>
              </Form.Label>
              <Row>
                {recordForUpdate.categoriesOfProblems &&
                  recordForUpdate.categoriesOfProblems
                    .split(", ")
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
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default RequestedService;
