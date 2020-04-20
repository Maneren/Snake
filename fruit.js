class Fruit {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  
  show () {
    fill(255, 0, 0);
    let x = this.x * SCALE;
    let y = this.y * SCALE;
    square(x, y, SCALE);
  }
}