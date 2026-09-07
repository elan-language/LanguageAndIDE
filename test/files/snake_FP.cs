// C# with Elan 2.0.0-beta3

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
  var g2 = if_(k.equals(""), g, g.with_key(k));
  var g3 = moveSnake(g2);
  var g4 = eatAppleIfPoss(g3);
  return if_(gameOver(g4), g4.with_isOn(false), g4);
} // end function

static List<List<int>> updateGraphics(Game g, List<List<int>> b) { // function
  var b2 = graphicsPut(b, g.apple.x, g.apple.y, red);
  var b3 = graphicsPut(b2, g.head.x, g.head.y, green);
  var tail = g.body[0];
  var tailColour = if_(tail.equals(g.priorTail), green, white);
  return graphicsPut(b3, tail.x, tail.y, tailColour);
} // end function

static List<List<int>> graphicsPut(List<List<int>> graphics, int x, int y, int colour) { // function
  return graphics.withPut(x, graphics[x].withPut(y, colour));
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

static bool headOverApple(Game g) { // function
  return g.head.equals(g.apple);
} // end function

static bool gameOver(Game g) { // function
  return g.body.contains(g.head) || hasHitEdge(g);
} // end function

static bool hasHitEdge(Game g) { // function
  var x = g.head.x;
  var y = g.head.y;
  return (x == -1) || (y == -1) || (x == 40) || (y == 30);
} // end function

class Game {

  public Game(Random rnd) {
    this.head = new Square(22, 15); // assignment
    this.body = new [] {new Square(20, 15), new Square(21, 15)}; // assignment
    this.priorTail = new Square(0, 0); // assignment
    this.key = "d"; // assignment
    this.isOn = true; // assignment
    this.apple = new Square(12, 15); // assignment
    this.rnd = rnd; // assignment
  } // end constructor

  public Square head {get; private set;} // property

  public List<Square> body {get; private set;} // property

  public Square priorTail {get; private set;} // property

  public Square apple {get; private set;} // property

  public bool isOn {get; private set;} // property

  public Random rnd {get; private set;} // property

  public string key {get; private set;} // property

  public string toString() { // function method
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

  public Game with_isOn(bool isOn) { // function method
    return copyWith(this, "isOn", isOn);
  } // end function method

  public Game with_rnd(Random rnd) { // function method
    return copyWith(this, "rnd", rnd);
  } // end function method

  public Game with_key(string key) { // function method
    return copyWith(this, "key", key);
  } // end function method

} // end class

class Square {

  public Square(int x, int y) {
    this.x = x; // assignment
    this.y = y; // assignment
  } // end constructor

  public int x {get; private set;} // property

  public int y {get; private set;} // property

  public string toString() { // function method
    return $"{this.x}, {this.y}";
  } // end function method

} // end class

[TestClass] class Test_clockTick
[TestMethod] static void test_clockTick() {
  var g1 = new Game(new Random());
  var g2 = g1.withNewApple();
  var g3 = clockTick(g2, "s");
  Assert.AreEqual(new Square(22, 16), g3.head);
  Assert.AreEqual(2, g3.body.length());
  Assert.AreEqual(g2.body[0], g3.priorTail);
  Assert.AreEqual(true, g3.isOn);
  var g4 = g3.with_apple(new Square(22, 17));
  var g5 = clockTick(g4, "s");
  Assert.AreEqual(3, g5.body.length());
  Assert.AreEqual(g4.priorTail, g5.priorTail);
  Assert.AreEqual(true, g5.isOn);
  var g6 = g5.with_head(new Square(22, 29));
  var g7 = clockTick(g6, "s");
  Assert.AreEqual(false, g7.isOn);
}} // end test

[TestClass] class Test_updateGraphics
[TestMethod] static void test_updateGraphics() {
  var blocks = createBlockGraphics(white);
  var g1 = new Game(new Random());
  var blocks2 = updateGraphics(g1, blocks);
  Assert.AreEqual(red, blocks2[12][15]);
  Assert.AreEqual(green, blocks2[22][15]);
  Assert.AreEqual(white, blocks2[21][15]);
  var g3 = clockTick(g1, "d");
  var blocks3 = updateGraphics(g3, blocks2);
  Assert.AreEqual(red, blocks3[12][15]);
  Assert.AreEqual(green, blocks3[22][15]);
  Assert.AreEqual(green, blocks3[23][15]);
}} // end test

[TestClass] class Test_testnewApple
[TestMethod] static void test_testnewApple() {
  var g1 = new Game(new Random());
  Assert.AreEqual(new Square(12, 15), g1.apple);
  var g2 = g1.withNewApple();
  Assert.AreEqual(new Square(12, 15), g2.apple);
  var g3 = g2.withNewApple();
  Assert.AreEqual(new Square(10, 12), g3.apple);
  // test that apple is never over snake
  var g4 = (new Game(new Random()));
  var g5 = g4.with_body(new [] {new Square(10, 12)});
  var g6 = g5.withNewApple();
  Assert.AreEqual(new Square(12, 15), g4.apple);
}} // end test

[TestClass] class Test_score
[TestMethod] static void test_score() {
  var g1 = new Game(new Random());
  Assert.AreEqual(0, score(g1));
  var g2 = g1.with_body(new [] {new Square(4, 4), new Square(5, 4)});
  Assert.AreEqual(0, score(g2));
  var g3 = g1.with_body(new [] {new Square(3, 4), new Square(4, 4), new Square(5, 4)});
  Assert.AreEqual(1, score(g3));
  var g4 = g1.with_body(new [] {new Square(3, 4), new Square(4, 4), new Square(5, 4), new Square(5, 5)});
  Assert.AreEqual(2, score(g4));
}} // end test

[TestClass] class Test_moveSnake
[TestMethod] static void test_moveSnake() {
  var g1 = new Game(new Random());
  var g2 = g1.with_key("a");
  var g3 = moveSnake(g2);
  Assert.AreEqual(new Square(21, 15), g3.head);
  var g4 = g1.with_key("d");
  var g5 = moveSnake(g4);
  Assert.AreEqual(new Square(23, 15), g5.head);
  var g6 = g1.with_key("w");
  var g7 = moveSnake(g6);
  Assert.AreEqual(new Square(22, 14), g7.head);
  var g8 = g1.with_key("s");
  var g9 = moveSnake(g8);
  Assert.AreEqual(new Square(22, 16), g9.head);
}} // end test

[TestClass] class Test_eatAppleIfPoss
[TestMethod] static void test_eatAppleIfPoss() {
  var g1 = new Game(new Random());
  Assert.AreEqual(2, g1.body.length());
  // negative case
  var g2 = g1.with_apple(new Square(23, 15));
  var g3 = eatAppleIfPoss(g2);
  Assert.AreEqual(1, g3.body.length());
  Assert.AreEqual(g2.apple, g3.apple);
  Assert.AreEqual(g2.body[0], g3.priorTail);
  // positive case
  var g4 = g2.with_head(new Square(23, 15));
  var g5 = eatAppleIfPoss(g4);
  Assert.AreEqual(2, g5.body.length());
  Assert.AreEqual(new Square(12, 15), g5.apple);
  Assert.AreEqual(g1.priorTail, g5.priorTail);
}} // end test

[TestClass] class Test_overApple
[TestMethod] static void test_overApple() {
  var g1 = new Game(new Random());
  var g2 = g1.with_apple(new Square(23, 15));
  Assert.AreEqual(false, headOverApple(g2));
  var g3 = g2.with_head(new Square(23, 15));
  Assert.AreEqual(true, headOverApple(g3));
}} // end test

[TestClass] class Test_gameOver
[TestMethod] static void test_gameOver() {
  var g1 = new Game((new Random()));
  Assert.AreEqual(false, gameOver(g1));
  var g2 = g1.with_head(new Square(0, 0));
  Assert.AreEqual(false, gameOver(g2));
  var g3 = g1.with_head(new Square(40, 15));
  Assert.AreEqual(true, gameOver(g3));
  var g4 = g1.with_head(new Square(21, 15));
  Assert.AreEqual(true, gameOver(g4));
}} // end test

[TestClass] class Test_headIsAtEdge
[TestMethod] static void test_headIsAtEdge() {
  var g1 = new Game(new Random());
  Assert.AreEqual(false, hasHitEdge(g1));
  var g2 = g1.with_head(new Square(40, 15));
  Assert.AreEqual(true, hasHitEdge(g2));
  var g3 = g1.with_head(new Square(-1, 15));
  Assert.AreEqual(true, hasHitEdge(g3));
  var g4 = g1.with_head(new Square(20, 30));
  Assert.AreEqual(true, hasHitEdge(g4));
  var g5 = g1.with_head(new Square(20, -1));
  Assert.AreEqual(true, hasHitEdge(g5));
}} // end test

[TestClass] class Test_newSquare
[TestMethod] static void test_newSquare() {
  var sq = new Square(3, 4);
  Assert.AreEqual(3, sq.x);
  Assert.AreEqual(4, sq.y);
}} // end test

[TestClass] class Test_newGame
[TestMethod] static void test_newGame() {
  var rnd = new Random();
  var game = new Game(rnd);
  var totest = game.rnd.equals(rnd);
  Assert.AreEqual(true, totest);
  Assert.AreEqual(new Square(22, 15), game.head);
  var body = game.body;
  Assert.AreEqual(2, body.length());
  Assert.AreEqual(new Square(20, 15), body[0]);
  Assert.AreEqual(new Square(21, 15), body[1]);
  Assert.AreEqual(new Square(0, 0), game.priorTail);
  Assert.AreEqual("d", game.key);
  Assert.AreEqual(true, game.isOn);
}} // end test
