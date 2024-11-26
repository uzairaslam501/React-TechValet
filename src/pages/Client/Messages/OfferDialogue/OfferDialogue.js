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
}) => {
  const dispatch = useDispatch();
  const { userAuth } = useSelector((state) => state?.authentication);
  const handleSubmitOrderForm = () => {
    console.log("first");
  };

  const initialValues = {
    MessageDescription: "Offer Send",
    SenderId: String(userAuth?.id),
    ReceiverId: String(messageObject?.userDecId),
    CustomerId: String(userAuth?.id),
    ValetId: String(messageObject?.userDecId),
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
        console.log(values);
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
          <Form>
            <Form>
              <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label>Offer Title:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Offer Title"
                  value={values.offerTitle}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  isInvalid={touched.offerTitle && !!errors.offerTitle}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label>From Date Time:</Form.Label>
                <Form.Control
                  type="datetime-local"
                  value={values.startedDateTime}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  isInvalid={
                    touched.startedDateTime && !!errors.startedDateTime
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label>To Date Time:</Form.Label>
                <Form.Control
                  type="datetime-local"
                  value={values.endedDateTime}
                  onBlur={handleBlur}
                  onChange={handleChange}
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
                  onBlur={handleBlur}
                  onChange={handleChange}
                  isInvalid={
                    touched.offerDescription && !!errors.offerDescription
                  }
                />
              </FloatingLabel>
            </Form>
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
            onClick: handleSubmitOrderForm,
          },
        ]}
      />
    </>
  );
};

export default OfferDialogue;
