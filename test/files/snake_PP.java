// Java with Elan 2.0.0-beta1

public class Global {

// Use the w,a,s,d keys to change snake's direction

static void main() {
  var blocks = createBlockGraphics(white);
  var head = list(20, 15);
  var tail = head;
  var body = list(head);
  var currentDir = Direction.right;
  var gameOn = true;
  var apple = list(0, 0);
  setAppleToRandomPosition(apple, body); // procedure call
  while (gameOn) {
    updateDisplay(blocks, head, tail, body, apple); // procedure call
    var currentDirRef = new AsRef<Direction>(currentDir);
    var headRef = new AsRef<List<int>>(head);
    var tailRef = new AsRef<List<int>>(tail);
    updateSnake(currentDirRef, tailRef, headRef, body); // procedure call
    head = headRef.value(); // assignment
    tail = tailRef.value(); // assignment
    currentDir = currentDirRef.value(); // assignment
    gameOn = !hasHitEdge(head[0], head[1]) && !body.contains(head); // assignment
    if (head.equals(apple)) {
      setAppleToRandomPosition(apple, body); // procedure call
    } else {
      body.removeAt(0); // procedure call
    } // end if
    sleep_ms(150); // procedure call
  } // end while
  System.out.println(String.format("Game Over! Score: %", body.length() - 1)); // print statement
} // end main

static void updateSnake(AsRef<Direction> currentDirRef, AsRef<List<int>> tailRef, AsRef<List<int>> headRef, List<List<int>> body) { // procedure
  var head = headRef.value();
  var tail = tailRef.value();
  var currentDir = currentDirRef.value();
  currentDir = directionByKey(currentDir, getKey()); // assignment
  tailRef.set(body[0]); // procedure call
  body.append(head); // procedure call
  headRef.set(getAdjacentSquare(head, currentDir)); // procedure call
  currentDirRef.set(currentDir); // procedure call
} // end procedure

static void updateDisplay(List<List<int>> blocks, List<int> head, List<int> tail, List<List<int>> body, List<int> apple) { // procedure
  blocks[head[0]][head[1]] = green; // assignment
  var tailColour = getTailColour(tail, body);
  blocks[tail[0]][tail[1]] = tailColour; // assignment
  blocks[apple[0]][apple[1]] = red; // assignment
  displayBlocks(blocks); // procedure call
} // end procedure

static void setAppleToRandomPosition(List<int> apple, List<List<int>> body) { // procedure
  var changePosition = true;
  while (changePosition) {
    apple[0] = randint(0, 39); // assignment
    apple[1] = randint(0, 29); // assignment
    if (!body.contains(apple)) {
      changePosition = false; // assignment
    } // end if
  } // end while
} // end procedure

static int getTailColour(List<int> tail, List<List<int>> body) { // function
  var colour = white;
  if (body[0].equals(tail)) {
    colour = green; // assignment
  } // end if
  return colour;
} // end function

static boolean hasHitEdge(int headX, int headY) { // function
  return (headX < 0) || (headY < 0) || (headX > 39) || (headY > 29);
} // end function

static List<int> getAdjacentSquare(List<int> sq, Direction dir) { // function
  var newX = sq[0];
  var newY = sq[1];
  if (dir == Direction.left) {
    newX = newX - 1; // assignment
  } else if (dir == Direction.right) {
    newX = newX + 1; // assignment
  } else if (dir == Direction.up) {
    newY = newY - 1; // assignment
  } else if (dir == Direction.down) {
    newY = newY + 1; // assignment
  } // end if
  return list(newX, newY);
} // end function

static Direction directionByKey(Direction current, String key) { // function
  var dirn = current;
  if (key.equals("w")) {
    dirn = Direction.up; // assignment
  } else if (key.equals("s")) {
    dirn = Direction.down; // assignment
  } else if (key.equals("a")) {
    dirn = Direction.left; // assignment
  } else if (key.equals("d")) {
    dirn = Direction.right; // assignment
  } // end if
  return dirn;
} // end function

enum Direction {up, down, left, right}

class Test_getTailColour {
@Test static void test_getTailColour() {
  assertEquals(green, getTailColour(list(3, 4), list(list(3, 4), list(3, 5))));
  assertEquals(white, getTailColour(list(3, 4), list(list(3, 5), list(3, 6))));
}} // end test

class Test_hasHitEdge {
@Test static void test_hasHitEdge() {
  assertEquals(false, hasHitEdge(0, 0));
  assertEquals(false, hasHitEdge(0, 29));
  assertEquals(false, hasHitEdge(39, 0));
  assertEquals(false, hasHitEdge(29, 29));
  assertEquals(true, hasHitEdge(-1, 5));
  assertEquals(true, hasHitEdge(5, 30));
  assertEquals(true, hasHitEdge(40, 5));
  assertEquals(true, hasHitEdge(5, -1));
}} // end test

class Test_getAdjacentSquare {
@Test static void test_getAdjacentSquare() {
  var sq = list(20, 15);
  assertEquals(list(20, 14), getAdjacentSquare(sq, Direction.up));
  assertEquals(list(20, 16), getAdjacentSquare(sq, Direction.down));
  assertEquals(list(19, 15), getAdjacentSquare(sq, Direction.left));
  assertEquals(list(21, 15), getAdjacentSquare(sq, Direction.right));
  // boundary
  assertEquals(list(-1, 15), getAdjacentSquare(list(0, 15), Direction.left));
}} // end test

class Test_directionByKey {
@Test static void test_directionByKey() {
  var current = Direction.up;
  assertEquals(Direction.up, directionByKey(current, ""));
  assertEquals(Direction.up, directionByKey(current, "x"));
  assertEquals(Direction.up, directionByKey(current, "w"));
  assertEquals(Direction.down, directionByKey(current, "s"));
  assertEquals(Direction.left, directionByKey(current, "a"));
  assertEquals(Direction.right, directionByKey(current, "d"));
  assertEquals(Direction.up, directionByKey(current, "D"));
}} // end test
} // end Global
