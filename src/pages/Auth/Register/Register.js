import * as Yup from "yup";
import { useFormik } from "formik";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postRegister } from "../../../redux/Actions/authActions";
import { Navigate, NavLink, useNavigate, useParams } from "react-router-dom";
import {
  Button,
  ButtonGroup,
  Card,
  Col,
  Container,
  Form,
  OverlayTrigger,
  Row,
  Spinner,
  Tooltip,
} from "react-bootstrap";

import PasswordField from "../../../components/Custom/PasswordInput/PasswordInput";
import { getTimezones } from "../../../redux/Actions/globalActions";
import UsernameInput from "../../../components/Custom/Username/HandleUsername";
import ScrollToTop from "../../../theme/scrollToTop";
import DynamicBackground from "../../../components/Custom/Background/DynamicBackground";

const UserRegisteration = () => {
  const { value } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [step, setStep] = useState(0);
  const [timeZones, setTimeZones] = useState([]);
  const [isValidPassword, setIsPasswordValid] = useState(false);
  const { userAuth, loading, error } = useSelector(
    (state) => state.authentication
  );

  const steps = [
    "Enter Your Name",
    "Choose a Username",
    "Enter Your Email",
    "Set a Password",
    "Select Your Timezone",
  ];

  const stepFields = {
    0: ["firstname", "lastname"],
    1: ["username"],
    2: ["email"],
    3: ["password", "confirmPassword"],
    4: ["timezone"],
  };

  const initialValues = {
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: value || "",
    state: "",
    city: "",
    postalCode: "",
    country: "",
    timezone: "",
  };

  const validateLogin = Yup.object().shape({
    firstname: Yup.string()
      .min(3, "First Name must be at least 3 characters")
      .required("Please enter First Name"),
    lastname: Yup.string()
      .min(3, "Last Name must be at least 3 characters")
      .required("Please enter Last Name"),
    username: Yup.string()
      .min(3, "Username must be at least 3 characters")
      .matches(
        /^[a-zA-Z0-9_]+$/,
        "Only letters, numbers, and underscores are allowed"
      )
      .required("Please enter Username"),
    email: Yup.string()
      .matches(
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/,
        "Please enter a valid email"
      )
      .required("Please enter Email"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Please enter Password"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Please confirm your Password"),
    timezone: Yup.string().required("Please enter Timezone"),
  });

  const handleSubmit = useCallback(
    (values, { resetForm }) => {
      dispatch(postRegister(values)).then((res) => {
        if (res?.payload) {
          resetForm();
          navigate("/login");
        }
      });
    },
    [dispatch, navigate]
  );

  const {
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
    setFieldValue,
    setFieldTouched,
    handleSubmit: formikSubmit,
  } = useFormik({
    initialValues,
    validationSchema: validateLogin,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: handleSubmit,
  });

  const fetchTimeZones = useCallback(() => {
    dispatch(getTimezones())
      .then((response) => {
        console.log("timezones", response?.payload);
        setTimeZones(Object.values(response?.payload));
      })
      .catch((error) => {
        console.log(error);
      });
  });

  const handleNext = () => {
    const currentFields = stepFields[step];
    const hasErrors = currentFields.some(
      (field) => !values[field] || errors[field]
    );

    if (hasErrors) {
      currentFields.forEach((field) => {
        setFieldTouched(field, true, true); // Mark fields as touched to show validation errors
      });
    } else {
      if (step < steps.length - 1) {
        setStep(step + 1);
      }
    }
  };

  const handlePrev = () => {
    if (step > 0) setStep(step - 1);
  };

  if (userAuth?.role === "Customer") {
    <Navigate to="/" />;
  }

  useEffect(() => {
    fetchTimeZones();
  }, [userAuth]);

  useEffect(() => {
    setFieldValue("role", value);
  }, [value]);

  return (
    <>
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          minHeight: "100vh",
          background: "#eee",
        }}
      >
        <Container className="d-flex justify-content-center align-items-center vh-100">
          <Row className="w-100 justify-content-center">
            <Col xl={6} lg={6} md={8} sm={10} xs={12}>
              <Form
                className="row w-100 p-4 shadow-lg rounded-4 border border-3"
                style={{
                  background: "#e9e9e9",
                  boxShadow: "10px 10px 0px rgba(0, 0, 0, 0.2)",
                  borderColor: "#ff69b4",
                  zIndex: 1,
                  //fontFamily: "'Comic Sans MS', cursive, sans-serif",
                }}
                onSubmit={formikSubmit}
              >
                <h2
                  className="text-center mb-0"
                  style={{
                    color: "#333",
                    textShadow: "2px 2px 0px rgba(0, 0, 0, 0.2)",
                    fontSize: "2rem",
                  }}
                >
                  {steps[step]}
                </h2>
                <span className="text-danger text-center">
                  All (*) fields are required
                </span>
                {step === 0 && (
                  <>
                    <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                      <Form.Group className="mb-2">
                        <Form.Label className="fs-5">
                          First Name <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="firstname"
                          placeholder="First Name"
                          value={values.firstname}
                          onBlur={handleBlur("firstname")}
                          onChange={handleChange("firstname")}
                          isInvalid={touched.firstname && !!errors.firstname}
                          className="fs-5"
                          style={{
                            borderColor: "#000",
                            transition: "0.3s",
                          }}
                        />
                        <Form.Control.Feedback type="invalid">
                          {touched.firstname && errors.firstname}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    {/* Last Name */}
                    <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                      <Form.Group as={Col} className="mb-2">
                        <Form.Label className="fs-5">
                          Last Name <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="lastname"
                          placeholder="Last Name"
                          value={values.lastname}
                          onBlur={handleBlur("lastname")}
                          onChange={handleChange("lastname")}
                          isInvalid={touched.lastname && !!errors.lastname}
                          className="fs-5"
                          style={{
                            borderColor: "#000",
                            transition: "0.3s",
                          }}
                        />
                        <Form.Control.Feedback type="invalid">
                          {touched.lastname && errors.lastname}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </>
                )}

                {step === 1 && (
                  <>
                    <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                      <Form.Group className="mb-2">
                        <UsernameInput
                          value={values.username}
                          onChange={handleChange("username")}
                          onBlur={handleBlur("username")}
                          error={errors.username}
                          touched={touched.username}
                          firstName={values.firstname}
                          lastName={values.lastname}
                          formLabelClass="fs-5"
                          inputFieldClass="fs-5"
                          style={{
                            borderColor: "#000",
                            transition: "0.3s",
                          }}
                        />
                      </Form.Group>
                    </Col>
                  </>
                )}

                {step === 2 && (
                  <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                    <Form.Group className="mb-2">
                      <Form.Label className="fs-5">
                        Email <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        placeholder="Enter Email"
                        value={values.email}
                        onBlur={handleBlur("email")}
                        onChange={handleChange("email")}
                        isInvalid={touched.email && !!errors.email}
                        className="fs-5"
                        style={{
                          borderColor: "#000",
                          transition: "0.3s",
                        }}
                      />
                      <Form.Control.Feedback type="invalid">
                        {touched.email && errors.email}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                )}

                {step === 3 && (
                  <>
                    {/* Password */}
                    <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                      <Form.Group className="mb-2">
                        <PasswordField
                          label="Password"
                          name="password"
                          placeholder="*********"
                          required={true}
                          value={values.password}
                          onBlur={handleBlur("password")}
                          onChange={handleChange("password")}
                          isInvalid={touched.password && !!errors.password}
                          touched={touched.password}
                          errors={errors.password}
                          size="md"
                          instructions={true}
                          setIsPasswordValid={setIsPasswordValid}
                          formlabelClass="fs-5"
                          inputFieldClass="fs-5"
                          style={{
                            borderColor: "#000",
                            transition: "0.3s",
                          }}
                        />
                      </Form.Group>
                    </Col>

                    {/* Confirm Password */}
                    <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                      <Form.Group className="mb-2">
                        <PasswordField
                          label="Confirm Password"
                          name="confirmPassword"
                          placeholder="*********"
                          required={true}
                          value={values.confirmPassword}
                          onBlur={handleBlur("confirmPassword")}
                          onChange={handleChange("confirmPassword")}
                          isInvalid={
                            touched.confirmPassword && !!errors.confirmPassword
                          }
                          touched={touched.confirmPassword}
                          errors={errors.confirmPassword}
                          size="md"
                          formlabelClass="fs-5"
                          inputFieldClass="fs-5"
                          style={{
                            borderColor: "#000",
                            transition: "0.3s",
                          }}
                        />
                      </Form.Group>
                    </Col>
                  </>
                )}

                {step === 4 && (
                  <>
                    <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                      <Form.Group className="mb-2">
                        <Form.Label className="fs-5">
                          Timezone <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                          as="select"
                          value={values?.timezone || ""}
                          onChange={(e) => {
                            const selectedZone = e.target.value;
                            setFieldValue("timezone", selectedZone);
                          }}
                          isInvalid={touched.timezone && !!errors.timezone}
                          className="fs-5"
                          style={{
                            borderColor: "#000",
                            transition: "0.3s",
                          }}
                        >
                          <option value="">Select Timezone</option>
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
                      </Form.Group>
                    </Col>

                    <Col
                      xl={12}
                      lg={12}
                      md={12}
                      sm={12}
                      xs={12}
                      className="mb-3"
                    >
                      <OverlayTrigger
                        placement="top"
                        overlay={
                          <Tooltip id="switch-tooltip">
                            {value === "valet"
                              ? "You are registering as a valet."
                              : "You are registering as a customer."}
                          </Tooltip>
                        }
                      >
                        <Form.Check
                          type="switch"
                          id="custom-switch"
                          label={
                            value === "valet"
                              ? "Registering as Valet"
                              : "Registering as Customer"
                          }
                          checked={value === "valet"}
                          onChange={(e) => {
                            if (e.target.checked) {
                              navigate("/register/valet");
                            } else {
                              navigate("/register/customer");
                            }
                          }}
                          className="fs-5"
                        />
                      </OverlayTrigger>
                    </Col>
                  </>
                )}

                <ButtonGroup className="mt-3 d-flex justify-content-between">
                  {step > 0 && (
                    <a
                      className="fs-5 btn btn-secondary-secondary"
                      onClick={handlePrev}
                    >
                      Back
                    </a>
                  )}
                  {step < steps.length - 1 ? (
                    <a
                      className="fs-5 btn btn-primary"
                      onClick={handleNext}
                      disabled={stepFields[step].some(
                        (field) => !values[field] || errors[field]
                      )}
                    >
                      Next
                    </a>
                  ) : (
                    <Button
                      className="fs-5"
                      variant="primary"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? (
                        <Spinner animation="border" size="sm" />
                      ) : (
                        `Sign Up as ${
                          value === "valet" ? "Tech Valet" : "a Customer"
                        }`
                      )}
                    </Button>
                  )}
                </ButtonGroup>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default UserRegisteration;
