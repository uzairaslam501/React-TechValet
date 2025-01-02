import React, { useCallback } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { postLogin } from "../../../../redux/Actions/authActions";
import { NavLink, Navigate } from "react-router-dom";
import {
  Button,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
  Spinner,
} from "react-bootstrap";
import logo from "../../../../assets/images/logo-for-white-bg.svg";
import HandleImages from "../../../../components/Custom/Avatars/HandleImages";
import loginPage from "../../../../assets/images/login-page.png";
import background from "../../../../assets/images/Background.svg";

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

const Login = () => {
  const dispatch = useDispatch();
  const { userAuth, loading, error } = useSelector(
    (state) => state.authentication
  );

  const handleSubmit = useCallback(
    (values) => {
      dispatch(postLogin(values));
    },
    [dispatch]
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
    return userAuth.role === "0" ? (
      <Navigate to="/dashboard" />
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
              <h3 className="text-dark fw-bold">Welcome to TechValet</h3>
              <p className="text-dark">
                Don't miss your next opportunity. Sign in to stay updated on
                your professional world.
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
            <h2>Login to your Account</h2>
            <p className="text-dark">
              See what is going on with your account. Login to your account
            </p>
            <Form onSubmit={formikSubmit}>
              <input type="hidden" name="way" value="user" />
              <Form.Group className="mb-3">
                <Form.Label>Email / Username</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <i className="bi bi-person"></i>
                  </InputGroup.Text>
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
                </InputGroup>
                <Form.Control.Feedback type="invalid">
                  {touched.email && errors.email}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <i className="bi bi-key-fill"></i>
                  </InputGroup.Text>
                  <Form.Control
                    type="password"
                    name="Password"
                    required
                    placeholder="********"
                    value={values.password}
                    onBlur={handleBlur("password")}
                    onChange={handleChange("password")}
                    isInvalid={touched.password && !!errors.password}
                  />
                </InputGroup>
                <Form.Control.Feedback type="invalid">
                  {touched.password && errors.password}
                </Form.Control.Feedback>
              </Form.Group>

              <div className="d-flex justify-content-between">
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check
                    type="checkbox"
                    label="Remember me"
                    className="text-dark"
                  />
                </Form.Group>
                <NavLink to="/forgot-password" className="text-dark">
                  Forgot password?
                </NavLink>
              </div>

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
                      "Login"
                    )}
                  </Button>

                  <div>
                    <span className="text-secondary">Not Registered Yet?</span>
                    <NavLink to={"/register"} className="text-dark ms-1">
                      Create an account
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

export default Login;
