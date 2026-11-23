import "./ui/Benefits.css";

type Benefit = {
  icon: string;
  title: string;
  text: string;
};

const BENEFITS: Benefit[] = [
  {
    icon: "🚚",
    title: "Быстрая доставка",
    text: "По всей стране за 1–3 дня. Бесплатно от 5 000 ₽.",
  },
  {
    icon: "🛡️",
    title: "Гарантия 2 года",
    text: "Официальная гарантия производителя на всю технику.",
  },
  {
    icon: "↩️",
    title: "Лёгкий возврат",
    text: "14 дней на возврат без лишних вопросов.",
  },
  {
    icon: "💳",
    title: "Оплата частями",
    text: "Рассрочка 0-0-6 без переплат и первого взноса.",
  },
];

export function Benefits(): HTMLElement {
  const section = document.createElement("section");
  section.className = "benefits";

  section.innerHTML = `
    <div class="benefits__inner container">
      <h2 class="benefits__title">Почему выбирают нас</h2>
      <div class="benefits__grid">
        ${BENEFITS.map(
          (item) => `
          <article class="benefit">
            <span class="benefit__icon">${item.icon}</span>
            <h3 class="benefit__title">${item.title}</h3>
            <p class="benefit__text">${item.text}</p>
          </article>`,
        ).join("")}
      </div>
    </div>
  `;

  return section;
}