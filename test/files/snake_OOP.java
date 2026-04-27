// Java with Elan 2.0.0-alpha1

// Use the W,A,S,D keys to change Snake direction

static void main() {
  var blocks = createBlockGraphics(white);
  var snake = new Snake();
  var apple = new Apple();
  apple.newRandomPosition(snake); // call procedure
  while (!snake.gameOver()) {
    snake.updateBlocks(blocks); // call procedure
    apple.updateBlocks(blocks); // call procedure
    displayBlocks(blocks); // call procedure
    sleep_ms(150); // call procedure
    snake.clockTick(getKey(), apple); // call procedure
  }
  print(String.format("Game Over! Score: %", snake.score()));
}

class Snake {

  public Snake() {
    var tail = new Square(20, 15);
    this.currentDir = Direction.right; // change variable
    this.body = [tail]; // change variable
    this.head = tail.getAdjacentSquare(this.currentDir); // change variable
    this.priorTail = tail; // change variable
  }
  public String toString() { // function
    return "";
  }
  private Direction currentDir; // private property
  private Square head; // private property
  private List<Square> body; // private property
  private Square priorTail; // private property
  public void clockTick(String key, Apple apple) { // procedure
    this.setDirection(key); // call procedure
    this.priorTail = this.body[0]; // change variable
    var body = this.body;
    body.append(this.head); // call procedure
    this.head = this.head.getAdjacentSquare(this.currentDir); // change variable
    if (this.head.equals(apple.location)) {
      apple.newRandomPosition(this); // call procedure
    } else {
      this.body = this.body.subList(1, this.body.length()); // change variable
    }
  }
  public void updateBlocks(List<List<int>> blocks) { // procedure
    blocks[this.head.x][this.head.y] = green; // change variable
    if (!this.body[0].equals(this.priorTail)) {
      blocks[this.priorTail.x][this.priorTail.y] = white; // change variable
    }
  }
  public int score() { // function
    return this.body.length() - 1;
  }
  public bool bodyCovers(Square sq) { // function
    var result = false;
    foreach (seg in this.body) {
      if ((seg.equals(sq))) {
        result = true; // change variable
      }
    }
    return result;
  }
  public bool gameOver() { // function
    return this.bodyCovers(this.head) || this.head.hasHitEdge();
  }
  private void setDirection(String key) { // private procedure
    if (key.equals("w")) {
      this.currentDir = Direction.up; // change variable
    } else if (key.equals("s")) {
      this.currentDir = Direction.down; // change variable
    } else if (key.equals("a")) {
      this.currentDir = Direction.left; // change variable
    } else if (key.equals("d")) {
      this.currentDir = Direction.right; // change variable
    }
  }
}

class Apple {

  public Apple() {
    this.location = new Square(0, 0); // change variable
  }
  public String toString() { // function
    return "";
  }
  public Square location; // property
  public void newRandomPosition(Snake snake) { // procedure
    var changePosition = true;
    while (changePosition) {
      var ranX = randint(0, 39);
      var ranY = randint(0, 29);
      this.location = new Square(ranX, ranY); // change variable
      if (!snake.bodyCovers(this.location)) {
        changePosition = false; // change variable
      }
    }
  }
  public void updateBlocks(List<List<int>> blocks) { // procedure
    blocks[this.location.x][this.location.y] = red; // change variable
  }
}

class Square {

  public Square(int x, int y) {
    this.x = x; // change variable
    this.y = y; // change variable
  }
  public String toString() { // function
    return "";
  }
  public int x; // property
  public int y; // property
  public Square getAdjacentSquare(Direction d) { // function
    var newX = this.x;
    var newY = this.y;
    if (d == Direction.left) {
      newX = this.x - 1; // change variable
    } else if (d == Direction.right) {
      newX = this.x + 1; // change variable
    } else if (d == Direction.up) {
      newY = this.y - 1; // change variable
    } else if (d == Direction.down) {
      newY = this.y + 1; // change variable
    }
    return new Square(newX, newY);
  }
  public bool hasHitEdge() { // function
    return (this.x == -1) || (this.y == -1) || (this.x == 40) || (this.y == 30);
  }
}

enum Direction up, down, left, right

@Test static void test_snake() {
  var snake = new Snake();
  // bodyCovers
  assertEquals(true, snake.bodyCovers(new Square(20, 15)))
  assertEquals(false, snake.bodyCovers(new Square(21, 15)))
  // gameOver, score - can only test test_for default - which is not thorough test
  assertEquals(false, snake.gameOver())
  assertEquals(0, snake.score())
}

@Test static void test_apple() {
  // no tests
}

@Test static void test_square() {
  // constructor - not testable as properties are private
  // getAdjacentSquare
  var sq1 = new Square(3, 4);
  assertEquals(new Square(3, 3), sq1.getAdjacentSquare(Direction.up))
  assertEquals(new Square(3, 5), sq1.getAdjacentSquare(Direction.down))
  assertEquals(new Square(2, 4), sq1.getAdjacentSquare(Direction.left))
  assertEquals(new Square(4, 4), sq1.getAdjacentSquare(Direction.right))
  var sq2 = new Square(0, 0);
  var sq3 = new Square(-1, 0);
  assertEquals(sq3, sq2.getAdjacentSquare(Direction.left))
  // hasHitEdge
  assertEquals(false, (new Square(0, 0)).hasHitEdge())
  assertEquals(false, (new Square(39, 20)).hasHitEdge())
  assertEquals(true, (new Square(-1, 3)).hasHitEdge())
  assertEquals(true, (new Square(3, -1)).hasHitEdge())
  assertEquals(true, (new Square(40, 3)).hasHitEdge())
  assertEquals(true, (new Square(3, 30)).hasHitEdge())
}
