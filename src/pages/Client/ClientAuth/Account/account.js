import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecordById } from "../../../../redux/Actions/globalActions";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  FormControl,
  FormGroup,
  FormLabel,
} from "react-bootstrap";
import { countries } from "../../../../utils/client/data/countries";
import CustomPhoneInput from "../../../../components/Custom/PhoneInput/PhoneInput";

const Account = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [phoneNumberValue, setPhoneNumberValue] = useState("");
  const { userAuth } = useSelector((state) => state?.authentication);

  const handleChangeAndSetPhoneNumber = (event) => {
    setPhoneNumberValue(event);
  };

  const fetchUserRecord = () => {
    dispatch(getRecordById(`/Admin/GetUserById?id=${userAuth.id}`)).then(
      (response) => {
        setUser(response.payload);
        console.log(response.payload);
      }
    );
  };

  useEffect(() => {
    fetchUserRecord();
  }, [userAuth.id]);
  return (
    <>
      <Container className="mt-4">
        <Row>
          <Col md={4} sm={12}></Col>
          <Col md={8} sm={12}>
            <Form id="updateAccountForm">
              <div className="shadow-sm rounded bg-white mb-3 p-3">
                <div className="border-bottom mb-3">
                  <Row>
                    <Col md={6}>
                      <h4>
                        Welcome <b>Username!</b>
                      </h4>
                    </Col>
                    <Col md={6} className="text-right">
                      {/* Add conditional logic for role-based buttons */}
                      <Button variant="success" size="sm">
                        Check Availability
                      </Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <h6>Edit Basic Info:</h6>
                    </Col>
                  </Row>
                </div>
                <Row>
                  <Col sm={6} className="mb-2">
                    <FormGroup>
                      <FormLabel>
                        First Name <span className="text-danger">*</span>
                      </FormLabel>
                      <FormControl
                        type="text"
                        placeholder="First Name"
                        value={user?.firstName}
                      />
                    </FormGroup>
                  </Col>
                  <Col sm={6} className="mb-2">
                    <FormGroup>
                      <FormLabel>
                        Last Name <span className="text-danger">*</span>
                      </FormLabel>
                      <FormControl
                        type="text"
                        placeholder="Last Name"
                        value={user?.lastName}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col sm={6} className="mb-2">
                    <FormGroup>
                      <FormLabel>
                        Username <span className="text-danger">*</span>
                      </FormLabel>
                      <FormControl
                        type="text"
                        placeholder="Username"
                        disabled
                        value={user?.userName}
                      />
                    </FormGroup>
                  </Col>
                  <Col sm={6} className="mb-2">
                    <FormGroup>
                      <FormLabel>
                        Email <span className="text-danger">*</span>
                      </FormLabel>
                      <FormControl
                        type="email"
                        placeholder="Email"
                        disabled
                        value={user?.email}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col sm={12} className="mb-2">
                    <FormGroup>
                      <FormLabel>About</FormLabel>
                      <FormControl
                        as="textarea"
                        rows={4}
                        placeholder="Write something about yourself"
                        value={user?.description}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col sm={6} className="mb-2">
                    <FormGroup>
                      <FormLabel>Contact</FormLabel>
                      <CustomPhoneInput
                        placeholder="Enter phone number"
                        className="form-control"
                        value={phoneNumberValue}
                        onChange={handleChangeAndSetPhoneNumber}
                        countryFilter={["us", "ca"]}
                      />
                    </FormGroup>
                  </Col>
                  <Col sm={6} className="mb-2">
                    <FormGroup>
                      <FormLabel>
                        Birth Date <span className="text-danger">*</span>
                      </FormLabel>
                      <FormControl type="date" required />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col sm={6} className="mb-2">
                    <FormGroup>
                      <FormLabel>
                        Gender <span className="text-danger">*</span>
                      </FormLabel>
                      <FormControl as="select" required>
                        <option value="">-- Select Gender --</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </FormControl>
                    </FormGroup>
                  </Col>
                  <Col sm={6} className="mb-2">
                    <FormGroup>
                      <FormLabel>
                        State <span className="text-danger">*</span>
                      </FormLabel>
                      <FormControl type="text" placeholder="State" required />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col sm={6} className="mb-2">
                    <FormGroup>
                      <FormLabel>
                        City <span className="text-danger">*</span>
                      </FormLabel>
                      <FormControl type="text" placeholder="City" required />
                    </FormGroup>
                  </Col>
                  <Col sm={6} className="mb-2">
                    <FormGroup>
                      <FormLabel>
                        Postal Code/Zip Code{" "}
                        <span className="text-danger">*</span>
                      </FormLabel>
                      <FormControl
                        type="text"
                        placeholder="Zip Code"
                        required
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col sm={12} className="mb-2">
                    <FormGroup>
                      <FormLabel>
                        Country <span className="text-danger">*</span>
                      </FormLabel>
                      <select className="form-control">
                        {countries.map((value, key) => {
                          return (
                            <option key={key} value={value.value}>
                              {value.name}
                            </option>
                          );
                        })}
                      </select>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col sm={12} className="mb-2">
                    <FormGroup>
                      <FormLabel>Preferred Language</FormLabel>
                      <FormControl as="select" multiple>
                        <option value="English">English</option>
                        <option value="French">French</option>
                        {/* Add other languages */}
                      </FormControl>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col sm={12} className="mb-2">
                    <FormGroup>
                      <FormLabel>
                        Timezone <span className="text-danger">*</span>
                      </FormLabel>
                      <FormControl as="select" required>
                        <option value="UTC">UTC</option>
                        {/* Add other timezones */}
                      </FormControl>
                    </FormGroup>
                  </Col>
                </Row>
                <Row className="text-right">
                  <Col>
                    <Button variant="success">Update Profile</Button>
                  </Col>
                </Row>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Account;
