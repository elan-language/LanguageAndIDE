' VB.NET with Elan 2.0.0-beta5

' Use the W,A,S,D keys to change Snake direction

Const width = 40

Const height = 30

Sub main()
  Dim rnd = New Random() ' variable definition
  rnd.initialiseFromClock() ' procedure call
  Dim game = New Game(rnd) ' variable definition
  While game.isOn
    game = if_(game.apple = -1, withNewApple(game), game) ' assignment
    Dim blocks = New BlockGraphics() ' variable definition
    blocks = updateGraphics(game, blocks) ' assignment
    displayBlockGraphics(blocks) ' procedure call
    sleep_ms(150) ' procedure call
    game = clockTick(game, getKey()) ' assignment
  End While
  Console.WriteLine($"Game Over! Score: {score(game)}") ' print statement
End Sub

Function clockTick(g As Game, k As String) As Game
  Dim g2 = if_(k.equals(""), g, g.with_key(k)) ' variable definition
  Dim g3 = moveSnake(g2) ' variable definition
  Dim g4 = eatAppleIfPoss(g3) ' variable definition
  Return if_(gameOver(g4), g4.with_isOn(False), g4)
End Function

Function updateGraphics(g As Game, bg As BlockGraphics) As BlockGraphics
  Dim bg2 = g.body.reduce(bg, Function (b As BlockGraphics, bl As Integer) b.withPutBlockNo(bl, green)) ' variable definition
  Return bg2.withPutBlockNo(g.apple, red)
End Function

Function score(g As Game) As Integer
  Return g.body.length() - 1
End Function

Function moveSnake(g As Game) As Game
  Dim k = g.key ' variable definition
  Dim col = g.head Mod width ' variable definition
  Dim row = divAsInt(g.head, width) ' variable definition
  Dim newCol = if_(k.equals("a"), col - 1, if_(k.equals("d"), col + 1, col)) ' variable definition
  Dim newRow = if_(k.equals("w"), row - 1, if_(k.equals("s"), row + 1, row)) ' variable definition
  Dim inBounds = (newCol >= 0) And (newCol < width) And (newRow >= 0) And (newRow < height) ' variable definition
  Dim newHead = if_(inBounds, newRow*width + newCol, -1) ' variable definition
  Return if_((newHead = -1) Or selfCollision(newHead, g), g.with_isOn(False), g.with_body(g.body.withAppend(newHead)).with_head(newHead))
End Function

Function eatAppleIfPoss(g As Game) As Game
  Return if_(headOverApple(g), withNewApple(g), g.with_body(g.body.withRemoveAt(0)))
End Function

Function headOverApple(g As Game) As Boolean
  Return g.head.equals(g.apple)
End Function

Function gameOver(g As Game) As Boolean
  ' TODO not currently checking for self-collision
  Return hasHitEdge(g)
End Function

Function selfCollision(newHead As Integer, g As Game) As Boolean
  Return g.body.contains(newHead)
End Function

Function hasHitEdge(g As Game) As Boolean
  Return g.head = -1
End Function

Function appleIsUnderBody(g As Game) As Boolean
  Return g.body.contains(g.apple)
End Function

Function withNewApple(g As Game) As Game
  Dim apple2 = g.rnd.asInt(0, width*height - 1) ' variable definition
  Dim rnd2 = g.rnd.nextGen() ' variable definition
  Dim g2 = g.with_apple(apple2).with_rnd(rnd2) ' variable definition
  Return if_(Not appleIsUnderBody(g2), g2, withNewApple(g))
End Function

Class Game

  Sub New(rnd As Random)
    Me.head = 620 ' assignment
    Me.body = {Me.head - 1, Me.head} ' assignment
    Me.key = "d" ' assignment
    Me.isOn = True ' assignment
    Me.apple = -1 ' assignment
    Me.rnd = rnd ' assignment
  End Sub

  Property head As Integer

  Property body As List(Of Integer)

  Property apple As Integer

  Property isOn As Boolean

  Property rnd As Random

  Property key As String

  Function toString() As String
    Return "a Game"
  End Function

  Function with_head(head As Integer) As Game
    Return copyWith(Me, "head", head)
  End Function

  Function with_body(body As List(Of Integer)) As Game
    Return copyWith(Me, "body", body)
  End Function

  Function with_apple(apple As Integer) As Game
    Return copyWith(Me, "apple", apple)
  End Function

  Function with_isOn(isOn As Boolean) As Game
    Return copyWith(Me, "isOn", isOn)
  End Function

  Function with_rnd(rnd As Random) As Game
    Return copyWith(Me, "rnd", rnd)
  End Function

  Function with_key(key As String) As Game
    Return copyWith(Me, "key", key)
  End Function

End Class

[ghosted] <TestClass Class Test_clockTick
 <TestMethod> Sub test_clockTick()
  Dim g1 = New Game(New Random()) ' variable definition
  Dim g2 = g1.withNewApple() ' variable definition
  Dim g3 = clockTick(g2, "s") ' variable definition
  Assert.AreEqual(New Square(22, 16), g3.head)
  Assert.AreEqual(2, g3.body.length())
  Assert.AreEqual(g2.body(0), g3.priorTail)
  Assert.AreEqual(True, g3.isOn)
  Dim g4 = g3.with_apple(New Square(22, 17)) ' variable definition
  Dim g5 = clockTick(g4, "s") ' variable definition
  Assert.AreEqual(3, g5.body.length())
  Assert.AreEqual(g4.priorTail, g5.priorTail)
  Assert.AreEqual(True, g5.isOn)
  Dim g6 = g5.with_head(New Square(22, 29)) ' variable definition
  Dim g7 = clockTick(g6, "s") ' variable definition
  Assert.AreEqual(False, g7.isOn)
 End Sub
End Class


[ghosted] <TestClass Class Test_updateGraphics
 <TestMethod> Sub test_updateGraphics()
  Dim blocks = New BlockGraphics() ' variable definition
  Dim g1 = New Game(New Random()) ' variable definition
  Dim blocks2 = updateGraphics(g1, blocks) ' variable definition
  Assert.AreEqual(red, blocks2.get(12, 15))
  Assert.AreEqual(green, blocks2.get(22, 15))
  Assert.AreEqual(white, blocks2.get(21, 15))
  Dim g3 = clockTick(g1, "d") ' variable definition
  Dim blocks3 = updateGraphics(g3, blocks2) ' variable definition
  Assert.AreEqual(red, blocks3.get(12, 15))
  Assert.AreEqual(green, blocks3.get(22, 15))
  Assert.AreEqual(green, blocks3.get(23, 15))
 End Sub
End Class


[ghosted] <TestClass Class Test_testnewApple
 <TestMethod> Sub test_testnewApple()
  Dim g1 = New Game(New Random()) ' variable definition
  Assert.AreEqual(New Square(12, 15), g1.apple)
  Dim g2 = g1.withNewApple() ' variable definition
  Assert.AreEqual(New Square(12, 15), g2.apple)
  Dim g3 = g2.withNewApple() ' variable definition
  Assert.AreEqual(New Square(10, 12), g3.apple)
  ' test that apple is never over snake
  Dim g4 = (New Game(New Random())) ' variable definition
  Dim g5 = g4.with_body({New Square(10, 12)}) ' variable definition
  Dim g6 = g5.withNewApple() ' variable definition
  Assert.AreEqual(New Square(12, 15), g4.apple)
 End Sub
End Class


[ghosted] <TestClass Class Test_score
 <TestMethod> Sub test_score()
  Dim g1 = New Game(New Random()) ' variable definition
  Assert.AreEqual(0, score(g1))
  Dim g2 = g1.with_body({New Square(4, 4), New Square(5, 4)}) ' variable definition
  Assert.AreEqual(0, score(g2))
  Dim g3 = g1.with_body({New Square(3, 4), New Square(4, 4), New Square(5, 4)}) ' variable definition
  Assert.AreEqual(1, score(g3))
  Dim g4 = g1.with_body({New Square(3, 4), New Square(4, 4), New Square(5, 4), New Square(5, 5)}) ' variable definition
  Assert.AreEqual(2, score(g4))
 End Sub
End Class


[ghosted] <TestClass Class Test_moveSnake
 <TestMethod> Sub test_moveSnake()
  Dim g1 = New Game(New Random()) ' variable definition
  Dim g2 = g1.with_key("a") ' variable definition
  Dim g3 = moveSnake(g2) ' variable definition
  Assert.AreEqual(New Square(21, 15), g3.head)
  Dim g4 = g1.with_key("d") ' variable definition
  Dim g5 = moveSnake(g4) ' variable definition
  Assert.AreEqual(New Square(23, 15), g5.head)
  Dim g6 = g1.with_key("w") ' variable definition
  Dim g7 = moveSnake(g6) ' variable definition
  Assert.AreEqual(New Square(22, 14), g7.head)
  Dim g8 = g1.with_key("s") ' variable definition
  Dim g9 = moveSnake(g8) ' variable definition
  Assert.AreEqual(New Square(22, 16), g9.head)
 End Sub
End Class


[ghosted] <TestClass Class Test_eatAppleIfPoss
 <TestMethod> Sub test_eatAppleIfPoss()
  Dim g1 = New Game(New Random()) ' variable definition
  Assert.AreEqual(2, g1.body.length())
  ' negative case
  Dim g2 = g1.with_apple(New Square(23, 15)) ' variable definition
  Dim g3 = eatAppleIfPoss(g2) ' variable definition
  Assert.AreEqual(1, g3.body.length())
  Assert.AreEqual(g2.apple, g3.apple)
  Assert.AreEqual(g2.body(0), g3.priorTail)
  ' positive case
  Dim g4 = g2.with_head(New Square(23, 15)) ' variable definition
  Dim g5 = eatAppleIfPoss(g4) ' variable definition
  Assert.AreEqual(2, g5.body.length())
  Assert.AreEqual(New Square(12, 15), g5.apple)
  Assert.AreEqual(g1.priorTail, g5.priorTail)
 End Sub
End Class


[ghosted] <TestClass Class Test_overApple
 <TestMethod> Sub test_overApple()
  Dim g1 = New Game(New Random()) ' variable definition
  Dim g2 = g1.with_apple(New Square(23, 15)) ' variable definition
  Assert.AreEqual(False, headOverApple(g2))
  Dim g3 = g2.with_head(New Square(23, 15)) ' variable definition
  Assert.AreEqual(True, headOverApple(g3))
 End Sub
End Class


[ghosted] <TestClass Class Test_gameOver
 <TestMethod> Sub test_gameOver()
  Dim g1 = New Game((New Random())) ' variable definition
  Assert.AreEqual(False, gameOver(g1))
  Dim g2 = g1.with_head(New Square(0, 0)) ' variable definition
  Assert.AreEqual(False, gameOver(g2))
  Dim g3 = g1.with_head(New Square(40, 15)) ' variable definition
  Assert.AreEqual(True, gameOver(g3))
  Dim g4 = g1.with_head(New Square(21, 15)) ' variable definition
  Assert.AreEqual(True, gameOver(g4))
 End Sub
End Class


[ghosted] <TestClass Class Test_headIsAtEdge
 <TestMethod> Sub test_headIsAtEdge()
  Dim g1 = New Game(New Random()) ' variable definition
  Assert.AreEqual(False, hasHitEdge(g1))
  Dim g2 = g1.with_head(New Square(40, 15)) ' variable definition
  Assert.AreEqual(True, hasHitEdge(g2))
  Dim g3 = g1.with_head(New Square(-1, 15)) ' variable definition
  Assert.AreEqual(True, hasHitEdge(g3))
  Dim g4 = g1.with_head(New Square(20, 30)) ' variable definition
  Assert.AreEqual(True, hasHitEdge(g4))
  Dim g5 = g1.with_head(New Square(20, -1)) ' variable definition
  Assert.AreEqual(True, hasHitEdge(g5))
 End Sub
End Class


[ghosted] <TestClass Class Test_newSquare
 <TestMethod> Sub test_newSquare()
  Dim sq = New Square(3, 4) ' variable definition
  Assert.AreEqual(3, sq.x)
  Assert.AreEqual(4, sq.y)
 End Sub
End Class


[ghosted] <TestClass Class Test_newGame
 <TestMethod> Sub test_newGame()
  Dim rnd = New Random() ' variable definition
  Dim game = New Game(rnd) ' variable definition
  Dim totest = game.rnd.equals(rnd) ' variable definition
  Assert.AreEqual(True, totest)
  Assert.AreEqual(New Square(22, 15), game.head)
  Dim body = game.body ' variable definition
  Assert.AreEqual(2, body.length())
  Assert.AreEqual(New Square(20, 15), body(0))
  Assert.AreEqual(New Square(21, 15), body(1))
  Assert.AreEqual(New Square(0, 0), game.priorTail)
  Assert.AreEqual("d", game.key)
  Assert.AreEqual(True, game.isOn)
 End Sub
End Class

