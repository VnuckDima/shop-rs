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
  const header = document.createElement("header");
  header.className = "header";

  header.innerHTML = `
    <div class="header__inner container">
      <a class="header__logo" href="#">
        <span class="header__logo-mark">◈</span> Shop-RS
      </a>

      <nav class="header__nav" aria-label="Основная навигация">
        ${NAV_LINKS.map(
          (link, index) =>
            `<a class="header__link${
              index === 0 ? " header__link--active" : ""
            }" href="#" data-nav="${link.key}">${link.label}</a>`,
        ).join("")}
      </nav>

      <div class="header__actions">
        <div class="header__search">
          <span class="header__search-icon" aria-hidden="true">⌕</span>
          <input
            type="search"
            class="header__search-input"
            placeholder="Поиск товаров…"
            aria-label="Поиск товаров"
          />
        </div>
        <button type="button" class="header__cart" aria-label="Корзина">
          <span class="header__cart-icon" aria-hidden="true">🛒</span>
          <span class="header__badge" data-cart-count>${cartCount}</span>
        </button>
      </div>
    </div>
  `;

  const setActive = (key: NavKey) => {
    header
      .querySelectorAll<HTMLAnchorElement>(".header__link")
      .forEach((link) => {
        link.classList.toggle(
          "header__link--active",
          link.dataset.nav === key,
        );
      });
  };

  header.querySelectorAll<HTMLAnchorElement>("[data-nav]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const key = link.dataset.nav as NavKey;
      setActive(key);
      onNav?.(key);
    });
  });

  const input = header.querySelector<HTMLInputElement>(
    ".header__search-input",
  );
  input?.addEventListener("input", (e) => {
    onSearch?.((e.target as HTMLInputElement).value);
  });

  header
    .querySelector<HTMLButtonElement>(".header__cart")
    ?.addEventListener("click", () => onCartClick?.());

  return header;
}

export function updateCartCount(root: HTMLElement, count: number): void {
  const badge = root.querySelector<HTMLElement>("[data-cart-count]");
  if (badge) badge.textContent = String(count);
}