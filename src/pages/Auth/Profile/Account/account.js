import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { getRecordById } from "../../../../redux/Actions/globalActions";
import {
  Form,
  Button,
  Row,
  Col,
  FormControl,
  FormGroup,
  FormLabel,
  Spinner,
  Card,
} from "react-bootstrap";
import { countries } from "../../../../utils/client/data/countries";
import CustomPhoneInput from "../../../../components/Custom/PhoneInput/PhoneInput";
import { languageOptions } from "../../../../utils/client/data/requestedData";
import CustomDropdown from "../../../../components/Custom/Dropdown/Dropdown";
import { calculateMaxDate } from "../../../../utils/_helpers";
import { postUserUpdate } from "../../../../redux/Actions/authActions";
import Slots from "../ValetProfile/Slots/Slots";

const validation = Yup.object().shape({
  firstName: Yup.string()
    .min(3, "First Name must be at least 3 characters")
    .required("First Name is required"),
  lastName: Yup.string()
    .min(3, "Last Name must be at least 3 characters")
    .required("Last Name is required"),
  userName: Yup.string()
    .min(3, "Username must be at least 5 characters")
    .required("Username is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  description: Yup.string().max(
    250,
    "Description cannot exceed 250 characters"
  ),
  contact: Yup.string()
    .min(10, "Contact must be at least 10 digits")
    .required("Contact is required"),
  birthDate: Yup.date()
    .max(new Date(), "Birth Date cannot be in the future")
    .required("Birth Date is required"),
  gender: Yup.string().required("Gender is required"),
  state: Yup.string().required("State is required"),
  city: Yup.string().required("City is required"),
  zipCode: Yup.string().required("Zip Code is required"),
  country: Yup.string().required("Country is required"),
  language: Yup.string().required("Language is required"),
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
        <Card className="shadow rounded bg-white mb-3">
          <Card.Body>
            <div className="border-bottom mb-3">
              <Row>
                <Col xl={6} lg={6} md={6} sm={12} xs={12}>
                  <h4>
                    Welcome <b>{values?.userName || "User"}!</b>
                  </h4>
                </Col>
                {userRecord && userRecord?.role === "Valet" && (
                  <Col
                    xl={6}
                    lg={6}
                    md={6}
                    sm={12}
                    xs={12}
                    className="text-end"
                  >
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
              <Col xl={6} lg={6} md={6} sm={12} xs={12} className="mb-2">
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
                </FormGroup>
              </Col>
              <Col xl={6} lg={6} md={6} sm={12} xs={12} className="mb-2">
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
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xl={6} lg={6} md={6} sm={12} xs={12} className="mb-2">
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
                </FormGroup>
              </Col>
              <Col xl={6} lg={6} md={6} sm={12} xs={12} className="mb-2">
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
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xl={12} lg={12} md={12} sm={12} xs={12} className="mb-2">
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
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xl={6} lg={6} md={6} sm={12} xs={12} className="mb-2">
                <FormGroup>
                  <FormLabel>
                    Contact <span className="text-danger">*</span>
                  </FormLabel>
                  <CustomPhoneInput
                    placeholder="Enter phone number"
                    className="form-control"
                    name="Contact"
                    value={values.contact}
                    onChange={(value) => setFieldValue("contact", value)}
                    onBlur={handleBlur("contact")}
                    countryFilter={[]}
                  />
                </FormGroup>
              </Col>
              <Col xl={6} lg={6} md={6} sm={12} xs={12} className="mb-2">
                <FormGroup>
                  <FormLabel>
                    Birth Date <span className="text-danger">*</span>
                  </FormLabel>
                  <FormControl
                    type="date"
                    value={values.birthDate}
                    onChange={handleChange("birthDate")}
                    onBlur={handleBlur("birthDate")}
                    isInvalid={!!errors.birthDate && touched.birthDate}
                    max={calculateMaxDate(18).toISOString().split("T")[0]}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xl={12} lg={12} md={12} sm={12} xs={12} className="mb-2">
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
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xl={6} lg={6} md={6} sm={12} xs={12} className="mb-2">
                <FormGroup>
                  <FormLabel>
                    City <span className="text-danger">*</span>
                  </FormLabel>
                  <FormControl
                    type="text"
                    placeholder="City"
                    value={values.city}
                    onChange={handleChange("city")}
                    onBlur={handleBlur("city")}
                    isInvalid={!!errors.city && touched.city}
                  />
                </FormGroup>
              </Col>

              <Col xl={6} lg={6} md={6} sm={12} xs={12} className="mb-2">
                <FormGroup>
                  <FormLabel>
                    State <span className="text-danger">*</span>
                  </FormLabel>
                  <FormControl
                    type="text"
                    placeholder="State"
                    value={values.state}
                    onChange={handleChange("state")}
                    onBlur={handleBlur("state")}
                    isInvalid={!!errors.state && touched.state}
                  />
                </FormGroup>
              </Col>

              <Col xl={6} lg={6} md={6} sm={12} xs={12} className="mb-2">
                <FormGroup>
                  <FormLabel>
                    Postal Code/Zip Code <span className="text-danger">*</span>
                  </FormLabel>
                  <FormControl
                    type="text"
                    placeholder="Zip Code"
                    value={values.zipCode}
                    onChange={handleChange("zipCode")}
                    onBlur={handleBlur("zipCode")}
                    isInvalid={!!errors.zipCode && touched.zipCode}
                  />
                </FormGroup>
              </Col>

              <Col xl={6} lg={6} md={6} sm={12} xs={12} className="mb-2">
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
              <Col xl={12} lg={12} md={12} sm={12} xs={12} className="mb-2">
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
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xl={12} lg={12} md={12} sm={12} xs={12} className="mb-2">
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
                <span className="text-danger">
                  {errors.firstName ||
                    errors.lastName ||
                    errors.userName ||
                    errors.email ||
                    errors.description ||
                    errors.contact ||
                    errors.birthDate ||
                    errors.gender ||
                    errors.state ||
                    errors.city ||
                    errors.zipCode ||
                    errors.country ||
                    errors.language ||
                    errors.timezone}
                </span>
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
          </Card.Body>
        </Card>
      </Form>
    </>
  );
};

export default Account;
