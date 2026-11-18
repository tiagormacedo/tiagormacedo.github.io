const GRID_COLS = 100;
const GRID_SIZE = GRID_COLS * GRID_COLS;

const mainDiv = document.querySelector("#main");


/* Mode switch */

const controls = document.createElement("div");
controls.className = "controls";

const modeLabel = document.createElement("span");
modeLabel.className = "mode-label";
modeLabel.textContent = "b & w";

const switchLabel = document.createElement("label");
switchLabel.className = "switch";

const colorSwitchCheckbox = document.createElement("input");
colorSwitchCheckbox.type = "checkbox";
colorSwitchCheckbox.id = "color-mode";
colorSwitchCheckbox.setAttribute("aria-label", "Toggle random color mode");

const colorSwitchSlider = document.createElement("span");
colorSwitchSlider.className = "slider";

switchLabel.append(colorSwitchCheckbox, colorSwitchSlider);
controls.append(modeLabel, switchLabel);
mainDiv.appendChild(controls);

let isColorMode = false;

function updateMode() {
  isColorMode = colorSwitchCheckbox.checked;
  modeLabel.textContent = isColorMode ? "color" : "b & w";
  modeLabel.classList.toggle("color-mode", isColorMode);
}

colorSwitchCheckbox.addEventListener("change", updateMode);


/* Board */

const board = document.createElement("div");
board.className = "board";
mainDiv.appendChild(board);

const fragment = document.createDocumentFragment();
for (let i = 0; i < GRID_SIZE; i++) {
  const square = document.createElement("div");
  square.className = "square";
  fragment.appendChild(square);
}
board.appendChild(fragment);


/* Drawing */

const GRAY_SHADES = ["lightgray", "gray", "black", "white"];

let isMouseDown = false;

window.addEventListener("mousedown", (event) => {
  if (event.button !== 0) return;
  if (event.target.closest("label, .switch, .mode-label")) return;
  isMouseDown = true;
});

window.addEventListener("mouseup", () => (isMouseDown = false));
window.addEventListener("blur", () => (isMouseDown = false));

function generateRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

function changeColor(pixel) {
  if (isColorMode) {
    pixel.style.background = generateRandomColor();
    return;
  }
  const step = Number(pixel.dataset.shade ?? 0);
  pixel.style.background = GRAY_SHADES[step];
  pixel.dataset.shade = (step + 1) % GRAY_SHADES.length;
}

function pixelAt(x, y) {
  const el = document.elementFromPoint(x, y);
  return el && el.classList.contains("square") ? el : null;
}

/* Mouse */
board.addEventListener("mousedown", (event) => {
  if (event.button !== 0) return;
  const pixel = event.target.closest(".square");
  if (pixel) changeColor(pixel); // paint the pixel you pressed on
});

board.addEventListener("mouseover", (event) => {
  if (!isMouseDown) return;
  const pixel = event.target.closest(".square");
  if (pixel) changeColor(pixel);
});

/* Touch */
function handleTouch(event) {
  const touch = event.touches[0];
  if (!touch) return;
  const pixel = pixelAt(touch.clientX, touch.clientY);
  if (pixel) changeColor(pixel);
}

board.addEventListener("touchstart", handleTouch, { passive: true });
board.addEventListener("touchmove", handleTouch, { passive: true });
