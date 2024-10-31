import React, { useEffect, useState } from "react";
import CustomTable from "../../../../components/Custom/Datatable/table";
import { getRecords } from "../../../../redux/Actions/customerActions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

const Appointment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [records, setRecords] = useState([]);
  const [pageLength, setPageLength] = useState(5);
  const [loader, setLoader] = useState(false);
  const [totalRecord, setTotalRecords] = useState(0);
  const [deleteLoader, setDeleteLoader] = useState(false);
  const [open, setOpen] = useState(false);
  const [isDelete, setIsDelete] = useState();

  const buttons = [
    {
      id: 1,
      title: "Delete",
      onClick: (row) => handleOpen(row.id),
      variant: "outline-danger",
      icon: "bi bi-trash",
    },
    {
      id: 2,
      title: "Update",
      onClick: (row) => onUpdate(row),
      variant: "outline-success",
      icon: "bi bi-pencil",
    },
  ];

  const headers = [
    { id: "0", label: "Action", column: "Action" },
    { id: "createdAt", label: "Appointment Created", column: "createdAt" },
    {
      id: "categoriesOfProblems",
      label: "Categories Of Problems",
      column: "categoriesOfProblems",
    },
    {
      id: "requestServiceSkills",
      label: "Requested Skills",
      column: "requestServiceSkills",
    },
    {
      id: "appointmentTime",
      label: "Appointment Time",
      column: "appointmentTime",
    },
  ];

  const handleDelete = async () => {
    setDeleteLoader(true);
    const endpoint = `User/DeleteRecord?id=${isDelete}`;
    // await dispatch(deleteRecord(endpoint));
    handleClose();
  };

  const onUpdate = (row) => {
    navigate("/add-user", { state: row });
  };

  const handleOpen = (id) => {
    setIsDelete(id);
    setOpen(true);
  };

  const handleClose = () => {
    setDeleteLoader(false);
    setIsDelete("");
    setOpen(false);
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

  const fetchUsers = async (
    pageNumber = 0,
    pageLength = 5, // Remove pageLength default from here
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
      const response = await dispatch(getRecords(params));
      console.log("payload", response?.payload);
      console.log("payload data", response?.payload?.data);
      console.log("payload data length", response?.payload?.data?.length);
      if (response.payload.data?.data?.length > 0) {
        setRecords(response.payload?.data?.data);
        setTotalRecords(response.payload?.data?.recordsTotal);
      } else {
        setRecords([]);
        setTotalRecords(0);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchUsers(0, pageLength);
  }, [pageLength]);

  return (
    <>
      <CustomTable
        headers={headers}
        records={records}
        totalRecords={totalRecord}
        pageLength={false}
        buttons={buttons}
        onPageChange={fetchUsers}
        onPageLengthChange={setPageLength}
        loader={loader}
        search={false}
      />
    </>
  );
};

export default Appointment;
