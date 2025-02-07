import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Card, CardBody, Col, Container, Row } from "react-bootstrap";
import CustomTable from "../../../../components/Custom/Datatable/table";
import { getStripeRecords } from "../../../../redux/Actions/adminActions";

const StripeOrder = ({ handleOpen, refreshKey }) => {
  const dispatch = useDispatch();

  const [records, setRecords] = useState([]);
  const [loader, setLoader] = useState(false);
  const [pageLength, setPageLength] = useState(5);
  const [totalRecord, setTotalRecords] = useState(0);

  const buttons = [
    {
      id: 1,
      title: "Cancle Order & Refund",
      onClick: (row) => {
        handleOpen(row, "refund");
      },
      variant: "danger",
      icon: "bi bi-wallet",
      show: (row) => row.orderStatus === "0" && row.stripeStatus === "1",
    },
    {
      id: 2,
      title: "Cancle Order & Revert Session",
      onClick: (row) => {
        handleOpen(row, "session");
      },
      variant: "danger",
      icon: "bi bi-x-circle",
      show: (row) =>
        row.orderStatus === "0" && row.paymentStatus === "PAID-BY-PACKAGE",
    },
    {
      id: 3,
      title: "Refunded",
      variant: "danger",
      icon: "bi bi-x-circle",
      disabled: true,
      show: (row) => row.orderStatus !== "0" && row.stripeStatus !== "1",
    },
  ];

  const headers = [
    { id: "0", label: "Action", column: "Action" },
    {
      id: "0",
      label: "Order",
      column: "orderTitle",
    },
    {
      id: "0",
      label: "Customer",
      column: "customerName",
    },
    {
      id: "0",
      label: "Valet",
      column: "itValet",
    },
    {
      id: "0",
      label: "Status",
      column: "orderStatus",
    },
    {
      id: "0",
      label: "Price",
      column: "orderPrice",
    },
    {
      id: "0",
      label: "Payment",
      column: "paymentStatus",
    },
  ];

  const fetchRecords = useCallback(
    (
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

      setLoader(true);
      dispatch(getStripeRecords(params))
        .then((response) => {
          console.log(response.payload);
          setRecords(response.payload?.data || []);
          setTotalRecords(response.payload?.recordsTotal || 0);
        })
        .catch((error) => {
          setRecords([]);
          setTotalRecords(0);
        })
        .finally((response) => {
          setLoader(false);
        });
    }
  );

  useEffect(() => {
    fetchRecords(0, pageLength);
  }, [pageLength, refreshKey]);

  return (
    <>
      <Container className="py-5">
        <Row className="text-center">
          <Col xl={12} lg={12} md={12} sm={12} xs={12}>
            <Card>
              <CardBody>
                <h2 className="fw-bold">Manage Orders</h2>
                <CustomTable
                  headers={headers}
                  records={records}
                  totalRecords={totalRecord}
                  pageLength={pageLength}
                  buttons={buttons}
                  onPageChange={fetchRecords}
                  onPageLengthChange={setPageLength}
                  loader={loader}
                  searchFunctionality={false}
                  pageLengthFunctionality={true}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default StripeOrder;
