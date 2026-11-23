import { Button } from "@shared/ui/Button";
import "./ui/Hero.css";

export type HeroSlide = {
  eyebrow?: string;
  title: string;
  subtitle: string;
  ctaLabel?: string;
  onCtaClick?: () => void;
  image: string;
  alt?: string;
};

export type HeroProps = {
  slides: HeroSlide[];
  interval?: number;
};

export function Hero({ slides, interval = 6000 }: HeroProps): HTMLElement {
  const section = document.createElement("section");
  section.className = "hero";

  const inner = document.createElement("div");
  inner.className = "hero__inner container";

  const slidesEl = document.createElement("div");
  slidesEl.className = "hero__slides";

  const controls = document.createElement("div");
  controls.className = "hero__controls";

  const dotsEl = document.createElement("div");
  dotsEl.className = "hero__dots";

  const slideEls: HTMLElement[] = [];
  const dotEls: HTMLButtonElement[] = [];

  slides.forEach((slide, index) => {
    const el = document.createElement("article");
    el.className = `hero__slide${index === 0 ? " is-active" : ""}`;
    el.innerHTML = `
      <div class="hero__content">
        ${slide.eyebrow ? `<span class="hero__eyebrow">${slide.eyebrow}</span>` : ""}
        <h1 class="hero__title">${slide.title}</h1>
        <p class="hero__subtitle">${slide.subtitle}</p>
        <div class="hero__cta"></div>
      </div>
      <div class="hero__media">
        <img src="${slide.image}" alt="${slide.alt ?? ""}" />
        <div class="hero__glow"></div>
      </div>
    `;

    if (slide.ctaLabel) {
      el.querySelector(".hero__cta")?.appendChild(
        Button({ label: slide.ctaLabel, onClick: slide.onCtaClick }),
      );
    }

    slideEls.push(el);
    slidesEl.appendChild(el);

    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = `hero__dot${index === 0 ? " is-active" : ""}`;
    dot.setAttribute("aria-label", `Слайд ${index + 1}`);
    dot.addEventListener("click", () => goTo(index));
    dotEls.push(dot);
    dotsEl.appendChild(dot);
  });

  const prev = document.createElement("button");
  prev.type = "button";
  prev.className = "hero__arrow";
  prev.setAttribute("aria-label", "Предыдущий слайд");
  prev.textContent = "‹";

  const next = document.createElement("button");
  next.type = "button";
  next.className = "hero__arrow";
  next.setAttribute("aria-label", "Следующий слайд");
  next.textContent = "›";

  let current = 0;
  let timer: number | undefined;

  const update = () => {
    slideEls.forEach((el, i) => el.classList.toggle("is-active", i === current));
    dotEls.forEach((dot, i) => dot.classList.toggle("is-active", i === current));
  };

  const goTo = (index: number) => {
    current = (index + slides.length) % slides.length;
    update();
  };

  const start = () => {
    stop();
    if (slides.length > 1) {
      timer = window.setInterval(() => goTo(current + 1), interval);
    }
  };

  const stop = () => {
    if (timer !== undefined) {
      window.clearInterval(timer);
      timer = undefined;
    }
  };

  prev.addEventListener("click", () => {
    goTo(current - 1);
    start();
  });
  next.addEventListener("click", () => {
    goTo(current + 1);
    start();
  });

  controls.append(prev, dotsEl, next);

  section.addEventListener("mouseenter", stop);
  section.addEventListener("mouseleave", start);

  inner.append(slidesEl, controls);
  section.appendChild(inner);

  update();
  start();

  return section;
}