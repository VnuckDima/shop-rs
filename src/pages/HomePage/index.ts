import type { Product } from "@entities/Product";
import { Hero } from "@widgets/Hero";
import { CategoryNav, updateActiveCategory } from "@widgets/CategoryNav";
import { ProductList } from "@widgets/ProductList";
import { PromoBanner } from "@widgets/PromoBanner";
import { Brands } from "@widgets/Brands";
import { Benefits } from "@widgets/Benefits";
import { Footer } from "@widgets/Footer";
import { formatPrice } from "@shared/lib/product";
import { filterProducts } from "@shared/lib/catalog";
import { el } from "@shared/lib/dom";
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
  setTag: (tag: "new" | "sale" | null) => void;
  setCart: (total: number, count: number) => void;
};

export function HomePage({
  products,
  categories,
  total,
  onAddToCart,
  onOpen,
}: HomePageProps): HomePageController {
  const state = {
    query: "",
    category: categories[0] ?? "Все",
    tag: null as "new" | "sale" | null,
  };

  const page = document.createElement("div");
  page.className = "home";

  const scrollToCatalog = () => {
    document
      .getElementById("catalog")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const hero = Hero({
    slides: [
      {
        eyebrow: "Новая коллекция 2026",
        title: "Техника, которая вдохновляет",
        subtitle:
          "Смартфоны, ноутбуки и аксессуары ведущих брендов. Выгодные цены, быстрая доставка и гарантия.",
        ctaLabel: "Смотреть каталог",
        onCtaClick: scrollToCatalog,
        image: "/img/hero.jpg",
        alt: "Техника и электроника",
      },
      {
        eyebrow: "Смартфоны",
        title: "Новое поколение мобильных",
        subtitle:
          "Мощные камеры, яркие экраны и быстрая зарядка. Найдите свой идеальный смартфон.",
        ctaLabel: "Выбрать смартфон",
        onCtaClick: scrollToCatalog,
        image: "/img/phone.jpg",
        alt: "Смартфон",
      },
      {
        eyebrow: "Для работы и учёбы",
        title: "Ноутбуки на любой вкус",
        subtitle:
          "Лёгкие, мощные и стильные. Для работы, учёбы и игр — по выгодной цене.",
        ctaLabel: "Смотреть ноутбуки",
        onCtaClick: scrollToCatalog,
        image: "/img/laptop.jpg",
        alt: "Ноутбук",
      },
    ],
  });

  const catalog = document.createElement("section");
  catalog.id = "catalog";
  catalog.className = "home__catalog container";

  const heading = el(
    "div",
    { class: "home__heading" },
    el("h2", {
      class: "home__heading-title",
      "data-heading-title": "",
      text: "Каталог товаров",
    }),
    el(
      "p",
      { class: "home__heading-total" },
      "В корзине: ",
      el("strong", { "data-cart-total": "", text: formatPrice(total) }),
      " · ",
      el("span", { "data-cart-count-inline": "", text: "0" }),
      " шт.",
    ),
  );

  const categoryNav = CategoryNav({
    categories,
    active: state.category,
    onSelect: (category) => {
      state.category = category;
      state.tag = null;
      updateActiveCategory(categoryNav, category);
      renderProducts();
    },
  });

  const listHost = document.createElement("div");

  const renderProducts = () => {
    const filtered = filterProducts(products, {
      category: state.category,
      query: state.query,
      tag: state.tag,
    });

    const headingTitle = page.querySelector<HTMLElement>(
      "[data-heading-title]",
    );
    if (headingTitle) {
      headingTitle.textContent =
        state.tag === "new"
          ? "Новинки"
          : state.tag === "sale"
          ? "Скидки"
          : "Каталог товаров";
    }

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
  }), Brands(), Benefits(), Footer());

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
      state.tag = null;
      updateActiveCategory(categoryNav, category);
      renderProducts();
    },
    setTag(tag) {
      state.tag = tag;
      if (tag) {
        state.category = categories[0] ?? "Все";
        updateActiveCategory(categoryNav, state.category);
      }
      renderProducts();
    },
    setCart,
  };
}