import { Button } from "@shared/ui/Button";
import "./ui/Hero.css";

export type HeroProps = {
  title: string;
  subtitle: string;
  ctaLabel?: string;
  onCtaClick?: () => void;
};

export function Hero({
  title,
  subtitle,
  ctaLabel = "В каталог",
  onCtaClick,
}: HeroProps): HTMLElement {
  const hero = document.createElement("section");
  hero.className = "hero";

  hero.innerHTML = `
    <div class="hero__inner container">
      <div class="hero__content">
        <span class="hero__eyebrow">Новая коллекция 2026</span>
        <h1 class="hero__title">${title}</h1>
        <p class="hero__subtitle">${subtitle}</p>
        <div class="hero__cta"></div>
      </div>
      <div class="hero__media">
        <img src="/img/hero.jpg" alt="" />
        <div class="hero__glow"></div>
      </div>
    </div>
  `;

  hero.querySelector(".hero__cta")?.appendChild(
    Button({ label: ctaLabel, onClick: onCtaClick }),
  );

  return hero;
}