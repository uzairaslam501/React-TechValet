import React, { useEffect, useMemo, useState } from "react";
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
  instructions = false,
  setIsPasswordValid,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const passwordCriteria = useMemo(
    () => ({
      length: value.length >= 6,
      lowercase: /[a-z]/.test(value),
      uppercase: /[A-Z]/.test(value),
      numeric: /[0-9]/.test(value),
      specialChar: /[!@#$%^&*(),.?":{}|<>_-]/.test(value),
    }),
    [value]
  );

  const isPasswordValid = Object.values(passwordCriteria).every(Boolean);

  useEffect(() => {
    if (setIsPasswordValid) {
      setIsPasswordValid(isPasswordValid);
    }
  }, [isPasswordValid, setIsPasswordValid]);

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
          isInvalid={
            (isInvalid && touched) || (instructions && !isPasswordValid)
          }
          aria-describedby={instructions ? `${name}-instructions` : undefined}
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
            <i className="bi bi-eye"></i>
          ) : (
            <i className="bi bi-eye-slash"></i>
          )}
        </Button>
        <Form.Control.Feedback type="invalid">
          {touched &&
            errors &&
            !isPasswordValid &&
            "Password must meet all requirements"}
        </Form.Control.Feedback>
      </InputGroup>
      {instructions && (
        <div id={`${name}-instructions`} className="mt-2 text-muted small">
          <ul className="mb-0">
            {Object.entries(passwordCriteria).map(([key, valid]) => (
              <li key={key} style={{ color: valid ? "green" : "red" }}>
                {key === "length" && "At least 6 characters long"}
                {key === "lowercase" && "At least one lowercase letter"}
                {key === "uppercase" && "At least one uppercase letter"}
                {key === "numeric" && "At least one number"}
                {key === "specialChar" &&
                  "At least one special character (!@#$%^&*...)"}
              </li>
            ))}
          </ul>
        </div>
      )}
    </Form.Group>
  );
};

export default PasswordField;
