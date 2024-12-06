// src/pages/Login/Login.js
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { postLogin } from "../../../../redux/Actions/authActions";
import { NavLink, Navigate } from "react-router-dom";
import { Button, Form, Row, Col, Spinner } from "react-bootstrap";

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

function Login() {
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
      <Navigate to="/dashboard" />
    );
  }

  return (
    <>
      <Row
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
        <Col
          md={{ span: 4, offset: 4 }}
          sm={12}
          xs={12}
          className="justify-content-center align-items-center p-4 border border-dark"
        >
          <div>
            <h5 className="text-center">Welcome Back!</h5>
            {error && <div className="alert alert-danger">{error}</div>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicemail">
                <Form.Label>Username / Email</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username/email"
                  value={values.email}
                  onBlur={handleBlur("email")}
                  onChange={handleChange("email")}
                  isInvalid={touched.email && !!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {touched.email && errors.email}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={values.password}
                  onBlur={handleBlur("password")}
                  onChange={handleChange("password")}
                  isInvalid={touched.password && !!errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {touched.password && errors.password}
                </Form.Control.Feedback>
              </Form.Group>
              <Button
                type="submit"
                className="mt-2"
                variant="primary"
                disabled={loading}
                style={{ width: "100%" }}
              >
                {loading ? <Spinner animation="border" size="sm" /> : "Sign In"}
              </Button>
            </Form>
            <div className="mt-2 text-center">
              <p>
                <NavLink to="/forgot-password">Forgot Password?</NavLink>
              </p>
              <p>
                Don't have an account? <NavLink to="/signup">Sign Up!</NavLink>
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
}

export default Login;
