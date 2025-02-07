import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  CardBody,
  ProgressBar,
  ButtonGroup,
} from "react-bootstrap";
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
import { disabledPreviousDateTime } from "../../../../utils/_helpers";
import "./style.css";

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
  const [foundMatch, setFoundMatch] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);

  // Handle Next & Previous
  const nextStep = () => {
    setStep(step + 1);
  };
  const prevStep = () => {
    setStep(step - 1);
  };

  const handleCategoryChange = (category) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];

    setSelectedCategories(updatedCategories); // Update local state

    // Use Formik's setFieldValue to keep the form state in sync
    setFieldValue("categoriesOfProblems", updatedCategories);

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

    // Create a new array of matched times based on the selected ids
    const newFoundMatchTime = time.map((id) => {
      const foundTime = serviceTime.find((item) => item.id === String(id)); // Ensure id is treated as a string
      return foundTime ? foundTime.match : null; // Return the match or null if no match is found
    });

    // Set the found matches state
    setFoundMatch(newFoundMatchTime);

    // Clear date time fields if no time is selected
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
      setIsLoading(true);
      try {
        const convertedData = {
          ...values,
          categoriesOfProblems: values.categoriesOfProblems.join(", "),
          requestServiceSkills: values.requestServiceSkills.join(", "),
          serviceLanguage: values.serviceLanguage.join(", "),
          requestedServiceUserId: `${userAuth.id}`,
        };
        dispatch(requestService(convertedData)).then((response) => {
          const convertedDatas = {
            ...convertedData,
            id: response.payload,
          };
          setIsLoading(false);
          navigate("/requested-service", { state: convertedDatas });
        });
      } catch (ex) {
        setIsLoading(false);
      }
    },
  });

  useEffect(() => {
    if (values.requestServiceType !== "2") {
      setFieldValue("prefferedServiceTime", "");
      setFieldValue("fromDateTime", "");
      setFieldValue("toDateTime", "");
    }
  }, [values.requestServiceType]);

  const handleTimeChange = (dateTime) => {
    const selectedDate = new Date(dateTime);
    const selectedHour = selectedDate.getHours();

    const allMatchedHours = foundMatch.join(",");
    const hourRange = allMatchedHours
      .split(",")
      .map((hour) => parseInt(hour, 10));

    const firstHourList = [];
    const lastHourList = [];
    const unmatchedLastHours = [];

    foundMatch.forEach((timeRange) => {
      const hours = timeRange.split(",");
      firstHourList.push(hours[0]); // First hour of the range
      lastHourList.push(hours[hours.length - 1]); // Last hour of the range
    });

    lastHourList.forEach((lastHour) => {
      if (!firstHourList.includes(lastHour)) {
        unmatchedLastHours.push(parseInt(lastHour, 10));
      }
    });

    if (hourRange.includes(selectedHour)) {
      const selectedMinutes = selectedDate.getMinutes();

      if (unmatchedLastHours.includes(selectedHour) && selectedMinutes > 0) {
        selectedDate.setMinutes(0);
      }

      setFieldValue("fromDateTime", selectedDate.toISOString().slice(0, 16));
    } else {
      setFieldValue("fromDateTime", "");
    }
  };

  const handleEndTime = (dateTime) => {
    const startDateValues = values.fromDateTime;
    const startDate = new Date(startDateValues);
    const endDate = new Date(dateTime);
    if (startDate >= endDate) {
      setFieldValue("toDateTime", "");
    } else {
      setFieldValue("toDateTime", dateTime);
    }
  };

  return (
    <>
      <Container className="py-5">
        <Row className="">
          <Col
            xl={{ span: 8, offset: 2 }}
            lg={{ span: 8, offset: 2 }}
            md={{ span: 8, offset: 2 }}
            sm={12}
            xs={12}
          >
            <Card
              className="shadow border-0 rounded"
              style={{
                backgroundColor: "#f3f3f3",
              }}
            >
              <CardBody>
                <div className="text-center">
                  <h3 className="fw-semibold mt-3 text-black">
                    Request a Valet!
                  </h3>
                  <p>
                    Complete this form to help us match you with the perfect
                    Valet based on your needs.
                  </p>
                </div>
                <CardBody>
                  <ProgressBar
                    now={(step / 3) * 100}
                    label={`${Math.ceil((step / 3) * 100)}%`}
                    className="mb-3 progress-3d animated-progress"
                  />
                  <Form onSubmit={handleSubmit}>
                    {step === 1 && (
                      <>
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
                                    onChange={(e) => {
                                      handleChange("fromDateTime");
                                      handleTimeChange(e.target.value);
                                    }}
                                    min={disabledPreviousDateTime()}
                                    disabled={selectedTime.length === 0}
                                    isInvalid={
                                      !!errors.fromDateTime &&
                                      touched.fromDateTime
                                    }
                                  />
                                  {selectedTime.length === 0 && (
                                    <div className="text-danger">
                                      Please select a service time.
                                    </div>
                                  )}
                                  {touched.fromDateTime &&
                                    errors.fromDateTime && (
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
                                    onChange={(e) => {
                                      handleChange("toDateTime");
                                      handleEndTime(e.target.value);
                                    }}
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

                        <ButtonGroup className="w-100">
                          <Button
                            onClick={nextStep}
                            variant="primary-secondary"
                            className="w-100"
                          >
                            Next
                          </Button>
                        </ButtonGroup>
                      </>
                    )}

                    {step === 2 && (
                      <>
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
                            name="categoriesOfProblems"
                            selectedValues={values.categoriesOfProblems}
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

                        <ButtonGroup className="w-100">
                          <Button
                            onClick={prevStep}
                            variant="secondary-secondary"
                            className="w-100"
                          >
                            Back
                          </Button>
                          <Button
                            onClick={nextStep}
                            variant="primary-secondary"
                            className="w-100"
                          >
                            Next
                          </Button>
                        </ButtonGroup>
                      </>
                    )}

                    {step === 3 && (
                      <>
                        <Form.Group
                          controlId="SelectIssuesFound"
                          className="mb-3"
                        >
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
                              !!errors.serviceLanguage &&
                              touched.serviceLanguage
                            }
                          />
                          {touched.serviceLanguage && errors.serviceLanguage ? (
                            <div className="text-danger">
                              {errors.serviceLanguage}
                            </div>
                          ) : null}
                        </Form.Group>

                        <Form.Group
                          controlId="serviceDescription"
                          className="mb-3"
                        >
                          <Form.Label>
                            Is there anything else we should know about?
                          </Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={5}
                            placeholder="Enter additional information"
                            onBlur={handleBlur("serviceDescription")}
                            onChange={handleChange("serviceDescription")}
                            value={values.serviceDescription}
                          />
                          {touched.serviceDescription &&
                          errors.serviceDescription ? (
                            <div className="text-danger">
                              {errors.serviceDescription}
                            </div>
                          ) : null}
                        </Form.Group>
                        <div className="text-danger text-end">
                          {errors.prefferedServiceTime ||
                            errors.fromDateTime ||
                            errors.toDateTime ||
                            errors.categoriesOfProblems ||
                            errors.requestServiceSkills ||
                            errors.issuesInCategoriesSelected ||
                            errors.serviceLanguage ||
                            (errors.serviceDescription && (
                              <span>Must Fill Required Fields</span>
                            ))}
                        </div>
                        <ButtonGroup className="w-100">
                          <Button
                            onClick={prevStep}
                            variant="secondary-secondary"
                            className="w-100"
                            disabled={isLoading}
                          >
                            Back
                          </Button>
                          <Button
                            type="submit"
                            variant="primary-secondary"
                            className="w-100"
                            disabled={isLoading}
                          >
                            {isLoading ? "Submitting..." : "Submit"}
                          </Button>
                        </ButtonGroup>
                      </>
                    )}
                  </Form>
                </CardBody>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default RequestService;
