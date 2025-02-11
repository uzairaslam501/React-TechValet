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
      <Form.Label className="fs-5 fw-semibold">{label}</Form.Label>
      <div className={className}>
        {values.split(",").map((value, index) => (
          <Badge
            bg={background}
            key={index}
            className="py-2 px-4 fw-normal mx-1"
            style={{
              fontSize: "17px",
            }}
          >
            {value.trim()}
          </Badge>
        ))}
      </div>
    </>
  );
};

export default BadgeDisplay;
