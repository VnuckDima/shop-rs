import { createCart } from "@features/cart";
import { HomePage, updateCartTotal } from "@pages/HomePage";
import { Header, updateCartCount } from "@widgets/Header";
import { MOCK_PRODUCTS } from "./mock/products";
import "./styles/global.css";

function bootstrap(root: HTMLElement): void {
  const cart = createCart();

  const header = Header({ cartCount: cart.count() });
  const page = HomePage({
    products: MOCK_PRODUCTS,
    total: cart.total(),
    onAddToCart: (product) => cart.add(product),
  });

  cart.subscribe(() => {
    updateCartCount(header, cart.count());
    updateCartTotal(page, cart.total());
  });

  root.append(header, page);
}

export function mountApp(selector = "#app"): void {
  const root = document.querySelector<HTMLElement>(selector);
  if (!root) {
    throw new Error(`Root element "${selector}" not found`);
  }
  bootstrap(root);
}