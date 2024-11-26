import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { FloatingLabel, Form } from "react-bootstrap";
import Dialogue from "../../../../components/Custom/Modal/modal";
import { useDispatch, useSelector } from "react-redux";

const validateLogin = Yup.object().shape({
  offerTitle: Yup.string().required(),
  startedDateTime: Yup.date().required(),
  endedDateTime: Yup.date().required(),
  offerDescription: Yup.string().required(),
});

const OfferDialogue = ({
  handleOrderClose,
  messageObject,
  showOrderDialogue,
  handleSendOffer,
}) => {
  const { userAuth } = useSelector((state) => state?.authentication);

  const initialValues = {
    messageDescription: "Offer Send",
    senderId: String(userAuth?.id),
    receiverId: String(messageObject?.userDecId),
    customerId: String(userAuth?.id),
    valetId: String(messageObject?.userDecId),
    offerTitle: "",
    startedDateTime: "",
    endedDateTime: "",
    offerDescription: "",
  };

  const { values, touched, errors, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: validateLogin,
      validateOnChange: false,
      validateOnBlur: true,
      onSubmit: (values) => {
        handleSendOffer(values);
      },
    });
  return (
    <>
      <Dialogue
        show={showOrderDialogue}
        onHide={handleOrderClose}
        headerClass="px-3 py-2"
        title="Create Offer"
        bodyContent={
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>Offer Title:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Offer Title"
                value={values.offerTitle}
                onBlur={handleBlur("offerTitle")}
                onChange={handleChange("offerTitle")}
                isInvalid={touched.offerTitle && !!errors.offerTitle}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>From Date Time:</Form.Label>
              <Form.Control
                type="datetime-local"
                value={values.startedDateTime}
                onBlur={handleBlur("startedDateTime")}
                onChange={handleChange("startedDateTime")}
                isInvalid={touched.startedDateTime && !!errors.startedDateTime}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>To Date Time:</Form.Label>
              <Form.Control
                type="datetime-local"
                value={values.endedDateTime}
                onBlur={handleBlur("endedDateTime")}
                onChange={handleChange("endedDateTime")}
                isInvalid={touched.endedDateTime && !!errors.endedDateTime}
              />
            </Form.Group>
            <FloatingLabel
              controlId="floatingTextarea2"
              label="Describe the required services - please be as detailed as
                  possible:"
            >
              <Form.Control
                as="textarea"
                placeholder="Leave a comment here"
                style={{ height: "100px" }}
                value={values.offerDescription}
                onBlur={handleBlur("offerDescription")}
                onChange={handleChange("offerDescription")}
                isInvalid={
                  touched.offerDescription && !!errors.offerDescription
                }
              />
            </FloatingLabel>
          </Form>
        }
        backdrop="static"
        customFooterButtons={[
          {
            text: "Cancel",
            className: "btn-secondary-secondary",
            onClick: handleOrderClose,
          },
          {
            text: "Send Offer",
            variant: "primary",
            onClick: handleSubmit,
          },
        ]}
      />
    </>
  );
};

export default OfferDialogue;
