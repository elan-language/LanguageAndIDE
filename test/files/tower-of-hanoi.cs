// C# with Elan 2.0.0-beta1

const Int nDiscs = 7;

const Int delay_ms = 300;

static void main() {
  var stacks = create3Stacks(nDiscs);
  display(stacks); // procedure call
  while (stacks[2].length() != nDiscs) {
    if ((stacks[0].length() % 2) == 0) {
      moveBetween(stacks, 0, 1); // procedure call
      moveBetween(stacks, 0, 2); // procedure call
      moveBetween(stacks, 1, 2); // procedure call
    } else {
      moveBetween(stacks, 0, 2); // procedure call
      moveBetween(stacks, 0, 1); // procedure call
      moveBetween(stacks, 1, 2); // procedure call
    } // end if
  } // end while
} // end main

static void moveBetween(List<List<int>> stacks, int fromStack, int toStack) { // procedure
  var a = stacks[fromStack];
  var b = stacks[toStack];
  if (b.length() < nDiscs) {
    if ((a.length() > 0) && ((b.length() == 0) || (top(a) < top(b)))) {
      var disc = top(a);
      a.removeFirst(disc); // procedure call
      b.append(disc); // procedure call
    } else if (b.length() > 0) {
      var disc = top(b);
      b.removeFirst(disc); // procedure call
      a.append(disc); // procedure call
    } // end if
  } // end if
  display(stacks); // procedure call
} // end procedure

static void display(List<List<int>> stacks) { // procedure
  clearAllDisplays(); // procedure call
  var vg = createVectorGraphics();
  drawStack(stacks[0], 1, vg); // procedure call
  drawStack(stacks[1], 2, vg); // procedure call
  drawStack(stacks[2], 3, vg); // procedure call
  displayVectorGraphics(vg); // procedure call
  sleep_ms(delay_ms); // procedure call
} // end procedure

static void drawStack(List<int> s, int peg, List<VectorGraphic> vg) { // procedure
  foreach (var n in range(0, s.length())) {
    var discVG = createDisc(s[n], peg, n);
    vg.append(discVG); // procedure call
  } // end foreach
} // end procedure

static RectangleVG createDisc(int disc, int peg, int vertical) { // function
  var r = new RectangleVG();
  return r.withFillColour(colour(disc)).withHeight(3).withWidth(disc*2 + 2).withX((peg - 1)*30 + 20 - disc).withY(50 - vertical*3).withStrokeWidth(0.25);
} // end function

[TestClass] class Test_createDisc
[TestMethod] static void test_createDisc() {
  // Normal cases
  var d = createDisc(5, 2, 4);
  Assert.AreEqual(green, d.fillColour);
  Assert.AreEqual(0.25, d.strokeWidth);
  Assert.AreEqual(3, d.height);
  Assert.AreEqual(12, d.width);
  Assert.AreEqual(45, d.x);
  Assert.AreEqual(38, d.y);
  // Edge cases
  var d2 = createDisc(1, 1, 0);
  Assert.AreEqual(red, d2.fillColour);
  Assert.AreEqual(0.25, d2.strokeWidth);
  Assert.AreEqual(3, d2.height);
  Assert.AreEqual(4, d2.width);
  Assert.AreEqual(19, d2.x);
  Assert.AreEqual(50, d2.y);
  // Error cases - none identified
}} // end test

static List<List<int>> create3Stacks(int nDiscs) { // function
  var s0 = rangeInSteps(nDiscs, 0, -1);
  var s1 = new List<int>();
  var s2 = new List<int>();
  return new [] {s0, s1, s2};
} // end function

[TestClass] class Test_create3Stacks
[TestMethod] static void test_create3Stacks() {
  var emptyStack = new List<int>();
  // Normal case(s)
  Assert.AreEqual(new [] {new [] {7, 6, 5, 4, 3, 2, 1}, emptyStack, emptyStack}, create3Stacks(7));
  // Edge case(s)
  Assert.AreEqual(new [] {new [] {1}, emptyStack, emptyStack}, create3Stacks(1));
  Assert.AreEqual(new [] {emptyStack, emptyStack, emptyStack}, create3Stacks(0));
  // Error case(s)
  Assert.AreEqual("Loop will not terminate when start < end start with negative step", create3Stacks(-1));
}} // end test

static int colour(int disc) { // function
  var colours = new [] {red, yellow, blue, brown, green, 0xFF9900, 0x6600FF, 0x00CC00, 0x3399FF, 0xFF99CC};
  return colours[disc - 1];
} // end function

[TestClass] class Test_colour
[TestMethod] static void test_colour() {
  // Normal cases
  Assert.AreEqual(green, colour(5));
  // Edge cases
  Assert.AreEqual(red, colour(1));
  Assert.AreEqual(0xFF99CC, colour(10));
  // Error cases
  Assert.AreEqual("Out of range index: 10 size: 10", colour(11));
}} // end test

static int top(List<int> s) { // function
  return s[s.length() - 1];
} // end function

[TestClass] class Test_top
[TestMethod] static void test_top() {
  // Normal cases
  Assert.AreEqual(1, top(new [] {3, 2, 1}));
  // Edge cases
  Assert.AreEqual(7, top(new [] {7}));
  // Error cases
  Assert.AreEqual("Out of range index: -1 size: 0", top(new List<int>()));
}} // end test
