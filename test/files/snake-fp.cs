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
  print($"Game Over! Score: {score(game)}");
}

static Game clockTick(Game g, string k) { // function
  var Game g2 = if(k.equals(""), g, g.withKey(k)); // let
  var Game g3 = moveSnake(g2); // let
  var Game g4 = eatAppleIfPoss(g3); // let
  return if(gameOver(g4), g4.withIsOn(false), g4);
}

static List<List<int>> updateGraphics(Game g, List<List<int>> b) { // function
  var List> b2 = graphicsPut(b, g.apple.x, g.apple.y, red); // let
  var List> b3 = graphicsPut(b2, g.head.x, g.head.y, green); // let
  var Square tail = g.body[0]; // let
  var Int tailColour = if(tail.equals(g.priorTail), green, white); // let
  return graphicsPut(b3, tail.x, tail.y, tailColour);
}

// Temporary solution pending creation of withPut as an extension method to ListOfList

static List<List<int>> graphicsPut(List<List<int>> graphics, int x, int y, int colour) { // function
  return graphics.withSet(x, graphics[x].withSet(y, colour));
}

static int score(Game g) { // function
  return g.body.length() - 2;
}

static Game moveSnake(Game g) { // function
  var String k = g.key; // let
  var Int x = g.head.x; // let
  var Int y = g.head.y; // let
  var Int newX = if(k.equals("a"), x - 1, if(k.equals("d"), x + 1, x)); // let
  var Int newY = if(k.equals("w"), y - 1, if(k.equals("s"), y + 1, y)); // let
  return g.withBody(g.body.withAppend(g.head)).withHead(new Square(newX, newY));
}

static Game eatAppleIfPoss(Game g) { // function
  var Square tail = g.body[0]; // let
  var List moveTail = g.body.subList(1, g.body.length()); // let
  return if(headOverApple(g), g.withNewApple(), g.withPriorTail(tail).withBody(moveTail));
}

static bool headOverApple(Game g) { // function
  return g.head.equals(g.apple);
}

static bool gameOver(Game g) { // function
  return g.body.contains(g.head) || hasHitEdge(g);
}

static bool hasHitEdge(Game g) { // function
  var Int x = g.head.x; // let
  var Int y = g.head.y; // let
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
    var (Int, Random) x_rnd2 = this.rnd.nextInt(0, 39); // let
    var Int x = x_rnd2.item_0; // let
    var Random rnd2 = x_rnd2.item_1; // let
    var (Int, Random) y_rnd3 = rnd2.nextInt(0, 29); // let
    var Int y = y_rnd3.item_0; // let
    var Random rnd3 = y_rnd3.item_1; // let
    var Square apple2 = new Square(x, y); // let
    var Game g2 = this.withApple(apple2).withRnd(rnd3); // let
    return if(g2.body.contains(apple2), g2.withNewApple(), g2);
  }
  public Game withHead(Square value) { // function
    var Game copyOfThis = copy(this); // let
    copyOfThis.head = value // with property update
    return copyOfThis;
  }
  public Game withBody(List<Square> value) { // function
    var Game copyOfThis = copy(this); // let
    copyOfThis.body = value // with property update
    return copyOfThis;
  }
  public Game withPriorTail(Square value) { // function
    var Game copyOfThis = copy(this); // let
    copyOfThis.priorTail = value // with property update
    return copyOfThis;
  }
  public Game withApple(Square value) { // function
    var Game copyOfThis = copy(this); // let
    copyOfThis.apple = value // with property update
    return copyOfThis;
  }
  public Game withIsOn(bool value) { // function
    var Game copyOfThis = copy(this); // let
    copyOfThis.isOn = value // with property update
    return copyOfThis;
  }
  public Game withRnd(Random value) { // function
    var Game copyOfThis = copy(this); // let
    copyOfThis.rnd = value // with property update
    return copyOfThis;
  }
  public Game withKey(string value) { // function
    var Game copyOfThis = copy(this); // let
    copyOfThis.key = value // with property update
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
    var Square copyOfThis = copy(this); // let
    copyOfThis.x = value // with property update
    return copyOfThis;
  }
  public Square withY(int value) { // function
    var Square copyOfThis = copy(this); // let
    copyOfThis.y = value // with property update
    return copyOfThis;
  }
  public string toString() { // function
    return $"{this.x}, {this.y}";
  }
}

[TestMethod] static void test_clockTick() {
  var Game g1 = new Game(new Random()); // let
  var Game g2 = g1.withNewApple(); // let
  var Game g3 = clockTick(g2, "s"); // let
  Assert.AreEqual(new Square(22, 16), g3.head)
  Assert.AreEqual(2, g3.body.length())
  Assert.AreEqual(g2.body[0], g3.priorTail)
  Assert.AreEqual(true, g3.isOn)
  var Game g4 = g3.withApple(new Square(22, 17)); // let
  var Game g5 = clockTick(g4, "s"); // let
  Assert.AreEqual(3, g5.body.length())
  Assert.AreEqual(g4.priorTail, g5.priorTail)
  Assert.AreEqual(true, g5.isOn)
  var Game g6 = g5.withHead(new Square(22, 29)); // let
  var Game g7 = clockTick(g6, "s"); // let
  Assert.AreEqual(false, g7.isOn)
}

[TestMethod] static void test_updateGraphics() {
  var List> blocks = createBlockGraphics(white); // let
  var Game g1 = new Game(new Random()); // let
  var List> blocks2 = updateGraphics(g1, blocks); // let
  Assert.AreEqual(red, blocks2[12][15])
  Assert.AreEqual(green, blocks2[22][15])
  Assert.AreEqual(white, blocks2[21][15])
  var Game g3 = clockTick(g1, "d"); // let
  var List> blocks3 = updateGraphics(g3, blocks2); // let
  Assert.AreEqual(red, blocks3[12][15])
  Assert.AreEqual(green, blocks3[22][15])
  Assert.AreEqual(green, blocks3[23][15])
}

[TestMethod] static void test_testnewApple() {
  var Game g1 = new Game(new Random()); // let
  Assert.AreEqual(new Square(12, 15), g1.apple)
  var Game g2 = g1.withNewApple(); // let
  Assert.AreEqual(new Square(12, 15), g2.apple)
  var Game g3 = g2.withNewApple(); // let
  Assert.AreEqual(new Square(10, 12), g3.apple)
  // test that apple is never over snake
  var Game g4 = (new Game(new Random())); // let
  var Game g5 = g4.withBody([new Square(10, 12)]); // let
  var Game g6 = g5.withNewApple(); // let
  Assert.AreEqual(new Square(12, 15), g4.apple)
}

[TestMethod] static void test_score() {
  var Game g1 = new Game(new Random()); // let
  Assert.AreEqual(0, score(g1))
  var Game g2 = g1.withBody([new Square(4, 4), new Square(5, 4)]); // let
  Assert.AreEqual(0, score(g2))
  var Game g3 = g1.withBody([new Square(3, 4), new Square(4, 4), new Square(5, 4)]); // let
  Assert.AreEqual(1, score(g3))
  var Game g4 = g1.withBody([new Square(3, 4), new Square(4, 4), new Square(5, 4), new Square(5, 5)]); // let
  Assert.AreEqual(2, score(g4))
}

[TestMethod] static void test_moveSnake() {
  var Game g1 = new Game(new Random()); // let
  var Game g2 = g1.withKey("a"); // let
  var Game g3 = moveSnake(g2); // let
  Assert.AreEqual(new Square(21, 15), g3.head)
  var Game g4 = g1.withKey("d"); // let
  var Game g5 = moveSnake(g4); // let
  Assert.AreEqual(new Square(23, 15), g5.head)
  var Game g6 = g1.withKey("w"); // let
  var Game g7 = moveSnake(g6); // let
  Assert.AreEqual(new Square(22, 14), g7.head)
  var Game g8 = g1.withKey("s"); // let
  var Game g9 = moveSnake(g8); // let
  Assert.AreEqual(new Square(22, 16), g9.head)
}

[TestMethod] static void test_eatAppleIfPoss() {
  var Game g1 = new Game(new Random()); // let
  Assert.AreEqual(2, g1.body.length())
  // negative case
  var Game g2 = g1.withApple(new Square(23, 15)); // let
  var Game g3 = eatAppleIfPoss(g2); // let
  Assert.AreEqual(1, g3.body.length())
  Assert.AreEqual(g2.apple, g3.apple)
  Assert.AreEqual(g2.body[0], g3.priorTail)
  // positive case
  var Game g4 = g2.withHead(new Square(23, 15)); // let
  var Game g5 = eatAppleIfPoss(g4); // let
  Assert.AreEqual(2, g5.body.length())
  Assert.AreEqual(new Square(12, 15), g5.apple)
  Assert.AreEqual(g1.priorTail, g5.priorTail)
}

[TestMethod] static void test_overApple() {
  var Game g1 = new Game(new Random()); // let
  var Game g2 = g1.withApple(new Square(23, 15)); // let
  Assert.AreEqual(false, headOverApple(g2))
  var Game g3 = g2.withHead(new Square(23, 15)); // let
  Assert.AreEqual(true, headOverApple(g3))
}

[TestMethod] static void test_gameOver() {
  var Game g1 = new Game((new Random())); // let
  Assert.AreEqual(false, gameOver(g1))
  var Game g2 = g1.withHead(new Square(0, 0)); // let
  Assert.AreEqual(false, gameOver(g2))
  var Game g3 = g1.withHead(new Square(40, 15)); // let
  Assert.AreEqual(true, gameOver(g3))
  var Game g4 = g1.withHead(new Square(21, 15)); // let
  Assert.AreEqual(true, gameOver(g4))
}

[TestMethod] static void test_headIsAtEdge() {
  var Game g1 = new Game(new Random()); // let
  Assert.AreEqual(false, hasHitEdge(g1))
  var Game g2 = g1.withHead(new Square(40, 15)); // let
  Assert.AreEqual(true, hasHitEdge(g2))
  var Game g3 = g1.withHead(new Square(-1, 15)); // let
  Assert.AreEqual(true, hasHitEdge(g3))
  var Game g4 = g1.withHead(new Square(20, 30)); // let
  Assert.AreEqual(true, hasHitEdge(g4))
  var Game g5 = g1.withHead(new Square(20, -1)); // let
  Assert.AreEqual(true, hasHitEdge(g5))
}

[TestMethod] static void test_newSquare() {
  var Square sq = new Square(3, 4); // let
  Assert.AreEqual(3, sq.x)
  Assert.AreEqual(4, sq.y)
}

[TestMethod] static void test_newGame() {
  var Random rnd = new Random(); // let
  var Game game = new Game(rnd); // let
  var Boolean totest = game.rnd.equals(rnd); // let
  Assert.AreEqual(true, totest)
  Assert.AreEqual(new Square(22, 15), game.head)
  var List body = game.body; // let
  Assert.AreEqual(2, body.length())
  Assert.AreEqual(new Square(20, 15), body[0])
  Assert.AreEqual(new Square(21, 15), body[1])
  Assert.AreEqual(new Square(0, 0), game.priorTail)
  Assert.AreEqual("d", game.key)
  Assert.AreEqual(true, game.isOn)
}
