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
    square.draggable = false;
    square.addEventListener("mouseover", changeColor);
    
    const board = document.querySelector("div.board");
    board.appendChild(square);
}

function changeColor (e) {
    if (colorSwitchSlider.textContent === "b & w") {
        const oldColor = this.style.background;
        if (oldColor === "" || oldColor === "white") {
            this.style.background = "lightgray";
        } else if (oldColor === "lightgray") {
            this.style.background = "gray";
        } else if (oldColor === "gray") {
            this.style.background = "black";
        } else {
            this.style.background = "white";
        }
    } else {
        randomRedComponent = Math.floor(256 * Math.random());
        randomGreenComponent = Math.floor(256 * Math.random());
        randomBlueComponent = Math.floor(256 * Math.random());
        randomColor = `rgb(${randomRedComponent}, ${randomGreenComponent}, ${randomBlueComponent})`;
        this.style.background = randomColor;
    }
}

