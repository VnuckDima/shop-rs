import { el } from "@shared/lib/dom";
import "./ui/Footer.css";

const CATALOG = ["Смартфоны", "Ноутбуки", "Аудио", "Аксессуары"];
const BUYERS = ["Доставка", "Оплата", "Возврат", "Гарантия"];

function linkColumn(title: string, links: string[]): HTMLElement {
  return el(
    "div",
    { class: "footer__col" },
    el("h4", { class: "footer__title", text: title }),
    ...links.map((label) => el("a", { class: "footer__link", href: "#", text: label })),
  );
}

export function Footer(): HTMLElement {
  const brandCol = el(
    "div",
    { class: "footer__col footer__brand" },
    el(
      "a",
      { class: "footer__logo", href: "#" },
      el("span", { text: "◈" }),
      " Shop-RS",
    ),
    el("p", {
      class: "footer__text",
      text: "Современный магазин электроники. Доставка по всей стране.",
    }),
    el(
      "div",
      { class: "footer__socials" },
      el("a", { class: "footer__social", href: "#", "aria-label": "Telegram", text: "TG" }),
      el("a", { class: "footer__social", href: "#", "aria-label": "VK", text: "VK" }),
      el("a", { class: "footer__social", href: "#", "aria-label": "YouTube", text: "YT" }),
    ),
  );

  const contactsCol = el(
    "div",
    { class: "footer__col" },
    el("h4", { class: "footer__title", text: "Контакты" }),
    el("a", { class: "footer__link", href: "tel:+78000000000", text: "8 (800) 000-00-00" }),
    el("a", { class: "footer__link", href: "mailto:shop@example.com", text: "shop@example.com" }),
    el("p", { class: "footer__text", text: "Ежедневно 9:00–21:00" }),
  );

  const inner = el(
    "div",
    { class: "footer__inner container" },
    brandCol,
    linkColumn("Каталог", CATALOG),
    linkColumn("Покупателям", BUYERS),
    contactsCol,
  );

  const bottom = el(
    "div",
    { class: "footer__bottom container" },
    el("span", { text: "© 2026 Shop-RS. Все права защищены." }),
  );

  return el("footer", { class: "footer" }, inner, bottom);
}