' VB.NET with Elan 2.0.0-beta4

' Use the W,A,S,D keys to change Snake direction

Sub main()
  Dim board = New Board() ' variable definition
  Dim game = New Game(board) ' variable definition
  While Not game.over()
    game.clockTick(getKey()) ' procedure call
    Dim blocks = New BlockGraphics() ' variable definition
    game.updateBlocks(blocks) ' procedure call
    displayBlockGraphics(blocks) ' procedure call
    sleep_ms(150) ' procedure call
  End While
  Console.WriteLine($"Game Over! Score: {game.score()}") ' print statement
End Sub

Class Game

  Sub New(board As Board)
    Me.board = board ' assignment
    Me.snake = New Snake(board) ' assignment
    Me.currentDir = Direction.right ' assignment
    Me.newAppleNeeded = True ' assignment
  End Sub

  Property board As Board

  Private Property snake As Snake

  Private Property currentDir As Direction

  Private Property apple As Integer

  Private Property newAppleNeeded As Boolean

  Sub newAppleIfNeeded() ' procedure method
    While Me.newAppleNeeded
      Me.apple = randint(0, Me.board.maxSquareNo()) ' assignment
      If Not Me.snake.bodyCovers(Me.apple) Then
        Me.newAppleNeeded = False ' assignment
      End If
    End While
  End Sub

  Sub clockTick(key As String) ' procedure method
    Me.newAppleIfNeeded() ' procedure call
    Me.setDirectionIfKeyPress(key) ' procedure call
    '  TODO 3502
    Dim snake = Me.snake ' variable definition
    snake.moveHead(Me.currentDir) ' procedure call
    If snake.bodyCovers(Me.apple) Then
      Me.newAppleNeeded = True ' assignment
    ElseIf Not snake.dead Then
      snake.moveTail() ' procedure call
    End If
  End Sub

  Sub updateBlocks(blocks As BlockGraphics) ' procedure method
    '  TODO 3502
    Dim snake = Me.snake ' variable definition
    snake.addToBlocks(blocks) ' procedure call
    blocks.putBlockNo(Me.apple, red) ' procedure call
  End Sub

  Sub setDirectionIfKeyPress(key As String) ' procedure method
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

  Function score() As Integer
    Return Me.snake.length() - 1
  End Function

  Function over() As Boolean
    Return Me.snake.dead
  End Function

  Function toString() As String
    Return "undefined"
  End Function

End Class

Class Snake

  Sub New(board As Board)
    Me.board = board ' assignment
    Me.body = {620, 619} ' assignment
  End Sub

  Private Property body As List(Of Integer)

  Property board As Board

  Property dead As Boolean

  Sub moveHead(dir As Direction) ' procedure method
    Dim head = Me.body(0) ' variable definition
    Dim col = Me.board.col(head) ' variable definition
    Dim row = Me.board.row(head) ' variable definition
    If dir = Direction.left Then
      col = col - 1 ' assignment
    ElseIf dir = Direction.right Then
      col = col + 1 ' assignment
    ElseIf dir = Direction.up Then
      row = row - 1 ' assignment
    ElseIf dir = Direction.down Then
      row = row + 1 ' assignment
    End If
    Dim newHead = Me.board.squareNo(col, row) ' variable definition
    Dim board = Me.board ' variable definition
    If Not Me.board.isInBounds(col, row) Or Me.body.contains(newHead) Then
      Me.dead = True ' assignment
    Else
      '  3502
      Dim body = Me.body ' variable definition
      body.prepend(newHead) ' procedure call
    End If
  End Sub

  Sub moveTail() ' procedure method
    ' 3502
    Dim body = Me.body ' variable definition
    body.removeAt(Me.length() - 1) ' procedure call
  End Sub

  Sub addToBlocks(blocks As BlockGraphics) ' procedure method
    For Each block In Me.body
      blocks.putBlockNo(block, green) ' procedure call
    Next block
  End Sub

  Function bodyCovers(sq As Integer) As Boolean
    Return Me.body.contains(sq)
  End Function

  Function length() As Integer
    Return Me.body.length()
  End Function

  Function toString() As String
    Return $"a Snake of length{Me.length()}"
  End Function

End Class

Class Board

  Sub New()
    Me.width = 40 ' assignment
    Me.height = 30 ' assignment
  End Sub

  Private Property width As Integer

  Private Property height As Integer

  Function squareNo(col As Integer, row As Integer) As Integer
    Return row*Me.width + col
  End Function

  Function maxSquareNo() As Integer
    Return Me.width*Me.height - 1
  End Function

  Function col(squareNo As Integer) As Integer
    Return squareNo Mod Me.width
  End Function

  Function row(squareNo As Integer) As Integer
    Return divAsInt(squareNo, Me.width)
  End Function

  Function isInBounds(col As Integer, row As Integer) As Boolean
    Return (col >= 0) And (col < Me.width) And (row >= 0) And (row < Me.height)
  End Function

  Function toString() As String
    Return "undefined"
  End Function

End Class

Enum Direction 
  up = 0
  down = 1
  left = 2
  right = 3
End Enum
