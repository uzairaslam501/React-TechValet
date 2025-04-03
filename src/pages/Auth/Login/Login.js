import React, { useCallback, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  postLogin,
  sendVerificationEmail,
} from "../../../redux/Actions/authActions";
import { NavLink, Navigate, useLocation, useNavigate } from "react-router-dom";
import {
  Button,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
  Spinner,
} from "react-bootstrap";
import logo from "../../../assets/images/logo-for-white-bg.svg";
import HandleImages from "../../../components/Custom/Avatars/HandleImages";
import loginPage from "../../../assets/images/login-page.png";
import background from "../../../assets/images/Background.svg";
import PasswordField from "../../../components/Custom/PasswordInput/PasswordInput";
import GoogleLoginButton from "../../../components/Custom/GoogleAuth/GoogleLoginButton";
import ScrollToTop from "../../../theme/scrollToTop";

const initialValues = {
  email: "",
  password: "",
};

const validateLogin = Yup.object().shape({
  email: Yup.string()
    .min(3, "User Name must be at least 3 characters")
    .required("Please enter User Name or email"),
  password: Yup.string().required("Please enter password"),
});

const UserLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [sendEmail, setSendEmail] = useState(false);

  const { userAuth, loading, error } = useSelector(
    (state) => state.authentication
  );

  const handleSubmit = useCallback(
    (values) => {
      dispatch(postLogin(values)).then((response) => {
        if (response?.payload && response?.payload !== "EmailVerfication") {
          const redirectPath = new URLSearchParams(location.search).get(
            "redirect"
          );
          if (redirectPath) {
            navigate(redirectPath);
          }
        } else if (
          response?.payload &&
          response?.payload === "EmailVerfication"
        ) {
          setSendEmail(true);
        }
      });
    },
    [dispatch, location.search, navigate]
  );

  const {
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
    handleSubmit: formikSubmit,
  } = useFormik({
    initialValues,
    validationSchema: validateLogin,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: handleSubmit,
  });

  const setVerificationEmail = useCallback(
    (email) => {
      dispatch(sendVerificationEmail(email)).then((response) => {});
    },
    [dispatch, location.search, navigate]
  );

  // Check if user is authenticated
  if (userAuth && userAuth.id) {
    return userAuth.role === "Admin" ? (
      <Navigate to="/dashboard" />
    ) : userAuth?.role === "Seo" ? (
      <Navigate to="/panel" />
    ) : userAuth.role === "Customer" ? (
      <Navigate to="/request-service" />
    ) : (
      <Navigate to="/account" />
    );
  }

  return (
    <>
      <ScrollToTop />

      <Container
        fluid
        className="min-vh-100 d-flex justify-content-center align-items-center"
        style={{
          position: "relative",
          minHeight: "100vh",
          background: "#eee",
        }}
      >
        <Row className="w-100 justify-content-center py-4">
          {/* Form Column */}
          <Col
            xl={6}
            lg={6}
            md={8}
            sm={10}
            xs={12}
            className="d-flex flex-column justify-content-center align-items-center shadow-lg 
            rounded-4 p-2 align-self-center"
          >
            {/* Logo */}

            <div className="m-4 text-center w-100">
              <HandleImages
                imagePath={logo}
                imageAlt="login"
                className="img-fluid"
                imageStyle={{
                  maxWidth: "130px",
                  height: "auto",
                }}
              />
            </div>

            {/* Form */}
            <div className="mb-4 w-75">
              <h2>Login to your Account</h2>
              <p className="text-dark">
                Let’s make sure your username and password are working – please
                try to enter them below, and then click on “Enter”
              </p>
              <Form onSubmit={formikSubmit}>
                <input type="hidden" name="way" value="user" />
                <Form.Group className="mb-2">
                  <Form.Label>
                    Email / Username <span className="text-danger">*</span>
                  </Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="text"
                      name="Email"
                      required
                      placeholder="Email / Username"
                      value={values.email}
                      onBlur={handleBlur("email")}
                      onChange={handleChange("email")}
                      isInvalid={touched.email && !!errors.email}
                    />
                    <InputGroup.Text>
                      <i className="bi bi-person"></i>
                    </InputGroup.Text>
                    <Form.Control.Feedback type="invalid">
                      {touched.email && errors.email}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>

                <Form.Group className="mb-2">
                  <PasswordField
                    label="Password"
                    placeholder="********"
                    value={values.password}
                    onBlur={handleBlur("password")}
                    onChange={handleChange("password")}
                    required={true}
                    isInvalid={touched.password && !!errors.password}
                    touched={touched.password}
                    errors={errors.password}
                  />
                </Form.Group>

                <div className="d-flex justify-content-between">
                  <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    {/* <Form.Check
                    type="checkbox"
                    label="Remember me"
                    className="text-dark"
                  /> */}
                  </Form.Group>
                  <NavLink to="/forgot-password" className="text-dark mb-3">
                    Forgot password?
                  </NavLink>
                </div>

                <Row>
                  <Col
                    xl={12}
                    lg={12}
                    md={12}
                    sm={12}
                    xs={12}
                    className="text-center"
                  >
                    <Button
                      className="btn-md w-100 text-uppercase mb-3 fs-5"
                      variant="primary"
                      type="submit"
                    >
                      {loading ? (
                        <Spinner animation="border" size="sm" />
                      ) : (
                        "Login"
                      )}
                    </Button>
                    {/* <Col
                    xl={12}
                    lg={12}
                    md={12}
                    sm={12}
                    xs={12}
                    className="text-center"
                  >
                    <GoogleLoginButton />
                  </Col> */}

                    {sendEmail && (
                      <p className="text-danger">
                        <Button
                          className="btn-md w-100 text-uppercase mb-3"
                          variant="success"
                          type="button"
                          onClick={() => setVerificationEmail(values.email)}
                        >
                          {loading ? (
                            <Spinner animation="border" size="sm" />
                          ) : (
                            "verify your email"
                          )}
                        </Button>
                        Your email is not verified. Please verify your email
                      </p>
                    )}

                    <div>
                      <span className="text-secondary fs-5">
                        Not Registered Yet?
                      </span>
                      <NavLink
                        to={"/register/customer"}
                        className="text-dark ms-1 fs-5"
                      >
                        Create an account
                      </NavLink>
                    </div>
                    <div>
                      <NavLink to={"/"} className="text-dark ms-1 fs-5">
                        <i className="bi bi-house-check"></i> Back To Home
                      </NavLink>
                    </div>
                  </Col>
                </Row>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UserLogin;
