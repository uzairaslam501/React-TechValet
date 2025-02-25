import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Card, CardBody } from "react-bootstrap";
import CustomTable from "../../../../components/Custom/Datatable/table";
import { getUserPackagesConsumptionRecords } from "../../../../redux/Actions/customerActions";
import BadgeStatus from "../../../../components/Custom/StatusBadge/StatusBadge";
import { NavLink } from "react-router-dom";

const ViewConsumption = ({ packageId }) => {
  const dispatch = useDispatch();

  const [consumptionRecords, setConsumptionRecords] = useState([]);
  const [pageConsumptionLength, setConsumptionPageLength] = useState(5);
  const [consumptionLoader, setConsumptionLoader] = useState(false);
  const [totalConsumptionRecord, setTotalConsumptionRecords] = useState(0);

  const consumptionHeaders = [
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

  useEffect(() => {
    handleViewConsumption();
  }, [packageId]);

  const handleViewConsumption = useCallback(
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
        packageId,
      };
      try {
        setConsumptionLoader(true);
        dispatch(getUserPackagesConsumptionRecords(params)).then((response) => {
          if (response?.payload) {
            const data = response.payload.data.map((obj) => {
              const orderPaidByBadge =
                obj.orderReasonType &&
                obj.orderReasonType === "3" &&
                obj.orderReasonIsActive === "1" ? (
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
                  <NavLink to={`/order-details/${obj.encId}`}>
                    <BadgeStatus status="Unknown" />
                  </NavLink>
                );

              return {
                ...obj,
                orderTitle: (
                  <NavLink
                    to={`/order-details/${obj.encId}`}
                    className="text-dark"
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

            setConsumptionRecords(data);
            setTotalConsumptionRecords(response.payload?.recordsTotal);
          } else {
            setConsumptionRecords([]);
            setTotalConsumptionRecords(0);
          }
        });
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setConsumptionLoader(false);
      }
    }
  );

  return (
    <>
      <Card className="border-0">
        <CardBody>
          <CustomTable
            headers={consumptionHeaders}
            records={consumptionRecords}
            totalRecords={totalConsumptionRecord}
            pageLength={pageConsumptionLength}
            onPageChange={handleViewConsumption}
            onPageLengthChange={setConsumptionPageLength}
            loader={consumptionLoader}
            searchFunctionality={false}
            pageLengthFunctionality={true}
            tableClassName="text-center"
          />
        </CardBody>
      </Card>
    </>
  );
};

export default ViewConsumption;
