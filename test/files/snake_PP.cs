// C# with Elan 2.0.0-alpha4

// Use the w,a,s,d keys to change snake's direction

static void main() {
  var blocks = createBlockGraphics(white);
  var head = [20, 15];
  var tail = head;
  var body = [head];
  var currentDir = "right";
  var gameOn = true;
  var apple = [0, 0];
  setAppleToRandomPosition(apple, body); // call procedure
  while (gameOn) {
    updateDisplay(blocks, head, tail, body, apple); // call procedure
    var currentDirRef = new AsRef<string>(currentDir);
    var headRef = new AsRef<List<int>>(head);
    var tailRef = new AsRef<List<int>>(tail);
    updateSnake(currentDirRef, tailRef, headRef, body); // call procedure
    head = headRef.value(); // re-assign variable
    tail = tailRef.value(); // re-assign variable
    currentDir = currentDirRef.value(); // re-assign variable
    gameOn = !hasHitEdge(head[0], head[1]) && !body.contains(head); // re-assign variable
    if (head.equals(apple)) {
      setAppleToRandomPosition(apple, body); // call procedure
    } else {
      body.removeAt(0); // call procedure
    } // if
    sleep_ms(150); // call procedure
  } // while
  print($"Game Over! Score: {body.length() - 1}");
} // main

static void updateSnake(AsRef<string> currentDirRef, AsRef<List<int>> tailRef, AsRef<List<int>> headRef, List<List<int>> body) { // procedure
  var head = headRef.value();
  var tail = tailRef.value();
  var currentDir = currentDirRef.value();
  currentDir = directionByKey(currentDir, getKey()); // re-assign variable
  tailRef.set(body[0]); // call procedure
  body.append(head); // call procedure
  headRef.set(getAdjacentSquare(head, currentDir)); // call procedure
  currentDirRef.set(currentDir); // call procedure
} // procedure

static void updateDisplay(List<List<int>> blocks, List<int> head, List<int> tail, List<List<int>> body, List<int> apple) { // procedure
  blocks[head[0]][head[1]] = green; // re-assign variable
  var tailColour = getTailColour(tail, body);
  blocks[tail[0]][tail[1]] = tailColour; // re-assign variable
  blocks[apple[0]][apple[1]] = red; // re-assign variable
  displayBlocks(blocks); // call procedure
} // procedure

static void setAppleToRandomPosition(List<int> apple, List<List<int>> body) { // procedure
  var changePosition = true;
  while (changePosition) {
    apple[0] = randint(0, 39); // re-assign variable
    apple[1] = randint(0, 29); // re-assign variable
    if (!body.contains(apple)) {
      changePosition = false; // re-assign variable
    } // if
  } // while
} // procedure

static int getTailColour(List<int> tail, List<List<int>> body) { // function
  var colour = white;
  if (body[0].equals(tail)) {
    colour = green; // re-assign variable
  } // if
  return colour;
} // function

static bool hasHitEdge(int headX, int headY) { // function
  return (headX < 0) || (headY < 0) || (headX > 39) || (headY > 29);
} // function

static List<int> getAdjacentSquare(List<int> sq, string dir) { // function
  var newX = sq[0];
  var newY = sq[1];
  if (dir.equals("left")) {
    newX = newX - 1; // re-assign variable
  } else if (dir.equals("right")) {
    newX = newX + 1; // re-assign variable
  } else if (dir.equals("up")) {
    newY = newY - 1; // re-assign variable
  } else if (dir.equals("down")) {
    newY = newY + 1; // re-assign variable
  } // if
  return [newX, newY];
} // function

static string directionByKey(string current, string key) { // function
  var dirn = current;
  var d = ["w":"up", "s":"down", "a":"left", "d":"right"];
  if (d.keys().contains(key)) {
    dirn = d[key]; // re-assign variable
  } // if
  return dirn;
} // function

[TestMethod] static void test_getTailColour() {
  Assert.AreEqual(green, getTailColour([3, 4], [[3, 4], [3, 5]]))
  Assert.AreEqual(white, getTailColour([3, 4], [[3, 5], [3, 6]]))
} // 

[TestMethod] static void test_hasHitEdge() {
  Assert.AreEqual(false, hasHitEdge(0, 0))
  Assert.AreEqual(false, hasHitEdge(0, 29))
  Assert.AreEqual(false, hasHitEdge(39, 0))
  Assert.AreEqual(false, hasHitEdge(29, 29))
  Assert.AreEqual(true, hasHitEdge(-1, 5))
  Assert.AreEqual(true, hasHitEdge(5, 30))
  Assert.AreEqual(true, hasHitEdge(40, 5))
  Assert.AreEqual(true, hasHitEdge(5, -1))
} // 

[TestMethod] static void test_getAdjacentSquare() {
  var sq = [20, 15];
  Assert.AreEqual([20, 14], getAdjacentSquare(sq, "up"))
  Assert.AreEqual([20, 16], getAdjacentSquare(sq, "down"))
  Assert.AreEqual([19, 15], getAdjacentSquare(sq, "left"))
  Assert.AreEqual([21, 15], getAdjacentSquare(sq, "right"))
  // boundary
  Assert.AreEqual([-1, 15], getAdjacentSquare([0, 15], "left"))
} // 

[TestMethod] static void test_directionByKey() {
  var current = "up";
  Assert.AreEqual("up", directionByKey(current, ""))
  Assert.AreEqual("up", directionByKey(current, "x"))
  Assert.AreEqual("up", directionByKey(current, "w"))
  Assert.AreEqual("down", directionByKey(current, "s"))
  Assert.AreEqual("left", directionByKey(current, "a"))
  Assert.AreEqual("right", directionByKey(current, "d"))
  Assert.AreEqual("up", directionByKey(current, "D"))
} // 
