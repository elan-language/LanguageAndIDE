// C# with Elan 2.0.0-beta

// Use the w,a,s,d keys to change snake's direction

static void main() {
  var blocks = createBlockGraphics(white);
  var head = new [] {20, 15};
  var tail = head;
  var body = new [] {head};
  var currentDir = Direction.right;
  var gameOn = true;
  var apple = new [] {0, 0};
  setAppleToRandomPosition(apple, body); // call procedure
  while (gameOn) {
    updateDisplay(blocks, head, tail, body, apple); // call procedure
    var currentDirRef = new AsRef<Direction>(currentDir);
    var headRef = new AsRef<List<int>>(head);
    var tailRef = new AsRef<List<int>>(tail);
    updateSnake(currentDirRef, tailRef, headRef, body); // call procedure
    head = headRef.value(); // reassign variable
    tail = tailRef.value(); // reassign variable
    currentDir = currentDirRef.value(); // reassign variable
    gameOn = !hasHitEdge(head[0], head[1]) && !body.contains(head); // reassign variable
    if (head.equals(apple)) {
      setAppleToRandomPosition(apple, body); // call procedure
    } else {
      body.removeAt(0); // call procedure
    } // end if
    sleep_ms(150); // call procedure
  } // end while
  Console.WriteLine($"Game Over! Score: {body.length() - 1}"); // print
} // end main

static void updateSnake(AsRef<Direction> currentDirRef, AsRef<List<int>> tailRef, AsRef<List<int>> headRef, List<List<int>> body) { // procedure
  var head = headRef.value();
  var tail = tailRef.value();
  var currentDir = currentDirRef.value();
  currentDir = directionByKey(currentDir, getKey()); // reassign variable
  tailRef.set(body[0]); // call procedure
  body.append(head); // call procedure
  headRef.set(getAdjacentSquare(head, currentDir)); // call procedure
  currentDirRef.set(currentDir); // call procedure
} // end procedure

static void updateDisplay(List<List<int>> blocks, List<int> head, List<int> tail, List<List<int>> body, List<int> apple) { // procedure
  blocks[head[0]][head[1]] = green; // reassign variable
  var tailColour = getTailColour(tail, body);
  blocks[tail[0]][tail[1]] = tailColour; // reassign variable
  blocks[apple[0]][apple[1]] = red; // reassign variable
  displayBlocks(blocks); // call procedure
} // end procedure

static void setAppleToRandomPosition(List<int> apple, List<List<int>> body) { // procedure
  var changePosition = true;
  while (changePosition) {
    apple[0] = randint(0, 39); // reassign variable
    apple[1] = randint(0, 29); // reassign variable
    if (!body.contains(apple)) {
      changePosition = false; // reassign variable
    } // end if
  } // end while
} // end procedure

static int getTailColour(List<int> tail, List<List<int>> body) { // function
  var colour = white;
  if (body[0].equals(tail)) {
    colour = green; // reassign variable
  } // end if
  return colour;
} // end function

static bool hasHitEdge(int headX, int headY) { // function
  return (headX < 0) || (headY < 0) || (headX > 39) || (headY > 29);
} // end function

static List<int> getAdjacentSquare(List<int> sq, Direction dir) { // function
  var newX = sq[0];
  var newY = sq[1];
  if (dir == Direction.left) {
    newX = newX - 1; // reassign variable
  } else if (dir == Direction.right) {
    newX = newX + 1; // reassign variable
  } else if (dir == Direction.up) {
    newY = newY - 1; // reassign variable
  } else if (dir == Direction.down) {
    newY = newY + 1; // reassign variable
  } // end if
  return new [] {newX, newY};
} // end function

static Direction directionByKey(Direction current, string key) { // function
  var dirn = current;
  if (key.equals("w")) {
    dirn = Direction.up; // reassign variable
  } else if (key.equals("s")) {
    dirn = Direction.down; // reassign variable
  } else if (key.equals("a")) {
    dirn = Direction.left; // reassign variable
  } else if (key.equals("d")) {
    dirn = Direction.right; // reassign variable
  } // end if
  return dirn;
} // end function

enum Direction {up, down, left, right}

[TestMethod] static void test_getTailColour() {
  Assert.AreEqual(green, getTailColour(new [] {3, 4}, new [] {new [] {3, 4}, new [] {3, 5}}));
  Assert.AreEqual(white, getTailColour(new [] {3, 4}, new [] {new [] {3, 5}, new [] {3, 6}}));
} // end test

[TestMethod] static void test_hasHitEdge() {
  Assert.AreEqual(false, hasHitEdge(0, 0));
  Assert.AreEqual(false, hasHitEdge(0, 29));
  Assert.AreEqual(false, hasHitEdge(39, 0));
  Assert.AreEqual(false, hasHitEdge(29, 29));
  Assert.AreEqual(true, hasHitEdge(-1, 5));
  Assert.AreEqual(true, hasHitEdge(5, 30));
  Assert.AreEqual(true, hasHitEdge(40, 5));
  Assert.AreEqual(true, hasHitEdge(5, -1));
} // end test

[TestMethod] static void test_getAdjacentSquare() {
  var sq = new [] {20, 15};
  Assert.AreEqual(new [] {20, 14}, getAdjacentSquare(sq, Direction.up));
  Assert.AreEqual(new [] {20, 16}, getAdjacentSquare(sq, Direction.down));
  Assert.AreEqual(new [] {19, 15}, getAdjacentSquare(sq, Direction.left));
  Assert.AreEqual(new [] {21, 15}, getAdjacentSquare(sq, Direction.right));
  // boundary
  Assert.AreEqual(new [] {-1, 15}, getAdjacentSquare(new [] {0, 15}, Direction.left));
} // end test

[TestMethod] static void test_directionByKey() {
  var current = Direction.up;
  Assert.AreEqual(Direction.up, directionByKey(current, ""));
  Assert.AreEqual(Direction.up, directionByKey(current, "x"));
  Assert.AreEqual(Direction.up, directionByKey(current, "w"));
  Assert.AreEqual(Direction.down, directionByKey(current, "s"));
  Assert.AreEqual(Direction.left, directionByKey(current, "a"));
  Assert.AreEqual(Direction.right, directionByKey(current, "d"));
  Assert.AreEqual(Direction.up, directionByKey(current, "D"));
} // end test
