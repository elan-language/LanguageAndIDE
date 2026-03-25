# Python with Elan 2.0.0-alpha1

def main(): None:
  grid = createBlockGraphics(white) # variable definition
  fillRandom(grid) # call procedure
  while True:
    displayBlocks(grid) # call procedure
    gridRef = AsRef[list[list[int]]](grid) # variable definition
    nextGeneration(gridRef) # call procedure
    grid = gridRef.value() # set
    sleep_ms(50) # call procedure

def fillRandom(grid: list[list[int]]) -> None: # procedure
  for col in range(0, 40):
    for row in range(0, 30):
      grid[col][row] = blackOrWhite(random()) # set

def blackOrWhite(random: float) -> int: # function
  result = black # variable definition
  if random > 0.5:
    result = white # set
  return result

def north(cell: tuple[int, int]) -> tuple[int, int]: # function
  x = cell.item_0 # constant
  y = cell.item_1 # constant
  y2 = if(y == 0, 29, y - 1) # constant
  return (x, y2)

def south(cell: tuple[int, int]) -> tuple[int, int]: # function
  x = cell.item_0 # constant
  y = cell.item_1 # constant
  y2 = if(y == 29, 0, y + 1) # constant
  return (x, y2)

def east(cell: tuple[int, int]) -> tuple[int, int]: # function
  x = cell.item_0 # constant
  y = cell.item_1 # constant
  x2 = if(x == 39, 0, x + 1) # constant
  return (x2, y)

def west(cell: tuple[int, int]) -> tuple[int, int]: # function
  x = cell.item_0 # constant
  y = cell.item_1 # constant
  x2 = if(x == 0, 39, x - 1) # constant
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
  c = (x, y) # variable definition
  return [northWest(c), north(c), northEast(c), west(c), east(c), southWest(c), south(c), southEast(c)]

def liveNeighbours(grid: list[list[int]], x: int, y: int) -> int: # function
  count = 0 # variable definition
  for cell in neighbourCells(x, y):
    cx = cell.item_0 # constant
    cy = cell.item_1 # constant
    if grid[cx][cy] == black:
      count = count + 1 # set
  return count

def willLive(cell: int, liveNeighbours: int) -> bool: # function
  result = False # variable definition
  if cell == black:
    result = (liveNeighbours > 1) and (liveNeighbours < 4) # set
  else:
    result = liveNeighbours == 3 # set
  return result

def nextCellValue(grid: list[list[int]], x: int, y: int) -> int: # function
  colour = white # variable definition
  live = willLive(grid[x][y], liveNeighbours(grid, x, y)) # constant
  if live:
    colour = black # set
  return colour

def nextGeneration(gridRef: AsRef[list[list[int]]]) -> None: # procedure
  nextGen = createBlockGraphics(white) # variable definition
  grid = gridRef.value() # variable definition
  for x in range(0, 40):
    for y in range(0, 30):
      colour = nextCellValue(grid, x, y) # constant
      nextGen[x][y] = colour # set
  gridRef.set(nextGen) # call procedure

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
  self.assertEqual(blackOrWhite(0), black)
  self.assertEqual(blackOrWhite(0.499), black)
  self.assertEqual(blackOrWhite(0.5), black)
  self.assertEqual(blackOrWhite(0.501), white)
  self.assertEqual(blackOrWhite(1), white)

[ghosted] def test_neighbourCells(self) -> None:
  self.assertEqual(neighbourCells(3, 4), [(2, 3), 3, 3, 4, 3, 2, 4, 4, 4, 2, 5, 3, 5, 4, 5])

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
