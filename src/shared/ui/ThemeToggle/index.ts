import { el } from "@shared/lib/dom";
import { toggleTheme, type Theme } from "@shared/lib/theme";
import "./ui/ThemeToggle.css";

export type ThemeToggleProps = {
  className?: string;
  onChange?: (theme: Theme) => void;
};

export function ThemeToggle({
  className = "",
  onChange,
}: ThemeToggleProps = {}): HTMLButtonElement {
  const button = el(
    "button",
    {
      type: "button",
      class: `theme-toggle ${className}`.trim(),
      "aria-label": "Переключить тему",
      title: "Переключить тему",
    },
    el("span", {
      class: "theme-toggle__icon theme-toggle__icon--sun",
      "aria-hidden": "true",
      text: "☀",
    }),
    el("span", {
      class: "theme-toggle__icon theme-toggle__icon--moon",
      "aria-hidden": "true",
      text: "☾",
    }),
  );

  button.addEventListener("click", () => {
    const theme = toggleTheme();
    onChange?.(theme);
  });

  return button;
}