let snake, fruit;
const SIZE = 25;
let CENTER;
let SCALE;


function setup() {
  const canvasSize = min(window.innerHeight, window.innerWidth);
  const canvas = createCanvas(canvasSize, canvasSize);
  canvas.position((window.innerWidth - canvasSize) / 2, 0)

  SCALE = height / SIZE;
  CENTER = createVector(floor(SIZE / 2), floor(SIZE / 2));

  snake = new Snake(CENTER.x, CENTER.y, 5);
  newFruit();

  frameRate(5);
}

function draw() {
  background(0);

  // buttons
  fill(30);
  stroke(255);
  rect(width * 1 / 4, 0, width * 1 / 2, height * 1 / 4);
  rect(0, height * 1 / 4, width * 1 / 4, height * 1 / 2);
  rect(width * 1 / 4, height * 3 / 4, width * 1 / 2, height * 1 / 4);
  rect(width * 3 / 4, height * 1 / 4, width * 1 / 4, height * 1 / 2)

  stroke(0);
  snake.update();
  if (snake.eat(fruit)) {
    newFruit();
  }
  snake.show();
  fruit.show();
}

function touchStarted(e) {
  let newDirX = map(mouseX, 0, width, -1, 1);
  newDirX = round(newDirX);
  let newDirY = map(mouseY, 0, height, -1, 1);
  newDirY = round(newDirY);
  let newDir = createVector(newDirX, newDirY);

  let invalidX = newDirX !== -1 && newDirX !== 1 && newDirX !== 0;
  let invalidY = newDirY !== -1 && newDirY !== 1 && newDirY !== 0;
  let invalidSame = newDirX === newDirY || newDirX === -newDirY;
  let newDirBack = snake.head.copy().add(newDir); // to check if snake isnt going into itself
  let invalidBack = newDirBack.x === snake.body[1].x && newDirBack.y === snake.body[1].y;

  let invalid = invalidX || invalidY || invalidSame || invalidBack;
  console.log(newDir)
  if (!invalid) {
    snake.dir = newDir;
  }
  return false;
}

function newFruit() {
  let x = floor(random(SIZE));
  let y = floor(random(SIZE));
  while (snake.isInside(x, y)) {
    x = floor(random(SIZE));
    y = floor(random(SIZE));
  }
  fruit = new Fruit(x, y);
}