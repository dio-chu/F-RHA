import { useEffect } from "react";
import "./Dialog.css";

const Dialog = ({
  open = false,
  onClose,
  title,
  children,
  footer,
  width = "480px",
  ...props
}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && open && onClose) onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="f-rha-dialog-overlay" onClick={onClose}>
      <div
        className="f-rha-dialog"
        style={{ width }}
        onClick={(e) => e.stopPropagation()}
        {...props}
      >
        <div className="f-rha-dialog-header">
          {title && <h3 className="f-rha-dialog-title">{title}</h3>}
          <button className="f-rha-dialog-close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>
        <div className="f-rha-dialog-body">{children}</div>
        {footer && <div className="f-rha-dialog-footer">{footer}</div>}
      </div>
    </div>
  );
};

export default Dialog;
