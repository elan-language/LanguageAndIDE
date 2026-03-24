// Java with Elan 2.0.0-alpha1

static void main() {
  var grid = createBlockGraphics(white);
  fillRandom(grid); // call
  while (true) {
    displayBlocks(grid); // call
    var gridRef = new AsRef<List<List<int>>>(grid);
    nextGeneration(gridRef); // call
    grid = gridRef.value(); // set
    sleep_ms(50); // call
  }
}

static void fillRandom(List<List<int>> grid) { // procedure
  foreach (col in range(0, 40)) {
    foreach (row in range(0, 30)) {
      grid[col][row] = blackOrWhite(random()); // set
    }
  }
}

static int blackOrWhite(double random) { // function
  var result = black;
  if (random > 0.5) {
    result = white; // set
  }
  return result;
}

static (int, int) north((int, int) cell) { // function
  final Int x = cell.item_0; // constant
  final Int y = cell.item_1; // constant
  final Int y2 = if(y == 0, 29, y - 1); // constant
  return (x, y2);
}

static (int, int) south((int, int) cell) { // function
  final Int x = cell.item_0; // constant
  final Int y = cell.item_1; // constant
  final Int y2 = if(y == 29, 0, y + 1); // constant
  return (x, y2);
}

static (int, int) east((int, int) cell) { // function
  final Int x = cell.item_0; // constant
  final Int y = cell.item_1; // constant
  final Int x2 = if(x == 39, 0, x + 1); // constant
  return (x2, y);
}

static (int, int) west((int, int) cell) { // function
  final Int x = cell.item_0; // constant
  final Int y = cell.item_1; // constant
  final Int x2 = if(x == 0, 39, x - 1); // constant
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
  var c = (x, y);
  return [northWest(c), north(c), northEast(c), west(c), east(c), southWest(c), south(c), southEast(c)];
}

static int liveNeighbours(List<List<int>> grid, int x, int y) { // function
  var count = 0;
  foreach (cell in neighbourCells(x, y)) {
    final Int cx = cell.item_0; // constant
    final Int cy = cell.item_1; // constant
    if (grid[cx][cy] == black) {
      count = count + 1; // set
    }
  }
  return count;
}

static bool willLive(int cell, int liveNeighbours) { // function
  var result = false;
  if (cell == black) {
    result = (liveNeighbours > 1) && (liveNeighbours < 4); // set
  } else {
    result = liveNeighbours == 3; // set
  }
  return result;
}

static int nextCellValue(List<List<int>> grid, int x, int y) { // function
  var colour = white;
  final Boolean live = willLive(grid[x][y], liveNeighbours(grid, x, y)); // constant
  if (live) {
    colour = black; // set
  }
  return colour;
}

static void nextGeneration(AsRef<List<List<int>>> gridRef) { // procedure
  var nextGen = createBlockGraphics(white);
  var grid = gridRef.value();
  foreach (x in range(0, 40)) {
    foreach (y in range(0, 30)) {
      final Int colour = nextCellValue(grid, x, y); // constant
      nextGen[x][y] = colour; // set
    }
  }
  gridRef.set(nextGen); // call
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
  assertEquals(black, blackOrWhite(0))
  assertEquals(black, blackOrWhite(0.499))
  assertEquals(black, blackOrWhite(0.5))
  assertEquals(white, blackOrWhite(0.501))
  assertEquals(white, blackOrWhite(1))
}

[ghosted] @Test static void test_neighbourCells() {
  assertEquals([(2, 3), 3, 3, 4, 3, 2, 4, 4, 4, 2, 5, 3, 5, 4, 5], neighbourCells(3, 4))
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
