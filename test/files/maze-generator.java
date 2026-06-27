// Java with Elan 2.0.0-beta1

public class Global {

static void main() {
  var blocks = createBlockGraphics(black);
  blocks = createStart(blocks); // assignment
  foreach (var i in range(0, displayWidth + 1)) {
    var x = randint(0, 39);
    var y = randint(0, 29);
    var p = new Point(x, y);
    var existing = getValue(p, blocks);
    var setTo = (random() + 0.7).floor();
    if (okToSet(p, setTo, blocks)) {
      var colour = if_(setTo == 1, white, black);
      blocks[p.x][p.y] = colour; // assignment
    } // end if
  } // end foreach
  displayBlocks(blocks); // call procedure
  var name = Console.ReadLine("File name to save: "); // input
  if (!name.equals("x")) {
    saveAsFile(name, blocks); // call procedure
  } // end if
} // end main

static final Int displayWidth = 150; // constant

static void saveAsFile(String name, List<List<int>> b) { // procedure
  var file = createFileForWriting(name);
  foreach (var row in range(0, 30)) {
    var line = "";
    foreach (var col in range(0, 40)) {
      var colour = b[col][row];
      var symbol = if_(colour == white, " ", "X");
      line = line + symbol; // assignment
    } // end foreach
    file.writeLine(line); // call procedure
  } // end foreach
  file.saveAndClose(); // call procedure
} // end procedure

static List<List<int>> createStart(List<List<int>> b) { // function
  var b2 = b;
  foreach (var i in rangeInSteps(0, 16, 2)) {
    b2 = addRectangle(b2, i, i, 39 - 2*i, 29 - 2*i); // assignment
  } // end foreach
  return b2;
} // end function

static List<List<int>> addRectangle(List<List<int>> b, int startX, int startY, int width, int depth) { // function
  var paint = white;
  var b2 = b;
  foreach (var x in range(startX, startX + width + 1)) {
    b2 = withPut(b2, x, startY, paint); // assignment
    b2 = withPut(b2, x, startY + depth, paint); // assignment
  } // end foreach
  foreach (var y in range(startY, startY + depth + 1)) {
    b2 = withPut(b2, startX, y, paint); // assignment
    b2 = withPut(b2, startX + width, y, paint); // assignment
  } // end foreach
  return b2;
} // end function

static List<List<int>> withPut(List<List<int>> graphics, int x, int y, int colour) { // function
  return graphics.withSet(x, graphics[x].withSet(y, colour));
} // end function

// colour: 0 for black, 1 for white

static boolean okToSet(Point p, int colour, List<List<int>> g) { // function
  var n = p.neighbouringPoints().map((Point p) -> getValue(p, g));
  var q1 = isValidQuadrant(n[0] + n[1]*2 + colour*4 + n[3]*8);
  var q2 = isValidQuadrant(n[1] + n[2]*2 + n[4]*4 + colour*8);
  var q3 = isValidQuadrant(colour + n[4]*2 + n[7]*4 + n[6]*8);
  var q4 = isValidQuadrant(n[3] + colour*2 + n[6]*4 + n[5]*8);
  return q1 && q2 && q3 && q4;
} // end function

static int getValue(Point p, List<List<int>> b) { // function
  var result = 0;
  if ((p.x > -1) && (p.x < 40) && (p.y > -1) && (p.y < 30)) {
    var colour = b[p.x][p.y];
    result = if_(colour == black, 0, 1); // assignment
  } // end if
  return result;
} // end function

static int flip01(int v) { // function
  return if_(v == 0, 1, 0);
} // end function

class Test_flip01 {
@Test static void test_flip01() {
  assertEquals(1, flip01(0));
  assertEquals(0, flip01(1));
}} // end test

static boolean isValidQuadrant(int q) { // function
  return (q % 5) != 0;
} // end function

class Test_isValidQuadrant {
@Test static void test_isValidQuadrant() {
  assertEquals(false, isValidQuadrant(0));
  assertEquals(true, isValidQuadrant(1));
  assertEquals(true, isValidQuadrant(2));
  assertEquals(true, isValidQuadrant(3));
  assertEquals(true, isValidQuadrant(4));
  assertEquals(false, isValidQuadrant(5));
  assertEquals(true, isValidQuadrant(6));
  assertEquals(true, isValidQuadrant(7));
  assertEquals(true, isValidQuadrant(8));
  assertEquals(true, isValidQuadrant(9));
  assertEquals(false, isValidQuadrant(10));
  assertEquals(true, isValidQuadrant(11));
  assertEquals(true, isValidQuadrant(12));
  assertEquals(true, isValidQuadrant(13));
  assertEquals(true, isValidQuadrant(14));
  assertEquals(false, isValidQuadrant(15));
}} // end test

class Point {

  public int x; // property

  public int y; // property

  public Point(int x, int y) {
    this.x = x; // assignment
    this.y = y; // assignment
  } // end constructor

  public String toString() { // function method
    return String.format("Point at %, %", this.x, this.y);
  } // end function method

  // Returns the 8 theoretically-neighbouring points, whether or not within bounds
  public List<Point> neighbouringPoints() { // function method
    var x = this.x;
    var y = this.y;
    return list(new Point(x - 1, y - 1), new Point(x, y - 1), new Point(x + 1, y - 1), new Point(x - 1, y), new Point(x + 1, y), new Point(x - 1, y + 1), new Point(x, y + 1), new Point(x + 1, y + 1));
  } // end function method

} // end class

class Test_neighbouringPoints {
@Test static void test_neighbouringPoints() {
  var p = new Point(0, 0);
  var n = p.neighbouringPoints();
  var expected = list(new Point(-1, -1), new Point(0, -1), new Point(1, -1), new Point(-1, 0), new Point(1, 0), new Point(-1, 1), new Point(0, 1), new Point(1, 1));
  assertEquals(expected, n);
}} // end test
} // end Global
