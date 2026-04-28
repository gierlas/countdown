async function fetchConfig() {
    const response = await fetch('config.json');
    return response.json();
}

function setBackground(image) {
    if (image) {
        document.body.style.backgroundImage = `url('images/${image}')`;
    } else {
        document.body.style.backgroundImage = '';
    }
}

function getCountdownKeyFromQuery() {
    const params = new URLSearchParams(window.location.search);
    return params.get('countdown');
}

function setLabel(title) {
    if (title) {
        document.getElementById('label').textContent = title;
        document.title = title;
    }
}

function startCountdown(targetDate) {
    const countdownEl = document.getElementById('countdown');
    function update() {
        const now = new Date();
        const end = new Date(targetDate);
        let diff = end - now;
        if (diff <= 0) {
            countdownEl.innerText = 'ES AHORA 🍹';
            clearInterval(timer);
            return;
        }
        const h = Math.floor(diff / 1000 / 60 / 60);
        const m = Math.floor(diff / 1000 / 60) % 60;
        const s = Math.floor(diff / 1000) % 60;
        countdownEl.innerText = `${h}h ${m}m ${s}s`;
    }
    update();
    const timer = setInterval(update, 1000);
}

async function init() {
    const config = await fetchConfig();
    const key = getCountdownKeyFromQuery();
    if (!key || !config[key]) {
        document.getElementById('countdown').textContent = 'Countdown not found.';
        return;
    }
    const entry = config[key];
    setLabel(entry.title || 'FERNETCITO 🍹🇦🇷');
    if (entry.image) {
        setBackground(entry.image);
    }
    startCountdown(entry.date);
}

window.onload = init;
        update();
