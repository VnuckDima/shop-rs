import { getLocale, setLocale, t } from "@shared/lib/i18n";
import { el } from "@shared/lib/dom";
import "./ui/LanguageSwitcher.css";

export type LanguageSwitcherProps = {
  className?: string;
};

export function LanguageSwitcher({
  className = "",
}: LanguageSwitcherProps = {}): HTMLButtonElement {
  const button = el("button", {
    type: "button",
    class: `lang-switch ${className}`.trim(),
  });

  const update = () => {
    button.textContent = getLocale() === "ru" ? "EN" : "RU";
    button.setAttribute("aria-label", t("lang.switch"));
    button.setAttribute("title", t("lang.switch"));
  };

  button.addEventListener("click", () => {
    setLocale(getLocale() === "ru" ? "en" : "ru");
    update();
  });

  update();

  return button;
}