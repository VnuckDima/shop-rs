import "./button.css";

export type ButtonVariant = "primary" | "ghost" | "icon";

export type ButtonProps = {
  label: string;
  onClick?: () => void;
  variant?: ButtonVariant;
  ariaLabel?: string;
  className?: string;
};

export function Button({
  label,
  onClick,
  variant = "primary",
  ariaLabel,
  className = "",
}: ButtonProps): HTMLButtonElement {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = `btn btn--${variant} ${className}`.trim();
  btn.textContent = label;
  if (ariaLabel) btn.setAttribute("aria-label", ariaLabel);
  if (onClick) btn.addEventListener("click", onClick);
  return btn;
}