import React, { useEffect, useState } from "react";
import CustomTable from "../../../../../components/Custom/Datatable/table";
import { getAppointments } from "../../../../../redux/Actions/customerActions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Card, CardBody, Col, Container, Row } from "react-bootstrap";
import Dialogue from "../../../../../components/Custom/Modal/modal";
import { deleteRecords } from "../../../../../redux/Actions/globalActions";

const Appointment = ({ onComplete }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [records, setRecords] = useState([]);
  const [pageLength, setPageLength] = useState(5);
  const [loader, setLoader] = useState(false);
  const [totalRecord, setTotalRecords] = useState(0);
  const [deleteLoader, setDeleteLoader] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDelete, setIsDelete] = useState();

  const buttons = [
    {
      id: 1,
      title: "Delete",
      onClick: (row) => handleOpen(row.encId),
      variant: "outline-danger",
      icon: "bi bi-trash",
    },
    {
      id: 2,
      title: "View",
      onClick: (row) => onView(row),
      variant: "outline-success",
      icon: "bi bi-view-stacked",
    },
  ];

  const headers = [
    { id: "0", label: "Action", column: "Action" },
    { id: "0", label: "Appointment Created", column: "createdAt" },
    {
      id: "0",
      label: "Categories Of Problems",
      column: "categoriesOfProblems",
    },
    {
      id: "0",
      label: "Requested Skills",
      column: "requestServiceSkills",
    },
    {
      id: "0",
      label: "Appointment Time",
      column: "appointmentTime",
    },
  ];

  const handleDelete = async () => {
    setDeleteLoader(true);
    const endpoint = `Customer/DeleteRequest/${encodeURIComponent(isDelete)}`;
    dispatch(deleteRecords(endpoint))
      .then((response) => {
        handleClose();
        fetchRecords(0, pageLength);
      })
      .catch((error) => {
        console.log(
          " error from Admin side on userlist while deleting the record :: ",
          error
        );
      });
  };

  const onView = (row) => {
    navigate("/requested-service", { state: row });
  };

  const handleOpen = (id) => {
    setIsDelete(id);
    setShowDeleteModal(true);
  };

  const handleClose = () => {
    setDeleteLoader(false);
    setIsDelete("");
    setShowDeleteModal(false);
  };

  const actions = [
    {
      label: "Cancel",
      onClick: handleClose,
      color: "secondary",
      variant: "contained",
    },
    {
      label: "Delete",
      onClick: handleDelete,
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
      setLoader(true);
      dispatch(getAppointments(params))
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
      onComplete();
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchRecords(0, pageLength);
  }, [pageLength]);

  return (
    <>
      <Container className="py-5">
        <Row className="text-center">
          <Col xl={12} lg={12} md={12} sm={12} xs={12}>
            <Card>
              <CardBody>
                <h2 className="fw-bold">Requested Services</h2>
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

      <Dialogue
        show={showDeleteModal}
        onHide={handleClose}
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
          { text: "Confirm", variant: "danger", onClick: handleDelete },
          {
            text: "Cancel",
            className: "btn-secondary-secondary",
            onClick: handleClose,
            loader: deleteLoader,
          },
        ]}
      />
    </>
  );
};

export default Appointment;
