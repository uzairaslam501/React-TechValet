import React, { useEffect, useState } from "react";
import CustomTable from "../../../../../components/Custom/Datatable/table";
import { getOrderRecords } from "../../../../../redux/Actions/customerActions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import {
  Badge,
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Spinner,
} from "react-bootstrap";
import Dialogue from "../../../../../components/Custom/Modal/modal";
import BadgeStatus from "../../../../../components/Custom/StatusBadge/StatusBadge";
import { NavLink } from "react-router-dom";

const Order = ({ isLoading }) => {
  console.log("isLoading", isLoading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [orderRecords, setOrderRecords] = useState([]);
  const [orderPageLength, setOrdersPageLength] = useState(5);
  const [orderLoader, setOrdersLoader] = useState(false);
  const [orderTotalRecord, setOrdersTotalRecords] = useState(0);
  const [orderDeleteLoader, setOrdersDeleteLoader] = useState(false);
  const [showOderModal, setOrderShowModal] = useState(false);
  const [orderIsDelete, setOrdersIsDelete] = useState();

  const headers = [
    { id: "0", label: "Order Title", column: "orderTitle" },
    {
      id: "0",
      label: "Order Date",
      column: "startDateTime",
    },
    {
      id: "0",
      label: "Due Date",
      column: "endDateTime",
    },
    {
      id: "0",
      label: "Total Price",
      column: "orderPrice",
    },
    {
      id: "0",
      label: "Status",
      column: "orderReasonType",
    },
  ];

  const handleOrderDelete = async () => {
    setOrdersDeleteLoader(true);
    const endpoint = `User/DeleteRecord?id=${orderIsDelete}`;
    handleOrderClose();
  };

  const handleOrderShowModal = (id) => {
    setOrdersIsDelete(id);
    setOrderShowModal(true);
  };

  const handleOrderClose = () => {
    setOrdersDeleteLoader(false);
    setOrdersIsDelete("");
    setOrderShowModal(false);
  };

  const actions = [
    {
      label: "Cancel",
      onClick: handleOrderClose,
      color: "secondary",
      variant: "contained",
    },
    {
      label: "Delete",
      onClick: handleOrderDelete,
      color: "error",
      variant: "contained",
    },
  ];

  const fetchRecords = async (
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
      setOrdersLoader(true);
      dispatch(getOrderRecords(params))
        .then((response) => {
          if (response.payload) {
            console.log(response?.payload);
            const data = response.payload.data.map((obj) => {
              const orderPaidByBadge =
                obj.orderStatus === "4" || obj.isDelivered === "4" ? (
                  <NavLink to={`/order-details/${obj.encId}`}>
                    <BadgeStatus status="Cancelled" />
                  </NavLink>
                ) : obj.isDelivered?.toString() === "0" ? (
                  <NavLink to={`/order-details/${obj.encId}`}>
                    <BadgeStatus status="In Progress" />
                  </NavLink>
                ) : obj.isDelivered?.toString() === "1" ? (
                  <NavLink to={`/order-details/${obj.encId}`}>
                    <BadgeStatus status="Delivered" />
                  </NavLink>
                ) : obj.isDelivered?.toString() === "2" ? (
                  <NavLink to={`/order-details/${obj.encId}`}>
                    <BadgeStatus status="Completed" />
                  </NavLink>
                ) : (
                  <BadgeStatus status="Unknown" />
                );

              return {
                ...obj,
                orderTitle: (
                  <NavLink
                    to={`/order-details/${obj.encId}`}
                    className={"text-dark"}
                  >
                    {obj.orderTitle}
                  </NavLink>
                ),
                orderPrice: (
                  <>
                    <span className="fw-bold">$</span> {obj.orderPrice}
                  </>
                ),
                orderReasonType: orderPaidByBadge,
              };
            });
            setOrderRecords(data);
            setOrdersTotalRecords(response.payload?.recordsTotal);
          }
        })
        .catch((error) => {
          setOrderRecords([]);
          setOrdersTotalRecords(0);
        });
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setOrdersLoader(false);
    }
  };

  useEffect(() => {
    fetchRecords(0, orderPageLength);
  }, [orderPageLength]);

  return (
    <>
      <Container className="py-5">
        <Row className="text-center">
          <Col xl={12} lg={12} md={12} sm={12} xs={12}>
            <Card>
              <CardBody>
                <h2 className="fw-bold">Manage Orders</h2>
                {!isLoading ? (
                  <Spinner />
                ) : (
                  <CustomTable
                    headers={headers}
                    records={orderRecords}
                    totalRecords={orderTotalRecord}
                    pageLength={orderPageLength}
                    onPageChange={fetchRecords}
                    onPageLengthChange={setOrdersPageLength}
                    loader={orderLoader}
                    searchFunctionality={false}
                    pageLengthFunctionality={true}
                  />
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>

      <Dialogue
        show={showOderModal}
        onHide={handleOrderClose}
        headerClass=""
        title="Warning"
        bodyContent={
          <p>
            <span className="fw-bold">Attention:</span> Deleting the record
            erases all data associated with it. Double-check before confirming.
            💾
          </p>
        }
        backdrop="static"
        customFooterButtons={[
          { text: "Confirm", variant: "danger", onClick: handleOrderDelete },
          {
            text: "Cancel",
            className: "btn-secondary-secondary",
            onClick: handleOrderClose,
          },
        ]}
      />
    </>
  );
};

export default Order;
