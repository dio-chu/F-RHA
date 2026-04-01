import "./Radio.css";

const Radio = ({
  options = [],
  value,
  onChange,
  name,
  disabled = false,
  label,
  ...props
}) => {
  return (
    <fieldset className="f-rha-radio-group" {...props}>
      {label && <legend className="f-rha-radio-legend">{label}</legend>}
      {options.map((option) => {
        const optionValue = typeof option === "object" ? option.value : option;
        const optionLabel = typeof option === "object" ? option.label : option;
        const isDisabled = disabled || (typeof option === "object" && option.disabled);
        const id = `${name}-${optionValue}`;

        return (
          <label
            key={optionValue}
            htmlFor={id}
            className={`f-rha-radio-item ${isDisabled ? "f-rha-radio-item--disabled" : ""}`}
          >
            <input
              id={id}
              type="radio"
              name={name}
              value={optionValue}
              checked={value === optionValue}
              onChange={() => onChange && onChange(optionValue)}
              disabled={isDisabled}
              className="f-rha-radio-input"
            />
            <span className="f-rha-radio-custom" />
            <span className="f-rha-radio-label">{optionLabel}</span>
          </label>
        );
      })}
    </fieldset>
  );
};

export default Radio;
