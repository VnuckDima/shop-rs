import { Button } from "@shared/ui/Button";
import { el } from "@shared/lib/dom";
import { t } from "@shared/lib/i18n";
import "./ui/PromoBanner.css";

export type PromoBannerProps = {
  title: string;
  subtitle: string;
  ctaLabel?: string;
  onCtaClick?: () => void;
};

export function PromoBanner({
  title,
  subtitle,
  ctaLabel = t("home.promo.cta"),
  onCtaClick,
}: PromoBannerProps): HTMLElement {
  const cta = el("div", { class: "promo__cta" });
  cta.appendChild(
    Button({ label: ctaLabel, onClick: onCtaClick }),
  );

  const content = el(
    "div",
    { class: "promo__content" },
    el("h2", { class: "promo__title", text: title }),
    el("p", { class: "promo__subtitle", text: subtitle }),
    cta,
  );

  const aside = el(
    "div",
    { class: "promo__aside", "aria-hidden": "true" },
    el("span", { class: "promo__big", text: "%" }),
  );

  return el(
    "section",
    { class: "promo" },
    el("div", { class: "promo__inner container" }, content, aside),
  );
}