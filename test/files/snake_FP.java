// Java with Elan 2.0.0-alpha5

public class Global {

// Use the W,A,S,D keys to change Snake direction

static void main() {
  var blocks = createBlockGraphics(white);
  var rnd = new Random();
  rnd.initialiseFromClock(); // call procedure
  var game = (new Game(rnd)).withNewApple();
  while (game.isOn) {
    blocks = updateGraphics(game, blocks); // reassign variable
    displayBlocks(blocks); // call procedure
    sleep_ms(150); // call procedure
    game = clockTick(game, getKey()); // reassign variable
  } // while
  System.out.println(String.format("Game Over! Score: %", score(game))); // print
} // main

static Game clockTick(Game g, String k) { // function
  var g2 = if(k.equals(""), g, g.withKey(k)); // let
  var g3 = moveSnake(g2); // let
  var g4 = eatAppleIfPoss(g3); // let
  return if(gameOver(g4), g4.withIsOn(false), g4);
} // function

static List<List<int>> updateGraphics(Game g, List<List<int>> b) { // function
  var b2 = graphicsPut(b, g.apple.x, g.apple.y, red); // let
  var b3 = graphicsPut(b2, g.head.x, g.head.y, green); // let
  var tail = g.body[0]; // let
  var tailColour = if(tail.equals(g.priorTail), green, white); // let
  return graphicsPut(b3, tail.x, tail.y, tailColour);
} // function

static List<List<int>> graphicsPut(List<List<int>> graphics, int x, int y, int colour) { // function
  return graphics.withSet(x, graphics[x].withSet(y, colour));
} // function

static int score(Game g) { // function
  return g.body.length() - 2;
} // function

static Game moveSnake(Game g) { // function
  var k = g.key; // let
  var x = g.head.x; // let
  var y = g.head.y; // let
  var newX = if(k.equals("a"), x - 1, if(k.equals("d"), x + 1, x)); // let
  var newY = if(k.equals("w"), y - 1, if(k.equals("s"), y + 1, y)); // let
  return g.withBody(g.body.withAppend(g.head)).withHead(new Square(newX, newY));
} // function

static Game eatAppleIfPoss(Game g) { // function
  var tail = g.body[0]; // let
  var moveTail = g.body.subList(1, g.body.length()); // let
  return if(headOverApple(g), g.withNewApple(), g.withPriorTail(tail).withBody(moveTail));
} // function

static bool headOverApple(Game g) { // function
  return g.head.equals(g.apple);
} // function

static bool gameOver(Game g) { // function
  return g.body.contains(g.head) || hasHitEdge(g);
} // function

static bool hasHitEdge(Game g) { // function
  var x = g.head.x; // let
  var y = g.head.y; // let
  return (x == -1) || (y == -1) || (x == 40) || (y == 30);
} // function

class Game {

  public Square head; // property

  public List<Square> body; // property

  public Square priorTail; // property

  public Square apple; // property

  public bool isOn; // property

  public Random rnd; // property

  public String key; // property

  public Game(Random rnd) {
    this.head = new Square(22, 15); // reassign variable
    this.body = [new Square(20, 15), new Square(21, 15)]; // reassign variable
    this.priorTail = new Square(0, 0); // reassign variable
    this.key = "d"; // reassign variable
    this.isOn = true; // reassign variable
    this.apple = new Square(12, 15); // reassign variable
    this.rnd = rnd; // reassign variable
  } // constructor

  public String toString() { // function method
    return "a Game";
  } // function method

  public Game withNewApple() { // function method
    var x = this.rnd.asInt(0, 39); // let
    var rnd2 = this.rnd.nextGen(); // let
    var y = rnd2.asInt(0, 29); // let
    var rnd3 = rnd2.nextGen(); // let
    var apple2 = new Square(x, y); // let
    var g2 = this.withApple(apple2).withRnd(rnd3); // let
    return if(g2.body.contains(apple2), g2.withNewApple(), g2);
  } // function method

  public Game withHead(Square value) { // function method
    var copyOfThis = copy(this); // let
    copyOfThis.head = value; // reassign variable
    return copyOfThis;
  } // function method

  public Game withBody(List<Square> value) { // function method
    var copyOfThis = copy(this); // let
    copyOfThis.body = value; // reassign variable
    return copyOfThis;
  } // function method

  public Game withPriorTail(Square value) { // function method
    var copyOfThis = copy(this); // let
    copyOfThis.priorTail = value; // reassign variable
    return copyOfThis;
  } // function method

  public Game withApple(Square value) { // function method
    var copyOfThis = copy(this); // let
    copyOfThis.apple = value; // reassign variable
    return copyOfThis;
  } // function method

  public Game withIsOn(bool value) { // function method
    var copyOfThis = copy(this); // let
    copyOfThis.isOn = value; // reassign variable
    return copyOfThis;
  } // function method

  public Game withRnd(Random value) { // function method
    var copyOfThis = copy(this); // let
    copyOfThis.rnd = value; // reassign variable
    return copyOfThis;
  } // function method

  public Game withKey(String value) { // function method
    var copyOfThis = copy(this); // let
    copyOfThis.key = value; // reassign variable
    return copyOfThis;
  } // function method

} // class

class Square {

  public int x; // property

  public int y; // property

  public Square(int x, int y) {
    this.x = x; // reassign variable
    this.y = y; // reassign variable
  } // constructor

  public String toString() { // function method
    return String.format("%, %", this.x, this.y);
  } // function method

} // class

@Test static void test_clockTick() {
  var g1 = new Game(new Random()); // let
  var g2 = g1.withNewApple(); // let
  var g3 = clockTick(g2, "s"); // let
  assertEquals(new Square(22, 16), g3.head);
  assertEquals(2, g3.body.length());
  assertEquals(g2.body[0], g3.priorTail);
  assertEquals(true, g3.isOn);
  var g4 = g3.withApple(new Square(22, 17)); // let
  var g5 = clockTick(g4, "s"); // let
  assertEquals(3, g5.body.length());
  assertEquals(g4.priorTail, g5.priorTail);
  assertEquals(true, g5.isOn);
  var g6 = g5.withHead(new Square(22, 29)); // let
  var g7 = clockTick(g6, "s"); // let
  assertEquals(false, g7.isOn);
} // test

@Test static void test_updateGraphics() {
  var blocks = createBlockGraphics(white); // let
  var g1 = new Game(new Random()); // let
  var blocks2 = updateGraphics(g1, blocks); // let
  assertEquals(red, blocks2[12][15]);
  assertEquals(green, blocks2[22][15]);
  assertEquals(white, blocks2[21][15]);
  var g3 = clockTick(g1, "d"); // let
  var blocks3 = updateGraphics(g3, blocks2); // let
  assertEquals(red, blocks3[12][15]);
  assertEquals(green, blocks3[22][15]);
  assertEquals(green, blocks3[23][15]);
} // test

@Test static void test_testnewApple() {
  var g1 = new Game(new Random()); // let
  assertEquals(new Square(12, 15), g1.apple);
  var g2 = g1.withNewApple(); // let
  assertEquals(new Square(12, 15), g2.apple);
  var g3 = g2.withNewApple(); // let
  assertEquals(new Square(10, 12), g3.apple);
  // test that apple is never over snake
  var g4 = (new Game(new Random())); // let
  var g5 = g4.withBody([new Square(10, 12)]); // let
  var g6 = g5.withNewApple(); // let
  assertEquals(new Square(12, 15), g4.apple);
} // test

@Test static void test_score() {
  var g1 = new Game(new Random()); // let
  assertEquals(0, score(g1));
  var g2 = g1.withBody([new Square(4, 4), new Square(5, 4)]); // let
  assertEquals(0, score(g2));
  var g3 = g1.withBody([new Square(3, 4), new Square(4, 4), new Square(5, 4)]); // let
  assertEquals(1, score(g3));
  var g4 = g1.withBody([new Square(3, 4), new Square(4, 4), new Square(5, 4), new Square(5, 5)]); // let
  assertEquals(2, score(g4));
} // test

@Test static void test_moveSnake() {
  var g1 = new Game(new Random()); // let
  var g2 = g1.withKey("a"); // let
  var g3 = moveSnake(g2); // let
  assertEquals(new Square(21, 15), g3.head);
  var g4 = g1.withKey("d"); // let
  var g5 = moveSnake(g4); // let
  assertEquals(new Square(23, 15), g5.head);
  var g6 = g1.withKey("w"); // let
  var g7 = moveSnake(g6); // let
  assertEquals(new Square(22, 14), g7.head);
  var g8 = g1.withKey("s"); // let
  var g9 = moveSnake(g8); // let
  assertEquals(new Square(22, 16), g9.head);
} // test

@Test static void test_eatAppleIfPoss() {
  var g1 = new Game(new Random()); // let
  assertEquals(2, g1.body.length());
  // negative case
  var g2 = g1.withApple(new Square(23, 15)); // let
  var g3 = eatAppleIfPoss(g2); // let
  assertEquals(1, g3.body.length());
  assertEquals(g2.apple, g3.apple);
  assertEquals(g2.body[0], g3.priorTail);
  // positive case
  var g4 = g2.withHead(new Square(23, 15)); // let
  var g5 = eatAppleIfPoss(g4); // let
  assertEquals(2, g5.body.length());
  assertEquals(new Square(12, 15), g5.apple);
  assertEquals(g1.priorTail, g5.priorTail);
} // test

@Test static void test_overApple() {
  var g1 = new Game(new Random()); // let
  var g2 = g1.withApple(new Square(23, 15)); // let
  assertEquals(false, headOverApple(g2));
  var g3 = g2.withHead(new Square(23, 15)); // let
  assertEquals(true, headOverApple(g3));
} // test

@Test static void test_gameOver() {
  var g1 = new Game((new Random())); // let
  assertEquals(false, gameOver(g1));
  var g2 = g1.withHead(new Square(0, 0)); // let
  assertEquals(false, gameOver(g2));
  var g3 = g1.withHead(new Square(40, 15)); // let
  assertEquals(true, gameOver(g3));
  var g4 = g1.withHead(new Square(21, 15)); // let
  assertEquals(true, gameOver(g4));
} // test

@Test static void test_headIsAtEdge() {
  var g1 = new Game(new Random()); // let
  assertEquals(false, hasHitEdge(g1));
  var g2 = g1.withHead(new Square(40, 15)); // let
  assertEquals(true, hasHitEdge(g2));
  var g3 = g1.withHead(new Square(-1, 15)); // let
  assertEquals(true, hasHitEdge(g3));
  var g4 = g1.withHead(new Square(20, 30)); // let
  assertEquals(true, hasHitEdge(g4));
  var g5 = g1.withHead(new Square(20, -1)); // let
  assertEquals(true, hasHitEdge(g5));
} // test

@Test static void test_newSquare() {
  var sq = new Square(3, 4); // let
  assertEquals(3, sq.x);
  assertEquals(4, sq.y);
} // test

@Test static void test_newGame() {
  var rnd = new Random(); // let
  var game = new Game(rnd); // let
  var totest = game.rnd.equals(rnd); // let
  assertEquals(true, totest);
  assertEquals(new Square(22, 15), game.head);
  var body = game.body; // let
  assertEquals(2, body.length());
  assertEquals(new Square(20, 15), body[0]);
  assertEquals(new Square(21, 15), body[1]);
  assertEquals(new Square(0, 0), game.priorTail);
  assertEquals("d", game.key);
  assertEquals(true, game.isOn);
} // test

}
