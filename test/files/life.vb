' VB.NET with Elan 2.0.0-alpha

Sub main()
  Dim grid = createBlockGraphics(white) ' variable
  fillRandom(grid) ' call
  While True
    displayBlocks(grid) ' call
    Dim gridRef = New AsRef(Of List(Of List(Of Integer)))(grid) ' variable
    nextGeneration(gridRef) ' call
    grid = gridRef.value() ' set
    pause(50) ' call
  End While
End Sub

Sub fillRandom(grid As List(Of List(Of Integer))) ' procedure
  For Each col In range(0, 40)
    For Each row In range(0, 30)
      grid[col][row] = blackOrWhite(random()) ' set
    Next row
  Next col
End Sub

Function blackOrWhite(random As Double) As Integer
  Dim result = black ' variable
  If random > 0.5 Then
    result = white ' set
  End If
  Return result
End Function

Function north(cell As (Integer, Integer)) As (Integer, Integer)
  Const x = cell.item_0
  Const y = cell.item_1
  Const y2 = if(y = 0, 29, y - 1)
  Return (x, y2)
End Function

Function south(cell As (Integer, Integer)) As (Integer, Integer)
  Const x = cell.item_0
  Const y = cell.item_1
  Const y2 = if(y = 29, 0, y + 1)
  Return (x, y2)
End Function

Function east(cell As (Integer, Integer)) As (Integer, Integer)
  Const x = cell.item_0
  Const y = cell.item_1
  Const x2 = if(x = 39, 0, x + 1)
  Return (x2, y)
End Function

Function west(cell As (Integer, Integer)) As (Integer, Integer)
  Const x = cell.item_0
  Const y = cell.item_1
  Const x2 = if(x = 0, 39, x - 1)
  Return (x2, y)
End Function

Function northEast(cell As (Integer, Integer)) As (Integer, Integer)
  Return north(east(cell))
End Function

Function northWest(cell As (Integer, Integer)) As (Integer, Integer)
  Return north(west(cell))
End Function

Function southEast(cell As (Integer, Integer)) As (Integer, Integer)
  Return south(east(cell))
End Function

Function southWest(cell As (Integer, Integer)) As (Integer, Integer)
  Return south(west(cell))
End Function

Function neighbourCells(x As Integer, y As Integer) As List(Of (Integer, Integer))
  Dim c = (x, y) ' variable
  Return {northWest(c), north(c), northEast(c), west(c), east(c), southWest(c), south(c), southEast(c)}
End Function

Function liveNeighbours(grid As List(Of List(Of Integer)), x As Integer, y As Integer) As Integer
  Dim count = 0 ' variable
  For Each cell In neighbourCells(x, y)
    Const cx = cell.item_0
    Const cy = cell.item_1
    If grid[cx][cy] = black Then
      count = count + 1 ' set
    End If
  Next cell
  Return count
End Function

Function willLive(cell As Integer, liveNeighbours As Integer) As Boolean
  Dim result = False ' variable
  If cell = black Then
    result = (liveNeighbours > 1) And (liveNeighbours < 4) ' set
  Else
    result = liveNeighbours = 3 ' set
  End If
  Return result
End Function

Function nextCellValue(grid As List(Of List(Of Integer)), x As Integer, y As Integer) As Integer
  Dim colour = white ' variable
  Const live = willLive(grid[x][y], liveNeighbours(grid, x, y))
  If live Then
    colour = black ' set
  End If
  Return colour
End Function

Sub nextGeneration(gridRef As AsRef(Of List(Of List(Of Integer)))) ' procedure
  Dim nextGen = createBlockGraphics(white) ' variable
  Dim grid = gridRef.value() ' variable
  For Each x In range(0, 40)
    For Each y In range(0, 30)
      Const colour = nextCellValue(grid, x, y)
      nextGen[x][y] = colour ' set
    Next y
  Next x
  gridRef.set(nextGen) ' call
End Sub

Sub test_north
  Assert.AreEqual((3, 3), north((3, 4)) 
  Assert.AreEqual((39, 29), north((39, 0)) 
  Assert.AreEqual((0, 28), north((0, 29)) 
  Assert.AreEqual((39, 28), north((39, 29)) 
End Sub

Sub test_south
  Assert.AreEqual((3, 5), south((3, 4)) 
  Assert.AreEqual((39, 1), south((39, 0)) 
  Assert.AreEqual((0, 0), south((0, 29)) 
  Assert.AreEqual((39, 0), south((39, 29)) 
End Sub

Sub test_east
  Assert.AreEqual((11, 2), east((10, 2)) 
  Assert.AreEqual((0, 0), east((39, 0)) 
  Assert.AreEqual((1, 1), east((0, 1)) 
  Assert.AreEqual((0, 29), east((39, 29)) 
End Sub

Sub test_west
  Assert.AreEqual((2, 4), west((3, 4)) 
  Assert.AreEqual((38, 0), west((39, 0)) 
  Assert.AreEqual((39, 0), west((0, 0)) 
  Assert.AreEqual((39, 29), west((0, 29)) 
End Sub

Sub test_northEast
  Assert.AreEqual((4, 3), northEast((3, 4)) 
  Assert.AreEqual((1, 29), northEast((0, 0)) 
  Assert.AreEqual((0, 29), northEast((39, 0)) 
  Assert.AreEqual((1, 28), northEast((0, 29)) 
  Assert.AreEqual((0, 28), northEast((39, 29)) 
End Sub

Sub test_southEast
  Assert.AreEqual((4, 5), southEast((3, 4)) 
  Assert.AreEqual((1, 1), southEast((0, 0)) 
  Assert.AreEqual((0, 1), southEast((39, 0)) 
  Assert.AreEqual((1, 0), southEast((0, 29)) 
  Assert.AreEqual((0, 0), southEast((39, 29)) 
End Sub

Sub test_northWest
  Assert.AreEqual((2, 3), northWest((3, 4)) 
  Assert.AreEqual((39, 29), northWest((0, 0)) 
  Assert.AreEqual((38, 29), northWest((39, 0)) 
  Assert.AreEqual((39, 28), northWest((0, 29)) 
  Assert.AreEqual((38, 28), northWest((39, 29)) 
End Sub

Sub test_southWest
  Assert.AreEqual((2, 5), southWest((3, 4)) 
  Assert.AreEqual((39, 1), southWest((0, 0)) 
  Assert.AreEqual((38, 1), southWest((39, 0)) 
  Assert.AreEqual((39, 0), southWest((0, 29)) 
  Assert.AreEqual((38, 0), southWest((39, 29)) 
End Sub

Sub test_blackOrWhite
  Assert.AreEqual(black, blackOrWhite(0) 
  Assert.AreEqual(black, blackOrWhite(0.499) 
  Assert.AreEqual(black, blackOrWhite(0.5) 
  Assert.AreEqual(white, blackOrWhite(0.501) 
  Assert.AreEqual(white, blackOrWhite(1) 
End Sub

[ghosted] Sub test_neighbourCells
  Assert.AreEqual({(2, 3), 3, 3, 4, 3, 2, 4, 4, 4, 2, 5, 3, 5, 4, 5}, neighbourCells(3, 4) 
End Sub

Sub test_willLive
  Assert.AreEqual(False, willLive(white, 0) 
  Assert.AreEqual(False, willLive(white, 1) 
  Assert.AreEqual(False, willLive(white, 2) 
  Assert.AreEqual(True, willLive(white, 3) 
  Assert.AreEqual(False, willLive(white, 4) 
  Assert.AreEqual(False, willLive(white, 5) 
  Assert.AreEqual(False, willLive(white, 6) 
  Assert.AreEqual(False, willLive(white, 7) 
  Assert.AreEqual(False, willLive(white, 8) 
  Assert.AreEqual(False, willLive(black, 0) 
  Assert.AreEqual(False, willLive(black, 1) 
  Assert.AreEqual(True, willLive(black, 2) 
  Assert.AreEqual(True, willLive(black, 3) 
  Assert.AreEqual(False, willLive(black, 4) 
  Assert.AreEqual(False, willLive(black, 5) 
  Assert.AreEqual(False, willLive(black, 6) 
  Assert.AreEqual(False, willLive(black, 7) 
  Assert.AreEqual(False, willLive(black, 8) 
End Sub
