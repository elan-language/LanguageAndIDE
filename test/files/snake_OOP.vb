' VB.NET with Elan 2.0.0-beta5

' Use the W,A,S,D keys to change Snake direction

Const width = 40

Const height = 30

Sub main()
  Dim game = New Game() ' variable definition
  While game.isOn
    game.clockTick(getKey()) ' procedure call
    Dim blocks = New BlockGraphics() ' variable definition
    game.updateBlocks(blocks) ' procedure call
    displayBlockGraphics(blocks) ' procedure call
    sleep_ms(150) ' procedure call
  End While
  Console.WriteLine($"Game Over! Score: {game.score()}") ' print statement
End Sub

Class Game

  Sub New()
    Me.snake = New Snake(620) ' assignment
    Me.currentDir = "d" ' assignment
    Me.newAppleNeeded = True ' assignment
    Me.isOn = True ' assignment
  End Sub

  Private Property snake As Snake

  Private Property currentDir As String

  Private Property apple As Integer

  Private Property newAppleNeeded As Boolean

  Property isOn As Boolean

  Sub newAppleIfNeeded() ' procedure method
    While Me.newAppleNeeded Or Me.snake.bodyCovers(Me.apple)
      Me.apple = randint(0, width*height - 1) ' assignment
      Me.newAppleNeeded = False ' assignment
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
    If snake.dead Then
      Me.isOn = False ' assignment
    End If
  End Sub

  Sub updateBlocks(blocks As BlockGraphics) ' procedure method
    '  TODO 3502
    Dim snake = Me.snake ' variable definition
    snake.addToBlocks(blocks) ' procedure call
    blocks.putBlockNo(Me.apple, red) ' procedure call
  End Sub

  Sub setDirectionIfKeyPress(key As String) ' procedure method
    If Not key.equals("") And "wasd".contains(key) Then
      Me.currentDir = key ' assignment
    End If
  End Sub

  Function score() As Integer
    Return Me.snake.length() - 1
  End Function

  Function toString() As String
    Return "undefined"
  End Function

End Class

Class Snake

  Sub New(head As Integer)
    Me.head = head ' assignment
    Me.body = {Me.head - 1, Me.head} ' assignment
  End Sub

  Property head As Integer

  Private Property body As List(Of Integer)

  Property dead As Boolean

  Sub moveHead(dir As String) ' procedure method
    Dim newCol = Me.head Mod width ' variable definition
    Dim newRow = divAsInt(Me.head, width) ' variable definition
    If dir.equals("w") Then
      newRow = newRow - 1 ' assignment
    ElseIf dir.equals("a") Then
      newCol = newCol - 1 ' assignment
    ElseIf dir.equals("s") Then
      newRow = newRow + 1 ' assignment
    ElseIf dir.equals("d") Then
      newCol = newCol + 1 ' assignment
    End If
    Me.head = -1 ' assignment
    If (newCol >= 0) And (newCol < width) And (newRow >= 0) And (newRow < height) Then
      Me.head = newRow*width + newCol ' assignment
    End If
    If (Me.head = -1) Or Me.body.contains(Me.head) Then
      Me.dead = True ' assignment
    Else
      '  3502
      Dim body = Me.body ' variable definition
      body.append(Me.head) ' procedure call
    End If
  End Sub

  Sub moveTail() ' procedure method
    ' 3502
    Dim body = Me.body ' variable definition
    body.removeAt(0) ' procedure call
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
    Return $"a Snake"
  End Function

End Class
