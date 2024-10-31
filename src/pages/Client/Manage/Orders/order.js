import React, { useEffect, useState } from "react";
import CustomTable from "../../../../components/Custom/Datatable/table";
import { getOrderRecords } from "../../../../redux/Actions/customerActions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Card, CardBody, Col, Row } from "react-bootstrap";

const Order = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [orderRecords, setOrderRecords] = useState([]);
  const [orderPageLength, setOrdersPageLength] = useState(5);
  const [orderLoader, setOrdersLoader] = useState(false);
  const [orderTotalRecord, setOrdersTotalRecords] = useState(0);
  const [orderDeleteLoader, setOrdersDeleteLoader] = useState(false);
  const [oderOpen, setOrdersOpen] = useState(false);
  const [orderIsDelete, setOrdersIsDelete] = useState();

  const buttons = [
    {
      id: 1,
      title: "Delete",
      onClick: (row) => handleOrderOpen(row.id),
      variant: "outline-danger",
      icon: "bi bi-trash",
    },
    {
      id: 2,
      title: "Update",
      onClick: (row) => handleOrderUpdate(row),
      variant: "outline-success",
      icon: "bi bi-pencil",
    },
  ];

  const headers = [
    { id: "0", label: "Action", column: "Action" },
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

  const handleOrderUpdate = (row) => {
    navigate("/add-user", { state: row });
  };

  const handleOrderOpen = (id) => {
    setOrdersIsDelete(id);
    setOrdersOpen(true);
  };

  const handleOrderClose = () => {
    setOrdersDeleteLoader(false);
    setOrdersIsDelete("");
    setOrdersOpen(false);
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

  const fetchUsers = async (
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
      const response = await dispatch(getOrderRecords(params));
      if (response.payload.data?.data?.length > 0) {
        setOrderRecords(response.payload?.data?.data);
        setOrdersTotalRecords(response.payload?.data?.recordsTotal);
      } else {
        setOrderRecords([]);
        setOrdersTotalRecords(0);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setOrdersLoader(false);
    }
  };

  useEffect(() => {
    fetchUsers(0, orderPageLength);
  }, [orderPageLength]);

  return (
    <>
      <section id="OrdersTable">
        <Row className="text-center">
          <Col lg={{ span: 10, offset: 1 }}>
            <Card>
              <CardBody>
                <h2 className="fw-bold">Manage Orders</h2>
                <CustomTable
                  headers={headers}
                  records={orderRecords}
                  totalRecords={orderTotalRecord}
                  pageLength={orderPageLength}
                  buttons={buttons}
                  onPageChange={fetchUsers}
                  onPageLengthChange={setOrdersPageLength}
                  loader={orderLoader}
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

export default Order;
