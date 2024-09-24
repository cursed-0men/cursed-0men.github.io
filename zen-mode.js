let timer;
let isPaused = true;
let timeLeft = 3600; // 60 minutes in seconds

// Array of Bhagavad Gita quotes
const quotes = [
    "You have the right to work, but never to the fruit of work.",
    "There is neither this world, nor the world beyond, nor happiness for the one who doubts.",
    "Perform your duty and abandon all attachment to success or failure.",
    "The soul is neither born, and nor does it die",
    "You came empty-handed, and you will leave empty-handed.",
    "He who has conquered himself is the greatest of conquerors."
];

function startTimer() {
    if (isPaused) {
        isPaused = false;
        timer = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateTimerDisplay();
            } else {
                clearInterval(timer);
            }
        }, 1000);
    }
}

function pauseTimer() {
    isPaused = true;
    clearInterval(timer);
}

function resetTimer() {
    isPaused = true;
    clearInterval(timer);
    timeLeft = 3600; // reset to 60 minutes
    updateTimerDisplay();
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById('timer').textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Function to get a random quote
function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
}

// Set a random quote on page load
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('quote-text').textContent = `"${getRandomQuote()}"`;
});
