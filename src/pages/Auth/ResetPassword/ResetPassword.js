import React, { useCallback, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  postLogin,
  postResetPassword,
} from "../../../redux/Actions/authActions";
import { NavLink, Navigate, useParams } from "react-router-dom";
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
import { toast } from "react-toastify";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const { value, validity } = useParams();
  const [showSpinner, setShowSpinner] = useState(false);

  const { userAuth, loading, error } = useSelector(
    (state) => state.authentication
  );

  const initialValues = {
    id: value || "",
    validity: validity || "",
    newPassword: "",
    confirmPassword: "",
  };

  const validateLogin = Yup.object().shape({
    newPassword: Yup.string().required("Password is required"),
    confirmPassword: Yup.string().required("Confirm Password is required"),
  });

  const {
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
    resetForm,
    handleSubmit: formikSubmit,
  } = useFormik({
    initialValues,
    validationSchema: validateLogin,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: async (values) => {
      try {
        setShowSpinner(true);
        dispatch(postResetPassword(values)).then((response) => {
          console.log("response :", response?.payload);
          resetForm();
          setShowSpinner(false);
        });
      } catch (error) {}
    },
  });

  const isPasswordMatch = values.newPassword === values.confirmPassword;
  const updateButtonDisabled = !isPasswordMatch;
  const passwordMismatchMessage = !isPasswordMatch && (
    <div className="text-danger">Password & Confirm Password do not match!</div>
  );

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
              <h3 className="text-dark fw-bold">Reset Your Password</h3>
              <p className="text-dark">
                Enter your new password to regain access to your account. Make
                sure it's strong and secure.
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
            <h2>Reset Your Password</h2>
            <p className="text-dark">
              Just enter your new password and continue with your account!
            </p>
            <Form onSubmit={formikSubmit}>
              <input type="hidden" name="Id" value={values.id} />
              <input type="hidden" name="Validity" value={values.validity} />

              <Form.Group className="mb-2">
                <PasswordField
                  label="New Password"
                  placeholder="********"
                  value={values.newPassword}
                  onBlur={handleBlur("newPassword")}
                  onChange={handleChange("newPassword")}
                  required={true}
                  isInvalid={touched.newPassword && !!errors.newPassword}
                  touched={touched.newPassword}
                  errors={errors.newPassword}
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <PasswordField
                  label="Confirm Password"
                  placeholder="********"
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

              <Row>
                <Col sm={12} className="text-center">
                  {passwordMismatchMessage}
                  <Button
                    className="btn-md w-100 text-uppercase mb-3"
                    variant="primary"
                    type="submit"
                    disabled={showSpinner || updateButtonDisabled}
                  >
                    {loading ? (
                      <Spinner animation="border" size="sm" />
                    ) : (
                      "Confirm"
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

export default ResetPassword;
