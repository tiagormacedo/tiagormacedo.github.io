const mainDiv = document.querySelector("div#main"); 


//  Black-and-white x random-color switch //
const switchDiv = document.createElement("div");
switchDiv.style.display = "flex";
switchDiv.style.justifyContent = "end";
switchDiv.style.width = "400px";
mainDiv.appendChild(switchDiv);

const colorSwitchLabel = document.createElement("label");
colorSwitchLabel.classList = "switch";
switchDiv.appendChild(colorSwitchLabel);

const colorSwitchCheckbox = document.createElement("input");
colorSwitchCheckbox.type = "checkbox"
colorSwitchLabel.appendChild(colorSwitchCheckbox);

const colorSwitchSlider = document.createElement("span");
colorSwitchSlider.classList = "slider round";
colorSwitchSlider.textContent = "b & w";
colorSwitchSlider.addEventListener("click", toggleColorMode);
colorSwitchLabel.appendChild(colorSwitchSlider);

function toggleColorMode () {
    if (this.textContent === "b & w") {
        this.style.color = "#F92C85";
        this.textContent = "color";
    } else {
        this.style.color = "black";
        this.textContent = "b & w";
    }
}


//  Drawing board  //
const board = document.createElement("div");
board.classList = "board";
mainDiv.appendChild(board);

//  Pixel squares  //
for (let i = 0; i < 10000; i++) {
    const square = document.createElement("div");
    square.classList = "square"; 
    square.id = `square${i}`;
    
    // Add event listener to change color when the mouse is clicked and over //
    square.draggable = false;
    window.addEventListener("mousedown", () => {
        square.addEventListener("mouseover", findElement);
    });
    window.addEventListener("mouseup", () => {
        square.removeEventListener("mouseover", findElement);
    });
    
    const board = document.querySelector("div.board");
    board.appendChild(square);
}

// Add event listener to change color when touch over a pixel square //
window.addEventListener("touchmove", (ev) => findElement(ev), {passive: false});

function findElement (evento) {
    if (!evento) { evento = this };
    
    let x = evento.pageX ? evento.pageX : evento.changedTouches[0].pageX;
    let y = evento.pageY ? evento.pageY : evento.changedTouches[0].pageY;
    
    let pixel = document.elementFromPoint(x, y);
    let classes = Array.from(pixel.classList);
    
    if (classes.includes("square")) {
        changeColor(pixel);
    }
};

function changeColor (pixel) {
    if (colorSwitchSlider.textContent === "b & w") {
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
        randomRedComponent = Math.floor(256 * Math.random());
        randomGreenComponent = Math.floor(256 * Math.random());
        randomBlueComponent = Math.floor(256 * Math.random());
        randomColor = `rgb(${randomRedComponent}, ${randomGreenComponent}, ${randomBlueComponent})`;
        pixel.style.background = randomColor;
    }
}
