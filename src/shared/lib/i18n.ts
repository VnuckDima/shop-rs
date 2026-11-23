import { STORAGE_KEYS } from "../constants/storage";

export type Locale = "ru" | "en";

export const LOCALES: Locale[] = ["ru", "en"];


type Params = Record<string, string | number>;

const MESSAGES: Record<Locale, Record<string, string>> = {
  ru: {
    "lang.switch": "Переключить язык",
    "theme.toggle": "Переключить тему",

    "header.nav.catalog": "Каталог",
    "header.nav.new": "Новинки",
    "header.nav.sale": "Скидки",
    "header.nav.brands": "Бренды",
    "header.search.placeholder": "Поиск товаров…",
    "header.search.aria": "Поиск товаров",
    "header.cart.aria": "Корзина",
    "header.nav.aria": "Основная навигация",

    "hero.prev.aria": "Предыдущий слайд",
    "hero.next.aria": "Следующий слайд",
    "hero.dot.aria": "Слайд {index}",

    "hero.slide1.eyebrow": "Новая коллекция 2026",
    "hero.slide1.title": "Техника, которая вдохновляет",
    "hero.slide1.subtitle":
      "Смартфоны, ноутбуки и аксессуары ведущих брендов. Выгодные цены, быстрая доставка и гарантия.",
    "hero.slide1.cta": "Смотреть каталог",
    "hero.slide1.alt": "Техника и электроника",

    "hero.slide2.eyebrow": "Смартфоны",
    "hero.slide2.title": "Новое поколение мобильных",
    "hero.slide2.subtitle":
      "Мощные камеры, яркие экраны и быстрая зарядка. Найдите свой идеальный смартфон.",
    "hero.slide2.cta": "Выбрать смартфон",
    "hero.slide2.alt": "Смартфон",

    "hero.slide3.eyebrow": "Для работы и учёбы",
    "hero.slide3.title": "Ноутбуки на любой вкус",
    "hero.slide3.subtitle":
      "Лёгкие, мощные и стильные. Для работы, учёбы и игр — по выгодной цене.",
    "hero.slide3.cta": "Смотреть ноутбуки",
    "hero.slide3.alt": "Ноутбук",

    "home.catalog.title": "Каталог товаров",
    "home.catalog.new": "Новинки",
    "home.catalog.sale": "Скидки",
    "home.catalog.brand": "Бренд: {brand}",
    "home.cart.label": "В корзине:",
    "home.cart.pieces": "шт.",
    "home.promo.title": "Скидки до 40% на технику",
    "home.promo.subtitle":
      "Успейте купить смартфоны и ноутбуки по сниженным ценам. Количество товара ограничено.",
    "home.promo.cta": "Смотреть скидки",

    "category.all": "Все",
    "category.smartphones": "Смартфоны",
    "category.laptops": "Ноутбуки",
    "category.audio": "Аудио",
    "category.accessories": "Аксессуары",
    "category.aria": "Категории",

    "product.badge.hit": "Хит",
    "product.badge.new": "Новинка",
    "product.badge.sale": "Скидка",
    "product.rating.aria": "Рейтинг {rating}",
    "product.card.more": "Подробнее",
    "product.card.add": "В корзину",
    "product.list.empty":
      "Ничего не найдено. Попробуйте изменить запрос или категорию.",

    "product.page.back": "← Назад",
    "product.page.add": "В корзину",
    "product.page.remove": "Удалить",
    "product.page.buyNow": "Купить в 1 клик",
    "product.page.dec": "Уменьшить количество",
    "product.page.inc": "Увеличить количество",
    "product.page.rating": "· рейтинг покупателей",
    "product.page.descriptionFallback": "Подробное описание скоро появится.",
    "product.page.specs": "Характеристики",

    "product.modal.close": "Закрыть",
    "product.modal.specs": "Характеристики",
    "product.modal.add": "В корзину",
    "product.modal.remove": "Удалить",
    "product.modal.buyNow": "Купить в 1 клик",
    "product.modal.dec": "Уменьшить количество",
    "product.modal.inc": "Увеличить количество",
    "product.modal.rating": "· рейтинг покупателей",
    "product.modal.descriptionFallback": "Подробное описание скоро появится.",

    "brand.back": "← Назад в каталог",
    "brand.count.one": "{count} товар",
    "brand.count.few": "{count} товара",
    "brand.count.many": "{count} товаров",
    "brand.count.other": "{count} товаров",

    "benefits.title": "Почему выбирают нас",
    "benefit.delivery.title": "Быстрая доставка",
    "benefit.delivery.text": "По всей стране за 1–3 дня. Бесплатно от 5 000 ₽.",
    "benefit.delivery.detail1":
      "Доставляем заказы по всей России курьером и в пункты выдачи. Срок доставки — от 1 до 3 рабочих дней в зависимости от региона.",
    "benefit.delivery.detail2":
      "При заказе от 5 000 ₽ доставка бесплатная. Для заказов на меньшую сумму стоимость рассчитывается при оформлении.",
    "benefit.delivery.detail3":
      "Отследить посылку можно по трек-номеру, который приходит в SMS и на электронную почту после отправки.",

    "benefit.warranty.title": "Гарантия 2 года",
    "benefit.warranty.text": "Официальная гарантия производителя на всю технику.",
    "benefit.warranty.detail1":
      "На всю технику в каталоге действует официальная гарантия производителя сроком 24 месяца.",
    "benefit.warranty.detail2":
      "Обслуживание выполняется в авторизованных сервисных центрах. Для обращения понадобится чек или гарантийный талон.",
    "benefit.warranty.detail3":
      "Если товар окажется неисправным, мы организуем диагностику и ремонт или замену в разумный срок.",

    "benefit.returns.title": "Лёгкий возврат",
    "benefit.returns.text": "14 дней на возврат без лишних вопросов.",
    "benefit.returns.detail1":
      "Вернуть товар можно в течение 14 дней после покупки, если он сохранил товарный вид и упаковку.",
    "benefit.returns.detail2":
      "Деньги возвращаются тем же способом, которым была произведена оплата, в течение 3–10 рабочих дней.",
    "benefit.returns.detail3":
      "Для оформления возврата свяжитесь с поддержкой — мы подскажем порядок действий и поможем с отправкой.",

    "benefit.installment.title": "Оплата частями",
    "benefit.installment.text": "Рассрочка 0-0-6 без переплат и первого взноса.",
    "benefit.installment.detail1":
      "Оформите рассрочку 0-0-6 на 6 месяцев без первого взноса и переплат.",
    "benefit.installment.detail2":
      "Доступна для заказов от 3 000 ₽. Решение принимается за несколько минут при оформлении.",
    "benefit.installment.detail3":
      "Условия и итоговую стоимость вы увидите до подтверждения заказа — никаких скрытых платежей.",

    "brands.title": "Популярные бренды",

    "footer.description":
      "Современный магазин электроники. Доставка по всей стране.",
    "footer.contacts": "Контакты",
    "footer.hours": "Ежедневно 9:00–21:00",
    "footer.catalog": "Каталог",
    "footer.buyers": "Покупателям",
    "footer.copyright": "© 2026 Shop-RS. Все права защищены.",
    "footer.link.delivery": "Доставка",
    "footer.link.payment": "Оплата",
    "footer.link.returns": "Возврат",
    "footer.link.warranty": "Гарантия",

    "cart.title": "Корзина",
    "cart.close": "Закрыть",
    "cart.empty": "Корзина пуста",
    "cart.emptyHint": "Добавьте товары из каталога",
    "cart.total": "Итого",
    "cart.checkout": "Оформить заказ",
    "cart.dec": "Уменьшить",
    "cart.inc": "Увеличить",
    "cart.remove": "Удалить",

    "about.features.1": "Каталог товаров с поиском и фильтрами по категориям",
    "about.features.2": "Карточка товара с характеристиками",
    "about.features.3": "Корзина с изменением количества и удалением",
    "about.features.4": "Автоматический пересчёт суммы и количества",
    "about.start": "Перейти в магазин",
    "about.subtitle":
      "Учебный интернет-магазин электроники. Командный проект: каталог, карточки товаров и корзина.",
    "about.featuresTitle": "Что умеет приложение",
    "about.teamTitle": "Команда",

    "alert.orderPlaced": "Заказ оформлен! Спасибо за покупку.",
  },
  en: {
    "lang.switch": "Switch language",
    "theme.toggle": "Toggle theme",

    "header.nav.catalog": "Catalog",
    "header.nav.new": "New",
    "header.nav.sale": "Sale",
    "header.nav.brands": "Brands",
    "header.search.placeholder": "Search products…",
    "header.search.aria": "Search products",
    "header.cart.aria": "Cart",
    "header.nav.aria": "Main navigation",

    "hero.prev.aria": "Previous slide",
    "hero.next.aria": "Next slide",
    "hero.dot.aria": "Slide {index}",

    "hero.slide1.eyebrow": "New collection 2026",
    "hero.slide1.title": "Tech that inspires",
    "hero.slide1.subtitle":
      "Smartphones, laptops and accessories from leading brands. Great prices, fast delivery and warranty.",
    "hero.slide1.cta": "Browse catalog",
    "hero.slide1.alt": "Technology and electronics",

    "hero.slide2.eyebrow": "Smartphones",
    "hero.slide2.title": "A new generation of mobile",
    "hero.slide2.subtitle":
      "Powerful cameras, bright screens and fast charging. Find your perfect smartphone.",
    "hero.slide2.cta": "Choose a smartphone",
    "hero.slide2.alt": "Smartphone",

    "hero.slide3.eyebrow": "For work and study",
    "hero.slide3.title": "Laptops for every taste",
    "hero.slide3.subtitle":
      "Light, powerful and stylish. For work, study and play — at a great price.",
    "hero.slide3.cta": "Browse laptops",
    "hero.slide3.alt": "Laptop",

    "home.catalog.title": "Product catalog",
    "home.catalog.new": "New arrivals",
    "home.catalog.sale": "Sale",
    "home.catalog.brand": "Brand: {brand}",
    "home.cart.label": "In cart:",
    "home.cart.pieces": "pcs.",
    "home.promo.title": "Up to 40% off electronics",
    "home.promo.subtitle":
      "Hurry to buy smartphones and laptops at reduced prices. Limited quantities.",
    "home.promo.cta": "See sale",

    "category.all": "All",
    "category.smartphones": "Smartphones",
    "category.laptops": "Laptops",
    "category.audio": "Audio",
    "category.accessories": "Accessories",
    "category.aria": "Categories",

    "product.badge.hit": "Hit",
    "product.badge.new": "New",
    "product.badge.sale": "Sale",
    "product.rating.aria": "Rating {rating}",
    "product.card.more": "Details",
    "product.card.add": "Add to cart",
    "product.list.empty": "Nothing found. Try changing your query or category.",

    "product.page.back": "← Back",
    "product.page.add": "Add to cart",
    "product.page.remove": "Remove",
    "product.page.buyNow": "Buy in 1 click",
    "product.page.dec": "Decrease quantity",
    "product.page.inc": "Increase quantity",
    "product.page.rating": "· customer rating",
    "product.page.descriptionFallback": "Detailed description coming soon.",
    "product.page.specs": "Specifications",

    "product.modal.close": "Close",
    "product.modal.specs": "Specifications",
    "product.modal.add": "Add to cart",
    "product.modal.remove": "Remove",
    "product.modal.buyNow": "Buy in 1 click",
    "product.modal.dec": "Decrease quantity",
    "product.modal.inc": "Increase quantity",
    "product.modal.rating": "· customer rating",
    "product.modal.descriptionFallback": "Detailed description coming soon.",

    "brand.back": "← Back to catalog",
    "brand.count.one": "{count} product",
    "brand.count.few": "{count} products",
    "brand.count.many": "{count} products",
    "brand.count.other": "{count} products",

    "benefits.title": "Why choose us",
    "benefit.delivery.title": "Fast delivery",
    "benefit.delivery.text": "Nationwide in 1–3 days. Free from 5,000 ₽.",
    "benefit.delivery.detail1":
      "We deliver across Russia by courier and to pickup points. Delivery takes 1 to 3 business days depending on the region.",
    "benefit.delivery.detail2":
      "Delivery is free for orders over 5,000 ₽. For smaller orders, the cost is calculated at checkout.",
    "benefit.delivery.detail3":
      "You can track your parcel using the tracking number sent by SMS and email after dispatch.",

    "benefit.warranty.title": "2-year warranty",
    "benefit.warranty.text": "Official manufacturer warranty on all products.",
    "benefit.warranty.detail1":
      "All products in the catalog are covered by an official 24-month manufacturer warranty.",
    "benefit.warranty.detail2":
      "Service is provided by authorized service centers. You will need a receipt or warranty card.",
    "benefit.warranty.detail3":
      "If a product turns out to be faulty, we will arrange diagnostics and repair or replacement within a reasonable time.",

    "benefit.returns.title": "Easy returns",
    "benefit.returns.text": "14 days to return without questions.",
    "benefit.returns.detail1":
      "You can return a product within 14 days of purchase if it retains its appearance and packaging.",
    "benefit.returns.detail2":
      "The money is refunded using the same payment method within 3–10 business days.",
    "benefit.returns.detail3":
      "To arrange a return, contact support — we will guide you through the process and help with shipping.",

    "benefit.installment.title": "Pay in installments",
    "benefit.installment.text":
      "0-0-6 installment plan with no extra fees and no down payment.",
    "benefit.installment.detail1":
      "Get a 0-0-6 installment plan for 6 months with no down payment and no extra fees.",
    "benefit.installment.detail2":
      "Available for orders from 3,000 ₽. A decision is made in a few minutes at checkout.",
    "benefit.installment.detail3":
      "You will see the terms and total cost before confirming your order — no hidden fees.",

    "brands.title": "Popular brands",

    "footer.description": "A modern electronics store. Nationwide delivery.",
    "footer.contacts": "Contacts",
    "footer.hours": "Daily 9:00–21:00",
    "footer.catalog": "Catalog",
    "footer.buyers": "For buyers",
    "footer.copyright": "© 2026 Shop-RS. All rights reserved.",
    "footer.link.delivery": "Delivery",
    "footer.link.payment": "Payment",
    "footer.link.returns": "Returns",
    "footer.link.warranty": "Warranty",

    "cart.title": "Cart",
    "cart.close": "Close",
    "cart.empty": "Your cart is empty",
    "cart.emptyHint": "Add products from the catalog",
    "cart.total": "Total",
    "cart.checkout": "Checkout",
    "cart.dec": "Decrease",
    "cart.inc": "Increase",
    "cart.remove": "Remove",

    "about.features.1": "Product catalog with search and category filters",
    "about.features.2": "Product page with specifications",
    "about.features.3": "Cart with quantity controls and removal",
    "about.features.4": "Automatic recalculation of totals and quantities",
    "about.start": "Go to store",
    "about.subtitle":
      "An educational electronics store. A team project: catalog, product pages and cart.",
    "about.featuresTitle": "What the app can do",
    "about.teamTitle": "Team",

    "alert.orderPlaced": "Order placed! Thank you for your purchase.",
  },
};

let current: Locale = "ru";
const listeners = new Set<(locale: Locale) => void>();

export function getLocale(): Locale {
  return current;
}

export function setLocale(locale: Locale): void {
  if (locale === current) return;
  current = locale;
  try {
    localStorage.setItem(STORAGE_KEYS.locale, locale);
  } catch (err) {
    console.warn("Failed to save locale", err);
  }
  document.documentElement.lang = locale;
  listeners.forEach((listener) => listener(locale));
}

export function toggleLocale(): Locale {
  const next: Locale = current === "ru" ? "en" : "ru";
  setLocale(next);
  return next;
}

export function onLocaleChange(listener: (locale: Locale) => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function initI18n(): Locale {
  let saved: string | null = null;
  try {
    saved = localStorage.getItem(STORAGE_KEYS.locale);
  } catch (err) {
    console.warn("Failed to read locale", err);
  }
  current = saved === "en" || saved === "ru" ? saved : "ru";
  document.documentElement.lang = current;
  return current;
}

export function t(key: string, params?: Params): string {
  const template =
    MESSAGES[current][key] ?? MESSAGES.ru[key] ?? MESSAGES.en[key] ?? key;
  if (!params) return template;
  return template.replace(/\{(\w+)\}/g, (match, name: string) =>
    Object.prototype.hasOwnProperty.call(params, name)
      ? String(params[name])
      : match,
  );
}

export function pluralSuffix(
  count: number,
): "one" | "few" | "many" | "other" {
  const abs = Math.abs(count);
  if (current === "en") {
    return abs % 10 === 1 && abs % 100 !== 11 ? "one" : "other";
  }
  const mod10 = abs % 10;
  const mod100 = abs % 100;
  if (mod10 === 1 && mod100 !== 11) return "one";
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return "few";
  return "many";
}

const CATEGORY_KEYS: Record<string, string> = {
  Все: "category.all",
  Смартфоны: "category.smartphones",
  Ноутбуки: "category.laptops",
  Аудио: "category.audio",
  Аксессуары: "category.accessories",
};

export function categoryLabel(category: string): string {
  const key = CATEGORY_KEYS[category];
  return key ? t(key) : category;
}