import React from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const CustomDropdown = ({
  optionsList,
  selectedOptions,
  handleChange,
  handleBlur,
  values,
  isMultiSelect = false,
  isSearchable = false,
  fieldName = "",
  isDisabled = false,
}) => {
  // Map the optionsList to React-Select's format
  const dropdownOptions = optionsList.map((option) => ({
    value: option.id,
    label: option.value,
  }));

  // Determine selected values for single or multi-select
  const selectedValues = isMultiSelect
    ? Array.isArray(selectedOptions)
      ? selectedOptions
          .map((id) => dropdownOptions.find((option) => option.value === id))
          .filter(Boolean)
      : []
    : dropdownOptions.find((option) => option.value === selectedOptions) ||
      null;

  const animatedComponents = makeAnimated();

  return (
    <Select
      isDisabled={isDisabled}
      closeMenuOnSelect={!isMultiSelect}
      components={animatedComponents}
      value={selectedValues || (isMultiSelect ? [] : null)}
      isMulti={isMultiSelect}
      isSearchable={isSearchable}
      options={dropdownOptions}
      onChange={(selectedOptions) => {
        // Extract IDs based on single or multi-select
        const selectedIds = isMultiSelect
          ? selectedOptions
            ? selectedOptions.map((opt) => opt.value)
            : []
          : selectedOptions
          ? selectedOptions.value
          : "";

        handleChange(selectedIds);
      }}
      onBlur={handleBlur}
      placeholder={`Select ${fieldName || "option"}`}
    />
  );
};

export default CustomDropdown;

// Helping Links
// https://react-select.com/home#async
// https://codesandbox.io/p/sandbox/w4g3n8?file=%2Fdocs%2Fdata.ts%3A9%2C14-9%2C27

// Options format
// const colourOptions = [
//   { value: "ocean", label: "Ocean", color: "#00B8D9", isFixed: true },
//   { value: "blue", label: "Blue", color: "#0052CC", isDisabled: true },
//   { value: "purple", label: "Purple", color: "#5243AA" },
//   { value: "red", label: "Red", color: "#FF5630", isFixed: true },
//   { value: "orange", label: "Orange", color: "#FF8B00" },
// ];
