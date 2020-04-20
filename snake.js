class Snake {
  constructor (x, y, initialSize) {
    this.body = [];
    for (var i = 0; i < initialSize; i++) {
      const pos = createVector(x, y + i);
      this.body.push(pos);
    }
    this.dir = createVector(0, -1);
  }
  
  update (){
    let newHead = this.head.copy().add(this.dir);
    if (this.collide(newHead)) {
      console.log('game over');
      noLoop();
    } else {
      if(this.hasEaten){
        this.hasEaten = false;
      } else {
        this.body.pop();
      }
      this.body.unshift(newHead);
    }
  }
  
  show () {
    // draw head
    fill(150);
    const headPos = this.head;
    this.drawTile(headPos) 
    
    // draw rest of body
    for (let i = 1; i < this.body.length; i++) {
      const pos = this.body[i];
      fill(255);
      this.drawTile(pos);
    }
  }
  
  get head (){
    return this.body[0];
  }
  
  drawTile(pos){
    let x = pos.x * SCALE;
    let y = pos.y * SCALE;
    square(x, y, SCALE);
  }
  
  collide (newHead) {
    // check offscreen
    let checkX = newHead.x >= 0 && newHead.x < SIZE;
    let checkY = newHead.y >= 0 && newHead.y < SIZE;
    let checkBoundries = !checkX || !checkY; 
    if (checkBoundries) {
      return true;
    }
    
    // check tail
    for (var i = 1; i < this.body.length; i++) {
      const bodyPiece = this.body[i];
      if(newHead.x === bodyPiece.x && newHead.y === bodyPiece.y) {
        return true;
      }
    }
    return false;
  }
  
  eat (fruit) {
    let eaten = this.head.x === fruit.x && this.head.y === fruit.y;
    if (eaten) {
      this.hasEaten = true;
      return true;
    } else {
      return false;
    }
  }
  
  isInside(x, y) {
    /*for (let piece of this.body) {
      if(x === piece.x && y === piece.y) return true;
    }*/
    return this.body.some(piece => x === piece.x && y === piece.y);
  }
}