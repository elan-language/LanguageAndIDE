# ab7d747bb0eb7acec603963e3b1a72fea9dc7809fbc7df72a98688685c6f78f5 Python with Elan 2.0.0-beta5 valid

def main() -> None:
  grid = BlockGraphics()
  fillRandom(grid)
  while true:
    displayBlockGraphics(grid)
    nextGen = BlockGraphics()
    fillNextGeneration(grid, nextGen)
    grid = nextGen
    sleep_ms(50)
  # end while 
# end main 

def fillRandom(grid: BlockGraphics) -> None:
  colours = [black, white]
  for cell in range(0, 1199):
    colour = colours[randint(0, 1)]
    grid.putBlockNo(cell, colour)
  # end for 
# end procedure 

def fillNextGeneration(grid: BlockGraphics, nextGen: BlockGraphics) -> None:
  for cell in range(0, 1199):
    colour = nextCellValue(grid, cell)
    nextGen.putBlockNo(cell, colour)
  # end for 
# end procedure 

def x(cell: int) -> int:
  return cell % 40
# end function 

class Test_x(unittest.TestCase): def test_x(self) -> None:
  self.assertEqual(x(0), 0)
  self.assertEqual(x(39), 39)
  self.assertEqual(x(40), 0)
  self.assertEqual(x(1199), 39)
# end test 

def y(cell: int) -> int:
  return divAsInt(cell, 40)
# end function 

class Test_y(unittest.TestCase): def test_y(self) -> None:
  self.assertEqual(y(0), 0)
  self.assertEqual(y(39), 0)
  self.assertEqual(y(40), 1)
  self.assertEqual(y(1199), 29)
# end test 

def cellNo(x: int, y: int) -> int:
  return y*40 + x
# end function 

class Test_cellNo(unittest.TestCase): def test_cellNo(self) -> None:
  self.assertEqual(cellNo(0, 0), 0)
  self.assertEqual(cellNo(39, 0), 39)
  self.assertEqual(cellNo(0, 1), 40)
  self.assertEqual(cellNo(39, 29), 1199)
# end test 

def north(cell: int) -> int:
  x = x(cell)
  y = y(cell)
  y2 = y - 1
  if y2 == -1:
    y2 = 29
  # end if 
  return cellNo(x, y2)
# end function 

class Test_north(unittest.TestCase): def test_north(self) -> None:
  self.assertEqual(north(124), 84)
  self.assertEqual(north(0), 1160)
  self.assertEqual(north(39), 1199)
  self.assertEqual(north(1199), 1159)
  self.assertEqual(north(1160), 1120)
# end test 

def south(cell: int) -> int:
  x = x(cell)
  y = y(cell)
  y2 = y + 1
  if y2 == 30:
    y2 = 0
  # end if 
  return cellNo(x, y2)
# end function 

class Test_south(unittest.TestCase): def test_south(self) -> None:
  self.assertEqual(south(124), 164)
  self.assertEqual(south(0), 40)
  self.assertEqual(south(39), 79)
  self.assertEqual(south(1199), 39)
  self.assertEqual(south(1160), 0)
# end test 

def east(cell: int) -> int:
  x = x(cell)
  y = y(cell)
  x2 = x + 1
  if x2 == 40:
    x2 = 0
  # end if 
  return cellNo(x2, y)
# end function 

class Test_east(unittest.TestCase): def test_east(self) -> None:
  self.assertEqual(east(124), 125)
  self.assertEqual(east(0), 1)
  self.assertEqual(east(39), 0)
  self.assertEqual(east(1199), 1160)
  self.assertEqual(east(1160), 1161)
# end test 

def west(cell: int) -> int:
  x = x(cell)
  y = y(cell)
  x2 = x - 1
  if x2 == -1:
    x2 = 39
  # end if 
  return cellNo(x2, y)
# end function 

class Test_west(unittest.TestCase): def test_west(self) -> None:
  self.assertEqual(west(124), 123)
  self.assertEqual(west(0), 39)
  self.assertEqual(west(39), 38)
  self.assertEqual(west(1199), 1198)
  self.assertEqual(west(1160), 1199)
# end test 

def northEast(cell: int) -> int:
  return north(east(cell))
# end function 

class Test_northEast(unittest.TestCase): def test_northEast(self) -> None:
  self.assertEqual(northEast(124), 85)
  self.assertEqual(northEast(0), 1161)
  self.assertEqual(northEast(39), 1160)
  self.assertEqual(northEast(1199), 1120)
  self.assertEqual(northEast(1160), 1121)
# end test 

def northWest(cell: int) -> int:
  return north(west(cell))
# end function 

class Test_northWest(unittest.TestCase): def test_northWest(self) -> None:
  self.assertEqual(northWest(124), 83)
  self.assertEqual(northWest(0), 1199)
  self.assertEqual(northWest(39), 1198)
  self.assertEqual(northWest(1199), 1158)
  self.assertEqual(northWest(1160), 1159)
# end test 

def southEast(cell: int) -> int:
  return south(east(cell))
# end function 

class Test_southEast(unittest.TestCase): def test_southEast(self) -> None:
  self.assertEqual(southEast(124), 165)
  self.assertEqual(southEast(0), 41)
  self.assertEqual(southEast(39), 40)
  self.assertEqual(southEast(1199), 0)
  self.assertEqual(southEast(1160), 1)
# end test 

def southWest(cell: int) -> int:
  return south(west(cell))
# end function 

class Test_southWest(unittest.TestCase): def test_southWest(self) -> None:
  self.assertEqual(southWest(124), 163)
  self.assertEqual(southWest(0), 79)
  self.assertEqual(southWest(39), 78)
  self.assertEqual(southWest(1199), 38)
  self.assertEqual(southWest(1160), 39)
# end test 

def neighbourCells(c: int) -> list[int]:
  return [northWest(c), north(c), northEast(c), west(c), east(c), southWest(c), south(c), southEast(c)]
# end function 

class Test_neighbourCells(unittest.TestCase): def test_neighbourCells(self) -> None:
  self.assertEqual(neighbourCells(124), [83, 84, 85, 123, 125, 163, 164, 165])
# end test 

def liveNeighbours(grid: BlockGraphics, cell: int) -> int:
  live = 0
  for c in neighbourCells(cell):
    if grid.getBlockNo(c) == black:
      live = live + 1
    # end if 
  # end for 
  return live
# end function 

class Test_liveNeighbours(unittest.TestCase): def test_liveNeighbours(self) -> None:
  grid = createTestGrid()
  self.assertEqual(liveNeighbours(grid, 0), 1)
  self.assertEqual(liveNeighbours(grid, 41), 4)
  self.assertEqual(liveNeighbours(grid, 1), 3)
  self.assertEqual(liveNeighbours(grid, 42), 3)
# end test 

def willLive(cell: int, liveNeighbours: int) -> bool:
  return ((cell == black) and (liveNeighbours > 1) and (liveNeighbours < 4)) or ((cell == white) and (liveNeighbours == 3))
# end function 

class Test_willLive(unittest.TestCase): def test_willLive(self) -> None:
  self.assertEqual(willLive(white, 0), false)
  self.assertEqual(willLive(white, 1), false)
  self.assertEqual(willLive(white, 2), false)
  self.assertEqual(willLive(white, 3), true)
  self.assertEqual(willLive(white, 4), false)
  self.assertEqual(willLive(white, 5), false)
  self.assertEqual(willLive(white, 6), false)
  self.assertEqual(willLive(white, 7), false)
  self.assertEqual(willLive(white, 8), false)
  self.assertEqual(willLive(black, 0), false)
  self.assertEqual(willLive(black, 1), false)
  self.assertEqual(willLive(black, 2), true)
  self.assertEqual(willLive(black, 3), true)
  self.assertEqual(willLive(black, 4), false)
  self.assertEqual(willLive(black, 5), false)
  self.assertEqual(willLive(black, 6), false)
  self.assertEqual(willLive(black, 7), false)
  self.assertEqual(willLive(black, 8), false)
# end test 

def nextCellValue(grid: BlockGraphics, cell: int) -> int:
  colour = white
  live = willLive(grid.getBlockNo(cell), liveNeighbours(grid, cell))
  if live:
    colour = black
  # end if 
  return colour
# end function 

class Test_nextCellValue(unittest.TestCase): def test_nextCellValue(self) -> None:
  grid = createTestGrid()
  self.assertEqual(nextCellValue(grid, 0), white)
  self.assertEqual(nextCellValue(grid, 41), white)
  self.assertEqual(nextCellValue(grid, 1), black)
  self.assertEqual(nextCellValue(grid, 42), black)
# end test 

def createTestGrid() -> BlockGraphics:
  grid = BlockGraphics()
  grid = grid.withPutBlockNo(0, black).withPutBlockNo(2, black).withPutBlockNo(41, black).withPutBlockNo(80, black).withPutBlockNo(82, black)
  return grid
# end function 

main()
