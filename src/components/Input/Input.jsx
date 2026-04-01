import React from "react";
import "./Input.css";

const Input = ({
  label,
  placeholder = "",
  value,
  onChange,
  disabled = false,
  error,
  type = "text",
  ...props
}) => {
  return (
    <div className="f-rha-input-wrapper">
      {label && <label className="f-rha-input-label">{label}</label>}
      <input
        className={`f-rha-input ${error ? "f-rha-input--error" : ""}`}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        {...props}
      />
      {error && <span className="f-rha-input-error-msg">{error}</span>}
    </div>
  );
};

export default Input;
