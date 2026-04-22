import "../../styles/input.css";

export default function input({ type = "text", placeholder = "", ...props }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="input"
      {...props}
    />
  );
}