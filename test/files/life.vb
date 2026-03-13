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
  assert north((3, 4)) is (3, 3) 
  assert north((39, 0)) is (39, 29) 
  assert north((0, 29)) is (0, 28) 
  assert north((39, 29)) is (39, 28) 
End Sub

Sub test_south
  assert south((3, 4)) is (3, 5) 
  assert south((39, 0)) is (39, 1) 
  assert south((0, 29)) is (0, 0) 
  assert south((39, 29)) is (39, 0) 
End Sub

Sub test_east
  assert east((10, 2)) is (11, 2) 
  assert east((39, 0)) is (0, 0) 
  assert east((0, 1)) is (1, 1) 
  assert east((39, 29)) is (0, 29) 
End Sub

Sub test_west
  assert west((3, 4)) is (2, 4) 
  assert west((39, 0)) is (38, 0) 
  assert west((0, 0)) is (39, 0) 
  assert west((0, 29)) is (39, 29) 
End Sub

Sub test_northEast
  assert northEast((3, 4)) is (4, 3) 
  assert northEast((0, 0)) is (1, 29) 
  assert northEast((39, 0)) is (0, 29) 
  assert northEast((0, 29)) is (1, 28) 
  assert northEast((39, 29)) is (0, 28) 
End Sub

Sub test_southEast
  assert southEast((3, 4)) is (4, 5) 
  assert southEast((0, 0)) is (1, 1) 
  assert southEast((39, 0)) is (0, 1) 
  assert southEast((0, 29)) is (1, 0) 
  assert southEast((39, 29)) is (0, 0) 
End Sub

Sub test_northWest
  assert northWest((3, 4)) is (2, 3) 
  assert northWest((0, 0)) is (39, 29) 
  assert northWest((39, 0)) is (38, 29) 
  assert northWest((0, 29)) is (39, 28) 
  assert northWest((39, 29)) is (38, 28) 
End Sub

Sub test_southWest
  assert southWest((3, 4)) is (2, 5) 
  assert southWest((0, 0)) is (39, 1) 
  assert southWest((39, 0)) is (38, 1) 
  assert southWest((0, 29)) is (39, 0) 
  assert southWest((39, 29)) is (38, 0) 
End Sub

Sub test_blackOrWhite
  assert blackOrWhite(0) is black 
  assert blackOrWhite(0.499) is black 
  assert blackOrWhite(0.5) is black 
  assert blackOrWhite(0.501) is white 
  assert blackOrWhite(1) is white 
End Sub

[ghosted] Sub test_neighbourCells
  assert neighbourCells(3, 4) is {(2, 3), 3, 3, 4, 3, 2, 4, 4, 4, 2, 5, 3, 5, 4, 5} 
End Sub

Sub test_willLive
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
End Sub
