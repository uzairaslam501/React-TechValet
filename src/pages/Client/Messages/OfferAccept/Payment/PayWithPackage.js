import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Container,
  Spinner,
  Table,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Dialogue from "../../../../../components/Custom/Modal/modal";
import {
  getPackageByUserId,
  paymentWithPackage,
} from "../../../../../redux/Actions/packageActions";
import {
  calculateWorkingHours,
  toFixedTruncate,
} from "../../../../../utils/_helpers";
import { chargeByPackage } from "../../../../../redux/Actions/paypalActions";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const PayWithPackage = ({
  selectedOfferValues,
  fetchMessages,
  setShowAcceptOrderDialogue,
  setButtonDisabled,
  buttonDisabled,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [calculatedValues, setCalculatedValues] = useState({});
  const [packageDetails, setUserPackageDetails] = useState(null);
  const [packageSubmitButton, setPackageSubmitButton] = useState(false);
  const { userAuth } = useSelector((state) => state?.authentication);

  const calculateDetails = () => {
    const numericOfferPrice = parseFloat(selectedOfferValues?.offerPrice) || 0;
    const stripeChargePercentage = 4; // 4% Stripe fee
    const stripeAmount = numericOfferPrice * (stripeChargePercentage / 100);
    const actualOfferPrice = selectedOfferValues?.offerPrice;

    if (
      selectedOfferValues.startedDateTime &&
      selectedOfferValues.endedDateTime
    ) {
      const timeDifference = calculateWorkingHours(
        selectedOfferValues.startedDateTime,
        selectedOfferValues.endedDateTime
      );

      const remainingSessions = packageDetails?.remainingSessions || 0;
      const sessionsAfterConfirmation = Math.round(
        remainingSessions - timeDifference
      );

      setCalculatedValues({
        stripeAmount,
        actualOfferPrice,
        timeDifference,
        remainingSessions,
        sessionsAfterConfirmation,
      });
    } else {
      toast.warning(
        "There is some issue while proceeding your order, please try again later or if the issue is persist contact support."
      );
    }
  };

  const handleCheckout = () => {
    setLoading(true);
    setShowModal(true);
    setButtonDisabled(true);

    dispatch(getPackageByUserId())
      .then((response) => {
        console.log(response?.payload);
        setUserPackageDetails(response?.payload);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const handleCloseModal = () => {
    setLoading(false);
    setShowModal(false);
    setButtonDisabled(false);
    setPackageSubmitButton(false);
  };

  const handleSubmitPayment = () => {
    console.log("selectedOfferValues", selectedOfferValues);
    setButtonDisabled(true);
    setPackageSubmitButton(true);
    const values = {
      customerId:
        userAuth?.role === "Customer"
          ? encodeURIComponent(userAuth?.userEncId)
          : String(encodeURIComponent(selectedOfferValues?.customerEncId)),
      valetId: encodeURIComponent(selectedOfferValues?.senderEncId),
      offerId: String(parseInt(selectedOfferValues.offerTitleId, 10)),
      title: selectedOfferValues.offerTitle || null,
      description: selectedOfferValues.offerDescription || null,
      actualOrderPrice: String(calculatedValues.actualOfferPrice),
      totalWorkCharges: String(
        toFixedTruncate(
          parseFloat(calculatedValues.actualOfferPrice) +
            parseFloat(calculatedValues.stripeAmount),
          2
        )
      ),
      fromDateTime: selectedOfferValues.startedDateTime,
      toDateTime: selectedOfferValues.endedDateTime,
      packagePaidBy: packageDetails?.paidBy,
      packageId: String(packageDetails?.id),
      messageId: String(selectedOfferValues.id),
      workingHours: String(calculatedValues.timeDifference),
    };

    if (packageDetails.paidBy === "STRIPE") {
      dispatch(paymentWithPackage(values))
        .then((response) => {
          if (response?.payload) {
            const values = {
              id: response?.payload,
              type: "Order-Package",
            };
            navigate("/payment-success", { state: values });
            handleCloseModal();
          }
        })
        .catch(() => {
          handleCloseModal();
        });
    } else if (packageDetails.paidBy === "PAYPAL") {
      dispatch(chargeByPackage(values))
        .then((response) => {
          if (response?.payload) {
            const values = {
              id: response?.payload,
              type: "Order-Package",
            };
            navigate("/payment-success", { state: values });
            handleCloseModal();
          }
        })
        .catch(() => {
          handleCloseModal();
        });
    }
  };

  useEffect(() => {
    if (packageDetails) {
      calculateDetails();
    }
  }, [selectedOfferValues, packageDetails]);

  return (
    <>
      <Button
        onClick={handleCheckout}
        className="btn-secondary-secondary w-100"
        disabled={buttonDisabled}
      >
        Pay With Package
      </Button>

      <Dialogue
        show={showModal}
        onHide={handleCloseModal}
        headerClass="px-3 py-2"
        title="Pay With Package"
        bodyContent={
          <Container>
            {loading ? (
              <Spinner animation="grow" />
            ) : (
              packageDetails && (
                <Card>
                  <CardHeader>
                    <h5>Use Sessions</h5>
                    <h6>Project Title: {selectedOfferValues?.offerTitle}</h6>
                  </CardHeader>
                  <CardBody>
                    <Table>
                      <tbody>
                        <tr>
                          <td>1 Session =</td>
                          <td>1 Hour</td>
                        </tr>
                        <tr>
                          <td>Total Working Hours =</td>
                          <td>{calculatedValues.timeDifference || 0}</td>
                        </tr>
                        <tr>
                          <td>Actual Offer Price =</td>
                          <td>{calculatedValues.actualOfferPrice || 0}</td>
                        </tr>
                        <tr>
                          <td>Sessions Have =</td>
                          <td>{calculatedValues.remainingSessions || 0}</td>
                        </tr>
                        <tr>
                          <td>Sessions After Confirmation =</td>
                          <td>
                            {calculatedValues.sessionsAfterConfirmation || 0}
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </CardBody>
                </Card>
              )
            )}
          </Container>
        }
        backdrop="static"
        customFooterButtons={[
          calculatedValues.sessionsAfterConfirmation < 0
            ? {
                text: "Confirm Order",
                className: "btn-primary-secondary disabled",
                size: "sm",
              }
            : {
                text: "Confirm Order",
                className: "btn-primary-secondary text-center",
                onClick: handleSubmitPayment,
                loader: packageSubmitButton,
                size: "sm",
              },
        ]}
      />
    </>
  );
};

export default PayWithPackage;
