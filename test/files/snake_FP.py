# Python with Elan 2.0.0-beta5

# Use the W,A,S,D keys to change Snake direction

width = 40 # constant

height = 30 # constant

def main() -> None:
  rnd = Random() # variable definition
  rnd.initialiseFromClock() # procedure call
  game = Game(rnd) # variable definition
  while game.isOn:
    game = if_(game.apple == -1, withNewApple(game), game) # assignment
    blocks = BlockGraphics() # variable definition
    blocks = updateGraphics(game, blocks) # assignment
    displayBlockGraphics(blocks) # procedure call
    sleep_ms(150) # procedure call
    game = clockTick(game, getKey()) # assignment
  # end while
  print(f"Game Over! Score: {score(game)}")
# end main

def clockTick(g: Game, k: str) -> Game: # function
  g2 = if_(k.equals(""), g, g.with_key(k)) # variable definition
  g3 = moveSnake(g2) # variable definition
  g4 = eatAppleIfPoss(g3) # variable definition
  return if_(gameOver(g4), g4.with_isOn(False), g4)
# end function

def updateGraphics(g: Game, bg: BlockGraphics) -> BlockGraphics: # function
  bg2 = g.body.reduce(bg, lambda b: BlockGraphics, bl: int: b.withPutBlockNo(bl, green)) # variable definition
  return bg2.withPutBlockNo(g.apple, red)
# end function

def score(g: Game) -> int: # function
  return g.body.length() - 1
# end function

def moveSnake(g: Game) -> Game: # function
  k = g.key # variable definition
  col = g.head % width # variable definition
  row = divAsInt(g.head, width) # variable definition
  newCol = if_(k.equals("a"), col - 1, if_(k.equals("d"), col + 1, col)) # variable definition
  newRow = if_(k.equals("w"), row - 1, if_(k.equals("s"), row + 1, row)) # variable definition
  inBounds = (newCol >= 0) and (newCol < width) and (newRow >= 0) and (newRow < height) # variable definition
  newHead = if_(inBounds, newRow*width + newCol, -1) # variable definition
  return if_((newHead == -1) or selfCollision(newHead, g), g.with_isOn(False), g.with_body(g.body.withAppend(newHead)).with_head(newHead))
# end function

def eatAppleIfPoss(g: Game) -> Game: # function
  return if_(headOverApple(g), withNewApple(g), g.with_body(g.body.withRemoveAt(0)))
# end function

def headOverApple(g: Game) -> bool: # function
  return g.head.equals(g.apple)
# end function

def gameOver(g: Game) -> bool: # function
  # TODO not currently checking for self-collision
  return hasHitEdge(g)
# end function

def selfCollision(newHead: int, g: Game) -> bool: # function
  return g.body.contains(newHead)
# end function

def hasHitEdge(g: Game) -> bool: # function
  return g.head == -1
# end function

def appleIsUnderBody(g: Game) -> bool: # function
  return g.body.contains(g.apple)
# end function

def withNewApple(g: Game) -> Game: # function
  apple2 = g.rnd.asInt(0, width*height - 1) # variable definition
  rnd2 = g.rnd.nextGen() # variable definition
  g2 = g.with_apple(apple2).with_rnd(rnd2) # variable definition
  return if_(not appleIsUnderBody(g2), g2, withNewApple(g))
# end function

class Game: # concrete class

  def __init__(self: Game, rnd: Random) -> None:
    self.head = 620 # assignment
    self.body = [self.head - 1, self.head] # assignment
    self.key = "d" # assignment
    self.isOn = True # assignment
    self.apple = -1 # assignment
    self.rnd = rnd # assignment
  # end constructor

  head: int # property

  body: list[int] # property

  apple: int # property

  isOn: bool # property

  rnd: Random # property

  key: str # property

  def toString(self: Game) -> str: # function method
    return "a Game"
  # end function method

  def with_head(self: Game, head: int) -> Game: # function method
    return copyWith(self, "head", head)
  # end function method

  def with_body(self: Game, body: list[int]) -> Game: # function method
    return copyWith(self, "body", body)
  # end function method

  def with_apple(self: Game, apple: int) -> Game: # function method
    return copyWith(self, "apple", apple)
  # end function method

  def with_isOn(self: Game, isOn: bool) -> Game: # function method
    return copyWith(self, "isOn", isOn)
  # end function method

  def with_rnd(self: Game, rnd: Random) -> Game: # function method
    return copyWith(self, "rnd", rnd)
  # end function method

  def with_key(self: Game, key: str) -> Game: # function method
    return copyWith(self, "key", key)
  # end function method

# end class

[ghosted] class Test_clockTick(unittest.TestCase):
 def test_clockTick(self) -> None:
  g1 = Game(Random()) # variable definition
  g2 = g1.withNewApple() # variable definition
  g3 = clockTick(g2, "s") # variable definition
  self.assertEqual(g3.head, Square(22, 16))
  self.assertEqual(g3.body.length(), 2)
  self.assertEqual(g3.priorTail, g2.body[0])
  self.assertEqual(g3.isOn, True)
  g4 = g3.with_apple(Square(22, 17)) # variable definition
  g5 = clockTick(g4, "s") # variable definition
  self.assertEqual(g5.body.length(), 3)
  self.assertEqual(g5.priorTail, g4.priorTail)
  self.assertEqual(g5.isOn, True)
  g6 = g5.with_head(Square(22, 29)) # variable definition
  g7 = clockTick(g6, "s") # variable definition
  self.assertEqual(g7.isOn, False)
# end test

[ghosted] class Test_updateGraphics(unittest.TestCase):
 def test_updateGraphics(self) -> None:
  blocks = BlockGraphics() # variable definition
  g1 = Game(Random()) # variable definition
  blocks2 = updateGraphics(g1, blocks) # variable definition
  self.assertEqual(blocks2.get(12, 15), red)
  self.assertEqual(blocks2.get(22, 15), green)
  self.assertEqual(blocks2.get(21, 15), white)
  g3 = clockTick(g1, "d") # variable definition
  blocks3 = updateGraphics(g3, blocks2) # variable definition
  self.assertEqual(blocks3.get(12, 15), red)
  self.assertEqual(blocks3.get(22, 15), green)
  self.assertEqual(blocks3.get(23, 15), green)
# end test

[ghosted] class Test_testnewApple(unittest.TestCase):
 def test_testnewApple(self) -> None:
  g1 = Game(Random()) # variable definition
  self.assertEqual(g1.apple, Square(12, 15))
  g2 = g1.withNewApple() # variable definition
  self.assertEqual(g2.apple, Square(12, 15))
  g3 = g2.withNewApple() # variable definition
  self.assertEqual(g3.apple, Square(10, 12))
  # test that apple is never over snake
  g4 = (Game(Random())) # variable definition
  g5 = g4.with_body([Square(10, 12)]) # variable definition
  g6 = g5.withNewApple() # variable definition
  self.assertEqual(g4.apple, Square(12, 15))
# end test

[ghosted] class Test_score(unittest.TestCase):
 def test_score(self) -> None:
  g1 = Game(Random()) # variable definition
  self.assertEqual(score(g1), 0)
  g2 = g1.with_body([Square(4, 4), Square(5, 4)]) # variable definition
  self.assertEqual(score(g2), 0)
  g3 = g1.with_body([Square(3, 4), Square(4, 4), Square(5, 4)]) # variable definition
  self.assertEqual(score(g3), 1)
  g4 = g1.with_body([Square(3, 4), Square(4, 4), Square(5, 4), Square(5, 5)]) # variable definition
  self.assertEqual(score(g4), 2)
# end test

[ghosted] class Test_moveSnake(unittest.TestCase):
 def test_moveSnake(self) -> None:
  g1 = Game(Random()) # variable definition
  g2 = g1.with_key("a") # variable definition
  g3 = moveSnake(g2) # variable definition
  self.assertEqual(g3.head, Square(21, 15))
  g4 = g1.with_key("d") # variable definition
  g5 = moveSnake(g4) # variable definition
  self.assertEqual(g5.head, Square(23, 15))
  g6 = g1.with_key("w") # variable definition
  g7 = moveSnake(g6) # variable definition
  self.assertEqual(g7.head, Square(22, 14))
  g8 = g1.with_key("s") # variable definition
  g9 = moveSnake(g8) # variable definition
  self.assertEqual(g9.head, Square(22, 16))
# end test

[ghosted] class Test_eatAppleIfPoss(unittest.TestCase):
 def test_eatAppleIfPoss(self) -> None:
  g1 = Game(Random()) # variable definition
  self.assertEqual(g1.body.length(), 2)
  # negative case
  g2 = g1.with_apple(Square(23, 15)) # variable definition
  g3 = eatAppleIfPoss(g2) # variable definition
  self.assertEqual(g3.body.length(), 1)
  self.assertEqual(g3.apple, g2.apple)
  self.assertEqual(g3.priorTail, g2.body[0])
  # positive case
  g4 = g2.with_head(Square(23, 15)) # variable definition
  g5 = eatAppleIfPoss(g4) # variable definition
  self.assertEqual(g5.body.length(), 2)
  self.assertEqual(g5.apple, Square(12, 15))
  self.assertEqual(g5.priorTail, g1.priorTail)
# end test

[ghosted] class Test_overApple(unittest.TestCase):
 def test_overApple(self) -> None:
  g1 = Game(Random()) # variable definition
  g2 = g1.with_apple(Square(23, 15)) # variable definition
  self.assertEqual(headOverApple(g2), False)
  g3 = g2.with_head(Square(23, 15)) # variable definition
  self.assertEqual(headOverApple(g3), True)
# end test

[ghosted] class Test_gameOver(unittest.TestCase):
 def test_gameOver(self) -> None:
  g1 = Game((Random())) # variable definition
  self.assertEqual(gameOver(g1), False)
  g2 = g1.with_head(Square(0, 0)) # variable definition
  self.assertEqual(gameOver(g2), False)
  g3 = g1.with_head(Square(40, 15)) # variable definition
  self.assertEqual(gameOver(g3), True)
  g4 = g1.with_head(Square(21, 15)) # variable definition
  self.assertEqual(gameOver(g4), True)
# end test

[ghosted] class Test_headIsAtEdge(unittest.TestCase):
 def test_headIsAtEdge(self) -> None:
  g1 = Game(Random()) # variable definition
  self.assertEqual(hasHitEdge(g1), False)
  g2 = g1.with_head(Square(40, 15)) # variable definition
  self.assertEqual(hasHitEdge(g2), True)
  g3 = g1.with_head(Square(-1, 15)) # variable definition
  self.assertEqual(hasHitEdge(g3), True)
  g4 = g1.with_head(Square(20, 30)) # variable definition
  self.assertEqual(hasHitEdge(g4), True)
  g5 = g1.with_head(Square(20, -1)) # variable definition
  self.assertEqual(hasHitEdge(g5), True)
# end test

[ghosted] class Test_newSquare(unittest.TestCase):
 def test_newSquare(self) -> None:
  sq = Square(3, 4) # variable definition
  self.assertEqual(sq.x, 3)
  self.assertEqual(sq.y, 4)
# end test

[ghosted] class Test_newGame(unittest.TestCase):
 def test_newGame(self) -> None:
  rnd = Random() # variable definition
  game = Game(rnd) # variable definition
  totest = game.rnd.equals(rnd) # variable definition
  self.assertEqual(totest, True)
  self.assertEqual(game.head, Square(22, 15))
  body = game.body # variable definition
  self.assertEqual(body.length(), 2)
  self.assertEqual(body[0], Square(20, 15))
  self.assertEqual(body[1], Square(21, 15))
  self.assertEqual(game.priorTail, Square(0, 0))
  self.assertEqual(game.key, "d")
  self.assertEqual(game.isOn, True)
# end test

main()
