const app = document.getElementById("app");
const toast = document.getElementById("toast");

const ageModal = document.getElementById("ageModal");
const intro = document.getElementById("intro");
const confirmAge = document.getElementById("confirmAge");
const declineAge = document.getElementById("declineAge");

const menu = document.getElementById("menu");
const menuToggle = document.getElementById("menuToggle");
const menuClose = document.getElementById("menuClose");

const languageSwitcher = document.getElementById("languageSwitcher");
const languageButton = document.getElementById("languageButton");
const languageDropdown = document.getElementById("languageDropdown");
const languageCurrent = document.getElementById("languageCurrent");

const STORAGE_AGE = "phoenixAgeConfirmed_v3";
const STORAGE_CART = "phoenixCart";
const STORAGE_FAVORITES = "phoenixFavorites";
const STORAGE_LANGUAGE = "phoenixLanguage";

let toastTimer = null;

/* =========================================
   ТОВАРЫ
========================================= */

const phoenixProducts = [
  {
    id: 1,
    name: "Пепельный охотник",
    category: "ОХОТНИЧЬЯ СЕРИЯ",
    categoryCode: "hunting",
    steel: "D2",
    blade: "Drop Point",
    handleName: "Чёрный граб",
    sheath: "Натуральная кожа",
    length: "235 мм",
    bladeLength: "118 мм",
    price: 18900,
    image: "assets/knife-01.jpg",
    description:
      "Надёжный охотничий нож для долгого пути, лагеря и работы в полевых условиях. Сталь D2 сохраняет рез, а рукоять из чёрного граба уверенно лежит в руке."
  },
  {
    id: 2,
    name: "Крыло феникса",
    category: "АВТОРСКАЯ СЕРИЯ",
    categoryCode: "author",
    steel: "M390",
    blade: "Clip Point",
    handleName: "Американский орех",
    sheath: "Натуральная кожа",
    length: "225 мм",
    bladeLength: "105 мм",
    price: 34900,
    image: "assets/knife-02.jpg",
    description:
      "Авторский клинок с выразительной линией обуха и премиальной порошковой сталью M390. Для тех, кто ценит точность, редкие материалы и характер в деталях."
  },
  {
    id: 3,
    name: "Чёрное солнце",
    category: "ТАКТИЧЕСКАЯ СЕРИЯ",
    categoryCode: "tactical",
    steel: "N690",
    blade: "Tanto",
    handleName: "G10",
    sheath: "Kydex",
    length: "230 мм",
    bladeLength: "112 мм",
    price: 22900,
    image: "assets/knife-03.jpg",
    description:
      "Тактическая модель с уверенной геометрией tanto, износостойкой сталью N690 и влагостойкой рукоятью G10."
  },
  {
    id: 4,
    name: "Пламя кузни",
    category: "ОХОТНИЧЬЯ СЕРИЯ",
    categoryCode: "hunting",
    steel: "N690",
    blade: "Drop Point",
    handleName: "Берёза стабилизированная",
    sheath: "Натуральная кожа",
    length: "240 мм",
    bladeLength: "120 мм",
    price: 24600,
    image: "assets/knife-01.jpg",
    description:
      "Классический нож для охоты и путешествий. Нержавеющая сталь, стабилизированная древесина и кожаные ножны."
  },
  {
    id: 5,
    name: "Красный рассвет",
    category: "АВТОРСКАЯ СЕРИЯ",
    categoryCode: "author",
    steel: "Damascus",
    blade: "Bowie",
    handleName: "Micarta",
    sheath: "Натуральная кожа",
    length: "255 мм",
    bladeLength: "132 мм",
    price: 41800,
    image: "assets/knife-02.jpg",
    description:
      "Крупный авторский клинок с узорчатой дамасской сталью и выразительной формой bowie."
  },
  {
    id: 6,
    name: "Пепельный страж",
    category: "ТАКТИЧЕСКАЯ СЕРИЯ",
    categoryCode: "tactical",
    steel: "D2",
    blade: "Tanto",
    handleName: "G10",
    sheath: "Kydex",
    length: "218 мм",
    bladeLength: "100 мм",
    price: 21400,
    image: "assets/knife-03.jpg",
    description:
      "Компактный тактический нож для активного использования: прочная сталь, цепкая рукоять и влагостойкие ножны."
  },
  {
    id: 7,
    name: "Огненный след",
    category: "ТУРИСТИЧЕСКАЯ СЕРИЯ",
    categoryCode: "tourism",
    steel: "N690",
    blade: "Drop Point",
    handleName: "Орех",
    sheath: "Натуральная кожа",
    length: "210 мм",
    bladeLength: "92 мм",
    price: 19800,
    image: "assets/knife-01.jpg",
    description:
      "Лёгкий туристический нож для костра, лагеря и повседневных задач в путешествии."
  },
  {
    id: 8,
    name: "Птица пепла",
    category: "АВТОРСКАЯ СЕРИЯ",
    categoryCode: "author",
    steel: "M390",
    blade: "Drop Point",
    handleName: "Карбон",
    sheath: "Kydex",
    length: "220 мм",
    bladeLength: "103 мм",
    price: 37200,
    image: "assets/knife-02.jpg",
    description:
      "Современная авторская модель: премиальная M390, карбоновая рукоять и лаконичные ножны Kydex."
  },
  {
    id: 9,
    name: "Уголь и сталь",
    category: "ОХОТНИЧЬЯ СЕРИЯ",
    categoryCode: "hunting",
    steel: "Damascus",
    blade: "Clip Point",
    handleName: "Чёрный граб",
    sheath: "Натуральная кожа",
    length: "245 мм",
    bladeLength: "125 мм",
    price: 39600,
    image: "assets/knife-03.jpg",
    description:
      "Охотничий нож с дамасским рисунком, созданный на стыке традиционной формы и ручной обработки."
  }
];

/* =========================================
   ПЕРЕВОДЫ СТАТИЧЕСКОЙ ЧАСТИ
========================================= */

const languages = {
  ru: {
    code: "RU",
    htmlLang: "ru",
    title: "Phoenix — ножи, скованные огнём",
    texts: {
      ageEyebrow: "PHOENIX / НОЖЕВАЯ МАСТЕРСКАЯ",
      ageTitle: "Подтвердите возраст",
      ageText:
        "Сайт содержит информацию о ножевой продукции. Продолжая просмотр, вы подтверждаете, что достигли совершеннолетия.",
      ageConfirm: "Мне есть 18 лет",
      ageDecline: "Покинуть сайт",
      introText: "ВОЗРОЖДЁННЫЕ ИЗ ПЕПЛА",
      brandSubtitle: "НОЖЕВАЯ КОМПАНИЯ",
      languageCaption: "ВЫБЕРИТЕ ЯЗЫК",
      menuCaption: "НАВИГАЦИЯ",
      menuSearch: "Поиск",
      menuCatalog: "Каталог",
      menuFavorites: "Избранное",
      menuCart: "Корзина",
      menuContacts: "Контакты",
      menuTagline: "Скованные огнём.<br>Возрождённые из пепла.",
      footerTagline: "Скованные огнём. Возрождённые из пепла.",
      footerLegal:
        "Демонстрационный сайт. Перед запуском продаж необходимо разместить правила продажи, политику обработки персональных данных и информацию о соответствии продукции требованиям законодательства."
    }
  },

  en: {
    code: "EN",
    htmlLang: "en",
    title: "Phoenix — knives forged by fire",
    texts: {
      ageEyebrow: "PHOENIX / KNIFE WORKSHOP",
      ageTitle: "Confirm your age",
      ageText:
        "This website contains information about knife products. By continuing, you confirm that you are of legal age.",
      ageConfirm: "I am 18 or older",
      ageDecline: "Leave website",
      introText: "REBORN FROM ASHES",
      brandSubtitle: "KNIFE COMPANY",
      languageCaption: "SELECT LANGUAGE",
      menuCaption: "NAVIGATION",
      menuSearch: "Search",
      menuCatalog: "Catalog",
      menuFavorites: "Favorites",
      menuCart: "Cart",
      menuContacts: "Contacts",
      menuTagline: "Forged by fire.<br>Reborn from ashes.",
      footerTagline: "Forged by fire. Reborn from ashes.",
      footerLegal:
        "Demo website. Legal documents and product compliance information must be added before launching sales."
    }
  },

  de: {
    code: "DE",
    htmlLang: "de",
    title: "Phoenix — Messer, im Feuer geschmiedet",
    texts: {
      ageEyebrow: "PHOENIX / MESSERWERKSTATT",
      ageTitle: "Alter bestätigen",
      ageText: "Mit dem Fortfahren bestätigen Sie Ihre Volljährigkeit.",
      ageConfirm: "Ich bin mindestens 18",
      ageDecline: "Website verlassen",
      introText: "AUS DER ASCHE WIEDERGEBOREN",
      brandSubtitle: "MESSERWERKSTATT",
      languageCaption: "SPRACHE WÄHLEN",
      menuCaption: "NAVIGATION",
      menuSearch: "Suche",
      menuCatalog: "Katalog",
      menuFavorites: "Favoriten",
      menuCart: "Warenkorb",
      menuContacts: "Kontakte",
      menuTagline: "Im Feuer geschmiedet.<br>Aus der Asche wiedergeboren.",
      footerTagline: "Im Feuer geschmiedet. Aus der Asche wiedergeboren.",
      footerLegal: "Demonstrationswebsite."
    }
  },

  fr: {
    code: "FR",
    htmlLang: "fr",
    title: "Phoenix — couteaux forgés par le feu",
    texts: {
      ageEyebrow: "PHOENIX / ATELIER DE COUTELLERIE",
      ageTitle: "Confirmez votre âge",
      ageText: "En continuant, vous confirmez être majeur.",
      ageConfirm: "J'ai 18 ans ou plus",
      ageDecline: "Quitter le site",
      introText: "RENÉ DES CENDRES",
      brandSubtitle: "MAISON DE COUTELLERIE",
      languageCaption: "CHOISIR LA LANGUE",
      menuCaption: "NAVIGATION",
      menuSearch: "Recherche",
      menuCatalog: "Catalogue",
      menuFavorites: "Favoris",
      menuCart: "Panier",
      menuContacts: "Contacts",
      menuTagline: "Forgé par le feu.<br>Renaît des cendres.",
      footerTagline: "Forgé par le feu. Renaît des cendres.",
      footerLegal: "Site de démonstration."
    }
  },

  es: {
    code: "ES",
    htmlLang: "es",
    title: "Phoenix — cuchillos forjados por el fuego",
    texts: {
      ageEyebrow: "PHOENIX / TALLER DE CUCHILLERÍA",
      ageTitle: "Confirma tu edad",
      ageText: "Al continuar, confirmas que eres mayor de edad.",
      ageConfirm: "Tengo 18 años o más",
      ageDecline: "Salir del sitio",
      introText: "RENACIDOS DE LAS CENIZAS",
      brandSubtitle: "COMPAÑÍA DE CUCHILLERÍA",
      languageCaption: "ELEGIR IDIOMA",
      menuCaption: "NAVEGACIÓN",
      menuSearch: "Buscar",
      menuCatalog: "Catálogo",
      menuFavorites: "Favoritos",
      menuCart: "Carrito",
      menuContacts: "Contactos",
      menuTagline: "Forjados por el fuego.<br>Renacidos de las cenizas.",
      footerTagline: "Forjados por el fuego. Renacidos de las cenizas.",
      footerLegal: "Sitio de demostración."
    }
  },

  it: {
    code: "IT",
    htmlLang: "it",
    title: "Phoenix — coltelli forgiati dal fuoco",
    texts: {
      ageEyebrow: "PHOENIX / LABORATORIO DI COLTELLERIA",
      ageTitle: "Conferma la tua età",
      ageText: "Proseguendo, confermi di essere maggiorenne.",
      ageConfirm: "Ho almeno 18 anni",
      ageDecline: "Esci dal sito",
      introText: "RINATI DALLA CENERE",
      brandSubtitle: "AZIENDA DI COLTELLERIA",
      languageCaption: "SCEGLI LA LINGUA",
      menuCaption: "NAVIGAZIONE",
      menuSearch: "Cerca",
      menuCatalog: "Catalogo",
      menuFavorites: "Preferiti",
      menuCart: "Carrello",
      menuContacts: "Contatti",
      menuTagline: "Forgiati dal fuoco.<br>Rinati dalla cenere.",
      footerTagline: "Forgiati dal fuoco. Rinati dalla cenere.",
      footerLegal: "Sito dimostrativo."
    }
  },

  zh: {
    code: "ZH",
    htmlLang: "zh",
    title: "Phoenix — 火焰锻造的刀具",
    texts: {
      ageEyebrow: "PHOENIX / 刀具工坊",
      ageTitle: "确认您的年龄",
      ageText: "继续访问即表示您确认已达到法定年龄。",
      ageConfirm: "我已满18岁",
      ageDecline: "离开网站",
      introText: "浴火重生",
      brandSubtitle: "刀具公司",
      languageCaption: "选择语言",
      menuCaption: "导航",
      menuSearch: "搜索",
      menuCatalog: "目录",
      menuFavorites: "收藏",
      menuCart: "购物车",
      menuContacts: "联系方式",
      menuTagline: "烈火锻造。<br>灰烬重生。",
      footerTagline: "烈火锻造。灰烬重生。",
      footerLegal: "演示网站。"
    }
  },

  ja: {
    code: "JA",
    htmlLang: "ja",
    title: "Phoenix — 炎から生まれたナイフ",
    texts: {
      ageEyebrow: "PHOENIX / ナイフ工房",
      ageTitle: "年齢を確認してください",
      ageText: "続行することで、成人であることを確認します。",
      ageConfirm: "私は18歳以上です",
      ageDecline: "サイトを退出する",
      introText: "灰から再生する",
      brandSubtitle: "ナイフカンパニー",
      languageCaption: "言語を選択",
      menuCaption: "ナビゲーション",
      menuSearch: "検索",
      menuCatalog: "カタログ",
      menuFavorites: "お気に入り",
      menuCart: "カート",
      menuContacts: "お問い合わせ",
      menuTagline: "炎で鍛えられ、<br>灰から再生する。",
      footerTagline: "炎で鍛えられ、灰から再生する。",
      footerLegal: "これはデモサイトです。"
    }
  }
};

/* =========================================
   УТИЛИТЫ
========================================= */

function formatPrice(price) {
  return new Intl.NumberFormat("ru-RU").format(Number(price)) + " ₽";
}

function showToast(message) {
  clearTimeout(toastTimer);

  toast.textContent = message;
  toast.classList.add("is-visible");

  toastTimer = setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 3200);
}

function getProduct(id) {
  return phoenixProducts.find(
    (product) => Number(product.id) === Number(id)
  );
}

function getLocalStorage(key, fallback = []) {
  try {
    const data = JSON.parse(localStorage.getItem(key));
    return Array.isArray(data) ? data : fallback;
  } catch {
    return fallback;
  }
}

function getCart() {
  return getLocalStorage(STORAGE_CART);
}

function saveCart(cart) {
  localStorage.setItem(STORAGE_CART, JSON.stringify(cart));
  updateCounters();
}

function getFavorites() {
  return getLocalStorage(STORAGE_FAVORITES);
}

function saveFavorites(favorites) {
  localStorage.setItem(STORAGE_FAVORITES, JSON.stringify(favorites));
  updateCounters();
}

function getCartCount() {
  return getCart().reduce(
    (sum, item) => sum + Number(item.quantity),
    0
  );
}

function getCartTotal() {
  return getCart().reduce(
    (sum, item) => sum + Number(item.price) * Number(item.quantity),
    0
  );
}

function isFavorite(id) {
  return getFavorites().some((item) => Number(item) === Number(id));
}

function updateCounters() {
  const cartCount = document.getElementById("cartCount");
  const favoriteCount = document.getElementById("favoriteCount");

  if (cartCount) cartCount.textContent = getCartCount();
  if (favoriteCount) favoriteCount.textContent = getFavorites().length;
}

function getKnifeWord(count) {
  const last = count % 10;
  const lastTwo = count % 100;

  if (lastTwo >= 11 && lastTwo <= 14) return "ножей";
  if (last === 1) return "нож";
  if (last >= 2 && last <= 4) return "ножа";

  return "ножей";
}

/* =========================================
   ЯЗЫКИ
========================================= */

function getCurrentLanguage() {
  const saved = localStorage.getItem(STORAGE_LANGUAGE);
  return languages[saved] ? saved : "ru";
}

function closeLanguageSwitcher() {
  languageSwitcher.classList.remove("is-open");
  languageButton.setAttribute("aria-expanded", "false");
}

function translateStaticContent(language) {
  const current = languages[language] || languages.ru;
  const dictionary = current.texts;

  document.documentElement.lang = current.htmlLang;
  document.title = current.title;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    const translation = dictionary[key];

    if (!translation) return;

    if (translation.includes("<br>")) {
      element.innerHTML = translation;
    } else {
      element.textContent = translation;
    }
  });
}

function setLanguage(language) {
  const selected = languages[language] ? language : "ru";

  localStorage.setItem(STORAGE_LANGUAGE, selected);
  languageCurrent.textContent = languages[selected].code;

  document.querySelectorAll(".language-option").forEach((option) => {
    option.classList.toggle(
      "is-active",
      option.dataset.language === selected
    );
  });

  translateStaticContent(selected);
  closeLanguageSwitcher();
}

function initializeLanguageSwitcher() {
  setLanguage(getCurrentLanguage());

  languageButton.addEventListener("click", (event) => {
    event.stopPropagation();

    const isOpen = languageSwitcher.classList.toggle("is-open");

    languageButton.setAttribute("aria-expanded", String(isOpen));
  });

  languageDropdown.addEventListener("click", (event) => {
    const option = event.target.closest("[data-language]");

    if (option) {
      setLanguage(option.dataset.language);
    }
  });

  document.addEventListener("click", (event) => {
    if (!languageSwitcher.contains(event.target)) {
      closeLanguageSwitcher();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeLanguageSwitcher();
    }
  });
}

/* =========================================
   КОРЗИНА И ИЗБРАННОЕ
========================================= */

function addToCart(productId) {
  const product = getProduct(productId);

  if (!product) return;

  const cart = getCart();
  const exists = cart.find(
    (item) => Number(item.id) === Number(productId)
  );

  if (exists) {
    exists.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart(cart);
  showToast(`«${product.name}» добавлен в корзину.`);
}

function updateCartQuantity(productId, quantity) {
  const cart = getCart();
  const product = cart.find(
    (item) => Number(item.id) === Number(productId)
  );

  if (!product) return;

  if (quantity <= 0) {
    saveCart(
      cart.filter((item) => Number(item.id) !== Number(productId))
    );
    return;
  }

  product.quantity = quantity;
  saveCart(cart);
}

function toggleFavorite(productId) {
  const product = getProduct(productId);

  if (!product) return;

  let favorites = getFavorites();

  if (isFavorite(productId)) {
    favorites = favorites.filter(
      (id) => Number(id) !== Number(productId)
    );

    saveFavorites(favorites);
    showToast("Нож удалён из избранного.");
    return;
  }

  favorites.push(Number(productId));
  saveFavorites(favorites);
  showToast(`«${product.name}» добавлен в избранное.`);
}

/* =========================================
   ШАБЛОН КАРТОЧКИ ТОВАРА
========================================= */

function productCard(product, index = 0) {
  const favorite = isFavorite(product.id);

  return `
    <article class="catalog-card">
      <button
        class="favorite-button ${favorite ? "is-active" : ""}"
        type="button"
        data-action="favorite"
        data-id="${product.id}"
        aria-label="Добавить в избранное"
      >
        ${favorite ? "♥" : "♡"}
      </button>

      <a
        class="catalog-card__image"
        href="#product/${product.id}"
        aria-label="Открыть товар ${product.name}"
      >
        <img src="${product.image}" alt="${product.name}">

        <span class="catalog-card__number">
          ${String(index + 1).padStart(2, "0")}
        </span>
      </a>

      <div class="catalog-card__content">
        <p class="catalog-card__category">${product.category}</p>

        <a href="#product/${product.id}">
          <h3>${product.name}</h3>
        </a>

        <div class="catalog-card__specs">
          <span>${product.steel}</span>
          <span>${product.blade}</span>
          <span>${product.handleName}</span>
        </div>

        <div class="catalog-card__bottom">
          <strong>${formatPrice(product.price)}</strong>

          <button
            class="catalog-card__cart-button action-control action-control--text"
            type="button"
            data-action="cart"
            data-id="${product.id}"
          >
            В корзину <span>+</span>
          </button>
        </div>
      </div>
    </article>
  `;
}

/* =========================================
   ГЛАВНАЯ
========================================= */

function renderHome() {
  document.title = "Phoenix — ножи, скованные огнём";

  app.innerHTML = `
    <section class="hero" id="home">
      <div class="hero__fire"></div>
      <div class="hero__grid"></div>

      <div class="hero__content">
        <p class="eyebrow">НОЖЕВАЯ КОМПАНИЯ / EST. 2026</p>

        <h1>
          Рождённые в огне.<br>
          <em>Созданные для вас.</em>
        </h1>

        <p class="hero__description">
          Авторские ножи с характером. Клинки, в которых соединились
          сталь, огонь и индивидуальность владельца.
        </p>

        <div class="hero__buttons">
          <a href="#constructor" class="button button--fire">
            Создать свой нож
          </a>

          <a href="#catalog" class="button button--ghost">
            Смотреть коллекцию
          </a>
        </div>
      </div>

      <div class="hero__knife" aria-hidden="true">
        <div class="hero__knife-glow"></div>
        <div class="hero__knife-blade"></div>
        <div class="hero__knife-handle"></div>
      </div>
    </section>

    <section class="collection section">
      <div class="section-heading">
        <div>
          <p class="eyebrow">ИЗБРАННАЯ КОЛЛЕКЦИЯ</p>
          <h2>Клинки с<br><em>историей.</em></h2>
        </div>

        <a href="#catalog" class="text-link">
          Весь каталог <span>→</span>
        </a>
      </div>

      <div class="knife-grid">
        ${phoenixProducts
          .slice(0, 3)
          .map((product, index) => productCard(product, index))
          .join("")}
      </div>
    </section>

    <section class="video-section section">
      <div class="video-placeholder">
        <div class="video-placeholder__overlay"></div>
        <div class="video-placeholder__forge">PHOENIX FORGE</div>

        <button
          class="play-button"
          type="button"
          data-action="video"
          aria-label="Открыть видео"
        >
          ▶
        </button>

        <div class="video-placeholder__text">
          <p class="eyebrow">ПРОЦЕСС СОЗДАНИЯ</p>
          <h2>Там, где металл<br>обретает <em>душу.</em></h2>
        </div>
      </div>
    </section>

    ${constructorTemplate()}

    <section class="contacts section" id="contacts">
      <p class="eyebrow">СВЯЗАТЬСЯ С НАМИ</p>

      <h2>Ваш клинок<br>начинается <em>с идеи.</em></h2>

      <div class="contacts__grid">
        <a href="tel:+79990000000">+7 (999) 000-00-00</a>
        <a href="mailto:hello@phoenix-knives.ru">
          hello@phoenix-knives.ru
        </a>
        <a href="#">Telegram</a>
        <a href="#">VK</a>
      </div>
    </section>
  `;

  initConstructor();
}

/* =========================================
   КОНСТРУКТОР: HTML
========================================= */

function constructorTemplate() {
  return `
    <section class="constructor section" id="constructor">
      <div class="section-heading constructor__heading">
        <div>
          <p class="eyebrow">ИНДИВИДУАЛЬНЫЙ ЗАКАЗ</p>
          <h2>Создайте<br><em>свой феникс.</em></h2>
        </div>

        <p class="constructor__description">
          Выберите каждый элемент будущего клинка:
          от стали до персональной гравировки.
        </p>
      </div>

      <div class="constructor-app">
        <aside class="constructor-steps">
          <button class="step is-active" type="button" data-step="1">
            <span>01</span> Сталь
          </button>

          <button class="step" type="button" data-step="2">
            <span>02</span> Клинок
          </button>

          <button class="step" type="button" data-step="3">
            <span>03</span> Рукоять
          </button>

          <button class="step" type="button" data-step="4">
            <span>04</span> Гравировка
          </button>

          <button class="step" type="button" data-step="5">
            <span>05</span> Ножны
          </button>

          <button class="step" type="button" data-step="6">
            <span>06</span> Итог
          </button>
        </aside>

        <div class="constructor-main">
          <div class="constructor-preview">
            <div class="preview-fire"></div>

            <div class="custom-knife">
              <div class="custom-knife__blade"></div>
              <div class="custom-knife__guard"></div>
              <div class="custom-knife__handle"></div>
              <div
                class="custom-knife__engraving"
                id="engravingPreview"
              ></div>
            </div>

            <p class="constructor-preview__title">
              PHOENIX / CUSTOM SERIES
            </p>
          </div>

          <div class="constructor-controls">
            <div class="control-panel is-active" data-panel="1">
              <p class="eyebrow">ШАГ 01 / ОСНОВА КЛИНКА</p>
              <h3>Выберите сталь</h3>

              <div class="options-grid">
                <button class="option is-selected" type="button" data-type="steel" data-value="M390">
                  <strong>M390</strong>
                  <span>Премиальная порошковая сталь</span>
                </button>

                <button class="option" type="button" data-type="steel" data-value="D2">
                  <strong>D2</strong>
                  <span>Высокая износостойкость</span>
                </button>

                <button class="option" type="button" data-type="steel" data-value="N690">
                  <strong>N690</strong>
                  <span>Коррозионная стойкость</span>
                </button>

                <button class="option" type="button" data-type="steel" data-value="Damascus">
                  <strong>Damascus</strong>
                  <span>Узорчатая дамасская сталь</span>
                </button>
              </div>
            </div>

            <div class="control-panel" data-panel="2">
              <p class="eyebrow">ШАГ 02 / ХАРАКТЕР КЛИНКА</p>
              <h3>Выберите форму</h3>

              <div class="options-grid">
                <button class="option is-selected" type="button" data-type="blade" data-value="Drop Point">
                  <strong>Drop Point</strong>
                  <span>Универсальная форма</span>
                </button>

                <button class="option" type="button" data-type="blade" data-value="Tanto">
                  <strong>Tanto</strong>
                  <span>Выраженная геометрия</span>
                </button>

                <button class="option" type="button" data-type="blade" data-value="Clip Point">
                  <strong>Clip Point</strong>
                  <span>Точный рез и прокол</span>
                </button>

                <button class="option" type="button" data-type="blade" data-value="Bowie">
                  <strong>Bowie</strong>
                  <span>Классическая форма с характером</span>
                </button>
              </div>
            </div>

            <div class="control-panel" data-panel="3">
              <p class="eyebrow">ШАГ 03 / РУКОЯТЬ</p>
              <h3>Выберите материал</h3>

              <div class="options-grid">
                <button class="option is-selected" type="button" data-type="handle" data-value="Чёрный граб">
                  <strong>Чёрный граб</strong>
                  <span>Глубокая природная текстура</span>
                </button>

                <button class="option" type="button" data-type="handle" data-value="Американский орех">
                  <strong>Американский орех</strong>
                  <span>Тёплый благородный оттенок</span>
                </button>

                <button class="option" type="button" data-type="handle" data-value="G10">
                  <strong>G10</strong>
                  <span>Прочный композитный материал</span>
                </button>

                <button class="option" type="button" data-type="handle" data-value="Micarta">
                  <strong>Micarta</strong>
                  <span>Фактурный материал для уверенного хвата</span>
                </button>
              </div>
            </div>

            <div class="control-panel" data-panel="4">
              <p class="eyebrow">ШАГ 04 / ЛИЧНЫЙ ЗНАК</p>
              <h3>Добавьте гравировку</h3>

              <label class="engraving-label">
                Текст или инициалы

                <input
                  id="engravingInput"
                  type="text"
                  maxlength="20"
                  placeholder="Например: A. K. / 2026"
                >
              </label>

              <button
                class="skip-engraving"
                type="button"
                data-action="skip-engraving"
              >
                Продолжить без гравировки
              </button>
            </div>

            <div class="control-panel" data-panel="5">
              <p class="eyebrow">ШАГ 05 / ЗАЩИТА КЛИНКА</p>
              <h3>Выберите ножны</h3>

              <div class="options-grid">
                <button class="option is-selected" type="button" data-type="sheath" data-value="Натуральная кожа">
                  <strong>Натуральная кожа</strong>
                  <span>Классические ножны ручной работы</span>
                </button>

                <button class="option" type="button" data-type="sheath" data-value="Kydex">
                  <strong>Kydex</strong>
                  <span>Надёжный современный материал</span>
                </button>

                <button class="option" type="button" data-type="sheath" data-value="Без ножен">
                  <strong>Без ножен</strong>
                  <span>Только клинок и рукоять</span>
                </button>
              </div>
            </div>

            <div class="control-panel" data-panel="6">
              <p class="eyebrow">ВАШ ИНДИВИДУАЛЬНЫЙ КЛИНОК</p>
              <h3>Феникс создан.</h3>

              <ul class="summary-list">
                <li><span>Сталь</span><strong id="summarySteel">M390</strong></li>
                <li><span>Форма клинка</span><strong id="summaryBlade">Drop Point</strong></li>
                <li><span>Рукоять</span><strong id="summaryHandle">Чёрный граб</strong></li>
                <li><span>Гравировка</span><strong id="summaryEngraving">Не выбрана</strong></li>
                <li><span>Ножны</span><strong id="summarySheath">Натуральная кожа</strong></li>
              </ul>

              <button
                class="button button--fire"
                type="button"
                data-action="request"
              >
                Оставить заявку на создание
              </button>
            </div>

            <div class="constructor-navigation">
              <button class="nav-button" id="prevStep" type="button">
                ← Назад
              </button>

              <span id="stepCounter">01 / 06</span>

              <button class="nav-button" id="nextStep" type="button">
                Далее →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

/* =========================================
   КОНСТРУКТОР: ЛОГИКА
========================================= */

function initConstructor() {
  const steps = [...document.querySelectorAll(".step")];

  if (!steps.length) return;

  const panels = [...document.querySelectorAll(".control-panel")];
  const prevButton = document.getElementById("prevStep");
  const nextButton = document.getElementById("nextStep");
  const counter = document.getElementById("stepCounter");
  const engravingInput = document.getElementById("engravingInput");
  const engravingPreview = document.getElementById("engravingPreview");
  const blade = document.querySelector(".custom-knife__blade");
  const handle = document.querySelector(".custom-knife__handle");

  let step = 1;

  const config = {
    steel: "M390",
    blade: "Drop Point",
    handle: "Чёрный граб",
    engraving: "Не выбрана",
    sheath: "Натуральная кожа"
  };

  function updateSummary() {
    document.getElementById("summarySteel").textContent = config.steel;
    document.getElementById("summaryBlade").textContent = config.blade;
    document.getElementById("summaryHandle").textContent = config.handle;
    document.getElementById("summaryEngraving").textContent = config.engraving;
    document.getElementById("summarySheath").textContent = config.sheath;
  }

  function renderStep() {
    steps.forEach((item) => {
      item.classList.toggle(
        "is-active",
        Number(item.dataset.step) === step
      );
    });

    panels.forEach((item) => {
      item.classList.toggle(
        "is-active",
        Number(item.dataset.panel) === step
      );
    });

    prevButton.disabled = step === 1;
    nextButton.style.visibility = step === 6 ? "hidden" : "visible";
    counter.textContent = `${String(step).padStart(2, "0")} / 06`;

    updateSummary();
  }

  function setHandleStyle(value) {
    const styles = {
      "Чёрный граб":
        "repeating-linear-gradient(90deg, rgba(255,176,82,.07) 0 3px, transparent 3px 10px), linear-gradient(180deg,#4d2517,#160f0b 46%,#532918)",

      "Американский орех":
        "repeating-linear-gradient(90deg, rgba(255,176,82,.07) 0 3px, transparent 3px 10px), linear-gradient(180deg,#8b4c2a,#32170d 48%,#633016)",

      G10:
        "repeating-linear-gradient(90deg, rgba(255,255,255,.05) 0 3px, transparent 3px 10px), linear-gradient(180deg,#2b2f30,#090909 48%,#383d3e)",

      Micarta:
        "repeating-linear-gradient(90deg, rgba(255,255,255,.06) 0 3px, transparent 3px 10px), linear-gradient(180deg,#826c50,#2a2119 48%,#5a4633)"
    };

    handle.style.background = styles[value] || styles["Чёрный граб"];
  }

  function setSteelStyle(value) {
    if (value === "Damascus") {
      blade.style.background =
        "repeating-linear-gradient(170deg,#e2d5c1 0 5px,#55504a 5px 9px,#b3a692 9px 12px)";
    } else {
      blade.style.background =
        "linear-gradient(180deg,#ddd1bd,#4d4b48 48%,#1d1c1b 51%,#b9ad9c)";
    }
  }

  steps.forEach((item) => {
    item.addEventListener("click", () => {
      step = Number(item.dataset.step);
      renderStep();
    });
  });

  prevButton.addEventListener("click", () => {
    if (step > 1) {
      step -= 1;
      renderStep();
    }
  });

  nextButton.addEventListener("click", () => {
    if (step < 6) {
      step += 1;
      renderStep();
    }
  });

  document.querySelectorAll(".option").forEach((option) => {
    option.addEventListener("click", () => {
      const { type, value } = option.dataset;

      document
        .querySelectorAll(`.option[data-type="${type}"]`)
        .forEach((item) => item.classList.remove("is-selected"));

      option.classList.add("is-selected");
      config[type] = value;

      if (type === "steel") setSteelStyle(value);
      if (type === "handle") setHandleStyle(value);

      updateSummary();
    });
  });

  engravingInput.addEventListener("input", () => {
    const text = engravingInput.value.trim();

    config.engraving = text || "Не выбрана";
    engravingPreview.textContent = text;

    updateSummary();
  });

  renderStep();
}

/* =========================================
   КАТАЛОГ
========================================= */

function renderCatalog() {
  document.title = "Каталог ножей — Phoenix";

  app.innerHTML = `
    <main class="inner-page">
      <section class="catalog-page">
        <div class="catalog-hero">
          <p class="eyebrow">PHOENIX / COLLECTION</p>

          <h1>Каталог<br><em>клинков.</em></h1>

          <p class="catalog-hero__description">
            Коллекция ножей Phoenix: охотничьи, туристические,
            тактические и авторские модели.
          </p>
        </div>

        <div class="catalog-categories" id="catalogCategories">
          <button class="catalog-category is-active" type="button" data-category="all">
            Все модели
          </button>

          <button class="catalog-category" type="button" data-category="hunting">
            Охотничьи
          </button>

          <button class="catalog-category" type="button" data-category="tactical">
            Тактические
          </button>

          <button class="catalog-category" type="button" data-category="author">
            Авторские
          </button>

          <button class="catalog-category" type="button" data-category="tourism">
            Туристические
          </button>
        </div>

        <div class="catalog-layout">
          <aside class="catalog-filters">
            <div class="catalog-filters__head">
              <p class="eyebrow">ФИЛЬТРЫ</p>
              <span>PHX</span>
            </div>

            <div class="filter-group">
              <h3>Сталь</h3>

              ${["M390", "D2", "N690", "Damascus"]
                .map(
                  (steel) => `
                    <label class="filter-checkbox">
                      <input type="checkbox" data-steel value="${steel}">
                      <span class="filter-checkbox__mark"></span>
                      ${steel}
                    </label>
                  `
                )
                .join("")}
            </div>

            <div class="filter-group">
              <h3>Форма клинка</h3>

              ${["Drop Point", "Tanto", "Clip Point", "Bowie"]
                .map(
                  (blade) => `
                    <label class="filter-checkbox">
                      <input type="checkbox" data-blade value="${blade}">
                      <span class="filter-checkbox__mark"></span>
                      ${blade}
                    </label>
                  `
                )
                .join("")}
            </div>

            <div class="filter-group">
              <div class="filter-group__title">
                <h3>Цена</h3>
                <span id="priceValue">до 45 000 ₽</span>
              </div>

              <input
                class="price-range"
                id="priceRange"
                type="range"
                min="18000"
                max="45000"
                value="45000"
                step="1000"
                style="--range-progress: 100%;"
                aria-label="Максимальная цена"
              >
            </div>
          </aside>

          <section class="catalog-content">
            <div class="catalog-content__top">
              <div>
                <p class="eyebrow">КОЛЛЕКЦИЯ PHOENIX</p>
                <span class="catalog-count" id="catalogCount"></span>
              </div>

              <label class="catalog-sort">
                Сортировка

                <select id="catalogSort">
                  <option value="default">По умолчанию</option>
                  <option value="price-asc">Сначала дешевле</option>
                  <option value="price-desc">Сначала дороже</option>
                  <option value="name">По названию</option>
                </select>
              </label>
            </div>

            <div class="catalog-grid" id="catalogGrid"></div>

            <div class="catalog-empty" id="catalogEmpty">
              <p class="eyebrow">НЕТ СОВПАДЕНИЙ</p>
              <h2>Огонь знает<br><em>другой путь.</em></h2>
              <p>Попробуйте изменить фильтры.</p>
            </div>
          </section>
        </div>
      </section>
    </main>
  `;

  let category = "all";
  let steels = [];
  let blades = [];
  let maxPrice = 45000;
  let sorting = "default";

  function redraw() {
    let products = [...phoenixProducts];

    if (category !== "all") {
      products = products.filter(
        (item) => item.categoryCode === category
      );
    }

    if (steels.length) {
      products = products.filter(
        (item) => steels.includes(item.steel)
      );
    }

    if (blades.length) {
      products = products.filter(
        (item) => blades.includes(item.blade)
      );
    }

    products = products.filter((item) => item.price <= maxPrice);

    if (sorting === "price-asc") {
      products.sort((a, b) => a.price - b.price);
    }

    if (sorting === "price-desc") {
      products.sort((a, b) => b.price - a.price);
    }

    if (sorting === "name") {
      products.sort((a, b) => a.name.localeCompare(b.name));
    }

    document.getElementById("catalogGrid").innerHTML = products
      .map((product, index) => productCard(product, index))
      .join("");

    document.getElementById("catalogCount").textContent =
      `${products.length} ${getKnifeWord(products.length)}`;

    document
      .getElementById("catalogEmpty")
      .classList.toggle("is-visible", products.length === 0);
  }

  document.querySelectorAll("[data-category]").forEach((button) => {
    button.addEventListener("click", () => {
      category = button.dataset.category;

      document.querySelectorAll("[data-category]").forEach((item) => {
        item.classList.remove("is-active");
      });

      button.classList.add("is-active");
      redraw();
    });
  });

  document.querySelectorAll("[data-steel]").forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      steels = [...document.querySelectorAll("[data-steel]:checked")].map(
        (item) => item.value
      );

      redraw();
    });
  });

  document.querySelectorAll("[data-blade]").forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      blades = [...document.querySelectorAll("[data-blade]:checked")].map(
        (item) => item.value
      );

      redraw();
    });
  });

  const priceRange = document.getElementById("priceRange");

  function updatePriceRange(range) {
    const min = Number(range.min);
    const max = Number(range.max);
    const value = Number(range.value);

    const progress = ((value - min) / (max - min)) * 100;

    range.style.setProperty("--range-progress", `${progress}%`);
  }

  priceRange.addEventListener("input", (event) => {
    maxPrice = Number(event.target.value);

    updatePriceRange(event.target);

    document.getElementById("priceValue").textContent =
      `до ${formatPrice(maxPrice)}`;

    redraw();
  });

  document.getElementById("catalogSort").addEventListener("change", (event) => {
    sorting = event.target.value;
    redraw();
  });

  updatePriceRange(priceRange);
  redraw();
}

/* =========================================
   ПОИСК
========================================= */

function renderSearch() {
  document.title = "Поиск — Phoenix";

  app.innerHTML = `
    <section class="search-page">
      <section class="search-hero">
        <p class="eyebrow">PHOENIX / SEARCH</p>
        <h1>Найдите<br><em>свой клинок.</em></h1>

        <p>
          Ищите нож по названию, стали, форме клинка
          или материалу рукояти.
        </p>

        <form class="search-form" id="searchForm">
          <input
            id="searchInput"
            type="search"
            autocomplete="off"
            placeholder="Например: M390, охотник, Damascus..."
          >

          <button type="submit">→</button>
        </form>
      </section>

      <section class="search-results-section">
        <div class="search-results-heading">
          <div>
            <p class="eyebrow">РЕЗУЛЬТАТЫ ПОИСКА</p>
            <h2 id="searchTitle">Начните поиск.</h2>
          </div>

          <span id="searchCount">Введите запрос</span>
        </div>

        <div class="search-results-grid" id="searchGrid"></div>
      </section>
    </section>
  `;

  const input = document.getElementById("searchInput");

  function search() {
    const query = input.value.trim().toLowerCase();
    const title = document.getElementById("searchTitle");
    const count = document.getElementById("searchCount");
    const grid = document.getElementById("searchGrid");

    if (!query) {
      title.textContent = "Начните поиск.";
      count.textContent = "Введите запрос";
      grid.innerHTML = "";
      return;
    }

    const products = phoenixProducts.filter((product) =>
      [
        product.name,
        product.category,
        product.steel,
        product.blade,
        product.handleName,
        product.sheath,
        product.description
      ]
        .join(" ")
        .toLowerCase()
        .includes(query)
    );

    title.innerHTML = `Результаты для <em>«${input.value.trim()}»</em>`;
    count.textContent = `${products.length} ${getKnifeWord(products.length)}`;

    grid.innerHTML = products
      .map((product, index) => productCard(product, index))
      .join("");
  }

  document.getElementById("searchForm").addEventListener("submit", (event) => {
    event.preventDefault();
    search();
  });

  input.addEventListener("input", search);
}

/* =========================================
   ИЗБРАННОЕ
========================================= */

function renderFavorites() {
  document.title = "Избранное — Phoenix";

  const products = getFavorites()
    .map((id) => getProduct(id))
    .filter(Boolean);

  app.innerHTML = `
    <section class="favorites-page">
      <section class="favorites-hero">
        <p class="eyebrow">PHOENIX / SELECTED</p>
        <h1>Избранные<br><em>клинки.</em></h1>

        <p class="favorites-hero__description">
          Здесь сохраняются ножи, к которым хочется вернуться.
        </p>
      </section>

      <section class="favorites-content">
        ${
          products.length
            ? `
              <div class="favorites-content__heading">
                <p class="eyebrow">ВАША КОЛЛЕКЦИЯ</p>

                <button
                  class="list-clear-button action-control"
                  type="button"
                  data-action="clear-favorites"
                >
                  <span>Очистить избранное</span>
                  <b>×</b>
                </button>
              </div>

              <div class="favorites-grid">
                ${products
                  .map((product, index) => productCard(product, index))
                  .join("")}
              </div>
            `
            : `
              <div class="favorites-empty is-visible">
                <p class="eyebrow">ПОКА ПУСТО</p>
                <h2>Здесь появятся<br><em>ваши клинки.</em></h2>
                <p>Нажмите на сердце в карточке товара.</p>

                <a href="#catalog" class="button button--fire">
                  Перейти в каталог
                </a>
              </div>
            `
        }
      </section>
    </section>
  `;
}

/* =========================================
   КОРЗИНА
========================================= */

function renderCart() {
  document.title = "Корзина — Phoenix";

  const cart = getCart();

  app.innerHTML = `
    <section class="cart-page">
      <section class="cart-hero">
        <p class="eyebrow">PHOENIX / CART</p>
        <h1>Корзина<br><em>заказа.</em></h1>
      </section>

      ${
        cart.length
          ? `
            <section class="cart-layout">
              <div class="cart-content">
                <div class="favorites-content__heading">
                  <p class="eyebrow">ВАШ ВЫБОР</p>

                  <button
                    class="list-clear-button action-control"
                    type="button"
                    data-action="clear-cart"
                  >
                    <span>Очистить корзину</span>
                    <b>×</b>
                  </button>
                </div>

                <div class="cart-items">
                  ${cart
                    .map(
                      (product) => `
                        <article class="cart-item">
                          <a class="cart-item__image" href="#product/${product.id}">
                            <img src="${product.image}" alt="${product.name}">
                          </a>

                          <div class="cart-item__main">
                            <p class="catalog-card__category">${product.category}</p>

                            <a href="#product/${product.id}">
                              <h3>${product.name}</h3>
                            </a>

                            <div class="cart-item__specs">
                              <span>${product.steel}</span>
                              <span>${product.blade}</span>
                            </div>
                          </div>

                          <div class="cart-item__quantity">
                            <div class="quantity-control">
                              <button
                                class="quantity-control__button"
                                type="button"
                                data-action="quantity-minus"
                                data-id="${product.id}"
                                aria-label="Уменьшить количество"
                              >
                                −
                              </button>

                              <span class="quantity-control__value">
                                ${product.quantity}
                              </span>

                              <button
                                class="quantity-control__button"
                                type="button"
                                data-action="quantity-plus"
                                data-id="${product.id}"
                                aria-label="Увеличить количество"
                              >
                                +
                              </button>
                            </div>
                          </div>

                          <div class="cart-item__price">
                            <strong>
                              ${formatPrice(product.price * product.quantity)}
                            </strong>
                          </div>

                          <button
                            class="cart-item__remove action-control"
                            type="button"
                            data-action="remove-cart"
                            data-id="${product.id}"
                            aria-label="Удалить товар из корзины"
                          >
                            ×
                          </button>
                        </article>
                      `
                    )
                    .join("")}
                </div>
              </div>

              <aside class="cart-summary">
                <p class="eyebrow">ИТОГ ЗАКАЗА</p>

                <div class="product-hero__price">
                  <span>Итого</span>
                  <strong>${formatPrice(getCartTotal())}</strong>
                </div>

                <button
                  class="button button--fire"
                  type="button"
                  data-action="checkout"
                >
                  Оставить заявку
                </button>
              </aside>
            </section>
          `
          : `
            <section class="cart-empty is-visible">
              <p class="eyebrow">КОРЗИНА ПУСТА</p>
              <h2>Время выбрать<br><em>свой клинок.</em></h2>
              <p>Откройте каталог и добавьте понравившийся нож.</p>

              <a href="#catalog" class="button button--fire">
                Перейти в каталог
              </a>
            </section>
          `
      }
    </section>
  `;
}

/* =========================================
   СТРАНИЦА ТОВАРА
========================================= */

function renderProduct(id) {
  const product = getProduct(id);

  if (!product) {
    app.innerHTML = `
      <section class="product-not-found is-visible">
        <p class="eyebrow">ОШИБКА 404</p>
        <h1>Клинок не найден.</h1>

        <a href="#catalog" class="button button--fire">
          Вернуться в каталог
        </a>
      </section>
    `;

    return;
  }

  const related = phoenixProducts
    .filter((item) => item.id !== product.id)
    .slice(0, 3);

  app.innerHTML = `
    <section class="product-page">
      <section class="product-hero">
        <a href="#catalog" class="product-back-link">
          ← Вернуться в каталог
        </a>

        <div class="product-hero__visual">
          <img
            class="product-hero__image"
            src="${product.image}"
            alt="${product.name}"
          >
        </div>

        <div class="product-hero__info">
          <p class="eyebrow">${product.category}</p>
          <h1>${product.name}</h1>

          <p class="product-hero__description">
            ${product.description}
          </p>

          <div class="product-hero__price">
            <span>Стоимость</span>
            <strong>${formatPrice(product.price)}</strong>
          </div>

          <div class="product-hero__actions">
            <button
              class="button button--fire"
              type="button"
              data-action="cart"
              data-id="${product.id}"
            >
              Добавить в корзину
            </button>

            <button
              class="product-favorite-button ${isFavorite(product.id) ? "is-active" : ""}"
              type="button"
              data-action="favorite"
              data-id="${product.id}"
            >
              ${isFavorite(product.id) ? "♥" : "♡"}
            </button>
          </div>
        </div>
      </section>

      <section class="product-details">
        <div>
          <p class="eyebrow">ХАРАКТЕРИСТИКИ</p>
          <h2>
            Детали, из которых<br>
            рождается <em>характер.</em>
          </h2>
        </div>

        <div class="product-specifications">
          <div class="product-specification">
            <span>Сталь</span>
            <strong>${product.steel}</strong>
          </div>

          <div class="product-specification">
            <span>Форма клинка</span>
            <strong>${product.blade}</strong>
          </div>

          <div class="product-specification">
            <span>Рукоять</span>
            <strong>${product.handleName}</strong>
          </div>

          <div class="product-specification">
            <span>Общая длина</span>
            <strong>${product.length}</strong>
          </div>

          <div class="product-specification">
            <span>Длина клинка</span>
            <strong>${product.bladeLength}</strong>
          </div>

          <div class="product-specification">
            <span>Ножны</span>
            <strong>${product.sheath}</strong>
          </div>
        </div>
      </section>

      <section class="related-products">
        <div class="related-products__heading">
          <div>
            <p class="eyebrow">ПРОДОЛЖЕНИЕ КОЛЛЕКЦИИ</p>
            <h2>Вам может<br><em>понравиться.</em></h2>
          </div>

          <a href="#catalog" class="text-link">
            Весь каталог <span>→</span>
          </a>
        </div>

        <div class="related-products__grid">
          ${related
            .map((item, index) => productCard(item, index))
            .join("")}
        </div>
      </section>
    </section>
  `;
}

/* =========================================
   МЕНЮ
========================================= */

function syncScrollLock() {
  const ageVisible = !ageModal.classList.contains("is-hidden");
  const menuOpen = menu.classList.contains("is-open");

  document.body.classList.toggle(
    "no-scroll",
    ageVisible || menuOpen
  );
}

function openMenu() {
  closeLanguageSwitcher();

  menu.classList.add("is-open");
  menuToggle.setAttribute("aria-expanded", "true");

  syncScrollLock();
}

function closeMenu() {
  menu.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");

  syncScrollLock();
}

menuToggle.addEventListener("click", () => {
  if (menu.classList.contains("is-open")) {
    closeMenu();
  } else {
    openMenu();
  }
});

menuClose.addEventListener("click", closeMenu);

document.querySelectorAll(".menu__link").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

/* =========================================
   ОБЩИЕ КЛИКИ
========================================= */

document.addEventListener("click", (event) => {
  const button = event.target.closest("[data-action]");

  if (!button) return;

  const action = button.dataset.action;
  const id = Number(button.dataset.id);

  if (action === "cart") {
    addToCart(id);
    return;
  }

  if (action === "favorite") {
    toggleFavorite(id);

    const route = getRoute()[0];

    if (route === "favorites") {
      renderFavorites();
    } else {
      renderRoute();
    }

    return;
  }

  if (action === "remove-cart") {
    saveCart(
      getCart().filter((item) => Number(item.id) !== id)
    );

    renderCart();
    showToast("Товар удалён из корзины.");
    return;
  }

  if (action === "quantity-plus") {
    const item = getCart().find(
      (product) => Number(product.id) === id
    );

    if (item) {
      updateCartQuantity(id, Number(item.quantity) + 1);
    }

    renderCart();
    return;
  }

  if (action === "quantity-minus") {
    const item = getCart().find(
      (product) => Number(product.id) === id
    );

    if (item) {
      updateCartQuantity(id, Number(item.quantity) - 1);
    }

    renderCart();
    return;
  }

  if (action === "clear-cart") {
    event.preventDefault();

    if (confirm("Очистить корзину?")) {
      saveCart([]);
      renderCart();
      showToast("Корзина очищена.");
    }

    return;
  }

  if (action === "clear-favorites") {
    event.preventDefault();

    if (confirm("Очистить избранное?")) {
      saveFavorites([]);
      renderFavorites();
      showToast("Избранное очищено.");
    }

    return;
  }

  if (action === "skip-engraving") {
    document.getElementById("engravingInput").value = "";
    document.getElementById("engravingPreview").textContent = "";
    document.querySelector('[data-step="5"]').click();

    return;
  }

  if (action === "request" || action === "checkout") {
    showToast(
      "Заявка сформирована. Здесь будет подключена форма контактов."
    );

    return;
  }

  if (action === "video") {
    showToast("Здесь будет размещено видео о создании клинков.");
  }
});

/* =========================================
   МАРШРУТИЗАЦИЯ
========================================= */

function getRoute() {
  const hash = window.location.hash.replace("#", "") || "home";
  return hash.split("/");
}

function updateMenuActiveState(route) {
  document.querySelectorAll(".menu__link").forEach((link) => {
    link.classList.toggle(
      "menu__link--active",
      link.dataset.route === route
    );
  });
}

function renderRoute() {
  const [route, parameter] = getRoute();

  closeMenu();

  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "auto"
  });

  updateMenuActiveState(route);

  if (route === "catalog") {
    renderCatalog();
  } else if (route === "search") {
    renderSearch();
  } else if (route === "favorites") {
    renderFavorites();
  } else if (route === "cart") {
    renderCart();
  } else if (route === "product") {
    renderProduct(Number(parameter));
  } else if (route === "constructor") {
    renderHome();

    setTimeout(() => {
      document
        .getElementById("constructor")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
    }, 80);
  } else if (route === "contacts") {
    renderHome();

    setTimeout(() => {
      document
        .getElementById("contacts")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
    }, 80);
  } else {
    renderHome();
  }

  updateCounters();
}

window.addEventListener("hashchange", renderRoute);

/* =========================================
   18+ И ЗАСТАВКА
========================================= */

function hideIntro() {
  intro.classList.add("is-hidden");
  syncScrollLock();
}

function runIntro() {
  intro.classList.add("is-leaving");

  setTimeout(hideIntro, 1800);
}

function initializeAgeGate() {
  if (localStorage.getItem(STORAGE_AGE) === "true") {
    ageModal.classList.add("is-hidden");
    intro.classList.add("is-hidden");
  } else {
    ageModal.classList.remove("is-hidden");
    intro.classList.remove("is-hidden");
  }

  syncScrollLock();
}

confirmAge.addEventListener("click", () => {
  localStorage.setItem(STORAGE_AGE, "true");

  ageModal.classList.add("is-hidden");
  syncScrollLock();

  setTimeout(runIntro, 250);
});

declineAge.addEventListener("click", () => {
  document.querySelector(".age-modal__content").innerHTML = `
    <div class="age-modal__symbol">!</div>
    <p class="eyebrow">ДОСТУП ОГРАНИЧЕН</p>
    <h1>До встречи позже.</h1>
    <p>
      Просмотр сайта доступен только совершеннолетним посетителям.
    </p>
  `;
});

/* =========================================
   ПЕРВЫЙ ЗАПУСК
========================================= */

initializeLanguageSwitcher();
initializeAgeGate();
updateCounters();
renderRoute();
