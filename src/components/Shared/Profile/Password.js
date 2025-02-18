import React, { useState } from "react";
import { useFormik } from "formik";
import Spinner from "react-bootstrap/Spinner";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Form, Row } from "react-bootstrap";
import PasswordField from "../../Custom/PasswordInput/PasswordInput";
import { postUpdatePassword } from "../../../redux/Actions/authActions";
const Password = () => {
  const loggedInUser = useSelector((state) => state?.authentication?.userAuth);
  const dispatch = useDispatch();
  const [showSpinner, setShowSpinner] = useState(false);

  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    touched,
    setFieldValue,
    resetForm,
  } = useFormik({
    initialValues: {
      id: loggedInUser.userEncId,
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      oldPassword: Yup.string().required("Old Password is required"),
      newPassword: Yup.string()
        .required("Password is required")
        .min(6, "Must be at least 6 characters"),
      confirmPassword: Yup.string().required("Confirm Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        setShowSpinner(true);
        dispatch(
          postUpdatePassword({
            userId: encodeURIComponent(values.id),
            userData: values,
          })
        ).then((response) => {
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
    <div className="text-danger text-end">
      Password & Confirm Password do not match!
    </div>
  );
  return (
    <>
      <div className="row justify-content-center mt-5 mb-5">
        <div className="col-xl-10 col-lg-12 col-md-9">
          <div className="card o-hidden border-0 shadow-lg my-3">
            <div className="card-body p-0">
              {/* Nested Row within Card Body */}
              <div className="row">
                <div className="col-lg-12">
                  <div className="p-5">
                    <div className="text-center">
                      <h1 className="h3 text-gray-900 mb-4 text-bold">
                        Update Password
                      </h1>
                    </div>
                    <form method="post" onSubmit={handleSubmit}>
                      <input type="hidden" name="id" value={loggedInUser.id} />
                      <Row>
                        <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                          <Form.Group className="mb-2">
                            <PasswordField
                              label="Old Password"
                              name="oldPassword"
                              placeholder="*****"
                              required={true}
                              value={values.oldPassword}
                              onBlur={handleBlur("oldPassword")}
                              onChange={handleChange("oldPassword")}
                              isInvalid={
                                touched.oldPassword && !!errors.oldPassword
                              }
                              touched={touched.oldPassword}
                              errors={errors.oldPassword}
                              size="md"
                            />
                          </Form.Group>
                        </Col>

                        <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                          <Form.Group className="mb-2">
                            <PasswordField
                              label="New Password"
                              name="newPassword"
                              placeholder="*****"
                              required={true}
                              value={values.newPassword}
                              onBlur={handleBlur("newPassword")}
                              onChange={handleChange("newPassword")}
                              isInvalid={
                                touched.newPassword && !!errors.newPassword
                              }
                              touched={touched.newPassword}
                              errors={errors.newPassword}
                              size="md"
                            />
                          </Form.Group>
                        </Col>

                        <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                          <Form.Group className="mb-2">
                            <PasswordField
                              label="Confirm New Password"
                              name="confirmPassword"
                              placeholder="*****"
                              required={true}
                              value={values.confirmPassword}
                              onBlur={handleBlur("confirmPassword")}
                              onChange={handleChange("confirmPassword")}
                              isInvalid={
                                touched.confirmPassword &&
                                !!errors.confirmPassword
                              }
                              touched={touched.confirmPassword}
                              errors={errors.confirmPassword}
                              size="md"
                            />
                          </Form.Group>
                        </Col>

                        <Col
                          xl={12}
                          lg={12}
                          md={12}
                          sm={12}
                          xs={12}
                          className="text-center"
                        >
                          <Button
                            type="submit"
                            variant="primary"
                            size="md"
                            className=""
                            disabled={showSpinner || updateButtonDisabled}
                          >
                            Update Password{" "}
                            {showSpinner && (
                              <span>
                                <Spinner
                                  as="span"
                                  animation="border"
                                  size="sm"
                                  role="status"
                                  aria-hidden="true"
                                />
                              </span>
                            )}
                          </Button>
                          {passwordMismatchMessage}
                        </Col>
                      </Row>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Password;
