export type NavKey = "catalog" | "new" | "sale" | "brands";

export const NAV_LINKS: { key: NavKey; labelKey: string }[] = [
  { key: "catalog", labelKey: "header.nav.catalog" },
  { key: "new", labelKey: "header.nav.new" },
  { key: "sale", labelKey: "header.nav.sale" },
  { key: "brands", labelKey: "header.nav.brands" },
];