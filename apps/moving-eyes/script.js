// Select DOM elements
const content = document.querySelector("div#content");
const face = document.querySelector("div#face");
const leftEye = document.querySelector("div#left-eye");
const leftIris = document.querySelector("div#left-iris");
const rightEye = document.querySelector("div#right-eye");
const rightIris = document.querySelector("div#right-iris");

// Define constants
const SQUARE_ROOT_OF_2 = 1.4142;
const EYE_DIAMETER = 100;
const IRIS_DIAMETER = 50;

// Variables for window dimensions
let windowX, windowY, maxXY;

// Update window dimensions and maxXY when the window resizes
function updateWindowDimensions() {
    windowX = window.innerWidth;
    windowY = window.innerHeight;
    maxXY = Math.max(windowX, windowY) * SQUARE_ROOT_OF_2;
}
window.addEventListener("resize", updateWindowDimensions);
updateWindowDimensions();

// Add event listeners for mouse and touch movements
window.addEventListener("mousemove", moveEyes);
window.addEventListener("touchmove", moveEyes, { passive: false });

// Function to move irises based on cursor or touch location
function moveEyes(evento) {
    // Get mouse or touch coordinates
    const mouseX = evento.pageX || (evento.changedTouches && evento.changedTouches[0].pageX);
    const mouseY = evento.pageY || (evento.changedTouches && evento.changedTouches[0].pageY);

    if (mouseX == null || mouseY == null) return;

    // Precompute eye center positions
    const leftEyeCenterX = leftEye.offsetLeft + EYE_DIAMETER / 2;
    const leftEyeCenterY = leftEye.offsetTop + EYE_DIAMETER / 2;
    const rightEyeCenterX = rightEye.offsetLeft + EYE_DIAMETER / 2;
    const rightEyeCenterY = rightEye.offsetTop + EYE_DIAMETER / 2;

    // Calculate relative positions
    const leftAuxX = mouseX - leftEyeCenterX;
    const leftAuxY = mouseY - leftEyeCenterY;
    const rightAuxX = mouseX - rightEyeCenterX;
    const rightAuxY = mouseY - rightEyeCenterY;

    // Update iris positions
    leftIris.style.left = `${leftEyeCenterX + (leftAuxX / maxXY) * (EYE_DIAMETER / 2) - IRIS_DIAMETER / 2}px`;
    leftIris.style.top = `${leftEyeCenterY + (leftAuxY / maxXY) * (EYE_DIAMETER / 2) - IRIS_DIAMETER / 2}px`;
    rightIris.style.left = `${rightEyeCenterX + (rightAuxX / maxXY) * (EYE_DIAMETER / 2) - IRIS_DIAMETER / 2}px`;
    rightIris.style.top = `${rightEyeCenterY + (rightAuxY / maxXY) * (EYE_DIAMETER / 2) - IRIS_DIAMETER / 2}px`;
}
