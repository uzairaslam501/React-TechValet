import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Card, CardBody, Col, Row } from "react-bootstrap";
import CustomTable from "../../../../components/Custom/Datatable/table";
import { getStripeRecords } from "../../../../redux/Actions/adminActions";

const StripeOrder = () => {
  const dispatch = useDispatch();

  const [records, setRecords] = useState([]);
  const [pageLength, setPageLength] = useState(5);
  const [loader, setLoader] = useState(false);
  const [totalRecord, setTotalRecords] = useState(0);

  const [showConsumptionModal, setShowConsumptionModal] = useState(false);
  const [isPackageId, setPackageId] = useState();

  const headers = [
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
      label: "Price",
      column: "orderPrice",
    },
    {
      id: "0",
      label: "Status",
      column: "orderStatus",
    },
    {
      id: "0",
      label: "Payment",
      column: "paymentStatus",
    },

    {
      id: "0",
      label: "StripeStatus",
      column: "stripeStatus",
    },
  ];

  const fetchUsers = useCallback(
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
          if (response?.payload) {
            console.log(response.payload);
            setRecords(response.payload?.data);
            setTotalRecords(response.payload?.recordsTotal);
          } else {
            setRecords([]);
            setTotalRecords(0);
          }
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
    fetchUsers(0, pageLength);
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
                  onPageChange={fetchUsers}
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
