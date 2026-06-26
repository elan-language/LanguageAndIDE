// Java with Elan 2.0.0-beta1

public class Global {

static void main() {
  var grid = createBlockGraphics(white);
  fillRandom(grid); // call procedure
  while (true) {
    displayBlocks(grid); // call procedure
    var gridRef = new AsRef<List<List<int>>>(grid);
    nextGeneration(gridRef); // call procedure
    grid = gridRef.value(); // reassign variable
    sleep_ms(50); // call procedure
  } // end while
} // end main

static void fillRandom(List<List<int>> grid) { // procedure
  foreach (var col in range(0, 40)) {
    foreach (var row in range(0, 30)) {
      grid[col][row] = blackOrWhite(random()); // reassign variable
    } // end foreach
  } // end foreach
} // end procedure

static void nextGeneration(AsRef<List<List<int>>> gridRef) { // procedure
  var nextGen = createBlockGraphics(white);
  var grid = gridRef.value();
  foreach (var x in range(0, 40)) {
    foreach (var y in range(0, 30)) {
      var colour = nextCellValue(grid, x, y);
      nextGen[x][y] = colour; // reassign variable
    } // end foreach
  } // end foreach
  gridRef.set(nextGen); // call procedure
} // end procedure

static int blackOrWhite(double random) { // function
  var result = black;
  if (random > 0.5) {
    result = white; // reassign variable
  } // end if
  return result;
} // end function

static (int, int) north((int, int) cell) { // function
  var x = cell.item_0;
  var y = cell.item_1;
  var y2 = y - 1;
  if (y2 == -1) {
    y2 = 29; // reassign variable
  } // end if
  return (x, y2);
} // end function

static (int, int) south((int, int) cell) { // function
  var x = cell.item_0;
  var y = cell.item_1;
  var y2 = y + 1;
  if (y2 == 30) {
    y2 = 0; // reassign variable
  } // end if
  return (x, y2);
} // end function

static (int, int) east((int, int) cell) { // function
  var x = cell.item_0;
  var y = cell.item_1;
  var x2 = x + 1;
  if (x2 == 40) {
    x2 = 0; // reassign variable
  } // end if
  return (x2, y);
} // end function

static (int, int) west((int, int) cell) { // function
  var x = cell.item_0;
  var y = cell.item_1;
  var x2 = x - 1;
  if (x2 == -1) {
    x2 = 39; // reassign variable
  } // end if
  return (x2, y);
} // end function

static (int, int) northEast((int, int) cell) { // function
  return north(east(cell));
} // end function

static (int, int) northWest((int, int) cell) { // function
  return north(west(cell));
} // end function

static (int, int) southEast((int, int) cell) { // function
  return south(east(cell));
} // end function

static (int, int) southWest((int, int) cell) { // function
  return south(west(cell));
} // end function

static List<(int, int)> neighbourCells(int x, int y) { // function
  var c = (x, y);
  return list(northWest(c), north(c), northEast(c), west(c), east(c), southWest(c), south(c), southEast(c));
} // end function

static int liveNeighbours(List<List<int>> grid, int x, int y) { // function
  var count = 0;
  foreach (var cell in neighbourCells(x, y)) {
    var cx = cell.item_0;
    var cy = cell.item_1;
    if (grid[cx][cy] == black) {
      count = count + 1; // reassign variable
    } // end if
  } // end foreach
  return count;
} // end function

static boolean willLive(int cell, int liveNeighbours) { // function
  var result = false;
  if (cell == black) {
    result = (liveNeighbours > 1) && (liveNeighbours < 4); // reassign variable
  } else {
    result = liveNeighbours == 3; // reassign variable
  } // end if
  return result;
} // end function

static int nextCellValue(List<List<int>> grid, int x, int y) { // function
  var colour = white;
  var live = willLive(grid[x][y], liveNeighbours(grid, x, y));
  if (live) {
    colour = black; // reassign variable
  } // end if
  return colour;
} // end function

class Test_north {
@Test static void test_north() {
  assertEquals((3, 3), north((3, 4)));
  assertEquals((39, 29), north((39, 0)));
  assertEquals((0, 28), north((0, 29)));
  assertEquals((39, 28), north((39, 29)));
}} // end test

class Test_south {
@Test static void test_south() {
  assertEquals((3, 5), south((3, 4)));
  assertEquals((39, 1), south((39, 0)));
  assertEquals((0, 0), south((0, 29)));
  assertEquals((39, 0), south((39, 29)));
}} // end test

class Test_east {
@Test static void test_east() {
  assertEquals((11, 2), east((10, 2)));
  assertEquals((0, 0), east((39, 0)));
  assertEquals((1, 1), east((0, 1)));
  assertEquals((0, 29), east((39, 29)));
}} // end test

class Test_west {
@Test static void test_west() {
  assertEquals((2, 4), west((3, 4)));
  assertEquals((38, 0), west((39, 0)));
  assertEquals((39, 0), west((0, 0)));
  assertEquals((39, 29), west((0, 29)));
}} // end test

class Test_northEast {
@Test static void test_northEast() {
  assertEquals((4, 3), northEast((3, 4)));
  assertEquals((1, 29), northEast((0, 0)));
  assertEquals((0, 29), northEast((39, 0)));
  assertEquals((1, 28), northEast((0, 29)));
  assertEquals((0, 28), northEast((39, 29)));
}} // end test

class Test_southEast {
@Test static void test_southEast() {
  assertEquals((4, 5), southEast((3, 4)));
  assertEquals((1, 1), southEast((0, 0)));
  assertEquals((0, 1), southEast((39, 0)));
  assertEquals((1, 0), southEast((0, 29)));
  assertEquals((0, 0), southEast((39, 29)));
}} // end test

class Test_northWest {
@Test static void test_northWest() {
  assertEquals((2, 3), northWest((3, 4)));
  assertEquals((39, 29), northWest((0, 0)));
  assertEquals((38, 29), northWest((39, 0)));
  assertEquals((39, 28), northWest((0, 29)));
  assertEquals((38, 28), northWest((39, 29)));
}} // end test

class Test_southWest {
@Test static void test_southWest() {
  assertEquals((2, 5), southWest((3, 4)));
  assertEquals((39, 1), southWest((0, 0)));
  assertEquals((38, 1), southWest((39, 0)));
  assertEquals((39, 0), southWest((0, 29)));
  assertEquals((38, 0), southWest((39, 29)));
}} // end test

class Test_blackOrWhite {
@Test static void test_blackOrWhite() {
  assertEquals(black, blackOrWhite(0));
  assertEquals(black, blackOrWhite(0.499));
  assertEquals(black, blackOrWhite(0.5));
  assertEquals(white, blackOrWhite(0.501));
  assertEquals(white, blackOrWhite(1));
}} // end test

class Test_neighbourCells {
@Test static void test_neighbourCells() {
  assertEquals(list((2, 3), (3, 3), (4, 3), (2, 4), (4, 4), (2, 5), (3, 5), (4, 5)), neighbourCells(3, 4));
}} // end test

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
} // end Global
