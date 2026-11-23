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
};

const BADGE_LABEL: Record<NonNullable<Product["badge"]>, string> = {
  hit: "Хит",
  new: "Новинка",
  sale: "Скидка",
};

export function createProductModal({
  onAddToCart,
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

  overlay
    .querySelector(".modal__actions")
    ?.appendChild(
      Button({ label: "Купить в 1 клик", variant: "ghost" }),
    );

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

  const close = () => {
    overlay.hidden = true;
    document.body.classList.remove("modal-open");
    lastFocused?.focus();
  };

  const open = (product: Product) => {
    lastFocused = document.activeElement as HTMLElement | null;

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

    addSlot.replaceChildren(
      Button({ label: "В корзину", onClick: () => onAddToCart?.(product) }),
    );

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