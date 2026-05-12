// Java with Elan 2.0.0-alpha1

static void main() {
  var rng = new Random();
  rng.initialiseFromClock(); // call procedure
  var grid = initialGrid(rng);
  while (true) {
    displayBlocks(grid); // call procedure
    grid = nextGrid(grid); // re-assign variable
    sleep_ms(50); // call procedure
  }
}

static List<List<int>> initialGrid(Random rng) { // function
  var List> grid = new List<List<int>>(); // let
  var List cols = range(0, 40); // let
  return cols.reduce((grid, rng), appendCol).item_0;
}

static (List<List<int>>, Random) appendCol((List<List<int>>, Random) tup, int c) { // function
  var List> grid = tup.item_0; // let
  var Random rng = tup.item_1; // let
  var (List, Random) tup2 = initialCol(rng); // let
  var List col = tup2.item_0; // let
  var Random rng2 = tup2.item_1; // let
  var List> grid2 = grid.withAppend(col); // let
  return (grid2, rng2);
}

static (List<int>, Random) initialCol(Random rng) { // function
  var List col = new List<int>(); // let
  var List rows = range(0, 30); // let
  return rows.reduce((col, rng), appendCell);
}

static (List<int>, Random) appendCell((List<int>, Random) tup, int row) { // function
  var List col = tup.item_0; // let
  var Random rng = tup.item_1; // let
  return (col.withAppend(blackOrWhite(rng)), rng.nextGen());
}

static int blackOrWhite(Random rng) { // function
  return if(rng.asFloat() > 0.5, white, black);
}

static (int, int) north((int, int) cell) { // function
  var Int x = cell.item_0; // let
  var Int y = cell.item_1; // let
  var Int y2 = if(y == 0, 29, y - 1); // let
  return (x, y2);
}

static (int, int) south((int, int) cell) { // function
  var Int x = cell.item_0; // let
  var Int y = cell.item_1; // let
  var Int y2 = if(y == 29, 0, y + 1); // let
  return (x, y2);
}

static (int, int) east((int, int) cell) { // function
  var Int x = cell.item_0; // let
  var Int y = cell.item_1; // let
  var Int x2 = if(x == 39, 0, x + 1); // let
  return (x2, y);
}

static (int, int) west((int, int) cell) { // function
  var Int x = cell.item_0; // let
  var Int y = cell.item_1; // let
  var Int x2 = if(x == 0, 39, x - 1); // let
  return (x2, y);
}

static (int, int) northEast((int, int) cell) { // function
  return north(east(cell));
}

static (int, int) northWest((int, int) cell) { // function
  return north(west(cell));
}

static (int, int) southEast((int, int) cell) { // function
  return south(east(cell));
}

static (int, int) southWest((int, int) cell) { // function
  return south(west(cell));
}

static List<(int, int)> neighbourCells(int x, int y) { // function
  var (Int, Int) c = (x, y); // let
  return [northWest(c), north(c), northEast(c), west(c), east(c), southWest(c), south(c), southEast(c)];
}

static int liveNeighbours(List<List<int>> grid, int x, int y) { // function
  var List neighbours = neighbourCells(x, y); // let
  return neighbours.filter(lambda (int, int) c => grid[c.item_0][c.item_1] == black).length();
}

static bool willLive(int cell, int liveNeighbours) { // function
  return if(cell == black, (liveNeighbours > 1) && (liveNeighbours < 4), liveNeighbours == 3);
}

static int nextCellValue(List<List<int>> grid, int x, int y) { // function
  var Boolean live = willLive(grid[x][y], liveNeighbours(grid, x, y)); // let
  return if(live, black, white);
}

static List<List<int>> nextGrid(List<List<int>> grid) { // function
  var List cols = range(0, 40); // let
  return cols.map(lambda int x => nextColumn(grid, x));
}

static List<int> nextColumn(List<List<int>> grid, int x) { // function
  var List col = grid[x]; // let
  var List rows = range(0, 30); // let
  return rows.map(lambda int y => nextCellValue(grid, x, y));
}

@Test static void test_north() {
  assertEquals((3, 3), north((3, 4)))
  assertEquals((39, 29), north((39, 0)))
  assertEquals((0, 28), north((0, 29)))
  assertEquals((39, 28), north((39, 29)))
}

@Test static void test_south() {
  assertEquals((3, 5), south((3, 4)))
  assertEquals((39, 1), south((39, 0)))
  assertEquals((0, 0), south((0, 29)))
  assertEquals((39, 0), south((39, 29)))
}

@Test static void test_east() {
  assertEquals((11, 2), east((10, 2)))
  assertEquals((0, 0), east((39, 0)))
  assertEquals((1, 1), east((0, 1)))
  assertEquals((0, 29), east((39, 29)))
}

@Test static void test_west() {
  assertEquals((2, 4), west((3, 4)))
  assertEquals((38, 0), west((39, 0)))
  assertEquals((39, 0), west((0, 0)))
  assertEquals((39, 29), west((0, 29)))
}

@Test static void test_northEast() {
  assertEquals((4, 3), northEast((3, 4)))
  assertEquals((1, 29), northEast((0, 0)))
  assertEquals((0, 29), northEast((39, 0)))
  assertEquals((1, 28), northEast((0, 29)))
  assertEquals((0, 28), northEast((39, 29)))
}

@Test static void test_southEast() {
  assertEquals((4, 5), southEast((3, 4)))
  assertEquals((1, 1), southEast((0, 0)))
  assertEquals((0, 1), southEast((39, 0)))
  assertEquals((1, 0), southEast((0, 29)))
  assertEquals((0, 0), southEast((39, 29)))
}

@Test static void test_northWest() {
  assertEquals((2, 3), northWest((3, 4)))
  assertEquals((39, 29), northWest((0, 0)))
  assertEquals((38, 29), northWest((39, 0)))
  assertEquals((39, 28), northWest((0, 29)))
  assertEquals((38, 28), northWest((39, 29)))
}

@Test static void test_southWest() {
  assertEquals((2, 5), southWest((3, 4)))
  assertEquals((39, 1), southWest((0, 0)))
  assertEquals((38, 1), southWest((39, 0)))
  assertEquals((39, 0), southWest((0, 29)))
  assertEquals((38, 0), southWest((39, 29)))
}

@Test static void test_blackOrWhite() {
  var Random rng0 = new Random(); // let
  var Random rng1 = rng0.nextGen(); // let
  var Random rng2 = rng1.nextGen(); // let
  var Random rng3 = rng2.nextGen(); // let
  assertEquals(black, blackOrWhite(rng0))
  assertEquals(white, blackOrWhite(rng1))
  assertEquals(black, blackOrWhite(rng2))
  assertEquals(black, blackOrWhite(rng3))
}

@Test static void test_neighbourCells() {
  assertEquals([(2, 3), (3, 3), (4, 3), (2, 4), (4, 4), (2, 5), (3, 5), (4, 5)], neighbourCells(3, 4))
  assertEquals([(39, 29), (0, 29), (1, 29), (39, 0), (1, 0), (39, 1), (0, 1), (1, 1)], neighbourCells(0, 0))
  assertEquals([(38, 28), (39, 28), (0, 28), (38, 29), (0, 29), (38, 0), (39, 0), (0, 0)], neighbourCells(39, 29))
}

@Test static void test_willLive() {
  assertEquals(false, willLive(white, 0))
  assertEquals(false, willLive(white, 1))
  assertEquals(false, willLive(white, 2))
  assertEquals(true, willLive(white, 3))
  assertEquals(false, willLive(white, 4))
  assertEquals(false, willLive(white, 5))
  assertEquals(false, willLive(white, 6))
  assertEquals(false, willLive(white, 7))
  assertEquals(false, willLive(white, 8))
  assertEquals(false, willLive(black, 0))
  assertEquals(false, willLive(black, 1))
  assertEquals(true, willLive(black, 2))
  assertEquals(true, willLive(black, 3))
  assertEquals(false, willLive(black, 4))
  assertEquals(false, willLive(black, 5))
  assertEquals(false, willLive(black, 6))
  assertEquals(false, willLive(black, 7))
  assertEquals(false, willLive(black, 8))
}

static List<List<int>> testGrid() { // function
  return initialGrid(new Random());
}

@Test static void test_initialGrid() {
  var List> grid = testGrid(); // let
  assertEquals(black, grid[0][0])
  assertEquals(white, grid[1][0])
  assertEquals(white, grid[2][0])
  assertEquals(white, grid[0][1])
  assertEquals(black, grid[1][1])
  assertEquals(white, grid[2][1])
  assertEquals(black, grid[0][2])
  assertEquals(black, grid[1][2])
  assertEquals(black, grid[2][2])
}

@Test static void test_liveNeighbours() {
  var List> grid = testGrid(); // let
  var Int live = liveNeighbours(grid, 1, 1); // let
  assertEquals(4, live)
}

@Test static void test_nextCellValue() {
  var List> grid = testGrid(); // let
  var Int nxt = nextCellValue(grid, 1, 1); // let
  assertEquals(white, nxt)
}

@Test static void test_nextGrid() {
  var List> prev = testGrid(); // let
  var List> grid = nextGrid(prev); // let
  assertEquals(black, grid[0][0])
  assertEquals(black, grid[1][0])
  assertEquals(white, grid[2][0])
  assertEquals(white, grid[0][1])
  assertEquals(white, grid[1][1])
  assertEquals(white, grid[2][1])
  assertEquals(white, grid[0][2])
  assertEquals(white, grid[1][2])
  assertEquals(white, grid[2][2])
}
