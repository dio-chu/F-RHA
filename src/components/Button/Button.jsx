import React from "react";
import "./Button.css";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  onClick,
  ...props
}) => {
  return (
    <button
      className={`f-rha-btn f-rha-btn--${variant} f-rha-btn--${size}`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
