const mainDiv = document.querySelector("div#main");

// Black-and-white x random-color switch
const switchDiv = document.createElement("div");
switchDiv.style.display = "flex";
switchDiv.style.justifyContent = "end";
switchDiv.style.width = "400px";
mainDiv.appendChild(switchDiv);

const colorSwitchLabel = document.createElement("label");
colorSwitchLabel.classList = "switch";
switchDiv.appendChild(colorSwitchLabel);

const colorSwitchCheckbox = document.createElement("input");
colorSwitchCheckbox.type = "checkbox";
colorSwitchLabel.appendChild(colorSwitchCheckbox);

const colorSwitchSlider = document.createElement("span");
colorSwitchSlider.classList = "slider round";
colorSwitchSlider.textContent = "b & w";
colorSwitchLabel.appendChild(colorSwitchSlider);

let isColorMode = false;

function toggleColorMode() {
    isColorMode = !isColorMode;
    colorSwitchSlider.style.color = isColorMode ? "#F92C85" : "black";
    colorSwitchSlider.textContent = isColorMode ? "color" : "b & w";
}

colorSwitchCheckbox.addEventListener("change", toggleColorMode);

// Drawing board
const board = document.createElement("div");
board.classList = "board";
mainDiv.appendChild(board);

// Create pixel squares
const GRID_SIZE = 10000; 
let isMouseDown = false;
let isTouchActive = false; // Track touch state

// Add event listeners for mouse events
window.addEventListener("mousedown", () => (isMouseDown = true));
window.addEventListener("mouseup", () => (isMouseDown = false));

// Add event listeners for touch events
window.addEventListener("touchstart", (event) => {
    isTouchActive = true;
    findElement(event);
}, { passive: false });

window.addEventListener("touchend", () => (isTouchActive = false), { passive: false });

window.addEventListener("touchmove", (event) => {
    if (isTouchActive) findElement(event);
}, { passive: false });

// Function to generate random color
function generateRandomColor() {
    const randomRed = Math.floor(256 * Math.random());
    const randomGreen = Math.floor(256 * Math.random());
    const randomBlue = Math.floor(256 * Math.random());
    return `rgb(${randomRed}, ${randomGreen}, ${randomBlue})`;
}

// Add squares to the board
for (let i = 0; i < GRID_SIZE; i++) {
    const square = document.createElement("div");
    square.classList = "square";
    square.id = `square${i}`;
    square.draggable = false;

    square.addEventListener("mouseover", () => {
        if (isMouseDown) findElement({ target: square });
    });

    board.appendChild(square);
}

// Function to find the element under the pointer
function findElement(event) {
    let pixel = event.target;

    if (!pixel.classList.contains("square")) {
        const x = event.pageX || event.touches[0].pageX;
        const y = event.pageY || event.touches[0].pageY;
        pixel = document.elementFromPoint(x, y);
    }

    if (pixel && pixel.classList.contains("square")) {
        changeColor(pixel);
    }
}

// Function to change the color of a pixel
function changeColor(pixel) {
    if (!isColorMode) {
        const oldColor = pixel.style.background;
        if (oldColor === "" || oldColor === "white") {
            pixel.style.background = "lightgray";
        } else if (oldColor === "lightgray") {
            pixel.style.background = "gray";
        } else if (oldColor === "gray") {
            pixel.style.background = "black";
        } else {
            pixel.style.background = "white";
        }
    } else {
        pixel.style.background = generateRandomColor();
    }
}
