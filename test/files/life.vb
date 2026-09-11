' VB.NET with Elan 2.0.0-beta4

Sub main()
  Dim grid = New BlockGraphics() ' variable definition
  fillRandom(grid) ' procedure call
  While True
    displayBlockGraphics(grid) ' procedure call
    nextGeneration(grid) ' procedure call
    sleep_ms(50) ' procedure call
  End While
End Sub

Sub fillRandom(grid As BlockGraphics) ' procedure
  For Each col In range(0, 40)
    For Each row In range(0, 30)
      grid.put(col, row, blackOrWhite(random())) ' procedure call
    Next row
  Next col
End Sub

Sub nextGeneration(grid As BlockGraphics) ' procedure
  ' First, make a copy of the existing grid
  Dim copy = New BlockGraphics() ' variable definition
  For Each cell In range(0, 1199)
    copy.putBlockNo(cell, grid.getBlockNo(cell)) ' procedure call
  Next cell
  ' then calculate each new cell *from the copy*, and update the grid
  For Each cell In range(0, 1199)
    Dim colour = nextCellValue(copy, cell) ' variable definition
    grid.putBlockNo(cell, colour) ' procedure call
  Next cell
End Sub

Function blackOrWhite(random As Double) As Integer
  Dim result = black ' variable definition
  If random > 0.5 Then
    result = white ' assignment
  End If
  Return result
End Function

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

<TestClass Class Test_blackOrWhite
 <TestMethod> Sub test_blackOrWhite()
  Assert.AreEqual(black, blackOrWhite(0))
  Assert.AreEqual(black, blackOrWhite(0.499))
  Assert.AreEqual(black, blackOrWhite(0.5))
  Assert.AreEqual(white, blackOrWhite(0.501))
  Assert.AreEqual(white, blackOrWhite(1))
 End Sub
End Class

