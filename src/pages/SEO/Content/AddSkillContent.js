import React from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import CustomCKEditor from "../../../components/Custom/CKEditor/CKEditor";
import { skillsOptions } from "../../../utils/client/data/requestedData";
import { useLocation } from "react-router";

const AddSkillContent = () => {
  const { state } = useLocation();

  const initialValues = {
    Skill: state?.Skill || "",
    Title: state?.Title || "",
    Description: state?.Description || "",
    Content: state?.Content || "",
    FeaturedImageUrl: null,
  };

  const validationSchema = Yup.object({
    Skill: Yup.string().required("Skill is required"),
    Title: Yup.string().optional("Title is required"),
    Description: Yup.string()
      .min(50, "Description must be at least 50 characters")
      .optional("Description is required"),
    Content: Yup.string().required("Content is required"),
    FeaturedImageUrl: Yup.mixed().optional("Featured image is required"),
  });

  const handleSlugGeneration = (title) => {
    let slug = title.trim().toLowerCase();
    slug = slug.replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    return slug;
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    console.log("Form values:", values);

    // Perform your submit logic, e.g., API calls
    alert("Record added successfully!");

    // Clear the form fields
    resetForm();
  };

  const {
    values,
    touched,
    errors,
    setFieldValue,
    handleBlur,
    handleChange,
    resetForm,
  } = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: handleSubmit,
  });

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col lg={8}>
          <Card className="shadow-lg">
            <Card.Body>
              <h2 className="text-center text-gray-900 mb-4">
                Add / Update Record
              </h2>
              <Form onSubmit={handleSubmit} encType="multipart/form-data">
                <Row>
                  <Col
                    xl={state?.image ? 9 : 12}
                    lg={state?.image ? 9 : 12}
                    md={state?.image ? 9 : 12}
                    sm={12}
                    xs={12}
                  >
                    <Form.Group controlId="exampleTitle" className="mb-4">
                      <Form.Label className="text-dark">
                        Select Skill
                        <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        as="select"
                        name="Skill"
                        value={values.Skill}
                        onChange={(e) => {
                          handleChange(e);
                          setFieldValue("Skill", e.target.value); // Update Formik state
                        }}
                        onBlur={handleBlur}
                        isInvalid={touched.Skill && !!errors.Skill}
                      >
                        <option value="" disabled>
                          Select a skill
                        </option>
                        {skillsOptions.map((option) => (
                          <option key={option.id} value={option.value}>
                            {option.value}
                          </option>
                        ))}
                      </Form.Control>
                      <Form.Control.Feedback type="invalid">
                        {errors.Skill}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="exampleTitle" className="mb-4">
                      <Form.Label className="text-dark">
                        Article Title<span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="Title"
                        placeholder="Title"
                        value={values.Title}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                        onBlur={handleBlur}
                        isInvalid={touched.Title && !!errors.Title}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.Title}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  {state?.image && (
                    <Col xl={3} lg={3} md={3} sm={12} xs={12}>
                      <img
                        src={state?.image}
                        style={{ width: "100%", height: "100%" }}
                        className="img-fluid"
                      />
                    </Col>
                  )}
                </Row>

                <Form.Group controlId="Description" className="mb-4">
                  <Row className="align-items-center mt-2">
                    <Col xl={6} lg={6} md={6} sm={12} xs={12}>
                      <Form.Label className="text-dark">
                        Description
                        <span className="text-danger">*</span>
                      </Form.Label>
                    </Col>
                    <Col xl={6} lg={6} md={6} sm={12} xs={12}>
                      <div className="text-end text-muted">
                        <span>Characters should be at least 50</span>
                      </div>
                    </Col>
                  </Row>

                  <Form.Control
                    as="textarea"
                    name="Description"
                    placeholder="write something here..."
                    value={values.Description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.Description && !!errors.Description}
                    rows={4}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.Description}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="BlogPostDescription" className="mb-4">
                  <Form.Label className="text-dark">
                    Content<span className="text-danger">*</span>
                  </Form.Label>
                  <CustomCKEditor
                    data={null}
                    content={values.Content}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setFieldValue("Content", data);
                    }}
                  />
                  {touched.Content && errors.Content && (
                    <div className="text-danger">{errors.Content}</div>
                  )}
                </Form.Group>

                <Form.Group controlId="FeaturedImage" className="mb-4">
                  <Form.Label>Featured Image</Form.Label>
                  <Form.Control
                    type="file"
                    name="FeaturedImageUrl"
                    accept="image/*"
                    onChange={(event) =>
                      setFieldValue("FeaturedImageUrl", event.target.files[0])
                    }
                    onBlur={handleBlur}
                    isInvalid={
                      touched.FeaturedImageUrl && !!errors.FeaturedImageUrl
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.FeaturedImageUrl}
                  </Form.Control.Feedback>
                </Form.Group>

                <div className="text-center">
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    className="w-50"
                  >
                    Add / Update Record
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AddSkillContent;
