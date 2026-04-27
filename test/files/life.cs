// C# with Elan 2.0.0-alpha1

static void main() {
  var grid = createBlockGraphics(white);
  fillRandom(grid); // call procedure
  while (true) {
    displayBlocks(grid); // call procedure
    var gridRef = new AsRef<List<List<int>>>(grid);
    nextGeneration(gridRef); // call procedure
    grid = gridRef.value(); // change variable
    sleep_ms(50); // call procedure
  }
}

static void fillRandom(List<List<int>> grid) { // procedure
  foreach (col in range(0, 40)) {
    foreach (row in range(0, 30)) {
      grid[col][row] = blackOrWhite(random()); // change variable
    }
  }
}

static int blackOrWhite(double random) { // function
  var result = black;
  if (random > 0.5) {
    result = white; // change variable
  }
  return result;
}

static (int, int) north((int, int) cell) { // function
  var x = cell.item_0;
  var y = cell.item_1;
  var y2 = if(y == 0, 29, y - 1);
  return (x, y2);
}

static (int, int) south((int, int) cell) { // function
  var x = cell.item_0;
  var y = cell.item_1;
  var y2 = if(y == 29, 0, y + 1);
  return (x, y2);
}

static (int, int) east((int, int) cell) { // function
  var x = cell.item_0;
  var y = cell.item_1;
  var x2 = if(x == 39, 0, x + 1);
  return (x2, y);
}

static (int, int) west((int, int) cell) { // function
  var x = cell.item_0;
  var y = cell.item_1;
  var x2 = if(x == 0, 39, x - 1);
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
    var cx = cell.item_0;
    var cy = cell.item_1;
    if (grid[cx][cy] == black) {
      count = count + 1; // change variable
    }
  }
  return count;
}

static bool willLive(int cell, int liveNeighbours) { // function
  var result = false;
  if (cell == black) {
    result = (liveNeighbours > 1) && (liveNeighbours < 4); // change variable
  } else {
    result = liveNeighbours == 3; // change variable
  }
  return result;
}

static int nextCellValue(List<List<int>> grid, int x, int y) { // function
  var colour = white;
  var live = willLive(grid[x][y], liveNeighbours(grid, x, y));
  if (live) {
    colour = black; // change variable
  }
  return colour;
}

static void nextGeneration(AsRef<List<List<int>>> gridRef) { // procedure
  var nextGen = createBlockGraphics(white);
  var grid = gridRef.value();
  foreach (x in range(0, 40)) {
    foreach (y in range(0, 30)) {
      var colour = nextCellValue(grid, x, y);
      nextGen[x][y] = colour; // change variable
    }
  }
  gridRef.set(nextGen); // call procedure
}

[TestMethod] static void test_north() {
  Assert.AreEqual((3, 3), north((3, 4)))
  Assert.AreEqual((39, 29), north((39, 0)))
  Assert.AreEqual((0, 28), north((0, 29)))
  Assert.AreEqual((39, 28), north((39, 29)))
}

[TestMethod] static void test_south() {
  Assert.AreEqual((3, 5), south((3, 4)))
  Assert.AreEqual((39, 1), south((39, 0)))
  Assert.AreEqual((0, 0), south((0, 29)))
  Assert.AreEqual((39, 0), south((39, 29)))
}

[TestMethod] static void test_east() {
  Assert.AreEqual((11, 2), east((10, 2)))
  Assert.AreEqual((0, 0), east((39, 0)))
  Assert.AreEqual((1, 1), east((0, 1)))
  Assert.AreEqual((0, 29), east((39, 29)))
}

[TestMethod] static void test_west() {
  Assert.AreEqual((2, 4), west((3, 4)))
  Assert.AreEqual((38, 0), west((39, 0)))
  Assert.AreEqual((39, 0), west((0, 0)))
  Assert.AreEqual((39, 29), west((0, 29)))
}

[TestMethod] static void test_northEast() {
  Assert.AreEqual((4, 3), northEast((3, 4)))
  Assert.AreEqual((1, 29), northEast((0, 0)))
  Assert.AreEqual((0, 29), northEast((39, 0)))
  Assert.AreEqual((1, 28), northEast((0, 29)))
  Assert.AreEqual((0, 28), northEast((39, 29)))
}

[TestMethod] static void test_southEast() {
  Assert.AreEqual((4, 5), southEast((3, 4)))
  Assert.AreEqual((1, 1), southEast((0, 0)))
  Assert.AreEqual((0, 1), southEast((39, 0)))
  Assert.AreEqual((1, 0), southEast((0, 29)))
  Assert.AreEqual((0, 0), southEast((39, 29)))
}

[TestMethod] static void test_northWest() {
  Assert.AreEqual((2, 3), northWest((3, 4)))
  Assert.AreEqual((39, 29), northWest((0, 0)))
  Assert.AreEqual((38, 29), northWest((39, 0)))
  Assert.AreEqual((39, 28), northWest((0, 29)))
  Assert.AreEqual((38, 28), northWest((39, 29)))
}

[TestMethod] static void test_southWest() {
  Assert.AreEqual((2, 5), southWest((3, 4)))
  Assert.AreEqual((39, 1), southWest((0, 0)))
  Assert.AreEqual((38, 1), southWest((39, 0)))
  Assert.AreEqual((39, 0), southWest((0, 29)))
  Assert.AreEqual((38, 0), southWest((39, 29)))
}

[TestMethod] static void test_blackOrWhite() {
  Assert.AreEqual(black, blackOrWhite(0))
  Assert.AreEqual(black, blackOrWhite(0.499))
  Assert.AreEqual(black, blackOrWhite(0.5))
  Assert.AreEqual(white, blackOrWhite(0.501))
  Assert.AreEqual(white, blackOrWhite(1))
}

[ghosted] [TestMethod] static void test_neighbourCells() {
  Assert.AreEqual([(2, 3), 3, 3, 4, 3, 2, 4, 4, 4, 2, 5, 3, 5, 4, 5], neighbourCells(3, 4))
}

[TestMethod] static void test_willLive() {
  Assert.AreEqual(false, willLive(white, 0))
  Assert.AreEqual(false, willLive(white, 1))
  Assert.AreEqual(false, willLive(white, 2))
  Assert.AreEqual(true, willLive(white, 3))
  Assert.AreEqual(false, willLive(white, 4))
  Assert.AreEqual(false, willLive(white, 5))
  Assert.AreEqual(false, willLive(white, 6))
  Assert.AreEqual(false, willLive(white, 7))
  Assert.AreEqual(false, willLive(white, 8))
  Assert.AreEqual(false, willLive(black, 0))
  Assert.AreEqual(false, willLive(black, 1))
  Assert.AreEqual(true, willLive(black, 2))
  Assert.AreEqual(true, willLive(black, 3))
  Assert.AreEqual(false, willLive(black, 4))
  Assert.AreEqual(false, willLive(black, 5))
  Assert.AreEqual(false, willLive(black, 6))
  Assert.AreEqual(false, willLive(black, 7))
  Assert.AreEqual(false, willLive(black, 8))
}
