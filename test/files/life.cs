// C# with Elan 2.0.0-beta4

static void main() {
  var grid = new BlockGraphics();
  fillRandom(grid); // procedure call
  while (true) {
    displayBlockGraphics(grid); // procedure call
    nextGeneration(grid); // procedure call
    sleep_ms(50); // procedure call
  } // end while
} // end main

static void fillRandom(BlockGraphics grid) { // procedure
  foreach (var col in range(0, 40)) {
    foreach (var row in range(0, 30)) {
      grid.put(col, row, blackOrWhite(random())); // procedure call
    } // end foreach
  } // end foreach
} // end procedure

static void nextGeneration(BlockGraphics grid) { // procedure
  // First, make a copy of the existing grid
  var copy = new BlockGraphics();
  foreach (var cell in range(0, 1199)) {
    copy.putBlockNo(cell, grid.getBlockNo(cell)); // procedure call
  } // end foreach
  // then calculate each new cell *from the copy*, and update the grid
  foreach (var cell in range(0, 1199)) {
    var colour = nextCellValue(copy, cell);
    grid.putBlockNo(cell, colour); // procedure call
  } // end foreach
} // end procedure

static int blackOrWhite(double random) { // function
  var result = black;
  if (random > 0.5) {
    result = white; // assignment
  } // end if
  return result;
} // end function

static int x(int cell) { // function
  return cell % 40;
} // end function

static int y(int cell) { // function
  return divAsInt(cell, 40);
} // end function

static int cellNo(int x, int y) { // function
  return y*40 + x;
} // end function

static int north(int cell) { // function
  var x = x(cell);
  var y = y(cell);
  var y2 = if_(y == 0, 29, y - 1);
  return cellNo(x, y2);
} // end function

[TestClass] class Test_north
[TestMethod] static void test_north() {
  Assert.AreEqual(84, north(124));
  Assert.AreEqual(1160, north(0));
  Assert.AreEqual(1199, north(39));
  Assert.AreEqual(1159, north(1199));
  Assert.AreEqual(1120, north(1160));
}} // end test

static int south(int cell) { // function
  var x = x(cell);
  var y = y(cell);
  var y2 = if_(y == 29, 0, y + 1);
  return cellNo(x, y2);
} // end function

[TestClass] class Test_south
[TestMethod] static void test_south() {
  Assert.AreEqual(164, south(124));
  Assert.AreEqual(40, south(0));
  Assert.AreEqual(79, south(39));
  Assert.AreEqual(39, south(1199));
  Assert.AreEqual(0, south(1160));
}} // end test

static int east(int cell) { // function
  var x = x(cell);
  var y = y(cell);
  var x2 = if_(x == 39, 0, x + 1);
  return cellNo(x2, y);
} // end function

[TestClass] class Test_east
[TestMethod] static void test_east() {
  Assert.AreEqual(125, east(124));
  Assert.AreEqual(1, east(0));
  Assert.AreEqual(0, east(39));
  Assert.AreEqual(1160, east(1199));
  Assert.AreEqual(1161, east(1160));
}} // end test

static int west(int cell) { // function
  var x = x(cell);
  var y = y(cell);
  var x2 = if_(x == 0, 39, x - 1);
  return cellNo(x2, y);
} // end function

[TestClass] class Test_west
[TestMethod] static void test_west() {
  Assert.AreEqual(123, west(124));
  Assert.AreEqual(39, west(0));
  Assert.AreEqual(38, west(39));
  Assert.AreEqual(1198, west(1199));
  Assert.AreEqual(1199, west(1160));
}} // end test

static int northEast(int cell) { // function
  return north(east(cell));
} // end function

[TestClass] class Test_northEast
[TestMethod] static void test_northEast() {
  Assert.AreEqual(85, northEast(124));
  Assert.AreEqual(1161, northEast(0));
  Assert.AreEqual(1160, northEast(39));
  Assert.AreEqual(1120, northEast(1199));
  Assert.AreEqual(1121, northEast(1160));
}} // end test

static int northWest(int cell) { // function
  return north(west(cell));
} // end function

[TestClass] class Test_northWest
[TestMethod] static void test_northWest() {
  Assert.AreEqual(83, northWest(124));
  Assert.AreEqual(1199, northWest(0));
  Assert.AreEqual(1198, northWest(39));
  Assert.AreEqual(1158, northWest(1199));
  Assert.AreEqual(1159, northWest(1160));
}} // end test

static int southEast(int cell) { // function
  return south(east(cell));
} // end function

[TestClass] class Test_southEast
[TestMethod] static void test_southEast() {
  Assert.AreEqual(165, southEast(124));
  Assert.AreEqual(41, southEast(0));
  Assert.AreEqual(40, southEast(39));
  Assert.AreEqual(0, southEast(1199));
  Assert.AreEqual(1, southEast(1160));
}} // end test

static int southWest(int cell) { // function
  return south(west(cell));
} // end function

[TestClass] class Test_southWest
[TestMethod] static void test_southWest() {
  Assert.AreEqual(163, southWest(124));
  Assert.AreEqual(79, southWest(0));
  Assert.AreEqual(78, southWest(39));
  Assert.AreEqual(38, southWest(1199));
  Assert.AreEqual(39, southWest(1160));
}} // end test

static List<int> neighbourCells(int c) { // function
  return new [] {northWest(c), north(c), northEast(c), west(c), east(c), southWest(c), south(c), southEast(c)};
} // end function

[TestClass] class Test_neighbourCells
[TestMethod] static void test_neighbourCells() {
  Assert.AreEqual(new [] {83, 84, 85, 123, 125, 163, 164, 165}, neighbourCells(124));
}} // end test

static int liveNeighbours(BlockGraphics grid, int cell) { // function
  var neighbours = neighbourCells(cell);
  return neighbours.filter(int c => grid.getBlockNo(c) == black).length();
} // end function

static bool willLive(int cell, int liveNeighbours) { // function
  return ((cell == black) && (liveNeighbours > 1) && (liveNeighbours < 4)) || ((cell == white) && (liveNeighbours == 3));
} // end function

[TestClass] class Test_willLive
[TestMethod] static void test_willLive() {
  Assert.AreEqual(false, willLive(white, 0));
  Assert.AreEqual(false, willLive(white, 1));
  Assert.AreEqual(false, willLive(white, 2));
  Assert.AreEqual(true, willLive(white, 3));
  Assert.AreEqual(false, willLive(white, 4));
  Assert.AreEqual(false, willLive(white, 5));
  Assert.AreEqual(false, willLive(white, 6));
  Assert.AreEqual(false, willLive(white, 7));
  Assert.AreEqual(false, willLive(white, 8));
  Assert.AreEqual(false, willLive(black, 0));
  Assert.AreEqual(false, willLive(black, 1));
  Assert.AreEqual(true, willLive(black, 2));
  Assert.AreEqual(true, willLive(black, 3));
  Assert.AreEqual(false, willLive(black, 4));
  Assert.AreEqual(false, willLive(black, 5));
  Assert.AreEqual(false, willLive(black, 6));
  Assert.AreEqual(false, willLive(black, 7));
  Assert.AreEqual(false, willLive(black, 8));
}} // end test

static int nextCellValue(BlockGraphics grid, int cell) { // function
  var colour = white;
  var live = willLive(grid.getBlockNo(cell), liveNeighbours(grid, cell));
  if (live) {
    colour = black; // assignment
  } // end if
  return colour;
} // end function

[TestClass] class Test_blackOrWhite
[TestMethod] static void test_blackOrWhite() {
  Assert.AreEqual(black, blackOrWhite(0));
  Assert.AreEqual(black, blackOrWhite(0.499));
  Assert.AreEqual(black, blackOrWhite(0.5));
  Assert.AreEqual(white, blackOrWhite(0.501));
  Assert.AreEqual(white, blackOrWhite(1));
}} // end test
