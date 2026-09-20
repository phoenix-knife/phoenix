const ageModal = document.getElementById("ageModal");
const confirmAge = document.getElementById("confirmAge");
const declineAge = document.getElementById("declineAge");

const intro = document.getElementById("intro");

const menuToggle = document.getElementById("menuToggle");
const menu = document.getElementById("menu");
const menuClose = document.getElementById("menuClose");

const steps = [...document.querySelectorAll(".step")];
const panels = [...document.querySelectorAll(".control-panel")];

const prevStepButton = document.getElementById("prevStep");
const nextStepButton = document.getElementById("nextStep");
const stepCounter = document.getElementById("stepCounter");

const engravingInput = document.getElementById("engravingInput");
const engravingPreview = document.getElementById("engravingPreview");
const skipEngraving = document.getElementById("skipEngraving");

const cartCount = document.getElementById("cartCount");
const toast = document.getElementById("toast");

let activeStep = 1;
let cart = 0;
let toastTimer;

const configuration = {
  steel: "M390",
  blade: "Drop Point",
  handle: "Чёрный граб",
  engraving: "Не выбрана",
  sheath: "Натуральная кожа"
};

/* Экран 18+ и заставка */
document.body.classList.add("no-scroll");

confirmAge.addEventListener("click", () => {
  ageModal.classList.add("is-hidden");

  setTimeout(() => {
    intro.classList.add("is-leaving");
  }, 300);

  setTimeout(() => {
    intro.classList.add("is-hidden");
    document.body.classList.remove("no-scroll");
  }, 1900);
});

declineAge.addEventListener("click", () => {
  document.querySelector(".age-modal__content").innerHTML = `
    <div class="age-modal__symbol">!</div>
    <p class="eyebrow">ДОСТУП ОГРАНИЧЕН</p>
    <h1>До встречи позже.</h1>
    <p>Просмотр сайта доступен только совершеннолетним посетителям.</p>
  `;
});

/* Меню */
function toggleMenu() {
  const isOpen = menu.classList.toggle("is-open");

  menuToggle.classList.toggle("is-active", isOpen);
  document.body.classList.toggle("no-scroll", isOpen);
}

menuToggle.addEventListener("click", toggleMenu);
menuClose.addEventListener("click", toggleMenu);

document.querySelectorAll(".menu__link").forEach((link) => {
  link.addEventListener("click", (event) => {
    if (link.classList.contains("menu-action")) {
      event.preventDefault();

      const action = link.dataset.action;

      const messages = {
        search: "Поиск будет подключён в следующей версии демо.",
        catalog: "Полный каталог будет подключён отдельной страницей.",
        favorites: "В избранном пока нет сохранённых ножей.",
        cart: cart > 0
          ? `В корзине товаров: ${cart}.`
          : "Корзина пока пуста.",
        support: "Раздел поддержки будет подключён позже."
      };

      showToast(messages[action]);
    }

    if (menu.classList.contains("is-open")) {
      toggleMenu();
    }
  });
});

document.querySelector(".catalog-link").addEventListener("click", (event) => {
  event.preventDefault();
  showToast("Полный каталог будет доступен отдельной страницей.");
});

/* Избранное */
document.querySelectorAll(".favorite-button").forEach((button) => {
  button.addEventListener("click", () => {
    const active = button.classList.toggle("is-active");

    button.textContent = active ? "♥" : "♡";

    showToast(
      active
        ? "Нож добавлен в избранное."
        : "Нож удалён из избранного."
    );
  });
});

/* Корзина */
document.querySelectorAll(".add-cart").forEach((button) => {
  button.addEventListener("click", () => {
    cart += 1;
    cartCount.textContent = cart;

    const product = button.dataset.product;

    showToast(`«${product}» добавлен в корзину.`);
  });
});

/* Видео */
document.getElementById("playVideo").addEventListener("click", () => {
  showToast("Здесь будет размещено видео о создании клинков.");
});

/* Конструктор */
function updateConstructor() {
  steps.forEach((step) => {
    step.classList.toggle(
      "is-active",
      Number(step.dataset.step) === activeStep
    );
  });

  panels.forEach((panel) => {
    panel.classList.toggle(
      "is-active",
      Number(panel.dataset.panel) === activeStep
    );
  });

  prevStepButton.disabled = activeStep === 1;

  if (activeStep === 6) {
    nextStepButton.style.visibility = "hidden";
    updateSummary();
  } else {
    nextStepButton.style.visibility = "visible";
  }

  stepCounter.textContent = `${String(activeStep).padStart(2, "0")} / 06`;
}

function updateSummary() {
  document.getElementById("summarySteel").textContent = configuration.steel;
  document.getElementById("summaryBlade").textContent = configuration.blade;
  document.getElementById("summaryHandle").textContent = configuration.handle;
  document.getElementById("summaryEngraving").textContent = configuration.engraving;
  document.getElementById("summarySheath").textContent = configuration.sheath;
}

steps.forEach((step) => {
  step.addEventListener("click", () => {
    activeStep = Number(step.dataset.step);
    updateConstructor();
  });
});

nextStepButton.addEventListener("click", () => {
  if (activeStep < 6) {
    activeStep += 1;
    updateConstructor();
  }
});

prevStepButton.addEventListener("click", () => {
  if (activeStep > 1) {
    activeStep -= 1;
    updateConstructor();
  }
});

document.querySelectorAll(".option").forEach((option) => {
  option.addEventListener("click", () => {
    const type = option.dataset.type;
    const value = option.dataset.value;

    document
      .querySelectorAll(`.option[data-type="${type}"]`)
      .forEach((item) => item.classList.remove("is-selected"));

    option.classList.add("is-selected");

    if (type === "steel") {
      configuration.steel = value;
    }

    if (type === "blade") {
      configuration.blade = value;
    }

    if (type === "handle") {
      configuration.handle = value;

      const knifeHandle = document.querySelector(".custom-knife__handle");

      const handleColors = {
        "Чёрный граб":
          "repeating-linear-gradient(90deg, rgba(255, 176, 82, 0.07) 0 3px, transparent 3px 10px), linear-gradient(180deg, #4d2517, #160f0b 46%, #532918)",

        "Американский орех":
          "repeating-linear-gradient(90deg, rgba(255, 176, 82, 0.07) 0 3px, transparent 3px 10px), linear-gradient(180deg, #8b4c2a, #32170d 48%, #633016)",

        "G10":
          "repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.05) 0 3px, transparent 3px 10px), linear-gradient(180deg, #2b2f30, #090909 48%, #383d3e)",

        "Micarta":
          "repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.06) 0 3px, transparent 3px 10px), linear-gradient(180deg, #826c50, #2a2119 48%, #5a4633)"
      };

      knifeHandle.style.background = handleColors[value];
    }

    if (type === "sheath") {
      configuration.sheath = value;
    }

    if (type === "steel") {
      const knifeBlade = document.querySelector(".custom-knife__blade");

      if (value === "Damascus") {
        knifeBlade.style.background =
          "repeating-linear-gradient(170deg, #e2d5c1 0 5px, #55504a 5px 9px, #b3a692 9px 12px)";
      } else {
        knifeBlade.style.background =
          "linear-gradient(180deg, #ddd1bd, #4d4b48 48%, #1d1c1b 51%, #b9ad9c)";
      }
    }
  });
});

/* Гравировка */
engravingInput.addEventListener("input", (event) => {
  const value = event.target.value.trim();

  configuration.engraving = value || "Не выбрана";
  engravingPreview.textContent = value;
});

skipEngraving.addEventListener("click", () => {
  engravingInput.value = "";
  engravingPreview.textContent = "";
  configuration.engraving = "Не выбрана";

  activeStep = 5;
  updateConstructor();
});

/* Заявка */
document.getElementById("sendRequest").addEventListener("click", () => {
  showToast(
    "Заявка сформирована. В рабочей версии здесь откроется форма контактов."
  );
});

/* Уведомления */
function showToast(message) {
  clearTimeout(toastTimer);

  toast.textContent = message;
  toast.classList.add("is-visible");

  toastTimer = setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 3200);
}

updateConstructor();