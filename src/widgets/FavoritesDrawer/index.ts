
import type { FavoritesApi } from "@features/favorites";
import type { Product } from "@entities/Product";
import { formatPrice, productTitle } from "@shared/lib/product";
import { Button } from "@shared/ui/Button";
import { el } from "@shared/lib/dom";
import "./ui/FavoritesDrawer.css";

export type FavoritesDrawerApi = {
  root: HTMLElement;
  open: () => void;
  close: () => void;
  toggle: () => void;
  isOpen: () => boolean;
};

export type FavoritesDrawerOptions = {
  favorites: FavoritesApi;
  onOpen?: (product: Product) => void;
};

export function createFavoritesDrawer({
  favorites,
  onOpen,
}: FavoritesDrawerOptions): FavoritesDrawerApi {
  const overlay = el("div", {
    class: "favorites-drawer",
    hidden: "",
  });

  const body = el("div", {
    class: "favorites-drawer__body",
  });

  const closeButton = el("button", {
    type: "button",
    class: "favorites-drawer__close",
    "data-close": "",
    "aria-label": "Закрыть",
    text: "✕",
  });

  const panel = el(
    "aside",
    {
      class: "favorites-drawer__panel",
      role: "dialog",
      "aria-modal": "true",
      "aria-label": "Избранное",
    },
    el(
      "header",
      { class: "favorites-drawer__header" },
      el("h2", {
        class: "favorites-drawer__title",
        text: "Избранное",
      }),
      closeButton,
    ),
    body,
  );

  overlay.append(
    el("div", {
      class: "favorites-drawer__backdrop",
      "data-close": "",
    }),
    panel,
  );

  let lastFocused: HTMLElement | null = null;

  const renderEmpty = () => {
    body.appendChild(
      el(
        "div",
        { class: "favorites-drawer__empty" },
        el("span", {
          class: "favorites-drawer__empty-icon",
          text: "♡",
        }),
        el("p", {
          text: "В избранном пока пусто",
        }),
        el("span", {
          class: "favorites-drawer__empty-hint",
          text: "Добавляйте понравившиеся товары, чтобы не потерять их",
        }),
      ),
    );
  };

  const renderProduct = (product: Product) => {
    const row = el(
      "article",
      { class: "favorite-line" },
      el("img", {
        class: "favorite-line__img",
        src: product.imageUrl,
        alt: productTitle(product),
      }),
      el(
        "div",
        { class: "favorite-line__info" },
        el("h3", {
          class: "favorite-line__title",
          text: productTitle(product),
          "data-open": "",
        }),
        el("span", {
          class: "favorite-line__price",
          text: formatPrice(product.price),
        }),
        Button({
          label: "Подробнее",
          variant: "ghost",
          onClick: () => onOpen?.(product),
        }),
      ),
      el("button", {
        type: "button",
        class: "favorite-line__remove",
        "aria-label": "Удалить из избранного",
        text: "♥",
      }),
    );

    row
      .querySelector<HTMLButtonElement>(".favorite-line__remove")
      ?.addEventListener("click", () => {
        favorites.remove(product.id);
      });

    row
      .querySelector<HTMLElement>("[data-open]")
      ?.addEventListener("click", () => onOpen?.(product));

    return row;
  };

  const render = () => {
    const products = favorites.items();

    body.replaceChildren();

    if (products.length === 0) {
      renderEmpty();
      return;
    }

    products.forEach((product) => {
      body.appendChild(renderProduct(product));
    });
  };

  favorites.subscribe(render);
  render();

  const open = () => {
    lastFocused = document.activeElement as HTMLElement | null;
    overlay.hidden = false;
    document.body.classList.add("favorites-drawer-open");
    closeButton.focus();
  };

  const close = () => {
    overlay.hidden = true;
    document.body.classList.remove("favorites-drawer-open");
    lastFocused?.focus();
  };

  const isOpen = (): boolean => !overlay.hidden;

  overlay.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    if (target.closest("[data-close]")) close();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && overlay.isConnected && isOpen()) {
      close();
    }
  });

  return {
    root: overlay,
    open,
    close,
    toggle: () => (isOpen() ? close() : open()),
    isOpen,
  };
}
