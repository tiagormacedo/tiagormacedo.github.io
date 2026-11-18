const face = document.querySelector("#face");
const leftEye = document.querySelector("#left-eye");
const leftIris = document.querySelector("#left-iris");
const rightEye = document.querySelector("#right-eye");
const rightIris = document.querySelector("#right-iris");

const eyes = [
    { eye: leftEye, iris: leftIris },
    { eye: rightEye, iris: rightIris },
];

const squareRootOf2 = Math.SQRT2;

window.addEventListener("pointermove", moveEyes);

function moveEyes(evento) {
    const mouseX = evento.pageX;
    const mouseY = evento.pageY;
    if (mouseX == null || mouseY == null) return;

    const maxXY = Math.max(window.innerWidth, window.innerHeight) * squareRootOf2;

    const faceRect = face.getBoundingClientRect();
    const facePageX = faceRect.left + window.scrollX;
    const facePageY = faceRect.top + window.scrollY;

    for (const { eye, iris } of eyes) {
        const eyeCenterX = facePageX + eye.offsetLeft + eye.offsetWidth / 2;
        const eyeCenterY = facePageY + eye.offsetTop + eye.offsetHeight / 2;

        const dx = (mouseX - eyeCenterX) / maxXY;
        const dy = (mouseY - eyeCenterY) / maxXY;

        const shiftX = (dx * (eye.offsetWidth - iris.offsetWidth)) / 2;
        const shiftY = (dy * (eye.offsetHeight - iris.offsetHeight)) / 2;

        iris.style.transform = `translate(${shiftX}px, ${shiftY}px)`;
    }
}
