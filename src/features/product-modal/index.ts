import type { CartApi } from "@features/cart";
import type { Product } from "@shared/lib/product";
import { formatPrice } from "@shared/lib/product";
import { Button } from "@shared/ui/Button";
import "./ui/ProductModal.css";

export type ProductModalApi = {
  root: HTMLElement;
  open: (product: Product) => void;
  close: () => void;
};

export type ProductModalOptions = {
  onAddToCart?: (product: Product) => void;
  cart?: CartApi;
};

const BADGE_LABEL: Record<NonNullable<Product["badge"]>, string> = {
  hit: "Хит",
  new: "Новинка",
  sale: "Скидка",
};

export function createProductModal({
  onAddToCart,
  cart,
}: ProductModalOptions = {}): ProductModalApi {
  const overlay = document.createElement("div");
  overlay.className = "modal";
  overlay.hidden = true;

  overlay.innerHTML = `
    <div class="modal__backdrop" data-close></div>
    <div class="modal__dialog" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <button type="button" class="modal__close" data-close aria-label="Закрыть">✕</button>
      <div class="modal__media">
        <img class="modal__image" alt="" />
        <span class="modal__badge" hidden></span>
      </div>
      <div class="modal__content">
        <span class="modal__category"></span>
        <h2 class="modal__title" id="modal-title"></h2>
        <div class="modal__rating"></div>
        <p class="modal__description"></p>
        <h3 class="modal__specs-title">Характеристики</h3>
        <ul class="modal__specs"></ul>
        <div class="modal__prices"></div>
        <div class="modal__actions">
          <div class="modal__add"></div>
        </div>
      </div>
    </div>
  `;

  const $ = <T extends HTMLElement>(sel: string): T =>
    overlay.querySelector<T>(sel)!;

  const image = $<HTMLImageElement>(".modal__image");
  const badge = $(".modal__badge");
  const category = $(".modal__category");
  const title = $(".modal__title");
  const rating = $(".modal__rating");
  const description = $(".modal__description");
  const specs = $<HTMLUListElement>(".modal__specs");
  const prices = $(".modal__prices");
  const addSlot = $(".modal__add");

  let lastFocused: HTMLElement | null = null;
  let currentProduct: Product | null = null;

  const currentQty = (): number => {
    if (!cart || !currentProduct) return 0;
    return (
      cart.lines().find((line) => line.product.id === currentProduct!.id)?.qty ??
      0
    );
  };

  const renderAddControls = () => {
    addSlot.replaceChildren();
    const qty = currentQty();

    if (qty <= 0 || !cart || !currentProduct) {
      addSlot.appendChild(
        Button({
          label: "В корзину",
          onClick: () => {
            if (currentProduct) onAddToCart?.(currentProduct);
          },
        }),
      );
      return;
    }

    const productId = currentProduct.id;

    const group = document.createElement("div");
    group.className = "modal__qty";

    const minus = document.createElement("button");
    minus.type = "button";
    minus.className = "modal__qty-btn";
    minus.setAttribute("aria-label", "Уменьшить количество");
    minus.textContent = "−";
    minus.addEventListener("click", () => cart?.dec(productId));

    const count = document.createElement("span");
    count.className = "modal__qty-count";
    count.textContent = String(qty);

    const plus = document.createElement("button");
    plus.type = "button";
    plus.className = "modal__qty-btn";
    plus.setAttribute("aria-label", "Увеличить количество");
    plus.textContent = "+";
    plus.addEventListener("click", () => cart?.inc(productId));

    group.append(minus, count, plus);

    const remove = Button({
      label: "Удалить",
      variant: "ghost",
      onClick: () => cart?.remove(productId),
    });

    addSlot.append(group, remove);
  };

  if (cart) cart.subscribe(renderAddControls);

  const close = () => {
    overlay.hidden = true;
    document.body.classList.remove("modal-open");
    currentProduct = null;
    lastFocused?.focus();
  };

  overlay
    .querySelector(".modal__actions")
    ?.appendChild(
      Button({
        label: "Купить в 1 клик",
        variant: "ghost",
        onClick: () => {
          if (currentProduct) onAddToCart?.(currentProduct);
          close();
        },
      }),
    );

  const open = (product: Product) => {
    lastFocused = document.activeElement as HTMLElement | null;
    currentProduct = product;

    image.src = product.imageUrl;
    image.alt = product.title;
    category.textContent = product.category;
    title.textContent = product.title;
    rating.innerHTML = `<span class="modal__star">★</span> ${product.rating.toFixed(
      1,
    )} <span class="modal__muted">· рейтинг покупателей</span>`;
    description.textContent =
      product.description ?? "Подробное описание скоро появится.";

    badge.hidden = !product.badge;
    if (product.badge) {
      badge.textContent = BADGE_LABEL[product.badge];
      badge.className = `modal__badge modal__badge--${product.badge}`;
    }

    specs.replaceChildren(
      ...(product.specs ?? []).map((spec) => {
        const li = document.createElement("li");
        li.className = "modal__spec";
        li.innerHTML = `<span class="modal__spec-label">${spec.label}</span><span class="modal__spec-value">${spec.value}</span>`;
        return li;
      }),
    );

    const discount = product.oldPrice
      ? Math.round((1 - product.price / product.oldPrice) * 100)
      : 0;

    prices.innerHTML = `
      <span class="modal__price">${formatPrice(product.price)}</span>
      ${
        product.oldPrice
          ? `<span class="modal__oldprice">${formatPrice(product.oldPrice)}</span>`
          : ""
      }
      ${discount ? `<span class="modal__discount">−${discount}%</span>` : ""}
    `;

    renderAddControls();

    overlay.hidden = false;
    document.body.classList.add("modal-open");
    $<HTMLButtonElement>(".modal__close").focus();
  };

  overlay.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    if (target.closest("[data-close]")) close();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !overlay.hidden) close();
  });

  return { root: overlay, open, close };
}