import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Card, CardBody, Col, Row } from "react-bootstrap";
import CustomTable from "../../../../components/Custom/Datatable/table";
import { getUserPackagesRecords } from "../../../../redux/Actions/customerActions";
import Dialogue from "../../../../components/Custom/Modal/modal";
import ViewConsumption from "./viewConsumption";

const ViewPackages = () => {
  const dispatch = useDispatch();

  const [records, setRecords] = useState([]);
  const [pageLength, setPageLength] = useState(5);
  const [loader, setLoader] = useState(false);
  const [totalRecord, setTotalRecords] = useState(0);

  const [showConsumptionModal, setShowConsumptionModal] = useState(false);
  const [isPackageId, setPackageId] = useState();

  const buttons = [
    {
      id: 1,
      title: "View Consumption(s)",
      onClick: (row) => handleOpen(row.id),
      variant: "primary-secondary",
      icon: "bi bi-eye",
    },
  ];

  const headers = [
    { id: "0", label: "Action", column: "Action" },
    { id: "0", label: "Customer Name", column: "customer" },
    {
      id: "0",
      label: "Package Start",
      column: "startDateTime",
    },
    {
      id: "0",
      label: "Package End",
      column: "endDateTime",
    },
    {
      id: "0",
      label: "Package Type",
      column: "packageType",
    },
    {
      id: "0",
      label: "Total Sessions",
      column: "totalSessions",
    },

    {
      id: "0",
      label: "Remaining Sessions",
      column: "remainingSessions",
    },

    {
      id: "0",
      label: "Status",
      column: "status",
    },
  ];

  const handleOpen = (id) => {
    setPackageId(id);
    setShowConsumptionModal(true);
  };

  const handleClose = () => {
    setPackageId("");
    setShowConsumptionModal(false);
  };

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
      setLoader(true);
      const response = await dispatch(getUserPackagesRecords(params));
      if (response.payload.data?.length > 0) {
        setRecords(response.payload?.data);
        setTotalRecords(response.payload?.recordsTotal);
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
                  buttons={buttons}
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

      <Dialogue
        show={showConsumptionModal}
        onHide={handleClose}
        headerClass=""
        modalBodyClass="p-0"
        title="View Consumptions"
        size="lg"
        bodyContent={<ViewConsumption packageId={isPackageId} />}
        backdrop="static"
        showFooter={false}
      />
    </>
  );
};

export default ViewPackages;
