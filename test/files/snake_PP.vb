' VB.NET with Elan 2.0.0-alpha4

' Use the w,a,s,d keys to change snake's direction

Sub main()
  Dim blocks = createBlockGraphics(white) ' variable definition
  Dim head = {20, 15} ' variable definition
  Dim tail = head ' variable definition
  Dim body = {head} ' variable definition
  Dim currentDir = "right" ' variable definition
  Dim gameOn = True ' variable definition
  Dim apple = {0, 0} ' variable definition
  setAppleToRandomPosition(apple, body) ' call procedure
  While gameOn
    updateDisplay(blocks, head, tail, body, apple) ' call procedure
    Dim currentDirRef = New AsRef(Of String)(currentDir) ' variable definition
    Dim headRef = New AsRef(Of List(Of Integer))(head) ' variable definition
    Dim tailRef = New AsRef(Of List(Of Integer))(tail) ' variable definition
    updateSnake(currentDirRef, tailRef, headRef, body) ' call procedure
    head = headRef.value() ' re-assign variable
    tail = tailRef.value() ' re-assign variable
    currentDir = currentDirRef.value() ' re-assign variable
    gameOn = Not hasHitEdge(head[0], head[1]) And Not body.contains(head) ' re-assign variable
    If head.equals(apple) Then
      setAppleToRandomPosition(apple, body) ' call procedure
    Else
      body.removeAt(0) ' call procedure
    End If
    sleep_ms(150) ' call procedure
  End While
  print($"Game Over! Score: {body.length() - 1}")
End Sub

Sub updateSnake(currentDirRef As AsRef(Of String), tailRef As AsRef(Of List(Of Integer)), headRef As AsRef(Of List(Of Integer)), body As List(Of List(Of Integer))) ' procedure
  Dim head = headRef.value() ' variable definition
  Dim tail = tailRef.value() ' variable definition
  Dim currentDir = currentDirRef.value() ' variable definition
  currentDir = directionByKey(currentDir, getKey()) ' re-assign variable
  tailRef.set(body[0]) ' call procedure
  body.append(head) ' call procedure
  headRef.set(getAdjacentSquare(head, currentDir)) ' call procedure
  currentDirRef.set(currentDir) ' call procedure
End Sub

Sub updateDisplay(blocks As List(Of List(Of Integer)), head As List(Of Integer), tail As List(Of Integer), body As List(Of List(Of Integer)), apple As List(Of Integer)) ' procedure
  blocks[head[0]][head[1]] = green ' re-assign variable
  Dim tailColour = getTailColour(tail, body) ' variable definition
  blocks[tail[0]][tail[1]] = tailColour ' re-assign variable
  blocks[apple[0]][apple[1]] = red ' re-assign variable
  displayBlocks(blocks) ' call procedure
End Sub

Sub setAppleToRandomPosition(apple As List(Of Integer), body As List(Of List(Of Integer))) ' procedure
  Dim changePosition = True ' variable definition
  While changePosition
    apple[0] = randint(0, 39) ' re-assign variable
    apple[1] = randint(0, 29) ' re-assign variable
    If Not body.contains(apple) Then
      changePosition = False ' re-assign variable
    End If
  End While
End Sub

Function getTailColour(tail As List(Of Integer), body As List(Of List(Of Integer))) As Integer
  Dim colour = white ' variable definition
  If body[0].equals(tail) Then
    colour = green ' re-assign variable
  End If
  Return colour
End Function

Function hasHitEdge(headX As Integer, headY As Integer) As Boolean
  Return (headX < 0) Or (headY < 0) Or (headX > 39) Or (headY > 29)
End Function

Function getAdjacentSquare(sq As List(Of Integer), dir As String) As List(Of Integer)
  Dim newX = sq[0] ' variable definition
  Dim newY = sq[1] ' variable definition
  If dir.equals("left") Then
    newX = newX - 1 ' re-assign variable
  ElseIf dir.equals("right") Then
    newX = newX + 1 ' re-assign variable
  ElseIf dir.equals("up") Then
    newY = newY - 1 ' re-assign variable
  ElseIf dir.equals("down") Then
    newY = newY + 1 ' re-assign variable
  End If
  Return {newX, newY}
End Function

Function directionByKey(current As String, key As String) As String
  Dim dirn = current ' variable definition
  Dim d = ["w":"up", "s":"down", "a":"left", "d":"right"] ' variable definition
  If d.keys().contains(key) Then
    dirn = d[key] ' re-assign variable
  End If
  Return dirn
End Function

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
  Assert.AreEqual({20, 14}, getAdjacentSquare(sq, "up"))
  Assert.AreEqual({20, 16}, getAdjacentSquare(sq, "down"))
  Assert.AreEqual({19, 15}, getAdjacentSquare(sq, "left"))
  Assert.AreEqual({21, 15}, getAdjacentSquare(sq, "right"))
  ' boundary
  Assert.AreEqual({-1, 15}, getAdjacentSquare({0, 15}, "left"))
End Sub

<TestMethod> Sub test_directionByKey()
  Dim current = "up" ' variable definition
  Assert.AreEqual("up", directionByKey(current, ""))
  Assert.AreEqual("up", directionByKey(current, "x"))
  Assert.AreEqual("up", directionByKey(current, "w"))
  Assert.AreEqual("down", directionByKey(current, "s"))
  Assert.AreEqual("left", directionByKey(current, "a"))
  Assert.AreEqual("right", directionByKey(current, "d"))
  Assert.AreEqual("up", directionByKey(current, "D"))
End Sub
