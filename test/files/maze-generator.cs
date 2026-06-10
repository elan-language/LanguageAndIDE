// C# with Elan 2.0.0-alpha5

static void main() {
  var blocks = createBlockGraphics(black);
  blocks = createStart(blocks); // reassign variable
  foreach (i in range(0, displayWidth + 1)) {
    var x = randint(0, 39);
    var y = randint(0, 29);
    var p = new Point(x, y);
    var existing = getValue(p, blocks);
    var setTo = (random() + 0.7).floor();
    if (okToSet(p, setTo, blocks)) {
      var colour = if(setTo == 1, white, black);
      blocks[p.x][p.y] = colour; // reassign variable
    } // if
  } // foreach
  displayBlocks(blocks); // call procedure
  Console.WriteLine("File name to save: ");

      var name = Console.ReadLine(); // input
  if (!name.equals("x")) {
    saveAsFile(name, blocks); // call procedure
  } // if
} // main

const Int displayWidth = 150;

static void saveAsFile(string name, List<List<int>> b) { // procedure
  var file = createFileForWriting(name);
  foreach (row in range(0, 30)) {
    var line = "";
    foreach (col in range(0, 40)) {
      var colour = b[col][row];
      var symbol = if(colour == white, " ", "X");
      line = line + symbol; // reassign variable
    } // foreach
    file.writeLine(line); // call procedure
  } // foreach
  file.saveAndClose(); // call procedure
} // procedure

static List<List<int>> createStart(List<List<int>> b) { // function
  var b2 = b;
  foreach (i in rangeInSteps(0, 16, 2)) {
    b2 = addRectangle(b2, i, i, 39 - 2*i, 29 - 2*i); // reassign variable
  } // foreach
  return b2;
} // function

static List<List<int>> addRectangle(List<List<int>> b, int startX, int startY, int width, int depth) { // function
  var paint = white;
  var b2 = b;
  foreach (x in range(startX, startX + width + 1)) {
    b2 = withPut(b2, x, startY, paint); // reassign variable
    b2 = withPut(b2, x, startY + depth, paint); // reassign variable
  } // foreach
  foreach (y in range(startY, startY + depth + 1)) {
    b2 = withPut(b2, startX, y, paint); // reassign variable
    b2 = withPut(b2, startX + width, y, paint); // reassign variable
  } // foreach
  return b2;
} // function

static List<List<int>> withPut(List<List<int>> graphics, int x, int y, int colour) { // function
  return graphics.withSet(x, graphics[x].withSet(y, colour));
} // function

// colour: 0 for black, 1 for white

static bool okToSet(Point p, int colour, List<List<int>> g) { // function
  var n = p.neighbouringPoints().map(Point p => getValue(p, g));
  var q1 = isValidQuadrant(n[0] + n[1]*2 + colour*4 + n[3]*8);
  var q2 = isValidQuadrant(n[1] + n[2]*2 + n[4]*4 + colour*8);
  var q3 = isValidQuadrant(colour + n[4]*2 + n[7]*4 + n[6]*8);
  var q4 = isValidQuadrant(n[3] + colour*2 + n[6]*4 + n[5]*8);
  return q1 && q2 && q3 && q4;
} // function

static int getValue(Point p, List<List<int>> b) { // function
  var result = 0;
  if ((p.x > -1) && (p.x < 40) && (p.y > -1) && (p.y < 30)) {
    var colour = b[p.x][p.y];
    result = if(colour == black, 0, 1); // reassign variable
  } // if
  return result;
} // function

static int flip01(int v) { // function
  return if(v == 0, 1, 0);
} // function

[TestMethod] static void test_flip01() {
  Assert.AreEqual(1, flip01(0));
  Assert.AreEqual(0, flip01(1));
} // test

static bool isValidQuadrant(int q) { // function
  return (q % 5) != 0;
} // function

[TestMethod] static void test_isValidQuadrant() {
  Assert.AreEqual(false, isValidQuadrant(0));
  Assert.AreEqual(true, isValidQuadrant(1));
  Assert.AreEqual(true, isValidQuadrant(2));
  Assert.AreEqual(true, isValidQuadrant(3));
  Assert.AreEqual(true, isValidQuadrant(4));
  Assert.AreEqual(false, isValidQuadrant(5));
  Assert.AreEqual(true, isValidQuadrant(6));
  Assert.AreEqual(true, isValidQuadrant(7));
  Assert.AreEqual(true, isValidQuadrant(8));
  Assert.AreEqual(true, isValidQuadrant(9));
  Assert.AreEqual(false, isValidQuadrant(10));
  Assert.AreEqual(true, isValidQuadrant(11));
  Assert.AreEqual(true, isValidQuadrant(12));
  Assert.AreEqual(true, isValidQuadrant(13));
  Assert.AreEqual(true, isValidQuadrant(14));
  Assert.AreEqual(false, isValidQuadrant(15));
} // test

class Point {

  public int x {get; private set;} // property

  public int y {get; private set;} // property

  public Point(int x, int y) {
    this.x = x; // reassign variable
    this.y = y; // reassign variable
  } // constructor

  public string toString() { // function method
    return "";
  } // function method

  // Returns the 8 theoretically-neighbouring points, whether or not within bounds
  public List<Point> neighbouringPoints() { // function method
    var x = this.x;
    var y = this.y;
    return [new Point(x - 1, y - 1), new Point(x, y - 1), new Point(x + 1, y - 1), new Point(x - 1, y), new Point(x + 1, y), new Point(x - 1, y + 1), new Point(x, y + 1), new Point(x + 1, y + 1)];
  } // function method

} // class

[TestMethod] static void test_neighbouringPoints() {
  var p = new Point(0, 0);
  var n = p.neighbouringPoints();
  var expected = [new Point(-1, -1), new Point(0, -1), new Point(1, -1), new Point(-1, 0), new Point(1, 0), new Point(-1, 1), new Point(0, 1), new Point(1, 1)];
  Assert.AreEqual(expected, n);
} // test
