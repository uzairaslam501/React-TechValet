import React, { useEffect, useRef, useState } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import CustomCKEditor from "../../../components/Custom/CKEditor/CKEditor";
import { skillsOptions } from "../../../utils/client/data/requestedData";
import { useLocation } from "react-router";
import { useDispatch } from "react-redux";
import {
  addSkillBlog,
  updateSkillBlogs,
} from "../../../redux/Actions/seoActions";
import { NavLink } from "react-router-dom";

const AddSkillContent = () => {
  const dispatch = useDispatch();
  const { state } = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const fileInputRef = useRef(null);

  const initialValues = {
    encId: state?.encId || "",
    Title: state?.title || "",
    Skill: state?.skill || "",
    Slug: state?.slug || "",
    Description: state?.description || "",
    Content: state?.content || "",
    Tags: state?.tags || "",
    FeaturedImageUrl: null,
  };

  const validationSchema = Yup.object({
    Title: Yup.string().required("Title is required"),
    Skill: Yup.string().required("Skill is required"),
    Description: Yup.string()
      .min(50, "Description must be at least 50 characters")
      .required("Description is required"),
    Content: Yup.string().required("Content is required"),
    Tags: Yup.string().trim().required("Tags are required"),
  });

  const handleSlugGeneration = (Title) => {
    let slug = Title.trim().toLowerCase();
    slug = slug.replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    return slug;
  };

  const handleSubmit = (e) => {
    setIsLoading(true);
    let endpoint = addSkillBlog(values);
    if (state) {
      endpoint = updateSkillBlogs(values);
    }
    dispatch(endpoint)
      .then((response) => {
        if (response?.payload) {
          console.log("Response Payload:", response.payload);
        } else {
          console.log("No response payload available.");
        }
        setIsLoading(false);
        resetForm();
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      })
      .catch((error) => {
        console.error("Error dispatching action:", error);
        setIsLoading(false);
      });
  };

  const {
    values,
    touched,
    errors,
    setFieldValue,
    handleBlur,
    handleChange,
    resetForm,
    handleSubmit: formikSubmit,
  } = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    if (state) {
      setIsUpdate(true);
    }
  }, [state]);

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col lg={8}>
          <Card className="shadow-lg">
            <Card.Body>
              <h2 className="text-center text-gray-900 mb-4">
                Add / Update Record
              </h2>
              <Form onSubmit={formikSubmit} encType="multipart/form-data">
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
                        Title<span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="Title"
                        placeholder="Title"
                        value={values.Title}
                        onChange={(e) => {
                          handleChange(e);
                          setFieldValue(
                            "Slug",
                            handleSlugGeneration(e.target.value)
                          );
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

                <Form.Group controlId="exampleSlug" className="mb-4">
                  <Form.Label className="text-dark">
                    Slug<span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="Slug"
                    placeholder="Slug"
                    value={values.Slug}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.Slug && !!errors.Slug}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.Slug}
                  </Form.Control.Feedback>
                </Form.Group>

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

                <Form.Group controlId="Tags" className="mb-4">
                  <Form.Label>Tags</Form.Label>
                  <Form.Control
                    type="text"
                    name="Tags"
                    placeholder="Add tags"
                    value={values.Tags}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.Tags && !!errors.Tags}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.Tags}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="FeaturedImage" className="mb-4">
                  <Form.Label>Featured Image</Form.Label>
                  <Form.Control
                    type="file"
                    name="FeaturedImageUrl"
                    accept="image/*"
                    ref={fileInputRef}
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

                <Row>
                  <Col
                    md={12}
                    className="d-flex"
                    style={{ justifyContent: "space-between" }}
                  >
                    <Button
                      type="submit"
                      variant="secondary"
                      size="md"
                      className="w-25"
                      as={NavLink}
                      to="/content-list"
                    >
                      Back To List
                    </Button>
                    <Button
                      type="submit"
                      variant="primary"
                      size="md"
                      className="w-25"
                      disabled={isLoading}
                    >
                      {isLoading ? "Submitting..." : "Submit"}
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AddSkillContent;
