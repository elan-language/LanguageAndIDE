// Java with Elan 2.0.0-beta4

public class Global {

// Use the W,A,S,D keys to change Snake direction

static void main() {
  var blocks = new BlockGraphics();
  var rnd = new Random();
  rnd.initialiseFromClock(); // procedure call
  var game = (new Game(rnd)).withNewApple();
  while (game.isOn) {
    blocks = updateGraphics(game, blocks); // assignment
    displayBlockGraphics(blocks); // procedure call
    sleep_ms(150); // procedure call
    game = clockTick(game, getKey()); // assignment
  } // end while
  System.out.println(String.format("Game Over! Score: %", score(game))); // print statement
} // end main

static Game clockTick(Game g, String k) { // function
  var g2 = if_(k.equals(""), g, g.with_key(k));
  var g3 = moveSnake(g2);
  var g4 = eatAppleIfPoss(g3);
  return if_(gameOver(g4), g4.with_isOn(false), g4);
} // end function

static BlockGraphics updateGraphics(Game g, BlockGraphics b) { // function
  var b2 = b.withPut(g.apple.x, g.apple.y, red);
  var b3 = b2.withPut(g.head.x, g.head.y, green);
  var tail = g.body[0];
  var tailColour = if_(tail.equals(g.priorTail), green, white);
  return b3.withPut(tail.x, tail.y, tailColour);
} // end function

static int score(Game g) { // function
  return g.body.length() - 2;
} // end function

static Game moveSnake(Game g) { // function
  var k = g.key;
  var x = g.head.x;
  var y = g.head.y;
  var newX = if_(k.equals("a"), x - 1, if_(k.equals("d"), x + 1, x));
  var newY = if_(k.equals("w"), y - 1, if_(k.equals("s"), y + 1, y));
  return g.with_body(g.body.withAppend(g.head)).with_head(new Square(newX, newY));
} // end function

static Game eatAppleIfPoss(Game g) { // function
  var tail = g.body[0];
  var moveTail = g.body.subList(1, g.body.length());
  return if_(headOverApple(g), g.withNewApple(), g.with_priorTail(tail).with_body(moveTail));
} // end function

static boolean headOverApple(Game g) { // function
  return g.head.equals(g.apple);
} // end function

static boolean gameOver(Game g) { // function
  return g.body.contains(g.head) || hasHitEdge(g);
} // end function

static boolean hasHitEdge(Game g) { // function
  var x = g.head.x;
  var y = g.head.y;
  return (x == -1) || (y == -1) || (x == 40) || (y == 30);
} // end function

class Game {

  public Game(Random rnd) {
    this.head = new Square(22, 15); // assignment
    this.body = list(new Square(20, 15), new Square(21, 15)); // assignment
    this.priorTail = new Square(0, 0); // assignment
    this.key = "d"; // assignment
    this.isOn = true; // assignment
    this.apple = new Square(12, 15); // assignment
    this.rnd = rnd; // assignment
  } // end constructor

  public Square head; // property

  public List<Square> body; // property

  public Square priorTail; // property

  public Square apple; // property

  public boolean isOn; // property

  public Random rnd; // property

  public String key; // property

  public String toString() { // function method
    return "a Game";
  } // end function method

  public Game withNewApple() { // function method
    var x = this.rnd.asInt(0, 39);
    var rnd2 = this.rnd.nextGen();
    var y = rnd2.asInt(0, 29);
    var rnd3 = rnd2.nextGen();
    var apple2 = new Square(x, y);
    var g2 = this.with_apple(apple2).with_rnd(rnd3);
    return if_(g2.body.contains(apple2), g2.withNewApple(), g2);
  } // end function method

  public Game with_head(Square head) { // function method
    return copyWith(this, "head", head);
  } // end function method

  public Game with_body(List<Square> body) { // function method
    return copyWith(this, "body", body);
  } // end function method

  public Game with_priorTail(Square priorTail) { // function method
    return copyWith(this, "priorTail", priorTail);
  } // end function method

  public Game with_apple(Square apple) { // function method
    return copyWith(this, "apple", apple);
  } // end function method

  public Game with_isOn(boolean isOn) { // function method
    return copyWith(this, "isOn", isOn);
  } // end function method

  public Game with_rnd(Random rnd) { // function method
    return copyWith(this, "rnd", rnd);
  } // end function method

  public Game with_key(String key) { // function method
    return copyWith(this, "key", key);
  } // end function method

} // end class

class Square {

  public Square(int x, int y) {
    this.x = x; // assignment
    this.y = y; // assignment
  } // end constructor

  public int x; // property

  public int y; // property

  public String toString() { // function method
    return String.format("%, %", this.x, this.y);
  } // end function method

} // end class

class Test_clockTick {
@Test static void test_clockTick() {
  var g1 = new Game(new Random());
  var g2 = g1.withNewApple();
  var g3 = clockTick(g2, "s");
  assertEquals(new Square(22, 16), g3.head);
  assertEquals(2, g3.body.length());
  assertEquals(g2.body[0], g3.priorTail);
  assertEquals(true, g3.isOn);
  var g4 = g3.with_apple(new Square(22, 17));
  var g5 = clockTick(g4, "s");
  assertEquals(3, g5.body.length());
  assertEquals(g4.priorTail, g5.priorTail);
  assertEquals(true, g5.isOn);
  var g6 = g5.with_head(new Square(22, 29));
  var g7 = clockTick(g6, "s");
  assertEquals(false, g7.isOn);
}} // end test

class Test_updateGraphics {
@Test static void test_updateGraphics() {
  var blocks = new BlockGraphics();
  var g1 = new Game(new Random());
  var blocks2 = updateGraphics(g1, blocks);
  assertEquals(red, blocks2.get(12, 15));
  assertEquals(green, blocks2.get(22, 15));
  assertEquals(white, blocks2.get(21, 15));
  var g3 = clockTick(g1, "d");
  var blocks3 = updateGraphics(g3, blocks2);
  assertEquals(red, blocks3.get(12, 15));
  assertEquals(green, blocks3.get(22, 15));
  assertEquals(green, blocks3.get(23, 15));
}} // end test

class Test_testnewApple {
@Test static void test_testnewApple() {
  var g1 = new Game(new Random());
  assertEquals(new Square(12, 15), g1.apple);
  var g2 = g1.withNewApple();
  assertEquals(new Square(12, 15), g2.apple);
  var g3 = g2.withNewApple();
  assertEquals(new Square(10, 12), g3.apple);
  // test that apple is never over snake
  var g4 = (new Game(new Random()));
  var g5 = g4.with_body(list(new Square(10, 12)));
  var g6 = g5.withNewApple();
  assertEquals(new Square(12, 15), g4.apple);
}} // end test

class Test_score {
@Test static void test_score() {
  var g1 = new Game(new Random());
  assertEquals(0, score(g1));
  var g2 = g1.with_body(list(new Square(4, 4), new Square(5, 4)));
  assertEquals(0, score(g2));
  var g3 = g1.with_body(list(new Square(3, 4), new Square(4, 4), new Square(5, 4)));
  assertEquals(1, score(g3));
  var g4 = g1.with_body(list(new Square(3, 4), new Square(4, 4), new Square(5, 4), new Square(5, 5)));
  assertEquals(2, score(g4));
}} // end test

class Test_moveSnake {
@Test static void test_moveSnake() {
  var g1 = new Game(new Random());
  var g2 = g1.with_key("a");
  var g3 = moveSnake(g2);
  assertEquals(new Square(21, 15), g3.head);
  var g4 = g1.with_key("d");
  var g5 = moveSnake(g4);
  assertEquals(new Square(23, 15), g5.head);
  var g6 = g1.with_key("w");
  var g7 = moveSnake(g6);
  assertEquals(new Square(22, 14), g7.head);
  var g8 = g1.with_key("s");
  var g9 = moveSnake(g8);
  assertEquals(new Square(22, 16), g9.head);
}} // end test

class Test_eatAppleIfPoss {
@Test static void test_eatAppleIfPoss() {
  var g1 = new Game(new Random());
  assertEquals(2, g1.body.length());
  // negative case
  var g2 = g1.with_apple(new Square(23, 15));
  var g3 = eatAppleIfPoss(g2);
  assertEquals(1, g3.body.length());
  assertEquals(g2.apple, g3.apple);
  assertEquals(g2.body[0], g3.priorTail);
  // positive case
  var g4 = g2.with_head(new Square(23, 15));
  var g5 = eatAppleIfPoss(g4);
  assertEquals(2, g5.body.length());
  assertEquals(new Square(12, 15), g5.apple);
  assertEquals(g1.priorTail, g5.priorTail);
}} // end test

class Test_overApple {
@Test static void test_overApple() {
  var g1 = new Game(new Random());
  var g2 = g1.with_apple(new Square(23, 15));
  assertEquals(false, headOverApple(g2));
  var g3 = g2.with_head(new Square(23, 15));
  assertEquals(true, headOverApple(g3));
}} // end test

class Test_gameOver {
@Test static void test_gameOver() {
  var g1 = new Game((new Random()));
  assertEquals(false, gameOver(g1));
  var g2 = g1.with_head(new Square(0, 0));
  assertEquals(false, gameOver(g2));
  var g3 = g1.with_head(new Square(40, 15));
  assertEquals(true, gameOver(g3));
  var g4 = g1.with_head(new Square(21, 15));
  assertEquals(true, gameOver(g4));
}} // end test

class Test_headIsAtEdge {
@Test static void test_headIsAtEdge() {
  var g1 = new Game(new Random());
  assertEquals(false, hasHitEdge(g1));
  var g2 = g1.with_head(new Square(40, 15));
  assertEquals(true, hasHitEdge(g2));
  var g3 = g1.with_head(new Square(-1, 15));
  assertEquals(true, hasHitEdge(g3));
  var g4 = g1.with_head(new Square(20, 30));
  assertEquals(true, hasHitEdge(g4));
  var g5 = g1.with_head(new Square(20, -1));
  assertEquals(true, hasHitEdge(g5));
}} // end test

class Test_newSquare {
@Test static void test_newSquare() {
  var sq = new Square(3, 4);
  assertEquals(3, sq.x);
  assertEquals(4, sq.y);
}} // end test

class Test_newGame {
@Test static void test_newGame() {
  var rnd = new Random();
  var game = new Game(rnd);
  var totest = game.rnd.equals(rnd);
  assertEquals(true, totest);
  assertEquals(new Square(22, 15), game.head);
  var body = game.body;
  assertEquals(2, body.length());
  assertEquals(new Square(20, 15), body[0]);
  assertEquals(new Square(21, 15), body[1]);
  assertEquals(new Square(0, 0), game.priorTail);
  assertEquals("d", game.key);
  assertEquals(true, game.isOn);
}} // end test
} // end Global
