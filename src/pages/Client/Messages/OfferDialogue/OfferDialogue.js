import React, { useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { FloatingLabel, Form } from "react-bootstrap";
import Dialogue from "../../../../components/Custom/Modal/modal";
import { useDispatch, useSelector } from "react-redux";
import {
  disabledPreviousDateTime,
  getFirstAndLastDayOfMonth,
  setDateTimeRestrictions,
  truncateDate,
} from "../../../../utils/_helpers";
import { getTimeSlots } from "../../../../redux/Actions/orderActions";

const validateLogin = Yup.object().shape({
  offerTitle: Yup.string().required("This Field is Required"),
  startedDateTime: Yup.date().required("This Field is Required"),
  endedDateTime: Yup.date()
    .required("This Field is Required")
    .typeError("Invalid date-time format")
    .test(
      "is-at-least-one-hour-later",
      "The end date and time must be at least one hour after the start date and time.",
      function (value) {
        const { startedDateTime } = this.parent;
        if (!startedDateTime || !value) return true;
        const start = new Date(startedDateTime);
        const end = new Date(value);
        const differenceInHours = (end - start) / (1000 * 60 * 60);
        return differenceInHours >= 1;
      }
    ),
  offerDescription: Yup.string().required("This Field is Required"),
});

const OfferDialogue = ({
  handleOrderClose,
  messageObject,
  showOrderDialogue,
  handleSendOffer,
  loader,
  selectedDateTime,
  restrictions,
  valetId,
}) => {
  const dispatch = useDispatch();
  const { userAuth } = useSelector((state) => state?.authentication);

  const initialValues = {
    messageDescription: "Offer Send",
    senderId: String(userAuth?.id),
    receiverId: String(messageObject?.userDecId) || "",
    customerId: String(userAuth?.id),
    valetId: String(messageObject?.userDecId) || "",
    offerTitle: "",
    startedDateTime: selectedDateTime || "",
    endedDateTime: "",
    offerDescription: "",
  };

  const {
    values,
    touched,
    errors,
    setFieldValue,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: validateLogin,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: (values) => {
      handleSendOffer(values);
    },
  });

  const handleGetSlots = (valetId, selectedDateTime) => {
    dispatch(getTimeSlots({ userId: valetId, date: selectedDateTime })).then(
      (response) => {
        console.log(response?.payload);
      }
    );
  };

  const handleDateTimeMatch = (value, field) => {
    if (field === "startedDateTime" && !value) {
      setFieldValue("endedDateTime", "");
    }
    setFieldValue(field, value);
  };

  const validRange = {
    start: getFirstAndLastDayOfMonth().currentDay,
    end: getFirstAndLastDayOfMonth().monthEnd,
  };

  // useEffect(() => {
  //   handleGetSlots(valetId, truncateDate(selectedDateTime));
  // }, selectedDateTime);

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
              {touched.offerTitle && !!errors.offerTitle && (
                <Form.Control.Feedback type="invalid">
                  {errors.offerTitle}
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>From Date Time:</Form.Label>
              <Form.Control
                type="datetime-local"
                value={values.startedDateTime}
                onBlur={handleBlur("startedDateTime")}
                onChange={(e) => {
                  handleChange("startedDateTime");
                  handleDateTimeMatch(e.target.value, "startedDateTime");
                }}
                min={disabledPreviousDateTime()}
                max={
                  restrictions || setDateTimeRestrictions("max", validRange.end)
                }
                isInvalid={touched.startedDateTime && !!errors.startedDateTime}
                onKeyDown={(e) => e.preventDefault()}
              />
              {touched.startedDateTime && !!errors.startedDateTime && (
                <Form.Control.Feedback type="invalid">
                  {errors.startedDateTime}
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>To Date Time:</Form.Label>
              <Form.Control
                type="datetime-local"
                value={values.endedDateTime}
                onBlur={handleBlur("endedDateTime")}
                onChange={(e) => {
                  handleChange("endedDateTime");
                  handleDateTimeMatch(e.target.value, "endedDateTime");
                }}
                disabled={!values.startedDateTime}
                min={disabledPreviousDateTime()}
                max={
                  restrictions || setDateTimeRestrictions("max", validRange.end)
                }
                isInvalid={touched.endedDateTime && !!errors.endedDateTime}
                onKeyDown={(e) => e.preventDefault()}
              />
              {touched.endedDateTime && !!errors.endedDateTime && (
                <Form.Control.Feedback type="invalid">
                  {errors.endedDateTime}
                </Form.Control.Feedback>
              )}
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
              {touched.offerDescription && !!errors.offerDescription && (
                <Form.Control.Feedback type="invalid">
                  {errors.offerDescription}
                </Form.Control.Feedback>
              )}
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
            loader: loader,
          },
        ]}
      />
    </>
  );
};

export default OfferDialogue;
