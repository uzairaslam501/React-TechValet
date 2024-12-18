import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, InputGroup, Row } from "react-bootstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import Dialogue from "../../../../../../components/Custom/Modal/modal";
import { useDispatch } from "react-redux";
import {
  connectStripeAccount,
  getAccountVerified,
} from "../../../../../../redux/Actions/stripeActions";
import BankDetails from "./BankDetails";
import { deleteRecords } from "../../../../../../redux/Actions/globalActions";
import DeleteComponent from "../../../../../../components/Custom/DeleteDialoge/DeleteDialoge";

const validationSchema = Yup.object().shape({
  stripeEmail: Yup.string()
    .email("Please enter a valid email address")
    .required("Email associated with stripe is required"),
});

const StripeAccount = ({ userRecord }) => {
  const dispatch = useDispatch();
  const [stripeId, setStripeId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState(null);
  const [isBankAccountAdded, setIsBankAccountAdded] = useState(false);

  const validateStripeAccount = (value) => {
    setStripeId(value);
  };

  const verifyStripeAccount = () => {
    dispatch(
      getAccountVerified({
        userId: userRecord?.userEncId,
        stripeId: userRecord?.stripeId,
      })
    )
      .then((response) => {
        if (response?.payload) {
          setIsVerified(
            response?.payload?.isVerify_StripeAccount === 1 && true
          );
        } else {
          setIsVerified(false);
        }
      })
      .catch((error) => {
        setIsVerified(false);
        console.error("Verification failed:", error);
      });
  };

  const deleteStripeAccount = () => {
    setRecordToDelete(userRecord?.userEncId);
    setShowDialog(true);
  };

  const confirmDelete = (userId) => {
    dispatch(
      deleteRecords(`User/delete-stripe-account/${encodeURIComponent(userId)}`)
    )
      .then((response) => {
        setStripeId("");
        setIsVerified(false);
        setIsBankAccountAdded(false);
      })
      .catch((error) => console.log("Delete Skills Error", error));
  };

  const hideModal = () => {
    setShowModal(false);
  };

  const { values, touched, errors, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: { stripeEmail: "" },
      validationSchema,
      validateOnChange: false,
      validateOnBlur: true,
      enableReinitialize: true,
      onSubmit: (values) => {
        try {
          dispatch(
            connectStripeAccount({
              userId: userRecord?.userEncId,
              email: values.stripeEmail,
            })
          ).then((response) => {
            if (response?.payload) {
              window.open(response?.payload[0]);
            }
          });
        } catch (error) {
          console.error("Error:", error);
        }
      },
    });

  useEffect(() => {
    if (stripeId) {
      setIsVerified(stripeId);
    } else {
      setStripeId(userRecord?.stripeId);
    }
    setIsVerified(userRecord?.isVerify_StripeAccount === 1 && true);
    setIsBankAccountAdded(userRecord?.isBankAccountAdded === 1 && true);
  }, [userRecord, stripeId]);

  return (
    <>
      <Card className="shadow-sm rounded bg-white mb-3">
        <Card.Header className="border-bottom">
          <div className="d-flex align-items-center justify-content-between">
            <h6 className="m-0">Stripe Account</h6>
            <i
              className="bi bi-stripe"
              style={{ fontSize: "28px", color: "#0070BA" }}
            ></i>
          </div>
        </Card.Header>
        <div className="p-3">
          {stripeId ? (
            <InputGroup className="mb-2">
              <InputGroup.Text>
                <i
                  className="bi bi-stripe"
                  style={{ fontSize: 20, color: "#001C40" }}
                ></i>
              </InputGroup.Text>
              <Form.Control
                type="text"
                value={stripeId}
                placeholder="Stripe Id"
                disabled
              />
            </InputGroup>
          ) : (
            <InputGroup className="mb-2">
              <InputGroup.Text>
                <i
                  className="bi bi-stripe"
                  style={{ fontSize: 20, color: "#001C40" }}
                ></i>
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Stripe Id"
                onChange={(e) => validateStripeAccount(e.target.value)}
                disabled
              />
            </InputGroup>
          )}

          {stripeId ? (
            <Row>
              {!isVerified ? (
                <Col xl={6} lg={6} md={6} sm={6} xs={6}>
                  <Button
                    variant="link p-0"
                    onClick={verifyStripeAccount}
                    className="text-success"
                  >
                    Verify Account
                  </Button>
                </Col>
              ) : !isBankAccountAdded ? (
                <Col xl={6} lg={6} md={6} sm={6} xs={6}>
                  <BankDetails userRecord={userRecord} stripeId={stripeId} />
                </Col>
              ) : (
                <Col xl={6} lg={6} md={6} sm={6} xs={6}>
                  <Button variant="link" className="text-success pl-0">
                    Verified!
                  </Button>
                </Col>
              )}
              <Col xl={6} lg={6} md={6} sm={6} xs={6} className="text-end">
                <Button
                  variant="link p-0"
                  onClick={deleteStripeAccount}
                  className="text-danger"
                >
                  Remove Account!
                </Button>
              </Col>
            </Row>
          ) : (
            <p>
              Don't have a Connect Account?
              <Button variant="link" onClick={() => setShowModal(true)}>
                Create New Account
              </Button>
            </p>
          )}

          <p className="text-danger" id="stripeErr"></p>
        </div>

        {/* Modal */}
        <Dialogue
          show={showModal}
          onHide={hideModal}
          headerClass="text-primary"
          title="Create Stripe Account"
          bodyContent={
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <InputGroup>
                  <InputGroup.Text>
                    <i
                      className="bi bi-stripe"
                      style={{ fontSize: 20, color: "#001C40" }}
                    ></i>
                  </InputGroup.Text>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={values.stripeEmail}
                    onBlur={handleBlur("stripeEmail")}
                    onChange={handleChange("stripeEmail")}
                    isInvalid={touched.stripeEmail && !!errors.stripeEmail}
                  />
                </InputGroup>
                <Form.Control.Feedback type="invalid">
                  {errors.stripeEmail}
                </Form.Control.Feedback>
                <Form.Text className="text-muted">
                  We would not share this email with anyone.
                </Form.Text>
              </Form.Group>
            </Form>
          }
          showFooter={true}
          customFooterButtons={[
            {
              text: "Cancel",
              className: "btn-secondary-secondary",
              onClick: hideModal,
            },
            {
              text: "Connect",
              variant: "primary",
              onClick: handleSubmit,
            },
          ]}
        />
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

export default StripeAccount;
