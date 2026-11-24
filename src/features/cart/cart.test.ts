import { describe, expect, it, vi } from "vitest";
import { createCart } from "./index";
import { createCartStorage } from "./storage";
import type { Product } from "@entities/Product";

const makeProduct = (overrides: Partial<Product> & { id: number }): Product => ({
  title: "Товар",
  price: 1000,
  category: "Аксессуары",
  rating: 4.5,
  imageUrl: "/img/test.jpg",
  ...overrides,
});

describe("createCart", () => {
  it("добавляет товар и считает сумму и количество", () => {
    const cart = createCart();
    cart.add(makeProduct({ id: 1, price: 500 }));

    expect(cart.count()).toBe(1);
    expect(cart.total()).toBe(500);
  });

  it("объединяет одинаковые товары и увеличивает количество", () => {
    const cart = createCart();
    const product = makeProduct({ id: 1, price: 300 });

    cart.add(product);
    cart.add(product);

    expect(cart.count()).toBe(2);
    expect(cart.total()).toBe(600);
    expect(cart.lines()).toHaveLength(1);
  });

  it("inc увеличивает, dec уменьшает количество", () => {
    const cart = createCart();
    cart.add(makeProduct({ id: 1, price: 100 }));

    cart.inc(1);
    cart.inc(1);
    expect(cart.count()).toBe(3);

    cart.dec(1);
    expect(cart.count()).toBe(2);
    expect(cart.total()).toBe(200);
  });

  it("удаляет товар при dec до нуля", () => {
    const cart = createCart();
    cart.add(makeProduct({ id: 1, price: 100 }));

    cart.dec(1);

    expect(cart.lines()).toHaveLength(0);
    expect(cart.count()).toBe(0);
    expect(cart.total()).toBe(0);
  });

  it("setQty задаёт точное количество, 0 удаляет", () => {
    const cart = createCart();
    cart.add(makeProduct({ id: 1, price: 100 }));

    cart.setQty(1, 5);
    expect(cart.count()).toBe(5);

    cart.setQty(1, 0);
    expect(cart.count()).toBe(0);
  });

  it("remove удаляет конкретный товар", () => {
    const cart = createCart();
    cart.add(makeProduct({ id: 1, price: 100 }));
    cart.add(makeProduct({ id: 2, price: 200 }));

    cart.remove(1);

    expect(cart.count()).toBe(1);
    expect(cart.total()).toBe(200);
  });

  it("clear очищает корзину", () => {
    const cart = createCart();
    cart.add(makeProduct({ id: 1, price: 100 }));
    cart.add(makeProduct({ id: 2, price: 200 }));

    cart.clear();

    expect(cart.lines()).toHaveLength(0);
    expect(cart.total()).toBe(0);
  });

  it("уведомляет подписчиков при изменении", () => {
    const cart = createCart();
    let calls = 0;
    cart.subscribe(() => {
      calls += 1;
    });

    cart.add(makeProduct({ id: 1, price: 100 }));
    cart.inc(1);

    expect(calls).toBe(2);
  });

  it("восстанавливает корзину из хранилища и сохраняет изменения", () => {
    const product = makeProduct({ id: 1, price: 100 });
    const save = vi.fn();
    const cart = createCart({
      storage: {
        load: () => [{ product, qty: 2 }],
        save,
      },
    });

    expect(cart.count()).toBe(2);

    cart.inc(1);

    expect(save).toHaveBeenCalledTimes(1);
    expect(save.mock.calls[0][0]).toEqual([{ product, qty: 3 }]);
  });

  it("createCartStorage пишет и читает localStorage", () => {
    const store = new Map<string, string>();
    vi.stubGlobal("localStorage", {
      getItem: (key: string) => store.get(key) ?? null,
      setItem: (key: string, value: string) => {
        store.set(key, value);
      },
    });

    try {
      const product = makeProduct({ id: 7, price: 100 });
      const storage = createCartStorage([product]);

      storage.save([{ product, qty: 3 }]);

      expect(storage.load()).toEqual([{ product, qty: 3 }]);
    } finally {
      vi.unstubAllGlobals();
    }
  });
});