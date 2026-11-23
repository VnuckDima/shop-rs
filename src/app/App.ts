import { createCart } from "@features/cart";
import { createProductModal } from "@features/product-modal";
import { AboutPage } from "@pages/AboutPage";
import { HomePage } from "@pages/HomePage";
import { createCartDrawer } from "@widgets/CartDrawer";
import { Header, updateCartCount } from "@widgets/Header";
import { el } from "@shared/lib/dom";
import { MOCK_PRODUCTS, CATEGORIES } from "./mock/products";
import { TEAM } from "./mock/team";
import "./styles/global.css";

function bootstrap(root: HTMLElement): void {
  const cart = createCart();

  const drawer = createCartDrawer({
    cart,
    onCheckout: () => {
      cart.clear();
      drawer.close();
      window.alert("Заказ оформлен! Спасибо за покупку.");
    },
  });

  const modal = createProductModal({
    cart,
    onAddToCart: (product) => cart.add(product),
  });

  const header = Header({
    cartCount: cart.count(),
    onSearch: (query) => page.setQuery(query),
    onCartClick: () => drawer.toggle(),
    onNav: (key) => {
      const scrollTo = (selector: string) =>
        document.querySelector(selector)?.scrollIntoView({ behavior: "smooth" });

      if (key === "catalog") {
        page.setCategory("Все");
        scrollTo("#catalog");
      } else if (key === "new") {
        page.setTag("new");
        scrollTo("#catalog");
      } else if (key === "sale") {
        page.setTag("sale");
        scrollTo("#catalog");
      } else {
        scrollTo("#brands");
      }
    },
  });

  const page = HomePage({
    products: MOCK_PRODUCTS,
    categories: CATEGORIES,
    total: cart.total(),
    onAddToCart: (product) => cart.add(product),
    onOpen: (product) => modal.open(product),
  });

  const syncCart = () => {
    const count = cart.count();
    updateCartCount(header, count);
    page.setCart(cart.total(), count);
  };

  cart.subscribe(() => syncCart());
  syncCart();

  const shop = el(
    "div",
    { class: "shop" },
    header,
    page.root,
    modal.root,
    drawer.root,
  );

  const about = AboutPage({
    team: TEAM,
    onStart: () => root.replaceChildren(shop),
  });

  root.replaceChildren(about);
}

export function mountApp(selector = "#app"): void {
  const root = document.querySelector<HTMLElement>(selector);
  if (!root) {
    throw new Error(`Root element "${selector}" not found`);
  }
  bootstrap(root);
}