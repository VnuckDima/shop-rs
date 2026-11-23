import { Button } from "@shared/ui/Button";
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
  ctaLabel = "Выбрать товар",
  onCtaClick,
}: PromoBannerProps): HTMLElement {
  const banner = document.createElement("section");
  banner.className = "promo";

  banner.innerHTML = `
    <div class="promo__inner container">
      <div class="promo__content">
        <h2 class="promo__title">${title}</h2>
        <p class="promo__subtitle">${subtitle}</p>
        <div class="promo__cta"></div>
      </div>
      <div class="promo__aside" aria-hidden="true">
        <span class="promo__big">%</span>
      </div>
    </div>
  `;

  banner.querySelector(".promo__cta")?.appendChild(
    Button({ label: ctaLabel, onClick: onCtaClick }),
  );

  return banner;
}