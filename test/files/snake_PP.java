// Java with Elan 2.0.0-beta5

public class Global {

static void main() {
  var head = 621;
  var snake = list(617, 618, 619, 620, head);
  var direction = "d";
  var gameOn = true;
  var apple = -1;
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
    if (head == -1) {
      gameOn = false; // assignment
    } // end if
    if (head.equals(apple)) {
      apple = -1; // assignment
    } else {
      snake.removeAt(0); // procedure call
    } // end if
    snake.append(head); // procedure call
  } // end while
} // end main

static boolean isValid(String key) { // function
  return (!key.equals("")) && ("wasd".contains(key));
} // end function

class Test_isValid {
@Test static void test_isValid() {
  assertEquals(true, isValid("w"));
  assertEquals(false, isValid(""));
  assertEquals(false, isValid("x"));
}} // end test

static int getAdjacentBlock(int bl, String direction) { // function
  var adj = -1;
  if (direction.equals("d") && ((bl % 40) < 39)) {
    adj = bl + 1; // assignment
  } else if (direction.equals("s") && (bl < 1160)) {
    adj = bl + 40; // assignment
  } else if (direction.equals("w") && (bl > 39)) {
    adj = bl - 40; // assignment
  } else if (direction.equals("a") && ((bl % 40) > 0)) {
    adj = bl - 1; // assignment
  } // end if
  return adj;
} // end function

class Test_getAdjacentBlock {
@Test static void test_getAdjacentBlock() {
  assertEquals(-1, getAdjacentBlock(119, "d"));
  assertEquals(-1, getAdjacentBlock(600, "a"));
  assertEquals(-1, getAdjacentBlock(7, "w"));
  assertEquals(-1, getAdjacentBlock(1190, "s"));
}} // end test

static void display(List<int> snake, int apple) { // procedure
  var bg = new BlockGraphics();
  foreach (var segment in snake) {
    bg.putBlockNo(segment, green); // procedure call
  } // end foreach
  bg.putBlockNo(apple, red); // procedure call
  displayBlockGraphics(bg); // procedure call
} // end procedure
} // end Global
