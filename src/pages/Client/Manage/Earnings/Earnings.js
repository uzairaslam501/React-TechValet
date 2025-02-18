import React, { useCallback, useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
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
                    <h2 className="text-center mt-4">Stripe Earnings</h2>
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
  );
};

export default Earnings;
