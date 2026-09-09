// C# with Elan 2.0.0-beta4

// Use the w,a,s,d keys to change snake's direction

static void main() {
  var blocks = new BlockGraphics();
  var head = 2015;
  var tail = head;
  var body = new [] {head};
  var currentDir = "d";
  var gameOn = true;
  var apple = 0;
  var changeApplePosition = true;
  while (gameOn) {
    while (changeApplePosition) {
      apple = squareNo(randint(0, 39), randint(0, 29)); // assignment
      if (!body.contains(apple)) {
        changeApplePosition = false; // assignment
      } // end if
    } // end while
    updateDisplay(blocks, head, tail, body, apple); // procedure call
    var key = getKey();
    if (!key.equals("") && "wasd".contains(key)) {
      currentDir = key; // assignment
    } // end if
    tail = body[0]; // assignment
    body.append(head); // procedure call
    head = getAdjacentSquare(head, currentDir); // assignment
    gameOn = !hasHitEdge(head) && !body.contains(head); // assignment
    if (head.equals(apple)) {
      changeApplePosition = true; // assignment
    } else {
      body.removeAt(0); // procedure call
    } // end if
    sleep_ms(150); // procedure call
  } // end while
  Console.WriteLine($"Game Over! Score: {body.length() - 1}"); // print statement
} // end main

static void updateDisplay(BlockGraphics blocks, int head, int tail, List<int> body, int apple) { // procedure
  blocks.put(x(head), y(head), green); // procedure call
  var tailColour = getTailColour(tail, body);
  blocks.put(x(tail), y(tail), tailColour); // procedure call
  blocks.put(x(apple), y(apple), red); // procedure call
  blocks.display(); // procedure call
} // end procedure

static int getTailColour(int tail, List<int> body) { // function
  var colour = white;
  if (body[0].equals(tail)) {
    colour = green; // assignment
  } // end if
  return colour;
} // end function

static bool hasHitEdge(int head) { // function
  var headX = x(head);
  var headY = y(head);
  return (headX < 0) || (headY < 0) || (headX > 39) || (headY > 29);
} // end function

static int getAdjacentSquare(int sq, string dir) { // function
  var newX = x(sq);
  var newY = y(sq);
  if (dir.equals("a")) {
    newX = newX - 1; // assignment
  } else if (dir.equals("d")) {
    newX = newX + 1; // assignment
  } else if (dir.equals("w")) {
    newY = newY - 1; // assignment
  } else if (dir.equals("s")) {
    newY = newY + 1; // assignment
  } // end if
  return squareNo(newX, newY);
} // end function

static int squareNo(int x, int y) { // function
  return x*100 + y;
} // end function

static int x(int sq) { // function
  return divAsInt(sq, 100);
} // end function

static int y(int sq) { // function
  return sq % 100;
} // end function

[TestClass] class Test_square
[TestMethod] static void test_square() {
  Assert.AreEqual(0, squareNo(0, 0));
  Assert.AreEqual(3929, squareNo(39, 29));
  Assert.AreEqual(-85, squareNo(-1, 15));
  Assert.AreEqual(1499, squareNo(15, -1));
}} // end test

[TestClass] class Test_y
[TestMethod] static void test_y() {
  Assert.AreEqual(0, y(0500));
  Assert.AreEqual(7, y(0507));
  Assert.AreEqual(-9, y(-0109));
  Assert.AreEqual(99, y(1499));
}} // end test

[TestClass] class Test_x
[TestMethod] static void test_x() {
  Assert.AreEqual(0, x(0015));
  Assert.AreEqual(5, x(0500));
  Assert.AreEqual(5, x(0507));
  Assert.AreEqual(-2, x(-0109));
}} // end test

[TestClass] class Test_getTailColour
[TestMethod] static void test_getTailColour() {
  Assert.AreEqual(green, getTailColour(0304, new [] {0304, 0305}));
  Assert.AreEqual(white, getTailColour(0304, new [] {0305, 0306}));
}} // end test

[TestClass] class Test_hasHitEdge
[TestMethod] static void test_hasHitEdge() {
  Assert.AreEqual(false, hasHitEdge(0000));
  Assert.AreEqual(false, hasHitEdge(0029));
  Assert.AreEqual(false, hasHitEdge(3900));
  Assert.AreEqual(false, hasHitEdge(3929));
  Assert.AreEqual(true, hasHitEdge(-0105));
  Assert.AreEqual(true, hasHitEdge(0530));
  Assert.AreEqual(true, hasHitEdge(4005));
  Assert.AreEqual(true, hasHitEdge(0499));
  Assert.AreEqual(true, hasHitEdge(1499));
  Assert.AreEqual(true, hasHitEdge(-85));
}} // end test

[TestClass] class Test_getAdjacentSquare
[TestMethod] static void test_getAdjacentSquare() {
  var sq = 2015;
  Assert.AreEqual(2014, getAdjacentSquare(sq, "w"));
  Assert.AreEqual(2016, getAdjacentSquare(sq, "s"));
  Assert.AreEqual(1915, getAdjacentSquare(sq, "a"));
  Assert.AreEqual(2115, getAdjacentSquare(sq, "d"));
  // boundary
  Assert.AreEqual(-85, getAdjacentSquare(0015, "a"));
}} // end test
