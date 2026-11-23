import "./ui/Footer.css";

export function Footer(): HTMLElement {
  const footer = document.createElement("footer");
  footer.className = "footer";

  footer.innerHTML = `
    <div class="footer__inner container">
      <div class="footer__col footer__brand">
        <a class="footer__logo" href="#"><span>◈</span> Shop-RS</a>
        <p class="footer__text">Современный магазин электроники. Доставка по всей стране.</p>
        <div class="footer__socials">
          <a class="footer__social" href="#" aria-label="Telegram">TG</a>
          <a class="footer__social" href="#" aria-label="VK">VK</a>
          <a class="footer__social" href="#" aria-label="YouTube">YT</a>
        </div>
      </div>

      <div class="footer__col">
        <h4 class="footer__title">Каталог</h4>
        <a class="footer__link" href="#">Смартфоны</a>
        <a class="footer__link" href="#">Ноутбуки</a>
        <a class="footer__link" href="#">Аудио</a>
        <a class="footer__link" href="#">Аксессуары</a>
      </div>

      <div class="footer__col">
        <h4 class="footer__title">Покупателям</h4>
        <a class="footer__link" href="#">Доставка</a>
        <a class="footer__link" href="#">Оплата</a>
        <a class="footer__link" href="#">Возврат</a>
        <a class="footer__link" href="#">Гарантия</a>
      </div>

      <div class="footer__col">
        <h4 class="footer__title">Контакты</h4>
        <a class="footer__link" href="tel:+78000000000">8 (800) 000-00-00</a>
        <a class="footer__link" href="mailto:shop@example.com">shop@example.com</a>
        <p class="footer__text">Ежедневно 9:00–21:00</p>
      </div>
    </div>
    <div class="footer__bottom container">
      <span>© 2026 Shop-RS. Все права защищены.</span>
    </div>
  `;

  return footer;
}