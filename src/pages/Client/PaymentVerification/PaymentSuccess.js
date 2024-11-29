import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { checkPaymentStatusForOrder } from "../../../redux/Actions/paypalActions";

const PaymentSuccess = () => {
  const dispatch = useDispatch();
  const [orderDetails, setOrderDetails] = useState(null);

  const [searchParams] = useSearchParams();
  const paymentId = searchParams.get("paymentId");
  const token = searchParams.get("token");
  const payerId = searchParams.get("PayerID");

  useEffect(() => {
    try {
      const modelForOrderStatus = {
        paymentId,
        token,
        payerId,
      };
      dispatch(checkPaymentStatusForOrder(modelForOrderStatus)).then(
        (response) => {
          console.log(response);
          setOrderDetails(response?.payload);
        }
      );
    } catch (error) {
      console.log(error);
    }
  }, [paymentId]);
  return (
    <Container className="d-flex justify-content-center align-items-center py-5">
      <Card className="shadow-lg text-center p-4" style={{ maxWidth: "500px" }}>
        <i
          className="bi bi-check-circle text-success"
          style={{ fontSize: "5.5rem" }}
        ></i>
        <Card.Title className="text-success fw-bold fs-3">
          Payment Successful!
        </Card.Title>
        <Card.Text className="text-muted my-3">
          Thank you for your purchase. Your transaction was completed
          successfully.
        </Card.Text>
        <div className="text-start mb-4">
          <p className="fw-bold text-center">Order Summary:</p>
          {orderDetails && (
            <table className="table">
              <tr>
                <td className="fw-semibold ps-xl-5 ps-lg-5 ps-md-5 ps-sm-5 px-xs-2">
                  Order ID:
                </td>{" "}
                <td>{orderDetails?.encOrderId}</td>
              </tr>
              <tr>
                <td className="fw-semibold ps-xl-5 ps-lg-5 ps-md-5 ps-sm-5 px-xs-2">
                  Order Price:
                </td>
                <td>{`$${orderDetails?.totalPayment}`}</td>
              </tr>
              <tr>
                <td className="fw-semibold ps-xl-5 ps-lg-5 ps-md-5 ps-sm-5 px-xs-2">
                  Transaction Fee:
                </td>
                <td>{`$${orderDetails?.transactionFee}`}</td>
              </tr>
              <tr>
                <td className="fw-semibold ps-xl-5 ps-lg-5 ps-md-5 ps-sm-5 px-xs-2">
                  Payment Method:
                </td>{" "}
                <td>{orderDetails?.paymentMethod}</td>
              </tr>
            </table>
          )}
        </div>
        <Row className="g-3">
          <Col xl={6} lg={6} md={6} sm={12} xs={12} className="mb-1">
            <Button variant="primary" href="/messages" className="w-100">
              Back to Home
            </Button>
          </Col>
          <Col xl={6} lg={6} md={6} sm={12} xs={12} className="mb-1">
            <Button variant="outline-primary" href="/orders" className="w-100">
              Order Details
            </Button>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default PaymentSuccess;
