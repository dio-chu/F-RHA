import "./Button.css";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  fullWidth = false,
  onClick,
  ...props
}) => {
  return (
    <button
      className={`f-rha-btn f-rha-btn--${variant} f-rha-btn--${size} ${fullWidth ? "f-rha-btn--full-width" : ""}`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
