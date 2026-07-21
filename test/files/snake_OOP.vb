' VB.NET with Elan 2.0.0-beta2

' Use the W,A,S,D keys to change Snake direction

Sub main()
  Dim blocks = createBlockGraphics(white) ' variable definition
  Dim snake = New Snake() ' variable definition
  Dim apple = New Apple() ' variable definition
  apple.newRandomPosition(snake) ' procedure call
  While Not snake.gameOver()
    snake.updateBlocks(blocks) ' procedure call
    apple.updateBlocks(blocks) ' procedure call
    displayBlocks(blocks) ' procedure call
    sleep_ms(150) ' procedure call
    snake.clockTick(getKey(), apple) ' procedure call
  End While
  Console.WriteLine($"Game Over! Score: {snake.score()}") ' print statement
End Sub

Class Snake

  Sub New()
    Dim tail = New Square(20, 15) ' variable definition
    Me.currentDir = Direction.right ' assignment
    Me.body = {tail} ' assignment
    Me.head = tail.getAdjacentSquare(Me.currentDir) ' assignment
    Me.priorTail = tail ' assignment
  End Sub

  Private Property currentDir As Direction

  Private Property head As Square

  Private Property body As List(Of Square)

  Private Property priorTail As Square

  Sub clockTick(key As String, apple As Apple) ' procedure method
    Me.setDirection(key) ' procedure call
    Me.priorTail = Me.body(0) ' assignment
    Dim body = Me.body ' variable definition
    body.append(Me.head) ' procedure call
    Me.head = Me.head.getAdjacentSquare(Me.currentDir) ' assignment
    If Me.head.equals(apple.location) Then
      apple.newRandomPosition(Me) ' procedure call
    Else
      Me.body = Me.body.subList(1, Me.body.length()) ' assignment
    End If
  End Sub

  Sub updateBlocks(blocks As List(Of List(Of Integer))) ' procedure method
    blocks(Me.head.x)(Me.head.y) = green ' assignment
    If Not Me.body(0).equals(Me.priorTail) Then
      blocks(Me.priorTail.x)(Me.priorTail.y) = white ' assignment
    End If
  End Sub

  Function score() As Integer
    Return Me.body.length() - 1
  End Function

  Function bodyCovers(sq As Square) As Boolean
    Dim result = False ' variable definition
    For Each seg In Me.body
      If (seg.equals(sq)) Then
        result = True ' assignment
      End If
    Next seg
    Return result
  End Function

  Function gameOver() As Boolean
    Return Me.bodyCovers(Me.head) Or Me.head.hasHitEdge()
  End Function

  Private Sub setDirection(key As String) ' private procedure method
    If key.equals("w") Then
      Me.currentDir = Direction.up ' assignment
    ElseIf key.equals("s") Then
      Me.currentDir = Direction.down ' assignment
    ElseIf key.equals("a") Then
      Me.currentDir = Direction.left ' assignment
    ElseIf key.equals("d") Then
      Me.currentDir = Direction.right ' assignment
    End If
  End Sub

  Function toString() As String
    Return $"a Snake with head at {Me.head}"
  End Function

End Class

Class Apple

  Sub New()
    Me.location = New Square(0, 0) ' assignment
  End Sub

  Property location As Square

  Sub newRandomPosition(snake As Snake) ' procedure method
    Dim changePosition = True ' variable definition
    While changePosition
      Dim ranX = randint(0, 39) ' variable definition
      Dim ranY = randint(0, 29) ' variable definition
      Me.location = New Square(ranX, ranY) ' assignment
      If Not snake.bodyCovers(Me.location) Then
        changePosition = False ' assignment
      End If
    End While
  End Sub

  Sub updateBlocks(blocks As List(Of List(Of Integer))) ' procedure method
    blocks(Me.location.x)(Me.location.y) = red ' assignment
  End Sub

  Function toString() As String
    Return $"an Apple at {Me.location}"
  End Function

End Class

Class Square

  Sub New(x As Integer, y As Integer)
    Me.x = x ' assignment
    Me.y = y ' assignment
  End Sub

  Property x As Integer

  Property y As Integer

  Function getAdjacentSquare(d As Direction) As Square
    Dim newX = Me.x ' variable definition
    Dim newY = Me.y ' variable definition
    If d = Direction.left Then
      newX = Me.x - 1 ' assignment
    ElseIf d = Direction.right Then
      newX = Me.x + 1 ' assignment
    ElseIf d = Direction.up Then
      newY = Me.y - 1 ' assignment
    ElseIf d = Direction.down Then
      newY = Me.y + 1 ' assignment
    End If
    Return New Square(newX, newY)
  End Function

  Function hasHitEdge() As Boolean
    Return (Me.x = -1) Or (Me.y = -1) Or (Me.x = 40) Or (Me.y = 30)
  End Function

  Function toString() As String
    Return "{this.x}, {this.y}"
  End Function

End Class

Enum Direction 
  up = 0
  down = 1
  left = 2
  right = 3
End Enum

<TestClass Class Test_snake
 <TestMethod> Sub test_snake()
  Dim snake = New Snake() ' variable definition
  ' bodyCovers
  Assert.AreEqual(True, snake.bodyCovers(New Square(20, 15)))
  Assert.AreEqual(False, snake.bodyCovers(New Square(21, 15)))
  ' gameOver, score - can only test test_for default - which is not thorough test
  Assert.AreEqual(False, snake.gameOver())
  Assert.AreEqual(0, snake.score())
 End Sub
End Class


<TestClass Class Test_apple
 <TestMethod> Sub test_apple()
  ' no tests
 End Sub
End Class


<TestClass Class Test_square
 <TestMethod> Sub test_square()
  ' constructor - not testable as properties are private
  ' getAdjacentSquare
  Dim sq1 = New Square(3, 4) ' variable definition
  Assert.AreEqual(New Square(3, 3), sq1.getAdjacentSquare(Direction.up))
  Assert.AreEqual(New Square(3, 5), sq1.getAdjacentSquare(Direction.down))
  Assert.AreEqual(New Square(2, 4), sq1.getAdjacentSquare(Direction.left))
  Assert.AreEqual(New Square(4, 4), sq1.getAdjacentSquare(Direction.right))
  Dim sq2 = New Square(0, 0) ' variable definition
  Dim sq3 = New Square(-1, 0) ' variable definition
  Assert.AreEqual(sq3, sq2.getAdjacentSquare(Direction.left))
  ' hasHitEdge
  Assert.AreEqual(False, (New Square(0, 0)).hasHitEdge())
  Assert.AreEqual(False, (New Square(39, 20)).hasHitEdge())
  Assert.AreEqual(True, (New Square(-1, 3)).hasHitEdge())
  Assert.AreEqual(True, (New Square(3, -1)).hasHitEdge())
  Assert.AreEqual(True, (New Square(40, 3)).hasHitEdge())
  Assert.AreEqual(True, (New Square(3, 30)).hasHitEdge())
 End Sub
End Class

