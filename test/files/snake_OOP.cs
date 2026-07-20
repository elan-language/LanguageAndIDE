// C# with Elan 2.0.0-beta2

// Use the W,A,S,D keys to change Snake direction

static void main() {
  var blocks = createBlockGraphics(white);
  var snake = new Snake();
  var apple = new Apple();
  apple.newRandomPosition(snake); // procedure call
  while (!snake.gameOver()) {
    snake.updateBlocks(blocks); // procedure call
    apple.updateBlocks(blocks); // procedure call
    displayBlocks(blocks); // procedure call
    sleep_ms(150); // procedure call
    snake.clockTick(getKey(), apple); // procedure call
  } // end while
  Console.WriteLine($"Game Over! Score: {snake.score()}"); // print statement
} // end main

class Snake {

  public Snake() {
    var tail = new Square(20, 15);
    this.currentDir = Direction.right; // assignment
    this.body = new [] {tail}; // assignment
    this.head = tail.getAdjacentSquare(this.currentDir); // assignment
    this.priorTail = tail; // assignment
  } // end constructor

  private Direction currentDir {get; private set;} // private property

  private Square head {get; private set;} // private property

  private List<Square> body {get; private set;} // private property

  private Square priorTail {get; private set;} // private property

  public void clockTick(string key, Apple apple) { // procedure method
    this.setDirection(key); // procedure call
    this.priorTail = this.body[0]; // assignment
    var body = this.body;
    body.append(this.head); // procedure call
    this.head = this.head.getAdjacentSquare(this.currentDir); // assignment
    if (this.head.equals(apple.location)) {
      apple.newRandomPosition(this); // procedure call
    } else {
      this.body = this.body.subList(1, this.body.length()); // assignment
    } // end if
  } // end procedure method

  public void updateBlocks(List<List<int>> blocks) { // procedure method
    blocks[this.head.x][this.head.y] = green; // assignment
    if (!this.body[0].equals(this.priorTail)) {
      blocks[this.priorTail.x][this.priorTail.y] = white; // assignment
    } // end if
  } // end procedure method

  public int score() { // function method
    return this.body.length() - 1;
  } // end function method

  public bool bodyCovers(Square sq) { // function method
    var result = false;
    foreach (var seg in this.body) {
      if ((seg.equals(sq))) {
        result = true; // assignment
      } // end if
    } // end foreach
    return result;
  } // end function method

  public bool gameOver() { // function method
    return this.bodyCovers(this.head) || this.head.hasHitEdge();
  } // end function method

  private void setDirection(string key) { // private procedure method
    if (key.equals("w")) {
      this.currentDir = Direction.up; // assignment
    } else if (key.equals("s")) {
      this.currentDir = Direction.down; // assignment
    } else if (key.equals("a")) {
      this.currentDir = Direction.left; // assignment
    } else if (key.equals("d")) {
      this.currentDir = Direction.right; // assignment
    } // end if
  } // end procedure method

  public string toString() { // function method
    return $"a Snake with head at {this.head}";
  } // end function method

} // end class

class Apple {

  public Apple() {
    this.location = new Square(0, 0); // assignment
  } // end constructor

  public Square location {get; private set;} // property

  public void newRandomPosition(Snake snake) { // procedure method
    var changePosition = true;
    while (changePosition) {
      var ranX = randint(0, 39);
      var ranY = randint(0, 29);
      this.location = new Square(ranX, ranY); // assignment
      if (!snake.bodyCovers(this.location)) {
        changePosition = false; // assignment
      } // end if
    } // end while
  } // end procedure method

  public void updateBlocks(List<List<int>> blocks) { // procedure method
    blocks[this.location.x][this.location.y] = red; // assignment
  } // end procedure method

  public string toString() { // function method
    return $"an Apple at {this.location}";
  } // end function method

} // end class

class Square {

  public Square(int x, int y) {
    this.x = x; // assignment
    this.y = y; // assignment
  } // end constructor

  public int x {get; private set;} // property

  public int y {get; private set;} // property

  public Square getAdjacentSquare(Direction d) { // function method
    var newX = this.x;
    var newY = this.y;
    if (d == Direction.left) {
      newX = this.x - 1; // assignment
    } else if (d == Direction.right) {
      newX = this.x + 1; // assignment
    } else if (d == Direction.up) {
      newY = this.y - 1; // assignment
    } else if (d == Direction.down) {
      newY = this.y + 1; // assignment
    } // end if
    return new Square(newX, newY);
  } // end function method

  public bool hasHitEdge() { // function method
    return (this.x == -1) || (this.y == -1) || (this.x == 40) || (this.y == 30);
  } // end function method

  public string toString() { // function method
    return "{this.x}, {this.y}";
  } // end function method

} // end class

enum Direction {up, down, left, right}

[TestClass] class Test_snake
[TestMethod] static void test_snake() {
  var snake = new Snake();
  // bodyCovers
  Assert.AreEqual(true, snake.bodyCovers(new Square(20, 15)));
  Assert.AreEqual(false, snake.bodyCovers(new Square(21, 15)));
  // gameOver, score - can only test test_for default - which is not thorough test
  Assert.AreEqual(false, snake.gameOver());
  Assert.AreEqual(0, snake.score());
}} // end test

[TestClass] class Test_apple
[TestMethod] static void test_apple() {
  // no tests
}} // end test

[TestClass] class Test_square
[TestMethod] static void test_square() {
  // constructor - not testable as properties are private
  // getAdjacentSquare
  var sq1 = new Square(3, 4);
  Assert.AreEqual(new Square(3, 3), sq1.getAdjacentSquare(Direction.up));
  Assert.AreEqual(new Square(3, 5), sq1.getAdjacentSquare(Direction.down));
  Assert.AreEqual(new Square(2, 4), sq1.getAdjacentSquare(Direction.left));
  Assert.AreEqual(new Square(4, 4), sq1.getAdjacentSquare(Direction.right));
  var sq2 = new Square(0, 0);
  var sq3 = new Square(-1, 0);
  Assert.AreEqual(sq3, sq2.getAdjacentSquare(Direction.left));
  // hasHitEdge
  Assert.AreEqual(false, (new Square(0, 0)).hasHitEdge());
  Assert.AreEqual(false, (new Square(39, 20)).hasHitEdge());
  Assert.AreEqual(true, (new Square(-1, 3)).hasHitEdge());
  Assert.AreEqual(true, (new Square(3, -1)).hasHitEdge());
  Assert.AreEqual(true, (new Square(40, 3)).hasHitEdge());
  Assert.AreEqual(true, (new Square(3, 30)).hasHitEdge());
}} // end test
