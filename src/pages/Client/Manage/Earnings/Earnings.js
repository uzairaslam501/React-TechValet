import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Nav,
  Tab,
  Card,
  Button,
  Table,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getUserEarnings } from "../../../../redux/Actions/serviceActions";

const Earnings = () => {
  const dispatch = useDispatch();
  const [earnings, setEarnings] = useState([]);
  const { userAuth } = useSelector((state) => state?.authentication);

  const getEarnings = async () => {
    dispatch(getUserEarnings(userAuth?.userEncId)).then((response) => {
      setEarnings(response?.payload);
    });
  };

  const stripeAmountWithDraw = async (amount) => {
    console.log("Amount With Draw", amount);
  };

  useEffect(() => {
    //getEarnings();
  }, []);

  return (
    <div className="second main-page py-5">
      <Container>
        <Row>
          <Col md={6} xs={6} className="mb-3">
            <h2 className="pull-left m-0 p-0 revenue-title">Revenue Earned</h2>
          </Col>
          <Col md={6} xs={6} className="mb-3">
            <p className="d-flex justify-content-end mb-0 mt-1 p-0 withdrawal-price">
              Available For Stripe Withdrawal:{" "}
              <span className="font-weight-bold text-success">
                $ {earnings?.balanceAvailable}
              </span>
            </p>
          </Col>
        </Row>

        <Tab.Container defaultActiveKey="stripe">
          <Nav className="nav-tabs">
            <Nav.Item
              style={{
                width: "50%",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Nav.Link eventKey="stripe" className="text-center">
                Stripe Account
              </Nav.Link>
            </Nav.Item>
            <Nav.Item
              style={{
                width: "50%",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Nav.Link eventKey="paypal" className="text-center">
                Paypal Account
              </Nav.Link>
            </Nav.Item>
          </Nav>

          <Tab.Content>
            {/* Stripe Tab Content */}
            <Tab.Pane eventKey="stripe">
              <Card className="mb-3 border-0 bg-white shadow-sm rounded">
                <Card.Body>
                  <center>
                    <small
                      className="font-weight-bold"
                      style={{ fontSize: "13px" }}
                    >
                      4% of order's amount would be deducted by Stripe on every
                      order
                    </small>
                  </center>
                  <Row className="pt-3">
                    <Col md={4} xs={4} className="text-center border-box">
                      <p>Total Earning</p>
                      <h1 className="font-weight-bold m-0">
                        $ {earnings?.payPalEarning?.stripeTotalBalance}
                      </h1>
                    </Col>
                    <Col md={4} xs={4} className="text-center border-box">
                      <p>Completed Order Balance</p>
                      <h1 className="font-weight-bold m-0">
                        $ {earnings?.payPalEarning?.stripeCompletedOrderBalance}
                      </h1>
                    </Col>
                    <Col md={4} xs={4} className="text-center border-box">
                      <p>Available Income For WithDraw</p>
                      <h1 className="font-weight-bold m-0">
                        $ {earnings?.balanceAvailable}.00
                      </h1>
                    </Col>
                  </Row>
                </Card.Body>
                <Card.Footer className="text-end">
                  <Button
                    variant="primary-secondary"
                    size="sm"
                    disabled={earnings?.balanceAvailable === "0" && true}
                    onClick={() =>
                      stripeAmountWithDraw(earnings?.balanceAvailable)
                    }
                  >
                    <i className="bi bi-coin me-1"></i>
                    {earnings?.balanceAvailable === "0" ? (
                      <span>Not Enough Payment</span>
                    ) : (
                      <span>Withdraw your payment</span>
                    )}
                  </Button>
                </Card.Footer>
              </Card>
            </Tab.Pane>

            {/* PayPal Tab Content */}
            <Tab.Pane eventKey="paypal">
              <Card className="mb-3 border-0 bg-white shadow-sm rounded">
                <Card.Body>
                  <center>
                    <small
                      className="font-weight-bold"
                      style={{ fontSize: "13px" }}
                    >
                      4% of order's amount would be deducted by PayPal on every
                      order
                    </small>
                  </center>
                  <Row className="pt-3">
                    <Col md={4} xs={4} className="text-center border-box">
                      <p>Total Earning</p>
                      <h1 className="font-weight-bold m-0">
                        $ {earnings?.payPalEarning?.availableIncomeForWithDrawl}
                      </h1>
                    </Col>
                    <Col md={4} xs={4} className="text-center border-box">
                      <p>Completed Order Balance</p>
                      <h1 className="font-weight-bold m-0">
                        $ {earnings?.payPalEarning?.totalEarnedAmount}
                      </h1>
                    </Col>
                    <Col md={4} xs={4} className="text-center border-box">
                      <p>Pending Clearance</p>
                      <h1 className="font-weight-bold m-0">
                        $ {earnings?.payPalEarning?.pendingClearance}
                      </h1>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>

        <div className="table-responsive box-table mt-4 bg-white rounded shadow-sm p-2">
          <Table bordered className="m-0" id="userTable">
            <thead>
              <tr>
                <th>#</th>
                <th>OrderTitle</th>
                <th>OrderPrice</th>
                <th>EarnedAmount</th>
                <th>OrderPaidBy</th>
                <th>Date/Time</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{/* Populate rows dynamically */}</tbody>
          </Table>
        </div>
      </Container>
    </div>
  );
};

export default Earnings;
