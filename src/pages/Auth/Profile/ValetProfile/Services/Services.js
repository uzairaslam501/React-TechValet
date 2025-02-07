import React, { useEffect, useState } from "react";
import {
  Card,
  Row,
  Col,
  Form,
  Button,
  Dropdown,
  ButtonGroup,
  Spinner,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  addServicesOrExperience,
  getServicesRecord,
  updateServicesOrExperience,
} from "../../../../../redux/Actions/serviceActions";
import { deleteRecords } from "../../../../../redux/Actions/globalActions";
import DeleteComponent from "../../../../../components/Custom/DeleteDialoge/DeleteDialoge";

const Services = ({ userRecord, preview = false }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [userServices, setUserServices] = useState([]);
  const [serviceToDelete, setServiceToDelete] = useState(null);
  const [isAddServiceVisible, setIsAddServiceVisible] = useState(false);

  // Fetch user services when the component is mounted
  const fetchServicesRecord = () => {
    setIsLoading(true);
    dispatch(getServicesRecord(userRecord?.userEncId))
      .then((response) => {
        console.log("services", response?.payload);
        setUserServices(response?.payload);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // Handle adding a new service
  const handleAddNewService = () => {
    setIsAddServiceVisible(true);
  };

  // Hide the service form
  const handleHideServiceForm = () => {
    setIsAddServiceVisible(false);
    resetFormValues();
  };

  const resetFormValues = () => {
    setFieldValue("serviceId", "");
    setFieldValue("description", "");
  };

  // Handle service update
  const handleUpdateService = (service) => {
    handleAddNewService();
    setFieldValue(
      "serviceId",
      encodeURIComponent(service?.userExperienceEncId)
    );
    setFieldValue("description", service?.description);
  };

  // Handle deleting a service
  const handleDeleteService = (serviceId) => {
    setServiceToDelete(serviceId);
    setShowDialog(true);
  };

  // Confirm deletion of a service
  const confirmDelete = (serviceId) => {
    handleHideServiceForm();
    dispatch(
      deleteRecords(`User/delete-service/${encodeURIComponent(serviceId)}`)
    ).then((response) => {
      if (response.payload === serviceId) {
        setUserServices((prev) =>
          prev.filter((service) => service.userExperienceEncId !== serviceId)
        );
        setShowDialog(false); // Close the modal after successful deletion
      }
    });
  };

  // Formik setup
  const {
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: {
      userId: encodeURIComponent(userRecord?.userEncId) || "",
      serviceId: "",
      description: "",
    },
    validationSchema: Yup.object().shape({
      description: Yup.string().required("Service Description is required"),
    }),
    onSubmit: (values) => {
      try {
        if (values.serviceId) {
          // Update existing service
          dispatch(updateServicesOrExperience(values))
            .then((response) => {
              if (response.payload) {
                setUserServices((prev) =>
                  prev.map((service) => {
                    return service.userExperienceEncId ===
                      response.payload.userExperienceEncId
                      ? { ...service, ...response.payload } // Update the specific record
                      : service; // Keep the rest unchanged
                  })
                );
                handleHideServiceForm();
              }
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        } else {
          // Add new service
          dispatch(addServicesOrExperience(values)).then((response) => {
            setUserServices((prev) => [response.payload, ...prev]); // Prepend new service
            handleHideServiceForm();
          });
        }
      } catch (error) {
        console.error("Error:", error);
      }
    },
  });

  useEffect(() => {
    fetchServicesRecord();
  }, [userRecord]);

  return (
    <>
      <Card className="shadow rounded mb-3">
        <Card.Header className="border-bottom p-3">
          <Row>
            <Col md={6} xs={6} className="d-flex justify-content-start">
              <h6 className="m-0">Services Offered</h6>
            </Col>
            {!preview && (
              <Col md={6} xs={6} className="d-flex justify-content-end">
                <p
                  className="m-0"
                  style={{ cursor: "pointer", color: "#fcd609" }}
                  onClick={handleAddNewService}
                >
                  Add New
                </p>
              </Col>
            )}
          </Row>
        </Card.Header>
        <Card.Body
          style={{
            height: preview === false ? "475px" : "250px",
            overflowY: "scroll",
          }}
        >
          <Form onSubmit={handleSubmit}>
            {isAddServiceVisible && (
              <div className="py-3">
                <Form.Group>
                  <Form.Control
                    as="textarea"
                    value={values.description}
                    name="description"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Service Description"
                    rows={3}
                    isInvalid={touched.description && !!errors.description}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.description}
                  </Form.Control.Feedback>
                </Form.Group>
                {!preview && (
                  <Row className="mt-3">
                    <Col xs={6}>
                      <Button
                        variant="danger"
                        className="w-100"
                        onClick={handleHideServiceForm}
                      >
                        Cancel
                      </Button>
                    </Col>
                    <Col xs={6}>
                      <Button type="submit" variant="success" className="w-100">
                        Submit
                      </Button>
                    </Col>
                  </Row>
                )}
              </div>
            )}
          </Form>

          {isLoading ? (
            <Row>
              <Col className="text-center">
                <Spinner animation="grow" size="sm" />
              </Col>
            </Row>
          ) : userServices?.length > 0 ? (
            userServices.map((service) => (
              <Row className="mb-3" key={service.userExperienceEncId}>
                <Col>
                  <Row className="border-bottom">
                    <Col xl={!preview ? 10 : 12}>
                      <p style={{ wordBreak: "break-word" }}>
                        {service.description}
                      </p>
                    </Col>
                    {!preview && (
                      <Col xl={2}>
                        <Dropdown as={ButtonGroup}>
                          <Dropdown.Toggle
                            variant="primary"
                            size="sm"
                            className="rounded"
                          >
                            <i className="bi bi-three-dots-vertical"></i>
                          </Dropdown.Toggle>
                          <Dropdown.Menu align="end" className="text-center">
                            <Dropdown.Item
                              onClick={() =>
                                handleDeleteService(service.userExperienceEncId)
                              }
                            >
                              <i
                                className="bi bi-trash me-2"
                                style={{ fontSize: "14px" }}
                              ></i>
                              Delete Service
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() => handleUpdateService(service)}
                            >
                              <i
                                className="bi bi-pencil me-2"
                                style={{ fontSize: "14px" }}
                              ></i>
                              Update Service
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </Col>
                    )}
                  </Row>
                </Col>
              </Row>
            ))
          ) : (
            <Row>
              <Col>
                <h5 className="text-center">No Record Found</h5>
              </Col>
            </Row>
          )}
        </Card.Body>
      </Card>

      <DeleteComponent
        showDialog={showDialog}
        setShowDialog={setShowDialog}
        onDelete={confirmDelete}
        item={serviceToDelete}
      />
    </>
  );
};

export default Services;
