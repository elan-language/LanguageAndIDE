' VB.NET with Elan 2.0.0-beta5

Sub main()
  Dim head = 620 ' variable definition
  Dim snake = {619, head} ' variable definition
  Dim direction = "d" ' variable definition
  Dim apple = -1 ' variable definition
  Dim gameOn = True ' variable definition
  While gameOn
    While (apple = -1) Or snake.contains(apple)
      apple = randint(0, 1200) ' assignment
    End While
    display(snake, apple) ' procedure call
    sleep_ms(150) ' procedure call
    Dim key = getKey().lowerCase() ' variable definition
    If isValid(key) Then
      direction = key ' assignment
    End If
    head = getAdjacentBlock(head, direction) ' assignment
    If (head = -1) Or snake.contains(head) Then
      gameOn = False ' assignment
    End If
    snake.append(head) ' procedure call
    If head.equals(apple) Then
      apple = -1 ' assignment
    Else
      snake.removeAt(0) ' procedure call
    End If
  End While
  Console.WriteLine($"Game Over! Score: {snake.length() - 2}") ' print statement
End Sub

Sub display(snake As List(Of Integer), apple As Integer) ' procedure
  Dim bg = New BlockGraphics() ' variable definition
  For Each segment In snake
    bg.putBlockNo(segment, green) ' procedure call
  Next segment
  bg.putBlockNo(apple, red) ' procedure call
  displayBlockGraphics(bg) ' procedure call
End Sub

Function isValid(key As String) As Boolean
  Return (Not key.equals("")) And ("wasd".contains(key))
End Function

Function getAdjacentBlock(block As Integer, direction As String) As Integer
  Dim adj = -1 ' variable definition
  If direction.equals("d") And ((block Mod 40) < 39) Then
    adj = block + 1 ' assignment
  ElseIf direction.equals("s") And (block < 1160) Then
    adj = block + 40 ' assignment
  ElseIf direction.equals("w") And (block > 39) Then
    adj = block - 40 ' assignment
  ElseIf direction.equals("a") And ((block Mod 40) > 0) Then
    adj = block - 1 ' assignment
  End If
  Return adj
End Function

<TestClass Class Test_getAdjacentBlock
 <TestMethod> Sub test_getAdjacentBlock()
  Assert.AreEqual(581, getAdjacentBlock(621, "w"))
  Assert.AreEqual(620, getAdjacentBlock(621, "a"))
  Assert.AreEqual(661, getAdjacentBlock(621, "s"))
  Assert.AreEqual(622, getAdjacentBlock(621, "d"))
  Assert.AreEqual(-1, getAdjacentBlock(119, "d"))
  Assert.AreEqual(-1, getAdjacentBlock(600, "a"))
  Assert.AreEqual(-1, getAdjacentBlock(7, "w"))
  Assert.AreEqual(-1, getAdjacentBlock(1190, "s"))
 End Sub
End Class

