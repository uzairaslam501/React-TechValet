import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import {
  checkPaymentStatusForOrder,
  checkPaymentStatusForPackage,
} from "../../../redux/Actions/paypalActions";
import OrderComponent from "./Component/OrderComponent";
import PackageComponent from "./Component/PackageComponent";
import { getPackageById } from "../../../redux/Actions/packageActions";
import { getOrderById } from "../../../redux/Actions/customerActions";

const PaymentSuccess = () => {
  const dispatch = useDispatch();
  const [orderDetails, setOrderDetails] = useState(null);
  const [packageDetails, setPackageDetails] = useState(null);

  const [searchParams] = useSearchParams();
  const paymentType = searchParams.get("type");
  const paymentId = searchParams.get("paymentId");
  const token = searchParams.get("token");
  const payerId = searchParams.get("PayerID");

  const fetchPackageDetails = (packageId) => {
    try {
      dispatch(getPackageById(packageId)).then((response) => {
        console.log(response);
        setPackageDetails(response?.payload);
      });
    } catch (error) {}
  };

  useEffect(() => {
    try {
      const modelForOrderStatus = {
        paymentId,
        token,
        payerId,
      };
      if (paymentType === "Order") {
        dispatch(checkPaymentStatusForOrder(modelForOrderStatus)).then(
          (response) => {
            setOrderDetails(response?.payload);
          }
        );
      } else {
        dispatch(checkPaymentStatusForPackage(modelForOrderStatus)).then(
          (response) => {
            fetchPackageDetails(response?.payload.userPackageId);
          }
        );
      }
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
            <OrderComponent orderDetails={orderDetails} boughtBy={"PAYPAL"} />
          )}
          {packageDetails && (
            <PackageComponent packageDetails={packageDetails} />
          )}
        </div>
        {orderDetails && (
          <Row className="g-3">
            <Col xl={6} lg={6} md={6} sm={12} xs={12} className="mb-1">
              <Button variant="primary" href="/messages" className="w-100">
                Back to Messages
              </Button>
            </Col>
            <Col xl={6} lg={6} md={6} sm={12} xs={12} className="mb-1">
              <Button
                variant="outline-primary"
                href="/orders"
                className="w-100"
              >
                Order Details
              </Button>
            </Col>
          </Row>
        )}
        {packageDetails && (
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
        )}
      </Card>
    </Container>
  );
};

export default PaymentSuccess;
