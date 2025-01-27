import React, { useCallback, useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Nav,
  Tab,
  Card,
  Button,
  Spinner,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  getUserEarnings,
  getUserEarningRecords,
} from "../../../../redux/Actions/serviceActions";
import CustomTable from "../../../../components/Custom/Datatable/table";
import { useNavigate } from "react-router";

const headers = [
  { id: "0", label: "Action", column: "Action" },
  { id: "0", label: "Order #", column: "encOrderId" },
  {
    id: "0",
    label: "Title",
    column: "orderTitle",
  },
  {
    id: "0",
    label: "Price",
    column: "orderPrice",
  },
  {
    id: "0",
    label: "Earned",
    column: "earnedFromOrder",
  },
  {
    id: "0",
    label: "Paid By",
    column: "orderPaidBy",
  },
  {
    id: "0",
    label: "Date/Time",
    column: "completedAt",
  },
];

const Earnings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);
  const [earnings, setEarnings] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [pageLength, setPageLength] = useState(5);
  const [totalRecord, setTotalRecords] = useState(0);
  const { userAuth } = useSelector((state) => state?.authentication);

  const buttons = [
    {
      id: 1,
      title: "View",
      onClick: (row) => onView(row),
      variant: "outline-success",
      icon: "bi bi-view-stacked",
    },
  ];

  const getEarnings = async () => {
    dispatch(getUserEarnings(userAuth?.userEncId)).then((response) => {
      setEarnings(response?.payload);
      getEarningRecords();
    });
  };

  const getEarningRecords = async (
    pageNumber = 0,
    pageLength = 5,
    sortColumn = "",
    sortDirection = "",
    searchParam = "",
    userId = userAuth?.userEncId
  ) => {
    const params = {
      pageNumber,
      pageLength,
      sortColumn,
      sortDirection,
      searchParam,
      userId,
    };

    try {
      setIsLoading(true);
      dispatch(getUserEarningRecords(params))
        .then((response) => {
          setRecords(response.payload?.data);
          setTotalRecords(response.payload?.recordsTotal);
        })
        .catch((error) => {
          setRecords([]);
          setTotalRecords(0);
        });
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const stripeAmountWithDraw = async (amount) => {
    console.log("Amount With Draw", amount);
  };

  const onView = (row) => {
    navigate(`/order-details/${row.encOrderId}`, { state: row });
  };

  useEffect(() => {
    setIsLoading(true);
    getEarnings();
  }, []);

  return (
    <div className="second main-page py-5" style={{ minHeight: "100vh" }}>
      <Container>
        <Row>
          <Col md={6} xs={6} className="mb-3">
            <h2 className="pull-left m-0 p-0 revenue-title">Revenue Earned</h2>
          </Col>
          <Col md={6} xs={6} className="mb-3">
            <p className="d-flex justify-content-end mb-0 mt-1 p-0 withdrawal-price">
              Available For Stripe Withdrawal:{" "}
              <span className="font-weight-bold text-success">
                {!isloading ? (
                  <>$ {earnings?.balanceAvailable}</>
                ) : (
                  <Spinner animation="border" />
                )}
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
                      A 4% fee will be deducted by Stripe from the order amount
                      for every transaction.
                    </small>
                  </center>
                  <Row className="pt-3">
                    <Col md={4} xs={4} className="text-center border-box">
                      <p>
                        Total Earnings{" "}
                        <sup>
                          <i
                            className="bi bi-info bg-secondary text-white rounded-circle"
                            title="Total earnings are based on the orders you have completed and payments made by clients via Stripe."
                            style={{
                              fontSize: "17px",
                              padding: "1px 2px",
                            }}
                          ></i>
                        </sup>
                      </p>
                      <h1 className="font-weight-bold m-0">
                        ${" "}
                        {earnings?.payPalEarning?.stripeTotalBalance || "0.00"}
                      </h1>
                    </Col>
                    <Col md={4} xs={4} className="text-center border-box">
                      <p>
                        Completed Order Balance{" "}
                        <sup>
                          <i
                            className="bi bi-info bg-secondary text-white rounded-circle"
                            title="This is the balance of the completed orders currently in your Stripe account."
                            style={{
                              fontSize: "17px",
                              padding: "1px 2px",
                            }}
                          ></i>
                        </sup>
                      </p>
                      <h1 className="font-weight-bold m-0">
                        ${" "}
                        {earnings?.payPalEarning?.stripeCompletedOrderBalance ||
                          "0.00"}
                      </h1>
                    </Col>
                    <Col md={4} xs={4} className="text-center border-box">
                      <p>
                        Available Income for Withdrawal{" "}
                        <sup>
                          <i
                            className="bi bi-info bg-secondary text-white rounded-circle"
                            title="This is the balance of completed orders ready to be transferred to your bank account."
                            style={{
                              fontSize: "17px",
                              padding: "1px 2px",
                            }}
                          ></i>
                        </sup>
                      </p>
                      <h1 className="font-weight-bold m-0">
                        $ {earnings?.balanceAvailable || "0.00"}
                      </h1>
                    </Col>
                  </Row>
                </Card.Body>
                <Card.Footer className="text-end">
                  <Button
                    variant="primary-secondary"
                    size="sm"
                    disabled={
                      !earnings?.balanceAvailable ||
                      earnings.balanceAvailable === "0"
                    }
                    onClick={() =>
                      stripeAmountWithDraw(earnings?.balanceAvailable)
                    }
                  >
                    <i className="bi bi-coin me-1"></i>
                    {earnings?.balanceAvailable === "0" ||
                    !earnings?.balanceAvailable ? (
                      <span>Not Enough Balance</span>
                    ) : (
                      <span>Withdraw Payment</span>
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
                      A 4% fee will be deducted by PayPal from the order amount
                      for every transaction.
                    </small>
                  </center>
                  <Row className="pt-3">
                    {/* Total Earnings */}
                    <Col md={4} xs={4} className="text-center border-box">
                      <p>
                        Total Earnings:{" "}
                        <sup>
                          <i
                            className="bi bi-info bg-secondary text-white rounded-circle"
                            title="Total earnings represent the sum of completed orders and payments received via PayPal."
                            style={{
                              fontSize: "17px",
                              padding: "1px 2px",
                            }}
                          ></i>
                        </sup>
                      </p>
                      <h1 className="font-weight-bold m-0">
                        ${" "}
                        {earnings?.payPalEarning?.availableIncomeForWithDrawl ||
                          "0.00"}
                      </h1>
                    </Col>

                    {/* Completed Order Balance */}
                    <Col md={4} xs={4} className="text-center border-box">
                      <p>
                        Completed Order Balance:{" "}
                        <sup>
                          <i
                            className="bi bi-info bg-secondary text-white rounded-circle"
                            title="This balance reflects the total amount you have earned from completed orders through PayPal."
                            style={{
                              fontSize: "17px",
                              padding: "1px 2px",
                            }}
                          ></i>
                        </sup>
                      </p>
                      <h1 className="font-weight-bold m-0">
                        $ {earnings?.payPalEarning?.totalEarnedAmount || "0.00"}
                      </h1>
                    </Col>

                    {/* Pending Clearance */}
                    <Col md={4} xs={4} className="text-center border-box">
                      <p>
                        Pending Clearance:{" "}
                        <sup>
                          <i
                            className="bi bi-info bg-secondary text-white rounded-circle"
                            title="This represents the amount from completed orders that is still being processed by PayPal and is not yet available for withdrawal."
                            style={{
                              fontSize: "17px",
                              padding: "1px 2px",
                            }}
                          ></i>
                        </sup>
                      </p>
                      <h1 className="font-weight-bold m-0">
                        $ {earnings?.payPalEarning?.pendingClearance || "0.00"}
                      </h1>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>

        <div className="table-responsive box-table mt-4 bg-white rounded shadow-sm p-2">
          <h2 className="text-center mt-4">Earning History</h2>
          <CustomTable
            headers={headers}
            records={records}
            totalRecords={totalRecord}
            pageLength={pageLength}
            buttons={buttons}
            onPageChange={getEarningRecords}
            onPageLengthChange={setPageLength}
            loader={isloading}
            searchFunctionality={false}
            pageLengthFunctionality={true}
          />
        </div>
      </Container>
    </div>
  );
};

export default Earnings;
