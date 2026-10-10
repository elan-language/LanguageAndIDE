' VB.NET with Elan 2.0.0-beta5

Sub main()
  Dim grid = New BlockGraphics() ' variable definition
  fillRandom(grid) ' procedure call
  While True
    displayBlockGraphics(grid) ' procedure call
    Dim nextGen = New BlockGraphics() ' variable definition
    fillNextGeneration(grid, nextGen) ' procedure call
    sleep_ms(50) ' procedure call
    grid = nextGen ' assignment
  End While
End Sub

Sub fillRandom(grid As BlockGraphics) ' procedure
  For Each cell In range(0, 1199)
    Dim colour = randint(0, 2)*white ' variable definition
    grid.putBlockNo(cell, colour) ' procedure call
  Next cell
End Sub

Sub fillNextGeneration(grid As BlockGraphics, nextGen As BlockGraphics) ' procedure
  For Each cell In range(0, 1199)
    Dim colour = nextCellValue(grid, cell) ' variable definition
    nextGen.putBlockNo(cell, colour) ' procedure call
  Next cell
End Sub

Function x(cell As Integer) As Integer
  Return cell Mod 40
End Function

<TestClass Class Test_x
 <TestMethod> Sub test_x()
  Assert.AreEqual(0, x(0))
  Assert.AreEqual(39, x(39))
  Assert.AreEqual(0, x(40))
  Assert.AreEqual(39, x(1199))
 End Sub
End Class


Function y(cell As Integer) As Integer
  Return divAsInt(cell, 40)
End Function

<TestClass Class Test_y
 <TestMethod> Sub test_y()
  Assert.AreEqual(0, y(0))
  Assert.AreEqual(0, y(39))
  Assert.AreEqual(1, y(40))
  Assert.AreEqual(29, y(1199))
 End Sub
End Class


Function cellNo(x As Integer, y As Integer) As Integer
  Return y*40 + x
End Function

<TestClass Class Test_cellNo
 <TestMethod> Sub test_cellNo()
  Assert.AreEqual(0, cellNo(0, 0))
  Assert.AreEqual(39, cellNo(39, 0))
  Assert.AreEqual(40, cellNo(0, 1))
  Assert.AreEqual(1199, cellNo(39, 29))
 End Sub
End Class


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
  Dim grid = createTestGrid() ' variable definition
  Assert.AreEqual(1, liveNeighbours(grid, 0))
  Assert.AreEqual(4, liveNeighbours(grid, 41))
  Assert.AreEqual(3, liveNeighbours(grid, 1))
  Assert.AreEqual(3, liveNeighbours(grid, 42))
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
  Dim colour = white ' variable definition
  Dim live = willLive(grid.getBlockNo(cell), liveNeighbours(grid, cell)) ' variable definition
  If live Then
    colour = black ' assignment
  End If
  Return colour
End Function

<TestClass Class Test_nextCellValue
 <TestMethod> Sub test_nextCellValue()
  Dim grid = createTestGrid() ' variable definition
  Assert.AreEqual(white, nextCellValue(grid, 0))
  Assert.AreEqual(white, nextCellValue(grid, 41))
  Assert.AreEqual(black, nextCellValue(grid, 1))
  Assert.AreEqual(black, nextCellValue(grid, 42))
 End Sub
End Class


Function createTestGrid() As BlockGraphics
  Dim grid = New BlockGraphics() ' variable definition
  grid = grid.withPutBlockNo(0, black).withPutBlockNo(2, black).withPutBlockNo(41, black).withPutBlockNo(80, black).withPutBlockNo(82, black) ' assignment
  Return grid
End Function
