import React from "react";
import { Badge, Form } from "react-bootstrap";

const SingleBadge = ({
  value,
  background = "secondary",
  className = "p-2 fw-normal",
  index,
  style,
}) => {
  return (
    <>
      <Badge bg={background} key={index} className={className} style={style}>
        {value.trim()}
      </Badge>
    </>
  );
};

export default SingleBadge;
