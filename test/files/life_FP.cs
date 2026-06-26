// C# with Elan 2.0.0-beta1

static void main() {
  var rng = new Random();
  rng.initialiseFromClock(); // call procedure
  var grid = initialGrid(rng);
  while (true) {
    displayBlocks(grid); // call procedure
    grid = nextGeneration(grid); // reassign variable
    sleep_ms(50); // call procedure
  } // end while
} // end main

static List<List<int>> initialGrid(Random rng) { // function
  var grid = new List<List<int>>(); // let
  var cols = range(0, 40); // let
  return cols.reduce((grid, rng), appendCol).item_0;
} // end function

[TestClass] class Test_initialGrid
[TestMethod] static void test_initialGrid() {
  var grid = initialGrid(new Random()); // let
  Assert.AreEqual(black, grid[0][0]);
  Assert.AreEqual(white, grid[1][0]);
  Assert.AreEqual(white, grid[2][0]);
  Assert.AreEqual(white, grid[0][1]);
  Assert.AreEqual(black, grid[1][1]);
  Assert.AreEqual(white, grid[2][1]);
  Assert.AreEqual(black, grid[0][2]);
  Assert.AreEqual(black, grid[1][2]);
  Assert.AreEqual(black, grid[2][2]);
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

[TestClass] class Test_appendCol
[TestMethod] static void test_appendCol() {
  var emptyGrid = new List<List<int>>(); // let
  var rng = new Random(); // let
  var result = appendCol((emptyGrid, rng), 0); // let
  var grid1 = result.item_0; // let
  var col = grid1[0]; // let
  Assert.AreEqual(black, col[0]);
  Assert.AreEqual(white, col[1]);
  Assert.AreEqual(black, col[2]);
  Assert.AreEqual(black, col[29]);
  var rng2 = result.item_1; // let
  var result2 = appendCol((grid1, rng2), 1); // let
  var grid2 = result2.item_0; // let
  var col2 = grid2[1]; // let
  Assert.AreEqual(white, col2[0]);
  Assert.AreEqual(black, col2[1]);
  Assert.AreEqual(black, col2[2]);
  Assert.AreEqual(white, col2[29]);
}} // end test

static (List<int>, Random) initialCol(Random rng) { // function
  var col = new List<int>(); // let
  var rows = range(0, 30); // let
  return rows.reduce((col, rng), appendCell);
} // end function

[TestClass] class Test_initialCol
[TestMethod] static void test_initialCol() {
  var rng = new Random(); // let
  var result = initialCol(rng); // let
  var col = result.item_0; // let
  Assert.AreEqual(black, col[0]);
  Assert.AreEqual(white, col[1]);
  Assert.AreEqual(black, col[2]);
  Assert.AreEqual(black, col[29]);
  var rng2 = result.item_1; // let
  var col2 = initialCol(rng2).item_0; // let
  Assert.AreEqual(white, col2[0]);
  Assert.AreEqual(black, col2[1]);
  Assert.AreEqual(black, col2[2]);
  Assert.AreEqual(white, col2[29]);
}} // end test

static (List<int>, Random) appendCell((List<int>, Random) tup, int row) { // function
  var col = tup.item_0; // let
  var rng = tup.item_1; // let
  return (col.withAppend(blackOrWhite(rng)), rng.nextGen());
} // end function

[TestClass] class Test_appendCell
[TestMethod] static void test_appendCell() {
  var rng = new Random(); // let
  var emptyList = new List<int>(); // let
  var result = appendCell((emptyList, rng), 0); // let
  var col = result.item_0; // let
  Assert.AreEqual(1, col.length());
  Assert.AreEqual(black, col[0]);
  var rng2 = result.item_1; // let
  var result2 = appendCell((col, rng2), 1); // let
  var col2 = result2.item_0; // let
  Assert.AreEqual(2, col2.length());
  Assert.AreEqual(white, col2[1]);
}} // end test

static int blackOrWhite(Random rng) { // function
  return if_(rng.asFloat() > 0.5, white, black);
} // end function

[TestClass] class Test_blackOrWhite
[TestMethod] static void test_blackOrWhite() {
  var rng0 = new Random(); // let
  var rng1 = rng0.nextGen(); // let
  var rng2 = rng1.nextGen(); // let
  var rng3 = rng2.nextGen(); // let
  Assert.AreEqual(black, blackOrWhite(rng0));
  Assert.AreEqual(white, blackOrWhite(rng1));
  Assert.AreEqual(black, blackOrWhite(rng2));
  Assert.AreEqual(black, blackOrWhite(rng3));
}} // end test

static (int, int) north((int, int) cell) { // function
  var x = cell.item_0; // let
  var y = cell.item_1; // let
  var y2 = if_(y == 0, 29, y - 1); // let
  return (x, y2);
} // end function

[TestClass] class Test_north
[TestMethod] static void test_north() {
  Assert.AreEqual((3, 3), north((3, 4)));
  Assert.AreEqual((39, 29), north((39, 0)));
  Assert.AreEqual((0, 28), north((0, 29)));
  Assert.AreEqual((39, 28), north((39, 29)));
}} // end test

static (int, int) south((int, int) cell) { // function
  var x = cell.item_0; // let
  var y = cell.item_1; // let
  var y2 = if_(y == 29, 0, y + 1); // let
  return (x, y2);
} // end function

[TestClass] class Test_south
[TestMethod] static void test_south() {
  Assert.AreEqual((3, 5), south((3, 4)));
  Assert.AreEqual((39, 1), south((39, 0)));
  Assert.AreEqual((0, 0), south((0, 29)));
  Assert.AreEqual((39, 0), south((39, 29)));
}} // end test

static (int, int) east((int, int) cell) { // function
  var x = cell.item_0; // let
  var y = cell.item_1; // let
  var x2 = if_(x == 39, 0, x + 1); // let
  return (x2, y);
} // end function

[TestClass] class Test_east
[TestMethod] static void test_east() {
  Assert.AreEqual((11, 2), east((10, 2)));
  Assert.AreEqual((0, 0), east((39, 0)));
  Assert.AreEqual((1, 1), east((0, 1)));
  Assert.AreEqual((0, 29), east((39, 29)));
}} // end test

static (int, int) west((int, int) cell) { // function
  var x = cell.item_0; // let
  var y = cell.item_1; // let
  var x2 = if_(x == 0, 39, x - 1); // let
  return (x2, y);
} // end function

[TestClass] class Test_west
[TestMethod] static void test_west() {
  Assert.AreEqual((2, 4), west((3, 4)));
  Assert.AreEqual((38, 0), west((39, 0)));
  Assert.AreEqual((39, 0), west((0, 0)));
  Assert.AreEqual((39, 29), west((0, 29)));
}} // end test

static (int, int) northEast((int, int) cell) { // function
  return north(east(cell));
} // end function

[TestClass] class Test_northEast
[TestMethod] static void test_northEast() {
  Assert.AreEqual((4, 3), northEast((3, 4)));
  Assert.AreEqual((1, 29), northEast((0, 0)));
  Assert.AreEqual((0, 29), northEast((39, 0)));
  Assert.AreEqual((1, 28), northEast((0, 29)));
  Assert.AreEqual((0, 28), northEast((39, 29)));
}} // end test

static (int, int) northWest((int, int) cell) { // function
  return north(west(cell));
} // end function

[TestClass] class Test_northWest
[TestMethod] static void test_northWest() {
  Assert.AreEqual((2, 3), northWest((3, 4)));
  Assert.AreEqual((39, 29), northWest((0, 0)));
  Assert.AreEqual((38, 29), northWest((39, 0)));
  Assert.AreEqual((39, 28), northWest((0, 29)));
  Assert.AreEqual((38, 28), northWest((39, 29)));
}} // end test

[TestClass] class Test_southEast
[TestMethod] static void test_southEast() {
  Assert.AreEqual((4, 5), southEast((3, 4)));
  Assert.AreEqual((1, 1), southEast((0, 0)));
  Assert.AreEqual((0, 1), southEast((39, 0)));
  Assert.AreEqual((1, 0), southEast((0, 29)));
  Assert.AreEqual((0, 0), southEast((39, 29)));
}} // end test

static (int, int) southEast((int, int) cell) { // function
  return south(east(cell));
} // end function

static (int, int) southWest((int, int) cell) { // function
  return south(west(cell));
} // end function

[TestClass] class Test_southWest
[TestMethod] static void test_southWest() {
  Assert.AreEqual((2, 5), southWest((3, 4)));
  Assert.AreEqual((39, 1), southWest((0, 0)));
  Assert.AreEqual((38, 1), southWest((39, 0)));
  Assert.AreEqual((39, 0), southWest((0, 29)));
  Assert.AreEqual((38, 0), southWest((39, 29)));
}} // end test

static List<(int, int)> neighbourCells(int x, int y) { // function
  var c = (x, y); // let
  return new [] {northWest(c), north(c), northEast(c), west(c), east(c), southWest(c), south(c), southEast(c)};
} // end function

[TestClass] class Test_neighbourCells
[TestMethod] static void test_neighbourCells() {
  Assert.AreEqual(new [] {(2, 3), (3, 3), (4, 3), (2, 4), (4, 4), (2, 5), (3, 5), (4, 5)}, neighbourCells(3, 4));
  Assert.AreEqual(new [] {(39, 29), (0, 29), (1, 29), (39, 0), (1, 0), (39, 1), (0, 1), (1, 1)}, neighbourCells(0, 0));
  Assert.AreEqual(new [] {(38, 28), (39, 28), (0, 28), (38, 29), (0, 29), (38, 0), (39, 0), (0, 0)}, neighbourCells(39, 29));
}} // end test

static int liveNeighbours(List<List<int>> grid, int x, int y) { // function
  var neighbours = neighbourCells(x, y); // let
  return neighbours.filter((int, int) c => grid[c.item_0][c.item_1] == black).length();
} // end function

[TestClass] class Test_liveNeighbours
[TestMethod] static void test_liveNeighbours() {
  var grid = initialGrid(new Random()); // let
  var live = liveNeighbours(grid, 1, 1); // let
  Assert.AreEqual(4, live);
}} // end test

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

static int nextCellValue(List<List<int>> grid, int x, int y) { // function
  var live = willLive(grid[x][y], liveNeighbours(grid, x, y)); // let
  return if_(live, black, white);
} // end function

[TestClass] class Test_nextCellValue
[TestMethod] static void test_nextCellValue() {
  var grid = initialGrid(new Random()); // let
  var nxt = nextCellValue(grid, 1, 1); // let
  Assert.AreEqual(white, nxt);
}} // end test

static List<List<int>> nextGeneration(List<List<int>> grid) { // function
  var cols = range(0, 40); // let
  return cols.map(int x => nextCol(grid, x));
} // end function

static List<int> nextCol(List<List<int>> grid, int x) { // function
  var col = grid[x]; // let
  var rows = range(0, 30); // let
  return rows.map(int y => nextCellValue(grid, x, y));
} // end function

[TestClass] class Test_nextCol
[TestMethod] static void test_nextCol() {
  var grid = initialGrid(new Random()); // let
  var col = nextCol(grid, 3); // let
  Assert.AreEqual(black, col[0]);
  Assert.AreEqual(black, col[1]);
  Assert.AreEqual(white, col[2]);
  Assert.AreEqual(black, col[29]);
}} // end test
