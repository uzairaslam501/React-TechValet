import React, { useCallback } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import "./style.css";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";
import { postAddContact } from "../../../redux/Actions/globalActions";

const Contact = () => {
  const dispatch = useDispatch();

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  };

  const validateSchema = Yup.object().shape({
    firstName: Yup.string().required("Required Field"),
    lastName: Yup.string().required("Required Field"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Required Field"),
    subject: Yup.string().required("Required Field"),
    message: Yup.string().required("Required Field"),
  });

  const handleSubmit = useCallback(
    (values) => {
      dispatch(postAddContact(values)).then(() => {
        resetForm();
      });
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
    resetForm,
    handleSubmit: formikSubmit,
  } = useFormik({
    initialValues,
    validationSchema: validateSchema,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: handleSubmit,
  });

  return (
    <>
      <section className="contact bg-white">
        {/* Section Title */}
        <Container className="section-title" data-aos="fade-up">
          <h1
            className="fw-bold"
            style={{
              color: "#ffde29",
            }}
          >
            Contact Us
          </h1>
          <p>Any question or remarks? Just write us a message!</p>
        </Container>

        <Container data-aos="fade-up" data-aos-delay="100">
          <Card className="bg-white px-3 shadow border-0">
            <Card.Body>
              <Row className="bg-white">
                <Col
                  xl={5}
                  lg={5}
                  md={5}
                  sm={12}
                  xs={12}
                  className="p-0 bg-black text-white"
                  style={{
                    borderRadius: "20px",
                  }}
                >
                  <div className="p-5">
                    <h4 className="text-white fw-bold">Contact Information</h4>
                    <p>Say something to start a live chat!</p>
                    <div className="py-5">
                      <div className="info-item d-flex align-items-center">
                        <i className="bi bi-telephone-forward-fill"></i>
                        <p className="fs-5">+1 (558) 554-8855</p>
                      </div>

                      <div className="info-item d-flex align-items-center">
                        <i className="bi bi-envelope"></i>
                        <p className="fs-5">info@techvalet.ca</p>
                      </div>

                      <div className="info-item d-flex  align-items-center">
                        <i className="bi bi-geo-alt"></i>
                        <p className="fs-5">
                          132 Dartmouth Street Boston,
                          <br /> Massachusetts 02156 United States
                        </p>
                      </div>
                    </div>

                    <div className="d-flex">
                      <a href="#" className="icons ms-3">
                        <i className="bi bi-facebook"></i>
                      </a>
                      <a href="#" className="icons mx-5">
                        <i className="bi bi-instagram"></i>
                      </a>
                      <a href="#" className="icons">
                        <i className="bi bi-twitter"></i>
                      </a>
                    </div>
                  </div>
                </Col>

                {/* Contact Form */}
                <Col lg={7} className="p-0">
                  <Form className="php-email-form" onSubmit={formikSubmit}>
                    <Row className="gy-4">
                      <Col xl={6} lg={6} md={6} sm={12} xs={12}>
                        <Form.Group controlId="name-field" className="pb-2">
                          <Form.Label>First Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="firstName"
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
                        <Form.Group controlId="name-field" className="pb-2">
                          <Form.Label>Last Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="lastName"
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

                      <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                        <Form.Group controlId="email-field" className="pb-2">
                          <Form.Label>Your Email</Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
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

                      <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                        <Form.Group controlId="subject-field" className="pb-2">
                          <Form.Label>Subject</Form.Label>
                          <Form.Control
                            type="text"
                            name="subject"
                            value={values.subject}
                            onBlur={handleBlur("subject")}
                            onChange={handleChange("subject")}
                            isInvalid={touched.subject && !!errors.subject}
                          />
                          <Form.Control.Feedback type="invalid">
                            {touched.subject && errors.subject}
                          </Form.Control.Feedback>{" "}
                        </Form.Group>
                      </Col>

                      <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                        <Form.Group controlId="message-field" className="pb-2">
                          <Form.Label>Message</Form.Label>
                          <Form.Control
                            placeholder="Write your message"
                            as="textarea"
                            name="message"
                            rows={3}
                            value={values.message}
                            onBlur={handleBlur("message")}
                            onChange={handleChange("message")}
                            isInvalid={touched.message && !!errors.message}
                          />
                          <Form.Control.Feedback type="invalid">
                            {touched.message && errors.message}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>

                      <Col
                        xl={12}
                        lg={12}
                        md={12}
                        sm={12}
                        xs={12}
                        className="text-end"
                      >
                        <div className="loading">Loading</div>
                        <div className="error-message"></div>
                        <div className="sent-message">
                          Your message has been sent. Thank you!
                        </div>
                        <Button
                          type="submit"
                          variant="secondary"
                          className="px-5"
                        >
                          Send Message
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Container>
      </section>
    </>
  );
};

export default Contact;
