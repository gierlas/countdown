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

function getTimeRemaining(targetDate) {
    const now = new Date();
    const end = new Date(targetDate);
    const total = end - now;
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    return {
        total,
        days,
        hours,
        minutes,
        seconds
    };
}

function getCountdownKeyFromQuery() {
    const params = new URLSearchParams(window.location.search);
    return params.get('countdown');
}

function formatCountdown({days, hours, minutes, seconds}) {
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

function startCountdown(targetDate) {
    const countdownEl = document.getElementById('countdown');
    function update() {
        const t = getTimeRemaining(targetDate);
        if (t.total <= 0) {
            countdownEl.textContent = 'Countdown finished!';
            clearInterval(timer);
        } else {
            countdownEl.textContent = formatCountdown(t);
        }
    }
    update();
    const timer = setInterval(update, 1000);
    return timer;
}

async function init() {
    const config = await fetchConfig();
    const key = getCountdownKeyFromQuery();
    if (!key || !config[key]) {
        document.getElementById('countdown').textContent = 'Countdown not found.';
        setBackground();
        return;
    }
    const entry = config[key];
    setBackground(entry.image);
    startCountdown(entry.date);
}

window.onload = init;
