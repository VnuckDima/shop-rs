import "./button.css";

export function Button(
  label: string,
  onClick?: () => void,
  variant: "primary" | "ghost" = "primary",
): HTMLButtonElement {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = `btn btn--${variant}`;
  btn.textContent = label;
  if (onClick) btn.addEventListener("click", onClick);
  return btn;
}