import React from "react";
import { Badge, Form } from "react-bootstrap";

const BadgeDisplay = ({
  label,
  values,
  background = "secondary",
  className,
}) => {
  return (
    <>
      <Form.Label>
        {label} <span className="text-danger">*</span>
      </Form.Label>
      <div className={className}>
        {values.split(",").map((value, index) => (
          <Badge bg={background} key={index} className="p-2 fw-normal">
            {value.trim()}
          </Badge>
        ))}
      </div>
    </>
  );
};

export default BadgeDisplay;
