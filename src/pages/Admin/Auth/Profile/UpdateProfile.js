import React, { useCallback, useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  getRecordById,
  getTimezones,
} from "../../../../redux/Actions/globalActions";
import { Button, Col, Form, Row } from "react-bootstrap";
import { postUserUpdate } from "../../../../redux/Actions/authActions";
import UserProfileImage from "../../../Auth/Profile/ProfileImage/UserProfileImage";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const [showSpinner, setShowSpinner] = useState(false);
  const [userRecords, setUserRecords] = useState(null);
  const [timeZones, setTimeZones] = useState([]);
  const loggedInUser = useSelector((state) => state?.authentication?.userAuth);

  const handleDispatch = async (action) => {
    try {
      const resultAction = await dispatch(action);
      const response = resultAction.payload;
      setUserRecords(response);
      console.log("response ::: ", response);
      setFieldValue("id", response.id || "");
      setFieldValue("firstName", response.firstName || "");
      setFieldValue("lastName", response.lastName || "");
      setFieldValue("userName", response.userName || "");
      setFieldValue("email", response.email || "");
      setFieldValue("state", response.state || "");
      setFieldValue("city", response.city || "");
      setFieldValue("zipCode", response.zipCode || "");
      setFieldValue("timezone", response.timezone || "");
      setFieldValue("country", response.country || "");
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTimeZones = useCallback(() => {
    dispatch(getTimezones())
      .then((response) => {
        setTimeZones(Object.values(response?.payload));
      })
      .catch((error) => {
        console.log(error);
      });
  });

  useEffect(() => {
    if (loggedInUser.id) {
      handleDispatch(getRecordById(`/Admin/GetUserById?id=${loggedInUser.id}`));
    }

    fetchTimeZones();
  }, []);

  const initialValues = {
    id: userRecords?.id || "",
    firstName: userRecords?.firstName || "",
    lastName: userRecords?.lastName || "",
    userName: userRecords?.userName || "",
    email: userRecords?.email || "",
    state: userRecords?.state || "",
    city: userRecords?.city || "",
    zipCode: userRecords?.zipCode || "",
    timezone: userRecords?.timezone || "",
    country: userRecords?.country || "",
  };

  const validateUpdateProfile = Yup.object().shape({
    firstName: Yup.string()
      .min(3, "First Name must be at least 3 characters")
      .required("Please enter first name"),
    lastName: Yup.string()
      .min(3, "Last Name must be at least 3 characters")
      .required("Please enter last name"),
    userName: Yup.string()
      .min(3, "userName must be at least 3 characters")
      .required("Please enter userName"),
    email: Yup.string()
      .matches(
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/,
        "Please enter a valid email"
      )
      .required("Please enter email"),
    state: Yup.string().required("Please enter State"),
    city: Yup.string().required("Please enter City"),
    zipCode: Yup.string()
      .matches(/^\d{4,10}$/, "Zip Code must be 4-10 digits")
      .required("Please enter Zip Code"),
    country: Yup.string().required("Please enter Country"),
    timezone: Yup.string().required("Please enter Timezone"),
  });

  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
    setValues,
    setFieldValue,
    errors,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: validateUpdateProfile,
    onSubmit: async (values) => {
      try {
        setShowSpinner(true);
        console.log("values ::", values);
        const resultAction = await dispatch(
          postUserUpdate({ userId: loggedInUser.userEncId, userData: values })
        );
        console.log(resultAction);
      } catch (error) {
      } finally {
        setShowSpinner(false);
      }
    },
  });

  return (
    <>
      <div className="row px-5 pb-5" style={{ marginTop: "4rem" }}>
        <div className="col-md-4">
          <Row>
            <Col xl={12} lg={12} md={12} sm={12} xs={12}>
              <UserProfileImage userRecord={userRecords} />
            </Col>
          </Row>
        </div>

        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <Form onSubmit={handleSubmit}>
                <input
                  className="form-control"
                  type="hidden"
                  value={values.id}
                />
                <Row>
                  {/* FirstName */}
                  <Col xl={6} lg={6} md={6} sm={12} xs={12}>
                    <Form.Group className="mb-2">
                      <Form.Label>
                        First Name <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="firstName"
                        placeholder="First Name"
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
                  {/* LastName */}
                  <Col xl={6} lg={6} md={6} sm={12} xs={12}>
                    <Form.Group as={Col} className="mb-2">
                      <Form.Label>
                        Last Name <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
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
                  {/* Username */}
                  <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                    <Form.Group className="mb-2">
                      <Form.Label>
                        Username <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="userName"
                        placeholder="Enter userName"
                        value={values.userName}
                        onBlur={handleBlur("userName")}
                        onChange={handleChange("userName")}
                        isInvalid={touched.userName && !!errors.userName}
                      />
                      <Form.Control.Feedback type="invalid">
                        {touched.userName && errors.userName}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  {/* Email */}
                  <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                    <Form.Group className="mb-2">
                      <Form.Label>
                        Email <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        placeholder="Enter Email"
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

                  {/* State */}
                  <Col xl={4} lg={4} md={4} sm={12} xs={12}>
                    <Form.Group className="mb-2">
                      <Form.Label>
                        State <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="state"
                        placeholder="Enter State"
                        value={values.state}
                        onBlur={handleBlur("state")}
                        onChange={handleChange("state")}
                        isInvalid={touched.state && !!errors.state}
                      />
                      <Form.Control.Feedback type="invalid">
                        {touched.state && errors.state}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  {/* City */}
                  <Col xl={4} lg={4} md={4} sm={12} xs={12}>
                    <Form.Group className="mb-2">
                      <Form.Label>
                        City <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="city"
                        placeholder="Enter City"
                        value={values.city}
                        onBlur={handleBlur("city")}
                        onChange={handleChange("city")}
                        isInvalid={touched.city && !!errors.city}
                      />
                      <Form.Control.Feedback type="invalid">
                        {touched.city && errors.city}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  {/* Postal Code/Zip Code */}
                  <Col xl={4} lg={4} md={4} sm={12} xs={12}>
                    <Form.Group className="mb-2">
                      <Form.Label>
                        Zip Code
                        <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="zipCode"
                        placeholder="Enter Zip Code"
                        value={values.zipCode}
                        onBlur={handleBlur("zipCode")}
                        onChange={handleChange("zipCode")}
                        isInvalid={touched.zipCode && !!errors.zipCode}
                      />
                      <Form.Control.Feedback type="invalid">
                        {touched.zipCode && errors.zipCode}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  {/* Timezone */}
                  <Col xl={6} lg={6} md={6} sm={12} xs={12}>
                    <Form.Group className="mb-2">
                      <Form.Label>
                        Timezone <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        as="select"
                        value={values?.timezone || ""}
                        onChange={(e) => {
                          const selectedZone = e.target.value;
                          setFieldValue("timezone", selectedZone);
                        }}
                        isInvalid={touched.timezone && !!errors.timezone}
                      >
                        <option value="">Select</option>
                        {timeZones.length > 0 &&
                          timeZones.map((zone) => (
                            <option key={zone} value={zone}>
                              {zone}
                            </option>
                          ))}
                      </Form.Control>
                      <Form.Control.Feedback type="invalid">
                        {touched.timezone && errors.timezone}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  {/* Country */}
                  <Col xl={6} lg={6} md={6} sm={12} xs={12}>
                    <Form.Group className="mb-4">
                      <Form.Label>
                        Country <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="country"
                        placeholder="Enter Country"
                        value={values.country}
                        onBlur={handleBlur("country")}
                        onChange={handleChange("country")}
                        isInvalid={touched.country && !!errors.country}
                      />
                      <Form.Control.Feedback type="invalid">
                        {touched.country && errors.country}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <div className="row mt-3">
                  <Col xs={{ span: 6, offset: 3 }} className="text-center">
                    <Button
                      type="submit"
                      className="btn-block btn-primary w-50"
                      disabled={showSpinner}
                    >
                      {showSpinner && (
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />
                      )}
                      Update
                    </Button>
                  </Col>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProfile;
