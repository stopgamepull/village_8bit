document.getElementById("tg").addEventListener("click", function () {
  const url = "https://x.com/8_bitvillage"; // Укажите нужную ссылку
  window.location.href = url; // Переход по указанной ссылке
});


document.addEventListener("DOMContentLoaded", function () {
  // Получаем элементы
  const soundIcon = document.getElementById("sound-icon");
  const audio = document.getElementById("audio");

  // Функция для воспроизведения звука
  function playAudio() {
    audio.play();
    soundIcon.querySelector("img").src = "voice.png"; // Меняем иконку на "звук включен"
  }

  // Воспроизведение музыки при клике на любом месте на странице
  document.addEventListener("click", function () {
    // Если музыка еще не начала играть, запускаем ее
    if (audio.paused) {
      playAudio();
    }
  });

  // При клике на иконку звука меняем состояние воспроизведения
  soundIcon.addEventListener("click", function (event) {
    event.stopPropagation(); // Останавливаем распространение клика на весь документ
    if (audio.paused) {
      playAudio(); // Воспроизводим звук
    } else {
      audio.pause(); // Ставим звук на паузу
      soundIcon.querySelector("img").src = "voiceOff.png"; // Меняем иконку на "звук выключен"
    }
  });
});


document.addEventListener("DOMContentLoaded", function () {
  const citizensList = document.getElementById("citizens-list");
  let citizenIndex = 1; // Индекс для имени гражданина

  // Функция для генерации случайной карточки
  function generateCitizenCard() {
    // Случайная фотография от 1.png до 9.png
    const randomImageIndex = Math.floor(Math.random() * 9) + 1;
    const citizenName = `Citizen__${citizenIndex}`;

    // Создание карточки
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <div class="card-header">
        <img src="./${randomImageIndex}.png" alt="Citizen ${citizenIndex}" class="card-image"/>
        <h3>${citizenName}</h3>
        <p>Rank: 0</p>
      </div>
      <div class="card-info">
        <!-- Здесь можно добавить дополнительные данные о гражданине -->
      </div>
    `;

    // Добавление карточки в начало списка
    citizensList.prepend(card);

    // Увеличиваем индекс для следующего имени
    citizenIndex++;
  }

  // Генерация карточек каждые 3 секунды
  setInterval(generateCitizenCard, 3000);
});

document.getElementById("create-btn").addEventListener("click", function () {
  // Изменение цвета кнопки на красный
  this.classList.add("clicked");

  // Отображение сообщения "Soon"
  const soonMsg = document.getElementById("soon-msg");
  soonMsg.classList.add("visible");
});

const images = [
  "1.png",
  "2.png",
  "3.png",
  "4.png",
  "5.png",
  "6.png",
  "7.png",
  "8.png",
  "9.png",
];

// Элементы
const connectButton = document.getElementById("connect-button");
const generateButton = document.getElementById("generate-button");
const downloadButton = document.getElementById("download-button");
const profileStatus = document.getElementById("profile-status");
const connectSound = document.getElementById("connect-sound");
const avatarDiv = document.querySelector(".avatar");
let currentImage = null;

// Переменная для блокировки генерации
let isAvatarGenerated = false;

// Подключение: проигрывание звука
// Элемент аудио

// Делегирование событий для всех кнопок
document.addEventListener("click", (event) => {
  // Проверяем, является ли цель клика кнопкой
  if (event.target.tagName === "BUTTON") {
    // Создаем новый объект Audio при каждом клике
    const audio = new Audio("misc.wav"); // Укажите путь к вашему звуковому файлу
    audio.play().catch((error) => {
      console.error("Ошибка воспроизведения звука:", error);
    });
  }
});

// Генерация случайного изображения (только один раз)
let citizenCounter = 1; // Счетчик для имени гражданина

generateButton.addEventListener("click", () => {
  if (isAvatarGenerated) {
    return; // Запрещаем повторную генерацию
  }

  // Выбираем случайное изображение
  const randomImage = images[Math.floor(Math.random() * images.length)];
  currentImage = randomImage;

  // Отображаем изображение в div.avatar
  avatarDiv.innerHTML = `<img src="${randomImage}" alt="Avatar">`;

  // Создаем карточку гражданина
  const citizen = {
    id: citizenCounter,
    name: `Citizen_${citizenCounter}`, // Уникальное имя
    image: randomImage,
    price: 0,
  };

  // Увеличиваем счетчик граждан
  citizenCounter++;

  // Добавляем гражданина в список
  userCitizens.push(citizen);

  // Обновляем список граждан
  updateCitizenList();

  // Помечаем, что аватар сгенерирован
  isAvatarGenerated = true;
});

// Скачивание изображения
downloadButton.addEventListener("click", () => {
  if (!currentImage) {
    return;
  }

  const link = document.createElement("a");
  link.href = `${currentImage}`;
  link.download = currentImage;
  link.click();
});

let balance = 0;
let selectedItemId = null;
let selectedItemName = null;
let selectedItemPrice = 0;

// User citizens and marketplace items
let userCitizens = [];
let marketplaceItems = [
  {
    id: 1,
    name: "Gold $PXLVL",
    description:
      "Popular $PXLVL storage method in village, Gold $PXLVL is always equal to 1000$ $PXLVL",
    price: 1000,
    image: "p11.png",
  },
  {
    id: 2,
    name: "Silver $PXLVL",
    description:
      "Popular $PXLVL storage method in village, Silver $PXLVL is always equal to 100$ $PXLVL",
    price: 100,
    image: "p2.png",
  },
  {
    id: 3,
    name: "Experience",
    description: "Boost your profile leaderboard rank in $PXLVL verse.",
    price: 500,
    image: "p3.png",
  },
];

// Update balance display
const balanceDisplay = document.getElementById("balance");

// Switching tabs
document.querySelectorAll(".menu-item").forEach((item) => {
  item.addEventListener("click", () => {
    const tabId = item.getAttribute("data-tab");
    document.querySelectorAll(".tab").forEach((tab) => {
      tab.style.display = tab.id === tabId ? "block" : "none";
    });
  });
});

// Modal handling for item details
const marketplace = document.getElementById("marketplace");
const citizensList = document.getElementById("citizens-list");

// Для открытия модального окна с деталями товара
marketplace.addEventListener("click", (e) => {
  if (e.target.classList.contains("card-btn")) {
    selectedItemId = e.target.getAttribute("data-id");
    selectedItemName = e.target.getAttribute("data-name");
    selectedItemPrice = parseInt(e.target.getAttribute("data-price"));

    const selectedItem = marketplaceItems.find(
      (item) => item.id == selectedItemId
    );

    // Обновляем информацию в модальном окне
    document.getElementById(
      "modal-text"
    ).textContent = `Details for ${selectedItemName}`;
    document.getElementById("modal-description").textContent =
      selectedItem.description;
    document.getElementById(
      "modal-price"
    ).textContent = `$${selectedItem.price}`;
    document.getElementById("buy-btn").style.display = "inline-block";
    document.getElementById("sell-btn").style.display = "none"; // Скрыть кнопку продажи

    document.getElementById("modal").style.display = "flex"; // Показываем модальное окно
  }
});

// Для закрытия модального окна
document.getElementById("close-modal").addEventListener("click", () => {
  document.getElementById("modal").style.display = "none"; // Скрываем модальное окно
});

// Buying item from Marketplace
document.getElementById("buy-btn").addEventListener("click", () => {
  if (balance >= selectedItemPrice) {
    balance -= selectedItemPrice;
    balanceDisplay.textContent = balance;

    // Add item to citizens after purchase
    const purchasedItem = marketplaceItems.find(
      (item) => item.id == selectedItemId
    );
    userCitizens.push(purchasedItem);

    // Remove purchased item from marketplace
    marketplaceItems = marketplaceItems.filter(
      (item) => item.id !== selectedItemId
    );

    updateCitizenList();
    updateMarketplace();
    showSuccessMessage(`You bought ${selectedItemName}`);
    document.getElementById("modal").style.display = "none";
  } else {
    showSuccessMessage("Not enough balance!");
  }
});

// Function to update the citizens list
function updateCitizenList() {
  const citizensList = document.getElementById("citizens-list");
  citizensList.innerHTML = ""; // Очистить текущий список

  userCitizens.forEach((citizen) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <div class="card-header">
        <img src="${citizen.image}" alt="${citizen.name}" class="card-image"/>
        <h3>${citizen.name}</h3>
        <p>Rank: ${citizen.price}</p>
      </div>
      <div class="card-info">
        
      </div>
    `;

    citizensList.appendChild(card);
  });
}

// Function to open modal with citizen details
function openModal(citizen) {
  document.getElementById(
    "modal-text"
  ).textContent = `Details for ${citizen.name}`;
  document.getElementById("modal-description").textContent =
    citizen.description;
  document.getElementById("modal-price").textContent = `$${citizen.price}`;
  document.getElementById("buy-btn").style.display = "none"; // Hide buy button for citizens
  document.getElementById("sell-btn").style.display = "inline-block"; // Show sell button for citizens

  // Show modal
  document.getElementById("modal").style.display = "flex"; // Remove display: none
}

// Function to close modal
document.getElementById("close-modal").addEventListener("click", () => {
  document.getElementById("modal").style.display = "none"; // Hide modal
});

// Function to update marketplace cards after item buy or sell
function updateMarketplace() {
  const marketplaceCards = document.getElementById("marketplace-cards");
  marketplaceCards.innerHTML = ""; // Clear current marketplace

  marketplaceItems.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <div class="card-header">
        <img src="${item.image}" alt="${item.name}" class="card-image"/>
        <h3>${item.name}</h3>
      </div>
      <div class="card-info">
        <button class="card-btn" data-id="${item.id}" data-name="${item.name}" data-price="${item.price}">View Details</button>
      </div>
    `;
    marketplaceCards.appendChild(card);
  });
}

// Display a success message
function showSuccessMessage(message) {
  const successMessage = document.getElementById("success-message");
  successMessage.textContent = message;
  document.getElementById("success-modal").style.display = "flex";
}

// Close success modal
document.getElementById("close-success-modal").addEventListener("click", () => {
  document.getElementById("success-modal").style.display = "none";
});

// Initialize marketplace and citizens list
updateMarketplace();
updateCitizenList();
