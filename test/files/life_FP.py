# Python with Elan 2.0.0-beta4

def main() -> None:
  rng = Random() # variable definition
  rng.initialiseFromClock() # procedure call
  grid = initialGrid(rng) # variable definition
  while True:
    displayBlocks(grid) # procedure call
    grid = nextGeneration(grid) # assignment
    sleep_ms(50) # procedure call
  # end while
# end main

def initialGrid(rng: Random) -> list[list[int]]: # function
  grid = list[list[int]]() # variable definition
  cols = range(0, 40) # variable definition
  return cols.reduce((grid, rng), appendCol).item_0
# end function

class Test_initialGrid(unittest.TestCase):
 def test_initialGrid(self) -> None:
  grid = initialGrid(Random()) # variable definition
  self.assertEqual(grid[0][0], black)
  self.assertEqual(grid[1][0], white)
  self.assertEqual(grid[2][0], white)
  self.assertEqual(grid[0][1], white)
  self.assertEqual(grid[1][1], black)
  self.assertEqual(grid[2][1], white)
  self.assertEqual(grid[0][2], black)
  self.assertEqual(grid[1][2], black)
  self.assertEqual(grid[2][2], black)
# end test

def appendCol(tup: tuple[list[list[int]], Random], c: int) -> tuple[list[list[int]], Random]: # function
  # 'c' is not used, but is needed for compatibility with function signature for 'reduce'
  grid = tup.item_0 # variable definition
  rng = tup.item_1 # variable definition
  tup2 = initialCol(rng) # variable definition
  col = tup2.item_0 # variable definition
  rng2 = tup2.item_1 # variable definition
  grid2 = grid.withAppend(col) # variable definition
  return (grid2, rng2)
# end function

class Test_appendCol(unittest.TestCase):
 def test_appendCol(self) -> None:
  emptyGrid = list[list[int]]() # variable definition
  rng = Random() # variable definition
  result = appendCol((emptyGrid, rng), 0) # variable definition
  grid1 = result.item_0 # variable definition
  col = grid1[0] # variable definition
  self.assertEqual(col[0], black)
  self.assertEqual(col[1], white)
  self.assertEqual(col[2], black)
  self.assertEqual(col[29], black)
  rng2 = result.item_1 # variable definition
  result2 = appendCol((grid1, rng2), 1) # variable definition
  grid2 = result2.item_0 # variable definition
  col2 = grid2[1] # variable definition
  self.assertEqual(col2[0], white)
  self.assertEqual(col2[1], black)
  self.assertEqual(col2[2], black)
  self.assertEqual(col2[29], white)
# end test

def initialCol(rng: Random) -> tuple[list[int], Random]: # function
  col = list[int]() # variable definition
  rows = range(0, 30) # variable definition
  return rows.reduce((col, rng), appendCell)
# end function

class Test_initialCol(unittest.TestCase):
 def test_initialCol(self) -> None:
  rng = Random() # variable definition
  result = initialCol(rng) # variable definition
  col = result.item_0 # variable definition
  self.assertEqual(col[0], black)
  self.assertEqual(col[1], white)
  self.assertEqual(col[2], black)
  self.assertEqual(col[29], black)
  rng2 = result.item_1 # variable definition
  col2 = initialCol(rng2).item_0 # variable definition
  self.assertEqual(col2[0], white)
  self.assertEqual(col2[1], black)
  self.assertEqual(col2[2], black)
  self.assertEqual(col2[29], white)
# end test

def appendCell(tup: tuple[list[int], Random], row: int) -> tuple[list[int], Random]: # function
  col = tup.item_0 # variable definition
  rng = tup.item_1 # variable definition
  return (col.withAppend(blackOrWhite(rng)), rng.nextGen())
# end function

class Test_appendCell(unittest.TestCase):
 def test_appendCell(self) -> None:
  rng = Random() # variable definition
  emptyList = list[int]() # variable definition
  result = appendCell((emptyList, rng), 0) # variable definition
  col = result.item_0 # variable definition
  self.assertEqual(col.length(), 1)
  self.assertEqual(col[0], black)
  rng2 = result.item_1 # variable definition
  result2 = appendCell((col, rng2), 1) # variable definition
  col2 = result2.item_0 # variable definition
  self.assertEqual(col2.length(), 2)
  self.assertEqual(col2[1], white)
# end test

def blackOrWhite(rng: Random) -> int: # function
  return if_(rng.asFloat() > 0.5, white, black)
# end function

class Test_blackOrWhite(unittest.TestCase):
 def test_blackOrWhite(self) -> None:
  rng0 = Random() # variable definition
  rng1 = rng0.nextGen() # variable definition
  rng2 = rng1.nextGen() # variable definition
  rng3 = rng2.nextGen() # variable definition
  self.assertEqual(blackOrWhite(rng0), black)
  self.assertEqual(blackOrWhite(rng1), white)
  self.assertEqual(blackOrWhite(rng2), black)
  self.assertEqual(blackOrWhite(rng3), black)
# end test

def north(cell: tuple[int, int]) -> tuple[int, int]: # function
  x = cell.item_0 # variable definition
  y = cell.item_1 # variable definition
  y2 = if_(y == 0, 29, y - 1) # variable definition
  return (x, y2)
# end function

class Test_north(unittest.TestCase):
 def test_north(self) -> None:
  self.assertEqual(north((3, 4)), (3, 3))
  self.assertEqual(north((39, 0)), (39, 29))
  self.assertEqual(north((0, 29)), (0, 28))
  self.assertEqual(north((39, 29)), (39, 28))
# end test

def south(cell: tuple[int, int]) -> tuple[int, int]: # function
  x = cell.item_0 # variable definition
  y = cell.item_1 # variable definition
  y2 = if_(y == 29, 0, y + 1) # variable definition
  return (x, y2)
# end function

class Test_south(unittest.TestCase):
 def test_south(self) -> None:
  self.assertEqual(south((3, 4)), (3, 5))
  self.assertEqual(south((39, 0)), (39, 1))
  self.assertEqual(south((0, 29)), (0, 0))
  self.assertEqual(south((39, 29)), (39, 0))
# end test

def east(cell: tuple[int, int]) -> tuple[int, int]: # function
  x = cell.item_0 # variable definition
  y = cell.item_1 # variable definition
  x2 = if_(x == 39, 0, x + 1) # variable definition
  return (x2, y)
# end function

class Test_east(unittest.TestCase):
 def test_east(self) -> None:
  self.assertEqual(east((10, 2)), (11, 2))
  self.assertEqual(east((39, 0)), (0, 0))
  self.assertEqual(east((0, 1)), (1, 1))
  self.assertEqual(east((39, 29)), (0, 29))
# end test

def west(cell: tuple[int, int]) -> tuple[int, int]: # function
  x = cell.item_0 # variable definition
  y = cell.item_1 # variable definition
  x2 = if_(x == 0, 39, x - 1) # variable definition
  return (x2, y)
# end function

class Test_west(unittest.TestCase):
 def test_west(self) -> None:
  self.assertEqual(west((3, 4)), (2, 4))
  self.assertEqual(west((39, 0)), (38, 0))
  self.assertEqual(west((0, 0)), (39, 0))
  self.assertEqual(west((0, 29)), (39, 29))
# end test

def northEast(cell: tuple[int, int]) -> tuple[int, int]: # function
  return north(east(cell))
# end function

class Test_northEast(unittest.TestCase):
 def test_northEast(self) -> None:
  self.assertEqual(northEast((3, 4)), (4, 3))
  self.assertEqual(northEast((0, 0)), (1, 29))
  self.assertEqual(northEast((39, 0)), (0, 29))
  self.assertEqual(northEast((0, 29)), (1, 28))
  self.assertEqual(northEast((39, 29)), (0, 28))
# end test

def northWest(cell: tuple[int, int]) -> tuple[int, int]: # function
  return north(west(cell))
# end function

class Test_northWest(unittest.TestCase):
 def test_northWest(self) -> None:
  self.assertEqual(northWest((3, 4)), (2, 3))
  self.assertEqual(northWest((0, 0)), (39, 29))
  self.assertEqual(northWest((39, 0)), (38, 29))
  self.assertEqual(northWest((0, 29)), (39, 28))
  self.assertEqual(northWest((39, 29)), (38, 28))
# end test

class Test_southEast(unittest.TestCase):
 def test_southEast(self) -> None:
  self.assertEqual(southEast((3, 4)), (4, 5))
  self.assertEqual(southEast((0, 0)), (1, 1))
  self.assertEqual(southEast((39, 0)), (0, 1))
  self.assertEqual(southEast((0, 29)), (1, 0))
  self.assertEqual(southEast((39, 29)), (0, 0))
# end test

def southEast(cell: tuple[int, int]) -> tuple[int, int]: # function
  return south(east(cell))
# end function

def southWest(cell: tuple[int, int]) -> tuple[int, int]: # function
  return south(west(cell))
# end function

class Test_southWest(unittest.TestCase):
 def test_southWest(self) -> None:
  self.assertEqual(southWest((3, 4)), (2, 5))
  self.assertEqual(southWest((0, 0)), (39, 1))
  self.assertEqual(southWest((39, 0)), (38, 1))
  self.assertEqual(southWest((0, 29)), (39, 0))
  self.assertEqual(southWest((39, 29)), (38, 0))
# end test

def neighbourCells(x: int, y: int) -> list[tuple[int, int]]: # function
  c = (x, y) # variable definition
  return [northWest(c), north(c), northEast(c), west(c), east(c), southWest(c), south(c), southEast(c)]
# end function

class Test_neighbourCells(unittest.TestCase):
 def test_neighbourCells(self) -> None:
  self.assertEqual(neighbourCells(3, 4), [(2, 3), (3, 3), (4, 3), (2, 4), (4, 4), (2, 5), (3, 5), (4, 5)])
  self.assertEqual(neighbourCells(0, 0), [(39, 29), (0, 29), (1, 29), (39, 0), (1, 0), (39, 1), (0, 1), (1, 1)])
  self.assertEqual(neighbourCells(39, 29), [(38, 28), (39, 28), (0, 28), (38, 29), (0, 29), (38, 0), (39, 0), (0, 0)])
# end test

def liveNeighbours(grid: list[list[int]], x: int, y: int) -> int: # function
  neighbours = neighbourCells(x, y) # variable definition
  return neighbours.filter(lambda c: tuple[int, int]: grid[c.item_0][c.item_1] == black).length()
# end function

class Test_liveNeighbours(unittest.TestCase):
 def test_liveNeighbours(self) -> None:
  grid = initialGrid(Random()) # variable definition
  live = liveNeighbours(grid, 1, 1) # variable definition
  self.assertEqual(live, 4)
# end test

def willLive(cell: int, liveNeighbours: int) -> bool: # function
  return ((cell == black) and (liveNeighbours > 1) and (liveNeighbours < 4)) or ((cell == white) and (liveNeighbours == 3))
# end function

class Test_willLive(unittest.TestCase):
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
# end test

def nextCellValue(grid: list[list[int]], x: int, y: int) -> int: # function
  live = willLive(grid[x][y], liveNeighbours(grid, x, y)) # variable definition
  return if_(live, black, white)
# end function

class Test_nextCellValue(unittest.TestCase):
 def test_nextCellValue(self) -> None:
  grid = initialGrid(Random()) # variable definition
  nxt = nextCellValue(grid, 1, 1) # variable definition
  self.assertEqual(nxt, white)
# end test

def nextGeneration(grid: list[list[int]]) -> list[list[int]]: # function
  cols = range(0, 40) # variable definition
  return cols.map(lambda x: int: nextCol(grid, x))
# end function

def nextCol(grid: list[list[int]], x: int) -> list[int]: # function
  col = grid[x] # variable definition
  rows = range(0, 30) # variable definition
  return rows.map(lambda y: int: nextCellValue(grid, x, y))
# end function

class Test_nextCol(unittest.TestCase):
 def test_nextCol(self) -> None:
  grid = initialGrid(Random()) # variable definition
  col = nextCol(grid, 3) # variable definition
  self.assertEqual(col[0], black)
  self.assertEqual(col[1], black)
  self.assertEqual(col[2], white)
  self.assertEqual(col[29], black)
# end test

main()
