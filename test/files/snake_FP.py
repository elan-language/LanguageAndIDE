# Python with Elan 2.0.0-beta1

# Use the W,A,S,D keys to change Snake direction

def main() -> None:
  blocks = createBlockGraphics(white) # variable definition
  rnd = Random() # variable definition
  rnd.initialiseFromClock() # procedure call
  game = (Game(rnd)).withNewApple() # variable definition
  while game.isOn:
    blocks = updateGraphics(game, blocks) # assignment
    displayBlocks(blocks) # procedure call
    sleep_ms(150) # procedure call
    game = clockTick(game, getKey()) # assignment
  # end while
  print(f"Game Over! Score: {score(game)}")
# end main

def clockTick(g: Game, k: str) -> Game: # function
  g2 = if_(k.equals(""), g, g.with_key(k)) # let
  g3 = moveSnake(g2) # let
  g4 = eatAppleIfPoss(g3) # let
  return if_(gameOver(g4), g4.with_isOn(False), g4)
# end function

def updateGraphics(g: Game, b: list[list[int]]) -> list[list[int]]: # function
  b2 = graphicsPut(b, g.apple.x, g.apple.y, red) # let
  b3 = graphicsPut(b2, g.head.x, g.head.y, green) # let
  tail = g.body[0] # let
  tailColour = if_(tail.equals(g.priorTail), green, white) # let
  return graphicsPut(b3, tail.x, tail.y, tailColour)
# end function

def graphicsPut(graphics: list[list[int]], x: int, y: int, colour: int) -> list[list[int]]: # function
  return graphics.withPut(x, graphics[x].withPut(y, colour))
# end function

def score(g: Game) -> int: # function
  return g.body.length() - 2
# end function

def moveSnake(g: Game) -> Game: # function
  k = g.key # let
  x = g.head.x # let
  y = g.head.y # let
  newX = if_(k.equals("a"), x - 1, if_(k.equals("d"), x + 1, x)) # let
  newY = if_(k.equals("w"), y - 1, if_(k.equals("s"), y + 1, y)) # let
  return g.with_body(g.body.withAppend(g.head)).with_head(Square(newX, newY))
# end function

def eatAppleIfPoss(g: Game) -> Game: # function
  tail = g.body[0] # let
  moveTail = g.body.subList(1, g.body.length()) # let
  return if_(headOverApple(g), g.withNewApple(), g.with_priorTail(tail).with_body(moveTail))
# end function

def headOverApple(g: Game) -> bool: # function
  return g.head.equals(g.apple)
# end function

def gameOver(g: Game) -> bool: # function
  return g.body.contains(g.head) or hasHitEdge(g)
# end function

def hasHitEdge(g: Game) -> bool: # function
  x = g.head.x # let
  y = g.head.y # let
  return (x == -1) or (y == -1) or (x == 40) or (y == 30)
# end function

class Game: # concrete class

  head: Square # property

  body: list[Square] # property

  priorTail: Square # property

  apple: Square # property

  isOn: bool # property

  rnd: Random # property

  key: str # property

  def __init__(self: Game, rnd: Random) -> None:
    self.head = Square(22, 15) # assignment
    self.body = [Square(20, 15), Square(21, 15)] # assignment
    self.priorTail = Square(0, 0) # assignment
    self.key = "d" # assignment
    self.isOn = True # assignment
    self.apple = Square(12, 15) # assignment
    self.rnd = rnd # assignment
  # end constructor

  def toString(self: Game) -> str: # function method
    return "a Game"
  # end function method

  def withNewApple(self: Game) -> Game: # function method
    x = self.rnd.asInt(0, 39) # let
    rnd2 = self.rnd.nextGen() # let
    y = rnd2.asInt(0, 29) # let
    rnd3 = rnd2.nextGen() # let
    apple2 = Square(x, y) # let
    g2 = self.with_apple(apple2).with_rnd(rnd3) # let
    return if_(g2.body.contains(apple2), g2.withNewApple(), g2)
  # end function method

  def with_head(self: Game, head: Square) -> Game: # copy with method
    return copyWithPropertyUpdated(self, "head", head)
  # end 

  def with_body(self: Game, body: list[Square]) -> Game: # copy with method
    return copyWithPropertyUpdated(self, "body", body)
  # end 

  def with_priorTail(self: Game, priorTail: Square) -> Game: # copy with method
    return copyWithPropertyUpdated(self, "priorTail", priorTail)
  # end 

  def with_apple(self: Game, apple: Square) -> Game: # copy with method
    return copyWithPropertyUpdated(self, "apple", apple)
  # end 

  def with_isOn(self: Game, isOn: bool) -> Game: # copy with method
    return copyWithPropertyUpdated(self, "isOn", isOn)
  # end 

  def with_rnd(self: Game, rnd: Random) -> Game: # copy with method
    return copyWithPropertyUpdated(self, "rnd", rnd)
  # end 

  def with_key(self: Game, key: str) -> Game: # copy with method
    return copyWithPropertyUpdated(self, "key", key)
  # end 

# end class

class Square: # concrete class

  x: int # property

  y: int # property

  def __init__(self: Square, x: int, y: int) -> None:
    self.x = x # assignment
    self.y = y # assignment
  # end constructor

  def toString(self: Square) -> str: # function method
    return f"{self.x}, {self.y}"
  # end function method

# end class

class Test_clockTick(unittest.TestCase):
 def test_clockTick(self) -> None:
  g1 = Game(Random()) # let
  g2 = g1.withNewApple() # let
  g3 = clockTick(g2, "s") # let
  self.assertEqual(g3.head, Square(22, 16))
  self.assertEqual(g3.body.length(), 2)
  self.assertEqual(g3.priorTail, g2.body[0])
  self.assertEqual(g3.isOn, True)
  g4 = g3.with_apple(Square(22, 17)) # let
  g5 = clockTick(g4, "s") # let
  self.assertEqual(g5.body.length(), 3)
  self.assertEqual(g5.priorTail, g4.priorTail)
  self.assertEqual(g5.isOn, True)
  g6 = g5.with_head(Square(22, 29)) # let
  g7 = clockTick(g6, "s") # let
  self.assertEqual(g7.isOn, False)
# end test

class Test_updateGraphics(unittest.TestCase):
 def test_updateGraphics(self) -> None:
  blocks = createBlockGraphics(white) # let
  g1 = Game(Random()) # let
  blocks2 = updateGraphics(g1, blocks) # let
  self.assertEqual(blocks2[12][15], red)
  self.assertEqual(blocks2[22][15], green)
  self.assertEqual(blocks2[21][15], white)
  g3 = clockTick(g1, "d") # let
  blocks3 = updateGraphics(g3, blocks2) # let
  self.assertEqual(blocks3[12][15], red)
  self.assertEqual(blocks3[22][15], green)
  self.assertEqual(blocks3[23][15], green)
# end test

class Test_testnewApple(unittest.TestCase):
 def test_testnewApple(self) -> None:
  g1 = Game(Random()) # let
  self.assertEqual(g1.apple, Square(12, 15))
  g2 = g1.withNewApple() # let
  self.assertEqual(g2.apple, Square(12, 15))
  g3 = g2.withNewApple() # let
  self.assertEqual(g3.apple, Square(10, 12))
  # test that apple is never over snake
  g4 = (Game(Random())) # let
  g5 = g4.with_body([Square(10, 12)]) # let
  g6 = g5.withNewApple() # let
  self.assertEqual(g4.apple, Square(12, 15))
# end test

class Test_score(unittest.TestCase):
 def test_score(self) -> None:
  g1 = Game(Random()) # let
  self.assertEqual(score(g1), 0)
  g2 = g1.with_body([Square(4, 4), Square(5, 4)]) # let
  self.assertEqual(score(g2), 0)
  g3 = g1.with_body([Square(3, 4), Square(4, 4), Square(5, 4)]) # let
  self.assertEqual(score(g3), 1)
  g4 = g1.with_body([Square(3, 4), Square(4, 4), Square(5, 4), Square(5, 5)]) # let
  self.assertEqual(score(g4), 2)
# end test

class Test_moveSnake(unittest.TestCase):
 def test_moveSnake(self) -> None:
  g1 = Game(Random()) # let
  g2 = g1.with_key("a") # let
  g3 = moveSnake(g2) # let
  self.assertEqual(g3.head, Square(21, 15))
  g4 = g1.with_key("d") # let
  g5 = moveSnake(g4) # let
  self.assertEqual(g5.head, Square(23, 15))
  g6 = g1.with_key("w") # let
  g7 = moveSnake(g6) # let
  self.assertEqual(g7.head, Square(22, 14))
  g8 = g1.with_key("s") # let
  g9 = moveSnake(g8) # let
  self.assertEqual(g9.head, Square(22, 16))
# end test

class Test_eatAppleIfPoss(unittest.TestCase):
 def test_eatAppleIfPoss(self) -> None:
  g1 = Game(Random()) # let
  self.assertEqual(g1.body.length(), 2)
  # negative case
  g2 = g1.with_apple(Square(23, 15)) # let
  g3 = eatAppleIfPoss(g2) # let
  self.assertEqual(g3.body.length(), 1)
  self.assertEqual(g3.apple, g2.apple)
  self.assertEqual(g3.priorTail, g2.body[0])
  # positive case
  g4 = g2.with_head(Square(23, 15)) # let
  g5 = eatAppleIfPoss(g4) # let
  self.assertEqual(g5.body.length(), 2)
  self.assertEqual(g5.apple, Square(12, 15))
  self.assertEqual(g5.priorTail, g1.priorTail)
# end test

class Test_overApple(unittest.TestCase):
 def test_overApple(self) -> None:
  g1 = Game(Random()) # let
  g2 = g1.with_apple(Square(23, 15)) # let
  self.assertEqual(headOverApple(g2), False)
  g3 = g2.with_head(Square(23, 15)) # let
  self.assertEqual(headOverApple(g3), True)
# end test

class Test_gameOver(unittest.TestCase):
 def test_gameOver(self) -> None:
  g1 = Game((Random())) # let
  self.assertEqual(gameOver(g1), False)
  g2 = g1.with_head(Square(0, 0)) # let
  self.assertEqual(gameOver(g2), False)
  g3 = g1.with_head(Square(40, 15)) # let
  self.assertEqual(gameOver(g3), True)
  g4 = g1.with_head(Square(21, 15)) # let
  self.assertEqual(gameOver(g4), True)
# end test

class Test_headIsAtEdge(unittest.TestCase):
 def test_headIsAtEdge(self) -> None:
  g1 = Game(Random()) # let
  self.assertEqual(hasHitEdge(g1), False)
  g2 = g1.with_head(Square(40, 15)) # let
  self.assertEqual(hasHitEdge(g2), True)
  g3 = g1.with_head(Square(-1, 15)) # let
  self.assertEqual(hasHitEdge(g3), True)
  g4 = g1.with_head(Square(20, 30)) # let
  self.assertEqual(hasHitEdge(g4), True)
  g5 = g1.with_head(Square(20, -1)) # let
  self.assertEqual(hasHitEdge(g5), True)
# end test

class Test_newSquare(unittest.TestCase):
 def test_newSquare(self) -> None:
  sq = Square(3, 4) # let
  self.assertEqual(sq.x, 3)
  self.assertEqual(sq.y, 4)
# end test

class Test_newGame(unittest.TestCase):
 def test_newGame(self) -> None:
  rnd = Random() # let
  game = Game(rnd) # let
  totest = game.rnd.equals(rnd) # let
  self.assertEqual(totest, True)
  self.assertEqual(game.head, Square(22, 15))
  body = game.body # let
  self.assertEqual(body.length(), 2)
  self.assertEqual(body[0], Square(20, 15))
  self.assertEqual(body[1], Square(21, 15))
  self.assertEqual(game.priorTail, Square(0, 0))
  self.assertEqual(game.key, "d")
  self.assertEqual(game.isOn, True)
# end test

main()
