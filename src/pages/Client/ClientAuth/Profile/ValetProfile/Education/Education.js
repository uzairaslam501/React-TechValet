import React, { useState } from "react";
import { Button, Card, Row, Col } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Education = ({ userRecord }) => {
  const [showForm, setShowForm] = useState(true);
  const [educationList, setEducationList] = useState([]);
  const [editItem, setEditItem] = useState(null);

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

  const handleSubmit = (values, { resetForm }) => {
    if (editItem) {
      setEducationList(
        educationList.map((item) =>
          item.id === editItem.id ? { ...values, id: editItem.id } : item
        )
      );
    } else {
      setEducationList([...educationList, { ...values, id: Date.now() }]);
    }
    setShowForm(false);
    setEditItem(null);
  };

  const handleEdit = (id) => {
    const selectedItem = educationList.find((item) => item.id === id);
    setEditItem(selectedItem);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setEducationList(educationList.filter((item) => item.id !== id));
  };

  return (
    <Card className="shadow rounded mb-3">
      <Card.Header className="d-flex justify-content-between align-items-center">
        <h6 className="m-0">Education</h6>
        <Button
          variant="link"
          onClick={() => {
            setShowForm(!showForm);
            setEditItem(null);
          }}
          style={{ color: "#fcd609", textDecoration: "none" }}
        >
          Add New
        </Button>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col xl={8} lg={8} md={8} sm={12} xs={12}>
            <div>
              {educationList.length === 0 && !showForm && (
                <p className="text-muted">No education records available.</p>
              )}
              {educationList.map((item) => (
                <div
                  key={item.id}
                  className="d-flex justify-content-between align-items-center mb-3"
                >
                  <div>
                    <h6 className="mb-0">{item.instituteName}</h6>
                    <p className="mb-0 text-muted">
                      {item.degreeName} ({item.startDate} - {item.endDate})
                    </p>
                  </div>
                  <div>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => handleEdit(item.id)}
                      className="me-2"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Col>
          <Col xl={4} lg={4} md={4} sm={12} xs={12}>
            <Formik
              initialValues={
                editItem || {
                  instituteName: "",
                  degreeName: "",
                  startDate: "",
                  endDate: "",
                }
              }
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ resetForm }) => (
                <Form className="mb-3">
                  <div className="mb-2">
                    <label htmlFor="instituteName">
                      College/University Name
                    </label>
                    <Field
                      id="instituteName"
                      name="instituteName"
                      className="form-control"
                      placeholder="College/University Name"
                    />
                    <ErrorMessage
                      name="instituteName"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="degreeName">Degree Name</label>
                    <Field
                      id="degreeName"
                      name="degreeName"
                      className="form-control"
                      placeholder="Degree Name"
                    />
                    <ErrorMessage
                      name="degreeName"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <Row>
                    <Col>
                      <div className="mb-2">
                        <label htmlFor="startDate">Start Date</label>
                        <Field
                          id="startDate"
                          name="startDate"
                          type="date"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="startDate"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                    </Col>
                    <Col>
                      <div className="mb-2">
                        <label htmlFor="endDate">End Date</label>
                        <Field
                          id="endDate"
                          name="endDate"
                          type="date"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="endDate"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Button
                        variant="danger"
                        className="w-100"
                        onClick={() => {
                          setShowForm(false);
                          setEditItem(null);
                          resetForm();
                        }}
                      >
                        Cancel
                      </Button>
                    </Col>
                    <Col>
                      <Button type="submit" variant="success" className="w-100">
                        {editItem ? "Update" : "Add"}
                      </Button>
                    </Col>
                  </Row>
                </Form>
              )}
            </Formik>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default Education;
