import React from "react";
import { Form } from "react-bootstrap";

const UsernameInput = ({
  value,
  onChange,
  onBlur,
  error,
  touched,
  disabled,
}) => {
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    const isValid = /^[a-zA-Z0-9_]*$/.test(inputValue); // Allows only letters, numbers, and underscores

    if (isValid || inputValue === "") {
      onChange(e);
    }
  };

  return (
    <Form.Group className="mb-2">
      <Form.Label>
        Username <span className="text-danger">*</span>
      </Form.Label>
      <Form.Control
        disabled={disabled}
        type="text"
        name="username"
        placeholder="Enter Username"
        value={value}
        onBlur={onBlur}
        onChange={handleInputChange}
        isInvalid={touched && !!error}
      />
      <Form.Control.Feedback type="invalid">
        {touched && error}
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export default UsernameInput;
