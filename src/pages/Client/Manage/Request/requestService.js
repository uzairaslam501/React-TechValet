import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import logo from "../../../../assets/images/logo-for-white-bg.svg";
import RadioCheck from "../../../../components/Custom/RadioChecks/radioChecks";
import RadioCheckMultiple from "../../../../components/Custom/RadioChecks/multipleChecks";
import Dropdown from "../../../../components/Custom/Dropdown/Dropdown";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { requestService } from "../../../../redux/Actions/customerActions";

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

const problemOptions = [
  { label: "Software", value: "Software" },
  { label: "Computer OS", value: "Computer Setup" },
  { label: "Smartwear-watch", value: "Smartwear watch" },
  {
    label: "Smartphone And Tablet Setup",
    value: "Smartphone And TabletSetup",
  },
  { label: "Printer / Scanner / Copiers", value: "Printer Scanner Copiers" },
  { label: "Server", value: "Server" },
  { label: "Email", value: "Email" },
  { label: "Internet", value: "Internet" },
  { label: "Website", value: "Website" },
  { label: "Device troubleshooting", value: "Device troubleshooting" },
];

const subCategoryOptions = {
  Software: [
    "Microsoft Office Suite",
    "G-Doc",
    "Notepad",
    "Google Sheets",
    "Google Chrome",
    "Safari",
    "Firefox",
    "Adobe Photoshop",
    "CorelDraw",
    "AutoCAD",
    "Paintshop",
    "Skype",
    "Hangouts",
    "Google Meet",
    "Zoom",
    "Whatsapp",
    "Teams",
    "Google Classroom",
    "MX Player",
    "VLC Media Player",
    "Spotify",
    "Pandora Technologies",
    "Asana",
    "Zoho",
    "Slack",
    "Forecast",
    "Trello",
    "Airtable",
    "Oracle",
    "Digital Cameras",
    "IPad",
    "Samsung",
    "LG",
    "TV",
    "Bell",
    "Rogers",
  ],
  "Computer Setup": ["Windows", "Mac", "Chromebook"],
  "Smartphone And TabletSetup": ["Apple", "Android"],
  "Printer Scanner Copiers": ["Printer", "Scanner", "Copiers"],
  "Smartwear watch": ["Smartwear watch"],
  Server: ["Server"],
  Email: ["Email"],
  Internet: ["Internet"],
  Website: ["Website"],
  "Device troubleshooting": ["Device troubleshooting"],
  Others: ["Others"],
};

const issuesInCategories = [
  { id: "Slow/Delayed", value: "Slow / Delayed" },
  { id: "Voicemail", value: "Voicemail" },
  { id: "Update Software", value: "Update Software" },
  { id: "Install Software", value: "Install Software" },
  { id: "Password/Login", value: "Password/Login" },
  { id: "Email", value: "Email" },
  { id: "WiFi connection", value: "WiFi connection" },
  { id: "Bluetooth Connection", value: "Bluetooth Connection" },
  { id: "Specific App Problem", value: "Specific App Problem" },
  { id: "Specific Software Problem", value: "Specific Software Problem" },
  { id: "Virus/Malware", value: "Virus / Malware" },
  { id: "Backup Issues", value: "Backup Issues" },
  { id: "File Restore", value: "File Restore" },
  { id: "Format", value: "Format" },
];

const initialValues = {
  requestServiceType: "Schedule",
  prefferedServiceTime: "",
  fromDateTime: "",
  toDateTime: "",
  categoriesOfProblems: "",
  requestServiceSkills: "",
  issuesInCategoriesSelected: "",
  serviceLanguage: [],
  serviceDescription: "",
};

const validationSchema = Yup.object({
  requestServiceType: Yup.string().required("Please select a service type"),
  prefferedServiceTime: Yup.array().when("requestServiceType", {
    is: "Schedule",
    then: (schema) => schema.min(1, "At least one time slot must be selected"),
    otherwise: (schema) => schema.nullable(),
  }),
  fromDateTime: Yup.date().when("requestServiceType", {
    is: "Schedule",
    then: (schema) =>
      schema
        .required("Please select a start date and time")
        .typeError("Invalid date format"),
    otherwise: (schema) => schema.nullable(),
  }),
  toDateTime: Yup.date().when("requestServiceType", {
    is: "Schedule",
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

const languageOptions = [
  { id: "english", value: "English" },
  { id: "french", value: "French" },
  { id: "deutsch", value: "Deutsch" },
  { id: "portugese", value: "Portuguêse" },
  { id: "mandarin", value: "Mandarin" },
  { id: "cantonese", value: "Yue (Cantonese)" },
  { id: "spanish", value: "Spanish" },
  { id: "tagalog", value: "Tagalog (Filipino)" },
  { id: "russian", value: "Russian" },
  { id: "chinese", value: "Chinese" },
  { id: "korean", value: "Korean" },
  { id: "persian", value: "Persian" },
  { id: "italian", value: "Italian" },
  { id: "vietnamese", value: "Vietnamese" },
  { id: "dutch", value: "Dutch" },
];

const RequestService = () => {
  const dispatch = useDispatch();
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
        const convertedData = {
          ...values,
          categoriesOfProblems: values.categoriesOfProblems.join(", "),
          prefferedServiceTime: values.prefferedServiceTime.join(", "),
          requestServiceSkills: values.requestServiceSkills.join(", "),
          serviceLanguage: values.serviceLanguage.join(", "),
        };
        dispatch(requestService(convertedData)).then((response) => {
          console.log("dipatched", response);
        });
      } catch (ex) {}
    },
  });

  useEffect(() => {
    if (formik.values.requestServiceType !== "schedule") {
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
            <img src={logo} style={{ width: "100%", height: "500px" }} />
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

                {formik.values.requestServiceType === "Schedule" && (
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
                            onChange={formik.handleChange}
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
