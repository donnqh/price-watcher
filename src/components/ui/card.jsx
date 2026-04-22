import "../../styles/card.css";

export function Card({ children, className = "" }) {
  return <div className={`card ${className}`}>{children}</div>;
}

export function CardHeader({ children, className = "" }) {
  return <div className={`cardHeader ${className}`}>{children}</div>;
}

export function CardTitle({ children, className = "" }) {
  return <div className={`cardTitle ${className}`}>{children}</div>;
}

export function CardDescription({ children, className = "" }) {
  return <div className={`cardDescription ${className}`}>{children}</div>;
}

export function CardContent({ children, className = "" }) {
  return <div className={`cardContent ${className}`}>{children}</div>;
}

export function CardFooter({ children, className = "" }) {
  return <div className={`cardFooter ${className}`}>{children}</div>;
}

export function CardAction({ children, className = "" }) {
  return <div className={`cardAction ${className}`}>{children}</div>;
}