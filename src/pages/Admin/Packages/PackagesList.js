import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Card, CardBody, Col, Container, Row } from "react-bootstrap";
import Dialogue from "../../../components/Custom/Modal/modal";
import CustomTable from "../../../components/Custom/Datatable/table";
import ViewConsumption from "../../Client/Manage/Packages/viewConsumption";
import { getPackagesRecord } from "../../../redux/Actions/adminActions";
import BadgeStatus from "../../../components/Custom/StatusBadge/StatusBadge";

const PackagesList = () => {
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
    {
      id: "0",
      label: "Name",
      column: "customer",
    },
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
      label: "Package",
      column: "packageType",
    },
    {
      id: "0",
      label: "Sessions",
      column: "totalSessions",
    },
    {
      id: "0",
      label: "Remaining",
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

  const fetchUsers = useCallback(
    (
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

      setLoader(true);
      dispatch(getPackagesRecord(params))
        .then((response) => {
          if (response?.payload) {
            const data = response.payload.data.map((obj) => {
              return {
                ...obj,
                packageType:
                  obj.packageType === "1" ? (
                    <BadgeStatus status="OneYear" />
                  ) : (
                    <BadgeStatus status="TwoYear" />
                  ),
                status:
                  obj.remainingSessions >= 1 ? (
                    <BadgeStatus status="Activate" />
                  ) : (
                    <BadgeStatus status="Expired" />
                  ),
              };
            });

            setRecords(data);
            setTotalRecords(response.payload?.recordsTotal);
          }
        })
        .catch((error) => {
          setRecords([]);
          setTotalRecords(0);
        })
        .finally((response) => {
          setLoader(false);
        });
    }
  );

  useEffect(() => {
    fetchUsers(0, pageLength);
  }, [pageLength]);

  return (
    <>
      <Container className="py-5 mt-5">
        <Row>
          <Col xl={12} lg={12} md={12} sm={12} xs={12}>
            <Card>
              <CardBody className="w-100">
                <h1 className="fw-bold text-center">Manage Packages</h1>
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
                  tableClassName="text-center"
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      <Dialogue
        show={showConsumptionModal}
        onHide={handleClose}
        headerClass=""
        modalBodyClass="p-0"
        title="View Consumptions"
        size="lg"
        bodyContent={<ViewConsumption packageId={isPackageId} />}
        backdrop="static"
        centered={true}
        showFooter={false}
      />
    </>
  );
};

export default PackagesList;
