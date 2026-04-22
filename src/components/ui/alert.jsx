import "../styles/alert.css";

export function Alert({ children, variant = "default" }) {
  return (
    <div className={`alert ${variant === "destructive" ? "alertDestructive" : ""}`}>
      {children}
    </div>
  );
}

export function AlertTitle({ children }) {
  return <div className="alertTitle">{children}</div>;
}

export function AlertDescription({ children }) {
  return <div className="alertDescription">{children}</div>;
}