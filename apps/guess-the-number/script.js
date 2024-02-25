let TOTAL_NUMBER_OF_CHANCES = 10;
let attemptNumber = 0;

let goalNumber = Math.ceil(1000 * Math.random());
let inputNumber;


//  Add green rectangles representing the remaining chances  //
const attemptsDiv = document.querySelector("div#attempts");
for (i = 0; i < TOTAL_NUMBER_OF_CHANCES; i++) {
    const attemptRectangle = document.createElement("div");
    attemptRectangle.classList = "attempt";
    attemptRectangle.id = `attempt${i}`;
    attemptsDiv.appendChild(attemptRectangle);
}


//  Add an event listener to the 'try' button that plays a round of the game  //
const tryButton = document.querySelector("#tryButton");
tryButton.addEventListener("click", (evento) => {
    // Prevent the page from reloading //
    evento.preventDefault();

    if (document.querySelector("input#userGuess").value == "") {
        const error = document.querySelector(".error-message");
        error.textContent = "Enter a number between 1 and 1000";
    } else if (attemptNumber < TOTAL_NUMBER_OF_CHANCES) {
        // Reset the error message //
        document.querySelector(".error-message").textContent = "\u00A0";
        // Extract the entered number from the input field //
        inputNumber = document.querySelector("input#userGuess").value;
        // Decrease remaining chances: remove green background //
        attemptRectangle = document.querySelector(`div#attempt${attemptNumber}`);
        attemptRectangle.style.background = "white";
        // Compare the numbers and continue //
        compareNumbers(inputNumber, goalNumber);
        attemptNumber++;
    } else {
        document.querySelector(".error-message").textContent = "\u00A0";
        endGame(inputNumber);
    }
    
    // Reset the input field //
    document.querySelector("input#userGuess").value = "";
});


function compareNumbers (userGuess, goalNumber) {
    if (attemptNumber == TOTAL_NUMBER_OF_CHANCES-1) {
        endGame(userGuess);
    } else if (userGuess < goalNumber) {
        let guessedNumberInfo = document.querySelector("div#guessed-number > #info");
        guessedNumberInfo.textContent = `The number I'm thinking is larger than ${userGuess}`;
    } else if (userGuess == goalNumber) {
        console.log(`Yes, the number is ${userGuess}!`);
        endGame(userGuess);
    } else if (userGuess > goalNumber) {
        let guessedNumberInfo = document.querySelector("div#guessed-number > #info");
        guessedNumberInfo.textContent = `The number I'm thinking is smaller than ${userGuess}`;
    }
}


function endGame (userGuess) {
    // Reveal the goal number //
    goalNumberDiv = document.querySelector("div#goal-number");
    
    if (userGuess == goalNumber) {
        goalNumberDiv.style.background = "green";
        goalNumberDiv.textContent = goalNumber;
    } else if (userGuess != goalNumber) {
        goalNumberDiv.style.background = "red";
        goalNumberDiv.textContent = goalNumber;
    }
    
    // Clear the feedback message //
    let guessedNumberInfo = document.querySelector("div#guessed-number > #info");
    guessedNumberInfo.textContent = "\u00A0";
    
    // Disable the form //
    document.querySelector("#userGuess").disabled = true;
    document.querySelector("#tryButton").disabled = true;
}
