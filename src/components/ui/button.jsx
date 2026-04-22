import "../../styles/button.css";

export default function Button({
  children,
  className = "",
  type = "button",
  disabled = false,
  ...props
}) {
  return (
    <button
      className={`button ${className}`}
      type={type}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}