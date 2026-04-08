import "./Card.css";

const Card = ({
  children,
  title,
  extra,
  variant = "default",
  ...props
}) => {
  return (
    <div className={`f-rha-card f-rha-card--${variant}`} {...props}>
      {(title || extra) && (
        <div className="f-rha-card-header">
          {title && <div className="f-rha-card-title">{title}</div>}
          {extra && <div className="f-rha-card-extra">{extra}</div>}
        </div>
      )}
      <div className="f-rha-card-body">{children}</div>
    </div>
  );
};

export default Card;
