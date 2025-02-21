import React, { useEffect, useState } from "react";
import { Button, Card, Row, Col, Form, Spinner } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import {
  addEducation,
  getEducations,
  updateEducation,
} from "../../../../../redux/Actions/educationActions";
import { deleteRecords } from "../../../../../redux/Actions/globalActions";
import DeleteComponent from "../../../../../components/Custom/DeleteDialoge/DeleteDialoge";

const Education = ({ userRecord, preview = false }) => {
  const dispatch = useDispatch();
  const [editItem, setEditItem] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [educationList, setEducationList] = useState([]);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState(null);

  const initialValues = {
    userId: userRecord?.userEncId || "",
    educationId: "",
    instituteName: "",
    degreeName: "",
    startDate: "",
    endDate: "",
  };

  // Validation schema for Formik
  const validationSchema = Yup.object({
    instituteName: Yup.string()
      .max(50, "Must be 50 characters or less")
      .required("Required"),
    degreeName: Yup.string()
      .max(50, "Must be 50 characters or less")
      .required("Required"),
    startDate: Yup.date().required("Required"),
    endDate: Yup.date().nullable("Required"),
  });

  // Fetch user services when the component is mounted
  const fetchRecords = () => {
    setIsLoading(true);
    dispatch(getEducations(userRecord?.userEncId)).then((response) => {
      if (response?.payload) {
        setEducationList(response?.payload);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    });
  };

  // Handle service update
  const handleUpdateService = (education) => {
    setEditItem(true);
    setFieldValue("educationId", education?.educationId);
    setFieldValue("degreeName", education?.degreeName);
    setFieldValue("instituteName", education?.instituteName);
    setFieldValue("startDate", education?.startDate);
    if (education?.endDate !== "") {
      setFieldValue("endDate", education?.endDate);
    }
  };

  // Handle deleting
  const handleDelete = (educationId) => {
    setRecordToDelete(educationId);
    setShowDialog(true);
  };

  // Confirm deletion of a service
  const confirmDelete = (educationId) => {
    setEditItem(false);
    resetForm();
    dispatch(
      deleteRecords(`User/delete-education/${encodeURIComponent(educationId)}`)
    ).then((response) => {
      if (response.payload === educationId) {
        setEducationList((prev) =>
          prev.filter((item) => item.educationId !== educationId)
        );
        setShowDialog(false); // Close the modal after successful deletion
      }
    });
  };

  const {
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    setFieldError,
  } = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: false,
    validateOnBlur: true,
    enableReinitialize: true,
    onSubmit: (values) => {
      try {
        setButtonDisabled(true);
        if (values.educationId) {
          dispatch(updateEducation(values))
            .then((response) => {
              if (response?.payload) {
                setEducationList((prev) =>
                  prev.map((education) => {
                    return education.educationId ===
                      response.payload.educationId
                      ? { ...education, ...response.payload }
                      : education;
                  })
                );
              }
              setButtonDisabled(false);
              setEditItem(false);
              resetForm();
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        } else {
          dispatch(addEducation(values))
            .then((response) => {
              setEducationList((prev) => [response.payload, ...prev]);

              setButtonDisabled(false);
              setEditItem(false);
              resetForm();
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        }
      } catch (error) {
        console.error("Error:", error);
      }
    },
  });

  const resetForm = () => {
    setEditItem(false);
    setFieldValue("educationId", "");
    setFieldValue("degreeName", "");
    setFieldValue("instituteName", "");
    setFieldValue("startDate", "");
    setFieldValue("endDate", "");
  };

  const handleEndTime = (dateTime) => {
    const startDateValues = values.startDate;
    const startDate = new Date(startDateValues);
    const endDate = new Date(dateTime);
    if (startDate >= endDate) {
      setFieldValue("endDate", "");
      setFieldError("endDate", "End date must be greater than start date"); // Use Formik's setFieldError
    } else {
      setFieldValue("endDate", dateTime);
      setFieldError("endDate", "");
    }
  };

  useEffect(() => {
    fetchRecords();
  }, [userRecord]);

  return (
    <>
      <Card className="shadow rounded mb-3">
        <Card.Header className="py-3">
          <h6 className="m-0">Education</h6>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col
              xl={preview === false ? 6 : 12}
              lg={preview === false ? 6 : 12}
              md={preview === false ? 6 : 12}
              sm={preview === false ? 12 : 12}
              xs={preview === false ? 12 : 12}
              style={{
                height:
                  preview === true
                    ? "155px"
                    : educationList && educationList.length >= 3
                    ? "270px"
                    : "auto",
                overflowY:
                  preview === true
                    ? "scroll"
                    : educationList && educationList.length >= 3 && "scroll",
              }}
            >
              <Row>
                {isLoading ? (
                  <Spinner animation="grow" />
                ) : (
                  <>
                    {educationList.length > 0 ? (
                      educationList.map((item) => (
                        <div
                          key={item.id}
                          className="d-flex mb-3 border-bottom py-2"
                        >
                          <Col
                            xl={preview === false ? 8 : 12}
                            lg={preview === false ? 8 : 12}
                            md={preview === false ? 8 : 12}
                            sm={preview === false ? 8 : 12}
                            xs={preview === false ? 8 : 12}
                          >
                            <h5 className="mb-0 fw-bold">
                              {item.instituteName}
                            </h5>
                            <p className="mb-0 text-muted">{item.degreeName}</p>
                            <p className="mb-0 text-muted">
                              {item.startDate} - {item.endDate}
                            </p>
                          </Col>
                          {preview === false && (
                            <Col
                              xl={4}
                              lg={4}
                              md={4}
                              sm={4}
                              xs={4}
                              className="text-end"
                            >
                              <Button
                                variant="outline-primary"
                                size="sm"
                                onClick={() => handleUpdateService(item)}
                                className="me-2"
                              >
                                Edit
                              </Button>
                              <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => handleDelete(item.educationId)}
                              >
                                Delete
                              </Button>
                            </Col>
                          )}
                        </div>
                      ))
                    ) : (
                      <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                        <h5 className="text-center text-muted">
                          No education found
                        </h5>
                      </Col>
                    )}
                  </>
                )}
              </Row>
            </Col>
            {preview === false && (
              <Col xl={6} lg={6} md={6} sm={12} xs={12}>
                <Form className="mb-3 row" onSubmit={handleSubmit}>
                  <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                    <Form.Group>
                      <Form.Label>
                        Institute Name <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        onBlur={handleBlur}
                        name="instituteName"
                        onChange={handleChange}
                        value={values.instituteName}
                        placeholder="College/University Name"
                        isInvalid={
                          touched.instituteName && !!errors.instituteName
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.instituteName}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                    <Form.Group>
                      <Form.Label>
                        Degree Name <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        name="degreeName"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.degreeName}
                        placeholder="Degree Name"
                        isInvalid={touched.degreeName && !!errors.degreeName}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.degreeName}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col xl={6} lg={6} md={6} sm={12} xs={12}>
                    <Form.Group>
                      <Form.Label>
                        Start Date <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="date"
                        name="startDate"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.startDate}
                        placeholder="Degree Name"
                        isInvalid={touched.startDate && !!errors.startDate}
                        onKeyDown={(e) => e.preventDefault()}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.startDate}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col xl={6} lg={6} md={6} sm={12} xs={12}>
                    <Form.Group>
                      <Form.Label>End Date</Form.Label>
                      <Form.Control
                        type="date"
                        name="endDate"
                        onBlur={handleBlur}
                        onChange={(e) => {
                          handleChange("endDate");
                          handleEndTime(e.target.value);
                        }}
                        value={values.endDate}
                        placeholder="End Name"
                        isInvalid={touched.endDate && !!errors.endDate}
                        onKeyDown={(e) => e.preventDefault()}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.endDate}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col className="mt-2" xl={6} lg={6} md={6} sm={12} xs={12}>
                    <Button
                      variant="danger"
                      className="w-100"
                      onClick={() => {
                        resetForm();
                      }}
                      disabled={buttonDisabled}
                    >
                      Reset
                    </Button>
                  </Col>
                  <Col className="mt-2" xl={6} lg={6} md={6} sm={12} xs={12}>
                    <Button
                      type="submit"
                      variant="success"
                      className="w-100"
                      disabled={buttonDisabled}
                    >
                      {editItem ? "Update" : "Add"}
                    </Button>
                  </Col>
                </Form>
              </Col>
            )}
          </Row>
        </Card.Body>
      </Card>

      <DeleteComponent
        showDialog={showDialog}
        setShowDialog={setShowDialog}
        onDelete={confirmDelete}
        item={recordToDelete}
      />
    </>
  );
};

export default Education;
