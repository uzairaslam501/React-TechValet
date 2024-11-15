import React from "react";
import { Badge, Form } from "react-bootstrap";

const BadgeDisplay = ({ label, values }) => {
  return (
    <>
      <Form.Label>
        {label} <span className="text-danger">*</span>
      </Form.Label>
      <div className="border border-grey rounded bg-white py-2 px-1">
        {values.split(",").map((value, index) => (
          <Badge bg="secondary" key={index} className="p-2 fw-normal">
            {value.trim()}
          </Badge>
        ))}
      </div>
    </>
  );
};

export default BadgeDisplay;
