import React, { useCallback, useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { postRegister } from "../../../../redux/Actions/authActions";
import { Navigate, useParams } from "react-router-dom";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import loginPage from "../../../../assets/images/login-page.png";
import background from "../../../../assets/images/Background.svg";
import HandleImages from "../../../../components/Custom/Avatars/HandleImages";
import PasswordField from "../../../../components/Custom/PasswordInput/PasswordInput";

const Register = () => {
  const { value } = useParams();
  const dispatch = useDispatch();
  const { userAuth, loading, error } = useSelector(
    (state) => state.authentication
  );

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
    firstName: Yup.string().required("Please enter First Name"),
    lastName: Yup.string().required("Please enter Last Name"),
    username: Yup.string()
      .min(3, "Username must be at least 3 characters")
      .required("Please enter Username"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Please enter Email"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Please enter Password"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Please confirm your Password"),
    state: Yup.string().required("Please enter State"),
    city: Yup.string().required("Please enter City"),
    postalCode: Yup.string()
      .matches(/^\d{4,10}$/, "Zip Code must be 4-10 digits")
      .required("Please enter Zip Code"),
    country: Yup.string().required("Please enter Country"),
    timezone: Yup.string().required("Please enter Timezone"),
  });

  const handleSubmit = useCallback(
    (values) => {
      if (value) {
        setFieldValue("role", value);
      } else {
        console.error("Role is missing from URL parameters");
      }
      dispatch(postRegister(values));
    },
    [dispatch]
  );

  const {
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
    setFieldValue,
    handleSubmit: formikSubmit,
  } = useFormik({
    initialValues,
    validationSchema: validateLogin,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    if (userAuth?.role === "Customer") {
      <Navigate to="/" />;
    }
  }, []);

  return (
    <Container fluid>
      <Row className="vh-100">
        {/* Image Column */}
        <Col
          xl={6}
          lg={6}
          className="d-none d-lg-flex justify-content-center align-items-center p-5"
          style={{
            backgroundImage: `url(${background})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="text-center">
            <div className="position-relative mx-auto w-50">
              <HandleImages
                imagePath={loginPage}
                imageAlt="login"
                imageStyle={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "top",
                }}
              />
            </div>

            {/* Heading and Paragraph */}
            <div className="mt-4">
              <h3 className="text-dark fw-bold">Welcome to TechValet</h3>
              <p className="text-dark">
                Don't waste your skills. Create an account to provide your
                services
              </p>
            </div>
          </div>
        </Col>

        {/* Form Column */}
        <Col
          xl={6}
          lg={6}
          md={12}
          sm={12}
          xs={12}
          className="d-flex flex-column justify-content-center align-items-center"
        >
          {/* Form */}
          <div className="w-75 py-5">
            <h2 className="text-center">Create your Account</h2>
            <Form onSubmit={formikSubmit}>
              <Row>
                <Col xl={6} lg={6} md={6} sm={12} xs={12}>
                  <Form.Group className="mb-2">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="firstName"
                      required
                      placeholder="Email / Username"
                      value={values.firstName}
                      onBlur={handleBlur("firstName")}
                      onChange={handleChange("firstName")}
                      isInvalid={touched.firstName && !!errors.firstName}
                    />
                    <Form.Control.Feedback type="invalid">
                      {touched.firstName && errors.firstName}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col xl={6} lg={6} md={6} sm={12} xs={12}>
                  <Form.Group as={Col} className="mb-2">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="lastName"
                      required
                      placeholder="Last Name"
                      value={values.lastName}
                      onBlur={handleBlur("lastName")}
                      onChange={handleChange("lastName")}
                      isInvalid={touched.lastName && !!errors.lastName}
                    />
                    <Form.Control.Feedback type="invalid">
                      {touched.lastName && errors.lastName}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                {/* Username */}
                <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                  <Form.Group className="mb-2">
                    <Form.Label>
                      Username <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="username"
                      required
                      placeholder="Enter Username"
                      value={values.username}
                      onBlur={handleBlur("username")}
                      onChange={handleChange("username")}
                      isInvalid={touched.username && !!errors.username}
                    />
                    <Form.Control.Feedback type="invalid">
                      {touched.username && errors.username}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                {/* Email */}
                <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                  <Form.Group className="mb-2">
                    <Form.Label>
                      Email <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      required
                      placeholder="Enter Email"
                      value={values.email}
                      onBlur={handleBlur("email")}
                      onChange={handleChange("email")}
                      isInvalid={touched.email && !!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {touched.email && errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                {/* Password */}
                <Col xl={6} lg={6} md={6} sm={12} xs={12}>
                  <Form.Group className="mb-2">
                    <PasswordField
                      label="Password"
                      name="password"
                      placeholder="Enter your password"
                      value={values.password}
                      onBlur={handleBlur("password")}
                      onChange={handleChange("password")}
                      required={true}
                      isInvalid={touched.password && !!errors.password}
                      touched={touched.password}
                      errors={errors.password}
                    />
                  </Form.Group>
                </Col>

                {/* Confirm Password */}
                <Col xl={6} lg={6} md={6} sm={12} xs={12}>
                  <Form.Group className="mb-2">
                    <PasswordField
                      label="Confirm Password"
                      name="confirmPassword"
                      placeholder="Re-enter password"
                      value={values.confirmPassword}
                      onBlur={handleBlur("confirmPassword")}
                      onChange={handleChange("confirmPassword")}
                      required={true}
                      isInvalid={
                        touched.confirmPassword && !!errors.confirmPassword
                      }
                      touched={touched.confirmPassword}
                      errors={errors.confirmPassword}
                    />
                  </Form.Group>
                </Col>

                {/* State */}
                <Col xl={4} lg={4} md={4} sm={12} xs={12}>
                  <Form.Group className="mb-2">
                    <Form.Label>
                      State <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="state"
                      required
                      placeholder="Enter State"
                      value={values.state}
                      onBlur={handleBlur("state")}
                      onChange={handleChange("state")}
                      isInvalid={touched.state && !!errors.state}
                    />
                    <Form.Control.Feedback type="invalid">
                      {touched.state && errors.state}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                {/* City */}
                <Col xl={4} lg={4} md={4} sm={12} xs={12}>
                  <Form.Group className="mb-2">
                    <Form.Label>
                      City <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="city"
                      required
                      placeholder="Enter City"
                      value={values.city}
                      onBlur={handleBlur("city")}
                      onChange={handleChange("city")}
                      isInvalid={touched.city && !!errors.city}
                    />
                    <Form.Control.Feedback type="invalid">
                      {touched.city && errors.city}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                {/* Postal Code/Zip Code */}
                <Col xl={4} lg={4} md={4} sm={12} xs={12}>
                  <Form.Group className="mb-2">
                    <Form.Label>
                      Zip Code
                      <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="postalCode"
                      required
                      placeholder="Enter Zip Code"
                      value={values.postalCode}
                      onBlur={handleBlur("postalCode")}
                      onChange={handleChange("postalCode")}
                      isInvalid={touched.postalCode && !!errors.postalCode}
                    />
                    <Form.Control.Feedback type="invalid">
                      {touched.postalCode && errors.postalCode}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                {/* Timezone */}
                <Col xl={6} lg={6} md={6} sm={12} xs={12}>
                  <Form.Group className="mb-2">
                    <Form.Label>
                      Timezone <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="timezone"
                      required
                      placeholder="Enter Timezone"
                      value={values.timezone}
                      onBlur={handleBlur("timezone")}
                      onChange={handleChange("timezone")}
                      isInvalid={touched.timezone && !!errors.timezone}
                    />
                    <Form.Control.Feedback type="invalid">
                      {touched.timezone && errors.timezone}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                {/* Country */}
                <Col xl={6} lg={6} md={6} sm={12} xs={12}>
                  <Form.Group className="mb-4">
                    <Form.Label>
                      Country <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="country"
                      required
                      placeholder="Enter Country"
                      value={values.country}
                      onBlur={handleBlur("country")}
                      onChange={handleChange("country")}
                      isInvalid={touched.country && !!errors.country}
                    />
                    <Form.Control.Feedback type="invalid">
                      {touched.country && errors.country}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col sm={12} className="text-center">
                  <Button
                    className="btn-md w-100 text-uppercase"
                    variant="primary"
                    type="submit"
                  >
                    {loading ? (
                      <Spinner animation="border" size="sm" />
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
