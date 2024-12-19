import React, { useEffect, useState } from "react";
import { Button, Card, Row, Col, Form, Spinner } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import {
  addEducation,
  getEducations,
  updateEducation,
} from "../../../../../../redux/Actions/educationActions";
import { deleteRecords } from "../../../../../../redux/Actions/globalActions";
import DeleteComponent from "../../../../../../components/Custom/DeleteDialoge/DeleteDialoge";

const Education = ({ userRecord }) => {
  const dispatch = useDispatch();
  const [editItem, setEditItem] = useState(true);
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
    endDate: Yup.date()
      .min(Yup.ref("startDate"), "End date cannot be before start date")
      .required("Required"),
  });

  // Fetch user services when the component is mounted
  const fetchRecords = () => {
    setIsLoading(true);
    dispatch(getEducations(userRecord?.userEncId)).then((response) => {
      setEducationList(response?.payload);
      console.log("response?.payload", response?.payload);
      setIsLoading(false);
    });
  };

  // Handle service update
  const handleUpdateService = (education) => {
    setEditItem(true);
    setFieldValue("educationId", encodeURIComponent(education?.educationId));
    setFieldValue("degreeName", education?.degreeName);
    setFieldValue("instituteName", education?.instituteName);
    setFieldValue("startDate", education?.startDate);
    setFieldValue("endDate", education?.endDate);
  };

  // Handle deleting
  const handleDelete = (educationId) => {
    setRecordToDelete(educationId);
    setShowDialog(true);
  };

  // Confirm deletion of a service
  const confirmDelete = (educationId) => {
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
          dispatch(updateEducation(values)).then((response) => {
            console.log("response", response?.payload);
            setEducationList((prev) => [
              response.payload,
              ...prev.filter((item) => item.educationId !== values.educationId),
            ]);
          });
        } else {
          dispatch(addEducation(values)).then((response) => {
            console.log("response", response?.payload);
            setEducationList((prev) => [response.payload, ...prev]);
          });
        }
        setButtonDisabled(false);
        setEditItem(false);
        resetForm();
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
              xl={6}
              lg={6}
              md={6}
              sm={12}
              xs={12}
              style={
                educationList && educationList.length >= 3
                  ? { height: "270px", overflowY: "scroll" }
                  : { height: "auto" }
              }
            >
              <Row>
                {isLoading ? (
                  <Spinner animation="grow" />
                ) : (
                  <>
                    {educationList.map((item) => (
                      <div
                        key={item.id}
                        className="d-flex mb-3 border-bottom py-2"
                      >
                        <Col xl={8} lg={8} md={8} sm={8} xs={8}>
                          <h5 className="mb-0 fw-bold">{item.instituteName}</h5>
                          <p className="mb-0 text-muted">{item.degreeName}</p>
                          <p className="mb-0 text-muted">
                            {item.startDate} - {item.endDate}
                          </p>
                        </Col>
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
                      </div>
                    ))}
                  </>
                )}
              </Row>
            </Col>
            <Col xl={6} lg={6} md={6} sm={12} xs={12}>
              <Form className="mb-3 row" onSubmit={handleSubmit}>
                <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                  <Form.Group>
                    <Form.Label>Institute Name</Form.Label>
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
                    <Form.Label>Degree Name</Form.Label>
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
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control
                      type="date"
                      name="startDate"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.startDate}
                      placeholder="Degree Name"
                      isInvalid={touched.startDate && !!errors.startDate}
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
                      onChange={handleChange}
                      value={values.endDate}
                      placeholder="End Name"
                      isInvalid={touched.endDate && !!errors.endDate}
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
