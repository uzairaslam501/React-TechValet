import React, { useEffect, useState } from "react";
import CustomTable from "../../../components/Custom/Datatable/table";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { Card, CardBody, Col, Container, Row } from "react-bootstrap";
import Dialogue from "../../../components/Custom/Modal/modal";
import { getUserRecords } from "../../../redux/Actions/adminActions";
import { deleteRecords } from "../../../redux/Actions/globalActions";

const UserList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userAuth } = useSelector((state) => state.authentication);

  const params = useParams();
  console.log(params);

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
        fetchUsers();
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

  const fetchUsers = async (
    role = chooseRole(params?.type),
    pageNumber = 0,
    pageLength = 5,
    sortColumn = "",
    sortDirection = "",
    searchParam = ""
  ) => {
    const params = {
      role,
      pageNumber,
      pageLength,
      sortColumn,
      sortDirection,
      searchParam,
    };

    try {
      setLoader(true);
      dispatch(getUserRecords(params))
        .then((response) => {
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
    fetchUsers(chooseRole(params?.type), 0, pageLength);
  }, [pageLength, params]);

  return (
    <>
      <Container className="mt-5">
        <Row className="justify-content-center">
          <div className="col-xl-10 col-lg-12 col-md-9">
            <div className="card o-hidden border-0 shadow-lg my-3">
              <div className="card-body p-0">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="p-5">
                      <div className="text-center">
                        <h1 className="h3 text-gray-900 mb-4 text-bold">
                          Manage Customer
                        </h1>
                      </div>
                      <CustomTable
                        headers={headers}
                        records={records}
                        totalRecords={totalRecord}
                        pageLength={pageLength}
                        buttons={buttons}
                        onPageChange={fetchUsers}
                        onPageLengthChange={setPageLength}
                        loader={loader}
                        searchFunctionality={false}
                        pageLengthFunctionality={true}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
