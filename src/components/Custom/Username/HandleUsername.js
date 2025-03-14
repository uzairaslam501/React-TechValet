import React, { useCallback, useState } from "react";
import { Badge, Form } from "react-bootstrap";
import { validateUsernames } from "../../../redux/Actions/authActions";
import { useDispatch } from "react-redux";
import { debounce } from "lodash";

const UsernameInput = ({
  value,
  onChange,
  onBlur,
  error,
  touched,
  disabled,
}) => {
  const dispatch = useDispatch();
  let timeout;
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (e, newValue = null) => {
    const inputValue = newValue !== null ? newValue : e.target.value;
    const isValid = /^[a-zA-Z0-9_]*$/.test(inputValue); // Allows only letters, numbers, and underscores

    if (isValid || inputValue === "") {
      onChange({ target: { name: "username", value: inputValue } });
    }
  };

  const fetchSuggestions = async (username) => {
    if (!username) return;

    try {
      await dispatch(validateUsernames(username))
        .then((response) => {
          console.log("usernames", response?.payload);
          setSuggestions(response.payload);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const handleKeyUp = useCallback(
    debounce((e) => {
      const newUsername = e.target.value;

      fetchSuggestions(newUsername);
    }, 2000),
    []
  );

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
        onKeyUp={handleKeyUp} // Trigger API call on keyup
        isInvalid={touched && !!error}
      />
      <Form.Control.Feedback type="invalid">
        {touched && error}
      </Form.Control.Feedback>

      {/* Render suggestions */}
      {suggestions && suggestions.length > 0 && (
        <div className="mt-2">
          {suggestions.map((suggestion, index) => (
            <Badge
              key={index}
              pill
              bg="primary"
              className="me-2 cursor-pointer"
              style={{
                cursor: "pointer",
                padding: "8px 12px",
                fontSize: "14px",
              }}
              onClick={() => handleInputChange(null, suggestion)}
            >
              {suggestion}
            </Badge>
          ))}
        </div>
      )}
    </Form.Group>
  );
};

export default UsernameInput;
