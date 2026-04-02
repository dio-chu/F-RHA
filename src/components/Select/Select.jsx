import "./Select.css";

const Select = ({
  options = [],
  value,
  onChange,
  label,
  placeholder = "Select...",
  disabled = false,
  error,
  ...props
}) => {
  return (
    <div className="f-rha-select-wrapper">
      {label && <label className="f-rha-select-label">{label}</label>}
      <select
        className={`f-rha-select ${error ? "f-rha-select--error" : ""}`}
        value={value ?? ""}
        onChange={(e) => onChange?.(e.target.value)}
        disabled={disabled}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => {
          const optValue = typeof option === "object" ? option.value : option;
          const optLabel = typeof option === "object" ? option.label : option;
          const optDisabled = typeof option === "object" && option.disabled;

          return (
            <option key={optValue} value={optValue} disabled={optDisabled}>
              {optLabel}
            </option>
          );
        })}
      </select>
      {error && <span className="f-rha-select-error-msg">{error}</span>}
    </div>
  );
};

export default Select;
