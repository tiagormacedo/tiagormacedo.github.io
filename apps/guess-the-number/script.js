"use strict";

// Initialize constants
const MIN_NUMBER = 1;
const MAX_NUMBER = 1000;
const TOTAL_CHANCES = 10;

const form = document.querySelector("#guess-form");
const userGuessInput = document.querySelector("#user-guess");
const tryButton = document.querySelector("#try-button");
const playAgainButton = document.querySelector("#play-again");
const errorMessage = document.querySelector(".error-message");
const attemptsDiv = document.querySelector("#attempts");
const chancesLeft = document.querySelector("#chances-left");
const goalNumberDiv = document.querySelector("#goal-number");
const infoDiv = document.querySelector("#info");

const attemptRectangles = [];
let attemptNumber = 0;
let gameOver = false;
let goalNumber = newGoalNumber();

// Auxiliary function that generates an integer in [MIN_NUMBER, MAX_NUMBER]
function newGoalNumber() {
    return Math.floor(Math.random() * (MAX_NUMBER - MIN_NUMBER + 1)) + MIN_NUMBER;
}

// Initialize attempt rectangles
for (let i = 0; i < TOTAL_CHANCES; i++) {
    const rect = document.createElement("div");
    rect.classList.add("attempt");
    rect.id = `attempt${i}`;
    attemptsDiv.appendChild(rect);
    attemptRectangles.push(rect);
}

// Handle try button click
form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (gameOver) return;

    const raw = userGuessInput.value.trim();
    if (raw === "") {
        errorMessage.textContent = "Please enter a number first.";
        return;
    }
    const userGuess = Number(raw);
    if (!Number.isInteger(userGuess) || userGuess < MIN_NUMBER || userGuess > MAX_NUMBER) {
        errorMessage.textContent = `Please enter a whole number between ${MIN_NUMBER} and ${MAX_NUMBER}.`;
        return;
    }

    errorMessage.textContent = "\u00A0";

    attemptRectangles[attemptNumber].classList.add("used-attempt");
    attemptNumber++;
    chancesLeft.textContent = TOTAL_CHANCES - attemptNumber;

    if (userGuess === goalNumber) {
        endGame(true);
    } else if (attemptNumber === TOTAL_CHANCES) {
        endGame(false);
    } else {
        infoDiv.textContent = `The number I'm thinking of is ${userGuess < goalNumber ? "larger" : "smaller"} than ${userGuess}.`;
    }

    userGuessInput.value = "";
    userGuessInput.focus();
});

// End of game behaviour
function endGame(won) {
    gameOver = true;
    goalNumberDiv.textContent = goalNumber;
    goalNumberDiv.classList.add(won ? "won" : "lost");
    goalNumberDiv.removeAttribute("aria-hidden");

    infoDiv.textContent = won
        ? `Correct! The number was ${goalNumber}. You got it in ${attemptNumber} ${attemptNumber === 1 ? "guess" : "guesses"}.`
        : `Game over. The number was ${goalNumber}.`;

    userGuessInput.disabled = true;
    tryButton.disabled = true;
    playAgainButton.hidden = false;
    playAgainButton.focus();
}

// Handle play-again button
playAgainButton.addEventListener("click", () => {
    attemptNumber = 0;
    gameOver = false;
    goalNumber = newGoalNumber();

    for (const rect of attemptRectangles) rect.classList.remove("used-attempt");
    chancesLeft.textContent = TOTAL_CHANCES;

    goalNumberDiv.textContent = "\u00A0?\u00A0";
    goalNumberDiv.classList.remove("won", "lost");
    goalNumberDiv.setAttribute("aria-hidden", "true");

    infoDiv.textContent = "";
    errorMessage.textContent = "\u00A0";
    userGuessInput.disabled = false;
    tryButton.disabled = false;
    playAgainButton.hidden = true;
    userGuessInput.focus();
});
