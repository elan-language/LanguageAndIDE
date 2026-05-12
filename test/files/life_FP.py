# Python with Elan 2.0.0-alpha1

def main() -> None:
  rng = Random() # variable definition
  rng.initialiseFromClock() # call procedure
  grid = initialGrid(rng) # variable definition
  while True:
    displayBlocks(grid) # call procedure
    grid = nextGrid(grid) # re-assign variable
    sleep_ms(50) # call procedure

def initialGrid(rng: Random) -> list[list[int]]: # function
  grid = list[list[int]]() # let
  cols = range(0, 40) # let
  return cols.reduce((grid, rng), appendCol).item_0

def appendCol(tup: tuple[list[list[int]], Random], c: int) -> tuple[list[list[int]], Random]: # function
  grid = tup.item_0 # let
  rng = tup.item_1 # let
  tup2 = initialCol(rng) # let
  col = tup2.item_0 # let
  rng2 = tup2.item_1 # let
  grid2 = grid.withAppend(col) # let
  return (grid2, rng2)

def initialCol(rng: Random) -> tuple[list[int], Random]: # function
  col = list[int]() # let
  rows = range(0, 30) # let
  return rows.reduce((col, rng), appendCell)

def appendCell(tup: tuple[list[int], Random], row: int) -> tuple[list[int], Random]: # function
  col = tup.item_0 # let
  rng = tup.item_1 # let
  return (col.withAppend(blackOrWhite(rng)), rng.nextGen())

def blackOrWhite(rng: Random) -> int: # function
  return if(rng.asFloat() > 0.5, white, black)

def north(cell: tuple[int, int]) -> tuple[int, int]: # function
  x = cell.item_0 # let
  y = cell.item_1 # let
  y2 = if(y == 0, 29, y - 1) # let
  return (x, y2)

def south(cell: tuple[int, int]) -> tuple[int, int]: # function
  x = cell.item_0 # let
  y = cell.item_1 # let
  y2 = if(y == 29, 0, y + 1) # let
  return (x, y2)

def east(cell: tuple[int, int]) -> tuple[int, int]: # function
  x = cell.item_0 # let
  y = cell.item_1 # let
  x2 = if(x == 39, 0, x + 1) # let
  return (x2, y)

def west(cell: tuple[int, int]) -> tuple[int, int]: # function
  x = cell.item_0 # let
  y = cell.item_1 # let
  x2 = if(x == 0, 39, x - 1) # let
  return (x2, y)

def northEast(cell: tuple[int, int]) -> tuple[int, int]: # function
  return north(east(cell))

def northWest(cell: tuple[int, int]) -> tuple[int, int]: # function
  return north(west(cell))

def southEast(cell: tuple[int, int]) -> tuple[int, int]: # function
  return south(east(cell))

def southWest(cell: tuple[int, int]) -> tuple[int, int]: # function
  return south(west(cell))

def neighbourCells(x: int, y: int) -> list[tuple[int, int]]: # function
  c = (x, y) # let
  return [northWest(c), north(c), northEast(c), west(c), east(c), southWest(c), south(c), southEast(c)]

def liveNeighbours(grid: list[list[int]], x: int, y: int) -> int: # function
  neighbours = neighbourCells(x, y) # let
  return neighbours.filter(lambda c: tuple[int, int] => grid[c.item_0][c.item_1] == black).length()

def willLive(cell: int, liveNeighbours: int) -> bool: # function
  return if(cell == black, (liveNeighbours > 1) and (liveNeighbours < 4), liveNeighbours == 3)

def nextCellValue(grid: list[list[int]], x: int, y: int) -> int: # function
  live = willLive(grid[x][y], liveNeighbours(grid, x, y)) # let
  return if(live, black, white)

def nextGrid(grid: list[list[int]]) -> list[list[int]]: # function
  cols = range(0, 40) # let
  return cols.map(lambda x: int => nextColumn(grid, x))

def nextColumn(grid: list[list[int]], x: int) -> list[int]: # function
  col = grid[x] # let
  rows = range(0, 30) # let
  return rows.map(lambda y: int => nextCellValue(grid, x, y))

def test_north(self) -> None:
  self.assertEqual(north((3, 4)), (3, 3))
  self.assertEqual(north((39, 0)), (39, 29))
  self.assertEqual(north((0, 29)), (0, 28))
  self.assertEqual(north((39, 29)), (39, 28))

def test_south(self) -> None:
  self.assertEqual(south((3, 4)), (3, 5))
  self.assertEqual(south((39, 0)), (39, 1))
  self.assertEqual(south((0, 29)), (0, 0))
  self.assertEqual(south((39, 29)), (39, 0))

def test_east(self) -> None:
  self.assertEqual(east((10, 2)), (11, 2))
  self.assertEqual(east((39, 0)), (0, 0))
  self.assertEqual(east((0, 1)), (1, 1))
  self.assertEqual(east((39, 29)), (0, 29))

def test_west(self) -> None:
  self.assertEqual(west((3, 4)), (2, 4))
  self.assertEqual(west((39, 0)), (38, 0))
  self.assertEqual(west((0, 0)), (39, 0))
  self.assertEqual(west((0, 29)), (39, 29))

def test_northEast(self) -> None:
  self.assertEqual(northEast((3, 4)), (4, 3))
  self.assertEqual(northEast((0, 0)), (1, 29))
  self.assertEqual(northEast((39, 0)), (0, 29))
  self.assertEqual(northEast((0, 29)), (1, 28))
  self.assertEqual(northEast((39, 29)), (0, 28))

def test_southEast(self) -> None:
  self.assertEqual(southEast((3, 4)), (4, 5))
  self.assertEqual(southEast((0, 0)), (1, 1))
  self.assertEqual(southEast((39, 0)), (0, 1))
  self.assertEqual(southEast((0, 29)), (1, 0))
  self.assertEqual(southEast((39, 29)), (0, 0))

def test_northWest(self) -> None:
  self.assertEqual(northWest((3, 4)), (2, 3))
  self.assertEqual(northWest((0, 0)), (39, 29))
  self.assertEqual(northWest((39, 0)), (38, 29))
  self.assertEqual(northWest((0, 29)), (39, 28))
  self.assertEqual(northWest((39, 29)), (38, 28))

def test_southWest(self) -> None:
  self.assertEqual(southWest((3, 4)), (2, 5))
  self.assertEqual(southWest((0, 0)), (39, 1))
  self.assertEqual(southWest((39, 0)), (38, 1))
  self.assertEqual(southWest((0, 29)), (39, 0))
  self.assertEqual(southWest((39, 29)), (38, 0))

def test_blackOrWhite(self) -> None:
  rng0 = Random() # let
  rng1 = rng0.nextGen() # let
  rng2 = rng1.nextGen() # let
  rng3 = rng2.nextGen() # let
  self.assertEqual(blackOrWhite(rng0), black)
  self.assertEqual(blackOrWhite(rng1), white)
  self.assertEqual(blackOrWhite(rng2), black)
  self.assertEqual(blackOrWhite(rng3), black)

def test_neighbourCells(self) -> None:
  self.assertEqual(neighbourCells(3, 4), [(2, 3), (3, 3), (4, 3), (2, 4), (4, 4), (2, 5), (3, 5), (4, 5)])
  self.assertEqual(neighbourCells(0, 0), [(39, 29), (0, 29), (1, 29), (39, 0), (1, 0), (39, 1), (0, 1), (1, 1)])
  self.assertEqual(neighbourCells(39, 29), [(38, 28), (39, 28), (0, 28), (38, 29), (0, 29), (38, 0), (39, 0), (0, 0)])

def test_willLive(self) -> None:
  self.assertEqual(willLive(white, 0), False)
  self.assertEqual(willLive(white, 1), False)
  self.assertEqual(willLive(white, 2), False)
  self.assertEqual(willLive(white, 3), True)
  self.assertEqual(willLive(white, 4), False)
  self.assertEqual(willLive(white, 5), False)
  self.assertEqual(willLive(white, 6), False)
  self.assertEqual(willLive(white, 7), False)
  self.assertEqual(willLive(white, 8), False)
  self.assertEqual(willLive(black, 0), False)
  self.assertEqual(willLive(black, 1), False)
  self.assertEqual(willLive(black, 2), True)
  self.assertEqual(willLive(black, 3), True)
  self.assertEqual(willLive(black, 4), False)
  self.assertEqual(willLive(black, 5), False)
  self.assertEqual(willLive(black, 6), False)
  self.assertEqual(willLive(black, 7), False)
  self.assertEqual(willLive(black, 8), False)

def testGrid() -> list[list[int]]: # function
  return initialGrid(Random())

def test_initialGrid(self) -> None:
  grid = testGrid() # let
  self.assertEqual(grid[0][0], black)
  self.assertEqual(grid[1][0], white)
  self.assertEqual(grid[2][0], white)
  self.assertEqual(grid[0][1], white)
  self.assertEqual(grid[1][1], black)
  self.assertEqual(grid[2][1], white)
  self.assertEqual(grid[0][2], black)
  self.assertEqual(grid[1][2], black)
  self.assertEqual(grid[2][2], black)

def test_liveNeighbours(self) -> None:
  grid = testGrid() # let
  live = liveNeighbours(grid, 1, 1) # let
  self.assertEqual(live, 4)

def test_nextCellValue(self) -> None:
  grid = testGrid() # let
  nxt = nextCellValue(grid, 1, 1) # let
  self.assertEqual(nxt, white)

def test_nextGrid(self) -> None:
  prev = testGrid() # let
  grid = nextGrid(prev) # let
  self.assertEqual(grid[0][0], black)
  self.assertEqual(grid[1][0], black)
  self.assertEqual(grid[2][0], white)
  self.assertEqual(grid[0][1], white)
  self.assertEqual(grid[1][1], white)
  self.assertEqual(grid[2][1], white)
  self.assertEqual(grid[0][2], white)
  self.assertEqual(grid[1][2], white)
  self.assertEqual(grid[2][2], white)

main()
