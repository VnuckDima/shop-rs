import { Button } from "@shared/ui/Button";
import { LanguageSwitcher } from "@shared/ui/LanguageSwitcher";
import { ThemeToggle } from "@shared/ui/ThemeToggle";
import { getLocale, t } from "@shared/lib/i18n";
import { el } from "@shared/lib/dom";
import "./ui/AboutPage.css";

export type TeamMember = {
  name: string;
  github: string;
  role: string;
  roleEn?: string;
};

export type AboutPageProps = {
  team: TeamMember[];
  onStart?: () => void;
};

const FEATURES = [
  "about.features.1",
  "about.features.2",
  "about.features.3",
  "about.features.4",
];

export function AboutPage({ team, onStart }: AboutPageProps): HTMLElement {
  const page = el("div", { class: "about" });

  const featuresList = el(
    "ul",
    { class: "about__features" },
    ...FEATURES.map((feature) =>
      el("li", { class: "about__feature", text: t(feature) }),
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
          el("p", {
            class: "about__member-role",
            text:
              getLocale() === "en" && member.roleEn
                ? member.roleEn
                : member.role,
          }),
        ),
      );
    }),
  );

  const startButton = Button({
    label: t("about.start"),
    onClick: () => onStart?.(),
  });

  const card = el(
    "div",
    { class: "about__card" },
    el("span", { class: "about__logo", text: "◈" }),
    el("h1", { class: "about__title", text: "Shop-RS" }),
    el("p", {
      class: "about__subtitle",
      text: t("about.subtitle"),
    }),
    el("h2", { class: "about__section-title", text: t("about.featuresTitle") }),
    featuresList,
    el("h2", { class: "about__section-title", text: t("about.teamTitle") }),
    teamList,
    el("div", { class: "about__actions" }, startButton),
  );

  page.appendChild(
    el(
      "div",
      { class: "about__toolbar" },
      LanguageSwitcher(),
      ThemeToggle(),
    ),
  );
  page.appendChild(card);

  return page;
}