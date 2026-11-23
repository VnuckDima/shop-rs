import { el } from "@shared/lib/dom";
import "./ui/Header.css";

export type NavKey = "catalog" | "new" | "sale" | "brands";

export type HeaderProps = {
  cartCount: number;
  onSearch?: (query: string) => void;
  onCartClick?: () => void;
  onNav?: (key: NavKey) => void;
};

const NAV_LINKS: { key: NavKey; label: string }[] = [
  { key: "catalog", label: "Каталог" },
  { key: "new", label: "Новинки" },
  { key: "sale", label: "Скидки" },
  { key: "brands", label: "Бренды" },
];

export function Header({
  cartCount,
  onSearch,
  onCartClick,
  onNav,
}: HeaderProps): HTMLElement {
  const header = el("header", { class: "header" });

  const setActive = (key: NavKey) => {
    header
      .querySelectorAll<HTMLAnchorElement>(".header__link")
      .forEach((link) => {
        link.classList.toggle("header__link--active", link.dataset.nav === key);
      });
  };

  const navLinks = NAV_LINKS.map((link, index) =>
    el(
      "a",
      {
        class: `header__link${index === 0 ? " header__link--active" : ""}`,
        href: "#",
      },
      link.label,
    ),
  );

  navLinks.forEach((link, index) => {
    const key = NAV_LINKS[index].key;
    link.dataset.nav = key;
    link.addEventListener("click", (event) => {
      event.preventDefault();
      setActive(key);
      onNav?.(key);
    });
  });

  const searchInput = el("input", {
    type: "search",
    class: "header__search-input",
    placeholder: "Поиск товаров…",
    "aria-label": "Поиск товаров",
  });
  searchInput.addEventListener("input", () => {
    onSearch?.(searchInput.value);
  });

  const cartButton = el(
    "button",
    { type: "button", class: "header__cart", "aria-label": "Корзина" },
    el("span", { class: "header__cart-icon", "aria-hidden": "true", text: "🛒" }),
    el("span", { class: "header__badge", "data-cart-count": "", text: String(cartCount) }),
  );
  cartButton.addEventListener("click", () => onCartClick?.());

  const inner = el(
    "div",
    { class: "header__inner container" },
    el(
      "a",
      { class: "header__logo", href: "#" },
      el("span", { class: "header__logo-mark", text: "◈" }),
      " Shop-RS",
    ),
    el(
      "nav",
      { class: "header__nav", "aria-label": "Основная навигация" },
      ...navLinks,
    ),
    el(
      "div",
      { class: "header__actions" },
      el(
        "div",
        { class: "header__search" },
        el("span", { class: "header__search-icon", "aria-hidden": "true", text: "⌕" }),
        searchInput,
      ),
      cartButton,
    ),
  );

  header.appendChild(inner);

  return header;
}

export function updateCartCount(root: HTMLElement, count: number): void {
  const badge = root.querySelector<HTMLElement>("[data-cart-count]");
  if (badge) badge.textContent = String(count);
}