import { createCart } from "@features/cart";
import { createProductModal } from "@features/product-modal";
import { HomePage } from "@pages/HomePage";
import { createCartDrawer } from "@widgets/CartDrawer";
import { Header, updateCartCount } from "@widgets/Header";
import { MOCK_PRODUCTS, CATEGORIES } from "./mock/products";
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

  root.append(header, page.root, modal.root, drawer.root);
}

export function mountApp(selector = "#app"): void {
  const root = document.querySelector<HTMLElement>(selector);
  if (!root) {
    throw new Error(`Root element "${selector}" not found`);
  }
  bootstrap(root);
}