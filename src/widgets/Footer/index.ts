import { FOOTER_BUYERS, FOOTER_CATALOG } from "@shared/constants/catalog";
import { el } from "@shared/lib/dom";
import { categoryLabel, t } from "@shared/lib/i18n";
import "./ui/Footer.css";

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
      text: t("footer.description"),
    }),
    el(
      "div",
      { class: "footer__socials" },
      el("a", {
        class: "footer__social",
        href: "https://t.me/rsschool",
        target: "_blank",
        rel: "noopener noreferrer",
        "aria-label": "Telegram RS School",
        text: "TG",
      }),
      el("a", {
        class: "footer__social",
        href: "https://vk.com/rsschool",
        target: "_blank",
        rel: "noopener noreferrer",
        "aria-label": "VK RS School",
        text: "VK",
      }),
      el("a", {
        class: "footer__social",
        href: "https://www.youtube.com/@RSSchool",
        target: "_blank",
        rel: "noopener noreferrer",
        "aria-label": "YouTube RS School",
        text: "YT",
      }),
    ),
  );

  const contactsCol = el(
    "div",
    { class: "footer__col" },
    el("h4", { class: "footer__title", text: t("footer.contacts") }),
    el("a", { class: "footer__link", href: "tel:+78000000000", text: "8 (800) 000-00-00" }),
    el("a", { class: "footer__link", href: "mailto:shop@example.com", text: "shop@example.com" }),
    el("p", { class: "footer__text", text: t("footer.hours") }),
  );

  const inner = el(
    "div",
    { class: "footer__inner container" },
    brandCol,
    linkColumn(t("footer.catalog"), FOOTER_CATALOG.map(categoryLabel)),
    linkColumn(t("footer.buyers"), FOOTER_BUYERS.map((key) => t(key))),
    contactsCol,
  );

  const bottom = el(
    "div",
    { class: "footer__bottom container" },
    el("span", { text: t("footer.copyright") }),
  );

  return el("footer", { class: "footer" }, inner, bottom);
}