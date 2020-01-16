let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');


let cellSize = 20, 
  col = 40,
  row = 30,
  width = col * cellSize, 
  height = row * cellSize;

const COR = {
  SNAKE_C: [
    [80, 100],
    
    [100, 100],
    [120, 100],
    [140, 100],
    
    [160, 100],
  ],
  SNAKE: {
    x: 100,
    y: 100,
    old_x: 0,
    old_y: 0
  },
  RANDOM_RECTANGLE: {
    x: 200,
    y: 200,
    old_x: 0,
    old_y: 0
  }
}

canvas.width = width;
canvas.height = height;

ctx.fillStyle = '#00ffb5'; // color cells 

//===============================================
// Draw mesh

function drawMesh() {
  for (let yl = 1; yl < col; yl++) {
    ctx.moveTo(cellSize * yl , 0);
    ctx.lineTo(cellSize * yl , height);
  }

  for (let xl = 1; xl < row; xl++) {
    ctx.moveTo(0 , cellSize * xl);
    ctx.lineTo(width , cellSize * xl);
  }

  ctx.lineWidth = 1;
  ctx.strokeStyle='#888';
  ctx.stroke();
}

function snake() {
  ctx.fillStyle = "#FF0000";
  ctx.fillRect(COR.SNAKE.x, COR.SNAKE.y, cellSize, cellSize);
  ctx.clearRect(COR.SNAKE.old_x, COR.SNAKE.old_y, cellSize, cellSize);
  drawMesh();
}

function snake2() {
  ctx.fillStyle = "#FF0000";
  COR.SNAKE_C.forEach(([x, y]) => {
    ctx.fillRect(x, y, cellSize, cellSize);
  })
  // ctx.clearRect(COR.SNAKE.old_x, COR.SNAKE.old_y, cellSize, cellSize);
  drawMesh();
}


function getRandomInt() {
  let max = height;
  return Math.floor(Math.random() * Math.floor(max));
}

function drawRandomRect() {
  let x = getRandomInt();
  let y = getRandomInt();

  x = x - x % cellSize;
  y = y - y % cellSize;

  COR.RANDOM_RECTANGLE.old_x = COR.RANDOM_RECTANGLE.x;
  COR.RANDOM_RECTANGLE.old_y = COR.RANDOM_RECTANGLE.y;
  COR.RANDOM_RECTANGLE.x = x;
  COR.RANDOM_RECTANGLE.y = y;

  ctx.fillStyle = "#00FF00";
  ctx.fillRect(COR.RANDOM_RECTANGLE.x, COR.RANDOM_RECTANGLE.y, cellSize, cellSize);
  ctx.clearRect(COR.RANDOM_RECTANGLE.old_x, COR.RANDOM_RECTANGLE.old_y, cellSize, cellSize);

  drawMesh();
}

function main() {
  drawMesh();
  snake2();
  drawRandomRect();
}

function keyHandler({ keyCode }) {
  COR.SNAKE.old_x = COR.SNAKE.x;
  COR.SNAKE.old_y = COR.SNAKE.y;

  switch (keyCode) {
    case 37:
      COR.SNAKE.x -= cellSize;
      break;
    case 38:
      COR.SNAKE.y -= cellSize;
      break;
    case 39:
      COR.SNAKE.x += cellSize;
      break;
    case 40: 
      COR.SNAKE.y += cellSize;
      break;
    default:
      return;
  }

  if (COR.SNAKE.x < 0) {
    COR.SNAKE.x = width + COR.SNAKE.x;
  }
  if (COR.SNAKE.y < 0) {
    COR.SNAKE.y = height + COR.SNAKE.y;
  }

  snake();
}


document.addEventListener('keydown', keyHandler);

window.onload = main;
