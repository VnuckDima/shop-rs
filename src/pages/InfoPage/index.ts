import { createBenefitIcon, getBenefit, type BenefitKey } from "@shared/lib/benefits";
import { el } from "@shared/lib/dom";
import "./ui/InfoPage.css";

export type InfoPageProps = {
  benefitKey: BenefitKey;
  onBack?: () => void;
};

export function InfoPage({ benefitKey, onBack }: InfoPageProps): HTMLElement {
  const benefit = getBenefit(benefitKey);

  const back = el(
    "button",
    { type: "button", class: "info-page__back" },
    "← Назад",
  );
  back.addEventListener("click", () => onBack?.());

  const details = el(
    "div",
    { class: "info-page__details" },
    ...benefit.details.map((paragraph) =>
      el("p", { class: "info-page__paragraph", text: paragraph }),
    ),
  );

  return el(
    "main",
    { class: "info-page" },
    el(
      "div",
      { class: "info-page__inner container" },
      back,
      el(
        "article",
        { class: "info-page__card" },
        el("img", {
          class: "info-page__image",
          src: benefit.image,
          alt: benefit.title,
        }),
        el("span", { class: "info-page__icon" }, createBenefitIcon(benefit.key)),
        el("h1", { class: "info-page__title", text: benefit.title }),
        el("p", { class: "info-page__lead", text: benefit.text }),
        details,
      ),
    ),
  );
}