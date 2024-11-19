import React, { useEffect } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const CustomDropdown = ({
  optionsList,
  handleChange,
  handleBlur,
  values,
  isMultiSelect = false,
  isSearchable = false,
  valueKey = "",
  fieldName = "",
}) => {
  const dropdownOptions = optionsList.map((option) => ({
    value: option.id,
    label: option.value,
  }));

  const selectedValues = isMultiSelect
    ? values[valueKey]
        ?.map(
          (id) => dropdownOptions.find((option) => option.value === id) || null
        )
        .filter(Boolean)
    : dropdownOptions.find(
        (option) => option.value === values[valueKey] || null
      );

  const animatedComponents = makeAnimated();

  useEffect(() => {}, [isMultiSelect]);

  return (
    <Select
      closeMenuOnSelect={!isMultiSelect} // Only close on select for single dropdown
      components={animatedComponents}
      value={selectedValues || (isMultiSelect ? [] : null)}
      isMulti={isMultiSelect}
      isSearchable={isSearchable}
      options={dropdownOptions}
      onChange={(selectedOptions) => {
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
