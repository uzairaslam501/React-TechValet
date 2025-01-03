import React, { useState } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";

const PasswordField = ({
  label,
  name,
  placeholder,
  onChange,
  onBlur,
  value,
  required,
  isInvalid,
  touched,
  errors,
  size = "sm",
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Form.Group className="mb-3">
      <Form.Label>
        {label} {required && <span className="text-danger">*</span>}
      </Form.Label>
      <InputGroup>
        <Form.Control
          type={showPassword ? "text" : "password"}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          size={size}
          isInvalid={isInvalid}
        />
        <Button
          variant="outline-secondary border-1"
          className="rounded-end"
          style={{
            borderColor: "#ced4da",
          }}
          onClick={handleClickShowPassword}
          aria-label="Toggle password visibility"
        >
          {showPassword ? (
            <i className="bi bi-eye-slash"></i>
          ) : (
            <i className="bi bi-eye"></i>
          )}
        </Button>
        <Form.Control.Feedback type="invalid">
          {touched && errors}
        </Form.Control.Feedback>
      </InputGroup>
    </Form.Group>
  );
};

export default PasswordField;
