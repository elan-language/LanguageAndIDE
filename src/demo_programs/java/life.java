// Java with Elan 2.0.0-beta5

public class Global {

static void main() {
  var grid = new BlockGraphics();
  fillRandom(grid); // procedure call
  while (true) {
    displayBlockGraphics(grid); // procedure call
    var nextGen = new BlockGraphics();
    fillNextGeneration(grid, nextGen); // procedure call
    grid = nextGen; // assignment
    sleep_ms(50); // procedure call
  } // end while
} // end main

static void fillRandom(BlockGraphics grid) { // procedure
  var colours = list(black, white);
  foreach (var cell in range(0, 1199)) {
    var colour = colours[randint(0, 2)];
    grid.putBlockNo(cell, colour); // procedure call
  } // end foreach
} // end procedure

static void fillNextGeneration(BlockGraphics grid, BlockGraphics nextGen) { // procedure
  foreach (var cell in range(0, 1199)) {
    var colour = nextCellValue(grid, cell);
    nextGen.putBlockNo(cell, colour); // procedure call
  } // end foreach
} // end procedure

static int x(int cell) { // function
  return cell % 40;
} // end function

class Test_x {
@Test static void test_x() {
  assertEquals(0, x(0));
  assertEquals(39, x(39));
  assertEquals(0, x(40));
  assertEquals(39, x(1199));
}} // end test

static int y(int cell) { // function
  return divAsInt(cell, 40);
} // end function

class Test_y {
@Test static void test_y() {
  assertEquals(0, y(0));
  assertEquals(0, y(39));
  assertEquals(1, y(40));
  assertEquals(29, y(1199));
}} // end test

static int cellNo(int x, int y) { // function
  return y*40 + x;
} // end function

class Test_cellNo {
@Test static void test_cellNo() {
  assertEquals(0, cellNo(0, 0));
  assertEquals(39, cellNo(39, 0));
  assertEquals(40, cellNo(0, 1));
  assertEquals(1199, cellNo(39, 29));
}} // end test

static int north(int cell) { // function
  var x = x(cell);
  var y = y(cell);
  var y2 = if_(y == 0, 29, y - 1);
  return cellNo(x, y2);
} // end function

class Test_north {
@Test static void test_north() {
  assertEquals(84, north(124));
  assertEquals(1160, north(0));
  assertEquals(1199, north(39));
  assertEquals(1159, north(1199));
  assertEquals(1120, north(1160));
}} // end test

static int south(int cell) { // function
  var x = x(cell);
  var y = y(cell);
  var y2 = if_(y == 29, 0, y + 1);
  return cellNo(x, y2);
} // end function

class Test_south {
@Test static void test_south() {
  assertEquals(164, south(124));
  assertEquals(40, south(0));
  assertEquals(79, south(39));
  assertEquals(39, south(1199));
  assertEquals(0, south(1160));
}} // end test

static int east(int cell) { // function
  var x = x(cell);
  var y = y(cell);
  var x2 = if_(x == 39, 0, x + 1);
  return cellNo(x2, y);
} // end function

class Test_east {
@Test static void test_east() {
  assertEquals(125, east(124));
  assertEquals(1, east(0));
  assertEquals(0, east(39));
  assertEquals(1160, east(1199));
  assertEquals(1161, east(1160));
}} // end test

static int west(int cell) { // function
  var x = x(cell);
  var y = y(cell);
  var x2 = if_(x == 0, 39, x - 1);
  return cellNo(x2, y);
} // end function

class Test_west {
@Test static void test_west() {
  assertEquals(123, west(124));
  assertEquals(39, west(0));
  assertEquals(38, west(39));
  assertEquals(1198, west(1199));
  assertEquals(1199, west(1160));
}} // end test

static int northEast(int cell) { // function
  return north(east(cell));
} // end function

class Test_northEast {
@Test static void test_northEast() {
  assertEquals(85, northEast(124));
  assertEquals(1161, northEast(0));
  assertEquals(1160, northEast(39));
  assertEquals(1120, northEast(1199));
  assertEquals(1121, northEast(1160));
}} // end test

static int northWest(int cell) { // function
  return north(west(cell));
} // end function

class Test_northWest {
@Test static void test_northWest() {
  assertEquals(83, northWest(124));
  assertEquals(1199, northWest(0));
  assertEquals(1198, northWest(39));
  assertEquals(1158, northWest(1199));
  assertEquals(1159, northWest(1160));
}} // end test

static int southEast(int cell) { // function
  return south(east(cell));
} // end function

class Test_southEast {
@Test static void test_southEast() {
  assertEquals(165, southEast(124));
  assertEquals(41, southEast(0));
  assertEquals(40, southEast(39));
  assertEquals(0, southEast(1199));
  assertEquals(1, southEast(1160));
}} // end test

static int southWest(int cell) { // function
  return south(west(cell));
} // end function

class Test_southWest {
@Test static void test_southWest() {
  assertEquals(163, southWest(124));
  assertEquals(79, southWest(0));
  assertEquals(78, southWest(39));
  assertEquals(38, southWest(1199));
  assertEquals(39, southWest(1160));
}} // end test

static List<int> neighbourCells(int c) { // function
  return list(northWest(c), north(c), northEast(c), west(c), east(c), southWest(c), south(c), southEast(c));
} // end function

class Test_neighbourCells {
@Test static void test_neighbourCells() {
  assertEquals(list(83, 84, 85, 123, 125, 163, 164, 165), neighbourCells(124));
}} // end test

static int liveNeighbours(BlockGraphics grid, int cell) { // function
  var neighbours = neighbourCells(cell);
  return neighbours.filter((int c) -> grid.getBlockNo(c) == black).length();
} // end function

class Test_liveNeighbours {
@Test static void test_liveNeighbours() {
  var grid = createTestGrid();
  assertEquals(1, liveNeighbours(grid, 0));
  assertEquals(4, liveNeighbours(grid, 41));
  assertEquals(3, liveNeighbours(grid, 1));
  assertEquals(3, liveNeighbours(grid, 42));
}} // end test

static boolean willLive(int cell, int liveNeighbours) { // function
  return ((cell == black) && (liveNeighbours > 1) && (liveNeighbours < 4)) || ((cell == white) && (liveNeighbours == 3));
} // end function

class Test_willLive {
@Test static void test_willLive() {
  assertEquals(false, willLive(white, 0));
  assertEquals(false, willLive(white, 1));
  assertEquals(false, willLive(white, 2));
  assertEquals(true, willLive(white, 3));
  assertEquals(false, willLive(white, 4));
  assertEquals(false, willLive(white, 5));
  assertEquals(false, willLive(white, 6));
  assertEquals(false, willLive(white, 7));
  assertEquals(false, willLive(white, 8));
  assertEquals(false, willLive(black, 0));
  assertEquals(false, willLive(black, 1));
  assertEquals(true, willLive(black, 2));
  assertEquals(true, willLive(black, 3));
  assertEquals(false, willLive(black, 4));
  assertEquals(false, willLive(black, 5));
  assertEquals(false, willLive(black, 6));
  assertEquals(false, willLive(black, 7));
  assertEquals(false, willLive(black, 8));
}} // end test

static int nextCellValue(BlockGraphics grid, int cell) { // function
  var colour = white;
  var live = willLive(grid.getBlockNo(cell), liveNeighbours(grid, cell));
  if (live) {
    colour = black; // assignment
  } // end if
  return colour;
} // end function

class Test_nextCellValue {
@Test static void test_nextCellValue() {
  var grid = createTestGrid();
  assertEquals(white, nextCellValue(grid, 0));
  assertEquals(white, nextCellValue(grid, 41));
  assertEquals(black, nextCellValue(grid, 1));
  assertEquals(black, nextCellValue(grid, 42));
}} // end test

static BlockGraphics createTestGrid() { // function
  var grid = new BlockGraphics();
  grid = grid.withPutBlockNo(0, black).withPutBlockNo(2, black).withPutBlockNo(41, black).withPutBlockNo(80, black).withPutBlockNo(82, black); // assignment
  return grid;
} // end function
} // end Global
