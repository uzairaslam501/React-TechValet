import React, { useState } from "react";
import Dialogue from "../../../../../components/Custom/Modal/modal";
import { Button, Form, InputGroup } from "react-bootstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { addExternalBankAccount } from "../../../../../redux/Actions/stripeActions";

const BankDetails = ({ userRecord, stripeId }) => {
  const dispatch = useDispatch();
  const [showBankModal, setShowBankModal] = useState(false);

  const initialValues = {
    userId: userRecord?.userEncId || "",
    stripeAccountId: stripeId,
    accountHolderName: "",
    bankAccountNumber: "",
    routingNo: "",
  };

  const validationSchema = Yup.object().shape({
    accountHolderName: Yup.string().required("Acount Name is required"),
    bankAccountNumber: Yup.string().required("Acount Number is required"),
    routingNo: Yup.string().required("Routing Number is required"),
  });

  const { values, touched, errors, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema,
      validateOnChange: false,
      validateOnBlur: true,
      enableReinitialize: true,
      onSubmit: (values) => {
        try {
          dispatch(addExternalBankAccount(values)).then((response) => {
            if (response?.payload) {
              window.location.reload();
            }
          });
        } catch (error) {
          console.error("Error:", error);
        }
      },
    });

  const hideBankDetailsDialoge = () => {
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
                  placeholder="Bank Account Holder Name"
                  value={values.accountHolderName}
                  onBlur={handleBlur("accountHolderName")}
                  onChange={handleChange("accountHolderName")}
                  isInvalid={
                    touched.accountHolderName && !!errors.accountHolderName
                  }
                />
              </InputGroup>
              <Form.Control.Feedback type="invalid">
                {errors.accountHolderName}
              </Form.Control.Feedback>
            </Form.Group>

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
                  placeholder="Bank Account Number"
                  value={values.bankAccountNumber}
                  onBlur={handleBlur("bankAccountNumber")}
                  onChange={handleChange("bankAccountNumber")}
                  isInvalid={
                    touched.bankAccountNumber && !!errors.bankAccountNumber
                  }
                />
              </InputGroup>
              <Form.Control.Feedback type="invalid">
                {errors.bankAccountNumber}
              </Form.Control.Feedback>
            </Form.Group>

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
                  placeholder="Bank Routing Number"
                  value={values.routingNo}
                  onBlur={handleBlur("routingNo")}
                  onChange={handleChange("routingNo")}
                  isInvalid={touched.routingNo && !!errors.routingNo}
                />
              </InputGroup>
              <Form.Control.Feedback type="invalid">
                {errors.routingNo}
              </Form.Control.Feedback>
            </Form.Group>
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
          },
        ]}
      />
    </>
  );
};

export default BankDetails;
