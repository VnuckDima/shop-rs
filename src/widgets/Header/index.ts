import "./ui/Header.css";

export type HeaderProps = {
  cartCount: number;
  onSearch?: (query: string) => void;
  onCartClick?: () => void;
};

export function Header({
  cartCount,
  onSearch,
  onCartClick,
}: HeaderProps): HTMLElement {
  const header = document.createElement("header");
  header.className = "header";

  header.innerHTML = `
    <div class="header__inner container">
      <a class="header__logo" href="#">
        <span class="header__logo-mark">◈</span> Shop-RS
      </a>

      <nav class="header__nav" aria-label="Основная навигация">
        <a class="header__link header__link--active" href="#">Каталог</a>
        <a class="header__link" href="#">Новинки</a>
        <a class="header__link" href="#">Скидки</a>
        <a class="header__link" href="#">Бренды</a>
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