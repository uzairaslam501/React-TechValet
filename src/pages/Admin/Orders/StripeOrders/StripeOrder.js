import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Card, CardBody, Col, Row } from "react-bootstrap";
import CustomTable from "../../../../components/Custom/Datatable/table";
import { getStripeRecords } from "../../../../redux/Actions/adminActions";

const StripeOrder = ({ handleOpen }) => {
  const dispatch = useDispatch();

  const [records, setRecords] = useState([]);
  const [loader, setLoader] = useState(false);
  const [pageLength, setPageLength] = useState(5);
  const [totalRecord, setTotalRecords] = useState(0);

  const buttons = [
    {
      id: 1,
      title: (row) => row.buttonHandle,
      onClick: (row) => {
        if (row.buttonHandle === "Refund") {
          handleOpen(row, "refund");
        } else if (row.buttonHandle === "Session") {
          handleOpen(row, "session");
        }
      },
      variant: "danger",
      icon: "bi bi-trash",
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
  }, [pageLength]);

  return (
    <>
      <section id="AppointmentTable" className="">
        <Row className="text-center">
          <Col lg={{ span: 10, offset: 1 }}>
            <Card>
              <CardBody>
                <h2 className="fw-bold">Manage Packages</h2>
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
      </section>
    </>
  );
};

export default StripeOrder;
