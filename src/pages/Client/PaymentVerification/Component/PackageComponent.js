import React from "react";
import { Button, Col, Row, Table } from "react-bootstrap";

const PackageComponent = ({ packageDetails, boughtBy }) => {
  return (
    <div>
      <div className="text-start mb-4">
        <p className="fw-bold text-center">Order Summary:</p>
        <Table>
          <tr>
            <td className="fw-semibold ps-xl-5 ps-lg-5 ps-md-5 ps-sm-5 px-xs-2">
              Pakcage Type:
            </td>
            <td>{packageDetails?.packageType === 1 ? "1 Year" : "2 Year"}</td>
          </tr>
          <tr>
            <td className="fw-semibold ps-xl-5 ps-lg-5 ps-md-5 ps-sm-5 px-xs-2">
              Sessions Included:
            </td>
            <td>
              {packageDetails?.packageType === 1 ? "6 Sessions" : "12 Sessions"}
            </td>
          </tr>
          <tr>
            <td className="fw-semibold ps-xl-5 ps-lg-5 ps-md-5 ps-sm-5 px-xs-2">
              Package Price:
            </td>
            <td>{`$${packageDetails?.packageType === 1 ? "100" : "200"}`}</td>
          </tr>
          <tr>
            <td className="fw-semibold ps-xl-5 ps-lg-5 ps-md-5 ps-sm-5 px-xs-2">
              Payment Method:
            </td>
            <td>{`${packageDetails?.packagePaidBy}`}</td>
          </tr>
        </Table>
      </div>

      <Row className="g-3">
        <Col xl={6} lg={6} md={6} sm={12} xs={12} className="mb-1">
          <Button variant="primary" href="/packages" className="w-100">
            Back to Packages
          </Button>
        </Col>
        <Col xl={6} lg={6} md={6} sm={12} xs={12} className="mb-1">
          <Button
            variant="outline-primary"
            href="/package-details"
            className="w-100"
          >
            View Packages
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default PackageComponent;
