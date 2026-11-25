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
import { t } from "@shared/lib/i18n";
import type { BenefitKey } from "@shared/lib/benefits";
import { el } from "@shared/lib/dom";
import "./ui/HomePage.css";

export type HomePageProps = {
  products: Product[];
  categories: readonly string[];
  total: number;
  onAddToCart: (product: Product) => void;
  onOpen: (product: Product) => void;
  onBrandSelect?: (brand: string) => void;
  onInfoSelect?: (key: BenefitKey) => void;
};

export type HomePageController = {
  root: HTMLElement;
  setQuery: (query: string) => void;
  setCategory: (category: string) => void;
  setTag: (tag: "new" | "sale" | null) => void;
  setBrand: (brand: string | null) => void;
  setCart: (total: number, count: number) => void;
};

export function HomePage({
  products,
  categories,
  total,
  onAddToCart,
  onOpen,
  onBrandSelect,
  onInfoSelect,
}: HomePageProps): HomePageController {
  const state = {
    query: "",
    category: categories[0] ?? "Все",
    tag: null as "new" | "sale" | null,
    brand: null as string | null,
  };

  const page = document.createElement("div");
  page.className = "home";

  const hero = Hero({
    slides: [
      {
        eyebrow: t("hero.slide1.eyebrow"),
        title: t("hero.slide1.title"),
        subtitle: t("hero.slide1.subtitle"),
        ctaLabel: t("hero.slide1.cta"),
        onCtaClick: () => goToCategory("Все"),
        image: "/img/imageheroblock.webp",
        alt: t("hero.slide1.alt"),
      },
      {
        eyebrow: t("hero.slide2.eyebrow"),
        title: t("hero.slide2.title"),
        subtitle: t("hero.slide2.subtitle"),
        ctaLabel: t("hero.slide2.cta"),
        onCtaClick: () => goToCategory("Смартфоны"),
        image: "/img/phone.jpg",
        alt: t("hero.slide2.alt"),
      },
      {
        eyebrow: t("hero.slide3.eyebrow"),
        title: t("hero.slide3.title"),
        subtitle: t("hero.slide3.subtitle"),
        ctaLabel: t("hero.slide3.cta"),
        onCtaClick: () => goToCategory("Ноутбуки"),
        image: "/img/laptop.jpg",
        alt: t("hero.slide3.alt"),
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
      text: t("home.catalog.title"),
    }),
    el(
      "p",
      { class: "home__heading-total" },
      el("span", { text: t("home.cart.label") }),
      " ",
      el("strong", { "data-cart-total": "", text: formatPrice(total) }),
      " · ",
      el("span", { "data-cart-count-inline": "", text: "0" }),
      " ",
      el("span", { text: t("home.cart.pieces") }),
    ),
  );

  const categoryNav = CategoryNav({
    categories,
    active: state.category,
    onSelect: (category) => {
      state.category = category;
      state.tag = null;
      state.brand = null;
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
      brand: state.brand,
    });

    const headingTitle = page.querySelector<HTMLElement>(
      "[data-heading-title]",
    );
    if (headingTitle) {
      headingTitle.textContent = state.brand
        ? t("home.catalog.brand", { brand: state.brand })
        : state.tag === "new"
        ? t("home.catalog.new")
        : state.tag === "sale"
        ? t("home.catalog.sale")
        : t("home.catalog.title");
    }

    listHost.replaceChildren(
      ProductList({ products: filtered, onAddToCart, onOpen }),
    );
  };

  function goToCategory(category: string): void {
    state.category = category;
    state.tag = null;
    state.brand = null;
    updateActiveCategory(categoryNav, state.category);
    renderProducts();
    document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" });
  }

  const applyBrand = (brand: string | null, scroll: boolean) => {
    state.brand = brand && brand.length > 0 ? brand : null;
    state.category = categories[0] ?? "Все";
    state.tag = null;
    updateActiveCategory(categoryNav, state.category);
    renderProducts();
    if (scroll) {
      document
        .getElementById("catalog")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  catalog.append(heading, categoryNav, listHost);
  page.append(hero, catalog, PromoBanner({
    title: t("home.promo.title"),
    subtitle: t("home.promo.subtitle"),
    ctaLabel: t("home.promo.cta"),
    onCtaClick: () => {
      document
        .getElementById("catalog")
        ?.scrollIntoView({ behavior: "smooth" });
    },
  }), Brands({
    onSelect: (brand) =>
      onBrandSelect ? onBrandSelect(brand) : applyBrand(brand, true),
  }), Benefits({ onSelect: (key) => onInfoSelect?.(key) }), Footer());

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
      state.brand = null;
      updateActiveCategory(categoryNav, category);
      renderProducts();
    },
    setTag(tag) {
      state.tag = tag;
      state.brand = null;
      if (tag) {
        state.category = categories[0] ?? "Все";
        updateActiveCategory(categoryNav, state.category);
      }
      renderProducts();
    },
    setBrand(brand) {
      applyBrand(brand ?? "", false);
    },
    setCart,
  };
}