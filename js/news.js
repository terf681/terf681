document.addEventListener("DOMContentLoaded", () => {
    const newsContainer = document.querySelector(".news-grid");

    if (!newsContainer) return;

    // Резервный список новостей, если fetch() заблокирован браузером (file://)
    const defaultNews = [
        {
            id: 1,
            date: "Неизвестно",
            title: "ОТКРЫТИЕ СЕРВЕРА",
            preview: "Официальный запуск сезона анархии! Карта чиста, ресурсы ждут своих первых владельцев.",
            fullText: "Добро пожаловать на сервер! Ждем всех игроков в игре."
        },
        {
            id: 2,
            date: "Неизвестно",
            title: "ОПТИМИЗАЦИЯ И СБОРКА",
            preview: "Загружена новая оптимизированная клиентская сборка.",
            fullText: "Мы обновили сборку и выжали максимум FPS для слабых ПK."
        },
        {
            id: 3,
            date: "Неизвестно",
            title: "ПОДГОТОВКА К СТАРТУ",
            preview: "Завершено бесплатное бета-тестирование спавна и механики кланов. Все баги успешно устранены.",
            fullText: "Тесты завершены, мы готовы к полноценному старту."
        }
    ];

    // Создаем модальное окно
    const modalHTML = `
        <div id="news-modal" style="display:none; position:fixed; inset:0; z-index:2000; background:rgba(0,0,0,0.85); backdrop-filter:blur(8px); align-items:center; justify-content:center; padding:20px;">
            <div style="background:#151515; border:1px solid #333; max-width:600px; width:100%; padding:30px; position:relative; color:#eee;">
                <button id="close-modal" style="position:absolute; top:15px; right:15px; background:none; border:none; color:#888; font-size:24px; cursor:pointer;">&times;</button>
                <div id="modal-date" style="color:var(--accent, #d85b32); font-family:monospace; font-size:12px; margin-bottom:10px;"></div>
                <h2 id="modal-title" style="font-size:24px; margin-bottom:15px; color:#fff;"></h2>
                <div id="modal-body" style="color:#aaa; font-size:15px; line-height:1.6; white-space:pre-line;"></div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML("beforeend", modalHTML);

    const modal = document.getElementById("news-modal");
    const modalDate = document.getElementById("modal-date");
    const modalTitle = document.getElementById("modal-title");
    const modalBody = document.getElementById("modal-body");
    const closeModal = document.getElementById("close-modal");

    const hideModal = () => { modal.style.display = "none"; };
    closeModal.addEventListener("click", hideModal);
    modal.addEventListener("click", (e) => { if (e.target === modal) hideModal(); });

    // Функция отрисовки
    const renderNews = (newsList) => {
        newsContainer.innerHTML = "";
        newsList.forEach((item) => {
            const card = document.createElement("article");
            card.classList.add("news-card");
            card.innerHTML = `
                <div class="news-date">${item.date}</div>
                <h3>${item.title}</h3>
                <p>${item.preview}</p>
                <a href="#" class="read-news-btn">ЧИТАТЬ ПОДРОБНЕЕ →</a>
            `;

            card.querySelector(".read-news-btn").addEventListener("click", (e) => {
                e.preventDefault();
                modalDate.textContent = item.date;
                modalTitle.textContent = item.title;
                modalBody.textContent = item.fullText || item.preview;
                modal.style.display = "flex";
            });

            newsContainer.appendChild(card);
        });
    };

    // Пробуем загрузить JSON, при ошибке выводим defaultNews
    fetch("../data/news.json")
        .then((res) => {
            if (!res.ok) throw new Error();
            return res.json();
        })
        .then((data) => renderNews(data))
        .catch(() => {
            console.warn("Файл JSON не найден или заблокирован (file://). Загружены встроенные новости.");
            renderNews(defaultNews);
        });
});