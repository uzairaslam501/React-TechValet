import React, { useState } from "react";
import { Card, Button, Form, InputGroup, ButtonGroup } from "react-bootstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { addPayPalAccount } from "../../../../../../redux/Actions/paypalActions";

const PayPalAccount = ({ userRecord }) => {
  const dispatch = useDispatch();
  const [isAttachSectionVisible, setAttachSectionVisible] = useState(false);
  const [paypalEmail, setPayPalEmail] = useState("");

  const initialValues = {
    valetId: userRecord?.userEncId || "",
    paypalEmail: "",
    isPayPalAuthorized: true,
  };

  const validationSchema = Yup.object().shape({
    paypalEmail: Yup.string()
      .email("Please enter a valid email address")
      .required("PayPal email is required"),
  });

  const deletePayPalAccount = () => {
    // Add your logic to handle account deletion
    console.log("PayPal account removed.");
  };

  const { values, touched, errors, handleSubmit, getFieldProps } = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: (values) => {
      try {
        console.log("Submitting values:", values);
        dispatch(
          addPayPalAccount({ userId: userRecord?.userEncId, paypal: values })
        ).then((response) => {
          if (response?.payload) {
            console.log("PayPal Account Added", response?.payload);
            setPayPalEmail(values.paypalEmail);
            setAttachSectionVisible(false);
          }
        });
      } catch (error) {
        console.error("Error:", error);
      }
    },
  });

  return (
    <Card className="shadow-sm rounded bg-white mb-3">
      <Card.Header className="border-bottom">
        <div className="d-flex align-items-center justify-content-between">
          <h6 className="m-0">Attach your PayPal account here</h6>
          <i
            className="bi bi-paypal"
            style={{ fontSize: "28px", color: "#0070BA" }}
          ></i>
        </div>
      </Card.Header>
      <Card.Body>
        {paypalEmail ? (
          <>
            <InputGroup className="mb-2">
              <InputGroup.Text>
                <i
                  className="fa fa-cc-paypal"
                  style={{ fontSize: "34px", color: "#001C40" }}
                ></i>
              </InputGroup.Text>
              <Form.Control
                id="paypalAccount"
                value={paypalEmail}
                placeholder="PayPal Account"
                readOnly
              />
            </InputGroup>
            <p className="mt-3">
              <span
                id="deletepaypalAccount"
                className="text-danger"
                onClick={deletePayPalAccount}
                style={{ cursor: "pointer" }}
              >
                Remove Existing Account!
              </span>
            </p>
          </>
        ) : (
          <>
            {!isAttachSectionVisible && (
              <div className="text-center p-3">
                <Button
                  variant="success"
                  onClick={() => setAttachSectionVisible(true)}
                >
                  Attach
                </Button>
              </div>
            )}
            {isAttachSectionVisible && (
              <Form id="paypalForm" onSubmit={handleSubmit}>
                <Form.Group controlId="paypalEmail">
                  <Form.Control
                    type="email"
                    placeholder="Enter your PayPal email"
                    {...getFieldProps("paypalEmail")}
                    isInvalid={touched.paypalEmail && !!errors.paypalEmail}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.paypalEmail}
                  </Form.Control.Feedback>
                </Form.Group>
                <ButtonGroup className="w-100 mt-3">
                  <Button
                    type="button"
                    variant="outline-secondary"
                    onClick={() => setAttachSectionVisible(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" variant="success">
                    Add
                  </Button>
                </ButtonGroup>
              </Form>
            )}
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default PayPalAccount;
