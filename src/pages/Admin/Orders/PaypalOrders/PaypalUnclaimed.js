import React, { useEffect, useState } from "react";
import CustomTable from "../../../../components/Custom/Datatable/table";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { Badge, Card, CardBody, Col, Container, Row } from "react-bootstrap";
import Dialogue from "../../../../components/Custom/Modal/modal";
import { getPaypalUnclaimedRecords } from "../../../../redux/Actions/adminActions";
import { cancelUnclaimedPayment } from "../../../../redux/Actions/paypalActions";
import { NavLink } from "react-router-dom";
import { getDateFromString } from "../../../../utils/_helpers";

const PaypalUnclaimedDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userAuth } = useSelector((state) => state.authentication);

  const [records, setRecords] = useState([]);
  const [pageLength, setPageLength] = useState(5);
  const [loader, setLoader] = useState(false);
  const [totalRecord, setTotalRecords] = useState(0);

  const buttons = [];

  const headers = [
    { id: "0", label: "Customer", column: "customerName" },
    { id: "0", label: "IT-Valet", column: "itValetName" },
    { id: "0", label: "Recipient Email", column: "payPalEmailAccount" },
    {
      id: "0",
      label: "Returned Amount",
      column: "unclaimedAmountStatus",
    },
    { id: "0", label: "Transaction Status", column: "transactionStatus" },
    { id: "0", label: "Order Title", column: "orderTitle" },
    { id: "0", label: "Cancelation Reason", column: "reason" },
  ];

  const fetchPaypalUnclaimedRecords = async (
    pageNumber = 0,
    pageLength = 5,
    sortColumn = "",
    sortDirection = "",
    searchParam = ""
  ) => {
    const params = {
      pageNumber,
      pageLength,
      sortColumn,
      sortDirection,
      searchParam,
    };

    try {
      setLoader(true);
      dispatch(getPaypalUnclaimedRecords(params))
        .then((response) => {
          //const data = response.payload?.data;
          const data = response.payload?.data.map((obj) => {
            obj.orderTitle = (
              <NavLink to={`/order-details/${obj.orderEncId}`}>
                {obj.orderTitle}
              </NavLink>
            );

            return obj;
          });
          setRecords(data);
          console.log(data);
          setTotalRecords(response.payload?.recordsTotal);
        })
        .catch((error) => {
          setRecords([]);
          setTotalRecords(0);
        });
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchPaypalUnclaimedRecords(0, pageLength);
  }, [pageLength]);

  return (
    <>
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col xl={10} lg={12} md={10}>
            <Card className="card o-hidden border-0 shadow-lg my-3">
              <CardBody className="p-0">
                <Row>
                  <Col lg={12}>
                    <div className="p-3">
                      <div className="text-center">
                        <h1 className="fw-bold text-center">
                          Manage PayPal Transactions Record
                        </h1>
                      </div>
                      <CustomTable
                        headers={headers}
                        records={records ?? []}
                        totalRecords={totalRecord}
                        pageLength={pageLength}
                        buttons={buttons}
                        onPageChange={fetchPaypalUnclaimedRecords}
                        onPageLengthChange={setPageLength}
                        loader={loader}
                        searchFunctionality={true}
                        pageLengthFunctionality={true}
                      />
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PaypalUnclaimedDetail;
