import * as Yup from "yup";
import { useFormik } from "formik";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postRegister } from "../../../redux/Actions/authActions";
import { Navigate, NavLink, useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Col,
  Container,
  Form,
  OverlayTrigger,
  Row,
  Spinner,
  Tooltip,
} from "react-bootstrap";
import loginPage from "../../../assets/images/login-page.png";
import background from "../../../assets/images/Background.svg";
import customerRegisterImage from "../../../assets/images/customer-register.svg";
import HandleImages from "../../../components/Custom/Avatars/HandleImages";
import PasswordField from "../../../components/Custom/PasswordInput/PasswordInput";
import { getTimezones } from "../../../redux/Actions/globalActions";
import { capitalizeFirstLetter } from "../../../utils/_helpers";

const UserRegisteration = () => {
  const { value } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [timeZones, setTimeZones] = useState([]);
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
    firstname: Yup.string().required("Please enter First Name"),
    lastname: Yup.string().required("Please enter Last Name"),
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
    handleSubmit: formikSubmit,
  } = useFormik({
    initialValues,
    validationSchema: validateLogin,
    validateOnChange: false,
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
    <Container fluid>
      <Row className="bg-white">
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
                imagePath={
                  value === "customer" ? customerRegisterImage : loginPage
                }
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
              <h3 className="text-dark fw-bold">
                Welcome to TechValet!
                <br /> You are registering as a {capitalizeFirstLetter(value)}.
              </h3>

              {value === "customer" ? (
                <>
                  <p className="text-dark">
                    Need help? Create an account to get your issues resolved
                    instantly.
                  </p>
                </>
              ) : (
                <>
                  <p className="text-dark">
                    Don't waste your skills. Create an account to provide your
                    services
                  </p>
                </>
              )}
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
                {/* First Name */}
                <Col xl={6} lg={6} md={6} sm={12} xs={12}>
                  <Form.Group className="mb-2">
                    <Form.Label>
                      First Name <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="firstname"
                      placeholder="Email / Username"
                      value={values.firstname}
                      onBlur={handleBlur("firstname")}
                      onChange={handleChange("firstname")}
                      isInvalid={touched.firstname && !!errors.firstname}
                    />
                    <Form.Control.Feedback type="invalid">
                      {touched.firstname && errors.firstname}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                {/* Last Name */}
                <Col xl={6} lg={6} md={6} sm={12} xs={12}>
                  <Form.Group as={Col} className="mb-2">
                    <Form.Label>
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
                    />
                    <Form.Control.Feedback type="invalid">
                      {touched.lastname && errors.lastname}
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
                      required={true}
                      value={values.password}
                      onBlur={handleBlur("password")}
                      onChange={handleChange("password")}
                      isInvalid={touched.password && !!errors.password}
                      touched={touched.password}
                      errors={errors.password}
                      size="md"
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
                      as="select"
                      value={values?.timezone || ""}
                      onChange={(e) => {
                        const selectedZone = e.target.value;
                        setFieldValue("timezone", selectedZone);
                      }}
                      isInvalid={touched.timezone && !!errors.timezone}
                    >
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
                {/* Country */}
                <Col xl={6} lg={6} md={6} sm={12} xs={12}>
                  <Form.Group className="mb-4">
                    <Form.Label>
                      Country <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="country"
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

                <Col xl={12} lg={12} md={12} sm={12} xs={12} className="mb-3">
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
                    />
                  </OverlayTrigger>
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
                      `Sign Up as ${
                        value === "valet" ? "Tech Valet" : "a Customer"
                      }`
                    )}
                  </Button>
                </Col>
              </Row>
              <div className="d-flex justify-content-center">
                <span className="text-muted">
                  Already have account?
                  <span>
                    <NavLink to="/login" className="text-dark ms-1">
                      Login Here
                    </NavLink>
                  </span>
                </span>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default UserRegisteration;
