import React from "react";
import Form from "react-bootstrap/Form";
import { Row, Col } from "react-bootstrap";

function RadioCheck({
  checkType = "radio",
  inlineOrNot = true,
  options = [],
  name,
  selectedValue,
  onChange,
}) {
  return (
    <Row>
      {options.map((option, index) => (
        <Col key={index}>
          <Form.Check
            type={checkType}
            label={option.label}
            name={name}
            value={option.value}
            checked={selectedValue === option.value}
            onChange={onChange}
            inline={inlineOrNot}
            id={`${name}-${option.value}`}
          />
        </Col>
      ))}
    </Row>
  );
}

export default RadioCheck;
