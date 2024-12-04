import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useLocation } from "react-router";
import { getPackageById } from "../../../../redux/Actions/packageActions";
import { getOrderById } from "../../../../redux/Actions/customerActions";
import { formatDateTimeWithAmPm } from "../../../../utils/_helpers";
import OrderComponent from "../Component/OrderComponent";
import PackageComponent from "../Component/PackageComponent";

const StripePaymentSuccess = () => {
  const dispatch = useDispatch();
  const { state } = useLocation();
  const [orderDetails, setOrderDetails] = useState();
  const [packageDetails, setPackageDetails] = useState();
  const [boughtBy, setBoughtBy] = useState();
  const record = state;

  const fetchPackageDetails = (packageId) => {
    try {
      dispatch(getPackageById(packageId)).then((response) => {
        console.log(response);
        setPackageDetails(response?.payload);
      });
    } catch (error) {}
  };

  const fetchOrderDetails = (orderId) => {
    try {
      dispatch(getOrderById(orderId)).then((response) => {
        console.log(response);
        setOrderDetails(response?.payload);
      });
    } catch (error) {}
  };

  useEffect(() => {
    if (record?.type === "Package") {
      fetchPackageDetails(record?.id);
    } else {
      if (record.type === "Order-Package") {
        setBoughtBy("Package");
      }
      if (record.type === "Order") {
        setBoughtBy("Stripe");
      }
      fetchOrderDetails(record.id);
    }
  }, [record]);

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
            <OrderComponent orderDetails={orderDetails} boughtBy={"STRIPE"} />
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

export default StripePaymentSuccess;
