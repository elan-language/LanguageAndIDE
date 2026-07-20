// C# with Elan 2.0.0-beta2

// Use the W,A,S,D keys to change Snake direction

static void main() {
  var blocks = createBlockGraphics(white);
  var rnd = new Random();
  rnd.initialiseFromClock(); // procedure call
  var game = (new Game(rnd)).withNewApple();
  while (game.isOn) {
    blocks = updateGraphics(game, blocks); // assignment
    displayBlocks(blocks); // procedure call
    sleep_ms(150); // procedure call
    game = clockTick(game, getKey()); // assignment
  } // end while
  Console.WriteLine($"Game Over! Score: {score(game)}"); // print statement
} // end main

static Game clockTick(Game g, string k) { // function
  var g2 = if_(k.equals(""), g, g.with_key(k)); // let
  var g3 = moveSnake(g2); // let
  var g4 = eatAppleIfPoss(g3); // let
  return if_(gameOver(g4), g4.with_isOn(false), g4);
} // end function

static List<List<int>> updateGraphics(Game g, List<List<int>> b) { // function
  var b2 = graphicsPut(b, g.apple.x, g.apple.y, red); // let
  var b3 = graphicsPut(b2, g.head.x, g.head.y, green); // let
  var tail = g.body[0]; // let
  var tailColour = if_(tail.equals(g.priorTail), green, white); // let
  return graphicsPut(b3, tail.x, tail.y, tailColour);
} // end function

static List<List<int>> graphicsPut(List<List<int>> graphics, int x, int y, int colour) { // function
  return graphics.withPut(x, graphics[x].withPut(y, colour));
} // end function

static int score(Game g) { // function
  return g.body.length() - 2;
} // end function

static Game moveSnake(Game g) { // function
  var k = g.key; // let
  var x = g.head.x; // let
  var y = g.head.y; // let
  var newX = if_(k.equals("a"), x - 1, if_(k.equals("d"), x + 1, x)); // let
  var newY = if_(k.equals("w"), y - 1, if_(k.equals("s"), y + 1, y)); // let
  return g.with_body(g.body.withAppend(g.head)).with_head(new Square(newX, newY));
} // end function

static Game eatAppleIfPoss(Game g) { // function
  var tail = g.body[0]; // let
  var moveTail = g.body.subList(1, g.body.length()); // let
  return if_(headOverApple(g), g.withNewApple(), g.with_priorTail(tail).with_body(moveTail));
} // end function

static bool headOverApple(Game g) { // function
  return g.head.equals(g.apple);
} // end function

static bool gameOver(Game g) { // function
  return g.body.contains(g.head) || hasHitEdge(g);
} // end function

static bool hasHitEdge(Game g) { // function
  var x = g.head.x; // let
  var y = g.head.y; // let
  return (x == -1) || (y == -1) || (x == 40) || (y == 30);
} // end function

class Game {

  public Square head {get; private set;} // property

  public List<Square> body {get; private set;} // property

  public Square priorTail {get; private set;} // property

  public Square apple {get; private set;} // property

  public bool isOn {get; private set;} // property

  public Random rnd {get; private set;} // property

  public string key {get; private set;} // property

  public Game(Random rnd) {
    this.head = new Square(22, 15); // assignment
    this.body = new [] {new Square(20, 15), new Square(21, 15)}; // assignment
    this.priorTail = new Square(0, 0); // assignment
    this.key = "d"; // assignment
    this.isOn = true; // assignment
    this.apple = new Square(12, 15); // assignment
    this.rnd = rnd; // assignment
  } // end constructor

  public string toString() { // function method
    return "a Game";
  } // end function method

  public Game withNewApple() { // function method
    var x = this.rnd.asInt(0, 39); // let
    var rnd2 = this.rnd.nextGen(); // let
    var y = rnd2.asInt(0, 29); // let
    var rnd3 = rnd2.nextGen(); // let
    var apple2 = new Square(x, y); // let
    var g2 = this.with_apple(apple2).with_rnd(rnd3); // let
    return if_(g2.body.contains(apple2), g2.withNewApple(), g2);
  } // end function method

  Game with_head(Square head) { // copy with method
    return copyWithPropertyUpdated(this, "head", head);
  } // end with method

  Game with_body(List<Square> body) { // copy with method
    return copyWithPropertyUpdated(this, "body", body);
  } // end with method

  Game with_priorTail(Square priorTail) { // copy with method
    return copyWithPropertyUpdated(this, "priorTail", priorTail);
  } // end with method

  Game with_apple(Square apple) { // copy with method
    return copyWithPropertyUpdated(this, "apple", apple);
  } // end with method

  Game with_isOn(bool isOn) { // copy with method
    return copyWithPropertyUpdated(this, "isOn", isOn);
  } // end with method

  Game with_rnd(Random rnd) { // copy with method
    return copyWithPropertyUpdated(this, "rnd", rnd);
  } // end with method

  Game with_key(string key) { // copy with method
    return copyWithPropertyUpdated(this, "key", key);
  } // end with method

} // end class

class Square {

  public int x {get; private set;} // property

  public int y {get; private set;} // property

  public Square(int x, int y) {
    this.x = x; // assignment
    this.y = y; // assignment
  } // end constructor

  public string toString() { // function method
    return $"{this.x}, {this.y}";
  } // end function method

} // end class

[TestClass] class Test_clockTick
[TestMethod] static void test_clockTick() {
  var g1 = new Game(new Random()); // let
  var g2 = g1.withNewApple(); // let
  var g3 = clockTick(g2, "s"); // let
  Assert.AreEqual(new Square(22, 16), g3.head);
  Assert.AreEqual(2, g3.body.length());
  Assert.AreEqual(g2.body[0], g3.priorTail);
  Assert.AreEqual(true, g3.isOn);
  var g4 = g3.with_apple(new Square(22, 17)); // let
  var g5 = clockTick(g4, "s"); // let
  Assert.AreEqual(3, g5.body.length());
  Assert.AreEqual(g4.priorTail, g5.priorTail);
  Assert.AreEqual(true, g5.isOn);
  var g6 = g5.with_head(new Square(22, 29)); // let
  var g7 = clockTick(g6, "s"); // let
  Assert.AreEqual(false, g7.isOn);
}} // end test

[TestClass] class Test_updateGraphics
[TestMethod] static void test_updateGraphics() {
  var blocks = createBlockGraphics(white); // let
  var g1 = new Game(new Random()); // let
  var blocks2 = updateGraphics(g1, blocks); // let
  Assert.AreEqual(red, blocks2[12][15]);
  Assert.AreEqual(green, blocks2[22][15]);
  Assert.AreEqual(white, blocks2[21][15]);
  var g3 = clockTick(g1, "d"); // let
  var blocks3 = updateGraphics(g3, blocks2); // let
  Assert.AreEqual(red, blocks3[12][15]);
  Assert.AreEqual(green, blocks3[22][15]);
  Assert.AreEqual(green, blocks3[23][15]);
}} // end test

[TestClass] class Test_testnewApple
[TestMethod] static void test_testnewApple() {
  var g1 = new Game(new Random()); // let
  Assert.AreEqual(new Square(12, 15), g1.apple);
  var g2 = g1.withNewApple(); // let
  Assert.AreEqual(new Square(12, 15), g2.apple);
  var g3 = g2.withNewApple(); // let
  Assert.AreEqual(new Square(10, 12), g3.apple);
  // test that apple is never over snake
  var g4 = (new Game(new Random())); // let
  var g5 = g4.with_body(new [] {new Square(10, 12)}); // let
  var g6 = g5.withNewApple(); // let
  Assert.AreEqual(new Square(12, 15), g4.apple);
}} // end test

[TestClass] class Test_score
[TestMethod] static void test_score() {
  var g1 = new Game(new Random()); // let
  Assert.AreEqual(0, score(g1));
  var g2 = g1.with_body(new [] {new Square(4, 4), new Square(5, 4)}); // let
  Assert.AreEqual(0, score(g2));
  var g3 = g1.with_body(new [] {new Square(3, 4), new Square(4, 4), new Square(5, 4)}); // let
  Assert.AreEqual(1, score(g3));
  var g4 = g1.with_body(new [] {new Square(3, 4), new Square(4, 4), new Square(5, 4), new Square(5, 5)}); // let
  Assert.AreEqual(2, score(g4));
}} // end test

[TestClass] class Test_moveSnake
[TestMethod] static void test_moveSnake() {
  var g1 = new Game(new Random()); // let
  var g2 = g1.with_key("a"); // let
  var g3 = moveSnake(g2); // let
  Assert.AreEqual(new Square(21, 15), g3.head);
  var g4 = g1.with_key("d"); // let
  var g5 = moveSnake(g4); // let
  Assert.AreEqual(new Square(23, 15), g5.head);
  var g6 = g1.with_key("w"); // let
  var g7 = moveSnake(g6); // let
  Assert.AreEqual(new Square(22, 14), g7.head);
  var g8 = g1.with_key("s"); // let
  var g9 = moveSnake(g8); // let
  Assert.AreEqual(new Square(22, 16), g9.head);
}} // end test

[TestClass] class Test_eatAppleIfPoss
[TestMethod] static void test_eatAppleIfPoss() {
  var g1 = new Game(new Random()); // let
  Assert.AreEqual(2, g1.body.length());
  // negative case
  var g2 = g1.with_apple(new Square(23, 15)); // let
  var g3 = eatAppleIfPoss(g2); // let
  Assert.AreEqual(1, g3.body.length());
  Assert.AreEqual(g2.apple, g3.apple);
  Assert.AreEqual(g2.body[0], g3.priorTail);
  // positive case
  var g4 = g2.with_head(new Square(23, 15)); // let
  var g5 = eatAppleIfPoss(g4); // let
  Assert.AreEqual(2, g5.body.length());
  Assert.AreEqual(new Square(12, 15), g5.apple);
  Assert.AreEqual(g1.priorTail, g5.priorTail);
}} // end test

[TestClass] class Test_overApple
[TestMethod] static void test_overApple() {
  var g1 = new Game(new Random()); // let
  var g2 = g1.with_apple(new Square(23, 15)); // let
  Assert.AreEqual(false, headOverApple(g2));
  var g3 = g2.with_head(new Square(23, 15)); // let
  Assert.AreEqual(true, headOverApple(g3));
}} // end test

[TestClass] class Test_gameOver
[TestMethod] static void test_gameOver() {
  var g1 = new Game((new Random())); // let
  Assert.AreEqual(false, gameOver(g1));
  var g2 = g1.with_head(new Square(0, 0)); // let
  Assert.AreEqual(false, gameOver(g2));
  var g3 = g1.with_head(new Square(40, 15)); // let
  Assert.AreEqual(true, gameOver(g3));
  var g4 = g1.with_head(new Square(21, 15)); // let
  Assert.AreEqual(true, gameOver(g4));
}} // end test

[TestClass] class Test_headIsAtEdge
[TestMethod] static void test_headIsAtEdge() {
  var g1 = new Game(new Random()); // let
  Assert.AreEqual(false, hasHitEdge(g1));
  var g2 = g1.with_head(new Square(40, 15)); // let
  Assert.AreEqual(true, hasHitEdge(g2));
  var g3 = g1.with_head(new Square(-1, 15)); // let
  Assert.AreEqual(true, hasHitEdge(g3));
  var g4 = g1.with_head(new Square(20, 30)); // let
  Assert.AreEqual(true, hasHitEdge(g4));
  var g5 = g1.with_head(new Square(20, -1)); // let
  Assert.AreEqual(true, hasHitEdge(g5));
}} // end test

[TestClass] class Test_newSquare
[TestMethod] static void test_newSquare() {
  var sq = new Square(3, 4); // let
  Assert.AreEqual(3, sq.x);
  Assert.AreEqual(4, sq.y);
}} // end test

[TestClass] class Test_newGame
[TestMethod] static void test_newGame() {
  var rnd = new Random(); // let
  var game = new Game(rnd); // let
  var totest = game.rnd.equals(rnd); // let
  Assert.AreEqual(true, totest);
  Assert.AreEqual(new Square(22, 15), game.head);
  var body = game.body; // let
  Assert.AreEqual(2, body.length());
  Assert.AreEqual(new Square(20, 15), body[0]);
  Assert.AreEqual(new Square(21, 15), body[1]);
  Assert.AreEqual(new Square(0, 0), game.priorTail);
  Assert.AreEqual("d", game.key);
  Assert.AreEqual(true, game.isOn);
}} // end test
