// Java with Elan 2.0.0-alpha

static void main() {
  var grid = createBlockGraphics(white);
  fillRandom(grid); // call
  while (true) {
    displayBlocks(grid); // call
    var gridRef = new AsRef<List<List<int>>>(grid);
    nextGeneration(gridRef); // call
    grid = gridRef.value(); // set
    pause(50); // call
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

static void test_north() {
  assert north((3, 4)) is (3, 3) 
  assert north((39, 0)) is (39, 29) 
  assert north((0, 29)) is (0, 28) 
  assert north((39, 29)) is (39, 28) 
}

static void test_south() {
  assert south((3, 4)) is (3, 5) 
  assert south((39, 0)) is (39, 1) 
  assert south((0, 29)) is (0, 0) 
  assert south((39, 29)) is (39, 0) 
}

static void test_east() {
  assert east((10, 2)) is (11, 2) 
  assert east((39, 0)) is (0, 0) 
  assert east((0, 1)) is (1, 1) 
  assert east((39, 29)) is (0, 29) 
}

static void test_west() {
  assert west((3, 4)) is (2, 4) 
  assert west((39, 0)) is (38, 0) 
  assert west((0, 0)) is (39, 0) 
  assert west((0, 29)) is (39, 29) 
}

static void test_northEast() {
  assert northEast((3, 4)) is (4, 3) 
  assert northEast((0, 0)) is (1, 29) 
  assert northEast((39, 0)) is (0, 29) 
  assert northEast((0, 29)) is (1, 28) 
  assert northEast((39, 29)) is (0, 28) 
}

static void test_southEast() {
  assert southEast((3, 4)) is (4, 5) 
  assert southEast((0, 0)) is (1, 1) 
  assert southEast((39, 0)) is (0, 1) 
  assert southEast((0, 29)) is (1, 0) 
  assert southEast((39, 29)) is (0, 0) 
}

static void test_northWest() {
  assert northWest((3, 4)) is (2, 3) 
  assert northWest((0, 0)) is (39, 29) 
  assert northWest((39, 0)) is (38, 29) 
  assert northWest((0, 29)) is (39, 28) 
  assert northWest((39, 29)) is (38, 28) 
}

static void test_southWest() {
  assert southWest((3, 4)) is (2, 5) 
  assert southWest((0, 0)) is (39, 1) 
  assert southWest((39, 0)) is (38, 1) 
  assert southWest((0, 29)) is (39, 0) 
  assert southWest((39, 29)) is (38, 0) 
}

static void test_blackOrWhite() {
  assert blackOrWhite(0) is black 
  assert blackOrWhite(0.499) is black 
  assert blackOrWhite(0.5) is black 
  assert blackOrWhite(0.501) is white 
  assert blackOrWhite(1) is white 
}

[ghosted] static void test_neighbourCells() {
  assert neighbourCells(3, 4) is [(2, 3), 3, 3, 4, 3, 2, 4, 4, 4, 2, 5, 3, 5, 4, 5] 
}

static void test_willLive() {
  assert willLive(white, 0) is false 
  assert willLive(white, 1) is false 
  assert willLive(white, 2) is false 
  assert willLive(white, 3) is true 
  assert willLive(white, 4) is false 
  assert willLive(white, 5) is false 
  assert willLive(white, 6) is false 
  assert willLive(white, 7) is false 
  assert willLive(white, 8) is false 
  assert willLive(black, 0) is false 
  assert willLive(black, 1) is false 
  assert willLive(black, 2) is true 
  assert willLive(black, 3) is true 
  assert willLive(black, 4) is false 
  assert willLive(black, 5) is false 
  assert willLive(black, 6) is false 
  assert willLive(black, 7) is false 
  assert willLive(black, 8) is false 
}
