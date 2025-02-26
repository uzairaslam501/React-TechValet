import React from "react";
import { Badge, Form } from "react-bootstrap";

const BadgeDisplay = ({
  label,
  values,
  background,
  className,
  badgeClass = "py-2 px-4 fw-normal mx-1",
  badgeStyle = "17px",
}) => {
  return (
    <>
      {label && <Form.Label className="fs-5 fw-semibold">{label}</Form.Label>}
      <div className={className}>
        {values.split(",").map((value, index) =>
          background ? (
            <Badge
              bg={background}
              key={index}
              className={badgeClass}
              style={{
                badgeStyle,
              }}
            >
              {value.trim()}
            </Badge>
          ) : (
            <span title={value.trim()} style={badgeStyle}>
              {value.trim()}
            </span>
          )
        )}
      </div>
    </>
  );
};

export default BadgeDisplay;
