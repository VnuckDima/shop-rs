import "./ui/Header.css";

export type HeaderProps = {
  cartCount: number;
};

export function Header({ cartCount }: HeaderProps): HTMLElement {
  const header = document.createElement("header");
  header.className = "header";

  header.innerHTML = `
    <div class="header__inner">
      <a class="header__logo" href="#">Shop-RS</a>
      <button type="button" class="header__cart">
        Корзина <span class="header__badge" data-cart-count>${cartCount}</span>
      </button>
    </div>
  `;

  return header;
}

export function updateCartCount(root: HTMLElement, count: number): void {
  const badge = root.querySelector<HTMLElement>("[data-cart-count]");
  if (badge) badge.textContent = String(count);
}