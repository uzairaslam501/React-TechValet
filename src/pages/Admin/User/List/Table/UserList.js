import React, { useEffect, useState } from "react";
import CustomTable from "../../../../../components/Custom/Datatable/table";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { Card, Col, Container, Row } from "react-bootstrap";
import Dialogue from "../../../../../components/Custom/Modal/modal";
import {
  getUserRecords,
  setAccountOnHold,
  userAccountActivation,
} from "../../../../../redux/Actions/adminActions";
import { deleteRecords } from "../../../../../redux/Actions/globalActions";
import { capitalizeFirstLetter } from "../../../../../utils/_helpers";

const UserList = ({ userRole, userType }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const params = useParams();

  const [records, setRecords] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageLength, setPageLength] = useState(5);
  const [loader, setLoader] = useState(false);
  const [totalRecord, setTotalRecords] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAAModal, setShowAAModal] = useState(false);
  const [showAOHModal, setShowAOHModal] = useState(false);
  const [actionLoader, setActionLoader] = useState(false);
  const [rowForAction, setRowForAction] = useState(null);

  const buttons = [
    {
      id: 1,
      title: "Delete",
      onClick: (row) => handleOnDelete(row),
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
      onClick: (row) => onAccountActivation(row),
      variant: "outline-dark",
      icon: "bi bi-check2",
      show: (row) =>
        row.isActive === "AdminVerificationPending" ||
        row.isActive === "AccountOnHold"
          ? true
          : false,
    },
    {
      id: 4,
      title: "Set Account On Hold",
      onClick: (row) => onHoldAccount(row),
      variant: "outline-secondary",
      icon: "bi bi-ban",
      show: (row) => (row.isActive === "Active" ? true : false),
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

  //#region Delete
  const handleDelete = async () => {
    setActionLoader(true);
    const endpoint = `Admin/DeleteUser?id=${encodeURIComponent(
      rowForAction.userEncId
    )}`;

    dispatch(deleteRecords(endpoint))
      .then((response) => {
        setActionLoader(false);
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

  const handleOnDelete = (row) => {
    setRowForAction(row);
    setShowDeleteModal(true);
  };
  //#endregion Delete

  const onView = (row) => {
    navigate(`/add-user/${userType}`, { state: row });
  };

  //#region Account Activation
  const onAccountActivation = (row) => {
    setRowForAction(row);
    setShowAAModal(true);
  };

  const handleAccountActivate = async () => {
    setActionLoader(true);

    dispatch(userAccountActivation(rowForAction))
      .then((response) => {
        setActionLoader(false);
        handleClose();
        fetchRecords();
      })
      .catch((error) => {
        console.log(
          " error from Admin side on userlist while activate record :: ",
          error
        );
      });
  };
  //#endregion  Account Activation

  //#region Account On Hold
  const onHoldAccount = (row) => {
    setRowForAction(row);
    setShowAOHModal(true);
  };

  const handleAccountOnHold = async () => {
    setActionLoader(true);

    dispatch(setAccountOnHold(rowForAction.userEncId))
      .then((response) => {
        setActionLoader(false);
        handleClose();
        fetchRecords();
      })
      .catch((error) => {
        console.log(
          " error from Admin side on userlist while set account on hold :: ",
          error
        );
      });
  };
  //#endregion  Account On Hold

  const handleClose = () => {
    setActionLoader(false);
    setRowForAction(null);
    setShowDeleteModal(false);
    setShowAAModal(false);
    setShowAOHModal(false);
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
                user.gender = "Pending Email Activation";
              } else if (user.isActive === "AdminVerificationPending") {
                user.gender = "Pending Admin Approval";
              } else if (user.isActive === "AccountOnHold") {
                user.gender = "On Hold";
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
      <Container className="py-5">
        <Row className="">
          <Col xl={12} lg={12} md={12} sm={12} xs={12}>
            <Card>
              <Card.Body>
                <h1 className="text-center h3 fw-bold">
                  Manage {capitalizeFirstLetter(userType)}
                </h1>
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
            loader: actionLoader,
          },
          {
            text: "Cancel",
            className: "btn-secondary-secondary",
            onClick: handleClose,
          },
        ]}
      />

      <Dialogue
        show={showAAModal}
        centered={true}
        onHide={handleClose}
        headerClass=""
        title="Warning"
        bodyContent={
          <>
            <span>
              <span className="fw-bold">Attention:</span> Are you sure you want
              to activate this account.
            </span>
            <p>Double-check before confirming. 💾</p>
          </>
        }
        backdrop="static"
        customFooterButtons={[
          {
            text: "Confirm",
            variant: "danger",
            onClick: handleAccountActivate,
            loader: actionLoader,
          },
          {
            text: "Cancel",
            className: "btn-secondary-secondary",
            onClick: handleClose,
          },
        ]}
      />

      <Dialogue
        show={showAOHModal}
        centered={true}
        onHide={handleClose}
        headerClass=""
        title="Warning"
        bodyContent={
          <>
            <span>
              <span className="fw-bold">Attention:</span> Are you sure you want
              to set this account 'On Hold'.
            </span>
            <p>Double-check before confirming. 💾</p>
          </>
        }
        backdrop="static"
        customFooterButtons={[
          {
            text: "Confirm",
            variant: "danger",
            onClick: handleAccountOnHold,
            loader: actionLoader,
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
