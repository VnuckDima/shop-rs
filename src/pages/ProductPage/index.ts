
import { BADGE_LABEL_KEY } from "@shared/constants/product";
import type { CartApi } from "@features/cart";
import type { FavoritesApi } from "@features/favorites";
import {
  calcDiscount,
  formatPrice,
  productDescription,
  productTitle,
  specLabel,
  specValue,
  type Product,
} from "@shared/lib/product";
import { categoryLabel, t } from "@shared/lib/i18n";
import { Button } from "@shared/ui/Button";
import { el } from "@shared/lib/dom";
import "./ui/ProductPage.css";

export type ProductPageProps = {
  product: Product;
  cart: CartApi;
  favorites: FavoritesApi;
  onBack?: () => void;
};

export function ProductPage({
  product,
  cart,
  favorites,
  onBack,
}: ProductPageProps): HTMLElement {
  // Кнопка назад
  const back = el(
    "button",
    { type: "button", class: "product-page__back" },
    t("product.page.back"),
  );

  back.addEventListener("click", () => onBack?.());

  // Управление корзиной
  const controls = el("div", {
    class: "product-page__controls",
  });

  const renderControls = () => {
    const qty =
      cart.lines().find(
        (line) => line.product.id === product.id,
      )?.qty ?? 0;

    controls.replaceChildren();

    if (qty <= 0) {
      controls.appendChild(
        Button({
          label: t("product.page.add"),
          onClick: () => cart.add(product),
        }),
      );
      return;
    }

    // Количество товара
    const group = el(
      "div",
      { class: "product-page__qty" },

      el("button", {
        type: "button",
        class: "product-page__qty-btn",
        "aria-label": t("product.page.dec"),
        text: "−",
      }),

      el("span", {
        class: "product-page__qty-count",
        text: String(qty),
      }),

      el("button", {
        type: "button",
        class: "product-page__qty-btn",
        "aria-label": t("product.page.inc"),
        text: "+",
      }),
    );

    const [minus, plus] =
      group.querySelectorAll<HTMLButtonElement>(
        ".product-page__qty-btn",
      );

    minus?.addEventListener("click", () =>
      cart.dec(product.id),
    );

    plus?.addEventListener("click", () =>
      cart.inc(product.id),
    );

    // Подтверждение добавления
    const status = el("div", {
      class: "product-page__cart-status",
       text: "✓ Товар добавлен в корзину",
    });

    // Кнопки управления
    controls.append(
      status,
      group,

      Button({
        label: t("product.page.remove"),
        variant: "ghost",
        onClick: () => cart.remove(product.id),
      }),

      Button({
        label: t("product.page.buyNow"),
        variant: "ghost",
        onClick: () => {
          cart.add(product);
          onBack?.();
        },
      }),
    );
  };

  const unsubscribeCart = cart.subscribe(() => {
    renderControls();

    if (!controls.isConnected) {
      unsubscribeCart();
    }
  });

  renderControls();

  // Цена
  const discount = calcDiscount(product);

  const prices = el(
    "div",
    { class: "product-page__prices" },

    el("span", {
      class: "product-page__price",
      text: formatPrice(product.price),
    }),

    product.oldPrice
      ? el("span", {
          class: "product-page__oldprice",
          text: formatPrice(product.oldPrice),
        })
      : "",

    discount
      ? el("span", {
          class: "product-page__discount",
          text: `−${discount}%`,
        })
      : "",
  );

  // Характеристики
  const specs = el(
    "ul",
    { class: "product-page__specs" },

    ...(product.specs ?? []).map((spec) =>
      el(
        "li",
        { class: "product-page__spec" },

        el("span", {
          class: "product-page__spec-label",
          text: specLabel(spec),
        }),

        el("span", {
          class: "product-page__spec-value",
          text: specValue(spec),
        }),
      ),
    ),
  );

  // Избранное
  const favoriteButton = el("button", {
    type: "button",
    class: "product-page__favorite",
    "aria-label": "Добавить в избранное",
    "aria-pressed": "false",
    text: "♡",
  });

  const updateFavoriteButton = () => {
    const active = favorites.has(product.id);

    favoriteButton.textContent = active ? "♥" : "♡";

    favoriteButton.classList.toggle(
      "product-page__favorite--active",
      active,
    );

    favoriteButton.setAttribute(
      "aria-pressed",
      String(active),
    );

    favoriteButton.setAttribute(
      "aria-label",
      active
        ? "Убрать из избранного"
        : "Добавить в избранное",
    );
  };

  updateFavoriteButton();

  favoriteButton.addEventListener("click", () => {
    favorites.toggle(product);
    updateFavoriteButton();
  });

  favorites.subscribe(updateFavoriteButton);

  // Информация о товаре
  const info = el(
    "div",
    { class: "product-page__info" },

    el("span", {
      class: "product-page__category",
      text: categoryLabel(product.category),
    }),

    el("h1", {
      class: "product-page__title",
      text: productTitle(product),
    }),

    el(
      "div",
      { class: "product-page__rating" },

      el("span", {
        class: "product-page__star",
        text: "★",
      }),

      ` ${product.rating.toFixed(1)} `,

      el("span", {
        class: "product-page__muted",
        text: t("product.page.rating"),
      }),
    ),

    el("p", {
      class: "product-page__description",
      text:
        productDescription(product) ??
        t("product.page.descriptionFallback"),
    }),

    prices,

    el("h3", {
      class: "product-page__specs-title",
      text: t("product.page.specs"),
    }),

    specs,

    controls,
  );

  // Изображение товара
  const media = el(
    "div",
    { class: "product-page__media" },

    favoriteButton,

    el("img", {
      class: "product-page__image",
      src: product.imageUrl,
      alt: productTitle(product),
    }),

    product.badge
      ? el("span", {
          class: `product-page__badge product-page__badge--${product.badge}`,
          text: t(BADGE_LABEL_KEY[product.badge]),
        })
      : "",
  );

  // Страница товара
  return el(
    "main",
    { class: "product-page" },

    el(
      "div",
      { class: "product-page__inner container" },

      back,

      el(
        "div",
        { class: "product-page__layout" },
        media,
        info,
      ),
    ),
  );
}
