import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  getUserEarnings,
  getUserEarningRecords,
} from "../../../../redux/Actions/serviceActions";
import CustomTable from "../../../../components/Custom/Datatable/table";
import { useNavigate } from "react-router";
import EarningsDashboard from "./EarningsDashboard";
import { parseStringToFloat } from "../../../../utils/_helpers";
import Dialogue from "../../../../components/Custom/Modal/modal";
import { postWithdrawStripePayment } from "../../../../redux/Actions/stripeActions";
import { NavLink } from "react-router-dom";

const headers = [
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

  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [loader, setLoader] = useState(false);

  const { userAuth } = useSelector((state) => state?.authentication);

  const earningsData = {
    "Total Earnings": parseStringToFloat(
      earnings?.payPalEarning?.stripeTotalBalance
    ),
    "Completed Orders": parseStringToFloat(
      earnings?.payPalEarning?.stripeCompletedOrderBalance
    ),
    "Available for Withdrawal": parseStringToFloat(earnings?.balanceAvailable),
  };

  const earningsPaypalData = {
    "Total Earnings": parseStringToFloat(
      earnings?.payPalEarning?.totalEarnedAmount
    ),
    "Pending Clearance": parseStringToFloat(
      earnings?.payPalEarning?.pendingClearance
    ),
    "Available for Withdrawal": parseStringToFloat(
      earnings?.payPalEarning?.availableIncomeForWithDrawl
    ),
  };

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
          if (response?.payload) {
            const data = response.payload.data.map((obj) => {
              return {
                ...obj,
                orderTitle: (
                  <NavLink to={`/order-details/${obj.encOrderId}`}>
                    {obj.orderTitle}
                  </NavLink>
                ),
                orderPrice: (
                  <>
                    <span className="fw-bold">$</span>
                    {obj.orderPrice}
                  </>
                ),
                earnedFromOrder: (
                  <>
                    <span className="">{obj.earnedFromOrder}</span>
                  </>
                ),
                orderPaidBy:
                  obj.orderPaidBy === "STRIPE" ? (
                    <Badge
                      style={{
                        display: "inline-block",
                        padding: "5px 12px",
                        borderRadius: "30px",
                        fontSize: "13px",
                        fontWeight: "normal",
                        textAlign: "center",
                        minWidth: "80px",
                      }}
                      bg="success"
                    >
                      STRIPE
                    </Badge>
                  ) : obj.orderPaidBy === "PAYPAL" ? (
                    <Badge
                      style={{
                        display: "inline-block",
                        padding: "5px 12px",
                        borderRadius: "30px",
                        fontSize: "13px",
                        fontWeight: "normal",
                        textAlign: "center",
                        minWidth: "80px",
                      }}
                      className="p-2"
                      bg="warning"
                    >
                      PAYPAL
                    </Badge>
                  ) : obj.orderPaidBy === "Package" ? (
                    <Badge
                      style={{
                        display: "inline-block",
                        padding: "5px 12px",
                        borderRadius: "30px",
                        fontSize: "13px",
                        fontWeight: "normal",
                        textAlign: "center",
                        minWidth: "80px",
                      }}
                      className="p-2"
                      bg="primary"
                    >
                      Package
                    </Badge>
                  ) : null,
              };
            });

            setRecords(data); // Make sure you're setting the updated 'data' instead of response.payload.data
            setTotalRecords(response.payload?.recordsTotal);
          }
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

  const onView = (row) => {
    navigate(`/order-details/${row.encOrderId}`, { state: row });
  };

  const handleWithdrawStripeAmount = () => {
    setLoader(true);

    dispatch(postWithdrawStripePayment(encodeURIComponent(userAuth?.userEncId)))
      .then((response) => {
        console.log("response withdraw ::", response?.payload);
        closeStripeWithdrawModal();
        if (response?.payload) {
          // after getting response reload earnings from db
          setIsLoading(true);
          getEarnings();
        }
      })
      .catch((error) => {
        closeStripeWithdrawModal();
      });
  };

  const closeStripeWithdrawModal = () => {
    setLoader(false);
    setShowWithdrawModal(false);
  };

  useEffect(() => {
    setIsLoading(true);
    getEarnings();
  }, [dispatch]);

  return (
    <>
      <div className="second main-page py-5" style={{ minHeight: "100vh" }}>
        <Container>
          <Card
            className="border-0 bg-white"
            style={{
              borderRadius: "20px",
            }}
          >
            <Card.Body>
              <h2 className="text-center mb-4">Earnings History</h2>
              <Row>
                <Col xl={6} lg={6} md={6} sm={12} xs={12}>
                  <Card className="border-0 shadow bg-white">
                    <Card.Body>
                      <Row className="mt-4">
                        <div className="col-8 text-end">
                          <h2 className="mx-auto">Stripe Earnings </h2>
                        </div>
                        <div className="col-4 text-end mt-2">
                          <Button
                            size="sm"
                            onClick={() =>
                              setShowWithdrawModal(!showWithdrawModal)
                            }
                            title="Withdraw To Your Bank Account"
                          >
                            Withdraw <i className="bi bi-bank"></i>
                          </Button>
                        </div>
                      </Row>
                      <EarningsDashboard
                        earningsData={earningsData}
                        colors={["#ff9800", "#e91e63", "#3f51b5"]}
                      />
                    </Card.Body>
                  </Card>
                </Col>
                <Col xl={6} lg={6} md={6} sm={12} xs={12}>
                  <Card className="border-0 shadow bg-white">
                    <Card.Body>
                      <h2 className="text-center mt-4">Paypal Earnings</h2>
                      <EarningsDashboard
                        earningsData={earningsPaypalData}
                        colors={["#4caf50", "#2196f3", "#9c27b0"]}
                      />
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              <Row className="mt-5">
                <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                  <Card
                    className="border-0 shadow bg-white"
                    style={{
                      borderRadius: "20px",
                    }}
                  >
                    <Card.Body>
                      <div className="table-responsive">
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
                          tableClassName="text-center"
                        />
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Container>
      </div>

      <Dialogue
        show={showWithdrawModal}
        onHide={() => setShowWithdrawModal(false)}
        title="Confirm Withdraw"
        bodyContent={
          userAuth?.isBankAccountAdded === false
            ? "Kindly complete your Stripe/Bank account details from your profile in order to withdraw your stripe earnings."
            : "Are you sure you want to withdraw your payment to your bank account?"
        }
        customFooterButtons={
          userAuth?.isBankAccountAdded === true
            ? [
                {
                  text: "Cancel",
                  variant: "secondary",
                  onClick: () => setShowWithdrawModal(false),
                  type: "button",
                },
                {
                  text: "Confirm",
                  onClick: handleWithdrawStripeAmount,
                  variant: "primary",
                  type: "button",
                  loader: loader,
                },
              ]
            : []
        }
      />
    </>
  );
};

export default Earnings;
