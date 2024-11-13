import React from "react";
import { useLocation } from "react-router";
import { Col, Container, Row, Form } from "react-bootstrap";
import logo from "../../../../assets/images/logo-for-white-bg.svg";
import RadioCheck from "../../../../components/Custom/RadioChecks/radioChecks";
import Dropdown from "../../../../components/Custom/Dropdown/Dropdown";

const options = [
  { label: "Now", value: "LiveNow" },
  { label: "Schedule Later", value: "Schedule" },
];

const serviceTime = [
  { value: "Morning (8AM-12PM)", id: "8,9,10,11,12" },
  { value: "Afternoon (12PM-5PM)", id: "12,13,14,15,16,17" },
  { value: "Evening (5PM-10PM)", id: "17,18,19,20,21,22" },
  {
    value: "Night (10PM-7AM)",
    id: "22,23,00,01,02,03,04,05,06,07",
  },
];

const RequestedService = () => {
  const location = useLocation();
  const recordForUpdate = location.state;
  console.log("recordForUpdate", recordForUpdate);

  return (
    <>
      <div>{recordForUpdate.categoriesOfProblems}</div>
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
                <h5 className="fw-semibold mt-3 text-black">
                  Service Required
                </h5>
              </div>

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

              {recordForUpdate.requestServiceType === "Schedule" && (
                <>
                  <Row className="mb-3">
                    <Col>
                      <Form.Group controlId="Time">
                        <Form.Label>
                          Preferred Service Time
                          <span className="text-danger">*</span>
                        </Form.Label>
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
                          type="datetime-local"
                          name="fromDateTime"
                          value={recordForUpdate.startDateTime}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>
                          To Date Time <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                          type="datetime-local"
                          name="toDateTime"
                          value={recordForUpdate.startDateTime}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </>
              )}

              {/* <Form.Group controlId="requestCategoryProblem" className="mb-3">
                <Form.Label className="text-black">
                  Categories of Problem <span className="text-danger">*</span>
                </Form.Label>
                <RadioCheckMultiple
                  checkType="checkbox"
                  inlineOrNot={true}
                  options={problemOptions}
                  name="categoriesOfProblems"
                  selectedValue={formik.values.categoriesOfProblems}
                  onBlur={formik.handleBlur}
                  onChange={(e) => {
                    handleCategoryChange(e.target.value);
                  }}
                />
                {formik.touched.categoriesOfProblems &&
                formik.errors.categoriesOfProblems ? (
                  <div className="text-danger">
                    {formik.errors.categoriesOfProblems}
                  </div>
                ) : null}
              </Form.Group>

              {selectedCategories.length > 0 && (
                <Form.Group controlId="subCategory" className="mb-3">
                  <Form.Label>
                    What best describes your problem
                    <span className="text-danger">*</span>
                  </Form.Label>
                  <Dropdown
                    optionsList={subOptions}
                    handleChange={handleSubcategoryChange}
                    handleBlur={() => {}}
                    values={{ subcategories: selectedSubcategories }}
                    isMultiSelect={true}
                    isSearchable={true}
                    valueKey="subcategories"
                    fieldName="Subcategory"
                  />
                  {formik.touched.requestServiceSkills &&
                  formik.errors.requestServiceSkills ? (
                    <div className="text-danger">
                      {formik.errors.requestServiceSkills}
                    </div>
                  ) : null}
                </Form.Group>
              )}

              <Form.Group controlId="SelectIssuesFound" className="mb-3">
                <Form.Label>
                  Issues <span className="text-danger">*</span>
                </Form.Label>
                <Dropdown
                  optionsList={issuesInCategories}
                  handleChange={handleIssuesInCategoiesChange}
                  handleBlur={() => {}}
                  values={{ issueFound: selectedIssue }}
                  isMultiSelect={false}
                  isSearchable={true}
                  valueKey="issueFound"
                  fieldName="Issues"
                />
                {formik.touched.issuesInCategoriesSelected &&
                formik.errors.issuesInCategoriesSelected ? (
                  <div className="text-danger">
                    {formik.errors.issuesInCategoriesSelected}
                  </div>
                ) : null}
              </Form.Group>

              <Form.Group controlId="SelectLanguage" className="mb-3">
                <Form.Label>
                  Preferred Language <span className="text-danger">*</span>
                </Form.Label>
                <Dropdown
                  optionsList={languageOptions}
                  handleChange={handleServiceLangaugeChange}
                  handleBlur={() => {}}
                  values={{ preferredLanguage: selectedLanguage }}
                  isMultiSelect={true}
                  isSearchable={true}
                  valueKey="preferredLanguage"
                  fieldName="Language"
                />
                {formik.touched.serviceLanguage &&
                formik.errors.serviceLanguage ? (
                  <div className="text-danger">
                    {formik.errors.serviceLanguage}
                  </div>
                ) : null}
              </Form.Group>

              <Form.Group controlId="serviceDescription" className="mb-3">
                <Form.Label>
                  Is there anything else we should know about?
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  name="serviceDescription"
                  placeholder="Enter additional information"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                {formik.touched.serviceDescription &&
                formik.errors.serviceDescription ? (
                  <div className="text-danger">
                    {formik.errors.serviceDescription}
                  </div>
                ) : null}
              </Form.Group> */}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default RequestedService;
