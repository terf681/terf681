document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. КОПИРОВАНИЕ IP-АДРЕСА В БУФЕР ОБМЕНА
    // ==========================================
    const copyIpBtn = document.getElementById("copy-ip-btn");
    const serverIpText = document.getElementById("server-ip-text");

    if (copyIpBtn && serverIpText) {
        copyIpBtn.addEventListener("click", () => {
            const ip = serverIpText.innerText.trim();

            navigator.clipboard.writeText(ip).then(() => {
                const originalText = copyIpBtn.innerText;
                copyIpBtn.innerText = "СКОПИРОВАНО!";
                copyIpBtn.style.background = "#28a745";

                setTimeout(() => {
                    copyIpBtn.innerText = originalText;
                    copyIpBtn.style.background = "";
                }, 2000);
            }).catch(err => {
                console.error("Ошибка копирования: ", err);
            });
        });
    }


    // ==========================================
    // 2. ПОЛУЧЕНИЕ ЖИВОГО ОНЛАЙНА СЕРВЕРА (API)
    // ==========================================
    const onlineCounter = document.getElementById("online-count");
    const serverStatusIndicator = document.getElementById("server-status-indicator");
    
    // Укажи IP твоего сервера (без порта или с портом, если нестандартный)
    const SERVER_IP = "СКОРО ОТКРЫТИЕ"; 

    const fetchServerStatus = async () => {
        if (!onlineCounter) return;

        try {
            // Используем бесплатный API mcapis.ru или api.mcsrvstat.us
            const response = await fetch(`https://api.mcsrvstat.us/2/${SERVER_IP}`);
            const data = await response.json();

            if (data.online) {
                onlineCounter.innerText = `${data.players.online} / ${data.players.max}`;
                if (serverStatusIndicator) {
                    serverStatusIndicator.style.background = "#28a745"; // Зеленый свет
                }
            } else {
                onlineCounter.innerText = "ОФФЛАЙН";
                if (serverStatusIndicator) {
                    serverStatusIndicator.style.background = "#dc3545"; // Красный свет
                }
            }
        } catch (error) {
            console.error("Ошибка при получении статуса сервера:", error);
            onlineCounter.innerText = "ОШИБКА";
            <div class="server-info">
    <div class="info-card">
        <span>ВЕРСИЯ</span>
        <strong>1.12.2</strong>
    </div>

    <div class="info-card">
        <span>РЕЖИМ</span>
        <strong>ANARCHY</strong>
    </div>

    
    <div class="info-card">
        <span>СТАТУС</span>
        <strong id="server-status-text">ОНЛАЙН</strong>
    </div>


    <div class="info-card">
        <span>ОНЛАЙН</span>
        <strong id="online-count">0 / 0</strong>
    </div>
</div>
        }
    };

    fetchServerStatus();
    // Обновляем онлайн каждые 60 секунд
    setInterval(fetchServerStatus, 60000);


    // ==========================================
    // 3. ПЛАВНАЯ ПРОКРУТКА К ЯКОРЯМ (SMOOTH SCROLL)
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === "#") return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

});