import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  Col,
  Container,
  Row,
  Card,
  Table,
  Button,
  Spinner,
} from "react-bootstrap";
import {
  capitalizeFirstLetter,
  toFixedTruncate,
} from "../../../../utils/_helpers";
import { chargeByPackage } from "../../../../redux/Actions/paypalActions";
import {
  getUserPackageByUserId,
  paymentWithPackage,
} from "../../../../redux/Actions/packageActions";
import PayWithStripe from "../../Messages/OfferAccept/Payment/PayWithStripe";

const OrderPreview = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();

  const [loading, setLoading] = useState(false);
  const [stripeFee, setStripeFee] = useState(0);
  const [workCharges, setWorkCharges] = useState(0);
  const [platformFee, setPlatformFee] = useState(0);
  const [workingHours, setWorkingHours] = useState(0);
  const [packageDetails, setUserPackageDetails] = useState(null);
  const [totalPayableAmount, setTotalPayableAmount] = useState(0);
  const [
    remainingSessionsAfterOrderConfirm,
    setRemainingSessionsAfterOrderConfirm,
  ] = useState(0);
  const [insufficientSessions, setInsufficientSessions] = useState("");
  const [initialValues, setInitialValues] = useState({});
  const [buttonClicked, setButtonClicked] = useState(false);

  // Fetch user package (sessions data)
  const fetchPackages = useCallback(() => {
    dispatch(getUserPackageByUserId())
      .then((response) => {
        console.log("Package Details", response?.payload);
        setUserPackageDetails(response?.payload);
      })
      .catch(() => {
        setLoading(false);
      });
  });

  const handleSubmitPaymentByPackage = () => {
    setButtonClicked(true);
    const values = {
      ...initialValues,
      actualOrderPrice: String(workCharges),
      totalWorkCharges: String(totalPayableAmount),
      workingHours: String(workingHours),
      packagePaidBy: packageDetails?.packagePaidBy,
      packageId: String(packageDetails?.id),
    };

    if (packageDetails.packagePaidBy === "STRIPE") {
      dispatch(paymentWithPackage(values))
        .then((response) => {
          if (response?.payload) {
            const values = {
              id: response?.payload,
              type: "Order-Package",
            };
            navigate("/payment-success", { state: values });
          } else {
            navigate("/PaymentCancelled", { state: values });
          }
        })
        .catch(() => {
          setButtonClicked(false);
        });
    } else {
      dispatch(chargeByPackage(values))
        .then((response) => {
          if (response?.payload) {
            const values = {
              id: response?.payload,
              type: "Order-Package",
            };
            navigate("/payment-success", { state: values });
          } else {
            navigate("/PaymentCancelled", { state: values });
          }
        })
        .catch(() => {});
    }
  };

  // Fetch user packages when the component mounts
  useEffect(() => {
    fetchPackages();
  }, [dispatch]);

  // Calculate various charges when state changes
  useEffect(() => {
    if (state && packageDetails?.remainingSessions) {
      // Calculate working hours
      const fromDate = new Date(state.startedDateTime);
      const toDate = new Date(state.endedDateTime);
      const diffInHours = Math.ceil((toDate - fromDate) / 36e5); // Difference in hours
      setWorkingHours(diffInHours);

      // Calculate work charges
      const workChargesCalculated = state?.pricePerHour * diffInHours;
      setWorkCharges(workChargesCalculated);

      // Calculate stripe fee (4% of work charges)
      const stripeFeeCalculated = workChargesCalculated * 0.04;
      setStripeFee(stripeFeeCalculated);

      // Calculate total payable amount (work charges + stripe fee)
      const totalAmountCalculated = workChargesCalculated + stripeFeeCalculated;
      setTotalPayableAmount(totalAmountCalculated);

      // Calculate platform fee (13% of total payable amount)
      const platformFeeCalculated = totalAmountCalculated * 0.13;
      setPlatformFee(platformFeeCalculated);

      // Get remaining sessions after confirming order
      if (
        packageDetails?.remainingSessions &&
        diffInHours <= packageDetails?.remainingSessions
      ) {
        setInsufficientSessions("");
        setRemainingSessionsAfterOrderConfirm(
          packageDetails?.remainingSessions - diffInHours
        );
      } else {
        setInsufficientSessions("You have insufficient Sessions");
        setRemainingSessionsAfterOrderConfirm(0);
      }

      const values = {
        valetId: state?.valetId,
        customerId: state?.customerId,
        title: state?.title,
        description: state?.description,
        fromDateTime: state?.startedDateTime,
        toDateTime: state?.endedDateTime,
        actualOrderPrice: workCharges,
        totalWorkCharges: totalPayableAmount,
        workingHours: workingHours,
        offerId: "",
      };
      setInitialValues(values);
    }
    setLoading(false);
  }, [state, packageDetails?.remainingSessions]);

  return (
    <Container className="py-5">
      <Row>
        <Col xl={12} lg={12} md={12} sm={12} xs={12}>
          <Card className="shadow mb-4">
            <Card.Header>
              <div className="d-flex justify-content-between">
                <div className="">
                  <h4 className="mb-0">
                    {capitalizeFirstLetter(state?.title) || "N/A"}
                  </h4>
                </div>
                <div className="">
                  <h4 className="mb-0">
                    Hours:
                    <span className="mb-0 ms-1">{workingHours || 0}</span>
                  </h4>
                </div>
              </div>
            </Card.Header>
            <Card.Body>
              {loading ? (
                <Row>
                  <Col className="text-center">
                    <Spinner animation="grow" />
                  </Col>
                </Row>
              ) : (
                <Row>
                  <Col xl={4} lg={4} md={4} sm={12} xs={12}>
                    <Card className="mb-4">
                      <Card.Header>
                        <Card.Title>Pay with Package</Card.Title>
                      </Card.Header>
                      <Card.Body>
                        <Table striped bordered responsive>
                          <tbody>
                            <tr>
                              <td>1 Session</td>
                              <td>1 Hour</td>
                            </tr>
                            <tr>
                              <td>Using Session</td>
                              <td>{workingHours}</td>
                            </tr>
                            <tr>
                              <td>Sessions Will be</td>
                              <td>{remainingSessionsAfterOrderConfirm}</td>
                            </tr>

                            <tr>
                              <td>Work Charges</td>
                              <td>
                                <span className="fw-semibold">$</span>
                                {workCharges.toFixed(2)}
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                        <div className="text-center">
                          {insufficientSessions ? (
                            <p className="text-danger">
                              {insufficientSessions}
                            </p>
                          ) : (
                            <Button
                              variant="primary"
                              className="my-2"
                              disabled={!!insufficientSessions || buttonClicked}
                              onClick={() => handleSubmitPaymentByPackage()}
                            >
                              {buttonClicked && (
                                <Spinner animation="border" size="sm" />
                              )}{" "}
                              Confirm with Package
                            </Button>
                          )}
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>

                  <Col xl={4} lg={4} md={4} sm={12} xs={12}>
                    <Card className="mb-4">
                      <Card.Header>
                        <Card.Title>Pay with Stripe</Card.Title>
                      </Card.Header>
                      <Card.Body>
                        <Table striped bordered responsive>
                          <tbody>
                            <tr>
                              <td>Work Charges</td>
                              <td>
                                <span className="fw-semibold">$</span>
                                {toFixedTruncate(workCharges, 2)}
                              </td>
                            </tr>
                            <tr>
                              <td>Stripe Fee (4%)</td>
                              <td>
                                <span className="fw-semibold">$</span>
                                {toFixedTruncate(stripeFee, 2)}
                              </td>
                            </tr>
                            <tr>
                              <td>Total Payable Amount</td>
                              <td>
                                <span className="fw-semibold">$</span>
                                {toFixedTruncate(totalPayableAmount, 2)}
                              </td>
                            </tr>
                            <tr>
                              <td>Platform Fee (13%)</td>
                              <td>
                                <span className="fw-semibold">$</span>
                                {toFixedTruncate(platformFee, 2)}
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                        <div className="text-center">
                          {buttonClicked ? (
                            <Spinner animation="border" size="sm" />
                          ) : (
                            initialValues && (
                              <PayWithStripe
                                selectedOfferValues={initialValues}
                              />
                            )
                          )}
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>

                  <Col xl={4} lg={4} md={4} sm={12} xs={12}>
                    <Card className="mb-4">
                      <Card.Header>
                        <Card.Title>Pay with Stripe</Card.Title>
                      </Card.Header>
                      <Card.Body>
                        <Table striped bordered responsive>
                          <tbody>
                            <tr>
                              <td>Work Charges</td>
                              <td>
                                <span className="fw-semibold">$</span>
                                {toFixedTruncate(workCharges, 2)}
                              </td>
                            </tr>
                            <tr>
                              <td>Paypal Fee (4%)</td>
                              <td>
                                <span className="fw-semibold">$</span>
                                {toFixedTruncate(stripeFee, 2)}
                              </td>
                            </tr>
                            <tr>
                              <td>Total Payable Amount</td>
                              <td>
                                <span className="fw-semibold">$</span>
                                {toFixedTruncate(totalPayableAmount, 2)}
                              </td>
                            </tr>
                            <tr>
                              <td>Platform Fee (13%)</td>
                              <td>
                                <span className="fw-semibold">$</span>
                                {toFixedTruncate(platformFee, 2)}
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                        <div className="text-center">
                          <Button
                            variant="secondary"
                            className="my-2"
                            onClick={() => console.log("Paypal Payment")}
                          >
                            Pay with PayPal
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default OrderPreview;
