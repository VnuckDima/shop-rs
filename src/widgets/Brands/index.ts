import "./ui/Brands.css";

const BRANDS = [
  "Apple",
  "Samsung",
  "Sony",
  "Xiaomi",
  "ASUS",
  "Lenovo",
  "JBL",
  "Logitech",
];

export function Brands(): HTMLElement {
  const section = document.createElement("section");
  section.id = "brands";
  section.className = "brands";

  section.innerHTML = `
    <div class="brands__inner container">
      <h2 class="brands__title">Популярные бренды</h2>
      <div class="brands__grid">
        ${BRANDS.map((brand) => `<span class="brands__item">${brand}</span>`).join(
          "",
        )}
      </div>
    </div>
  `;

  return section;
}