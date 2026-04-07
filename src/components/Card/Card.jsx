import "./Card.css";

const Card = ({
  children,
  title,
  footer,
  variant = "default",
  padding = "md",
  ...props
}) => {
  return (
    <div
      className={`f-rha-card f-rha-card--${variant} f-rha-card--padding-${padding}`}
      {...props}
    >
      {title && <div className="f-rha-card__header">{title}</div>}
      <div className="f-rha-card__body">{children}</div>
      {footer && <div className="f-rha-card__footer">{footer}</div>}
    </div>
  );
};

export default Card;
