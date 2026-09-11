# Python with Elan 2.0.0-beta4

def main() -> None:
  grid = BlockGraphics() # variable definition
  fillRandom(grid) # procedure call
  while True:
    displayBlockGraphics(grid) # procedure call
    nextGeneration(grid) # procedure call
    sleep_ms(50) # procedure call
  # end while
# end main

def fillRandom(grid: BlockGraphics) -> None: # procedure
  for col in range(0, 40):
    for row in range(0, 30):
      grid.put(col, row, blackOrWhite(random())) # procedure call
    # end for
  # end for
# end procedure

def nextGeneration(grid: BlockGraphics) -> None: # procedure
  # First, make a copy of the existing grid
  copy = BlockGraphics() # variable definition
  for cell in range(0, 1199):
    copy.putBlockNo(cell, grid.getBlockNo(cell)) # procedure call
  # end for
  # then calculate each new cell *from the copy*, and update the grid
  for cell in range(0, 1199):
    colour = nextCellValue(copy, cell) # variable definition
    grid.putBlockNo(cell, colour) # procedure call
  # end for
# end procedure

def blackOrWhite(random: float) -> int: # function
  result = black # variable definition
  if random > 0.5:
    result = white # assignment
  # end if
  return result
# end function

def x(cell: int) -> int: # function
  return cell % 40
# end function

def y(cell: int) -> int: # function
  return divAsInt(cell, 40)
# end function

def cellNo(x: int, y: int) -> int: # function
  return y*40 + x
# end function

def north(cell: int) -> int: # function
  x = x(cell) # variable definition
  y = y(cell) # variable definition
  y2 = if_(y == 0, 29, y - 1) # variable definition
  return cellNo(x, y2)
# end function

class Test_north(unittest.TestCase):
 def test_north(self) -> None:
  self.assertEqual(north(124), 84)
  self.assertEqual(north(0), 1160)
  self.assertEqual(north(39), 1199)
  self.assertEqual(north(1199), 1159)
  self.assertEqual(north(1160), 1120)
# end test

def south(cell: int) -> int: # function
  x = x(cell) # variable definition
  y = y(cell) # variable definition
  y2 = if_(y == 29, 0, y + 1) # variable definition
  return cellNo(x, y2)
# end function

class Test_south(unittest.TestCase):
 def test_south(self) -> None:
  self.assertEqual(south(124), 164)
  self.assertEqual(south(0), 40)
  self.assertEqual(south(39), 79)
  self.assertEqual(south(1199), 39)
  self.assertEqual(south(1160), 0)
# end test

def east(cell: int) -> int: # function
  x = x(cell) # variable definition
  y = y(cell) # variable definition
  x2 = if_(x == 39, 0, x + 1) # variable definition
  return cellNo(x2, y)
# end function

class Test_east(unittest.TestCase):
 def test_east(self) -> None:
  self.assertEqual(east(124), 125)
  self.assertEqual(east(0), 1)
  self.assertEqual(east(39), 0)
  self.assertEqual(east(1199), 1160)
  self.assertEqual(east(1160), 1161)
# end test

def west(cell: int) -> int: # function
  x = x(cell) # variable definition
  y = y(cell) # variable definition
  x2 = if_(x == 0, 39, x - 1) # variable definition
  return cellNo(x2, y)
# end function

class Test_west(unittest.TestCase):
 def test_west(self) -> None:
  self.assertEqual(west(124), 123)
  self.assertEqual(west(0), 39)
  self.assertEqual(west(39), 38)
  self.assertEqual(west(1199), 1198)
  self.assertEqual(west(1160), 1199)
# end test

def northEast(cell: int) -> int: # function
  return north(east(cell))
# end function

class Test_northEast(unittest.TestCase):
 def test_northEast(self) -> None:
  self.assertEqual(northEast(124), 85)
  self.assertEqual(northEast(0), 1161)
  self.assertEqual(northEast(39), 1160)
  self.assertEqual(northEast(1199), 1120)
  self.assertEqual(northEast(1160), 1121)
# end test

def northWest(cell: int) -> int: # function
  return north(west(cell))
# end function

class Test_northWest(unittest.TestCase):
 def test_northWest(self) -> None:
  self.assertEqual(northWest(124), 83)
  self.assertEqual(northWest(0), 1199)
  self.assertEqual(northWest(39), 1198)
  self.assertEqual(northWest(1199), 1158)
  self.assertEqual(northWest(1160), 1159)
# end test

def southEast(cell: int) -> int: # function
  return south(east(cell))
# end function

class Test_southEast(unittest.TestCase):
 def test_southEast(self) -> None:
  self.assertEqual(southEast(124), 165)
  self.assertEqual(southEast(0), 41)
  self.assertEqual(southEast(39), 40)
  self.assertEqual(southEast(1199), 0)
  self.assertEqual(southEast(1160), 1)
# end test

def southWest(cell: int) -> int: # function
  return south(west(cell))
# end function

class Test_southWest(unittest.TestCase):
 def test_southWest(self) -> None:
  self.assertEqual(southWest(124), 163)
  self.assertEqual(southWest(0), 79)
  self.assertEqual(southWest(39), 78)
  self.assertEqual(southWest(1199), 38)
  self.assertEqual(southWest(1160), 39)
# end test

def neighbourCells(c: int) -> list[int]: # function
  return [northWest(c), north(c), northEast(c), west(c), east(c), southWest(c), south(c), southEast(c)]
# end function

class Test_neighbourCells(unittest.TestCase):
 def test_neighbourCells(self) -> None:
  self.assertEqual(neighbourCells(124), [83, 84, 85, 123, 125, 163, 164, 165])
# end test

def liveNeighbours(grid: BlockGraphics, cell: int) -> int: # function
  neighbours = neighbourCells(cell) # variable definition
  return neighbours.filter(lambda c: int: grid.getBlockNo(c) == black).length()
# end function

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

def nextCellValue(grid: BlockGraphics, cell: int) -> int: # function
  colour = white # variable definition
  live = willLive(grid.getBlockNo(cell), liveNeighbours(grid, cell)) # variable definition
  if live:
    colour = black # assignment
  # end if
  return colour
# end function

class Test_blackOrWhite(unittest.TestCase):
 def test_blackOrWhite(self) -> None:
  self.assertEqual(blackOrWhite(0), black)
  self.assertEqual(blackOrWhite(0.499), black)
  self.assertEqual(blackOrWhite(0.5), black)
  self.assertEqual(blackOrWhite(0.501), white)
  self.assertEqual(blackOrWhite(1), white)
# end test

main()
