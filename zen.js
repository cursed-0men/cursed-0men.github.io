let timer;
let timeLeft = 25 * 60; // 25 minutes in seconds

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById('timer').textContent = 
        `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function startTimer() {
    clearInterval(timer);
    timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateTimerDisplay();
        } else {
            clearInterval(timer);
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timer);
    timeLeft = 25 * 60;
    updateTimerDisplay();
}

document.addEventListener('DOMContentLoaded', () => {
    updateTimerDisplay();
});
