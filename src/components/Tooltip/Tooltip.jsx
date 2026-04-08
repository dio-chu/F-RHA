import "./Tooltip.css";

const Tooltip = ({
  children,
  content,
  placement = "top",
  ...props
}) => {
  return (
    <span className={`f-rha-tooltip-wrapper`} {...props}>
      {children}
      <span className={`f-rha-tooltip f-rha-tooltip--${placement}`}>
        {content}
      </span>
    </span>
  );
};

export default Tooltip;
