import React, { useState } from "react";
import Dialogue from "../../../../../components/Custom/Modal/modal";
import { Row, Button, Col, Form, InputGroup } from "react-bootstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { addExternalBankAccount } from "../../../../../redux/Actions/stripeActions";
import { valetBankAccountDetailStateUpdate } from "../../../../../redux/Reducers/authSlice";

const BankDetails = ({ userRecord, stripeId }) => {
  const dispatch = useDispatch();
  const [showBankModal, setShowBankModal] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  const initialValues = {
    userId: userRecord?.userEncId || "",
    stripeAccountId: stripeId,
    accountHolderName: "",
    bankAccountNumber: "",
    routingNo: "",
  };

  const validationSchema = Yup.object().shape({
    accountHolderName: Yup.string().required("Account Name is required"),
    bankAccountNumber: Yup.string()
      .matches(/^\d+$/, "Account Number must contain only numbers")
      .required("Account Number is required"),
    routingNo: Yup.string()
      .matches(/^\d+$/, "Routing Number must contain only numbers")
      .min(9, "Must have 9 digits")
      .required("Routing Number is required"),
  });

  const {
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm,
  } = useFormik({
    initialValues: initialValues,
    validationSchema,
    validateOnChange: false,
    validateOnBlur: true,
    enableReinitialize: true,
    onSubmit: (values) => {
      try {
        setShowLoader(true);
        dispatch(addExternalBankAccount(values)).then((response) => {
          if (response?.payload) {
            if (response?.payload?.isBankAccountAdded === 1) {
              dispatch(valetBankAccountDetailStateUpdate(true));
            } else {
              dispatch(valetBankAccountDetailStateUpdate(false));
            }
            window.location.reload();
          }
          setShowLoader(false);
          hideBankDetailsDialoge();
        });
      } catch (error) {
        setShowLoader(false);
        console.error("Error:", error);
      }
    },
  });

  const hideBankDetailsDialoge = () => {
    resetForm();
    setShowBankModal(false);
  };

  return (
    <>
      <Button variant="link p-0" onClick={() => setShowBankModal(true)}>
        Add Bank Details
      </Button>
      <Dialogue
        show={showBankModal}
        onHide={hideBankDetailsDialoge}
        headerClass="text-primary"
        title="Add Bank Details"
        bodyContent={
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col xl={12} lg={12} md={12} sm={12} xs={12} className="mb-2">
                <Form.Group className="mb-2">
                  <InputGroup>
                    <InputGroup.Text>
                      <i
                        className="bi bi-person-vcard-fill"
                        style={{ fontSize: 20, color: "#001C40" }}
                      ></i>
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      placeholder="Account Holder Name"
                      value={values.accountHolderName}
                      onBlur={handleBlur("accountHolderName")}
                      onChange={handleChange("accountHolderName")}
                      isInvalid={
                        touched.accountHolderName && !!errors.accountHolderName
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.accountHolderName}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Col>

              <Col xl={12} lg={12} md={12} sm={12} xs={12} className="mb-2">
                <Form.Group className="mb-2">
                  <InputGroup>
                    <InputGroup.Text>
                      <i
                        className="bi bi-123"
                        style={{ fontSize: 20, color: "#001C40" }}
                      ></i>
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      placeholder="Account Number"
                      value={values.bankAccountNumber}
                      onBlur={handleBlur("bankAccountNumber")}
                      onChange={handleChange("bankAccountNumber")}
                      isInvalid={!!errors.bankAccountNumber}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.bankAccountNumber}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Col>

              <Col xl={12} lg={12} md={12} sm={12} xs={12} className="mb-2">
                <Form.Group className="mb-2">
                  <InputGroup>
                    <InputGroup.Text>
                      <i
                        className="bi bi-123"
                        style={{ fontSize: 20, color: "#001C40" }}
                      ></i>
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      placeholder="Routing Number"
                      value={values.routingNo}
                      onBlur={handleBlur("routingNo")}
                      onChange={handleChange("routingNo")}
                      isInvalid={!!errors.routingNo && touched.routingNo}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.routingNo}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        }
        showFooter={true}
        customFooterButtons={[
          {
            text: "Cancel",
            className: "btn-secondary-secondary",
            onClick: hideBankDetailsDialoge,
          },
          {
            text: "Connect",
            variant: "primary",
            onClick: handleSubmit,
            loader: showLoader,
          },
        ]}
      />
    </>
  );
};

export default BankDetails;
