import React from "react";
import { Table } from "react-bootstrap";
import { formatDateTimeWithAmPm } from "../../../../utils/_helpers";

const OrderComponent = ({ orderDetails, boughtBy }) => {
  return (
    <Table className="table">
      <tr>
        <td className="fw-semibold ps-xl-5 ps-lg-5 ps-md-5 ps-sm-5 px-xs-2">
          Order Title:
        </td>
        <td>{orderDetails?.orderTitle}</td>
      </tr>
      <tr>
        <td className="fw-semibold ps-xl-5 ps-lg-5 ps-md-5 ps-sm-5 px-xs-2">
          Order Price:
        </td>
        <td>{`$${
          orderDetails?.orderPrice + orderDetails?.totalAmountIncludedFee
        }`}</td>
      </tr>
      <tr>
        <td className="fw-semibold ps-xl-5 ps-lg-5 ps-md-5 ps-sm-5 px-xs-2">
          Order Start From:
        </td>
        <td>{`${formatDateTimeWithAmPm(orderDetails?.startDateTime)}`}</td>
      </tr>
      <tr>
        <td className="fw-semibold ps-xl-5 ps-lg-5 ps-md-5 ps-sm-5 px-xs-2">
          Order End To:
        </td>
        <td>{`${formatDateTimeWithAmPm(orderDetails?.endDateTime)}`}</td>
      </tr>
      <tr>
        <td className="fw-semibold ps-xl-5 ps-lg-5 ps-md-5 ps-sm-5 px-xs-2">
          Payment Method:
        </td>
        <td>{boughtBy}</td>
      </tr>
    </Table>
  );
};

export default OrderComponent;
