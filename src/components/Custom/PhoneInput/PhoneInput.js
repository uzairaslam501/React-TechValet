import React, { useState, useEffect } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { countryCodeList } from "../../../utils/client/data/countries";
import "./PhoneInput.css";

const formatPhoneNumber = (number, format) => {
  let formatted = "";
  let index = 0;

  // Loop through the format and apply digits where 'X' appears
  for (let char of format) {
    if (char === "X" && index < number.length) {
      formatted += number[index];
      index++;
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
  // Filter country list based on provided country codes
  const filteredCountries = countryFilter.length
    ? countryCodeList.filter((country) => countryFilter.includes(country.code))
    : countryCodeList;

  const [selectedCountry, setSelectedCountry] = useState(filteredCountries[0]);
  const [phoneNumber, setPhoneNumber] = useState(value);

  useEffect(() => {
    setPhoneNumber(value);
  }, [value]);

  const handleCountryChange = (event) => {
    const countryCode = event.target.value;
    const country = filteredCountries.find((c) => c.code === countryCode);
    setSelectedCountry(country);
    setPhoneNumber(""); // Reset phone number when country changes
    onChange(""); // Clear parent state
  };

  const handlePhoneNumberChange = (event) => {
    let rawValue = event.target.value.replace(/\D/g, ""); // Remove non-numeric characters

    // Prevent duplicate dial codes
    if (rawValue.startsWith(selectedCountry.dialCode.replace("+", ""))) {
      rawValue = rawValue.substring(selectedCountry.dialCode.length - 1);
    }

    // If empty, allow full deletion
    if (rawValue.length === 0) {
      setPhoneNumber("");
      onChange("");
      return;
    }

    // Apply format if there's still input left
    const formattedNumber = formatPhoneNumber(rawValue, selectedCountry.format);

    setPhoneNumber(`${selectedCountry.dialCode} ${formattedNumber}`);
    onChange(`${selectedCountry.dialCode} ${formattedNumber}`);
  };

  return (
    <div className="custom-phone-input">
      <InputGroup>
        {/* Country Selector */}
        <Form.Select
          value={selectedCountry.code}
          onChange={handleCountryChange}
          className="country-select"
          style={{
            borderRight: "3px solid #eee",
          }}
        >
          {filteredCountries.map((country) => (
            <option key={country.code} value={country.code}>
              {country.name}
            </option>
          ))}
        </Form.Select>

        {/* Phone Number Input */}
        <Form.Control
          type="text"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          placeholder={placeholder}
          className={`phone-input ${className}`}
        />
      </InputGroup>
    </div>
  );
};

export default CustomPhoneInput;
