import React from "react";
import { Tab, Table } from "react-bootstrap";

const PackageComponent = ({ packageDetails }) => {
  return (
    <Table>
      <tr>
        <td className="fw-semibold ps-xl-5 ps-lg-5 ps-md-5 ps-sm-5 px-xs-2">
          Pakcage Type:
        </td>
        <td>{packageDetails?.packageType === "IYear" ? "1 Year" : "2 Year"}</td>
      </tr>
      <tr>
        <td className="fw-semibold ps-xl-5 ps-lg-5 ps-md-5 ps-sm-5 px-xs-2">
          Sessions Included:
        </td>
        <td>
          {packageDetails?.packageType === "IYear"
            ? "6 Sessions"
            : "12 Sessions"}
        </td>
      </tr>
      <tr>
        <td className="fw-semibold ps-xl-5 ps-lg-5 ps-md-5 ps-sm-5 px-xs-2">
          Package Price:
        </td>
        <td>{`$${packageDetails?.packageType === "IYear" ? "100" : "200"}`}</td>
      </tr>
      <tr>
        <td className="fw-semibold ps-xl-5 ps-lg-5 ps-md-5 ps-sm-5 px-xs-2">
          Payment Id:
        </td>
        <td>{`${packageDetails?.paymentId}`}</td>
      </tr>
      <tr>
        <td className="fw-semibold ps-xl-5 ps-lg-5 ps-md-5 ps-sm-5 px-xs-2">
          Payment Method:
        </td>
        <td>{"Package"}</td>
      </tr>
    </Table>
  );
};

export default PackageComponent;
