import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  CardBody,
  CardHeader,
} from "react-bootstrap";
import logo from "../../../../assets/images/logo-for-white-bg.svg";
import RadioCheck from "../../../../components/Custom/RadioChecks/radioChecks";
import RadioCheckMultiple from "../../../../components/Custom/RadioChecks/multipleChecks";
import CustomDropdown from "../../../../components/Custom/Dropdown/Dropdown";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { requestService } from "../../../../redux/Actions/customerActions";
import { useNavigate } from "react-router";
import {
  options,
  serviceTime,
  problemOptions,
  subCategoryOptions,
  issuesInCategories,
  initialValues,
  languageOptions,
} from "../../../../utils/client/data/requestedData";
import image from "../../../../assets/images/request-service.png";
import { disabledPreviousDateTime } from "../../../../utils/_helpers";

export const validationSchema = Yup.object({
  requestServiceType: Yup.string().required("Please select a service type"),
  prefferedServiceTime: Yup.string().when("requestServiceType", {
    is: "2",

    then: (schema) => schema.required("Please select preffered service time"),
    otherwise: (schema) => schema.nullable(),
  }),
  fromDateTime: Yup.date().when("requestServiceType", {
    is: "2",
    then: (schema) =>
      schema
        .required("Please select a start date and time")
        .typeError("Invalid date format"),
    otherwise: (schema) => schema.nullable(),
  }),
  toDateTime: Yup.date().when("requestServiceType", {
    is: "2",
    then: (schema) =>
      schema
        .required("Please select a end date and time")
        .min(Yup.ref("fromDateTime"), "End time must be after start time")
        .typeError("Invalid date format"),
    otherwise: (schema) => schema.nullable(),
  }),
  categoriesOfProblems: Yup.array()
    .of(Yup.string())
    .min(1, "Please select at least one category"),
  requestServiceSkills: Yup.array()
    .of(Yup.string())
    .min(1, "Please select at least one skill"),
  issuesInCategoriesSelected: Yup.string().required(
    "You must have to select the issue you are facing"
  ),
  serviceLanguage: Yup.array().nullable("Please select at least one language"),
  serviceDescription: Yup.string().nullable(
    "Please enter additional information"
  ),
});

const RequestService = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userAuth } = useSelector((state) => state?.authentication);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [subOptions, setSubOptions] = useState([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState([]);
  const [selectedTime, setSelectedTime] = useState([]);
  const [selectedIssue, setSelectedIssue] = useState([]);

  const handleCategoryChange = (category) => {
    // Compute the updated selected categories
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];
    // Update selectedCategories with the updated list
    setSelectedCategories(updatedCategories);
    setFieldValue("categoriesOfProblems", updatedCategories);
    console.log("updatedCategories", updatedCategories);

    const newSubOptions = [
      ...new Set(
        updatedCategories.flatMap((cat) => subCategoryOptions[cat] || [])
      ),
    ];
    setSubOptions(newSubOptions.map((sub) => ({ id: sub, value: sub })));
  };

  const handleServiceLangaugeChange = (language) => {
    setSelectedLanguage(language);
    setFieldValue("serviceLanguage", language);
  };

  const handleServiceTimeChange = (time) => {
    setSelectedTime(time);
    if (time.length === 0) {
      setFieldValue("fromDateTime", "");
      setFieldValue("toDateTime", "");
    }

    setFieldValue("prefferedServiceTime", time.join(","));
  };

  const handleSubcategoryChange = (selectedSubcategoryIds) => {
    setSelectedSubcategories(selectedSubcategoryIds);
    setFieldValue("requestServiceSkills", selectedSubcategoryIds);
  };

  const handleIssuesInCategoiesChange = (issue) => {
    setSelectedIssue(issue);
    console.log("Issues in Categories", issue);
    setFieldValue("issuesInCategoriesSelected", issue);
  };

  const {
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: (values) => {
      try {
        const convertedData = {
          ...values,
          categoriesOfProblems: values.categoriesOfProblems.join(", "),
          requestServiceSkills: values.requestServiceSkills.join(", "),
          serviceLanguage: values.serviceLanguage.join(", "),
          requestedServiceUserId: `${userAuth.id}`,
        };
        dispatch(requestService(convertedData)).then((response) => {
          console.log("response", response);
          const convertedDatas = {
            ...convertedData,
            id: response.payload,
          };
          navigate("/requested-service", { state: convertedDatas });
        });
      } catch (ex) {}
    },
  });

  useEffect(() => {
    if (values.requestServiceType !== "2") {
      setFieldValue("prefferedServiceTime", "");
      setFieldValue("fromDateTime", "");
      setFieldValue("toDateTime", "");
    }
  }, [values.requestServiceType]);

  return (
    <Container className="py-5 text-black">
      <Row>
        <Col lg={6} className="text-center my-auto">
          <img
            src={image}
            style={{ width: "100%", height: "500px" }}
            alt="Request Service"
          />
        </Col>
        <Col lg={6}>
          <Card
            className="mx-auto shadow-sm border border-dark"
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
                <Form onSubmit={handleSubmit}>
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
                      selectedValue={values.requestServiceType}
                      onBlur={handleBlur("requestServiceType")}
                      onChange={handleChange("requestServiceType")}
                    />
                  </Form.Group>

                  {values.requestServiceType === "2" && (
                    <>
                      <Row className="mb-3">
                        <Col>
                          <Form.Group controlId="Time">
                            <Form.Label>
                              Preferred Service Time
                              <span className="text-danger">*</span>
                            </Form.Label>
                            <CustomDropdown
                              optionsList={serviceTime}
                              selectedOptions={selectedTime}
                              handleChange={handleServiceTimeChange}
                              values={{ preferredTime: selectedTime }}
                              isMultiSelect
                              isSearchable={false}
                              valueKey="preferredTime"
                              fieldName="Time"
                              isInvalid={
                                !!errors.prefferedServiceTime &&
                                touched.prefferedServiceTime
                              }
                            />
                            {touched.prefferedServiceTime &&
                              errors.prefferedServiceTime && (
                                <div className="text-danger">
                                  {errors.prefferedServiceTime}
                                </div>
                              )}
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
                              value={values.fromDateTime}
                              onBlur={handleBlur("fromDateTime")}
                              onChange={handleChange("fromDateTime")}
                              min={disabledPreviousDateTime()}
                              disabled={selectedTime.length === 0}
                              isInvalid={
                                !!errors.fromDateTime && touched.fromDateTime
                              }
                            />
                            {selectedTime.length === 0 && (
                              <div className="text-danger">
                                Please select a service time.
                              </div>
                            )}
                            {touched.fromDateTime && errors.fromDateTime && (
                              <div className="text-danger">
                                {errors.fromDateTime}
                              </div>
                            )}
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group>
                            <Form.Label>
                              To Date Time
                              <span className="text-danger">*</span>
                            </Form.Label>
                            <Form.Control
                              type="datetime-local"
                              onBlur={handleBlur("toDateTime")}
                              onChange={handleChange("toDateTime")}
                              value={values.toDateTime}
                              min={disabledPreviousDateTime()}
                              disabled={selectedTime.length === 0}
                              isInvalid={
                                !!errors.toDateTime && touched.toDateTime
                              }
                            />
                            {touched.toDateTime && errors.toDateTime && (
                              <div className="text-danger">
                                {errors.toDateTime}
                              </div>
                            )}
                          </Form.Group>
                        </Col>
                      </Row>
                    </>
                  )}

                  <Form.Group
                    controlId="requestCategoryProblem"
                    className="mb-3"
                  >
                    <Form.Label className="text-black">
                      Categories of Problem{" "}
                      <span className="text-danger">*</span>
                    </Form.Label>
                    <RadioCheckMultiple
                      checkType="switch"
                      inlineOrNot={true}
                      options={problemOptions}
                      selectedValue={values.categoriesOfProblems}
                      onBlur={handleBlur("categoriesOfProblems")}
                      className="mb-2"
                      onChange={(e) => {
                        handleCategoryChange(e.target.value);
                      }}
                      isInvalid={
                        !!errors.categoriesOfProblems &&
                        touched.categoriesOfProblems
                      }
                    />
                    {touched.categoriesOfProblems &&
                    errors.categoriesOfProblems ? (
                      <div className="text-danger">
                        {errors.categoriesOfProblems}
                      </div>
                    ) : null}
                  </Form.Group>

                  {selectedCategories.length > 0 && (
                    <Form.Group controlId="subCategory" className="mb-3">
                      <Form.Label>
                        What best describes your problem
                        <span className="text-danger">*</span>
                      </Form.Label>
                      <CustomDropdown
                        optionsList={subOptions}
                        selectedOptions={selectedSubcategories}
                        handleChange={handleSubcategoryChange}
                        values={{ subcategories: selectedSubcategories }}
                        isMultiSelect
                        isSearchable={true}
                        valueKey="subcategories"
                        fieldName="Subcategory"
                        isInvalid={
                          !!errors.requestServiceSkills &&
                          touched.requestServiceSkills
                        }
                      />
                      {touched.requestServiceSkills &&
                      errors.requestServiceSkills ? (
                        <div className="text-danger">
                          {errors.requestServiceSkills}
                        </div>
                      ) : null}
                    </Form.Group>
                  )}

                  <Form.Group controlId="SelectIssuesFound" className="mb-3">
                    <Form.Label>
                      Issues <span className="text-danger">*</span>
                    </Form.Label>
                    <CustomDropdown
                      optionsList={issuesInCategories}
                      selectedOptions={selectedIssue}
                      handleChange={handleIssuesInCategoiesChange}
                      values={{ issueFound: selectedIssue }}
                      isSearchable={true}
                      valueKey="issueFound"
                      fieldName="Issues"
                      isInvalid={
                        !!errors.issuesInCategoriesSelected &&
                        touched.issuesInCategoriesSelected
                      }
                    />
                    {touched.issuesInCategoriesSelected &&
                    errors.issuesInCategoriesSelected ? (
                      <div className="text-danger">
                        {errors.issuesInCategoriesSelected}
                      </div>
                    ) : null}
                  </Form.Group>

                  <Form.Group controlId="SelectLanguage" className="mb-3">
                    <Form.Label>Preferred Language</Form.Label>
                    <CustomDropdown
                      optionsList={languageOptions}
                      selectedOptions={selectedLanguage}
                      handleChange={handleServiceLangaugeChange}
                      values={{ preferredLanguage: selectedLanguage }}
                      isMultiSelect
                      isSearchable={true}
                      valueKey="preferredLanguage"
                      fieldName="Language"
                      isInvalid={
                        !!errors.serviceLanguage && touched.serviceLanguage
                      }
                    />
                    {touched.serviceLanguage && errors.serviceLanguage ? (
                      <div className="text-danger">
                        {errors.serviceLanguage}
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
                      placeholder="Enter additional information"
                      onBlur={handleBlur("serviceDescription")}
                      onChange={handleChange("serviceDescription")}
                    />
                    {touched.serviceDescription && errors.serviceDescription ? (
                      <div className="text-danger">
                        {errors.serviceDescription}
                      </div>
                    ) : null}
                  </Form.Group>

                  <Button type="submit" variant="primary" className="w-100">
                    Submit Service
                  </Button>
                </Form>
              </CardBody>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RequestService;
