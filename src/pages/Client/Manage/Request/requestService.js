import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import logo from "../../../../assets/images/logo-for-white-bg.svg";
import RadioCheck from "../../../../components/Custom/RadioChecks/radioChecks";
import RadioCheckMultiple from "../../../../components/Custom/RadioChecks/multipleChecks";
import Dropdown from "../../../../components/Custom/Dropdown/Dropdown";
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

export const validationSchema = Yup.object({
  requestServiceType: Yup.string().required("Please select a service type"),
  prefferedServiceTime: Yup.array().when("requestServiceType", {
    is: "2",
    then: (schema) => schema.min(1, "At least one time slot must be selected"),
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
  serviceLanguage: Yup.array().min(1, "Please select at least one language"),
  serviceDescription: Yup.string().required(
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
    formik.setFieldValue("categoriesOfProblems", updatedCategories);
    console.log("updatedCategories", updatedCategories);

    const newSubOptions = [
      ...new Set(
        updatedCategories.flatMap((cat) => subCategoryOptions[cat] || [])
      ),
    ];
    setSubOptions(newSubOptions.map((sub) => ({ id: sub, value: sub })));
  };

  const handleSubcategoryChange = (selectedSubcategoryIds) => {
    setSelectedSubcategories(selectedSubcategoryIds);
    console.log("selectedSubcategoryIds", selectedSubcategoryIds);
    formik.setFieldValue("requestServiceSkills", selectedSubcategoryIds);
  };

  const handleServiceLangaugeChange = (language) => {
    setSelectedLanguage(language);
    console.log("serviceLanguage", language);
    formik.setFieldValue("serviceLanguage", language);
  };

  const handleServiceTimeChange = (time) => {
    setSelectedTime(time);
    console.log("Preffered Service Time", time);
    formik.setFieldValue("prefferedServiceTime", time);
  };

  const handleIssuesInCategoiesChange = (issue) => {
    setSelectedIssue(issue);
    console.log("Issues in Categories", issue);
    formik.setFieldValue("issuesInCategoriesSelected", issue);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: (values) => {
      try {
        let ssssssss = ""; // Use let instead of const and initialize as a string
        const serccccc = values.prefferedServiceTime.join(", ");

        if (serccccc.includes("8,9,10,11,12")) {
          ssssssss = "1"; // Start with "1"
        }
        if (serccccc.includes("12,13,14,15,16,17")) {
          ssssssss += ssssssss ? ", 2" : "2"; // Add ", 2" if not empty, else "2"
        }
        if (serccccc.includes("17,18,19,20,21,22")) {
          ssssssss += ssssssss ? ", 3" : "3"; // Add ", 3" if not empty, else "3"
        }
        if (serccccc.includes("22,23,00,01,02,03,04,05,06,07")) {
          ssssssss += ssssssss ? ", 4" : "4"; // Add ", 4" if not empty, else "4"
        }
        const convertedData = {
          ...values,
          prefferedServiceTime: ssssssss,
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
    if (formik.values.requestServiceType !== "2") {
      formik.setFieldValue("prefferedServiceTime", "");
      formik.setFieldValue("fromDateTime", "");
      formik.setFieldValue("toDateTime", "");
    }
  }, [formik.values.requestServiceType]);

  return (
    <div className="reqService">
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
              <Form onSubmit={formik.handleSubmit}>
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
                    selectedValue={formik.values.requestServiceType}
                    onBlur={formik.handleBlur}
                    onChange={(e) =>
                      formik.setFieldValue("requestServiceType", e.target.value)
                    }
                  />
                  {formik.touched.requestServiceType &&
                  formik.errors.requestServiceType ? (
                    <div className="text-danger">
                      {formik.errors.requestServiceType}
                    </div>
                  ) : null}
                </Form.Group>

                {formik.values.requestServiceType === "2" && (
                  <>
                    <Row className="mb-3">
                      <Col>
                        <Form.Group controlId="Time">
                          <Form.Label>
                            Preferred Service Time
                            <span className="text-danger">*</span>
                          </Form.Label>
                          <Dropdown
                            optionsList={serviceTime}
                            handleChange={handleServiceTimeChange}
                            handleBlur={() => {}}
                            values={{ preferredTime: selectedTime }}
                            isMultiSelect={true}
                            isSearchable={false}
                            valueKey="preferredTime"
                            fieldName="Time"
                          />
                          {formik.touched.prefferedServiceTime &&
                          formik.errors.prefferedServiceTime ? (
                            <div className="text-danger">
                              {formik.errors.prefferedServiceTime}
                            </div>
                          ) : null}
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
                            onBlur={formik.handleBlur}
                            onChange={(e) => {
                              formik.handleChange(e);
                              // handleTimeCheck(e);
                            }}
                          />
                          {formik.touched.fromDateTime &&
                          formik.errors.fromDateTime ? (
                            <div className="text-danger">
                              {formik.errors.fromDateTime}
                            </div>
                          ) : null}
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
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                          />
                          {formik.touched.toDateTime &&
                          formik.errors.toDateTime ? (
                            <div className="text-danger">
                              {formik.errors.toDateTime}
                            </div>
                          ) : null}
                        </Form.Group>
                      </Col>
                    </Row>
                  </>
                )}

                <Form.Group controlId="requestCategoryProblem" className="mb-3">
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
                </Form.Group>

                <Button type="submit" variant="success" block>
                  Submit Service
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RequestService;
