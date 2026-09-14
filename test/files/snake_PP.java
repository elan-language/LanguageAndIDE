// Java with Elan 2.0.0-beta5

public class Global {

// Use the w,a,s,d keys to change snake's direction

static final int width = 40; // constant

static final int height = 30; // constant

static void main() {
  var bg = new BlockGraphics();
  var head = 621;
  var snake = list(head - 1, head);
  var currentDir = "d";
  var gameIsOn = true;
  var apple = -1;
  while (gameIsOn) {
    while ((apple == -1) || snake.contains(apple)) {
      apple = randint(0, width*height); // assignment
    } // end while
    updateDisplay(bg, snake, apple); // procedure call
    var key = getKey();
    if (!key.equals("") && "wasd".contains(key)) {
      currentDir = key; // assignment
    } // end if
    head = getAdjacentBlock(head, currentDir); // assignment
    if ((head == -1) || snake.contains(head)) {
      gameIsOn = false; // assignment
    } else {
      snake.append(head); // procedure call
    } // end if
    if (head.equals(apple)) {
      apple = -1; // assignment
    } else {
      snake.removeAt(0); // procedure call
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

static int getAdjacentBlock(int bl, String dir) { // function
  var adj = -1;
  var newCol = bl % width;
  var newRow = divAsInt(bl, width);
  if (dir.equals("w")) {
    newRow = newRow - 1; // assignment
  } else if (dir.equals("a")) {
    newCol = newCol - 1; // assignment
  } else if (dir.equals("s")) {
    newRow = newRow + 1; // assignment
  } else if (dir.equals("d")) {
    newCol = newCol + 1; // assignment
  } // end if
  if ((newCol >= 0) && (newCol < width) && (newRow >= 0) && (newRow < height)) {
    adj = newRow*width + newCol; // assignment
  } // end if
  return adj;
} // end function

class Test_getAdjacentBlock {
@Test static void test_getAdjacentBlock() {
  var bl = 617;
  assertEquals(577, getAdjacentBlock(bl, "w"));
  assertEquals(616, getAdjacentBlock(bl, "a"));
  assertEquals(657, getAdjacentBlock(bl, "s"));
  assertEquals(618, getAdjacentBlock(bl, "d"));
  // boundary
  assertEquals(-1, getAdjacentBlock(20, "w"));
  assertEquals(-1, getAdjacentBlock(40, "a"));
  assertEquals(-1, getAdjacentBlock(1180, "s"));
  assertEquals(-1, getAdjacentBlock(79, "d"));
}} // end test
} // end Global
