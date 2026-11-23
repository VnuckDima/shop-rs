import { Button } from "@shared/ui/Button";
import { ThemeToggle } from "@shared/ui/ThemeToggle";
import { el } from "@shared/lib/dom";
import "./ui/AboutPage.css";

export type TeamMember = {
  name: string;
  github: string;
  role: string;
};

export type AboutPageProps = {
  team: TeamMember[];
  onStart?: () => void;
};

const FEATURES = [
  "Каталог товаров с поиском и фильтрами по категориям",
  "Карточка товара с характеристиками",
  "Корзина с изменением количества и удалением",
  "Автоматический пересчёт суммы и количества",
];

export function AboutPage({ team, onStart }: AboutPageProps): HTMLElement {
  const page = el("div", { class: "about" });

  const featuresList = el(
    "ul",
    { class: "about__features" },
    ...FEATURES.map((feature) =>
      el("li", { class: "about__feature", text: feature }),
    ),
  );

  const teamList = el(
    "div",
    { class: "about__team" },
    ...team.map((member) => {
      const raw = member.github.trim();
      const username = raw
        .replace(/^@/, "")
        .replace(/^https?:\/\/github\.com\//i, "")
        .replace(/\/+$/, "");
      const href = /^https?:\/\//i.test(raw)
        ? raw
        : `https://github.com/${username}`;

      return el(
        "a",
        {
          class: "about__member",
          href,
          target: "_blank",
          rel: "noopener noreferrer",
        },
        el("span", { class: "about__avatar", text: member.name.charAt(0) }),
        el(
          "div",
          { class: "about__member-info" },
          el("h3", { class: "about__member-name", text: member.name }),
          el("span", {
            class: "about__member-github",
            text: `@${username}`,
          }),
          el("p", { class: "about__member-role", text: member.role }),
        ),
      );
    }),
  );

  const startButton = Button({
    label: "Перейти в магазин",
    onClick: () => onStart?.(),
  });

  const card = el(
    "div",
    { class: "about__card" },
    el("span", { class: "about__logo", text: "◈" }),
    el("h1", { class: "about__title", text: "Shop-RS" }),
    el("p", {
      class: "about__subtitle",
      text: "Учебный интернет-магазин электроники. Командный проект: каталог, карточки товаров и корзина.",
    }),
    el("h2", { class: "about__section-title", text: "Что умеет приложение" }),
    featuresList,
    el("h2", { class: "about__section-title", text: "Команда" }),
    teamList,
    el("div", { class: "about__actions" }, startButton),
  );

  page.appendChild(el("div", { class: "about__toolbar" }, ThemeToggle()));
  page.appendChild(card);

  return page;
}