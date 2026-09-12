' VB.NET with Elan 2.0.0-beta4

' Use the w,a,s,d keys to change snake's direction

Sub main()
  Dim bg = New BlockGraphics() ' variable definition
  Dim head = 620 ' variable definition
  Dim snake = {head, 619} ' variable definition
  Dim currentDir = "d" ' variable definition
  Dim gameOn = True ' variable definition
  Dim apple = 0 ' variable definition
  Dim newApple = True ' variable definition
  While gameOn
    While newApple
      apple = bg.blockNo(randint(0, 39), randint(0, 29)) ' assignment
      If Not snake.contains(apple) Then
        newApple = False ' assignment
      End If
    End While
    updateDisplay(bg, snake, apple) ' procedure call
    Dim key = getKey() ' variable definition
    If Not key.equals("") And "wasd".contains(key) Then
      currentDir = key ' assignment
    End If
    head = getAdjacentBlock(head, currentDir, bg) ' assignment
    If (head = -1) Or snake.contains(head) Then
      gameOn = False ' assignment
    Else
      snake.prepend(head) ' procedure call
    End If
    If head.equals(apple) Then
      newApple = True ' assignment
    Else
      snake.removeAt(snake.length() - 1) ' procedure call
    End If
    sleep_ms(150) ' procedure call
  End While
  Console.WriteLine($"Game Over! Score: {snake.length() - 1}") ' print statement
End Sub

Sub updateDisplay(bg As BlockGraphics, snake As List(Of Integer), apple As Integer) ' procedure
  bg.colourAll(white) ' procedure call
  For Each bl In snake
    bg.putBlockNo(bl, green) ' procedure call
  Next bl
  bg.putBlockNo(apple, red) ' procedure call
  displayBlockGraphics(bg) ' procedure call
End Sub

Function getAdjacentBlock(bl As Integer, dir As String, bg As BlockGraphics) As Integer
  Dim newCol = bg.col(bl) ' variable definition
  Dim newRow = bg.row(bl) ' variable definition
  If dir.equals("a") Then
    newCol = newCol - 1 ' assignment
  ElseIf dir.equals("d") Then
    newCol = newCol + 1 ' assignment
  ElseIf dir.equals("w") Then
    newRow = newRow - 1 ' assignment
  ElseIf dir.equals("s") Then
    newRow = newRow + 1 ' assignment
  End If
  Return bg.blockNo(newCol, newRow)
End Function

<TestClass Class Test_getAdjacentBlock
 <TestMethod> Sub test_getAdjacentBlock()
  Dim bg = New BlockGraphics() ' variable definition
  Dim bl = 617 ' variable definition
  Assert.AreEqual(577, getAdjacentBlock(bl, "w", bg))
  Assert.AreEqual(657, getAdjacentBlock(bl, "s", bg))
  Assert.AreEqual(616, getAdjacentBlock(bl, "a", bg))
  Assert.AreEqual(618, getAdjacentBlock(bl, "d", bg))
  ' boundary
  Assert.AreEqual(-1, getAdjacentBlock(20, "w", bg))
  Assert.AreEqual(-1, getAdjacentBlock(1180, "s", bg))
  Assert.AreEqual(-1, getAdjacentBlock(40, "a", bg))
  Assert.AreEqual(-1, getAdjacentBlock(79, "d", bg))
 End Sub
End Class

