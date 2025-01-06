import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import React, { useEffect, useState } from "react";
import { Col, Container, Row, Card, Table, Button } from "react-bootstrap";
import { requestGetUserPackages } from "../../../../redux/Actions/customerActions";
import {
  capitalizeFirstLetter,
  toFixedTruncate,
} from "../../../../utils/_helpers";

const OrderPreview = () => {
  const dispatch = useDispatch();
  const { state } = useLocation();

  const [userSessions, setUserSessions] = useState(null);
  const [workingHours, setWorkingHours] = useState(0);
  const [workCharges, setWorkCharges] = useState(0);
  const [stripeFee, setStripeFee] = useState(0);
  const [totalPayableAmount, setTotalPayableAmount] = useState(0);
  const [platformFee, setPlatformFee] = useState(0);
  const [
    remainingSessionsAfterOrderConfirm,
    setRemainingSessionsAfterOrderConfirm,
  ] = useState(0);
  const [insufficientSessions, setInsufficientSessions] = useState("");

  // Fetch user package (sessions data)
  const fetchPackages = async () => {
    try {
      const response = await dispatch(requestGetUserPackages());
      setUserSessions(response.payload);
    } catch (error) {
      console.log("error:", error);
    }
  };

  // Fetch user packages when the component mounts
  useEffect(() => {
    fetchPackages();
  }, [dispatch]);

  // Calculate various charges when state changes
  useEffect(() => {
    if (state && userSessions) {
      // Calculate working hours
      const fromDate = new Date(state.StartedDateTime);
      const toDate = new Date(state.EndedDateTime);
      const diffInHours = Math.ceil((toDate - fromDate) / 36e5); // Difference in hours
      setWorkingHours(diffInHours);

      // Calculate work charges
      const workChargesCalculated = state?.PricePerHour * diffInHours;
      setWorkCharges(workChargesCalculated);

      // Calculate stripe fee (4% of work charges)
      const stripeFeeCalculated = workChargesCalculated * 0.04;
      setStripeFee(stripeFeeCalculated);

      // Calculate total payable amount (work charges + stripe fee)
      const totalAmountCalculated = workChargesCalculated + stripeFeeCalculated;
      console.log(workChargesCalculated);
      console.log(stripeFeeCalculated);
      console.log(totalAmountCalculated);
      setTotalPayableAmount(totalAmountCalculated);

      // Calculate platform fee (13% of total payable amount)
      const platformFeeCalculated = totalAmountCalculated * 0.13;
      setPlatformFee(platformFeeCalculated);

      // Get remaining sessions after confirming order
      if (userSessions && diffInHours <= userSessions) {
        setInsufficientSessions("");
        setRemainingSessionsAfterOrderConfirm(userSessions - diffInHours);
      } else {
        setInsufficientSessions("You have insufficient Sessions");
        setRemainingSessionsAfterOrderConfirm(0);
      }
    }
  }, [state, userSessions]);

  return (
    <Container className="py-5">
      <Row>
        <Col xl={12} lg={12} md={12} sm={12} xs={12}>
          <Card className="shadow mb-4">
            <Card.Header>
              <div className="d-flex justify-content-between">
                <div className="">
                  <h4 className="mb-0">
                    {capitalizeFirstLetter(state?.OfferTitle) || "N/A"}
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
                            <td>Remaining Sessions After Confirmation</td>
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
                          <p className="text-danger">{insufficientSessions}</p>
                        ) : (
                          <Button
                            variant="primary"
                            disabled={!!insufficientSessions}
                          >
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
                        <Button
                          variant="success"
                          onClick={() => console.log("Stripe Payment")}
                        >
                          Pay with Stripe
                        </Button>
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
                          onClick={() => console.log("Paypal Payment")}
                        >
                          Pay with PayPal
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default OrderPreview;
