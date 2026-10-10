// Java with Elan 2.0.0-beta5

public class Global {

static void main() {
  var head = 620;
  var snake = list(619, head);
  var direction = "d";
  var apple = -1;
  var gameOn = true;
  while (gameOn) {
    if (apple == -1) {
      apple = randint(0, 1200); // assignment
    } // end if
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
  System.out.println(String.format("Game Over! Score: %", snake.length() - 2)); // print statement
} // end main

static void display(List<int> snake, int apple) { // procedure
  var bg = new BlockGraphics();
  foreach (var segment in snake) {
    bg.putBlockNo(segment, green); // procedure call
  } // end foreach
  bg.putBlockNo(apple, red); // procedure call
  displayBlockGraphics(bg); // procedure call
} // end procedure

static boolean isValid(String key) { // function
  return (!key.equals("")) && ("wasd".contains(key));
} // end function

class Test_isValid {
@Test static void test_isValid() {
  assertEquals(true, isValid("w"));
  assertEquals(false, isValid(""));
  assertEquals(false, isValid("x"));
}} // end test

static int getAdjacentBlock(int block, String direction) { // function
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

class Test_getAdjacentBlock {
@Test static void test_getAdjacentBlock() {
  assertEquals(581, getAdjacentBlock(621, "w"));
  assertEquals(620, getAdjacentBlock(621, "a"));
  assertEquals(661, getAdjacentBlock(621, "s"));
  assertEquals(622, getAdjacentBlock(621, "d"));
  assertEquals(-1, getAdjacentBlock(119, "d"));
  assertEquals(-1, getAdjacentBlock(600, "a"));
  assertEquals(-1, getAdjacentBlock(7, "w"));
  assertEquals(-1, getAdjacentBlock(1190, "s"));
}} // end test
} // end Global
