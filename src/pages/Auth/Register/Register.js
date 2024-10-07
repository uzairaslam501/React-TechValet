import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { postRegister } from "../../../redux/Actions/authActions";
import { registerUser } from "../../../utils/api";
import { Form, Button, Row, Col, Alert } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";

// Validation schema using Yup
const validationSchema = Yup.object({
  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .required("Username is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Register = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm, handleSubmit }) => {
      try {
        const response = await dispatch(postRegister(values));
        //resetForm(); // Reset form after successful submission
        // Handle registration success (e.g., redirect to login, display success message)
      } catch (error) {
        console.error("Error registering user", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <>
      <Row
        className="justify-content-md-center"
        style={{
          height: "100vh",
          display: "flex",
          background: "#eee",
          //backgroundImage: `url("https://media.wired.com/photos/65e83cc9b8ffa5f8fa84c893/master/w_2560%2Cc_limit/wired-uk-google-watching.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          alignItems: "center",
          margin: 0,
        }}
      >
        <Col sm={12} md={4} className="p-4 border border-dark">
          <h2 className="text-center">Register</h2>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group controlId="formUsername" className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.username && !!formik.errors.username}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.username}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formPassword" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.password && !!formik.errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.password}
              </Form.Control.Feedback>
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="w-100"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? "Registering..." : "Register"}
            </Button>
          </Form>
          {/* You can add an alert or message after form submission */}
          {formik.isSubmitting && (
            <Alert variant="success" className="mt-3">
              Registration successful! Redirecting...
            </Alert>
          )}
        </Col>
      </Row>
    </>
  );
};

export default Register;
