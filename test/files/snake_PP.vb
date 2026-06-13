' VB.NET with Elan 2.0.0-beta

' Use the w,a,s,d keys to change snake's direction

Sub main()
  Dim blocks = createBlockGraphics(white) ' variable definition
  Dim head = {20, 15} ' variable definition
  Dim tail = head ' variable definition
  Dim body = {head} ' variable definition
  Dim currentDir = Direction.right ' variable definition
  Dim gameOn = True ' variable definition
  Dim apple = {0, 0} ' variable definition
  setAppleToRandomPosition(apple, body) ' call procedure
  While gameOn
    updateDisplay(blocks, head, tail, body, apple) ' call procedure
    Dim currentDirRef = New AsRef(Of Direction)(currentDir) ' variable definition
    Dim headRef = New AsRef(Of List(Of Integer))(head) ' variable definition
    Dim tailRef = New AsRef(Of List(Of Integer))(tail) ' variable definition
    updateSnake(currentDirRef, tailRef, headRef, body) ' call procedure
    head = headRef.value() ' reassign variable
    tail = tailRef.value() ' reassign variable
    currentDir = currentDirRef.value() ' reassign variable
    gameOn = Not hasHitEdge(head[0], head[1]) And Not body.contains(head) ' reassign variable
    If head.equals(apple) Then
      setAppleToRandomPosition(apple, body) ' call procedure
    Else
      body.removeAt(0) ' call procedure
    End If
    sleep_ms(150) ' call procedure
  End While
  Console.WriteLine($"Game Over! Score: {body.length() - 1}") ' print
End Sub

Sub updateSnake(currentDirRef As AsRef(Of Direction), tailRef As AsRef(Of List(Of Integer)), headRef As AsRef(Of List(Of Integer)), body As List(Of List(Of Integer))) ' procedure
  Dim head = headRef.value() ' variable definition
  Dim tail = tailRef.value() ' variable definition
  Dim currentDir = currentDirRef.value() ' variable definition
  currentDir = directionByKey(currentDir, getKey()) ' reassign variable
  tailRef.set(body[0]) ' call procedure
  body.append(head) ' call procedure
  headRef.set(getAdjacentSquare(head, currentDir)) ' call procedure
  currentDirRef.set(currentDir) ' call procedure
End Sub

Sub updateDisplay(blocks As List(Of List(Of Integer)), head As List(Of Integer), tail As List(Of Integer), body As List(Of List(Of Integer)), apple As List(Of Integer)) ' procedure
  blocks[head[0]][head[1]] = green ' reassign variable
  Dim tailColour = getTailColour(tail, body) ' variable definition
  blocks[tail[0]][tail[1]] = tailColour ' reassign variable
  blocks[apple[0]][apple[1]] = red ' reassign variable
  displayBlocks(blocks) ' call procedure
End Sub

Sub setAppleToRandomPosition(apple As List(Of Integer), body As List(Of List(Of Integer))) ' procedure
  Dim changePosition = True ' variable definition
  While changePosition
    apple[0] = randint(0, 39) ' reassign variable
    apple[1] = randint(0, 29) ' reassign variable
    If Not body.contains(apple) Then
      changePosition = False ' reassign variable
    End If
  End While
End Sub

Function getTailColour(tail As List(Of Integer), body As List(Of List(Of Integer))) As Integer
  Dim colour = white ' variable definition
  If body[0].equals(tail) Then
    colour = green ' reassign variable
  End If
  Return colour
End Function

Function hasHitEdge(headX As Integer, headY As Integer) As Boolean
  Return (headX < 0) Or (headY < 0) Or (headX > 39) Or (headY > 29)
End Function

Function getAdjacentSquare(sq As List(Of Integer), dir As Direction) As List(Of Integer)
  Dim newX = sq[0] ' variable definition
  Dim newY = sq[1] ' variable definition
  If dir = Direction.left Then
    newX = newX - 1 ' reassign variable
  ElseIf dir = Direction.right Then
    newX = newX + 1 ' reassign variable
  ElseIf dir = Direction.up Then
    newY = newY - 1 ' reassign variable
  ElseIf dir = Direction.down Then
    newY = newY + 1 ' reassign variable
  End If
  Return {newX, newY}
End Function

Function directionByKey(current As Direction, key As String) As Direction
  Dim dirn = current ' variable definition
  Dim d = ["w":Direction.up, "s":Direction.down, "a":Direction.left, "d":Direction.right] ' variable definition
  If d.keys().contains(key) Then
    dirn = d[key] ' reassign variable
  End If
  Return dirn
End Function

Enum Direction 
  up = 0
  down = 1
  left = 2
  right = 3
End Enum

<TestMethod> Sub test_getTailColour()
  Assert.AreEqual(green, getTailColour({3, 4}, {{3, 4}, {3, 5}}))
  Assert.AreEqual(white, getTailColour({3, 4}, {{3, 5}, {3, 6}}))
End Sub

<TestMethod> Sub test_hasHitEdge()
  Assert.AreEqual(False, hasHitEdge(0, 0))
  Assert.AreEqual(False, hasHitEdge(0, 29))
  Assert.AreEqual(False, hasHitEdge(39, 0))
  Assert.AreEqual(False, hasHitEdge(29, 29))
  Assert.AreEqual(True, hasHitEdge(-1, 5))
  Assert.AreEqual(True, hasHitEdge(5, 30))
  Assert.AreEqual(True, hasHitEdge(40, 5))
  Assert.AreEqual(True, hasHitEdge(5, -1))
End Sub

<TestMethod> Sub test_getAdjacentSquare()
  Dim sq = {20, 15} ' variable definition
  Assert.AreEqual({20, 14}, getAdjacentSquare(sq, Direction.up))
  Assert.AreEqual({20, 16}, getAdjacentSquare(sq, Direction.down))
  Assert.AreEqual({19, 15}, getAdjacentSquare(sq, Direction.left))
  Assert.AreEqual({21, 15}, getAdjacentSquare(sq, Direction.right))
  ' boundary
  Assert.AreEqual({-1, 15}, getAdjacentSquare({0, 15}, Direction.left))
End Sub

<TestMethod> Sub test_directionByKey()
  Dim current = Direction.up ' variable definition
  Assert.AreEqual(Direction.up, directionByKey(current, ""))
  Assert.AreEqual(Direction.up, directionByKey(current, "x"))
  Assert.AreEqual(Direction.up, directionByKey(current, "w"))
  Assert.AreEqual(Direction.down, directionByKey(current, "s"))
  Assert.AreEqual(Direction.left, directionByKey(current, "a"))
  Assert.AreEqual(Direction.right, directionByKey(current, "d"))
  Assert.AreEqual(Direction.up, directionByKey(current, "D"))
End Sub
