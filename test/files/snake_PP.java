// Java with Elan 2.0.0-beta4

public class Global {

// Use the w,a,s,d keys to change snake's direction

static void main() {
  var blocks = new BlockGraphics();
  var head = 2015;
  var tail = head;
  var body = list(head);
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
  System.out.println(String.format("Game Over! Score: %", body.length() - 1)); // print statement
} // end main

static void updateDisplay(BlockGraphics blocks, int head, int tail, List<int> body, int apple) { // procedure
  blocks.put(x_coord(head), y_coord(head), green); // procedure call
  var tailColour = getTailColour(tail, body);
  blocks.put(x_coord(tail), y_coord(tail), tailColour); // procedure call
  blocks.put(x_coord(apple), y_coord(apple), red); // procedure call
  blocks.display(); // procedure call
} // end procedure

static int getTailColour(int tail, List<int> body) { // function
  var colour = white;
  if (body[0].equals(tail)) {
    colour = green; // assignment
  } // end if
  return colour;
} // end function

static boolean hasHitEdge(int head) { // function
  var headX = x_coord(head);
  var headY = y_coord(head);
  return (headX < 0) || (headY < 0) || (headX > 39) || (headY > 29);
} // end function

static int getAdjacentSquare(int sq, String dir) { // function
  var newX = x_coord(sq);
  var newY = y_coord(sq);
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

static int x_coord(int sq) { // function
  return divAsInt(sq, 100);
} // end function

static int y_coord(int sq) { // function
  return sq % 100;
} // end function

class Test_square {
@Test static void test_square() {
  assertEquals(0, squareNo(0, 0));
  assertEquals(3929, squareNo(39, 29));
  assertEquals(-85, squareNo(-1, 15));
  assertEquals(1499, squareNo(15, -1));
}} // end test

class Test_y {
@Test static void test_y() {
  assertEquals(0, y_coord(0500));
  assertEquals(7, y_coord(0507));
  assertEquals(-9, y_coord(-0109));
  assertEquals(99, y_coord(1499));
}} // end test

class Test_x {
@Test static void test_x() {
  assertEquals(0, x_coord(0015));
  assertEquals(5, x_coord(0500));
  assertEquals(5, x_coord(0507));
  assertEquals(-2, x_coord(-0109));
}} // end test

class Test_getTailColour {
@Test static void test_getTailColour() {
  assertEquals(green, getTailColour(0304, list(0304, 0305)));
  assertEquals(white, getTailColour(0304, list(0305, 0306)));
}} // end test

class Test_hasHitEdge {
@Test static void test_hasHitEdge() {
  assertEquals(false, hasHitEdge(0000));
  assertEquals(false, hasHitEdge(0029));
  assertEquals(false, hasHitEdge(3900));
  assertEquals(false, hasHitEdge(3929));
  assertEquals(true, hasHitEdge(-0105));
  assertEquals(true, hasHitEdge(0530));
  assertEquals(true, hasHitEdge(4005));
  assertEquals(true, hasHitEdge(0499));
  assertEquals(true, hasHitEdge(1499));
  assertEquals(true, hasHitEdge(-85));
}} // end test

class Test_getAdjacentSquare {
@Test static void test_getAdjacentSquare() {
  var sq = 2015;
  assertEquals(2014, getAdjacentSquare(sq, "w"));
  assertEquals(2016, getAdjacentSquare(sq, "s"));
  assertEquals(1915, getAdjacentSquare(sq, "a"));
  assertEquals(2115, getAdjacentSquare(sq, "d"));
  // boundary
  assertEquals(-85, getAdjacentSquare(0015, "a"));
}} // end test
} // end Global
