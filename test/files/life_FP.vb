' VB.NET with Elan 2.0.0-beta4

Sub main()
  Dim rng = New Random() ' variable definition
  rng.initialiseFromClock() ' procedure call
  Dim grid = initialGrid(rng) ' variable definition
  While True
    displayBlockGraphics(grid) ' procedure call
    grid = nextGeneration(grid) ' assignment
    sleep_ms(50) ' procedure call
  End While
End Sub

Function initialGrid(rng As Random) As BlockGraphics
  Dim grid = New BlockGraphics() ' variable definition
  Dim cells = range(0, 1199) ' variable definition
  Return cells.reduce((grid, rng), initialCell).item_0
End Function

Function initialCell(acc As (BlockGraphics, Random), cell As Integer) As (BlockGraphics, Random)
  Dim bg = acc.item_0 ' variable definition
  Dim rng = acc.item_1 ' variable definition
  Dim colour = blackOrWhite(rng) ' variable definition
  Return (bg.withPutBlockNo(cell, colour), rng.nextGen())
End Function

<TestClass Class Test_initialGrid
 <TestMethod> Sub test_initialGrid()
  Dim grid = initialGrid(New Random()) ' variable definition
  Assert.AreEqual(black, grid.get(0, 0))
  Assert.AreEqual(white, grid.get(1, 0))
  Assert.AreEqual(black, grid.get(2, 0))
  Assert.AreEqual(white, grid.get(0, 1))
  Assert.AreEqual(black, grid.get(1, 1))
  Assert.AreEqual(white, grid.get(2, 1))
  Assert.AreEqual(black, grid.get(0, 2))
  Assert.AreEqual(white, grid.get(1, 2))
  Assert.AreEqual(black, grid.get(2, 2))
 End Sub
End Class


Function blackOrWhite(rng As Random) As Integer
  Return if_(rng.asFloat() > 0.5, white, black)
End Function

<TestClass Class Test_blackOrWhite
 <TestMethod> Sub test_blackOrWhite()
  Dim rng0 = New Random() ' variable definition
  Dim rng1 = rng0.nextGen() ' variable definition
  Dim rng2 = rng1.nextGen() ' variable definition
  Dim rng3 = rng2.nextGen() ' variable definition
  Assert.AreEqual(black, blackOrWhite(rng0))
  Assert.AreEqual(white, blackOrWhite(rng1))
  Assert.AreEqual(black, blackOrWhite(rng2))
  Assert.AreEqual(black, blackOrWhite(rng3))
 End Sub
End Class


Function x(cell As Integer) As Integer
  Return cell Mod 40
End Function

Function y(cell As Integer) As Integer
  Return divAsInt(cell, 40)
End Function

Function cellNo(x As Integer, y As Integer) As Integer
  Return y*40 + x
End Function

Function north(cell As Integer) As Integer
  Dim x = x(cell) ' variable definition
  Dim y = y(cell) ' variable definition
  Dim y2 = if_(y = 0, 29, y - 1) ' variable definition
  Return cellNo(x, y2)
End Function

<TestClass Class Test_north
 <TestMethod> Sub test_north()
  Assert.AreEqual(84, north(124))
  Assert.AreEqual(1160, north(0))
  Assert.AreEqual(1199, north(39))
  Assert.AreEqual(1159, north(1199))
  Assert.AreEqual(1120, north(1160))
 End Sub
End Class


Function south(cell As Integer) As Integer
  Dim x = x(cell) ' variable definition
  Dim y = y(cell) ' variable definition
  Dim y2 = if_(y = 29, 0, y + 1) ' variable definition
  Return cellNo(x, y2)
End Function

<TestClass Class Test_south
 <TestMethod> Sub test_south()
  Assert.AreEqual(164, south(124))
  Assert.AreEqual(40, south(0))
  Assert.AreEqual(79, south(39))
  Assert.AreEqual(39, south(1199))
  Assert.AreEqual(0, south(1160))
 End Sub
End Class


Function east(cell As Integer) As Integer
  Dim x = x(cell) ' variable definition
  Dim y = y(cell) ' variable definition
  Dim x2 = if_(x = 39, 0, x + 1) ' variable definition
  Return cellNo(x2, y)
End Function

<TestClass Class Test_east
 <TestMethod> Sub test_east()
  Assert.AreEqual(125, east(124))
  Assert.AreEqual(1, east(0))
  Assert.AreEqual(0, east(39))
  Assert.AreEqual(1160, east(1199))
  Assert.AreEqual(1161, east(1160))
 End Sub
End Class


Function west(cell As Integer) As Integer
  Dim x = x(cell) ' variable definition
  Dim y = y(cell) ' variable definition
  Dim x2 = if_(x = 0, 39, x - 1) ' variable definition
  Return cellNo(x2, y)
End Function

<TestClass Class Test_west
 <TestMethod> Sub test_west()
  Assert.AreEqual(123, west(124))
  Assert.AreEqual(39, west(0))
  Assert.AreEqual(38, west(39))
  Assert.AreEqual(1198, west(1199))
  Assert.AreEqual(1199, west(1160))
 End Sub
End Class


Function northEast(cell As Integer) As Integer
  Return north(east(cell))
End Function

<TestClass Class Test_northEast
 <TestMethod> Sub test_northEast()
  Assert.AreEqual(85, northEast(124))
  Assert.AreEqual(1161, northEast(0))
  Assert.AreEqual(1160, northEast(39))
  Assert.AreEqual(1120, northEast(1199))
  Assert.AreEqual(1121, northEast(1160))
 End Sub
End Class


Function northWest(cell As Integer) As Integer
  Return north(west(cell))
End Function

<TestClass Class Test_northWest
 <TestMethod> Sub test_northWest()
  Assert.AreEqual(83, northWest(124))
  Assert.AreEqual(1199, northWest(0))
  Assert.AreEqual(1198, northWest(39))
  Assert.AreEqual(1158, northWest(1199))
  Assert.AreEqual(1159, northWest(1160))
 End Sub
End Class


Function southEast(cell As Integer) As Integer
  Return south(east(cell))
End Function

<TestClass Class Test_southEast
 <TestMethod> Sub test_southEast()
  Assert.AreEqual(165, southEast(124))
  Assert.AreEqual(41, southEast(0))
  Assert.AreEqual(40, southEast(39))
  Assert.AreEqual(0, southEast(1199))
  Assert.AreEqual(1, southEast(1160))
 End Sub
End Class


Function southWest(cell As Integer) As Integer
  Return south(west(cell))
End Function

<TestClass Class Test_southWest
 <TestMethod> Sub test_southWest()
  Assert.AreEqual(163, southWest(124))
  Assert.AreEqual(79, southWest(0))
  Assert.AreEqual(78, southWest(39))
  Assert.AreEqual(38, southWest(1199))
  Assert.AreEqual(39, southWest(1160))
 End Sub
End Class


Function neighbourCells(c As Integer) As List(Of Integer)
  Return {northWest(c), north(c), northEast(c), west(c), east(c), southWest(c), south(c), southEast(c)}
End Function

<TestClass Class Test_neighbourCells
 <TestMethod> Sub test_neighbourCells()
  Assert.AreEqual({83, 84, 85, 123, 125, 163, 164, 165}, neighbourCells(124))
 End Sub
End Class


Function liveNeighbours(grid As BlockGraphics, cell As Integer) As Integer
  Dim neighbours = neighbourCells(cell) ' variable definition
  Return neighbours.filter(Function (c As Integer) grid.getBlockNo(c) = black).length()
End Function

<TestClass Class Test_liveNeighbours
 <TestMethod> Sub test_liveNeighbours()
  Dim grid = initialGrid(New Random()) ' variable definition
  Dim live = liveNeighbours(grid, 41) ' variable definition
  Assert.AreEqual(4, live)
 End Sub
End Class


Function willLive(cell As Integer, liveNeighbours As Integer) As Boolean
  Return ((cell = black) And (liveNeighbours > 1) And (liveNeighbours < 4)) Or ((cell = white) And (liveNeighbours = 3))
End Function

<TestClass Class Test_willLive
 <TestMethod> Sub test_willLive()
  Assert.AreEqual(False, willLive(white, 0))
  Assert.AreEqual(False, willLive(white, 1))
  Assert.AreEqual(False, willLive(white, 2))
  Assert.AreEqual(True, willLive(white, 3))
  Assert.AreEqual(False, willLive(white, 4))
  Assert.AreEqual(False, willLive(white, 5))
  Assert.AreEqual(False, willLive(white, 6))
  Assert.AreEqual(False, willLive(white, 7))
  Assert.AreEqual(False, willLive(white, 8))
  Assert.AreEqual(False, willLive(black, 0))
  Assert.AreEqual(False, willLive(black, 1))
  Assert.AreEqual(True, willLive(black, 2))
  Assert.AreEqual(True, willLive(black, 3))
  Assert.AreEqual(False, willLive(black, 4))
  Assert.AreEqual(False, willLive(black, 5))
  Assert.AreEqual(False, willLive(black, 6))
  Assert.AreEqual(False, willLive(black, 7))
  Assert.AreEqual(False, willLive(black, 8))
 End Sub
End Class


Function nextCellValue(grid As BlockGraphics, cell As Integer) As Integer
  Dim live = willLive(grid.getBlockNo(cell), liveNeighbours(grid, cell)) ' variable definition
  Return if_(live, black, white)
End Function

Function updateCellValue(oldGrid As BlockGraphics, newGrid As BlockGraphics, cell As Integer) As BlockGraphics
  Return newGrid.withPutBlockNo(cell, nextCellValue(oldGrid, cell))
End Function

<TestClass Class Test_nextCellValue
 <TestMethod> Sub test_nextCellValue()
  Dim grid = initialGrid(New Random()) ' variable definition
  Dim nxt = nextCellValue(grid, 41) ' variable definition
  Assert.AreEqual(white, nxt)
 End Sub
End Class


Function nextGeneration(oldGrid As BlockGraphics) As BlockGraphics
  Dim emptyGrid = New BlockGraphics() ' variable definition
  Return range(0, 1199).reduce(emptyGrid, Function (newGrid As BlockGraphics, c As Integer) updateCellValue(oldGrid, newGrid, c))
End Function
