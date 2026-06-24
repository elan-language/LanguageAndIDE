// Java with Elan 2.0.0-beta1

public class Global {

static final Int nDiscs = 7; // constant

static final Int delay_ms = 300; // constant

static void main() {
  var stacks = create3Stacks(nDiscs);
  display(stacks); // call procedure
  moveMultiple(nDiscs, stacks, 0, 2, 1); // call procedure
} // end main

static void moveMultiple(int n, List<List<int>> stacks, int fromStack, int toStack, int spare) { // procedure
  if (n == 1) {
    moveOne(stacks, fromStack, toStack); // call procedure
  } else {
    moveMultiple(n - 1, stacks, fromStack, spare, toStack); // call procedure
    moveOne(stacks, fromStack, toStack); // call procedure
    moveMultiple(n - 1, stacks, spare, toStack, fromStack); // call procedure
  } // end if
} // end procedure

static void moveOne(List<List<int>> stacks, int fromStack, int toStack) { // procedure
  var disc = top(stacks[fromStack]);
  stacks[fromStack].removeFirst(disc); // call procedure
  stacks[toStack].append(disc); // call procedure
  display(stacks); // call procedure
} // end procedure

static void display(List<List<int>> stacks) { // procedure
  clearAllDisplays(); // call procedure
  var vg = createVectorGraphics();
  drawStack(stacks[0], 1, vg); // call procedure
  drawStack(stacks[1], 2, vg); // call procedure
  drawStack(stacks[2], 3, vg); // call procedure
  displayVectorGraphics(vg); // call procedure
  sleep_ms(delay_ms); // call procedure
} // end procedure

static void drawStack(List<int> s, int peg, List<VectorGraphic> vg) { // procedure
  foreach (var n in range(0, s.length())) {
    var discVG = createDisc(s[n], peg, n);
    vg.append(discVG); // call procedure
  } // end foreach
} // end procedure

static RectangleVG createDisc(int disc, int peg, int vertical) { // function
  var r = new RectangleVG();
  return r.withFillColour(colour(disc)).withHeight(3).withWidth(disc*2 + 2).withX((peg - 1)*30 + 20 - disc).withY(50 - vertical*3).withStrokeWidth(0.25);
} // end function

@Test static void test_createDisc() {
  // Normal cases
  var d = createDisc(5, 2, 4);
  assertEquals(green, d.fillColour);
  assertEquals(0.25, d.strokeWidth);
  assertEquals(3, d.height);
  assertEquals(12, d.width);
  assertEquals(45, d.x);
  assertEquals(38, d.y);
  // Edge cases
  var d2 = createDisc(1, 1, 0);
  assertEquals(red, d2.fillColour);
  assertEquals(0.25, d2.strokeWidth);
  assertEquals(3, d2.height);
  assertEquals(4, d2.width);
  assertEquals(19, d2.x);
  assertEquals(50, d2.y);
  // Error cases - none identified
} // end test

static List<List<int>> create3Stacks(int nDiscs) { // function
  var s0 = rangeInSteps(nDiscs, 0, -1);
  var s1 = new List<int>();
  var s2 = new List<int>();
  return list(s0, s1, s2);
} // end function

@Test static void test_create3Stacks() {
  var emptyStack = new List<int>();
  // Normal case(s)
  assertEquals(list(list(7, 6, 5, 4, 3, 2, 1), emptyStack, emptyStack), create3Stacks(7));
  // Edge case(s)
  assertEquals(list(list(1), emptyStack, emptyStack), create3Stacks(1));
  assertEquals(list(emptyStack, emptyStack, emptyStack), create3Stacks(0));
  // Error case(s)
  assertEquals("Loop will not terminate when start < end start with negative step", create3Stacks(-1));
} // end test

static int colour(int disc) { // function
  var colours = list(red, yellow, blue, brown, green, 0xFF9900, 0x6600FF, 0x00CC00, 0x3399FF, 0xFF99CC);
  return colours[disc - 1];
} // end function

@Test static void test_colour() {
  // Normal cases
  assertEquals(green, colour(5));
  // Edge cases
  assertEquals(red, colour(1));
  assertEquals(0xFF99CC, colour(10));
  // Error cases
  assertEquals("Out of range index: 10 size: 10", colour(11));
} // end test

static int top(List<int> s) { // function
  return s[s.length() - 1];
} // end function

@Test static void test_top() {
  // Normal cases
  assertEquals(1, top(list(3, 2, 1)));
  // Edge cases
  assertEquals(7, top(list(7)));
  // Error cases
  assertEquals("Out of range index: -1 size: 0", top(new List<int>()));
} // end test
} // end Global
