const totalNumberOfChances = 10;
let attemptNumber = 0;
const goalNumber = Math.ceil(1000 * Math.random());

const attemptsDiv = document.querySelector("div#attempts");
const tryButton = document.querySelector("button#tryButton");
const userGuessInput = document.querySelector("input#userGuess");
const errorMessage = document.querySelector(".error-message");
const guessedNumberInfo = document.querySelector("div#guessed-number > #info");
const goalNumberDiv = document.querySelector("div#goal-number");

// Initialize attempt rectangles
for (let i = 0; i < totalNumberOfChances; i++) {
    const attemptRectangle = document.createElement("div");
    attemptRectangle.classList = "attempt";
    attemptRectangle.id = `attempt${i}`;
    attemptsDiv.appendChild(attemptRectangle);
}

// Handle try button click
tryButton.addEventListener("click", (event) => {
    event.preventDefault();

    const userGuess = Number(userGuessInput.value);
    if (isNaN(userGuess) || userGuess < 1 || userGuess > 1000) {
        errorMessage.textContent = "Please enter a valid number between 1 and 1000.";
        return;
    } 

    errorMessage.textContent = "&nbsp;";
    const attemptRectangle = document.querySelector(`div#attempt${attemptNumber}`);
    attemptRectangle.classList.add("used-attempt");

    compareNumbers(userGuess, goalNumber);
    attemptNumber++;

    userGuessInput.value = "";
});

function compareNumbers(userGuess, goalNumber) {
    if (userGuess === goalNumber || attemptNumber >= totalNumberOfChances) {
        endGame(userGuess);
    } else if (userGuess < goalNumber) {
        guessedNumberInfo.textContent = `The number I'm thinking is larger than ${userGuess}`;
    } else {
        guessedNumberInfo.textContent = `The number I'm thinking is smaller than ${userGuess}`;
    }
}

function endGame(userGuess) {
    goalNumberDiv.textContent = goalNumber;
    goalNumberDiv.style.background = userGuess == goalNumber ? "green" : "red";
    guessedNumberInfo.textContent = "";
    userGuessInput.disabled = true;
    tryButton.disabled = true;
}
