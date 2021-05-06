let painting = false;
let filling = false;

/* canvas는 css size와 pixel manipulate size를 둘다 정의해줘야 함 */
const canvas = document.getElementById("js-canvas");
const CANVAS_SIZE = 700;
const INITIAL_COLOR = "#2c2c2c";
if(canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleRightClick);
}
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

const ctx = canvas.getContext("2d");
ctx.lineWidth = 2.5;
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;

/* colorSelectBtn.forEach(element => {
  element.addEventListener("click", test);
  }); 
  왜 안되는거야?? console.log(Array.isArray(colorSelectBtn));
  유사배열객체?.. 배열같은데 실은 배열이 아니라고한다.. 

  var colorSelectBtn = document.getElementsByClassName(".controls_color");

  function test(event) {
    console.log(event);
  }

  그래서 써본 call.. 런타임에러는 안뜨는데? 클릭해도 아무것도 안나오네..
  [].forEach.call(colorSelectBtn, function(element) {
    element.addEventListener("click", test);
  });

  Array.from()을 사용하면 object를 array로 만들 수 있다고한다!
*/
const colors = document.getElementsByClassName("js-color");
Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

const range = document.getElementById("js-range");
if(range) {
  range.addEventListener("input", handleFillAmount);
}

const mode = document.getElementById("js-mode");
if(mode) {
  mode.addEventListener("click", handleModeClick);
}

const save = document.getElementById("js-save");
if(save) {
  save.addEventListener("click", handleSave);
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleFillAmount(evnet) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

function handleModeClick() {
  if(filling) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}

function handleCanvasClick() {
  if(filling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

function handleRightClick(evnet) {
  event.preventDefault();
}

function handleSave() {
  const image = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = image;
  link.download = "기린그린그림";
  link.click();
}

function onMouseMove(evnet) {
  const x = event.offsetX;
  const y = evnet.offsetY;

  /* 아무것도 안하고 canvas 위에 마우스를 놓고 움직이면 시작점이 계속 마우스 커서를 따라 움직이다가
      누르는 순간 그 곳으로부터 line을 시작하고 색을 채움, 떼면 다시 시작점을 탐색*/
  if(!painting) { 
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else if(painting && !filling) {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function startPainting() {
  painting = true;
}

function stopPainting() {
  painting = false;
}