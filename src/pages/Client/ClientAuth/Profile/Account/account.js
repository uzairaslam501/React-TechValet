import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { getRecordById } from "../../../../../redux/Actions/globalActions";
import {
  Form,
  Button,
  Row,
  Col,
  FormControl,
  FormGroup,
  FormLabel,
  Spinner,
} from "react-bootstrap";
import { countries } from "../../../../../utils/client/data/countries";
import CustomPhoneInput from "../../../../../components/Custom/PhoneInput/PhoneInput";
import { languageOptions } from "../../../../../utils/client/data/requestedData";
import CustomDropdown from "../../../../../components/Custom/Dropdown/Dropdown";
import { calculateMaxDate } from "../../../../../utils/_helpers";
import { postUserUpdate } from "../../../../../redux/Actions/authActions";
import Slots from "../ValetProfile/Slots/Slots";

const validation = Yup.object().shape({
  firstName: Yup.string()
    .min(3, "First Name must be at least 3 characters")
    .required("Please enter First Name"),
  lastName: Yup.string()
    .min(3, "Last Name must be at least 3 characters")
    .required("Please enter Last Name"),
  userName: Yup.string()
    .min(5, "Username must be at least 5 characters")
    .required("Please enter a Username"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Please enter an Email"),
  description: Yup.string().max(
    250,
    "Description cannot exceed 250 characters"
  ),
  contact: Yup.string()
    .min(10, "Contact must be at least 10 digits")
    .required("Please enter Contact"),
  birthDate: Yup.date()
    .max(new Date(), "Birth Date cannot be in the future")
    .required("Please enter Birth Date"),
  gender: Yup.string().required("Please select Gender"),
  state: Yup.string().required("Please enter State"),
  city: Yup.string().required("Please enter City"),
  zipCode: Yup.string().required("Please enter Zip Code"),
  country: Yup.string().required("Please select a Country"),
  language: Yup.string().required("Please select a Language"),
});

const Account = ({ userRecord }) => {
  const dispatch = useDispatch();
  const [timeZones, setTimeZones] = useState([]);
  const [updateProfileLoader, setUpdateProfileLoader] = useState(false);
  const [selectedPreferredLanguage, setSelectedPreferredLanguage] = useState(
    []
  );

  const fetchTimeZones = () => {
    dispatch(getRecordById(`/Admin/GetTimeZones`)).then((response) => {
      setTimeZones(Object.values(response.payload));
    });
  };

  //#region Language Handle
  const handlePreferredLanguage = (val) => {
    setSelectedPreferredLanguage(val);
    setFieldValue("language", val.join(","));
  };
  //#endregion Language

  const initialValues = {
    firstName: userRecord.firstName || "",
    lastName: userRecord.lastName || "",
    userName: userRecord.userName || "",
    email: userRecord.email || "",
    description: userRecord.description || "",
    contact: userRecord.contact || "",
    birthDate: userRecord.birthDate || "",
    gender: userRecord.gender || "",
    state: userRecord.state || "",
    city: userRecord.city || "",
    zipCode: userRecord.zipCode || "",
    country: userRecord.country || "",
    language: userRecord.language || "",
    timezone: userRecord.timezone || "",
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
    initialValues: initialValues,
    validationSchema: validation,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: (values) => {
      try {
        setUpdateProfileLoader(true);
        dispatch(
          postUserUpdate({ userId: userRecord.userEncId, userData: values })
        ).then((response) => {
          setUpdateProfileLoader(false);
        });
      } catch (error) {
        console.log("error", error);
        setUpdateProfileLoader(false);
      } finally {
      }
    },
  });

  useEffect(() => {
    fetchTimeZones();
    setSelectedPreferredLanguage(userRecord?.language?.split(","));
  }, [userRecord?.timezone]);

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <div className="shadow rounded bg-white mb-3 p-3">
          <div className="border-bottom mb-3">
            <Row>
              <Col xl={6} lg={6} md={6} sm={12} xs={12}>
                <h4>
                  Welcome <b>{values?.userName || "User"}!</b>
                </h4>
              </Col>
              {userRecord && userRecord?.role === "Valet" && (
                <Col xl={6} lg={6} md={6} sm={12} xs={12} className="text-end">
                  <Slots userRecord={userRecord} />
                </Col>
              )}
            </Row>
            <Row>
              <Col>
                <h6>Edit Basic Info:</h6>
              </Col>
            </Row>
          </div>
          <Row>
            <Col sm={6} className="mb-2">
              <FormGroup>
                <FormLabel>
                  First Name <span className="text-danger">*</span>
                </FormLabel>
                <FormControl
                  type="text"
                  placeholder="First Name"
                  value={values.firstName}
                  onChange={handleChange("firstName")}
                  onBlur={handleBlur("firstName")}
                  isInvalid={!!errors.firstName && touched.firstName}
                />
                <Form.Control.Feedback type="invalid">
                  {touched.firstName && errors.firstName}
                </Form.Control.Feedback>
              </FormGroup>
            </Col>
            <Col sm={6} className="mb-2">
              <FormGroup>
                <FormLabel>
                  Last Name <span className="text-danger">*</span>
                </FormLabel>
                <FormControl
                  type="text"
                  placeholder="Last Name"
                  value={values.lastName}
                  onChange={handleChange("lastName")}
                  onBlur={handleBlur("lastName")}
                  isInvalid={!!errors.lastName && touched.lastName}
                />
                <Form.Control.Feedback type="invalid">
                  {touched.lastName && errors.lastName}
                </Form.Control.Feedback>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col sm={6} className="mb-2">
              <FormGroup>
                <FormLabel>
                  Username <span className="text-danger">*</span>
                </FormLabel>
                <FormControl
                  type="text"
                  placeholder="Username"
                  disabled
                  value={values.userName}
                  onChange={handleChange("userName")}
                  onBlur={handleBlur("userName")}
                  isInvalid={!!errors.userName && touched.userName}
                />
                <Form.Control.Feedback type="invalid">
                  {touched.userName && errors.userName}
                </Form.Control.Feedback>
              </FormGroup>
            </Col>
            <Col sm={6} className="mb-2">
              <FormGroup>
                <FormLabel>
                  Email <span className="text-danger">*</span>
                </FormLabel>
                <FormControl
                  type="email"
                  placeholder="Email"
                  disabled
                  value={values.email}
                  onChange={handleChange("email")}
                  onBlur={handleBlur("email")}
                  isInvalid={!!errors.email && touched.email}
                />
                <Form.Control.Feedback type="invalid">
                  {touched.email && errors.email}
                </Form.Control.Feedback>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col sm={12} className="mb-2">
              <FormGroup>
                <FormLabel>About</FormLabel>
                <FormControl
                  as="textarea"
                  rows={4}
                  placeholder="Write something about yourself"
                  value={values.description}
                  onChange={handleChange("description")}
                  onBlur={handleBlur("description")}
                  isInvalid={!!errors.description && touched.description}
                />
                <Form.Control.Feedback type="invalid">
                  {touched.description && errors.description}
                </Form.Control.Feedback>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col sm={6} className="mb-2">
              <FormGroup>
                <FormLabel>Contact</FormLabel>
                <CustomPhoneInput
                  placeholder="Enter phone number"
                  className="form-control"
                  name="Contact"
                  value={values.contact}
                  onChange={(value) => setFieldValue("contact", value)}
                  onBlur={handleBlur("contact")}
                  countryFilter={["ca"]}
                />
                <Form.Control.Feedback type="invalid">
                  {touched.contact && errors.contact}
                </Form.Control.Feedback>
              </FormGroup>
            </Col>
            <Col sm={6} className="mb-2">
              <FormGroup>
                <FormLabel>
                  Birth Date <span className="text-danger">*</span>
                </FormLabel>
                <FormControl
                  type="date"
                  required
                  value={values.birthDate}
                  onChange={handleChange("birthDate")}
                  onBlur={handleBlur("birthDate")}
                  isInvalid={!!errors.birthDate && touched.birthDate}
                  max={calculateMaxDate(18).toISOString().split("T")[0]}
                />
                <Form.Control.Feedback type="invalid">
                  {touched.birthDate && errors.birthDate}
                </Form.Control.Feedback>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col sm={12} className="mb-2">
              <FormGroup>
                <FormLabel>
                  Gender <span className="text-danger">*</span>
                </FormLabel>
                <FormControl
                  as="select"
                  name="gender"
                  value={values.gender}
                  onChange={handleChange("gender")}
                  onBlur={handleBlur("gender")}
                  isInvalid={!!errors.gender && touched.gender}
                >
                  <option value="">-- Select Gender --</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </FormControl>
                <Form.Control.Feedback type="invalid">
                  {touched.gender && errors.gender}
                </Form.Control.Feedback>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col sm={6} className="mb-2">
              <FormGroup>
                <FormLabel>
                  City <span className="text-danger">*</span>
                </FormLabel>
                <FormControl
                  type="text"
                  placeholder="City"
                  required
                  value={values.city}
                  onChange={handleChange("city")}
                  onBlur={handleBlur("city")}
                  isInvalid={!!errors.city && touched.city}
                />
                <Form.Control.Feedback type="invalid">
                  {touched.city && errors.city}
                </Form.Control.Feedback>
              </FormGroup>
            </Col>

            <Col sm={6} className="mb-2">
              <FormGroup>
                <FormLabel>
                  State <span className="text-danger">*</span>
                </FormLabel>
                <FormControl
                  type="text"
                  placeholder="State"
                  required
                  value={values.state}
                  onChange={handleChange("state")}
                  onBlur={handleBlur("state")}
                  isInvalid={!!errors.state && touched.state}
                />
                <Form.Control.Feedback type="invalid">
                  {touched.state && errors.state}
                </Form.Control.Feedback>
              </FormGroup>
            </Col>

            <Col sm={6} className="mb-2">
              <FormGroup>
                <FormLabel>
                  Postal Code/Zip Code <span className="text-danger">*</span>
                </FormLabel>
                <FormControl
                  type="text"
                  placeholder="Zip Code"
                  required
                  value={values.zipCode}
                  onChange={handleChange("zipCode")}
                  onBlur={handleBlur("zipCode")}
                  isInvalid={!!errors.zipCode && touched.zipCode}
                />
                <Form.Control.Feedback type="invalid">
                  {touched.zipCode && errors.zipCode}
                </Form.Control.Feedback>
              </FormGroup>
            </Col>

            <Col sm={6} className="mb-2">
              <FormGroup>
                <FormLabel>
                  Country <span className="text-danger">*</span>
                </FormLabel>
                <Form.Control
                  as="select"
                  value={userRecord?.country || ""}
                  onChange={(e) => {
                    const selectedCountry = e.target.value;
                    setFieldValue("country", selectedCountry);
                  }}
                >
                  {countries.map((value, key) => {
                    return (
                      <option key={key} value={value.value}>
                        {value.name}
                      </option>
                    );
                  })}
                </Form.Control>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col sm={12} className="mb-2">
              <FormGroup>
                <FormLabel>Preferred Language</FormLabel>
                <CustomDropdown
                  optionsList={languageOptions}
                  selectedOptions={selectedPreferredLanguage || []}
                  handleChange={handlePreferredLanguage}
                  isMultiSelect={true}
                  isSearchable={false}
                  fieldName="Language"
                  isInvalid={!!errors.language && touched.language}
                />
                <Form.Control.Feedback type="invalid">
                  {touched.language && errors.language}
                </Form.Control.Feedback>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col sm={12} className="mb-2">
              <FormGroup>
                <FormLabel>
                  Timezone <span className="text-danger">*</span>
                </FormLabel>
                <Form.Control
                  as="select"
                  value={userRecord?.timezone || ""}
                  onChange={(e) => {
                    const selectedZone = e.target.value;
                    setFieldValue("timeZone", selectedZone);
                  }}
                >
                  <option value="" disabled>
                    -- Select Timezone --
                  </option>
                  {timeZones.length > 0 &&
                    timeZones.map((zone) => (
                      <option key={zone} value={zone}>
                        {zone}
                      </option>
                    ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  {touched.timezone && errors.timezone}
                </Form.Control.Feedback>
              </FormGroup>
            </Col>
          </Row>
          <Row className="py-2">
            <Col
              xl={{ span: 4, offset: 8 }}
              lg={{ span: 4, offset: 8 }}
              md={{ span: 4, offset: 8 }}
              sm={{ span: 12 }}
              xs={{ span: 12 }}
              className="text-end"
            >
              <Button
                type="submit"
                variant="secondary-secondary w-100"
                size="sm"
                disabled={updateProfileLoader}
              >
                {updateProfileLoader ? (
                  <Spinner animation="border" size="sm" className="me-1" />
                ) : (
                  "Update Profile"
                )}
              </Button>
            </Col>
          </Row>
        </div>
      </Form>
    </>
  );
};

export default Account;
