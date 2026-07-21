' VB.NET with Elan 2.0.0-beta2

' Use the W,A,S,D keys to change Snake direction

Sub main()
  Dim blocks = createBlockGraphics(white) ' variable definition
  Dim rnd = New Random() ' variable definition
  rnd.initialiseFromClock() ' procedure call
  Dim game = (New Game(rnd)).withNewApple() ' variable definition
  While game.isOn
    blocks = updateGraphics(game, blocks) ' assignment
    displayBlocks(blocks) ' procedure call
    sleep_ms(150) ' procedure call
    game = clockTick(game, getKey()) ' assignment
  End While
  Console.WriteLine($"Game Over! Score: {score(game)}") ' print statement
End Sub

Function clockTick(g As Game, k As String) As Game
  Dim g2 = if_(k.equals(""), g, g.with_key(k)) ' let
  Dim g3 = moveSnake(g2) ' let
  Dim g4 = eatAppleIfPoss(g3) ' let
  Return if_(gameOver(g4), g4.with_isOn(False), g4)
End Function

Function updateGraphics(g As Game, b As List(Of List(Of Integer))) As List(Of List(Of Integer))
  Dim b2 = graphicsPut(b, g.apple.x, g.apple.y, red) ' let
  Dim b3 = graphicsPut(b2, g.head.x, g.head.y, green) ' let
  Dim tail = g.body(0) ' let
  Dim tailColour = if_(tail.equals(g.priorTail), green, white) ' let
  Return graphicsPut(b3, tail.x, tail.y, tailColour)
End Function

Function graphicsPut(graphics As List(Of List(Of Integer)), x As Integer, y As Integer, colour As Integer) As List(Of List(Of Integer))
  Return graphics.withPut(x, graphics(x).withPut(y, colour))
End Function

Function score(g As Game) As Integer
  Return g.body.length() - 2
End Function

Function moveSnake(g As Game) As Game
  Dim k = g.key ' let
  Dim x = g.head.x ' let
  Dim y = g.head.y ' let
  Dim newX = if_(k.equals("a"), x - 1, if_(k.equals("d"), x + 1, x)) ' let
  Dim newY = if_(k.equals("w"), y - 1, if_(k.equals("s"), y + 1, y)) ' let
  Return g.with_body(g.body.withAppend(g.head)).with_head(New Square(newX, newY))
End Function

Function eatAppleIfPoss(g As Game) As Game
  Dim tail = g.body(0) ' let
  Dim moveTail = g.body.subList(1, g.body.length()) ' let
  Return if_(headOverApple(g), g.withNewApple(), g.with_priorTail(tail).with_body(moveTail))
End Function

Function headOverApple(g As Game) As Boolean
  Return g.head.equals(g.apple)
End Function

Function gameOver(g As Game) As Boolean
  Return g.body.contains(g.head) Or hasHitEdge(g)
End Function

Function hasHitEdge(g As Game) As Boolean
  Dim x = g.head.x ' let
  Dim y = g.head.y ' let
  Return (x = -1) Or (y = -1) Or (x = 40) Or (y = 30)
End Function

Class Game

  Property head As Square

  Property body As List(Of Square)

  Property priorTail As Square

  Property apple As Square

  Property isOn As Boolean

  Property rnd As Random

  Property key As String

  Sub New(rnd As Random)
    Me.head = New Square(22, 15) ' assignment
    Me.body = {New Square(20, 15), New Square(21, 15)} ' assignment
    Me.priorTail = New Square(0, 0) ' assignment
    Me.key = "d" ' assignment
    Me.isOn = True ' assignment
    Me.apple = New Square(12, 15) ' assignment
    Me.rnd = rnd ' assignment
  End Sub

  Function toString() As String
    Return "a Game"
  End Function

  Function withNewApple() As Game
    Dim x = Me.rnd.asInt(0, 39) ' let
    Dim rnd2 = Me.rnd.nextGen() ' let
    Dim y = rnd2.asInt(0, 29) ' let
    Dim rnd3 = rnd2.nextGen() ' let
    Dim apple2 = New Square(x, y) ' let
    Dim g2 = Me.with_apple(apple2).with_rnd(rnd3) ' let
    Return if_(g2.body.contains(apple2), g2.withNewApple(), g2)
  End Function

  Function with_head(head As Square) As Game ' copy with method
    Return copyWithPropertyUpdated(Me, "head", head)
  End Function

  Function with_body(body As List(Of Square)) As Game ' copy with method
    Return copyWithPropertyUpdated(Me, "body", body)
  End Function

  Function with_priorTail(priorTail As Square) As Game ' copy with method
    Return copyWithPropertyUpdated(Me, "priorTail", priorTail)
  End Function

  Function with_apple(apple As Square) As Game ' copy with method
    Return copyWithPropertyUpdated(Me, "apple", apple)
  End Function

  Function with_isOn(isOn As Boolean) As Game ' copy with method
    Return copyWithPropertyUpdated(Me, "isOn", isOn)
  End Function

  Function with_rnd(rnd As Random) As Game ' copy with method
    Return copyWithPropertyUpdated(Me, "rnd", rnd)
  End Function

  Function with_key(key As String) As Game ' copy with method
    Return copyWithPropertyUpdated(Me, "key", key)
  End Function

End Class

Class Square

  Property x As Integer

  Property y As Integer

  Sub New(x As Integer, y As Integer)
    Me.x = x ' assignment
    Me.y = y ' assignment
  End Sub

  Function toString() As String
    Return $"{Me.x}, {Me.y}"
  End Function

End Class

<TestClass Class Test_clockTick
 <TestMethod> Sub test_clockTick()
  Dim g1 = New Game(New Random()) ' let
  Dim g2 = g1.withNewApple() ' let
  Dim g3 = clockTick(g2, "s") ' let
  Assert.AreEqual(New Square(22, 16), g3.head)
  Assert.AreEqual(2, g3.body.length())
  Assert.AreEqual(g2.body(0), g3.priorTail)
  Assert.AreEqual(True, g3.isOn)
  Dim g4 = g3.with_apple(New Square(22, 17)) ' let
  Dim g5 = clockTick(g4, "s") ' let
  Assert.AreEqual(3, g5.body.length())
  Assert.AreEqual(g4.priorTail, g5.priorTail)
  Assert.AreEqual(True, g5.isOn)
  Dim g6 = g5.with_head(New Square(22, 29)) ' let
  Dim g7 = clockTick(g6, "s") ' let
  Assert.AreEqual(False, g7.isOn)
 End Sub
End Class


<TestClass Class Test_updateGraphics
 <TestMethod> Sub test_updateGraphics()
  Dim blocks = createBlockGraphics(white) ' let
  Dim g1 = New Game(New Random()) ' let
  Dim blocks2 = updateGraphics(g1, blocks) ' let
  Assert.AreEqual(red, blocks2(12)(15))
  Assert.AreEqual(green, blocks2(22)(15))
  Assert.AreEqual(white, blocks2(21)(15))
  Dim g3 = clockTick(g1, "d") ' let
  Dim blocks3 = updateGraphics(g3, blocks2) ' let
  Assert.AreEqual(red, blocks3(12)(15))
  Assert.AreEqual(green, blocks3(22)(15))
  Assert.AreEqual(green, blocks3(23)(15))
 End Sub
End Class


<TestClass Class Test_testnewApple
 <TestMethod> Sub test_testnewApple()
  Dim g1 = New Game(New Random()) ' let
  Assert.AreEqual(New Square(12, 15), g1.apple)
  Dim g2 = g1.withNewApple() ' let
  Assert.AreEqual(New Square(12, 15), g2.apple)
  Dim g3 = g2.withNewApple() ' let
  Assert.AreEqual(New Square(10, 12), g3.apple)
  ' test that apple is never over snake
  Dim g4 = (New Game(New Random())) ' let
  Dim g5 = g4.with_body({New Square(10, 12)}) ' let
  Dim g6 = g5.withNewApple() ' let
  Assert.AreEqual(New Square(12, 15), g4.apple)
 End Sub
End Class


<TestClass Class Test_score
 <TestMethod> Sub test_score()
  Dim g1 = New Game(New Random()) ' let
  Assert.AreEqual(0, score(g1))
  Dim g2 = g1.with_body({New Square(4, 4), New Square(5, 4)}) ' let
  Assert.AreEqual(0, score(g2))
  Dim g3 = g1.with_body({New Square(3, 4), New Square(4, 4), New Square(5, 4)}) ' let
  Assert.AreEqual(1, score(g3))
  Dim g4 = g1.with_body({New Square(3, 4), New Square(4, 4), New Square(5, 4), New Square(5, 5)}) ' let
  Assert.AreEqual(2, score(g4))
 End Sub
End Class


<TestClass Class Test_moveSnake
 <TestMethod> Sub test_moveSnake()
  Dim g1 = New Game(New Random()) ' let
  Dim g2 = g1.with_key("a") ' let
  Dim g3 = moveSnake(g2) ' let
  Assert.AreEqual(New Square(21, 15), g3.head)
  Dim g4 = g1.with_key("d") ' let
  Dim g5 = moveSnake(g4) ' let
  Assert.AreEqual(New Square(23, 15), g5.head)
  Dim g6 = g1.with_key("w") ' let
  Dim g7 = moveSnake(g6) ' let
  Assert.AreEqual(New Square(22, 14), g7.head)
  Dim g8 = g1.with_key("s") ' let
  Dim g9 = moveSnake(g8) ' let
  Assert.AreEqual(New Square(22, 16), g9.head)
 End Sub
End Class


<TestClass Class Test_eatAppleIfPoss
 <TestMethod> Sub test_eatAppleIfPoss()
  Dim g1 = New Game(New Random()) ' let
  Assert.AreEqual(2, g1.body.length())
  ' negative case
  Dim g2 = g1.with_apple(New Square(23, 15)) ' let
  Dim g3 = eatAppleIfPoss(g2) ' let
  Assert.AreEqual(1, g3.body.length())
  Assert.AreEqual(g2.apple, g3.apple)
  Assert.AreEqual(g2.body(0), g3.priorTail)
  ' positive case
  Dim g4 = g2.with_head(New Square(23, 15)) ' let
  Dim g5 = eatAppleIfPoss(g4) ' let
  Assert.AreEqual(2, g5.body.length())
  Assert.AreEqual(New Square(12, 15), g5.apple)
  Assert.AreEqual(g1.priorTail, g5.priorTail)
 End Sub
End Class


<TestClass Class Test_overApple
 <TestMethod> Sub test_overApple()
  Dim g1 = New Game(New Random()) ' let
  Dim g2 = g1.with_apple(New Square(23, 15)) ' let
  Assert.AreEqual(False, headOverApple(g2))
  Dim g3 = g2.with_head(New Square(23, 15)) ' let
  Assert.AreEqual(True, headOverApple(g3))
 End Sub
End Class


<TestClass Class Test_gameOver
 <TestMethod> Sub test_gameOver()
  Dim g1 = New Game((New Random())) ' let
  Assert.AreEqual(False, gameOver(g1))
  Dim g2 = g1.with_head(New Square(0, 0)) ' let
  Assert.AreEqual(False, gameOver(g2))
  Dim g3 = g1.with_head(New Square(40, 15)) ' let
  Assert.AreEqual(True, gameOver(g3))
  Dim g4 = g1.with_head(New Square(21, 15)) ' let
  Assert.AreEqual(True, gameOver(g4))
 End Sub
End Class


<TestClass Class Test_headIsAtEdge
 <TestMethod> Sub test_headIsAtEdge()
  Dim g1 = New Game(New Random()) ' let
  Assert.AreEqual(False, hasHitEdge(g1))
  Dim g2 = g1.with_head(New Square(40, 15)) ' let
  Assert.AreEqual(True, hasHitEdge(g2))
  Dim g3 = g1.with_head(New Square(-1, 15)) ' let
  Assert.AreEqual(True, hasHitEdge(g3))
  Dim g4 = g1.with_head(New Square(20, 30)) ' let
  Assert.AreEqual(True, hasHitEdge(g4))
  Dim g5 = g1.with_head(New Square(20, -1)) ' let
  Assert.AreEqual(True, hasHitEdge(g5))
 End Sub
End Class


<TestClass Class Test_newSquare
 <TestMethod> Sub test_newSquare()
  Dim sq = New Square(3, 4) ' let
  Assert.AreEqual(3, sq.x)
  Assert.AreEqual(4, sq.y)
 End Sub
End Class


<TestClass Class Test_newGame
 <TestMethod> Sub test_newGame()
  Dim rnd = New Random() ' let
  Dim game = New Game(rnd) ' let
  Dim totest = game.rnd.equals(rnd) ' let
  Assert.AreEqual(True, totest)
  Assert.AreEqual(New Square(22, 15), game.head)
  Dim body = game.body ' let
  Assert.AreEqual(2, body.length())
  Assert.AreEqual(New Square(20, 15), body(0))
  Assert.AreEqual(New Square(21, 15), body(1))
  Assert.AreEqual(New Square(0, 0), game.priorTail)
  Assert.AreEqual("d", game.key)
  Assert.AreEqual(True, game.isOn)
 End Sub
End Class

