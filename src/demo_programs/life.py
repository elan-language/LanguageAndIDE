# e2a814ba8102d2d35259ebe402fc00953909c007588f3edef153b8f3ec738f1d Elan 1.9.0 guest default_profile valid

def main -> None:  # [main]
  grid = new Array2D<of Int>(40, 30, white) # [variable definition]
  fillRandom(grid) # [call procedure]}
  while true
    displayBlocks(grid) # [call procedure]}
    nextGeneration(grid) # [call procedure]}
    pause(50) # [call procedure]}


def fillRandom(grid: Array2D<of Int>) -> None:  # [procedure]
  for col in range(0, 39, 1):  # [for loop]
    for row in range(0, 29, 1):  # [for loop]
      grid.put(col, row, blackOrWhite(random())) # [call procedure]}


def blackOrWhite(random: Float) -> Int:  # [function]
  result = black # [variable definition]
  if random > 0.5 then
    result = white # [assign variable]
  return result


def north(cell: (Int, Int)) -> (Int, Int):  # [function]
  x, y = cell # [variable definition]
  if y is 0 then
    y = 29 # [assign variable]
  else
    y = y - 1 # [assign variable]
  return tuple(x, y)


def south(cell: (Int, Int)) -> (Int, Int):  # [function]
  x, y = cell # [variable definition]
  y2 = if y is 29 then 0 else y + 1 # [variable definition]
  return tuple(x, y2)


def east(cell: (Int, Int)) -> (Int, Int):  # [function]
  x, y = cell # [variable definition]
  x2 = if x is 39 then 0 else x + 1 # [variable definition]
  return tuple(x2, y)


def west(cell: (Int, Int)) -> (Int, Int):  # [function]
  x, y = cell # [variable definition]
  x2 = if x is 0 then 39 else x - 1 # [variable definition]
  return tuple(x2, y)


def northEast(cell: (Int, Int)) -> (Int, Int):  # [function]
  return north(east(cell))


def northWest(cell: (Int, Int)) -> (Int, Int):  # [function]
  return north(west(cell))


def southEast(cell: (Int, Int)) -> (Int, Int):  # [function]
  return south(east(cell))


def southWest(cell: (Int, Int)) -> (Int, Int):  # [function]
  return south(west(cell))


def neighbourCells(x: Int, y: Int) -> List<of (Int, Int)>:  # [function]
  c = tuple(x, y) # [variable definition]
  return [northWest(c), north(c), northEast(c), west(c), east(c), southWest(c), south(c), southEast(c)]


def liveNeighbours(grid: Array2D<of Int>, x: Int, y: Int) -> Int:  # [function]
  count = 0 # [variable definition]
  for cell in neighbourCells(x, y):  # [each loop]
    cx, cy = cell # [variable definition]
    if grid[cx, cy] is black then
      count = count + 1 # [assign variable]
  return count


def willLive(cell: Int, liveNeighbours: Int) -> Boolean:  # [function]
  result = false # [variable definition]
  if cell is black then
    result = (liveNeighbours > 1) and (liveNeighbours < 4) # [assign variable]
  else
    result = liveNeighbours is 3 # [assign variable]
  return result


def nextCellValue(grid: Array2D<of Int>, x: Int, y: Int) -> Int:  # [function]
  colour = white # [variable definition]
  live = willLive(grid[x, y], liveNeighbours(grid, x, y)) # [variable definition]
  if live then
    colour = black # [assign variable]
  return colour


def nextGeneration(grid: Array2D<of Int>) -> None:  # [procedure]
  next = new Array2D<of Int>(40, 30, white) # [variable definition]
  for x in range(0, 39, 1):  # [for loop]
    for y in range(0, 29, 1):  # [for loop]
      colour = nextCellValue(grid, x, y) # [variable definition]
      next.put(x, y, colour) # [call procedure]}
  grid = next # [assign variable]


def test_north() -> None:  # [test]
  assertEqual(north(tuple(3, 4)), tuple(3, 3))  # [assert]
  assertEqual(north(tuple(39, 0)), tuple(39, 29))  # [assert]
  assertEqual(north(tuple(0, 29)), tuple(0, 28))  # [assert]
  assertEqual(north(tuple(39, 29)), tuple(39, 28))  # [assert]


def test_south() -> None:  # [test]
  assertEqual(south(tuple(3, 4)), tuple(3, 5))  # [assert]
  assertEqual(south(tuple(39, 0)), tuple(39, 1))  # [assert]
  assertEqual(south(tuple(0, 29)), tuple(0, 0))  # [assert]
  assertEqual(south(tuple(39, 29)), tuple(39, 0))  # [assert]


def test_east() -> None:  # [test]
  assertEqual(east(tuple(10, 2)), tuple(11, 2))  # [assert]
  assertEqual(east(tuple(39, 0)), tuple(0, 0))  # [assert]
  assertEqual(east(tuple(0, 1)), tuple(1, 1))  # [assert]
  assertEqual(east(tuple(39, 29)), tuple(0, 29))  # [assert]


def test_west() -> None:  # [test]
  assertEqual(west(tuple(3, 4)), tuple(2, 4))  # [assert]
  assertEqual(west(tuple(39, 0)), tuple(38, 0))  # [assert]
  assertEqual(west(tuple(0, 0)), tuple(39, 0))  # [assert]
  assertEqual(west(tuple(0, 29)), tuple(39, 29))  # [assert]


def test_north east() -> None:  # [test]
  assertEqual(northEast(tuple(3, 4)), tuple(4, 3))  # [assert]
  assertEqual(northEast(tuple(0, 0)), tuple(1, 29))  # [assert]
  assertEqual(northEast(tuple(39, 0)), tuple(0, 29))  # [assert]
  assertEqual(northEast(tuple(0, 29)), tuple(1, 28))  # [assert]
  assertEqual(northEast(tuple(39, 29)), tuple(0, 28))  # [assert]


def test_south east() -> None:  # [test]
  assertEqual(southEast(tuple(3, 4)), tuple(4, 5))  # [assert]
  assertEqual(southEast(tuple(0, 0)), tuple(1, 1))  # [assert]
  assertEqual(southEast(tuple(39, 0)), tuple(0, 1))  # [assert]
  assertEqual(southEast(tuple(0, 29)), tuple(1, 0))  # [assert]
  assertEqual(southEast(tuple(39, 29)), tuple(0, 0))  # [assert]


def test_north west() -> None:  # [test]
  assertEqual(northWest(tuple(3, 4)), tuple(2, 3))  # [assert]
  assertEqual(northWest(tuple(0, 0)), tuple(39, 29))  # [assert]
  assertEqual(northWest(tuple(39, 0)), tuple(38, 29))  # [assert]
  assertEqual(northWest(tuple(0, 29)), tuple(39, 28))  # [assert]
  assertEqual(northWest(tuple(39, 29)), tuple(38, 28))  # [assert]


def test_south west() -> None:  # [test]
  assertEqual(southWest(tuple(3, 4)), tuple(2, 5))  # [assert]
  assertEqual(southWest(tuple(0, 0)), tuple(39, 1))  # [assert]
  assertEqual(southWest(tuple(39, 0)), tuple(38, 1))  # [assert]
  assertEqual(southWest(tuple(0, 29)), tuple(39, 0))  # [assert]
  assertEqual(southWest(tuple(39, 29)), tuple(38, 0))  # [assert]


def test_blackOrWhite() -> None:  # [test]
  assertEqual(blackOrWhite(0), black)  # [assert]
  assertEqual(blackOrWhite(0.499), black)  # [assert]
  assertEqual(blackOrWhite(0.5), black)  # [assert]
  assertEqual(blackOrWhite(0.501), white)  # [assert]
  assertEqual(blackOrWhite(1), white)  # [assert]


def test_neighbourCells() -> None:  # [test]
  assertEqual(neighbourCells(3, 4), [tuple(2, 3), tuple(3, 3), tuple(4, 3), tuple(2, 4), tuple(4, 4), tuple(2, 5), tuple(3, 5), tuple(4, 5)])  # [assert]


def test_willLive() -> None:  # [test]
  assertEqual(willLive(white, 0), false)  # [assert]
  assertEqual(willLive(white, 1), false)  # [assert]
  assertEqual(willLive(white, 2), false)  # [assert]
  assertEqual(willLive(white, 3), true)  # [assert]
  assertEqual(willLive(white, 4), false)  # [assert]
  assertEqual(willLive(white, 5), false)  # [assert]
  assertEqual(willLive(white, 6), false)  # [assert]
  assertEqual(willLive(white, 7), false)  # [assert]
  assertEqual(willLive(white, 8), false)  # [assert]
  assertEqual(willLive(black, 0), false)  # [assert]
  assertEqual(willLive(black, 1), false)  # [assert]
  assertEqual(willLive(black, 2), true)  # [assert]
  assertEqual(willLive(black, 3), true)  # [assert]
  assertEqual(willLive(black, 4), false)  # [assert]
  assertEqual(willLive(black, 5), false)  # [assert]
  assertEqual(willLive(black, 6), false)  # [assert]
  assertEqual(willLive(black, 7), false)  # [assert]
  assertEqual(willLive(black, 8), false)  # [assert]


