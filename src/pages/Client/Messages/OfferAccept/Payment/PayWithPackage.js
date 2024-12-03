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
import { getUserPackageByUserId } from "../../../../../redux/Actions/packageActions";
import { convertToISO } from "../../../../../utils/_helpers";
import { createStripeCharge } from "../../../../../redux/Actions/stripeActions";

const PayWithPackage = ({ selectedOfferValues }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [calculatedValues, setCalculatedValues] = useState({});
  const [packageDetails, setUserPackageDetails] = useState(null);
  const [packageSubmitButton, setPackageSubmitButton] = useState(false);
  const { userAuth } = useSelector((state) => state?.authentication);

  const calculateDetails = () => {
    console.log("selectedOfferValues", selectedOfferValues);
    const numericOfferPrice = parseFloat(selectedOfferValues?.offerPrice) || 0;
    const stripeChargePercentage = 4; // 4% Stripe fee
    const stripeAmount = numericOfferPrice * (stripeChargePercentage / 100);
    const actualOfferPrice = Math.ceil(numericOfferPrice - stripeAmount);

    const startDate = new Date(
      convertToISO(selectedOfferValues?.startedDateTime)
    );
    const endDate = new Date(convertToISO(selectedOfferValues?.endedDateTime));
    const timeDifference = (endDate - startDate) / (1000 * 60 * 60); // Hours

    const remainingSessions = packageDetails?.remainingSessions || 0;
    const sessionsAfterConfirmation = Math.max(
      remainingSessions - timeDifference,
      0
    );

    setCalculatedValues({
      stripeAmount,
      actualOfferPrice,
      timeDifference,
      remainingSessions,
      sessionsAfterConfirmation,
    });
  };

  const handleCheckout = () => {
    setLoading(true);
    setShowModal(true);

    dispatch(getUserPackageByUserId())
      .then((response) => {
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
  };

  const handleSubmitPayment = () => {
    setPackageSubmitButton(true);
    const values = {
      CustomerId: String(userAuth?.id),
      ValetId: String(selectedOfferValues.valetId),
      OfferId: parseInt(selectedOfferValues.offerTitleId, 10),
      PaymentTitle: selectedOfferValues.offerTitle || null,
      PaymentDescription: selectedOfferValues.offerDescription || null,
      ActualOrderPrice: String(calculatedValues.actualOfferPrice),
      TotalWorkCharges: String(calculatedValues.stripeAmount),
      FromDateTime: selectedOfferValues.startedDateTime,
      ToDateTime: selectedOfferValues.endedDateTime,
      PackagePaidBy: packageDetails?.packagePaidBy,
      PackageId: packageDetails?.id,
    };
    if (packageDetails.packagePaidBy === "STRIPE") {
      console.log(values);
      dispatch(createStripeCharge(values))
        .then((response) => {
          setUserPackageDetails(response?.payload);
          setPackageSubmitButton(false);
          setLoading(false);
        })
        .catch(() => {
          setPackageSubmitButton(false);
          setLoading(false);
        });
    } else {
    }
  };

  useEffect(() => {
    if (packageDetails) {
      calculateDetails();
    }
  }, [packageDetails]);

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
                          <td>
                            Stripe Charges = <br />
                            <sup className="mt-1 text-danger">
                              Stripe Charges 4%
                            </sup>
                          </td>
                          <td>{calculatedValues.stripeAmount || 0}</td>
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
          {
            text: "Confirm Order",
            className: "btn-primary-secondary",
            onClick: handleSubmitPayment,
            loader: packageSubmitButton,
          },
        ]}
      />
    </>
  );
};

export default PayWithPackage;
