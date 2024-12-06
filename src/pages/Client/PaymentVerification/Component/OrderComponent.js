import React from "react";
import { Button, Col, Row, Table } from "react-bootstrap";
import { formatDateTimeWithAmPm } from "../../../../utils/_helpers";

const OrderComponent = ({ orderDetails, boughtBy }) => {
  return (
    orderDetails && (
      <div>
        <div className="text-start mb-4">
          <p className="fw-bold text-center">Order Summary:</p>
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
              <td>{`${formatDateTimeWithAmPm(
                orderDetails?.startDateTime
              )}`}</td>
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
        </div>

        <Row className="g-3">
          <Col xl={6} lg={6} md={6} sm={12} xs={12} className="mb-1">
            <Button variant="primary" href="/messages" className="w-100">
              Back to Messages
            </Button>
          </Col>
          <Col xl={6} lg={6} md={6} sm={12} xs={12} className="mb-1">
            <Button variant="outline-primary" href="/orders" className="w-100">
              Order Details
            </Button>
          </Col>
        </Row>
      </div>
    )
  );
};

export default OrderComponent;
