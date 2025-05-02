// Select DOM elements
const content = document.querySelector("div#content");
const face = document.querySelector("div#face");
const leftEye = document.querySelector("div#left-eye");
const leftIris = document.querySelector("div#left-iris");
const rightEye = document.querySelector("div#right-eye");
const rightIris = document.querySelector("div#right-iris");

// Define constants
const squareRootOf2 = 1.4142;
const eyeDiameter = 100;
const irisDiameter = 50;

// Variables for window dimensions
let windowX, windowY, maxXY;

// Update window dimensions and maxXY when the window resizes
function updateWindowDimensions() {
    windowX = window.innerWidth;
    windowY = window.innerHeight;
    maxXY = Math.max(windowX, windowY) * squareRootOf2;
}
window.addEventListener("resize", updateWindowDimensions);
updateWindowDimensions();

// Add event listener for mouse
window.addEventListener("mousemove", moveEyes);

// Function to move irises based on cursor location
function moveEyes(evento) {
    // Get mouse or touch coordinates
    const mouseX = evento.pageX;
    const mouseY = evento.pageY;

    if (mouseX == null || mouseY == null) return;

    // Precompute eye center positions
    const leftEyeCenterX = leftEye.offsetLeft + (eyeDiameter / 2);
    const leftEyeCenterY = leftEye.offsetTop + (eyeDiameter / 2);
    const rightEyeCenterX = rightEye.offsetLeft + (eyeDiameter / 2);
    const rightEyeCenterY = rightEye.offsetTop + (eyeDiameter / 2);

    // Calculate relative positions
    const leftAuxX = mouseX - leftEyeCenterX;
    const leftAuxY = mouseY - leftEyeCenterY;
    const rightAuxX = mouseX - rightEyeCenterX;
    const rightAuxY = mouseY - rightEyeCenterY;

    // Update iris positions
    leftIris.style.left = `${leftEyeCenterX + (leftAuxX / maxXY) * (eyeDiameter / 2) - (irisDiameter / 2)}px`;
    leftIris.style.top = `${leftEyeCenterY + (leftAuxY / maxXY) * (eyeDiameter / 2) - (irisDiameter / 2)}px`;
    rightIris.style.left = `${rightEyeCenterX + (rightAuxX / maxXY) * (eyeDiameter / 2) - (irisDiameter / 2)}px`;
    rightIris.style.top = `${rightEyeCenterY + (rightAuxY / maxXY) * (eyeDiameter / 2) - (irisDiameter / 2)}px`;
}
