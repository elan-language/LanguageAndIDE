// Java with Elan 2.0.0-beta5

public class Global {

// Use the W,A,S,D keys to change Snake direction

static final int width = 40; // constant

static final int height = 30; // constant

static void main() {
  var rnd = new Random();
  rnd.initialiseFromClock(); // procedure call
  var game = new Game(rnd);
  while (game.isOn) {
    game = if_(game.apple == -1, withNewApple(game), game); // assignment
    var blocks = new BlockGraphics();
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

static BlockGraphics updateGraphics(Game g, BlockGraphics bg) { // function
  var bg2 = g.body.reduce(bg, (BlockGraphics b, int bl) -> b.withPutBlockNo(bl, green));
  return bg2.withPutBlockNo(g.apple, red);
} // end function

static int score(Game g) { // function
  return g.body.length() - 1;
} // end function

static Game moveSnake(Game g) { // function
  var k = g.key;
  var col = g.head % width;
  var row = divAsInt(g.head, width);
  var newCol = if_(k.equals("a"), col - 1, if_(k.equals("d"), col + 1, col));
  var newRow = if_(k.equals("w"), row - 1, if_(k.equals("s"), row + 1, row));
  var inBounds = (newCol >= 0) && (newCol < width) && (newRow >= 0) && (newRow < height);
  var newHead = if_(inBounds, newRow*width + newCol, -1);
  return if_((newHead == -1) || selfCollision(newHead, g), g.with_isOn(false), g.with_body(g.body.withAppend(newHead)).with_head(newHead));
} // end function

static Game eatAppleIfPoss(Game g) { // function
  return if_(headOverApple(g), withNewApple(g), g.with_body(g.body.withRemoveAt(0)));
} // end function

static boolean headOverApple(Game g) { // function
  return g.head.equals(g.apple);
} // end function

static boolean gameOver(Game g) { // function
  // TODO not currently checking for self-collision
  return hasHitEdge(g);
} // end function

static boolean selfCollision(int newHead, Game g) { // function
  return g.body.contains(newHead);
} // end function

static boolean hasHitEdge(Game g) { // function
  return g.head == -1;
} // end function

static boolean appleIsUnderBody(Game g) { // function
  return g.body.contains(g.apple);
} // end function

static Game withNewApple(Game g) { // function
  var apple2 = g.rnd.asInt(0, width*height - 1);
  var rnd2 = g.rnd.nextGen();
  var g2 = g.with_apple(apple2).with_rnd(rnd2);
  return if_(!appleIsUnderBody(g2), g2, withNewApple(g));
} // end function

class Game {

  public Game(Random rnd) {
    this.head = 620; // assignment
    this.body = list(this.head - 1, this.head); // assignment
    this.key = "d"; // assignment
    this.isOn = true; // assignment
    this.apple = -1; // assignment
    this.rnd = rnd; // assignment
  } // end constructor

  public int head; // property

  public List<int> body; // property

  public int apple; // property

  public boolean isOn; // property

  public Random rnd; // property

  public String key; // property

  public String toString() { // function method
    return "a Game";
  } // end function method

  public Game with_head(int head) { // function method
    return copyWith(this, "head", head);
  } // end function method

  public Game with_body(List<int> body) { // function method
    return copyWith(this, "body", body);
  } // end function method

  public Game with_apple(int apple) { // function method
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

[ghosted] class Test_clockTick {
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

[ghosted] class Test_updateGraphics {
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

[ghosted] class Test_testnewApple {
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

[ghosted] class Test_score {
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

[ghosted] class Test_moveSnake {
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

[ghosted] class Test_eatAppleIfPoss {
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

[ghosted] class Test_overApple {
@Test static void test_overApple() {
  var g1 = new Game(new Random());
  var g2 = g1.with_apple(new Square(23, 15));
  assertEquals(false, headOverApple(g2));
  var g3 = g2.with_head(new Square(23, 15));
  assertEquals(true, headOverApple(g3));
}} // end test

[ghosted] class Test_gameOver {
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

[ghosted] class Test_headIsAtEdge {
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

[ghosted] class Test_newSquare {
@Test static void test_newSquare() {
  var sq = new Square(3, 4);
  assertEquals(3, sq.x);
  assertEquals(4, sq.y);
}} // end test

[ghosted] class Test_newGame {
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
