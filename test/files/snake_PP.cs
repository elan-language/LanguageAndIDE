// C# with Elan 2.0.0-beta5

static void main() {
  var head = 621;
  var snake = new [] {620, head};
  var direction = "d";
  var apple = -1;
  var gameOn = true;
  while (gameOn) {
    while ((apple == -1) || snake.contains(apple)) {
      apple = randint(0, 1200); // assignment
    } // end while
    display(snake, apple); // procedure call
    sleep_ms(150); // procedure call
    var key = getKey().lowerCase();
    if (isValid(key)) {
      direction = key; // assignment
    } // end if
    head = getAdjacentBlock(head, direction); // assignment
    if ((head == -1) || snake.contains(head)) {
      gameOn = false; // assignment
    } // end if
    snake.append(head); // procedure call
    if (head.equals(apple)) {
      apple = -1; // assignment
    } else {
      snake.removeAt(0); // procedure call
    } // end if
  } // end while
  Console.WriteLine($"Game Over! Score: {snake.length() - 2}"); // print statement
} // end main

static void display(List<int> snake, int apple) { // procedure
  var bg = new BlockGraphics();
  foreach (var segment in snake) {
    bg.putBlockNo(segment, green); // procedure call
  } // end foreach
  bg.putBlockNo(apple, red); // procedure call
  displayBlockGraphics(bg); // procedure call
} // end procedure

static bool isValid(string key) { // function
  return (!key.equals("")) && ("wasd".contains(key));
} // end function

static int getAdjacentBlock(int block, string direction) { // function
  var adj = -1;
  if (direction.equals("d") && ((block % 40) < 39)) {
    adj = block + 1; // assignment
  } else if (direction.equals("s") && (block < 1160)) {
    adj = block + 40; // assignment
  } else if (direction.equals("w") && (block > 39)) {
    adj = block - 40; // assignment
  } else if (direction.equals("a") && ((block % 40) > 0)) {
    adj = block - 1; // assignment
  } // end if
  return adj;
} // end function

[TestClass] class Test_getAdjacentBlock
[TestMethod] static void test_getAdjacentBlock() {
  Assert.AreEqual(581, getAdjacentBlock(621, "w"));
  Assert.AreEqual(620, getAdjacentBlock(621, "a"));
  Assert.AreEqual(661, getAdjacentBlock(621, "s"));
  Assert.AreEqual(622, getAdjacentBlock(621, "d"));
  Assert.AreEqual(-1, getAdjacentBlock(119, "d"));
  Assert.AreEqual(-1, getAdjacentBlock(600, "a"));
  Assert.AreEqual(-1, getAdjacentBlock(7, "w"));
  Assert.AreEqual(-1, getAdjacentBlock(1190, "s"));
}} // end test
