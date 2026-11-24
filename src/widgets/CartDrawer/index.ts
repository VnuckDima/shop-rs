import type { CartApi, CartLine } from "@features/cart";
import { formatPrice } from "@shared/lib/product";
import { t } from "@shared/lib/i18n";
import { Button } from "@shared/ui/Button";
import { el } from "@shared/lib/dom";
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
  const overlay = el("div", { class: "drawer", hidden: "" });
  const body = el("div", { class: "drawer__body" });
  const footer = el("footer", { class: "drawer__footer" });
  const closeButton = el("button", {
    type: "button",
    class: "drawer__close",
    "data-close": "",
    "aria-label": t("cart.close"),
    text: "✕",
  });

  const panel = el(
    "aside",
    {
      class: "drawer__panel",
      role: "dialog",
      "aria-modal": "true",
      "aria-label": t("cart.title"),
    },
    el(
      "header",
      { class: "drawer__header" },
      el("h2", { class: "drawer__title", text: t("cart.title") }),
      closeButton,
    ),
    body,
    footer,
  );

  overlay.append(el("div", { class: "drawer__backdrop", "data-close": "" }), panel);

  let lastFocused: HTMLElement | null = null;

  const renderEmpty = () => {
    body.appendChild(
      el(
        "div",
        { class: "drawer__empty" },
        el("span", { class: "drawer__empty-icon", text: "🛒" }),
        el("p", { text: t("cart.empty") }),
        el("span", {
          class: "drawer__empty-hint",
          text: t("cart.emptyHint"),
        }),
      ),
    );
  };

  const renderLine = (line: CartLine) => {
    const row = el(
      "div",
      { class: "cart-line" },
      el("img", { class: "cart-line__img", src: line.product.imageUrl, alt: "" }),
      el(
        "div",
        { class: "cart-line__info" },
        el("h3", { class: "cart-line__title", text: line.product.title }),
        el("span", { class: "cart-line__price", text: formatPrice(line.product.price) }),
        el(
          "div",
          { class: "cart-line__qty" },
          el("button", {
            type: "button",
            class: "cart-line__btn",
            "data-dec": "",
            "aria-label": t("cart.dec"),
            text: "−",
          }),
          el("span", { class: "cart-line__count", text: String(line.qty) }),
          el("button", {
            type: "button",
            class: "cart-line__btn",
            "data-inc": "",
            "aria-label": t("cart.inc"),
            text: "+",
          }),
        ),
      ),
      el(
        "div",
        { class: "cart-line__side" },
        el("button", {
          type: "button",
          class: "cart-line__remove",
          "data-remove": "",
          "aria-label": t("cart.remove"),
          text: "✕",
        }),
        el("span", {
          class: "cart-line__sum",
          text: formatPrice(line.product.price * line.qty),
        }),
      ),
    );

    row
      .querySelector<HTMLButtonElement>("[data-dec]")
      ?.addEventListener("click", () => cart.dec(line.product.id));
    row
      .querySelector<HTMLButtonElement>("[data-inc]")
      ?.addEventListener("click", () => cart.inc(line.product.id));
    row
      .querySelector<HTMLButtonElement>("[data-remove]")
      ?.addEventListener("click", () => cart.remove(line.product.id));

    return row;
  };

  const renderLines = () => {
    const lines = cart.lines();
    body.replaceChildren();

    if (lines.length === 0) {
      renderEmpty();
    } else {
      for (const line of lines) {
        body.appendChild(renderLine(line));
      }
    }

    renderFooter();
  };

  const renderFooter = () => {
    const empty = cart.lines().length === 0;
    const checkoutSlot = el("div", { class: "drawer__checkout" });

    footer.replaceChildren(
      el(
        "div",
        { class: "drawer__summary" },
        el("span", { class: "drawer__summary-label", text: t("cart.total") }),
        el("span", { class: "drawer__summary-total", text: formatPrice(cart.total()) }),
      ),
      checkoutSlot,
    );

    if (!empty) {
      checkoutSlot.appendChild(
        Button({ label: t("cart.checkout"), onClick: () => onCheckout?.() }),
      );
    }
  };

  cart.subscribe(renderLines);
  renderLines();

  const open = () => {
    lastFocused = document.activeElement as HTMLElement | null;
    overlay.hidden = false;
    document.body.classList.add("drawer-open");
    closeButton.focus();
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
    if (event.key === "Escape" && overlay.isConnected && isOpen()) close();
  });

  return {
    root: overlay,
    open,
    close,
    toggle: () => (isOpen() ? close() : open()),
    isOpen,
  };
}