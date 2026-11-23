import { createCart } from "@features/cart";
import { createCartStorage } from "@features/cart/storage";
import { AboutPage } from "@pages/AboutPage";
import { BrandPage } from "@pages/BrandPage";
import { HomePage } from "@pages/HomePage";
import { InfoPage } from "@pages/InfoPage";
import { ProductPage } from "@pages/ProductPage";
import { createCartDrawer } from "@widgets/CartDrawer";
import { Header, updateCartCount, type NavKey } from "@widgets/Header";
import type { Product } from "@shared/lib/product";
import { onLocaleChange, t } from "@shared/lib/i18n";
import { loadProducts } from "@shared/lib/catalog-storage";
import { loadRoute, saveRoute, type Route } from "./route";
import { MOCK_PRODUCTS, CATEGORIES } from "./mock/products";
import { TEAM } from "./mock/team";
import "./styles/global.css";

function bootstrap(root: HTMLElement): void {
  const products = loadProducts(MOCK_PRODUCTS);

  const cart = createCart({
    storage: createCartStorage(products),
  });

  const drawer = createCartDrawer({
    cart,
    onCheckout: () => {
      cart.clear();
      drawer.close();
      window.alert(t("alert.orderPlaced"));
    },
  });

  let route: Route = loadRoute(products) ?? { name: "about" };

  const scrollTo = (selector: string) =>
    document.querySelector(selector)?.scrollIntoView({ behavior: "smooth" });

  const toCatalog = () => requestAnimationFrame(() => scrollTo("#catalog"));

  const homePage = HomePage({
    products,
    categories: CATEGORIES,
    total: cart.total(),
    onAddToCart: (product) => cart.add(product),
    onOpen: (product) => openProduct(product),
    onBrandSelect: (brand) => navigate({ name: "brand", brand }),
    onInfoSelect: (key) => {
      const back: Route = route.name === "brand" ? route : { name: "home" };
      navigate({ name: "info", key, back });
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  });

  const header = Header({
    cartCount: cart.count(),
    onSearch: (query) => homePage.setQuery(query),
    onCartClick: () => drawer.toggle(),
    onNav: (key) => handleNav(key),
    onHome: () => handleNav("catalog"),
  });

  const syncCart = () => {
    const count = cart.count();
    updateCartCount(header, count);
    homePage.setCart(cart.total(), count);
  };

  cart.subscribe(() => syncCart());
  syncCart();

  function openProduct(product: Product): void {
    const back: Route = route.name === "brand" ? route : { name: "home" };
    navigate({ name: "product", product, back });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function render(): void {
    const current = route;

    if (current.name === "about") {
      root.replaceChildren(
        AboutPage({
          team: TEAM,
          onStart: () => navigate({ name: "home" }),
        }),
      );
      return;
    }

    const children: HTMLElement[] = [header];

    if (current.name === "home") {
      children.push(homePage.root);
    } else if (current.name === "brand") {
      children.push(
        BrandPage({
          brand: current.brand,
          products,
          onAddToCart: (product) => cart.add(product),
          onOpen: (product) => openProduct(product),
          onBack: () => {
            navigate({ name: "home" });
            toCatalog();
          },
        }),
      );
    } else if (current.name === "product") {
      children.push(
        ProductPage({
          product: current.product,
          cart,
          onBack: () => navigate(current.back),
        }),
      );
    } else {
      children.push(
        InfoPage({
          benefitKey: current.key,
          onBack: () => navigate(current.back),
        }),
      );
    }

    children.push(drawer.root);
    root.replaceChildren(...children);
  }

  function navigate(next: Route): void {
    route = next;
    saveRoute(next);
    render();
  }

  function handleNav(key: NavKey): void {
    if (key === "catalog") {
      homePage.setCategory("Все");
      navigate({ name: "home" });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (key === "new") {
      homePage.setTag("new");
      navigate({ name: "home" });
      toCatalog();
    } else if (key === "sale") {
      homePage.setTag("sale");
      navigate({ name: "home" });
      toCatalog();
    } else {
      navigate({ name: "home" });
      requestAnimationFrame(() => scrollTo("#brands"));
    }
  }

  render();
}

export function mountApp(selector = "#app"): void {
  const root = document.querySelector<HTMLElement>(selector);
  if (!root) {
    throw new Error(`Root element "${selector}" not found`);
  }

  const run = () => {
    root.replaceChildren();
    bootstrap(root);
  };

  run();
  onLocaleChange(run);
}