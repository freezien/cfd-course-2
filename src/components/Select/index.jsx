import React from "react";

const Select = ({
  label,
  required,
  options = [],
  value = "",
  error = "",
  onChange = () => {},
  ...rest
}) => {
  return (
    <>
      <label className="label">
        {label} {required && <span>*</span>}
      </label>
      <select
        className={`select form__input ${!!error ? "formerror" : ""}`}
        value={value || ""}
        onChange={onChange}
        {...rest}
      >
        {options?.length > 0 &&
          options.map((option, index) => (
            <option key={option.value || index} value={option.value}>
              {option.label}
            </option>
          ))}
      </select>
      <p className="error">{error || ""}</p>
    </>
  );
};

export default Select;
