' VB.NET with Elan 2.0.0-beta4

' Use the w,a,s,d keys to change snake's direction

Const width = 40

Const height = 30

Sub main()
  Dim bg = New BlockGraphics() ' variable definition
  Dim head = 621 ' variable definition
  Dim snake = {head - 1, head} ' variable definition
  Dim currentDir = "d" ' variable definition
  Dim gameOn = True ' variable definition
  Dim apple = -1 ' variable definition
  While gameOn
    While (apple = -1) Or snake.contains(apple)
      apple = randint(0, width*height) ' assignment
    End While
    updateDisplay(bg, snake, apple) ' procedure call
    Dim key = getKey() ' variable definition
    If Not key.equals("") And "wasd".contains(key) Then
      currentDir = key ' assignment
    End If
    head = getAdjacentBlock(head, currentDir) ' assignment
    If (head = -1) Or snake.contains(head) Then
      gameOn = False ' assignment
    Else
      snake.append(head) ' procedure call
    End If
    If head.equals(apple) Then
      apple = -1 ' assignment
    Else
      snake.removeAt(0) ' procedure call
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

Function getAdjacentBlock(bl As Integer, dir As String) As Integer
  Dim adj = -1 ' variable definition
  Dim newCol = bl Mod width ' variable definition
  Dim newRow = divAsInt(bl, width) ' variable definition
  If dir.equals("w") Then
    newRow = newRow - 1 ' assignment
  ElseIf dir.equals("a") Then
    newCol = newCol - 1 ' assignment
  ElseIf dir.equals("s") Then
    newRow = newRow + 1 ' assignment
  ElseIf dir.equals("d") Then
    newCol = newCol + 1 ' assignment
  End If
  If (newCol >= 0) And (newCol < width) And (newRow >= 0) And (newRow < height) Then
    adj = newRow*width + newCol ' assignment
  End If
  Return adj
End Function

<TestClass Class Test_getAdjacentBlock
 <TestMethod> Sub test_getAdjacentBlock()
  Dim bl = 617 ' variable definition
  Assert.AreEqual(577, getAdjacentBlock(bl, "w"))
  Assert.AreEqual(616, getAdjacentBlock(bl, "a"))
  Assert.AreEqual(657, getAdjacentBlock(bl, "s"))
  Assert.AreEqual(618, getAdjacentBlock(bl, "d"))
  ' boundary
  Assert.AreEqual(-1, getAdjacentBlock(20, "w"))
  Assert.AreEqual(-1, getAdjacentBlock(40, "a"))
  Assert.AreEqual(-1, getAdjacentBlock(1180, "s"))
  Assert.AreEqual(-1, getAdjacentBlock(79, "d"))
 End Sub
End Class

