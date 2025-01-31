import React, { useEffect, useState } from "react";
import CustomTable from "../../../../../components/Custom/Datatable/table";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { Card, Col, Container, Row } from "react-bootstrap";
import Dialogue from "../../../../../components/Custom/Modal/modal";
import { getUserRecords } from "../../../../../redux/Actions/adminActions";
import { deleteRecords } from "../../../../../redux/Actions/globalActions";

const UserList = ({ userRole }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const params = useParams();

  const [records, setRecords] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageLength, setPageLength] = useState(5);
  const [loader, setLoader] = useState(false);
  const [totalRecord, setTotalRecords] = useState(0);
  const [deleteLoader, setDeleteLoader] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDelete, setIsDelete] = useState("");

  const buttons = [
    {
      id: 1,
      title: "Delete",
      onClick: (row) => handleOnDelete(row.userEncId),
      variant: "outline-danger",
      icon: "bi bi-trash",
    },
    {
      id: 2,
      title: "View",
      onClick: (row) => onView(row),
      variant: "outline-primary",
      icon: "bi bi-pencil",
    },
    {
      id: 3,
      title: "Activate Account",
      onClick: (row) => onView(row),
      variant: "outline-dark",
      icon: "bi bi-check2",
      show: (row) =>
        row.isActive === "AdminVerificationPending" ? true : false,
    },
  ];

  const headers = [
    { id: "0", label: "Action", column: "Action" },
    { id: "0", label: "First Name", column: "firstName" },
    { id: "0", label: "Last Name", column: "lastName" },
    { id: "0", label: "User Name", column: "userName" },
    { id: "0", label: "Email", column: "email" },
    { id: "0", label: "Status", column: "gender" },
  ];

  const handleDelete = async () => {
    setDeleteLoader(true);
    const endpoint = `Admin/DeleteUser?id=${encodeURIComponent(isDelete)}`;

    dispatch(deleteRecords(endpoint))
      .then((response) => {
        setDeleteLoader(false);
        handleClose();
        fetchRecords();
      })
      .catch((error) => {
        console.log(
          " error from Admin side on userlist while deleting the record :: ",
          error
        );
      });
  };

  const onView = (row) => {
    navigate(`/add-user/${params?.type}`, { state: row });
  };

  const handleOnDelete = (id) => {
    setIsDelete(id);
    setShowDeleteModal(true);
  };

  const handleClose = () => {
    setDeleteLoader(false);
    setIsDelete("");
    setShowDeleteModal(false);
  };

  const fetchRecords = async (
    pageNumber = 0,
    pageLength = 5,
    sortColumn = "",
    sortDirection = "",
    searchParam = "",
    role = userRole
  ) => {
    const params = {
      pageNumber,
      pageLength,
      sortColumn,
      sortDirection,
      searchParam,
      role,
    };

    try {
      setLoader(true);
      dispatch(getUserRecords(params))
        .then((response) => {
          if (response?.payload) {
            const data = response.payload?.data.map((user) => {
              if (user.isActive === "EmailVerificationPending") {
                user.gender = "Pending Activation";
              } else if (user.isActive === "AdminVerificationPending") {
                user.gender = "Pending Approval";
              } else if (user.isActive === "Active") {
                user.gender = "Activated";
              } else {
                user.gender = "N/A";
              }
              return user;
            });
            setRecords(data);
            console.log(data);
          }
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
    fetchRecords(pageNumber, pageLength);
  }, [pageNumber, pageLength, userRole]);

  return (
    <>
      <Container className="py-5 mt-5">
        <Row className="">
          <Col xl={12} lg={12} md={12} sm={12} xs={12}>
            <Card>
              <Card.Body>
                <h1 className="text-center h3 fw-bold">Manage Customer</h1>
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
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Dialogue
        show={showDeleteModal}
        centered={true}
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
          {
            text: "Confirm",
            variant: "danger",
            onClick: handleDelete,
            loader: deleteLoader,
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

export default UserList;
