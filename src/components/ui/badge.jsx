import "../../styles/badge.css";

export default function Badge({ children, variant = "default" }) {
  const variantClass =
    variant === "secondary"
      ? "badgeSecondary"
      : variant === "destructive"
      ? "badgeDestructive"
      : variant === "outline"
      ? "badgeOutline"
      : "badgeDefault";

  return <span className={`badge ${variantClass}`}>{children}</span>;
}