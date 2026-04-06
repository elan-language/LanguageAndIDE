// Java with Elan 2.0.0-alpha1

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
  print(String.format("Game Over! Score: %", score(game))); // call procedure
}

static Game clockTick(Game g, String k) { // function
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
  final Int x = g.head.x; // constant
  final Int y = g.head.y; // constant
  return (x == -1) || (y == -1) || (x == 40) || (y == 30);
}

class Game {

  public Square head; // property
  public List<Square> body; // property
  public Square priorTail; // property
  public Square apple; // property
  public bool isOn; // property
  public Random rnd; // property
  public String key; // property
  public Game(Random rnd) {
    this.head = new Square(22, 15); // change variable
    this.body = [new Square(20, 15), new Square(21, 15)]; // change variable
    this.priorTail = new Square(0, 0); // change variable
    this.key = "d"; // change variable
    this.isOn = true; // change variable
    this.apple = new Square(12, 15); // change variable
    this.rnd = rnd; // change variable
  }
  public String toString() { // function
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
  public Game withKey(String value) { // function
    var copyOfThis = copy(this);
    copyOfThis.key = value; // change variable
    return copyOfThis;
  }
}

class Square {

  public int x; // property
  public int y; // property
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
  public String toString() { // function
    return String.format("%, %", this.x, this.y);
  }
}

@Test static void test_clockTick() {
  var g1 = new Game(new Random());
  var g2 = g1.withNewApple();
  var g3 = clockTick(g2, "s");
  assertEquals(new Square(22, 16), g3.head)
  assertEquals(2, g3.body.length())
  assertEquals(g2.body[0], g3.priorTail)
  assertEquals(true, g3.isOn)
  var g4 = g3.withApple(new Square(22, 17));
  var g5 = clockTick(g4, "s");
  assertEquals(3, g5.body.length())
  assertEquals(g4.priorTail, g5.priorTail)
  assertEquals(true, g5.isOn)
  var g6 = g5.withHead(new Square(22, 29));
  var g7 = clockTick(g6, "s");
  assertEquals(false, g7.isOn)
}

@Test static void test_updateGraphics() {
  var blocks = createBlockGraphics(white);
  var g1 = new Game(new Random());
  blocks = updateGraphics(g1, blocks); // change variable
  assertEquals(red, blocks[12][15])
  assertEquals(green, blocks[22][15])
  assertEquals(white, blocks[21][15])
  var g3 = clockTick(g1, "d");
  blocks = updateGraphics(g3, blocks); // change variable
  assertEquals(red, blocks[12][15])
  assertEquals(green, blocks[22][15])
  assertEquals(green, blocks[23][15])
}

@Test static void test_testnewApple() {
  var g1 = new Game(new Random());
  assertEquals(new Square(12, 15), g1.apple)
  var g2 = g1.withNewApple();
  assertEquals(new Square(12, 15), g2.apple)
  var g3 = g2.withNewApple();
  assertEquals(new Square(10, 12), g3.apple)
  // test that apple is never over snake
  var g4 = (new Game(new Random()));
  var g5 = g4.withBody([new Square(10, 12)]);
  var g6 = g5.withNewApple();
  assertEquals(new Square(12, 15), g4.apple)
}

@Test static void test_score() {
  var g1 = new Game(new Random());
  assertEquals(0, score(g1))
  var g2 = g1.withBody([new Square(4, 4), new Square(5, 4)]);
  assertEquals(0, score(g2))
  var g3 = g1.withBody([new Square(3, 4), new Square(4, 4), new Square(5, 4)]);
  assertEquals(1, score(g3))
  var g4 = g1.withBody([new Square(3, 4), new Square(4, 4), new Square(5, 4), new Square(5, 5)]);
  assertEquals(2, score(g4))
}

@Test static void test_moveSnake() {
  var g1 = new Game(new Random());
  var g2 = g1.withKey("a");
  var g3 = moveSnake(g2);
  assertEquals(new Square(21, 15), g3.head)
  var g4 = g1.withKey("d");
  var g5 = moveSnake(g4);
  assertEquals(new Square(23, 15), g5.head)
  var g6 = g1.withKey("w");
  var g7 = moveSnake(g6);
  assertEquals(new Square(22, 14), g7.head)
  var g8 = g1.withKey("s");
  var g9 = moveSnake(g8);
  assertEquals(new Square(22, 16), g9.head)
}

@Test static void test_eatAppleIfPoss() {
  var g1 = new Game(new Random());
  assertEquals(2, g1.body.length())
  // negative case
  var g2 = g1.withApple(new Square(23, 15));
  var g3 = eatAppleIfPoss(g2);
  assertEquals(1, g3.body.length())
  assertEquals(g2.apple, g3.apple)
  assertEquals(g2.body[0], g3.priorTail)
  // positive case
  var g4 = g2.withHead(new Square(23, 15));
  var g5 = eatAppleIfPoss(g4);
  assertEquals(2, g5.body.length())
  assertEquals(new Square(12, 15), g5.apple)
  assertEquals(g1.priorTail, g5.priorTail)
}

@Test static void test_overApple() {
  var g1 = new Game(new Random());
  var g2 = g1.withApple(new Square(23, 15));
  assertEquals(false, headOverApple(g2))
  var g3 = g2.withHead(new Square(23, 15));
  assertEquals(true, headOverApple(g3))
}

@Test static void test_gameOver() {
  var g1 = new Game((new Random()));
  assertEquals(false, gameOver(g1))
  var g2 = g1.withHead(new Square(0, 0));
  assertEquals(false, gameOver(g2))
  var g3 = g1.withHead(new Square(40, 15));
  assertEquals(true, gameOver(g3))
  var g4 = g1.withHead(new Square(21, 15));
  assertEquals(true, gameOver(g4))
}

@Test static void test_headIsAtEdge() {
  var g1 = new Game(new Random());
  assertEquals(false, hasHitEdge(g1))
  var g2 = g1.withHead(new Square(40, 15));
  assertEquals(true, hasHitEdge(g2))
  var g3 = g1.withHead(new Square(-1, 15));
  assertEquals(true, hasHitEdge(g3))
  var g4 = g1.withHead(new Square(20, 30));
  assertEquals(true, hasHitEdge(g4))
  var g5 = g1.withHead(new Square(20, -1));
  assertEquals(true, hasHitEdge(g5))
}

@Test static void test_newSquare() {
  var sq = new Square(3, 4);
  assertEquals(3, sq.x)
  assertEquals(4, sq.y)
}

@Test static void test_newGame() {
  var rnd = new Random();
  var game = new Game(rnd);
  var totest = game.rnd.equals(rnd);
  assertEquals(true, totest)
  assertEquals(new Square(22, 15), game.head)
  var body = game.body;
  assertEquals(2, body.length())
  assertEquals(new Square(20, 15), body[0])
  assertEquals(new Square(21, 15), body[1])
  assertEquals(new Square(0, 0), game.priorTail)
  assertEquals("d", game.key)
  assertEquals(true, game.isOn)
}
