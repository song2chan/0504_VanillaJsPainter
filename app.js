const canvas = document.getElementById("js-canvas");
const ctx = canvas.getContext("2d");

let painting = false;

function onMouseMove(evnet) {
  const x = event.offsetX;
  const y = evnet.offsetY;

  if(painting) {
  }
}

function onMouseDown(evnet) {
  painting = true;
}

function onMouseUp(evnet) {
  painting = false;
}

function stopPainting() {
  painting = false;
}

if(canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", onMouseDown);
  canvas.addEventListener("mouseup", onMouseUp);
  canvas.addEventListener("mouseleave", stopPainting);
}