import React, { useCallback, useEffect, useState } from "react";
import { Badge, Form, Spinner } from "react-bootstrap";
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
  formLabelClass = "",
  firstName,
  lastName,
  inputFieldClass = "",
  style = {},
}) => {
  const dispatch = useDispatch();
  let timeout;
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionsLoader, setSuggestionsLoader] = useState(false);

  const handleInputChange = (e, newValue = null) => {
    const inputValue = newValue !== null ? newValue : e.target.value;
    const isValid = /^[a-zA-Z0-9_]*$/.test(inputValue); // Allows only letters, numbers, and underscores

    if (isValid || inputValue === "") {
      onChange({ target: { name: "username", value: inputValue } });
    }
  };

  const fetchSuggestions = async (username) => {
    setSuggestionsLoader(true);
    if (!username) return;
    try {
      await dispatch(validateUsernames(username))
        .then((response) => {
          setSuggestions(response.payload);
          setSuggestionsLoader(false);
        })
        .catch((error) => {
          console.log(error);
          setSuggestionsLoader(false);
        });
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestionsLoader(false);
    }
  };

  const handleKeyUp = useCallback(
    debounce((e) => {
      const newUsername = e.target.value;

      fetchSuggestions(newUsername);
    }, 2000),
    []
  );

  useEffect(() => {
    if (firstName || lastName) {
      const newUsername = `${firstName}${lastName}`.toLowerCase();
      fetchSuggestions(newUsername);
    }
  }, [firstName, lastName]);

  return (
    <Form.Group className="mb-2">
      <Form.Label className={formLabelClass}>
        Username <span className="text-danger">*</span>
      </Form.Label>
      <Form.Control
        disabled={disabled || suggestionsLoader}
        type="text"
        name="username"
        placeholder="Enter Username"
        value={value}
        onBlur={onBlur}
        onChange={handleInputChange}
        onKeyUp={handleKeyUp} // Trigger API call on keyup
        isInvalid={touched && !!error}
        className={inputFieldClass}
        style={style}
      />
      <Form.Control.Feedback type="invalid">
        {touched && error}
      </Form.Control.Feedback>

      {/* Render suggestions */}
      {!suggestionsLoader ? (
        suggestions &&
        suggestions.length > 0 && (
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
        )
      ) : (
        <Spinner animation="border" size="sm" className="me-1" />
      )}
    </Form.Group>
  );
};

export default UsernameInput;
