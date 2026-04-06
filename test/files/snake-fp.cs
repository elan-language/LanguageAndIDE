// C# with Elan 2.0.0-alpha1

// Use the W,A,S,D keys to change Snake direction

static void main() {
  var blocks = createBlockGraphics(white);
  var rnd = new Random();
  rnd.initialiseFromClock(); // call procedure
  var game = (new Game(rnd)).withNewApple();
  while (game.isOn) {
    blocks = updateGraphics(game, blocks); // change variable
    displayBlocks(blocks); // call procedure
    sleep_ms(150); // call procedure
    game = clockTick(game, getKey()); // change variable
  }
  print($"Game Over! Score: {score(game)}"); // call procedure
}

static Game clockTick(Game g, string k) { // function
  var g2 = if(k.equals(""), g, g.withKey(k));
  var g3 = moveSnake(g2);
  var g4 = eatAppleIfPoss(g3);
  return if(gameOver(g4), g4.withIsOn(false), g4);
}

static List<List<int>> updateGraphics(Game g, List<List<int>> b) { // function
  var b2 = graphicsPut(b, g.apple.x, g.apple.y, red);
  var b3 = graphicsPut(b2, g.head.x, g.head.y, green);
  var tail = g.body[0];
  var tailColour = if(tail.equals(g.priorTail), green, white);
  return graphicsPut(b3, tail.x, tail.y, tailColour);
}

static List<List<int>> graphicsPut(List<List<int>> graphics, int x, int y, int colour) { // function
  return graphics.withSet(x, graphics[x].withSet(y, colour));
}

static int score(Game g) { // function
  return g.body.length() - 2;
}

static Game moveSnake(Game g) { // function
  var k = g.key;
  var x = g.head.x;
  var y = g.head.y;
  var newX = if(k.equals("a"), x - 1, if(k.equals("d"), x + 1, x));
  var newY = if(k.equals("w"), y - 1, if(k.equals("s"), y + 1, y));
  return g.withBody(g.body.withAppend(g.head)).withHead(new Square(newX, newY));
}

static Game eatAppleIfPoss(Game g) { // function
  var tail = g.body[0];
  var moveTail = g.body.subList(1, g.body.length());
  return if(headOverApple(g), g.withNewApple(), g.withPriorTail(tail).withBody(moveTail));
}

static bool headOverApple(Game g) { // function
  return g.head.equals(g.apple);
}

static bool gameOver(Game g) { // function
  return g.body.contains(g.head) || hasHitEdge(g);
}

static bool hasHitEdge(Game g) { // function
  const Int x = g.head.x;
  const Int y = g.head.y;
  return (x == -1) || (y == -1) || (x == 40) || (y == 30);
}

class Game {

  public Square head {get; private set;} // property
  public List<Square> body {get; private set;} // property
  public Square priorTail {get; private set;} // property
  public Square apple {get; private set;} // property
  public bool isOn {get; private set;} // property
  public Random rnd {get; private set;} // property
  public string key {get; private set;} // property
  public Game(Random rnd) {
    this.head = new Square(22, 15); // change variable
    this.body = [new Square(20, 15), new Square(21, 15)]; // change variable
    this.priorTail = new Square(0, 0); // change variable
    this.key = "d"; // change variable
    this.isOn = true; // change variable
    this.apple = new Square(12, 15); // change variable
    this.rnd = rnd; // change variable
  }
  public string toString() { // function
    return "";
  }
  public Game withNewApple() { // function
    var x_rnd2 = this.rnd.nextInt(0, 39);
    var x = x_rnd2.item_0;
    var rnd2 = x_rnd2.item_1;
    var y_rnd3 = rnd2.nextInt(0, 29);
    var y = y_rnd3.item_0;
    var rnd3 = y_rnd3.item_1;
    var apple2 = new Square(x, y);
    var g2 = this.withApple(apple2).withRnd(rnd3);
    return if(g2.body.contains(apple2), g2.withNewApple(), g2);
  }
  public Game withHead(Square value) { // function
    var copyOfThis = copy(this);
    copyOfThis.head = value; // change variable
    return copyOfThis;
  }
  public Game withBody(List<Square> value) { // function
    var copyOfThis = copy(this);
    copyOfThis.body = value; // change variable
    return copyOfThis;
  }
  public Game withPriorTail(Square value) { // function
    var copyOfThis = copy(this);
    copyOfThis.priorTail = value; // change variable
    return copyOfThis;
  }
  public Game withApple(Square value) { // function
    var copyOfThis = copy(this);
    copyOfThis.apple = value; // change variable
    return copyOfThis;
  }
  public Game withIsOn(bool value) { // function
    var copyOfThis = copy(this);
    copyOfThis.isOn = value; // change variable
    return copyOfThis;
  }
  public Game withRnd(Random value) { // function
    var copyOfThis = copy(this);
    copyOfThis.rnd = value; // change variable
    return copyOfThis;
  }
  public Game withKey(string value) { // function
    var copyOfThis = copy(this);
    copyOfThis.key = value; // change variable
    return copyOfThis;
  }
}

class Square {

  public int x {get; private set;} // property
  public int y {get; private set;} // property
  public Square(int x, int y) {
    this.x = x; // change variable
    this.y = y; // change variable
  }
  public Square withX(int value) { // function
    var copyOfThis = copy(this);
    copyOfThis.x = value; // change variable
    return copyOfThis;
  }
  public Square withY(int value) { // function
    var copyOfThis = copy(this);
    copyOfThis.y = value; // change variable
    return copyOfThis;
  }
  public string toString() { // function
    return $"{this.x}, {this.y}";
  }
}

[TestMethod] static void test_clockTick() {
  var g1 = new Game(new Random());
  var g2 = g1.withNewApple();
  var g3 = clockTick(g2, "s");
  Assert.AreEqual(new Square(22, 16), g3.head)
  Assert.AreEqual(2, g3.body.length())
  Assert.AreEqual(g2.body[0], g3.priorTail)
  Assert.AreEqual(true, g3.isOn)
  var g4 = g3.withApple(new Square(22, 17));
  var g5 = clockTick(g4, "s");
  Assert.AreEqual(3, g5.body.length())
  Assert.AreEqual(g4.priorTail, g5.priorTail)
  Assert.AreEqual(true, g5.isOn)
  var g6 = g5.withHead(new Square(22, 29));
  var g7 = clockTick(g6, "s");
  Assert.AreEqual(false, g7.isOn)
}

[TestMethod] static void test_updateGraphics() {
  var blocks = createBlockGraphics(white);
  var g1 = new Game(new Random());
  blocks = updateGraphics(g1, blocks); // change variable
  Assert.AreEqual(red, blocks[12][15])
  Assert.AreEqual(green, blocks[22][15])
  Assert.AreEqual(white, blocks[21][15])
  var g3 = clockTick(g1, "d");
  blocks = updateGraphics(g3, blocks); // change variable
  Assert.AreEqual(red, blocks[12][15])
  Assert.AreEqual(green, blocks[22][15])
  Assert.AreEqual(green, blocks[23][15])
}

[TestMethod] static void test_testnewApple() {
  var g1 = new Game(new Random());
  Assert.AreEqual(new Square(12, 15), g1.apple)
  var g2 = g1.withNewApple();
  Assert.AreEqual(new Square(12, 15), g2.apple)
  var g3 = g2.withNewApple();
  Assert.AreEqual(new Square(10, 12), g3.apple)
  // test that apple is never over snake
  var g4 = (new Game(new Random()));
  var g5 = g4.withBody([new Square(10, 12)]);
  var g6 = g5.withNewApple();
  Assert.AreEqual(new Square(12, 15), g4.apple)
}

[TestMethod] static void test_score() {
  var g1 = new Game(new Random());
  Assert.AreEqual(0, score(g1))
  var g2 = g1.withBody([new Square(4, 4), new Square(5, 4)]);
  Assert.AreEqual(0, score(g2))
  var g3 = g1.withBody([new Square(3, 4), new Square(4, 4), new Square(5, 4)]);
  Assert.AreEqual(1, score(g3))
  var g4 = g1.withBody([new Square(3, 4), new Square(4, 4), new Square(5, 4), new Square(5, 5)]);
  Assert.AreEqual(2, score(g4))
}

[TestMethod] static void test_moveSnake() {
  var g1 = new Game(new Random());
  var g2 = g1.withKey("a");
  var g3 = moveSnake(g2);
  Assert.AreEqual(new Square(21, 15), g3.head)
  var g4 = g1.withKey("d");
  var g5 = moveSnake(g4);
  Assert.AreEqual(new Square(23, 15), g5.head)
  var g6 = g1.withKey("w");
  var g7 = moveSnake(g6);
  Assert.AreEqual(new Square(22, 14), g7.head)
  var g8 = g1.withKey("s");
  var g9 = moveSnake(g8);
  Assert.AreEqual(new Square(22, 16), g9.head)
}

[TestMethod] static void test_eatAppleIfPoss() {
  var g1 = new Game(new Random());
  Assert.AreEqual(2, g1.body.length())
  // negative case
  var g2 = g1.withApple(new Square(23, 15));
  var g3 = eatAppleIfPoss(g2);
  Assert.AreEqual(1, g3.body.length())
  Assert.AreEqual(g2.apple, g3.apple)
  Assert.AreEqual(g2.body[0], g3.priorTail)
  // positive case
  var g4 = g2.withHead(new Square(23, 15));
  var g5 = eatAppleIfPoss(g4);
  Assert.AreEqual(2, g5.body.length())
  Assert.AreEqual(new Square(12, 15), g5.apple)
  Assert.AreEqual(g1.priorTail, g5.priorTail)
}

[TestMethod] static void test_overApple() {
  var g1 = new Game(new Random());
  var g2 = g1.withApple(new Square(23, 15));
  Assert.AreEqual(false, headOverApple(g2))
  var g3 = g2.withHead(new Square(23, 15));
  Assert.AreEqual(true, headOverApple(g3))
}

[TestMethod] static void test_gameOver() {
  var g1 = new Game((new Random()));
  Assert.AreEqual(false, gameOver(g1))
  var g2 = g1.withHead(new Square(0, 0));
  Assert.AreEqual(false, gameOver(g2))
  var g3 = g1.withHead(new Square(40, 15));
  Assert.AreEqual(true, gameOver(g3))
  var g4 = g1.withHead(new Square(21, 15));
  Assert.AreEqual(true, gameOver(g4))
}

[TestMethod] static void test_headIsAtEdge() {
  var g1 = new Game(new Random());
  Assert.AreEqual(false, hasHitEdge(g1))
  var g2 = g1.withHead(new Square(40, 15));
  Assert.AreEqual(true, hasHitEdge(g2))
  var g3 = g1.withHead(new Square(-1, 15));
  Assert.AreEqual(true, hasHitEdge(g3))
  var g4 = g1.withHead(new Square(20, 30));
  Assert.AreEqual(true, hasHitEdge(g4))
  var g5 = g1.withHead(new Square(20, -1));
  Assert.AreEqual(true, hasHitEdge(g5))
}

[TestMethod] static void test_newSquare() {
  var sq = new Square(3, 4);
  Assert.AreEqual(3, sq.x)
  Assert.AreEqual(4, sq.y)
}

[TestMethod] static void test_newGame() {
  var rnd = new Random();
  var game = new Game(rnd);
  var totest = game.rnd.equals(rnd);
  Assert.AreEqual(true, totest)
  Assert.AreEqual(new Square(22, 15), game.head)
  var body = game.body;
  Assert.AreEqual(2, body.length())
  Assert.AreEqual(new Square(20, 15), body[0])
  Assert.AreEqual(new Square(21, 15), body[1])
  Assert.AreEqual(new Square(0, 0), game.priorTail)
  Assert.AreEqual("d", game.key)
  Assert.AreEqual(true, game.isOn)
}
