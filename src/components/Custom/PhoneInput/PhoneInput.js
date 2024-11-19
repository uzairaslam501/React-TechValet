import React, { useState } from "react";
import { countryCodeList } from "../../../utils/client/data/countries";
import { Form, InputGroup } from "react-bootstrap";
import "./PhoneInput.css";

const formatPhoneNumber = (number, format) => {
  let formatted = "";
  let index = 0;

  for (let char of format) {
    if (char === "X" && index < number.length) {
      formatted += number[index];
      index++;
    } else if (char !== "X") {
      formatted += char;
    }
  }

  return formatted;
};

const CustomPhoneInput = ({
  placeholder = "Enter phone number",
  className = "",
  value = "",
  onChange,
  countryFilter = [],
}) => {
  const filteredCountries = countryFilter.length
    ? countryCodeList.filter((country) => countryFilter.includes(country.code))
    : countryCodeList;

  const [selectedCountry, setSelectedCountry] = useState(filteredCountries[0]);
  const [phoneNumber, setPhoneNumber] = useState(value);

  const handleCountryChange = (event) => {
    const countryCode = event.target.value;
    const country = filteredCountries.find((c) => c.code === countryCode);
    setSelectedCountry(country);
    setPhoneNumber(""); // Reset phone number when country changes
    onChange(""); // Clear parent state when country changes
  };

  const handlePhoneNumberChange = (event) => {
    const rawValue = event.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    const formattedNumber = formatPhoneNumber(rawValue, selectedCountry.format);
    setPhoneNumber(formattedNumber);
    onChange(formattedNumber); // Update parent component
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      <InputGroup className="mb-3">
        <InputGroup.Text style={{ padding: "0", borderRight: "none" }}>
          <Form.Select
            value={selectedCountry.code}
            onChange={handleCountryChange}
            style={{
              border: "none",
              fontSize: "1rem",
              padding: "0.5rem 1rem",
              width: "80px",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            {filteredCountries.map((country) => (
              <option
                key={country.code}
                value={country.code}
                style={{
                  backgroundSize: "contain",
                  fontSize: "1rem",
                  padding: "0.25rem",
                }}
              >
                {country.flag}
              </option>
            ))}
          </Form.Select>
        </InputGroup.Text>

        <InputGroup.Text
          style={{
            padding: "0.5rem 0.75rem",
            fontSize: "1rem",
            borderLeft: "none",
            borderRight: "none",
          }}
        >
          {selectedCountry.dialCode}
        </InputGroup.Text>

        <Form.Control
          type="text"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          placeholder={placeholder}
          className={className}
          style={{ borderLeft: "none" }}
        />
      </InputGroup>
    </div>
  );
};

export default CustomPhoneInput;
