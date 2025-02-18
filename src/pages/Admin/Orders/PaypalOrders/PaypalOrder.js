import React, { useEffect, useState } from "react";
import CustomTable from "../../../../components/Custom/Datatable/table";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { Card, CardBody, Col, Container, Row } from "react-bootstrap";
import Dialogue from "../../../../components/Custom/Modal/modal";
import { getPaypalOrderDetailRecords } from "../../../../redux/Actions/adminActions";
import {
  cancelAndRefundOrder,
  cancelOrderAndRevertSession,
} from "../../../../redux/Actions/paypalActions";

const PaypalOrderDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userAuth } = useSelector((state) => state.authentication);

  const chooseRole = (role) => {
    let roleId;
    switch (role) {
      case "customer":
        roleId = 3;
        break;
      case "valet":
        roleId = 4;
        break;
      case "seo":
        roleId = 5;
        break;
      default:
        roleId = 3;
    }
    return roleId;
  };

  const [records, setRecords] = useState([]);
  const [pageLength, setPageLength] = useState(5);
  const [loader, setLoader] = useState(false);
  const [totalRecord, setTotalRecords] = useState(0);
  const [modalLoader, setModalLoader] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [row, setRow] = useState(null);

  const buttons = [
    {
      id: 1,
      title: "Cancel",
      onClick: (row) => handleOnCancel(row),
      variant: "outline-danger",
      icon: "bi bi-x-circle",
      show: (row) =>
        (row.orderStatus === "0" && row.paymentStatus === "completed") ||
        (row.orderStatus === "1" && row.paymentStatus === "completed"),
    },
    {
      id: 2,
      title: "Refund",
      onClick: (row) => handleOnCancel(row),
      variant: "outline-dark",
      icon: "bi bi-arrow-counterclockwise",
      show: (row) =>
        row.orderStatus === "4" && row.paymentStatus === "completed",
    },
    {
      id: 3,
      title: "Cancel & Revert Session",
      onClick: (row) => handleCancelAndRevertSession(row),
      variant: "outline-secondary",
      icon: "bi bi-arrow-counterclockwise",
      show: (row) =>
        ["0", "1", "2"].includes(row.orderStatus) &&
        row.paymentStatus === "USED_SESSION" &&
        row.paidByPackage === true,
    },
    {
      id: 4,
      title: "Order Completed",
      variant: "outline-success",
      icon: "bi bi-check-circle",
      disabled: true,
      show: (row) =>
        (row.orderStatus === "4" &&
          row.paymentStatus === "USED_SESSION" &&
          row.paidByPackage === true) ||
        (row.orderStatus === "2" && row.paymentStatus === "completed"),
    },
    {
      id: 5,
      title: "Payment Refunded",
      variant: "outline-danger",
      icon: "bi bi-x-circle",
      disabled: true,
      show: (row) =>
        row.orderStatus === "4" && row.paymentStatus === "REFUNDED",
    },
    {
      id: 6,
      title: "Session Reverted",
      variant: "outline-info",
      icon: "bi bi-x-circle",
      disabled: true,
      show: (row) =>
        row.orderStatus === "4" && row.paymentStatus === "SESSION_REVERTED",
    },
  ];

  const headers = [
    { id: "0", label: "Action", column: "Action" },
    { id: "0", label: "Customer", column: "customerName" },
    { id: "0", label: "IT-Valet", column: "itValet" },
    { id: "0", label: "Order Title", column: "orderTitle" },
    { id: "0", label: "Order Status", column: "orderStatus" },
    { id: "0", label: "Order Price", column: "orderPrice" },
    { id: "0", label: "Payment Status", column: "paymentStatus" },
  ];

  // #region Cancel

  const handleOnCancel = (row) => {
    setRow(row);
    setModalContent("Are you sure you want to cancel this order?");
    setShowCancelModal(true);
  };

  const handleCancel = async () => {
    console.log("handleCancel");
    setModalLoader(true);

    if (row.paymentStatus === "USED_SESSION") {
      dispatch(cancelOrderAndRevertSession(encodeURIComponent(row.orderEncId)))
        .then((response) => {
          setModalLoader(false);
          handleClose();
          fetchPaypalOrderDetails();
        })
        .catch((error) => {
          console.log(
            " error from Admin side on paypal order detail while calling 'cancelOrderAndRevertSession':: ",
            error
          );
        });
    } else {
      dispatch(
        cancelAndRefundOrder({
          captureId: row.captureId,
          orderId: encodeURIComponent(row.orderEncId),
        })
      )
        .then((response) => {
          setModalLoader(false);
          handleClose();
          fetchPaypalOrderDetails();
        })
        .catch((error) => {
          console.log(
            " error from Admin side on paypal order detail while calling 'cancelAndRefundOrder':: ",
            error
          );
        });
    }
  };
  // #endregion Cancel

  const handleCancelAndRevertSession = async (row) => {
    setRow(row);
    setModalContent(
      "Are you sure you want to cancel this order & revert session?"
    );
    setShowCancelModal(true);
  };

  const handleClose = () => {
    setModalLoader(false);
    setRow(null);
    setModalContent("");
    setShowCancelModal(false);
  };

  const fetchPaypalOrderDetails = async (
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
      dispatch(getPaypalOrderDetailRecords(params))
        .then((response) => {
          const data = response.payload?.data;
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
    fetchPaypalOrderDetails(0, pageLength);
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
                          Manage PayPal Orders
                        </h1>
                      </div>
                      <CustomTable
                        headers={headers}
                        records={records ?? []}
                        totalRecords={totalRecord}
                        pageLength={pageLength}
                        buttons={buttons}
                        onPageChange={fetchPaypalOrderDetails}
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
        show={showCancelModal}
        centered={true}
        onHide={handleClose}
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
            onClick: handleCancel,
            loader: modalLoader,
          },
          {
            text: "Cancel",
            className: "btn-secondary-secondary",
            onClick: handleClose,
          },
        ]}
      />
    </>
  );
};

export default PaypalOrderDetail;
