' VB.NET with Elan 2.0.0-beta5

Sub main()
  Dim head = 621 ' variable definition
  Dim snake = {617, 618, 619, 620, head} ' variable definition
  Dim direction = "d" ' variable definition
  Dim gameOn = True ' variable definition
  Dim apple = -1 ' variable definition
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
    If head = -1 Then
      gameOn = False ' assignment
    End If
    If head.equals(apple) Then
      apple = -1 ' assignment
    Else
      snake.removeAt(0) ' procedure call
    End If
    snake.append(head) ' procedure call
  End While
End Sub

Function isValid(key As String) As Boolean
  Return (Not key.equals("")) And ("wasd".contains(key))
End Function

<TestClass Class Test_isValid
 <TestMethod> Sub test_isValid()
  Assert.AreEqual(True, isValid("w"))
  Assert.AreEqual(False, isValid(""))
  Assert.AreEqual(False, isValid("x"))
 End Sub
End Class


Function getAdjacentBlock(bl As Integer, direction As String) As Integer
  Dim adj = -1 ' variable definition
  If direction.equals("d") And ((bl Mod 40) < 39) Then
    adj = bl + 1 ' assignment
  ElseIf direction.equals("s") And (bl < 1160) Then
    adj = bl + 40 ' assignment
  ElseIf direction.equals("w") And (bl > 39) Then
    adj = bl - 40 ' assignment
  ElseIf direction.equals("a") And ((bl Mod 40) > 0) Then
    adj = bl - 1 ' assignment
  End If
  Return adj
End Function

<TestClass Class Test_getAdjacentBlock
 <TestMethod> Sub test_getAdjacentBlock()
  Assert.AreEqual(-1, getAdjacentBlock(119, "d"))
  Assert.AreEqual(-1, getAdjacentBlock(600, "a"))
  Assert.AreEqual(-1, getAdjacentBlock(7, "w"))
  Assert.AreEqual(-1, getAdjacentBlock(1190, "s"))
 End Sub
End Class


Sub display(snake As List(Of Integer), apple As Integer) ' procedure
  Dim bg = New BlockGraphics() ' variable definition
  For Each segment In snake
    bg.putBlockNo(segment, green) ' procedure call
  Next segment
  bg.putBlockNo(apple, red) ' procedure call
  displayBlockGraphics(bg) ' procedure call
End Sub
