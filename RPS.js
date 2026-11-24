const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");
const streakPara = document.querySelector("#streak");
const roundLabel = document.querySelector("#round-label");
const userChoiceBox = document.querySelector("#user-choice");
const computerChoiceBox = document.querySelector("#computer-choice");
const historyBox = document.querySelector("#history");
const resetButton = document.querySelector("#reset-game");
const soundButton = document.querySelector("#sound-toggle");

const options = ["Rock", "Paper", "Scissor"];
let userScore = 0;
let compScore = 0;
let streak = 0;
let round = 0;
let history = [];
let soundEnabled = localStorage.getItem("rps-sound") !== "off";

const choiceImage = (choice) => `<img src="images/${choice.toLowerCase()}.png" alt="${choice}" width="150" height="150">`;

function revealChoice(box, choice) {
    box.innerHTML = choiceImage(choice);
    box.classList.remove("reveal");
    void box.offsetWidth;
    box.classList.add("reveal");
}

function playTone(type) {
    if (!soundEnabled) return;
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const context = new AudioContext();
        const oscillator = context.createOscillator();
        const gain = context.createGain();
        oscillator.connect(gain);
        gain.connect(context.destination);
        oscillator.frequency.value = type === "win" ? 640 : type === "loss" ? 220 : 420;
        gain.gain.setValueAtTime(0.055, context.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.12);
        oscillator.start();
        oscillator.stop(context.currentTime + 0.12);
    } catch (_) {
        // Audio is optional and may be blocked by the browser.
    }
}

function updateHistory(result) {
    history.unshift(result);
    history = history.slice(0, 8);
    historyBox.innerHTML = history.map((item) =>
        `<span class="history-dot ${item}" title="${item}"></span>`
    ).join("");
}

function genCompChoice() {
    return options[Math.floor(Math.random() * options.length)];
}

function determineWinner(userChoice, compChoice) {
    if (userChoice === compChoice) return "draw";
    if (
        (userChoice === "Rock" && compChoice === "Scissor") ||
        (userChoice === "Paper" && compChoice === "Rock") ||
        (userChoice === "Scissor" && compChoice === "Paper")
    ) return "win";
    return "loss";
}

function playGame(userChoice) {
    const compChoice = genCompChoice();
    const result = determineWinner(userChoice, compChoice);

    round++;
    revealChoice(userChoiceBox, userChoice);
    revealChoice(computerChoiceBox, compChoice);
    msg.className = `result-message ${result}`;

    if (result === "win") {
        userScore++;
        streak++;
        userScorePara.textContent = userScore;
        streakPara.textContent = streak;
        msg.textContent = `You win! ${userChoice} beats ${compChoice}.`;
    } else if (result === "loss") {
        compScore++;
        streak = 0;
        compScorePara.textContent = compScore;
        streakPara.textContent = streak;
        msg.textContent = `Computer wins. ${compChoice} beats ${userChoice}.`;
    } else {
        streak = 0;
        streakPara.textContent = streak;
        msg.textContent = `It's a draw - both chose ${userChoice}.`;
    }

    roundLabel.textContent = `Round ${round + 1}`;
    updateHistory(result);
    playTone(result);
}

function resetGame() {
    userScore = 0;
    compScore = 0;
    streak = 0;
    round = 0;
    history = [];
    userScorePara.textContent = "0";
    compScorePara.textContent = "0";
    streakPara.textContent = "0";
    roundLabel.textContent = "Round 1";
    msg.className = "result-message";
    msg.textContent = "Make your move";
    userChoiceBox.innerHTML = '<span class="choice-placeholder">?</span>';
    computerChoiceBox.innerHTML = '<span class="choice-placeholder">?</span>';
    historyBox.innerHTML = "";
}

choices.forEach((choice) => {
    choice.addEventListener("click", () => playGame(choice.id));
});

resetButton.addEventListener("click", resetGame);

soundButton.addEventListener("click", () => {
    soundEnabled = !soundEnabled;
    localStorage.setItem("rps-sound", soundEnabled ? "on" : "off");
    soundButton.classList.toggle("muted", !soundEnabled);
    soundButton.setAttribute("aria-label", soundEnabled ? "Mute sound" : "Enable sound");
});

document.addEventListener("keydown", (event) => {
    if (event.repeat) return;
    const keyChoice = { "1": "Rock", "2": "Paper", "3": "Scissor" };
    if (keyChoice[event.key]) playGame(keyChoice[event.key]);
});

soundButton.classList.toggle("muted", !soundEnabled);
soundButton.setAttribute("aria-label", soundEnabled ? "Mute sound" : "Enable sound");