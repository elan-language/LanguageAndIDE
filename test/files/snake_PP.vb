' VB.NET with Elan 2.0.0-beta4

' Use the w,a,s,d keys to change snake's direction

Sub main()
  Dim blocks = New BlockGraphics() ' variable definition
  Dim head = 2015 ' variable definition
  Dim tail = head ' variable definition
  Dim body = {head} ' variable definition
  Dim currentDir = "d" ' variable definition
  Dim gameOn = True ' variable definition
  Dim apple = 0 ' variable definition
  Dim changeApplePosition = True ' variable definition
  While gameOn
    While changeApplePosition
      apple = squareNo(randint(0, 39), randint(0, 29)) ' assignment
      If Not body.contains(apple) Then
        changeApplePosition = False ' assignment
      End If
    End While
    updateDisplay(blocks, head, tail, body, apple) ' procedure call
    Dim key = getKey() ' variable definition
    If Not key.equals("") And "wasd".contains(key) Then
      currentDir = key ' assignment
    End If
    tail = body(0) ' assignment
    body.append(head) ' procedure call
    head = getAdjacentSquare(head, currentDir) ' assignment
    gameOn = Not hasHitEdge(head) And Not body.contains(head) ' assignment
    If head.equals(apple) Then
      changeApplePosition = True ' assignment
    Else
      body.removeAt(0) ' procedure call
    End If
    sleep_ms(150) ' procedure call
  End While
  Console.WriteLine($"Game Over! Score: {body.length() - 1}") ' print statement
End Sub

Sub updateDisplay(blocks As BlockGraphics, head As Integer, tail As Integer, body As List(Of Integer), apple As Integer) ' procedure
  blocks.put(x(head), y(head), green) ' procedure call
  Dim tailColour = getTailColour(tail, body) ' variable definition
  blocks.put(x(tail), y(tail), tailColour) ' procedure call
  blocks.put(x(apple), y(apple), red) ' procedure call
  blocks.display() ' procedure call
End Sub

Function getTailColour(tail As Integer, body As List(Of Integer)) As Integer
  Dim colour = white ' variable definition
  If body(0).equals(tail) Then
    colour = green ' assignment
  End If
  Return colour
End Function

Function hasHitEdge(head As Integer) As Boolean
  Dim headX = x(head) ' variable definition
  Dim headY = y(head) ' variable definition
  Return (headX < 0) Or (headY < 0) Or (headX > 39) Or (headY > 29)
End Function

Function getAdjacentSquare(sq As Integer, dir As String) As Integer
  Dim newX = x(sq) ' variable definition
  Dim newY = y(sq) ' variable definition
  If dir.equals("a") Then
    newX = newX - 1 ' assignment
  ElseIf dir.equals("d") Then
    newX = newX + 1 ' assignment
  ElseIf dir.equals("w") Then
    newY = newY - 1 ' assignment
  ElseIf dir.equals("s") Then
    newY = newY + 1 ' assignment
  End If
  Return squareNo(newX, newY)
End Function

Function squareNo(x As Integer, y As Integer) As Integer
  Return x*100 + y
End Function

Function x(sq As Integer) As Integer
  Return divAsInt(sq, 100)
End Function

Function y(sq As Integer) As Integer
  Return sq Mod 100
End Function

<TestClass Class Test_square
 <TestMethod> Sub test_square()
  Assert.AreEqual(0, squareNo(0, 0))
  Assert.AreEqual(3929, squareNo(39, 29))
  Assert.AreEqual(-85, squareNo(-1, 15))
  Assert.AreEqual(1499, squareNo(15, -1))
 End Sub
End Class


<TestClass Class Test_y
 <TestMethod> Sub test_y()
  Assert.AreEqual(0, y(0500))
  Assert.AreEqual(7, y(0507))
  Assert.AreEqual(-9, y(-0109))
  Assert.AreEqual(99, y(1499))
 End Sub
End Class


<TestClass Class Test_x
 <TestMethod> Sub test_x()
  Assert.AreEqual(0, x(0015))
  Assert.AreEqual(5, x(0500))
  Assert.AreEqual(5, x(0507))
  Assert.AreEqual(-2, x(-0109))
 End Sub
End Class


<TestClass Class Test_getTailColour
 <TestMethod> Sub test_getTailColour()
  Assert.AreEqual(green, getTailColour(0304, {0304, 0305}))
  Assert.AreEqual(white, getTailColour(0304, {0305, 0306}))
 End Sub
End Class


<TestClass Class Test_hasHitEdge
 <TestMethod> Sub test_hasHitEdge()
  Assert.AreEqual(False, hasHitEdge(0000))
  Assert.AreEqual(False, hasHitEdge(0029))
  Assert.AreEqual(False, hasHitEdge(3900))
  Assert.AreEqual(False, hasHitEdge(3929))
  Assert.AreEqual(True, hasHitEdge(-0105))
  Assert.AreEqual(True, hasHitEdge(0530))
  Assert.AreEqual(True, hasHitEdge(4005))
  Assert.AreEqual(True, hasHitEdge(0499))
  Assert.AreEqual(True, hasHitEdge(1499))
  Assert.AreEqual(True, hasHitEdge(-85))
 End Sub
End Class


<TestClass Class Test_getAdjacentSquare
 <TestMethod> Sub test_getAdjacentSquare()
  Dim sq = 2015 ' variable definition
  Assert.AreEqual(2014, getAdjacentSquare(sq, "w"))
  Assert.AreEqual(2016, getAdjacentSquare(sq, "s"))
  Assert.AreEqual(1915, getAdjacentSquare(sq, "a"))
  Assert.AreEqual(2115, getAdjacentSquare(sq, "d"))
  ' boundary
  Assert.AreEqual(-85, getAdjacentSquare(0015, "a"))
 End Sub
End Class

