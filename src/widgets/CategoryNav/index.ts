import { categoryLabel, t } from "@shared/lib/i18n";
import "./ui/CategoryNav.css";

export type CategoryNavProps = {
  categories: readonly string[];
  active: string;
  onSelect: (category: string) => void;
};

export function CategoryNav({
  categories,
  active,
  onSelect,
}: CategoryNavProps): HTMLElement {
  const nav = document.createElement("nav");
  nav.className = "category-nav";
  nav.setAttribute("aria-label", t("category.aria"));

  for (const category of categories) {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "category-nav__chip";
    chip.dataset.category = category;
    if (category === active) chip.classList.add("is-active");
    chip.textContent = categoryLabel(category);
    chip.addEventListener("click", () => onSelect(category));
    nav.appendChild(chip);
  }

  return nav;
}

export function updateActiveCategory(
  root: HTMLElement,
  active: string,
): void {
  root
    .querySelectorAll<HTMLButtonElement>(".category-nav__chip")
    .forEach((chip) => {
      chip.classList.toggle("is-active", chip.dataset.category === active);
    });
}