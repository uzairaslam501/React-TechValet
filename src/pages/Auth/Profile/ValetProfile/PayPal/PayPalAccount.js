import React, { useEffect, useState } from "react";
import {
  Card,
  Button,
  Form,
  InputGroup,
  ButtonGroup,
  Spinner,
} from "react-bootstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { addPayPalAccount } from "../../../../../redux/Actions/paypalActions";
import {
  deleteRecords,
  getRecordById,
} from "../../../../../redux/Actions/globalActions";
import DeleteComponent from "../../../../../components/Custom/DeleteDialoge/DeleteDialoge";
import {
  paypalAccountStateUpdate,
  valetProfileComplitionStateUpdate,
} from "../../../../../redux/Reducers/authSlice";
import { checkIfStringIsValid } from "../../../../../utils/_helpers";

const PayPalAccount = ({ userRecord }) => {
  const dispatch = useDispatch();
  const [paypalEmail, setPayPalEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState(null);

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

  // Handle deleting
  const deletePayPalAccount = () => {
    setRecordToDelete(userRecord?.userEncId);
    setShowDialog(true);
  };

  const confirmDelete = (userId) => {
    setIsLoading(true);
    dispatch(
      deleteRecords(`/PayPalGateWay/Delete/${encodeURIComponent(userId)}`)
    )
      .then((response) => {
        setPayPalEmail("");
        console.log("AccountCompletion ::", response?.payload);
        dispatch(paypalAccountStateUpdate(false));
        dispatch(valetProfileComplitionStateUpdate("AccountCompletion"));

        setIsLoading(false);
      })
      .catch((error) => {
        console.log("Delete Skills Error", error);
        setIsLoading(false);
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
          setIsLoading(true);
          dispatch(
            addPayPalAccount({ userId: userRecord?.userEncId, paypal: values })
          ).then((response) => {
            if (response?.payload) {
              setPayPalEmail(response?.payload?.payPalEmail);
            }
            setIsLoading(false);
          });
        } catch (error) {
          console.error("Error:", error);
          setIsLoading(false);
        }
      },
    });

  useEffect(() => {
    if (checkIfStringIsValid(userRecord?.userEncId)) {
      getPayPalAccount();
    }
  }, [paypalEmail]);

  return (
    <>
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
                  disabled={isLoading}
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
                    size="sm"
                    disabled={isLoading}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="success"
                    size="sm"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Spinner animation="border" size="sm" />
                    ) : (
                      "Add"
                    )}
                  </Button>
                </ButtonGroup>
              </Form>
            </>
          )}
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

export default PayPalAccount;
