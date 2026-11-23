import type { CartApi } from "@features/cart";
import { formatPrice } from "@shared/lib/product";
import { Button } from "@shared/ui/Button";
import "./ui/CartDrawer.css";

export type CartDrawerApi = {
  root: HTMLElement;
  open: () => void;
  close: () => void;
  toggle: () => void;
  isOpen: () => boolean;
};

export type CartDrawerOptions = {
  cart: CartApi;
  onCheckout?: () => void;
};

export function createCartDrawer({
  cart,
  onCheckout,
}: CartDrawerOptions): CartDrawerApi {
  const overlay = document.createElement("div");
  overlay.className = "drawer";
  overlay.hidden = true;

  overlay.innerHTML = `
    <div class="drawer__backdrop" data-close></div>
    <aside class="drawer__panel" role="dialog" aria-modal="true" aria-label="Корзина">
      <header class="drawer__header">
        <h2 class="drawer__title">Корзина</h2>
        <button type="button" class="drawer__close" data-close aria-label="Закрыть">✕</button>
      </header>
      <div class="drawer__body"></div>
      <footer class="drawer__footer"></footer>
    </aside>
  `;

  const $ = <T extends HTMLElement>(sel: string): T =>
    overlay.querySelector<T>(sel)!;

  const body = $(".drawer__body");
  const footer = $(".drawer__footer");

  let lastFocused: HTMLElement | null = null;

  const renderLines = () => {
    const lines = cart.lines();

    if (lines.length === 0) {
      body.innerHTML = `
        <div class="drawer__empty">
          <span class="drawer__empty-icon">🛒</span>
          <p>Корзина пуста</p>
          <span class="drawer__empty-hint">Добавьте товары из каталога</span>
        </div>
      `;
    } else {
      body.innerHTML = "";
      for (const line of lines) {
        const row = document.createElement("div");
        row.className = "cart-line";
        row.innerHTML = `
          <img class="cart-line__img" src="${line.product.imageUrl}" alt="" />
          <div class="cart-line__info">
            <h3 class="cart-line__title">${line.product.title}</h3>
            <span class="cart-line__price">${formatPrice(
              line.product.price,
            )}</span>
            <div class="cart-line__qty">
              <button type="button" class="cart-line__btn" data-dec aria-label="Уменьшить">−</button>
              <span class="cart-line__count">${line.qty}</span>
              <button type="button" class="cart-line__btn" data-inc aria-label="Увеличить">+</button>
            </div>
          </div>
          <div class="cart-line__side">
            <button type="button" class="cart-line__remove" data-remove aria-label="Удалить">✕</button>
            <span class="cart-line__sum">${formatPrice(
              line.product.price * line.qty,
            )}</span>
          </div>
        `;

        row
          .querySelector<HTMLButtonElement>("[data-dec]")
          ?.addEventListener("click", () => cart.dec(line.product.id));
        row
          .querySelector<HTMLButtonElement>("[data-inc]")
          ?.addEventListener("click", () => cart.inc(line.product.id));
        row
          .querySelector<HTMLButtonElement>("[data-remove]")
          ?.addEventListener("click", () => cart.remove(line.product.id));

        body.appendChild(row);
      }
    }

    renderFooter();
  };

  const renderFooter = () => {
    const empty = cart.lines().length === 0;
    footer.innerHTML = `
      <div class="drawer__summary">
        <span class="drawer__summary-label">Итого</span>
        <span class="drawer__summary-total">${formatPrice(cart.total())}</span>
      </div>
      <div class="drawer__checkout"></div>
    `;

    if (empty) return;

    footer.querySelector(".drawer__checkout")?.appendChild(
      Button({
        label: "Оформить заказ",
        onClick: () => onCheckout?.(),
      }),
    );
  };

  cart.subscribe(renderLines);
  renderLines();

  const open = () => {
    lastFocused = document.activeElement as HTMLElement | null;
    overlay.hidden = false;
    document.body.classList.add("drawer-open");
    $<HTMLButtonElement>(".drawer__close").focus();
  };

  const close = () => {
    overlay.hidden = true;
    document.body.classList.remove("drawer-open");
    lastFocused?.focus();
  };

  const isOpen = (): boolean => !overlay.hidden;

  overlay.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    if (target.closest("[data-close]")) close();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isOpen()) close();
  });

  return {
    root: overlay,
    open,
    close,
    toggle: () => (isOpen() ? close() : open()),
    isOpen,
  };
}