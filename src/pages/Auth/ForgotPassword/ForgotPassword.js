import React, { useCallback, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { requestForgotPassword } from "../../../redux/Actions/authActions";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
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
import loginPage from "../../../assets/images/forgot-password.png";
import background from "../../../assets/images/Background.svg";

const initialValues = {
  email: "",
  password: "",
};

const validateLogin = Yup.object().shape({
  email: Yup.string()
    .min(3, "User Name must be at least 3 characters")
    .required("Please enter User Name or email"),
});

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userAuth, loading, error } = useSelector(
    (state) => state.authentication
  );

  const handleSubmit = useCallback(
    (values) => {
      dispatch(requestForgotPassword(values.email)).then((response) => {});
    },
    [dispatch, navigate]
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

  // Check if user is authenticated
  if (userAuth && userAuth.id) {
    return userAuth.role === "Admin" ? (
      <Navigate to="/dashboard" />
    ) : userAuth?.role === "Seo" ? (
      <Navigate to="/panel" />
    ) : (
      <Navigate to="/account" />
    );
  }

  return (
    <Container fluid>
      <Row className="vh-100">
        {/* Image Column */}
        <Col
          xl={7}
          lg={7}
          md={6}
          sm={12}
          xs={12}
          className="d-none d-md-flex justify-content-center align-items-center p-5"
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
              <h3 className="text-dark fw-bold">Lost your Account?</h3>
              <p className="text-dark">
                Reset your password to regain access to your account.
              </p>
            </div>
          </div>
        </Col>

        {/* Form Column */}
        <Col
          xl={5}
          lg={5}
          md={6}
          sm={12}
          xs={12}
          className="d-flex flex-column justify-content-center align-items-center"
        >
          {/* Logo */}
          <div className="d-flex mb-4">
            <HandleImages
              imagePath={logo}
              imageAlt="login"
              className=""
              imageStyle={{
                width: "130px",
              }}
            />
          </div>

          {/* Form */}
          <div className="mb-4 w-75">
            <h2>Forgot Your Password?</h2>
            <p>
              Don't worry, it happens! Reset your password below to get back
              into your account.
            </p>
            <Form onSubmit={formikSubmit}>
              <input type="hidden" name="way" value="user" />
              <Form.Group className="mb-2">
                <Form.Label>Email / Username</Form.Label>
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

              <Row>
                <Col sm={12} className="text-center">
                  <Button
                    className="btn-md w-100 text-uppercase mb-3"
                    variant="primary"
                    type="submit"
                  >
                    {loading ? (
                      <Spinner animation="border" size="sm" />
                    ) : (
                      "Reset Password"
                    )}
                  </Button>

                  <div>
                    <span className="text-secondary">Not Registered Yet?</span>
                    <NavLink
                      to={"/register/customer"}
                      className="text-dark ms-1"
                    >
                      Create an account
                    </NavLink>
                  </div>
                  <div>
                    <NavLink to={"/"} className="text-dark ms-1">
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
  );
};

export default ForgotPassword;
