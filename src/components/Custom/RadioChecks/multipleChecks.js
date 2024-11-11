import React from "react";
import { Col, FormCheck, Row } from "react-bootstrap";

const RadioCheckMultiple = ({
  checkType,
  inlineOrNot,
  options,
  name,
  selectedValues,
  onChange,
}) => {
  return (
    <Row>
      {options.map((option) => (
        <Col
          md={4}
          sm={12}
          key={`${inlineOrNot}-${option.value}`}
          className="mb-3"
        >
          <FormCheck
            inline={inlineOrNot}
            label={option.label}
            name={name}
            type={checkType}
            value={option.value}
            checked={selectedValues && selectedValues.includes(option.value)}
            onChange={(e) => onChange(e)}
            id={`${inlineOrNot}-${option.value}-${option.label}`}
          />
        </Col>
      ))}
    </Row>
  );
};

export default RadioCheckMultiple;
