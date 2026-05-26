// Java with Elan 2.0.0-alpha5

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
  } // while
  print(String.format("Game Over! Score: %", snake.score()));
} // main

class Snake {

  public Snake() {
    var tail = new Square(20, 15);
    this.currentDir = Direction.right; // re-assign variable
    this.body = [tail]; // re-assign variable
    this.head = tail.getAdjacentSquare(this.currentDir); // re-assign variable
    this.priorTail = tail; // re-assign variable
  } // constructor
  public String toString() { // function method
    return "";
  } // function method
  private Direction currentDir; // private property
  private Square head; // private property
  private List<Square> body; // private property
  private Square priorTail; // private property
  public void clockTick(String key, Apple apple) { // procedure method
    this.setDirection(key); // call procedure
    this.priorTail = this.body[0]; // re-assign variable
    var body = this.body;
    body.append(this.head); // call procedure
    this.head = this.head.getAdjacentSquare(this.currentDir); // re-assign variable
    if (this.head.equals(apple.location)) {
      apple.newRandomPosition(this); // call procedure
    } else {
      this.body = this.body.subList(1, this.body.length()); // re-assign variable
    } // if
  } // procedure method
  public void updateBlocks(List<List<int>> blocks) { // procedure method
    blocks[this.head.x][this.head.y] = green; // re-assign variable
    if (!this.body[0].equals(this.priorTail)) {
      blocks[this.priorTail.x][this.priorTail.y] = white; // re-assign variable
    } // if
  } // procedure method
  public int score() { // function method
    return this.body.length() - 1;
  } // function method
  public bool bodyCovers(Square sq) { // function method
    var result = false;
    foreach (seg in this.body) {
      if ((seg.equals(sq))) {
        result = true; // re-assign variable
      } // if
    } // foreach
    return result;
  } // function method
  public bool gameOver() { // function method
    return this.bodyCovers(this.head) || this.head.hasHitEdge();
  } // function method
  private void setDirection(String key) { // private procedure method
    if (key.equals("w")) {
      this.currentDir = Direction.up; // re-assign variable
    } else if (key.equals("s")) {
      this.currentDir = Direction.down; // re-assign variable
    } else if (key.equals("a")) {
      this.currentDir = Direction.left; // re-assign variable
    } else if (key.equals("d")) {
      this.currentDir = Direction.right; // re-assign variable
    } // if
  } // procedure method
} // class

class Apple {

  public Apple() {
    this.location = new Square(0, 0); // re-assign variable
  } // constructor
  public String toString() { // function method
    return "";
  } // function method
  public Square location; // property
  public void newRandomPosition(Snake snake) { // procedure method
    var changePosition = true;
    while (changePosition) {
      var ranX = randint(0, 39);
      var ranY = randint(0, 29);
      this.location = new Square(ranX, ranY); // re-assign variable
      if (!snake.bodyCovers(this.location)) {
        changePosition = false; // re-assign variable
      } // if
    } // while
  } // procedure method
  public void updateBlocks(List<List<int>> blocks) { // procedure method
    blocks[this.location.x][this.location.y] = red; // re-assign variable
  } // procedure method
} // class

class Square {

  public Square(int x, int y) {
    this.x = x; // re-assign variable
    this.y = y; // re-assign variable
  } // constructor
  public String toString() { // function method
    return "";
  } // function method
  public int x; // property
  public int y; // property
  public Square getAdjacentSquare(Direction d) { // function method
    var newX = this.x;
    var newY = this.y;
    if (d == Direction.left) {
      newX = this.x - 1; // re-assign variable
    } else if (d == Direction.right) {
      newX = this.x + 1; // re-assign variable
    } else if (d == Direction.up) {
      newY = this.y - 1; // re-assign variable
    } else if (d == Direction.down) {
      newY = this.y + 1; // re-assign variable
    } // if
    return new Square(newX, newY);
  } // function method
  public bool hasHitEdge() { // function method
    return (this.x == -1) || (this.y == -1) || (this.x == 40) || (this.y == 30);
  } // function method
} // class

enum Direction {up, down, left, right}

@Test static void test_snake() {
  var snake = new Snake();
  // bodyCovers
  assertEquals(true, snake.bodyCovers(new Square(20, 15)))
  assertEquals(false, snake.bodyCovers(new Square(21, 15)))
  // gameOver, score - can only test test_for default - which is not thorough test
  assertEquals(false, snake.gameOver())
  assertEquals(0, snake.score())
} // 

@Test static void test_apple() {
  // no tests
} // 

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
} // 
