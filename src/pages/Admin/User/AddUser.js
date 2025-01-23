import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, useParams } from "react-router-dom";
import * as Yup from "yup";
import { useCallback, useEffect, useRef, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import { Col, Container, Form, FormGroup, FormLabel, Row } from "react-bootstrap";
import CustomDropdown from "../../../components/Custom/Dropdown/Dropdown";
import { getTimezones } from "../../../redux/Actions/globalActions";
import PasswordField from "../../../components/Custom/PasswordInput/PasswordInput";
import { capitalizeFirstLetter } from "../../../utils/_helpers";
import { postRegister } from "../../../redux/Actions/authActions";
import { postAddUser, postUpdateUser } from "../../../redux/Actions/adminActions";

function AddUser() {
  const dispatch = useDispatch();
  const { userAuth } = useSelector((state) => state.authentication);
  const location = useLocation();
  const [isUpdateCall, setIsUpdate] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [timeZones, setTimeZones] = useState([]);
  
  const params = useParams();
  const getRecord = location.state;

  useEffect(() => {
    if (getRecord) {
      setIsUpdate(true);
    }
    
    fetchTimeZones();
  }, [getRecord, userAuth]);

  useEffect(() => {
    resetForm();
    //setFieldValue("role", chooseRole(params?.type))
    setFieldValue("role", capitalizeFirstLetter(params?.type));
  }, [params]);
  //#endregion

const fetchTimeZones = useCallback(() => {
    dispatch(getTimezones())
      .then((response) => {
        console.log("timezones", response?.payload);
        setTimeZones(Object.values(response?.payload));
      })
      .catch((error) => {
        console.log(error);
      });
  });

  const chooseRole = (role) => {
    let roleId;
    switch (role) {
        case "customer":
            roleId = 3;
            break;
        case "valet":
            roleId = 4;
            break;
        case "seo":
            roleId = 5;
            break;
        default:
            roleId = 3;
    }
    return roleId;    
};


  const initialValues = {
    id: getRecord?.id || "",
    role: capitalizeFirstLetter(params?.type) || "", //chooseRole(params.type) || "",
    firstname: getRecord?.firstname || "",
    lastname: getRecord?.lastname || "",
    username: getRecord?.username || "",
    email: getRecord?.email || "",
    password: getRecord?.password || "",
    confirmPassword: getRecord?.confirmPassword || "",
    state: getRecord?.state || "",
    city: getRecord?.city || "",
    zipCode: getRecord?.zipCode || "",
    timezone: getRecord?.timezone || "",
    country: getRecord?.country || "",
    isUpdate: isUpdateCall,
  };

  const validateAddUser = Yup.object().shape({
    isUpdate: Yup.bool().required(),
    role: Yup.string().required("Please select role"),
    firstname: Yup.string()
      .min(3, "First Name must be at least 3 characters")
      .required("Please enter first name"),
    lastname: Yup.string()
      .min(3, "Last Name must be at least 3 characters")
      .required("Please enter last name"),
    username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .required("Please enter Username"),
    email: Yup.string()
      // .email("Please enter valid email")
      .matches(
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/,
        "Please enter a valid email"
      )
      .required("Please enter email"),
    password: Yup.string().when(["isUpdate"], (isUpdate, schema) => {
      return isUpdateCall
        ? schema.optional()
        : schema.min(3).required("Please enter password");
    }),
    confirmPassword: Yup.string().when(["isUpdate"], (isUpdate, schema) => {
      return isUpdateCall
        ? schema.optional()
        : schema
            .oneOf([Yup.ref("password")], "Password not matched")
            .required("Please enter password");
    }),
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
    errors,
    touched,
    setFieldValue,
    resetForm
  } = useFormik({
    initialValues: initialValues,
    validationSchema: validateAddUser,
    onSubmit: async (values) => {
      console.log(values);
      try {
        setShowSpinner(true);
        if (isUpdateCall) {
          await dispatch(postUpdateUser(values));
        } else {
          await dispatch(postAddUser(values));
        }
      } catch (error) {
      } finally {
        setShowSpinner(false);
      }
    },
  });

  console.log(errors)

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <div className="col-xl-10 col-lg-12 col-md-9">
          <div className="card o-hidden border-0 shadow-lg my-3">
            <div className="card-body p-0">
              <div className="row">
                <div className="col-lg-12">
                  <div className="p-5">
                    <div className="text-center">
                      <h1 className="h3 text-gray-900 mb-4 text-bold">
                        {isUpdateCall 
                            ? `Update ${capitalizeFirstLetter(params?.type || 'User')}` 
                            : `Add ${capitalizeFirstLetter(params?.type || 'User')}`
                        }

                      </h1>
                    </div>
                    <form className="user" onSubmit={handleSubmit}>
                      <input type="hidden" value={values.id} />
                      <input type="hidden" value={values.role} />
                    
                      <Row>
                        {/* FirstName */}
                        <Col xl={6} lg={6} md={6} sm={12} xs={12}>
                            <Form.Group className="mb-2">
                                <Form.Label>
                                First Name <span className="text-danger">*</span>
                                </Form.Label>
                                <Form.Control
                                type="text"
                                name="firstname"
                                placeholder="First Name"
                                value={values.firstname}
                                onBlur={handleBlur("firstname")}
                                onChange={handleChange("firstname")}
                                isInvalid={touched.firstname && !!errors.firstname}
                                />
                                <Form.Control.Feedback type="invalid">
                                {touched.firstname && errors.firstname}
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
                                name="lastname"
                                placeholder="Last Name"
                                value={values.lastname}
                                onBlur={handleBlur("lastname")}
                                onChange={handleChange("lastname")}
                                isInvalid={touched.lastName && !!errors.lastname}
                                />
                                <Form.Control.Feedback type="invalid">
                                {touched.lastname && errors.lastname}
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
                                name="username"
                                placeholder="Enter Username"
                                value={values.username}
                                onBlur={handleBlur("username")}
                                onChange={handleChange("username")}
                                isInvalid={touched.username && !!errors.username}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {touched.username && errors.username}
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
                        {/* Role */}
                        {/* <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                            <Form.Group className="mb-2">
                                <Form.Label>
                                    Select Role <span className="text-danger">*</span>
                                </Form.Label>
                                <Form.Control
                                    as="select"
                                    value={values?.role || ""}                                
                                    onChange={handleChange("role")}
                                    isInvalid={touched.role && !!errors.role}
                                    >
                                        <option value="">Select</option>
                                        <option value="3">Customer</option>
                                        <option value="4">Valet</option>
                                        <option value="5">SEO</option>
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                {touched.role && errors.role}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col> */}
                        {/* Password */}
                        <Col xl={6} lg={6} md={6} sm={12} xs={12}>
                            <Form.Group className="mb-2">
                                <PasswordField
                                label="Password"
                                name="password"
                                placeholder="Enter your password"
                                required={true}
                                value={values.password}
                                onBlur={handleBlur("password")}
                                onChange={handleChange("password")}
                                isInvalid={touched.password && !!errors.password}
                                touched={touched.password}
                                errors={errors.password}
                                size="md"
                                />
                            </Form.Group>
                        </Col>
                        {/* Confirm Password */}
                        <Col xl={6} lg={6} md={6} sm={12} xs={12}>
                            <Form.Group className="mb-2">
                                <PasswordField
                                    label="Confirm Password"
                                    name="confirmPassword"
                                    placeholder="Re-enter password"
                                    required={true}
                                    value={values.confirmPassword}
                                    onBlur={handleBlur("confirmPassword")}
                                    onChange={handleChange("confirmPassword")}
                                    isInvalid={
                                        touched.confirmPassword && !!errors.confirmPassword
                                    }
                                    touched={touched.confirmPassword}
                                    errors={errors.confirmPassword}
                                    size="md"
                                />
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
                      <Row className="mt-3">
                      <button
                        type="submit"
                        className="btn btn-primary btn-block mb-3"
                        disabled={showSpinner}
                      >
                        {showSpinner ? (
                          <span>
                            <Spinner
                              as="span"
                              animation="border"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                            />
                          </span>
                        ) : isUpdateCall ? (
                          "Update "
                        ) : (
                          "Add"
                        )}
                      </button>

                      <NavLink
                        className="btn btn-white-secondary btn-block"
                        to="/user-list"
                      >
                        Back To List
                      </NavLink>
                      
                      </Row>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Row>
    </Container>
  );
}

export default AddUser;
