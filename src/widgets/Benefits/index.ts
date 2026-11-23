import { el } from "@shared/lib/dom";
import "./ui/Benefits.css";

type Benefit = {
  icon: string;
  title: string;
  text: string;
};

const BENEFITS: Benefit[] = [
  {
    icon: "🚚",
    title: "Быстрая доставка",
    text: "По всей стране за 1–3 дня. Бесплатно от 5 000 ₽.",
  },
  {
    icon: "🛡️",
    title: "Гарантия 2 года",
    text: "Официальная гарантия производителя на всю технику.",
  },
  {
    icon: "↩️",
    title: "Лёгкий возврат",
    text: "14 дней на возврат без лишних вопросов.",
  },
  {
    icon: "💳",
    title: "Оплата частями",
    text: "Рассрочка 0-0-6 без переплат и первого взноса.",
  },
];

export function Benefits(): HTMLElement {
  const grid = el(
    "div",
    { class: "benefits__grid" },
    ...BENEFITS.map((item) =>
      el(
        "article",
        { class: "benefit" },
        el("span", { class: "benefit__icon", text: item.icon }),
        el("h3", { class: "benefit__title", text: item.title }),
        el("p", { class: "benefit__text", text: item.text }),
      ),
    ),
  );

  return el(
    "section",
    { class: "benefits" },
    el(
      "div",
      { class: "benefits__inner container" },
      el("h2", { class: "benefits__title", text: "Почему выбирают нас" }),
      grid,
    ),
  );
}