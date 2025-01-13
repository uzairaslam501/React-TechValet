import React from "react";
import { Badge, Button } from "react-bootstrap";

const OrderButton = ({ userRole, orderStatus, isDelivered }) => {
  const handleOrderStatus = (status) => {
    console.log(`Order status updated to: ${status}`);
    // Implement your order status logic here
  };

  if ((isDelivered === "0" || orderStatus === "0") && userRole === "Valet") {
    return (
      <Button
        onClick={() => handleOrderStatus("Deliver")}
        className="w-100"
        variant="success"
        size="sm"
      >
        DELIVER NOW
      </Button>
    );
  } else if (
    (isDelivered === "1" || orderStatus === "0") &&
    userRole === "Valet"
  ) {
    return (
      <Button
        onClick={() => handleOrderStatus("Deliver")}
        className="w-100 mt-2"
        variant="success"
        size="sm"
      >
        DELIVER AGAIN
      </Button>
    );
  } else if (
    (isDelivered === "1" || orderStatus === "0") &&
    userRole !== "Valet"
  ) {
    return (
      <Button
        id="deliverNow"
        onClick={() => handleOrderStatus("Deliver")}
        className="w-100 mt-2"
        variant="success"
        size="sm"
      >
        ACCEPT ORDER
      </Button>
    );
  } else if (
    isDelivered === "2" ||
    orderStatus === "2" ||
    orderStatus === "1"
  ) {
    return (
      <span
        className=" bg-success w-100 mt-2 text-center text-white py-1"
        style={{ borderRadius: "5px" }}
      >
        ORDER COMPLETED
      </span>
    );
  }

  return (
    <Button
      id="AcceptOrderHiddenButton"
      onClick={() => handleOrderStatus("Deliver")}
      style={{ display: "none" }}
      className="btn btn-success w-100 mt-2"
    >
      ACCEPT ORDER
    </Button>
  );
};

export default OrderButton;
