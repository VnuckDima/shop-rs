import type { Product } from "./product";

export type CatalogTag = "new" | "sale" | null;

export type CatalogFilter = {
  category?: string;
  query?: string;
  tag?: CatalogTag;
  brand?: string | null;
};

export function filterProducts(
  products: Product[],
  {
    category = "Все",
    query = "",
    tag = null,
    brand = null,
  }: CatalogFilter = {},
): Product[] {
  const normalizedQuery = query.trim().toLowerCase();

  return products.filter((product) => {
    const matchesCategory =
      category === "Все" || product.category === category;

    const matchesTag = tag === null || product.badge === tag;

    const matchesBrand = brand === null || product.brand === brand;

    const matchesQuery =
      normalizedQuery === "" ||
      product.title.toLowerCase().includes(normalizedQuery) ||
      product.category.toLowerCase().includes(normalizedQuery);

    return matchesCategory && matchesTag && matchesBrand && matchesQuery;
  });
}