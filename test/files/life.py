# Python with Elan 2.0.0-alpha

def main(): None:
  grid = createBlockGraphics(white) # variable
  fillRandom(grid) # call
  while True:
    displayBlocks(grid) # call
    gridRef = AsRef[list[list[int]]](grid) # variable
    nextGeneration(gridRef) # call
    grid = gridRef.value() # set
    pause(50) # call

def fillRandom(grid: list[list[int]]) -> None: # procedure
  for col in range(0, 40):
    for row in range(0, 30):
      grid[col][row] = blackOrWhite(random()) # set

def blackOrWhite(random: float) -> int: # function
  result = black # variable
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
  c = (x, y) # variable
  return [northWest(c), north(c), northEast(c), west(c), east(c), southWest(c), south(c), southEast(c)]

def liveNeighbours(grid: list[list[int]], x: int, y: int) -> int: # function
  count = 0 # variable
  for cell in neighbourCells(x, y):
    cx = cell.item_0 # constant
    cy = cell.item_1 # constant
    if grid[cx][cy] == black:
      count = count + 1 # set
  return count

def willLive(cell: int, liveNeighbours: int) -> bool: # function
  result = False # variable
  if cell == black:
    result = (liveNeighbours > 1) and (liveNeighbours < 4) # set
  else:
    result = liveNeighbours == 3 # set
  return result

def nextCellValue(grid: list[list[int]], x: int, y: int) -> int: # function
  colour = white # variable
  live = willLive(grid[x][y], liveNeighbours(grid, x, y)) # constant
  if live:
    colour = black # set
  return colour

def nextGeneration(gridRef: AsRef[list[list[int]]]) -> None: # procedure
  nextGen = createBlockGraphics(white) # variable
  grid = gridRef.value() # variable
  for x in range(0, 40):
    for y in range(0, 30):
      colour = nextCellValue(grid, x, y) # constant
      nextGen[x][y] = colour # set
  gridRef.set(nextGen) # call

def  test_north()-> None:
  assert north((3, 4)) is (3, 3) 
  assert north((39, 0)) is (39, 29) 
  assert north((0, 29)) is (0, 28) 
  assert north((39, 29)) is (39, 28) 

def  test_south()-> None:
  assert south((3, 4)) is (3, 5) 
  assert south((39, 0)) is (39, 1) 
  assert south((0, 29)) is (0, 0) 
  assert south((39, 29)) is (39, 0) 

def  test_east()-> None:
  assert east((10, 2)) is (11, 2) 
  assert east((39, 0)) is (0, 0) 
  assert east((0, 1)) is (1, 1) 
  assert east((39, 29)) is (0, 29) 

def  test_west()-> None:
  assert west((3, 4)) is (2, 4) 
  assert west((39, 0)) is (38, 0) 
  assert west((0, 0)) is (39, 0) 
  assert west((0, 29)) is (39, 29) 

def  test_northEast()-> None:
  assert northEast((3, 4)) is (4, 3) 
  assert northEast((0, 0)) is (1, 29) 
  assert northEast((39, 0)) is (0, 29) 
  assert northEast((0, 29)) is (1, 28) 
  assert northEast((39, 29)) is (0, 28) 

def  test_southEast()-> None:
  assert southEast((3, 4)) is (4, 5) 
  assert southEast((0, 0)) is (1, 1) 
  assert southEast((39, 0)) is (0, 1) 
  assert southEast((0, 29)) is (1, 0) 
  assert southEast((39, 29)) is (0, 0) 

def  test_northWest()-> None:
  assert northWest((3, 4)) is (2, 3) 
  assert northWest((0, 0)) is (39, 29) 
  assert northWest((39, 0)) is (38, 29) 
  assert northWest((0, 29)) is (39, 28) 
  assert northWest((39, 29)) is (38, 28) 

def  test_southWest()-> None:
  assert southWest((3, 4)) is (2, 5) 
  assert southWest((0, 0)) is (39, 1) 
  assert southWest((39, 0)) is (38, 1) 
  assert southWest((0, 29)) is (39, 0) 
  assert southWest((39, 29)) is (38, 0) 

def  test_blackOrWhite()-> None:
  assert blackOrWhite(0) is black 
  assert blackOrWhite(0.499) is black 
  assert blackOrWhite(0.5) is black 
  assert blackOrWhite(0.501) is white 
  assert blackOrWhite(1) is white 

[ghosted] def  test_neighbourCells()-> None:
  assert neighbourCells(3, 4) is [(2, 3), 3, 3, 4, 3, 2, 4, 4, 4, 2, 5, 3, 5, 4, 5] 

def  test_willLive()-> None:
  assert willLive(white, 0) is False 
  assert willLive(white, 1) is False 
  assert willLive(white, 2) is False 
  assert willLive(white, 3) is True 
  assert willLive(white, 4) is False 
  assert willLive(white, 5) is False 
  assert willLive(white, 6) is False 
  assert willLive(white, 7) is False 
  assert willLive(white, 8) is False 
  assert willLive(black, 0) is False 
  assert willLive(black, 1) is False 
  assert willLive(black, 2) is True 
  assert willLive(black, 3) is True 
  assert willLive(black, 4) is False 
  assert willLive(black, 5) is False 
  assert willLive(black, 6) is False 
  assert willLive(black, 7) is False 
  assert willLive(black, 8) is False 
