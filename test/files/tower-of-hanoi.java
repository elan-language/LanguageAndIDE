// Java with Elan 2.0.0-beta

public class Global {

final Int nDiscs = 7; // constant

final Int delay_ms = 300; // constant

static void main() {
  var stacks = create3Stacks(nDiscs);
  display(stacks); // call procedure
  while (stacks[2].length() != nDiscs) {
    if ((stacks[0].length() % 2) == 0) {
      moveBetween(stacks, 0, 1); // call procedure
      moveBetween(stacks, 0, 2); // call procedure
      moveBetween(stacks, 1, 2); // call procedure
    } else {
      moveBetween(stacks, 0, 2); // call procedure
      moveBetween(stacks, 0, 1); // call procedure
      moveBetween(stacks, 1, 2); // call procedure
    } // if
  } // while
} // main

static void moveBetween(List<List<int>> stacks, int fromStack, int toStack) { // procedure
  var a = stacks[fromStack];
  var b = stacks[toStack];
  if (b.length() < nDiscs) {
    if ((a.length() > 0) && ((b.length() == 0) || (top(a) < top(b)))) {
      var disc = top(a);
      a.removeFirst(disc); // call procedure
      b.append(disc); // call procedure
    } else if (b.length() > 0) {
      var disc = top(b);
      b.removeFirst(disc); // call procedure
      a.append(disc); // call procedure
    } // if
  } // if
  display(stacks); // call procedure
} // procedure

static void display(List<List<int>> stacks) { // procedure
  clearAllDisplays(); // call procedure
  var vg = new List<VectorGraphic>();
  drawStack(stacks[0], 1, vg); // call procedure
  drawStack(stacks[1], 2, vg); // call procedure
  drawStack(stacks[2], 3, vg); // call procedure
  displayVectorGraphics(vg); // call procedure
  sleep_ms(delay_ms); // call procedure
} // procedure

static void drawStack(List<int> s, int peg, List<VectorGraphic> vg) { // procedure
  foreach (n in range(0, s.length())) {
    var discVG = createDisc(s[n], peg, n);
    vg.append(discVG); // call procedure
  } // foreach
} // procedure

static RectangleVG createDisc(int disc, int peg, int vertical) { // function
  var r = new RectangleVG();
  return r.withFillColour(colour(disc)).withHeight(3).withWidth(disc*2 + 2).withX((peg - 1)*30 + 20 - disc).withY(50 - vertical*3).withStrokeWidth(0.25);
} // function

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
} // test

static List<List<int>> create3Stacks(int nDiscs) { // function
  var s0 = rangeInSteps(nDiscs, 0, -1);
  var s1 = new List<int>();
  var s2 = new List<int>();
  return {s0, s1, s2};
} // function

@Test static void test_create3Stacks() {
  var emptyStack = new List<int>();
  // Normal case(s)
  assertEquals({{7, 6, 5, 4, 3, 2, 1}, emptyStack, emptyStack}, create3Stacks(7));
  // Edge case(s)
  assertEquals({{1}, emptyStack, emptyStack}, create3Stacks(1));
  assertEquals({emptyStack, emptyStack, emptyStack}, create3Stacks(0));
  // Error case(s)
  assertEquals("Loop will not terminate when start < end start with negative step", create3Stacks(-1));
} // test

static int colour(int disc) { // function
  var colours = {red, yellow, blue, brown, green, 0xFF9900, 0x6600FF, 0x00CC00, 0x3399FF, 0xFF99CC};
  return colours[disc - 1];
} // function

@Test static void test_colour() {
  // Normal cases
  assertEquals(green, colour(5));
  // Edge cases
  assertEquals(red, colour(1));
  assertEquals(0xFF99CC, colour(10));
  // Error cases
  assertEquals("Out of range index: 10 size: 10", colour(11));
} // test

static int top(List<int> s) { // function
  return s[s.length() - 1];
} // function

@Test static void test_top() {
  // Normal cases
  assertEquals(1, top({3, 2, 1}));
  // Edge cases
  assertEquals(7, top({7}));
  // Error cases
  assertEquals("Out of range index: -1 size: 0", top(new List<int>()));
} // test

}
