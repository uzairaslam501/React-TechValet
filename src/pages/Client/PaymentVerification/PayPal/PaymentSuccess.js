import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import {
  checkPaymentStatusForOrder,
  checkPaymentStatusForPackage,
} from "../../../../redux/Actions/paypalActions";
import OrderComponent from "../Component/OrderComponent";
import PackageComponent from "../Component/PackageComponent";

const PaymentSuccess = () => {
  const dispatch = useDispatch();
  const [orderDetails, setOrderDetails] = useState(null);
  const [packageDetails, setPackageDetails] = useState(null);

  const [searchParams] = useSearchParams();
  const paymentType = searchParams.get("type");
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
      if (paymentType === "Order") {
        dispatch(checkPaymentStatusForOrder(modelForOrderStatus)).then(
          (response) => {
            setOrderDetails(response?.payload);
          }
        );
      } else {
        dispatch(checkPaymentStatusForPackage(modelForOrderStatus)).then(
          (response) => {
            setPackageDetails(response?.payload);
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
        {orderDetails && (
          <OrderComponent orderDetails={orderDetails} boughtBy={"PAYPAL"} />
        )}
        {packageDetails && (
          <PackageComponent
            packageDetails={packageDetails}
            boughtBy={"PAYPAL"}
          />
        )}
      </Card>
    </Container>
  );
};

export default PaymentSuccess;
