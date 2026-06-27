' VB.NET with Elan 2.0.0-beta1

Sub main()
  Dim rng = New Random() ' variable definition
  rng.initialiseFromClock() ' call procedure
  Dim grid = initialGrid(rng) ' variable definition
  While True
    displayBlocks(grid) ' call procedure
    grid = nextGeneration(grid) ' assignment
    sleep_ms(50) ' call procedure
  End While
End Sub

Function initialGrid(rng As Random) As List(Of List(Of Integer))
  Dim grid = New List(Of List(Of Integer))() ' let
  Dim cols = range(0, 40) ' let
  Return cols.reduce((grid, rng), appendCol).item_0
End Function

<TestClass Class Test_initialGrid
 <TestMethod> Sub test_initialGrid()
  Dim grid = initialGrid(New Random()) ' let
  Assert.AreEqual(black, grid(0)(0))
  Assert.AreEqual(white, grid(1)(0))
  Assert.AreEqual(white, grid(2)(0))
  Assert.AreEqual(white, grid(0)(1))
  Assert.AreEqual(black, grid(1)(1))
  Assert.AreEqual(white, grid(2)(1))
  Assert.AreEqual(black, grid(0)(2))
  Assert.AreEqual(black, grid(1)(2))
  Assert.AreEqual(black, grid(2)(2))
 End Sub
End Class


Function appendCol(tup As (List(Of List(Of Integer)), Random), c As Integer) As (List(Of List(Of Integer)), Random)
  ' 'c' is not used, but is needed for compatibility with function signature for 'reduce'
  Dim grid = tup.item_0 ' let
  Dim rng = tup.item_1 ' let
  Dim tup2 = initialCol(rng) ' let
  Dim col = tup2.item_0 ' let
  Dim rng2 = tup2.item_1 ' let
  Dim grid2 = grid.withAppend(col) ' let
  Return (grid2, rng2)
End Function

<TestClass Class Test_appendCol
 <TestMethod> Sub test_appendCol()
  Dim emptyGrid = New List(Of List(Of Integer))() ' let
  Dim rng = New Random() ' let
  Dim result = appendCol((emptyGrid, rng), 0) ' let
  Dim grid1 = result.item_0 ' let
  Dim col = grid1(0) ' let
  Assert.AreEqual(black, col(0))
  Assert.AreEqual(white, col(1))
  Assert.AreEqual(black, col(2))
  Assert.AreEqual(black, col(29))
  Dim rng2 = result.item_1 ' let
  Dim result2 = appendCol((grid1, rng2), 1) ' let
  Dim grid2 = result2.item_0 ' let
  Dim col2 = grid2(1) ' let
  Assert.AreEqual(white, col2(0))
  Assert.AreEqual(black, col2(1))
  Assert.AreEqual(black, col2(2))
  Assert.AreEqual(white, col2(29))
 End Sub
End Class


Function initialCol(rng As Random) As (List(Of Integer), Random)
  Dim col = New List(Of Integer)() ' let
  Dim rows = range(0, 30) ' let
  Return rows.reduce((col, rng), appendCell)
End Function

<TestClass Class Test_initialCol
 <TestMethod> Sub test_initialCol()
  Dim rng = New Random() ' let
  Dim result = initialCol(rng) ' let
  Dim col = result.item_0 ' let
  Assert.AreEqual(black, col(0))
  Assert.AreEqual(white, col(1))
  Assert.AreEqual(black, col(2))
  Assert.AreEqual(black, col(29))
  Dim rng2 = result.item_1 ' let
  Dim col2 = initialCol(rng2).item_0 ' let
  Assert.AreEqual(white, col2(0))
  Assert.AreEqual(black, col2(1))
  Assert.AreEqual(black, col2(2))
  Assert.AreEqual(white, col2(29))
 End Sub
End Class


Function appendCell(tup As (List(Of Integer), Random), row As Integer) As (List(Of Integer), Random)
  Dim col = tup.item_0 ' let
  Dim rng = tup.item_1 ' let
  Return (col.withAppend(blackOrWhite(rng)), rng.nextGen())
End Function

<TestClass Class Test_appendCell
 <TestMethod> Sub test_appendCell()
  Dim rng = New Random() ' let
  Dim emptyList = New List(Of Integer)() ' let
  Dim result = appendCell((emptyList, rng), 0) ' let
  Dim col = result.item_0 ' let
  Assert.AreEqual(1, col.length())
  Assert.AreEqual(black, col(0))
  Dim rng2 = result.item_1 ' let
  Dim result2 = appendCell((col, rng2), 1) ' let
  Dim col2 = result2.item_0 ' let
  Assert.AreEqual(2, col2.length())
  Assert.AreEqual(white, col2(1))
 End Sub
End Class


Function blackOrWhite(rng As Random) As Integer
  Return if_(rng.asFloat() > 0.5, white, black)
End Function

<TestClass Class Test_blackOrWhite
 <TestMethod> Sub test_blackOrWhite()
  Dim rng0 = New Random() ' let
  Dim rng1 = rng0.nextGen() ' let
  Dim rng2 = rng1.nextGen() ' let
  Dim rng3 = rng2.nextGen() ' let
  Assert.AreEqual(black, blackOrWhite(rng0))
  Assert.AreEqual(white, blackOrWhite(rng1))
  Assert.AreEqual(black, blackOrWhite(rng2))
  Assert.AreEqual(black, blackOrWhite(rng3))
 End Sub
End Class


Function north(cell As (Integer, Integer)) As (Integer, Integer)
  Dim x = cell.item_0 ' let
  Dim y = cell.item_1 ' let
  Dim y2 = if_(y = 0, 29, y - 1) ' let
  Return (x, y2)
End Function

<TestClass Class Test_north
 <TestMethod> Sub test_north()
  Assert.AreEqual((3, 3), north((3, 4)))
  Assert.AreEqual((39, 29), north((39, 0)))
  Assert.AreEqual((0, 28), north((0, 29)))
  Assert.AreEqual((39, 28), north((39, 29)))
 End Sub
End Class


Function south(cell As (Integer, Integer)) As (Integer, Integer)
  Dim x = cell.item_0 ' let
  Dim y = cell.item_1 ' let
  Dim y2 = if_(y = 29, 0, y + 1) ' let
  Return (x, y2)
End Function

<TestClass Class Test_south
 <TestMethod> Sub test_south()
  Assert.AreEqual((3, 5), south((3, 4)))
  Assert.AreEqual((39, 1), south((39, 0)))
  Assert.AreEqual((0, 0), south((0, 29)))
  Assert.AreEqual((39, 0), south((39, 29)))
 End Sub
End Class


Function east(cell As (Integer, Integer)) As (Integer, Integer)
  Dim x = cell.item_0 ' let
  Dim y = cell.item_1 ' let
  Dim x2 = if_(x = 39, 0, x + 1) ' let
  Return (x2, y)
End Function

<TestClass Class Test_east
 <TestMethod> Sub test_east()
  Assert.AreEqual((11, 2), east((10, 2)))
  Assert.AreEqual((0, 0), east((39, 0)))
  Assert.AreEqual((1, 1), east((0, 1)))
  Assert.AreEqual((0, 29), east((39, 29)))
 End Sub
End Class


Function west(cell As (Integer, Integer)) As (Integer, Integer)
  Dim x = cell.item_0 ' let
  Dim y = cell.item_1 ' let
  Dim x2 = if_(x = 0, 39, x - 1) ' let
  Return (x2, y)
End Function

<TestClass Class Test_west
 <TestMethod> Sub test_west()
  Assert.AreEqual((2, 4), west((3, 4)))
  Assert.AreEqual((38, 0), west((39, 0)))
  Assert.AreEqual((39, 0), west((0, 0)))
  Assert.AreEqual((39, 29), west((0, 29)))
 End Sub
End Class


Function northEast(cell As (Integer, Integer)) As (Integer, Integer)
  Return north(east(cell))
End Function

<TestClass Class Test_northEast
 <TestMethod> Sub test_northEast()
  Assert.AreEqual((4, 3), northEast((3, 4)))
  Assert.AreEqual((1, 29), northEast((0, 0)))
  Assert.AreEqual((0, 29), northEast((39, 0)))
  Assert.AreEqual((1, 28), northEast((0, 29)))
  Assert.AreEqual((0, 28), northEast((39, 29)))
 End Sub
End Class


Function northWest(cell As (Integer, Integer)) As (Integer, Integer)
  Return north(west(cell))
End Function

<TestClass Class Test_northWest
 <TestMethod> Sub test_northWest()
  Assert.AreEqual((2, 3), northWest((3, 4)))
  Assert.AreEqual((39, 29), northWest((0, 0)))
  Assert.AreEqual((38, 29), northWest((39, 0)))
  Assert.AreEqual((39, 28), northWest((0, 29)))
  Assert.AreEqual((38, 28), northWest((39, 29)))
 End Sub
End Class


<TestClass Class Test_southEast
 <TestMethod> Sub test_southEast()
  Assert.AreEqual((4, 5), southEast((3, 4)))
  Assert.AreEqual((1, 1), southEast((0, 0)))
  Assert.AreEqual((0, 1), southEast((39, 0)))
  Assert.AreEqual((1, 0), southEast((0, 29)))
  Assert.AreEqual((0, 0), southEast((39, 29)))
 End Sub
End Class


Function southEast(cell As (Integer, Integer)) As (Integer, Integer)
  Return south(east(cell))
End Function

Function southWest(cell As (Integer, Integer)) As (Integer, Integer)
  Return south(west(cell))
End Function

<TestClass Class Test_southWest
 <TestMethod> Sub test_southWest()
  Assert.AreEqual((2, 5), southWest((3, 4)))
  Assert.AreEqual((39, 1), southWest((0, 0)))
  Assert.AreEqual((38, 1), southWest((39, 0)))
  Assert.AreEqual((39, 0), southWest((0, 29)))
  Assert.AreEqual((38, 0), southWest((39, 29)))
 End Sub
End Class


Function neighbourCells(x As Integer, y As Integer) As List(Of (Integer, Integer))
  Dim c = (x, y) ' let
  Return {northWest(c), north(c), northEast(c), west(c), east(c), southWest(c), south(c), southEast(c)}
End Function

<TestClass Class Test_neighbourCells
 <TestMethod> Sub test_neighbourCells()
  Assert.AreEqual({(2, 3), (3, 3), (4, 3), (2, 4), (4, 4), (2, 5), (3, 5), (4, 5)}, neighbourCells(3, 4))
  Assert.AreEqual({(39, 29), (0, 29), (1, 29), (39, 0), (1, 0), (39, 1), (0, 1), (1, 1)}, neighbourCells(0, 0))
  Assert.AreEqual({(38, 28), (39, 28), (0, 28), (38, 29), (0, 29), (38, 0), (39, 0), (0, 0)}, neighbourCells(39, 29))
 End Sub
End Class


Function liveNeighbours(grid As List(Of List(Of Integer)), x As Integer, y As Integer) As Integer
  Dim neighbours = neighbourCells(x, y) ' let
  Return neighbours.filter(Function (c As (Integer, Integer)) grid(c.item_0)(c.item_1) = black).length()
End Function

<TestClass Class Test_liveNeighbours
 <TestMethod> Sub test_liveNeighbours()
  Dim grid = initialGrid(New Random()) ' let
  Dim live = liveNeighbours(grid, 1, 1) ' let
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


Function nextCellValue(grid As List(Of List(Of Integer)), x As Integer, y As Integer) As Integer
  Dim live = willLive(grid(x)(y), liveNeighbours(grid, x, y)) ' let
  Return if_(live, black, white)
End Function

<TestClass Class Test_nextCellValue
 <TestMethod> Sub test_nextCellValue()
  Dim grid = initialGrid(New Random()) ' let
  Dim nxt = nextCellValue(grid, 1, 1) ' let
  Assert.AreEqual(white, nxt)
 End Sub
End Class


Function nextGeneration(grid As List(Of List(Of Integer))) As List(Of List(Of Integer))
  Dim cols = range(0, 40) ' let
  Return cols.map(Function (x As Integer) nextCol(grid, x))
End Function

Function nextCol(grid As List(Of List(Of Integer)), x As Integer) As List(Of Integer)
  Dim col = grid(x) ' let
  Dim rows = range(0, 30) ' let
  Return rows.map(Function (y As Integer) nextCellValue(grid, x, y))
End Function

<TestClass Class Test_nextCol
 <TestMethod> Sub test_nextCol()
  Dim grid = initialGrid(New Random()) ' let
  Dim col = nextCol(grid, 3) ' let
  Assert.AreEqual(black, col(0))
  Assert.AreEqual(black, col(1))
  Assert.AreEqual(white, col(2))
  Assert.AreEqual(black, col(29))
 End Sub
End Class

