// Java with Elan 2.0.0-beta1

public class Global {

static void main() {
  var rng = new Random();
  rng.initialiseFromClock(); // call procedure
  var grid = initialGrid(rng);
  while (true) {
    displayBlocks(grid); // call procedure
    grid = nextGeneration(grid); // assignment
    sleep_ms(50); // call procedure
  } // end while
} // end main

static List<List<int>> initialGrid(Random rng) { // function
  var grid = new List<List<int>>(); // let
  var cols = range(0, 40); // let
  return cols.reduce((grid, rng), appendCol).item_0;
} // end function

class Test_initialGrid {
@Test static void test_initialGrid() {
  var grid = initialGrid(new Random()); // let
  assertEquals(black, grid[0][0]);
  assertEquals(white, grid[1][0]);
  assertEquals(white, grid[2][0]);
  assertEquals(white, grid[0][1]);
  assertEquals(black, grid[1][1]);
  assertEquals(white, grid[2][1]);
  assertEquals(black, grid[0][2]);
  assertEquals(black, grid[1][2]);
  assertEquals(black, grid[2][2]);
}} // end test

static (List<List<int>>, Random) appendCol((List<List<int>>, Random) tup, int c) { // function
  // 'c' is not used, but is needed for compatibility with function signature for 'reduce'
  var grid = tup.item_0; // let
  var rng = tup.item_1; // let
  var tup2 = initialCol(rng); // let
  var col = tup2.item_0; // let
  var rng2 = tup2.item_1; // let
  var grid2 = grid.withAppend(col); // let
  return (grid2, rng2);
} // end function

class Test_appendCol {
@Test static void test_appendCol() {
  var emptyGrid = new List<List<int>>(); // let
  var rng = new Random(); // let
  var result = appendCol((emptyGrid, rng), 0); // let
  var grid1 = result.item_0; // let
  var col = grid1[0]; // let
  assertEquals(black, col[0]);
  assertEquals(white, col[1]);
  assertEquals(black, col[2]);
  assertEquals(black, col[29]);
  var rng2 = result.item_1; // let
  var result2 = appendCol((grid1, rng2), 1); // let
  var grid2 = result2.item_0; // let
  var col2 = grid2[1]; // let
  assertEquals(white, col2[0]);
  assertEquals(black, col2[1]);
  assertEquals(black, col2[2]);
  assertEquals(white, col2[29]);
}} // end test

static (List<int>, Random) initialCol(Random rng) { // function
  var col = new List<int>(); // let
  var rows = range(0, 30); // let
  return rows.reduce((col, rng), appendCell);
} // end function

class Test_initialCol {
@Test static void test_initialCol() {
  var rng = new Random(); // let
  var result = initialCol(rng); // let
  var col = result.item_0; // let
  assertEquals(black, col[0]);
  assertEquals(white, col[1]);
  assertEquals(black, col[2]);
  assertEquals(black, col[29]);
  var rng2 = result.item_1; // let
  var col2 = initialCol(rng2).item_0; // let
  assertEquals(white, col2[0]);
  assertEquals(black, col2[1]);
  assertEquals(black, col2[2]);
  assertEquals(white, col2[29]);
}} // end test

static (List<int>, Random) appendCell((List<int>, Random) tup, int row) { // function
  var col = tup.item_0; // let
  var rng = tup.item_1; // let
  return (col.withAppend(blackOrWhite(rng)), rng.nextGen());
} // end function

class Test_appendCell {
@Test static void test_appendCell() {
  var rng = new Random(); // let
  var emptyList = new List<int>(); // let
  var result = appendCell((emptyList, rng), 0); // let
  var col = result.item_0; // let
  assertEquals(1, col.length());
  assertEquals(black, col[0]);
  var rng2 = result.item_1; // let
  var result2 = appendCell((col, rng2), 1); // let
  var col2 = result2.item_0; // let
  assertEquals(2, col2.length());
  assertEquals(white, col2[1]);
}} // end test

static int blackOrWhite(Random rng) { // function
  return if_(rng.asFloat() > 0.5, white, black);
} // end function

class Test_blackOrWhite {
@Test static void test_blackOrWhite() {
  var rng0 = new Random(); // let
  var rng1 = rng0.nextGen(); // let
  var rng2 = rng1.nextGen(); // let
  var rng3 = rng2.nextGen(); // let
  assertEquals(black, blackOrWhite(rng0));
  assertEquals(white, blackOrWhite(rng1));
  assertEquals(black, blackOrWhite(rng2));
  assertEquals(black, blackOrWhite(rng3));
}} // end test

static (int, int) north((int, int) cell) { // function
  var x = cell.item_0; // let
  var y = cell.item_1; // let
  var y2 = if_(y == 0, 29, y - 1); // let
  return (x, y2);
} // end function

class Test_north {
@Test static void test_north() {
  assertEquals((3, 3), north((3, 4)));
  assertEquals((39, 29), north((39, 0)));
  assertEquals((0, 28), north((0, 29)));
  assertEquals((39, 28), north((39, 29)));
}} // end test

static (int, int) south((int, int) cell) { // function
  var x = cell.item_0; // let
  var y = cell.item_1; // let
  var y2 = if_(y == 29, 0, y + 1); // let
  return (x, y2);
} // end function

class Test_south {
@Test static void test_south() {
  assertEquals((3, 5), south((3, 4)));
  assertEquals((39, 1), south((39, 0)));
  assertEquals((0, 0), south((0, 29)));
  assertEquals((39, 0), south((39, 29)));
}} // end test

static (int, int) east((int, int) cell) { // function
  var x = cell.item_0; // let
  var y = cell.item_1; // let
  var x2 = if_(x == 39, 0, x + 1); // let
  return (x2, y);
} // end function

class Test_east {
@Test static void test_east() {
  assertEquals((11, 2), east((10, 2)));
  assertEquals((0, 0), east((39, 0)));
  assertEquals((1, 1), east((0, 1)));
  assertEquals((0, 29), east((39, 29)));
}} // end test

static (int, int) west((int, int) cell) { // function
  var x = cell.item_0; // let
  var y = cell.item_1; // let
  var x2 = if_(x == 0, 39, x - 1); // let
  return (x2, y);
} // end function

class Test_west {
@Test static void test_west() {
  assertEquals((2, 4), west((3, 4)));
  assertEquals((38, 0), west((39, 0)));
  assertEquals((39, 0), west((0, 0)));
  assertEquals((39, 29), west((0, 29)));
}} // end test

static (int, int) northEast((int, int) cell) { // function
  return north(east(cell));
} // end function

class Test_northEast {
@Test static void test_northEast() {
  assertEquals((4, 3), northEast((3, 4)));
  assertEquals((1, 29), northEast((0, 0)));
  assertEquals((0, 29), northEast((39, 0)));
  assertEquals((1, 28), northEast((0, 29)));
  assertEquals((0, 28), northEast((39, 29)));
}} // end test

static (int, int) northWest((int, int) cell) { // function
  return north(west(cell));
} // end function

class Test_northWest {
@Test static void test_northWest() {
  assertEquals((2, 3), northWest((3, 4)));
  assertEquals((39, 29), northWest((0, 0)));
  assertEquals((38, 29), northWest((39, 0)));
  assertEquals((39, 28), northWest((0, 29)));
  assertEquals((38, 28), northWest((39, 29)));
}} // end test

class Test_southEast {
@Test static void test_southEast() {
  assertEquals((4, 5), southEast((3, 4)));
  assertEquals((1, 1), southEast((0, 0)));
  assertEquals((0, 1), southEast((39, 0)));
  assertEquals((1, 0), southEast((0, 29)));
  assertEquals((0, 0), southEast((39, 29)));
}} // end test

static (int, int) southEast((int, int) cell) { // function
  return south(east(cell));
} // end function

static (int, int) southWest((int, int) cell) { // function
  return south(west(cell));
} // end function

class Test_southWest {
@Test static void test_southWest() {
  assertEquals((2, 5), southWest((3, 4)));
  assertEquals((39, 1), southWest((0, 0)));
  assertEquals((38, 1), southWest((39, 0)));
  assertEquals((39, 0), southWest((0, 29)));
  assertEquals((38, 0), southWest((39, 29)));
}} // end test

static List<(int, int)> neighbourCells(int x, int y) { // function
  var c = (x, y); // let
  return list(northWest(c), north(c), northEast(c), west(c), east(c), southWest(c), south(c), southEast(c));
} // end function

class Test_neighbourCells {
@Test static void test_neighbourCells() {
  assertEquals(list((2, 3), (3, 3), (4, 3), (2, 4), (4, 4), (2, 5), (3, 5), (4, 5)), neighbourCells(3, 4));
  assertEquals(list((39, 29), (0, 29), (1, 29), (39, 0), (1, 0), (39, 1), (0, 1), (1, 1)), neighbourCells(0, 0));
  assertEquals(list((38, 28), (39, 28), (0, 28), (38, 29), (0, 29), (38, 0), (39, 0), (0, 0)), neighbourCells(39, 29));
}} // end test

static int liveNeighbours(List<List<int>> grid, int x, int y) { // function
  var neighbours = neighbourCells(x, y); // let
  return neighbours.filter(((int, int) c) -> grid[c.item_0][c.item_1] == black).length();
} // end function

class Test_liveNeighbours {
@Test static void test_liveNeighbours() {
  var grid = initialGrid(new Random()); // let
  var live = liveNeighbours(grid, 1, 1); // let
  assertEquals(4, live);
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

static int nextCellValue(List<List<int>> grid, int x, int y) { // function
  var live = willLive(grid[x][y], liveNeighbours(grid, x, y)); // let
  return if_(live, black, white);
} // end function

class Test_nextCellValue {
@Test static void test_nextCellValue() {
  var grid = initialGrid(new Random()); // let
  var nxt = nextCellValue(grid, 1, 1); // let
  assertEquals(white, nxt);
}} // end test

static List<List<int>> nextGeneration(List<List<int>> grid) { // function
  var cols = range(0, 40); // let
  return cols.map((int x) -> nextCol(grid, x));
} // end function

static List<int> nextCol(List<List<int>> grid, int x) { // function
  var col = grid[x]; // let
  var rows = range(0, 30); // let
  return rows.map((int y) -> nextCellValue(grid, x, y));
} // end function

class Test_nextCol {
@Test static void test_nextCol() {
  var grid = initialGrid(new Random()); // let
  var col = nextCol(grid, 3); // let
  assertEquals(black, col[0]);
  assertEquals(black, col[1]);
  assertEquals(white, col[2]);
  assertEquals(black, col[29]);
}} // end test
} // end Global
