import "./Link.css";

const Link = ({
  children,
  href = "#",
  variant = "primary",
  external = false,
  disabled = false,
  onClick,
  ...props
}) => {
  const handleClick = (e) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    onClick?.(e);
  };

  const externalProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <a
      className={`f-rha-link f-rha-link--${variant} ${disabled ? "f-rha-link--disabled" : ""}`}
      href={disabled ? undefined : href}
      onClick={handleClick}
      {...externalProps}
      {...props}
    >
      {children}
      {external && !disabled && (
        <span
          className="f-rha-link-external-icon"
          aria-label="opens in new tab"
        >
          ↗
        </span>
      )}
    </a>
  );
};

export default Link;
