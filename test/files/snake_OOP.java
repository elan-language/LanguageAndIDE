// Java with Elan 2.0.0-beta1

public class Global {

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
  } // end while
  System.out.println(String.format("Game Over! Score: %", snake.score())); // print
} // end main

class Snake {

  public Snake() {
    var tail = new Square(20, 15);
    this.currentDir = Direction.right; // reassign variable
    this.body = list(tail); // reassign variable
    this.head = tail.getAdjacentSquare(this.currentDir); // reassign variable
    this.priorTail = tail; // reassign variable
  } // end constructor

  private Direction currentDir; // private property

  private Square head; // private property

  private List<Square> body; // private property

  private Square priorTail; // private property

  public void clockTick(String key, Apple apple) { // procedure method
    this.setDirection(key); // call procedure
    this.priorTail = this.body[0]; // reassign variable
    var body = this.body;
    body.append(this.head); // call procedure
    this.head = this.head.getAdjacentSquare(this.currentDir); // reassign variable
    if (this.head.equals(apple.location)) {
      apple.newRandomPosition(this); // call procedure
    } else {
      this.body = this.body.subList(1, this.body.length()); // reassign variable
    } // end if
  } // end procedure method

  public void updateBlocks(List<List<int>> blocks) { // procedure method
    blocks[this.head.x][this.head.y] = green; // reassign variable
    if (!this.body[0].equals(this.priorTail)) {
      blocks[this.priorTail.x][this.priorTail.y] = white; // reassign variable
    } // end if
  } // end procedure method

  public int score() { // function method
    return this.body.length() - 1;
  } // end function method

  public boolean bodyCovers(Square sq) { // function method
    var result = false;
    foreach (var seg in this.body) {
      if ((seg.equals(sq))) {
        result = true; // reassign variable
      } // end if
    } // end foreach
    return result;
  } // end function method

  public boolean gameOver() { // function method
    return this.bodyCovers(this.head) || this.head.hasHitEdge();
  } // end function method

  private void setDirection(String key) { // private procedure method
    if (key.equals("w")) {
      this.currentDir = Direction.up; // reassign variable
    } else if (key.equals("s")) {
      this.currentDir = Direction.down; // reassign variable
    } else if (key.equals("a")) {
      this.currentDir = Direction.left; // reassign variable
    } else if (key.equals("d")) {
      this.currentDir = Direction.right; // reassign variable
    } // end if
  } // end procedure method

  public String toString() { // function method
    return String.format("a Snake with head at %", this.head);
  } // end function method

} // end class

class Apple {

  public Apple() {
    this.location = new Square(0, 0); // reassign variable
  } // end constructor

  public Square location; // property

  public void newRandomPosition(Snake snake) { // procedure method
    var changePosition = true;
    while (changePosition) {
      var ranX = randint(0, 39);
      var ranY = randint(0, 29);
      this.location = new Square(ranX, ranY); // reassign variable
      if (!snake.bodyCovers(this.location)) {
        changePosition = false; // reassign variable
      } // end if
    } // end while
  } // end procedure method

  public void updateBlocks(List<List<int>> blocks) { // procedure method
    blocks[this.location.x][this.location.y] = red; // reassign variable
  } // end procedure method

  public String toString() { // function method
    return String.format("an Apple at %", this.location);
  } // end function method

} // end class

class Square {

  public Square(int x, int y) {
    this.x = x; // reassign variable
    this.y = y; // reassign variable
  } // end constructor

  public int x; // property

  public int y; // property

  public Square getAdjacentSquare(Direction d) { // function method
    var newX = this.x;
    var newY = this.y;
    if (d == Direction.left) {
      newX = this.x - 1; // reassign variable
    } else if (d == Direction.right) {
      newX = this.x + 1; // reassign variable
    } else if (d == Direction.up) {
      newY = this.y - 1; // reassign variable
    } else if (d == Direction.down) {
      newY = this.y + 1; // reassign variable
    } // end if
    return new Square(newX, newY);
  } // end function method

  public boolean hasHitEdge() { // function method
    return (this.x == -1) || (this.y == -1) || (this.x == 40) || (this.y == 30);
  } // end function method

  public String toString() { // function method
    return "{this.x}, {this.y}";
  } // end function method

} // end class

enum Direction {up, down, left, right}

@Test static void test_snake() {
  var snake = new Snake();
  // bodyCovers
  assertEquals(true, snake.bodyCovers(new Square(20, 15)));
  assertEquals(false, snake.bodyCovers(new Square(21, 15)));
  // gameOver, score - can only test test_for default - which is not thorough test
  assertEquals(false, snake.gameOver());
  assertEquals(0, snake.score());
} // end test

@Test static void test_apple() {
  // no tests
} // end test

@Test static void test_square() {
  // constructor - not testable as properties are private
  // getAdjacentSquare
  var sq1 = new Square(3, 4);
  assertEquals(new Square(3, 3), sq1.getAdjacentSquare(Direction.up));
  assertEquals(new Square(3, 5), sq1.getAdjacentSquare(Direction.down));
  assertEquals(new Square(2, 4), sq1.getAdjacentSquare(Direction.left));
  assertEquals(new Square(4, 4), sq1.getAdjacentSquare(Direction.right));
  var sq2 = new Square(0, 0);
  var sq3 = new Square(-1, 0);
  assertEquals(sq3, sq2.getAdjacentSquare(Direction.left));
  // hasHitEdge
  assertEquals(false, (new Square(0, 0)).hasHitEdge());
  assertEquals(false, (new Square(39, 20)).hasHitEdge());
  assertEquals(true, (new Square(-1, 3)).hasHitEdge());
  assertEquals(true, (new Square(3, -1)).hasHitEdge());
  assertEquals(true, (new Square(40, 3)).hasHitEdge());
  assertEquals(true, (new Square(3, 30)).hasHitEdge());
} // end test
} // end Global
