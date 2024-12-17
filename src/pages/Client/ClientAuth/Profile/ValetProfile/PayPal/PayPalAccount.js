import React, { useEffect, useState } from "react";
import { Card, Button, Form, InputGroup, ButtonGroup } from "react-bootstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { addPayPalAccount } from "../../../../../../redux/Actions/paypalActions";
import {
  deleteRecords,
  getRecordById,
} from "../../../../../../redux/Actions/globalActions";

const PayPalAccount = ({ userRecord }) => {
  const dispatch = useDispatch();
  const [paypalEmail, setPayPalEmail] = useState("");

  const initialValues = {
    valetId: userRecord?.userEncId || "",
    paypalEmail: "",
    isPayPalAuthorized: true,
  };

  const validationSchema = Yup.object().shape({
    paypalEmail: Yup.string()
      .email("Please enter a valid email address")
      .required("Email associated with paypal is required"),
  });

  const getPayPalAccount = () => {
    dispatch(
      getRecordById(`/PayPalGateWay/GetPayPalAccount/${userRecord?.userEncId}`)
    ).then((response) => {
      setPayPalEmail(response?.payload?.payPalEmail);
    });
  };

  const deletePayPalAccount = () => {
    dispatch(
      deleteRecords(`/PayPalGateWay/Delete/${userRecord?.userEncId}`)
    ).then(() => {
      setPayPalEmail("");
    });
  };

  const { values, touched, errors, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema,
      validateOnChange: false,
      validateOnBlur: true,
      enableReinitialize: true,
      onSubmit: (values) => {
        try {
          dispatch(
            addPayPalAccount({ userId: userRecord?.userEncId, paypal: values })
          ).then((response) => {
            console.log("response", response);
            if (response?.payload) {
              setPayPalEmail(response?.payload?.payPalEmail);
            }
          });
        } catch (error) {
          console.error("Error:", error);
        }
      },
    });

  useEffect(() => {
    getPayPalAccount();
  }, [paypalEmail]);

  return (
    <Card className="shadow-sm rounded bg-white mb-3">
      <Card.Header className="border-bottom">
        <div className="d-flex align-items-center justify-content-between">
          <h6 className="m-0">PayPal Account</h6>
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
                  className="bi bi-paypal"
                  style={{ fontSize: "20px", color: "#001C40" }}
                ></i>
              </InputGroup.Text>
              <Form.Control
                id="paypalAccount"
                value={paypalEmail}
                placeholder="PayPal Account"
                disabled
              />
            </InputGroup>
            <p className="mt-1 text-end">
              <Button
                variant="link"
                className="text-danger"
                onClick={deletePayPalAccount}
              >
                Remove Account!
              </Button>
            </p>
          </>
        ) : (
          <>
            <Form id="paypalForm" onSubmit={handleSubmit}>
              <Form.Group controlId="paypalEmail">
                <Form.Control
                  type="email"
                  placeholder="Enter your PayPal email"
                  value={values.paypalEmail}
                  onBlur={handleBlur("paypalEmail")}
                  onChange={handleChange("paypalEmail")}
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
                  onClick={() => setPayPalEmail("")}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="success">
                  Add
                </Button>
              </ButtonGroup>
            </Form>
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default PayPalAccount;
