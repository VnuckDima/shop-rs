import type { Product } from "@entities/Product";
import { Hero } from "@widgets/Hero";
import { CategoryNav, updateActiveCategory } from "@widgets/CategoryNav";
import { ProductList } from "@widgets/ProductList";
import { PromoBanner } from "@widgets/PromoBanner";
import { Benefits } from "@widgets/Benefits";
import { Footer } from "@widgets/Footer";
import { formatPrice } from "@shared/lib/product";
import "./ui/HomePage.css";

export type HomePageProps = {
  products: Product[];
  categories: readonly string[];
  total: number;
  onAddToCart: (product: Product) => void;
  onOpen: (product: Product) => void;
};

export type HomePageController = {
  root: HTMLElement;
  setQuery: (query: string) => void;
  setCategory: (category: string) => void;
  setCart: (total: number, count: number) => void;
};

export function HomePage({
  products,
  categories,
  total,
  onAddToCart,
  onOpen,
}: HomePageProps): HomePageController {
  const state = { query: "", category: categories[0] ?? "Все" };

  const page = document.createElement("div");
  page.className = "home";

  const hero = Hero({
    title: "Техника, которая вдохновляет",
    subtitle:
      "Смартфоны, ноутбуки и аксессуары ведущих брендов. Выгодные цены, быстрая доставка и гарантия.",
    ctaLabel: "Смотреть каталог",
    onCtaClick: () => {
      document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" });
    },
  });

  const catalog = document.createElement("section");
  catalog.id = "catalog";
  catalog.className = "home__catalog container";

  const heading = document.createElement("div");
  heading.className = "home__heading";
  heading.innerHTML = `
    <h2 class="home__heading-title">Каталог товаров</h2>
    <p class="home__heading-total">В корзине: <strong data-cart-total>${formatPrice(
      total,
    )}</strong> · <span data-cart-count-inline>0</span> шт.</p>
  `;

  const categoryNav = CategoryNav({
    categories,
    active: state.category,
    onSelect: (category) => {
      state.category = category;
      updateActiveCategory(categoryNav, category);
      renderProducts();
    },
  });

  const listHost = document.createElement("div");

  const renderProducts = () => {
    const query = state.query.trim().toLowerCase();
    const filtered = products.filter((product) => {
      const matchesCategory =
        state.category === "Все" || product.category === state.category;
      const matchesQuery =
        query === "" ||
        product.title.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query);
      return matchesCategory && matchesQuery;
    });

    listHost.replaceChildren(
      ProductList({ products: filtered, onAddToCart, onOpen }),
    );
  };

  catalog.append(heading, categoryNav, listHost);
  page.append(hero, catalog, PromoBanner({
    title: "Скидки до 40% на технику",
    subtitle:
      "Успейте купить смартфоны и ноутбуки по сниженным ценам. Количество товара ограничено.",
    ctaLabel: "Смотреть скидки",
    onCtaClick: () => {
      document
        .getElementById("catalog")
        ?.scrollIntoView({ behavior: "smooth" });
    },
  }), Benefits(), Footer());

  renderProducts();

  const setCart = (nextTotal: number, count: number) => {
    const totalEl = page.querySelector<HTMLElement>("[data-cart-total]");
    if (totalEl) totalEl.textContent = formatPrice(nextTotal);

    const countEl = page.querySelector<HTMLElement>("[data-cart-count-inline]");
    if (countEl) countEl.textContent = String(count);
  };

  return {
    root: page,
    setQuery(query) {
      state.query = query;
      renderProducts();
    },
    setCategory(category) {
      state.category = category;
      updateActiveCategory(categoryNav, category);
      renderProducts();
    },
    setCart,
  };
}