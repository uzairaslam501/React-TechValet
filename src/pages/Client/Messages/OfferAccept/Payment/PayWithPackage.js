import React, { useState } from "react";
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
import { getUserPackageByUserId } from "../../../../../redux/Actions/packageActions";
import { convertToFormattedDateTimeWithAMPM } from "../../../../../utils/_helpers";

const PayWithPackage = ({ selectedOfferValues }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [packageDetails, setUserPackageDetails] = useState(null);
  const { userAuth } = useSelector((state) => state?.authentication);
  const [numericOfferPrice, setNumericOfferPrice] = useState(0);
  const [stripePercentage, setStripePercentage] = useState(0);
  const [stripeAmount, setStripeAmount] = useState(0);
  const [actualOfferPrice, setActualOfferPrice] = useState(0);

  const initialValues = {
    CustomerId: String(userAuth?.id),
    ValetId: String(selectedOfferValues.valetId),
    OfferId: parseInt(selectedOfferValues.offerTitleId, 10),
    PaymentTitle: selectedOfferValues.offerTitle || null,
    PaymentDescription: selectedOfferValues.offerDescription || null,
    ActualOrderPrice: String(selectedOfferValues.offerPrice),
    TotalWorkCharges: String(
      parseFloat(selectedOfferValues.offerPrice || 0) +
        parseFloat(selectedOfferValues.transactionFee || 0)
    ),
    FromDateTime: selectedOfferValues.startedDateTime,
    ToDateTime: selectedOfferValues.endedDateTime,
  };

  const handleCheckout = () => {
    setNumericOfferPrice(parseFloat(initialValues?.ActualOrderPrice));
    try {
      setLoading(true);
      setShowModal(true);
      dispatch(getUserPackageByUserId()).then((response) => {
        console.log(response?.payload);
        calculcatesActualOfferPrice();
        setUserPackageDetails(response?.payload);
        setLoading(false);
      });
    } catch (error) {}
  };

  const calculcatesActualOfferPrice = () => {
    if (numericOfferPrice) {
      const stripeChargePercentage = 4; //In Percentage
      const stripeAmount = numericOfferPrice * (stripeChargePercentage / 100);
      const actualPriceOfOffer = numericOfferPrice - stripeAmount;
      initialValues.ActualOrderPrice = Math.ceil(actualPriceOfOffer).toString();
      setActualOfferPrice(Math.ceil(actualPriceOfOffer).toString());
      handleLimitPackage();
    }
  };

  const handleLimitPackage = () => {
    const startDate = convertToFormattedDateTimeWithAMPM(
      initialValues.FromDateTime
    );

    const endDate = convertToFormattedDateTimeWithAMPM(
      initialValues.ToDateTime
    );

    const timeDifference = endDate - startDate;

    const NoOfWorkingHour = timeDifference / (1000 * 60 * 60);
    if (NoOfWorkingHour <= packageDetails?.remainingPackage) {
      const remainingSession =
        packageDetails?.remainingPackage - NoOfWorkingHour;
      console.log("remainingSession", remainingSession);
    } else {
    }
  };

  const handleCloseModal = () => {
    setLoading(false);
    setShowModal(false);
  };

  return (
    <>
      <Button
        onClick={handleCheckout}
        className="btn-secondary-secondary w-100"
      >
        Pay With Package
      </Button>

      <Dialogue
        show={showModal}
        onHide={handleCloseModal}
        headerClass="px-3 py-2"
        title="Create Offer"
        bodyContent={
          <Container>
            {loading ? (
              <Spinner animation="grow" />
            ) : (
              packageDetails && (
                <Card>
                  <CardHeader>
                    <h5>Use Sessions</h5>
                    <h6>Project Title: {initialValues?.PaymentTitle}</h6>
                  </CardHeader>
                  <CardBody>
                    <Table>
                      <tr>
                        <td>1 Session = </td>
                        <td>1 Hour</td>
                      </tr>
                      <tr>
                        <td>Total Working Hours =</td>
                        <td>1</td>
                      </tr>
                      <tr>
                        <td>Using Session</td>
                        <td>1</td>
                      </tr>
                      <tr>
                        <td>Remaining Sessions</td>
                        <td>{packageDetails?.remainingSessions}</td>
                      </tr>
                      <tr>
                        <td>Remaining Sessions After Confirmation</td>
                        <td>{packageDetails?.remainingSessions}</td>
                      </tr>
                      <tr>
                        <td>PAY By</td>
                        <td>Package</td>
                      </tr>
                    </Table>
                  </CardBody>
                </Card>
              )
            )}
          </Container>
        }
        backdrop="static"
        customFooterButtons={[
          {
            text: "Cancel",
            className: "btn-secondary-secondary",
            onClick: handleCloseModal,
          },
        ]}
      />
    </>
  );
};

export default PayWithPackage;
