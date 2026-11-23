import {
  BENEFITS,
  benefitText,
  benefitTitle,
  createBenefitIcon,
  type BenefitKey,
} from "@shared/lib/benefits";
import { el } from "@shared/lib/dom";
import { t } from "@shared/lib/i18n";
import "./ui/Benefits.css";

export type BenefitsProps = {
  onSelect?: (key: BenefitKey) => void;
};

export function Benefits({ onSelect }: BenefitsProps = {}): HTMLElement {
  const cards = BENEFITS.map((item) => {
    const card = el(
      "a",
      { class: "benefit", href: "#", "data-benefit": item.key },
      el("img", {
        class: "benefit__image",
        src: item.image,
        alt: "",
        loading: "lazy",
      }),
      el("span", { class: "benefit__icon" }, createBenefitIcon(item.key)),
      el("h3", { class: "benefit__title", text: benefitTitle(item.key) }),
      el("p", { class: "benefit__text", text: benefitText(item.key) }),
    );

    card.addEventListener("click", (event) => {
      event.preventDefault();
      onSelect?.(item.key);
    });

    return card;
  });

  const grid = el("div", { class: "benefits__grid" }, ...cards);

  return el(
    "section",
    { class: "benefits" },
    el(
      "div",
      { class: "benefits__inner container" },
      el("h2", { class: "benefits__title", text: t("benefits.title") }),
      grid,
    ),
  );
}