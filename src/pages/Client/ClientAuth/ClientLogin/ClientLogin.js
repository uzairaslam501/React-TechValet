import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { postLogin } from "../../../../redux/Actions/authActions";
import { NavLink, Navigate } from "react-router-dom";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import logo from "../../../../assets/images/logo-for-white-bg.svg";

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

const ClientLogin = () => {
  const dispatch = useDispatch();
  const { userAuth, loading, error } = useSelector(
    (state) => state.authentication
  );

  const { values, touched, errors, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: validateLogin,
      validateOnChange: false,
      validateOnBlur: true,
      onSubmit: (values) => {
        dispatch(postLogin(values));
      },
    });

  // Check if user is authenticated
  if (userAuth && userAuth.id) {
    return userAuth.role === "0" ? (
      <Navigate to="/dashboard" />
    ) : (
      <Navigate to="/" />
    );
  }

  return (
    <>
      <Container>
        <Row className="justify-content-center align-items-center d-flex">
          <Col lg={4} className="mx-auto pt-5">
            <div
              className="box shadow-sm p-4 mb-5 border border-dark"
              style={{ borderRadius: "25px", background: "#F3F3F3" }}
            >
              <div className="text-center mb-4">
                <img src={logo} alt="" style={{ width: "130px" }} />
                <h5 className="font-weight-bold mt-3">Welcome To Tech Valet</h5>
                <p className="text-dark">
                  Don't miss your next opportunity. Sign in to stay updated on
                  your professional world.
                </p>
              </div>

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <input type="hidden" name="way" value="user" />
                  <Form.Label>Email or username</Form.Label>
                  <div className="position-relative icon-form-control">
                    <i
                      className="bi bi-person position-absolute"
                      style={{ left: "10px", top: "20%" }}
                    ></i>
                    <Form.Control
                      type="text"
                      name="Email"
                      required
                      style={{ paddingLeft: "40px" }}
                      placeholder="Email or username"
                      value={values.email}
                      onBlur={handleBlur("email")}
                      onChange={handleChange("email")}
                      isInvalid={touched.email && !!errors.email}
                    />
                  </div>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <div className="position-relative icon-form-control">
                    <i
                      className="bi bi-key-fill position-absolute"
                      style={{ left: "10px", top: "20%" }}
                    ></i>
                    <Form.Control
                      type="password"
                      name="Password"
                      required
                      style={{ paddingLeft: "40px" }}
                      placeholder="Password"
                      value={values.password}
                      onBlur={handleBlur("password")}
                      onChange={handleChange("password")}
                      isInvalid={touched.password && !!errors.password}
                    />
                  </div>
                  <Form.Control.Feedback type="invalid">
                    {touched.password && errors.password}
                  </Form.Control.Feedback>
                </Form.Group>
                <Row>
                  <Col className="mb-2">
                    <div className="text-end">
                      <a href="/Auth/UserForgotPassword" className="text-dark">
                        Forgot password?
                      </a>
                    </div>
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
                        "Sign In"
                      )}
                    </Button>

                    <Button
                      className="btn-md w-100 text-uppercase mt-3"
                      variant="primary"
                      href="/Auth/Register?value=ITValet"
                    >
                      <span className="ml-auto text-white">
                        New to Tech Valet?{" "}
                      </span>
                      Join now
                    </Button>
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

export default ClientLogin;
