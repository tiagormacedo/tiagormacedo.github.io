const content = document.querySelector("div#content");
const face = document.querySelector("div#face");
const leftEye = document.querySelector("div#left-eye");
const leftIris = document.querySelector("div#left-iris");
const rightEye = document.querySelector("div#right-eye");
const rightIris = document.querySelector("div#right-iris");

const SQUARE_ROOT_OF_2 = 1.4142;
const EYE_DIAMETER = 100;
const IRIS_DIAMETER = 50;

//  Add event listeners to the movements of the mouse and of touch  //
window.addEventListener("mousemove", evento => moveEyes(evento));
window.addEventListener("touchmove", evento => moveEyes(evento), {passive: false});

//  The iris circle will follow the mouse/touch //
function moveEyes (evento) {
    let windowX = window.innerWidth;
    let windowY = window.innerHeight;
    let maxXY = Math.max(windowX, windowY) * SQUARE_ROOT_OF_2;
    
    let mouseX = evento.pageX ? evento.pageX : evento.changedTouches[0].pageX;
    let mouseY = evento.pageY ? evento.pageY : evento.changedTouches[0].pageY;
    
    const leftEyeCenterX = leftEye.offsetLeft + EYE_DIAMETER/2;
    const leftEyeCenterY = leftEye.offsetTop + EYE_DIAMETER/2;
    const rightEyeCenterX = rightEye.offsetLeft + EYE_DIAMETER/2;
    const rightEyeCenterY = rightEye.offsetTop + EYE_DIAMETER/2;

    let leftAuxX = mouseX - leftEyeCenterX;
    let leftAuxY = mouseY - leftEyeCenterY;
    let rightAuxX = mouseX - rightEyeCenterX;
    let rightAuxY = mouseY - rightEyeCenterY;
    
    leftIris.style.left = (leftEyeCenterX + (leftAuxX/maxXY)*(EYE_DIAMETER/2) - IRIS_DIAMETER/2) + "px";
    leftIris.style.top = (leftEyeCenterY + (leftAuxY/maxXY)*(EYE_DIAMETER/2) - IRIS_DIAMETER/2) + "px";
    rightIris.style.left = (rightEyeCenterX + (rightAuxX/maxXY)*(EYE_DIAMETER/2) - IRIS_DIAMETER/2) + "px";
    rightIris.style.top = (rightEyeCenterY + (rightAuxY/maxXY)*(EYE_DIAMETER/2) - IRIS_DIAMETER/2) + "px";
};
