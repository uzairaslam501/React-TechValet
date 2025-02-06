import React, { useEffect, useState } from "react";
import CustomTable from "../../../../components/Custom/Datatable/table";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { Badge, Card, CardBody, Col, Container, Row } from "react-bootstrap";
import Dialogue from "../../../../components/Custom/Modal/modal";
import { getPaypalTransactionRecords } from "../../../../redux/Actions/adminActions";
import { cancelUnclaimedPayment } from "../../../../redux/Actions/paypalActions";
import { NavLink } from "react-router-dom";
import { getDateFromString } from "../../../../utils/_helpers";

const PaypalTransactionDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userAuth } = useSelector((state) => state.authentication);

  const [records, setRecords] = useState([]);
  const [pageLength, setPageLength] = useState(5);
  const [loader, setLoader] = useState(false);
  const [totalRecord, setTotalRecords] = useState(0);
  const [modalLoader, setModalLoader] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [row, setRow] = useState(null);

  const buttons = [
    {
      id: 1,
      title: "Status Cleared",
      icon: "bi bi-check-circle",
      variant: "outline-success",
      disabled: true,
      show: (row) =>
        row.transactionStatus === "PENDING" ||
        row.transactionStatus === "SUCCESS",
    },
    {
      id: 2,
      title: "Recover Funds",
      onClick: (row) => handleOnRecoverFunds(row),
      variant: "outline-secondary",
      icon: "bi bi-arrow-counterclockwise",
      show: (row) => row.transactionStatus === "UNCLAIMED",
    },
    {
      id: 3,
      title: "Amount Recovered",
      variant: "outline-success",
      icon: "bi bi-check-circle",
      disabled: true,
      show: (row) => row.transactionStatus === "RETURNED",
    },
  ];

  const headers = [
    { id: "0", label: "Action", column: "Action" },
    { id: "0", label: "Customer", column: "customerName" },
    { id: "0", label: "IT-Valet", column: "itValetName" },
    { id: "0", label: "Recipient Email", column: "payPalEmailAccount" },
    { id: "0", label: "Order Title", column: "orderTitle" },
    { id: "0", label: "Order Price", column: "orderPrice" },
    { id: "0", label: "Sent Amount", column: "sentAmount" },
    { id: "0", label: "Platform-Fee", column: "platformFee" },
    { id: "0", label: "Transaction Status", column: "transactionStatus" },
    {
      id: "0",
      label: "Expected Date To Transfer",
      column: "expectedDateToTransmitPayment",
    },
  ];

  // #region Recover Funds

  const handleOnRecoverFunds = (row) => {
    setRow(row);
    setModalContent("Are you sure you want to recover funds?");
    setShowModal(true);
  };

  const handleRecoverFunds = async () => {
    setModalLoader(true);

    dispatch(cancelUnclaimedPayment(row.payOutItemId))
      .then((response) => {
        setModalLoader(false);
        handleCloseModal();
        fetchPaypalTransactionRecords();
      })
      .catch((error) => {
        console.log(
          " error from Admin side on paypal transaction detail while calling 'handleRecoverFunds':: ",
          error
        );
      });
  };

  const handleCloseModal = () => {
    setModalLoader(false);
    setRow(null);
    setModalContent("");
    setShowModal(false);
  };

  // #endregion Cancel

  const fetchPaypalTransactionRecords = async (
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
      dispatch(getPaypalTransactionRecords(params))
        .then((response) => {
          //const data1 = response.payload?.data;
          const data = response.payload?.data.map((obj) => {
            obj.orderTitle = (
              <NavLink to={`/order-details/${obj.orderEncId}`}>
                {obj.orderTitle}
              </NavLink>
            );
            obj.orderPrice = (
              <>
                <span className="fw-bold">$</span>
                {obj.orderPrice}
              </>
            );
            obj.sentAmount = (
              <>
                <span className="fw-bold">$</span>
                {obj.sentAmount}
              </>
            );
            obj.platformFee = (
              <>
                <span className="fw-bold">$</span>
                {obj.platformFee}
              </>
            );
            if (obj.transactionStatus) {
              obj.transactionStatus = (() => {
                if (
                  obj.transactionStatus === "PENDING" ||
                  obj.transactionStatus === "SUCCESS"
                ) {
                  return (
                    <Badge className="p-2" bg="success">
                      AMOUNT-SENT
                    </Badge>
                  );
                } else if (obj.transactionStatus === "UNCLAIMED") {
                  return (
                    <Badge className="p-2" bg="danger">
                      UNCLAIMED
                    </Badge>
                  );
                } else if (obj.transactionStatus === "RETURNED") {
                  return (
                    <Badge className="p-2" bg="secondary">
                      FUNDS RECOVERED
                    </Badge>
                  );
                } else {
                  return "N/A";
                }
              })();
            }
            obj.expectedDateToTransmitPayment = getDateFromString(
              obj.expectedDateToTransmitPayment
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
    fetchPaypalTransactionRecords(0, pageLength);
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
                        <h1 className="h3 text-gray-900 mb-4 text-bold">
                          PayPal Transactions Record
                        </h1>
                      </div>
                      <CustomTable
                        headers={headers}
                        records={records ?? []}
                        totalRecords={totalRecord}
                        pageLength={pageLength}
                        buttons={buttons}
                        onPageChange={fetchPaypalTransactionRecords}
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

      <Dialogue
        show={showModal}
        centered={true}
        onHide={handleCloseModal}
        headerClass=""
        title="Warning"
        bodyContent={
          <>
            <span className="fw-bold">Attention:</span>
            <p className="mb-0">{modalContent}</p>
            <p>Double-check before confirming. :floppy_disk:</p>
          </>
        }
        backdrop="static"
        customFooterButtons={[
          {
            text: "Confirm",
            variant: "danger",
            onClick: handleRecoverFunds,
            loader: modalLoader,
          },
          {
            text: "Cancel",
            className: "btn-secondary-secondary",
            onClick: handleCloseModal,
          },
        ]}
      />
    </>
  );
};

export default PaypalTransactionDetail;
