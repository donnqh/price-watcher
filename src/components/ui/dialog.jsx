"use client";

import "../../styles/dialog.css";
import { createPortal } from "react-dom";

export function Dialog({ open, children, onClose }) {
  if (!open) return null;

  return createPortal(
    <div className="dialogOverlay" onClick={onClose}>
      {children}
    </div>,
    document.body
  );
}

export function DialogTrigger({ children, onClick }) {
  return (
    <span onClick={onClick} style={{ display: "inline-block" }}>
      {children}
    </span>
  );
}

export function DialogContent({
  children,
  onClose,
  showCloseButton = true,
}) {
  return (
    <div className="dialogContent" onClick={(e) => e.stopPropagation()}>
      {showCloseButton && (
        <button className="dialogCloseButton" onClick={onClose}>
          ×
        </button>
      )}
      {children}
    </div>
  );
}

export function DialogHeader({ children }) {
  return <div className="dialogHeader">{children}</div>;
}

export function DialogFooter({ children }) {
  return <div className="dialogFooter">{children}</div>;
}

export function DialogTitle({ children }) {
  return <h2 className="dialogTitle">{children}</h2>;
}

export function DialogDescription({ children }) {
  return <p className="dialogDescription">{children}</p>;
}

export function DialogClose({ children, onClick }) {
  return (
    <button className="dialogButton" onClick={onClick}>
      {children}
    </button>
  );
}