// Java with Elan 2.0.0-beta4

public class Global {

// Use the w,a,s,d keys to change snake's direction

static void main() {
  var bg = new BlockGraphics();
  var head = 620;
  var snake = list(head, 619);
  var currentDir = "d";
  var gameOn = true;
  var apple = 0;
  var newApple = true;
  while (gameOn) {
    while (newApple) {
      apple = bg.calculateBlockNo(randint(0, 39), randint(0, 29)); // assignment
      if (!snake.contains(apple)) {
        newApple = false; // assignment
      } // end if
    } // end while
    updateDisplay(bg, snake, apple); // procedure call
    var key = getKey();
    if (!key.equals("") && "wasd".contains(key)) {
      currentDir = key; // assignment
    } // end if
    head = getAdjacentBlock(head, currentDir, bg); // assignment
    if ((head == -1) || snake.contains(head)) {
      gameOn = false; // assignment
    } else {
      snake.prepend(head); // procedure call
    } // end if
    if (head.equals(apple)) {
      newApple = true; // assignment
    } else {
      snake.removeAt(snake.length() - 1); // procedure call
    } // end if
    sleep_ms(150); // procedure call
  } // end while
  System.out.println(String.format("Game Over! Score: %", snake.length() - 1)); // print statement
} // end main

static void updateDisplay(BlockGraphics bg, List<int> snake, int apple) { // procedure
  bg.colourAll(white); // procedure call
  foreach (var bl in snake) {
    bg.putBlockNo(bl, green); // procedure call
  } // end foreach
  bg.putBlockNo(apple, red); // procedure call
  displayBlockGraphics(bg); // procedure call
} // end procedure

static int getAdjacentBlock(int bl, String dir, BlockGraphics bg) { // function
  var newCol = bg.col(bl);
  var newRow = bg.row(bl);
  if (dir.equals("a")) {
    newCol = newCol - 1; // assignment
  } else if (dir.equals("d")) {
    newCol = newCol + 1; // assignment
  } else if (dir.equals("w")) {
    newRow = newRow - 1; // assignment
  } else if (dir.equals("s")) {
    newRow = newRow + 1; // assignment
  } // end if
  return bg.calculateBlockNo(newCol, newRow);
} // end function

class Test_getAdjacentBlock {
@Test static void test_getAdjacentBlock() {
  var bg = new BlockGraphics();
  var bl = 617;
  assertEquals(577, getAdjacentBlock(bl, "w", bg));
  assertEquals(657, getAdjacentBlock(bl, "s", bg));
  assertEquals(616, getAdjacentBlock(bl, "a", bg));
  assertEquals(618, getAdjacentBlock(bl, "d", bg));
  // boundary
  assertEquals(-1, getAdjacentBlock(20, "w", bg));
  assertEquals(-1, getAdjacentBlock(1180, "s", bg));
  assertEquals(-1, getAdjacentBlock(40, "a", bg));
  assertEquals(-1, getAdjacentBlock(79, "d", bg));
}} // end test
} // end Global
