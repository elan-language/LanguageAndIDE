# Python with Elan 2.0.0-alpha1

# Use the W,A,S,D keys to change Snake direction

def main() -> None:
  blocks = createBlockGraphics(white) # variable definition
  rnd = Random() # variable definition
  rnd.initialiseFromClock() # call procedure
  game = (Game(rnd)).withNewApple() # variable definition
  while game.isOn:
    blocks = updateGraphics(game, blocks) # set
    displayBlocks(blocks) # call procedure
    sleep_ms(150) # call procedure
    game = clockTick(game, getKey()) # set
  print(f"Game Over! Score: {score(game)}") # call procedure

def clockTick(g: Game, k: str) -> Game: # function
  g2 = if(k.equals(""), g, g.withKey(k)) # variable definition
  g3 = moveSnake(g2) # variable definition
  g4 = eatAppleIfPoss(g3) # variable definition
  return if(gameOver(g4), g4.withIsOn(False), g4)

def updateGraphics(g: Game, b: list[list[int]]) -> list[list[int]]: # function
  b2 = graphicsPut(b, g.apple.x, g.apple.y, red) # variable definition
  b3 = graphicsPut(b2, g.head.x, g.head.y, green) # variable definition
  tail = g.body[0] # variable definition
  tailColour = if(tail.equals(g.priorTail), green, white) # variable definition
  return graphicsPut(b3, tail.x, tail.y, tailColour)

def graphicsPut(graphics: list[list[int]], x: int, y: int, colour: int) -> list[list[int]]: # function
  return graphics.withSet(x, graphics[x].withSet(y, colour))

def score(g: Game) -> int: # function
  return g.body.length() - 2

def moveSnake(g: Game) -> Game: # function
  k = g.key # variable definition
  x = g.head.x # variable definition
  y = g.head.y # variable definition
  newX = if(k.equals("a"), x - 1, if(k.equals("d"), x + 1, x)) # variable definition
  newY = if(k.equals("w"), y - 1, if(k.equals("s"), y + 1, y)) # variable definition
  return g.withBody(g.body.withAppend(g.head)).withHead(Square(newX, newY))

def eatAppleIfPoss(g: Game) -> Game: # function
  tail = g.body[0] # variable definition
  moveTail = g.body.subList(1, g.body.length()) # variable definition
  return if(headOverApple(g), g.withNewApple(), g.withPriorTail(tail).withBody(moveTail))

def headOverApple(g: Game) -> bool: # function
  return g.head.equals(g.apple)

def gameOver(g: Game) -> bool: # function
  return g.body.contains(g.head) or hasHitEdge(g)

def hasHitEdge(g: Game) -> bool: # function
  x = g.head.x # constant
  y = g.head.y # constant
  return (x == -1) or (y == -1) or (x == 40) or (y == 30)

class Game

  head: Square # property
  body: list[Square] # property
  priorTail: Square # property
  apple: Square # property
  isOn: bool # property
  rnd: Random # property
  key: str # property
  def __init__(self: Game, rnd: Random) -> None:
    self.head = Square(22, 15) # set
    self.body = [Square(20, 15), Square(21, 15)] # set
    self.priorTail = Square(0, 0) # set
    self.key = "d" # set
    self.isOn = True # set
    self.apple = Square(12, 15) # set
    self.rnd = rnd # set
  def toString(self: Game) -> str: # function
    return ""
  def withNewApple(self: Game) -> Game: # function
    x_rnd2 = self.rnd.nextInt(0, 39) # variable definition
    x = x_rnd2.item_0 # variable definition
    rnd2 = x_rnd2.item_1 # variable definition
    y_rnd3 = rnd2.nextInt(0, 29) # variable definition
    y = y_rnd3.item_0 # variable definition
    rnd3 = y_rnd3.item_1 # variable definition
    apple2 = Square(x, y) # variable definition
    g2 = self.withApple(apple2).withRnd(rnd3) # variable definition
    return if(g2.body.contains(apple2), g2.withNewApple(), g2)
  def withHead(self: Game, value: Square) -> Game: # function
    copyOfThis = copy(self) # variable definition
    copyOfThis.head = value # set
    return copyOfThis
  def withBody(self: Game, value: list[Square]) -> Game: # function
    copyOfThis = copy(self) # variable definition
    copyOfThis.body = value # set
    return copyOfThis
  def withPriorTail(self: Game, value: Square) -> Game: # function
    copyOfThis = copy(self) # variable definition
    copyOfThis.priorTail = value # set
    return copyOfThis
  def withApple(self: Game, value: Square) -> Game: # function
    copyOfThis = copy(self) # variable definition
    copyOfThis.apple = value # set
    return copyOfThis
  def withIsOn(self: Game, value: bool) -> Game: # function
    copyOfThis = copy(self) # variable definition
    copyOfThis.isOn = value # set
    return copyOfThis
  def withRnd(self: Game, value: Random) -> Game: # function
    copyOfThis = copy(self) # variable definition
    copyOfThis.rnd = value # set
    return copyOfThis
  def withKey(self: Game, value: str) -> Game: # function
    copyOfThis = copy(self) # variable definition
    copyOfThis.key = value # set
    return copyOfThis


class Square

  x: int # property
  y: int # property
  def __init__(self: Square, x: int, y: int) -> None:
    self.x = x # set
    self.y = y # set
  def withX(self: Square, value: int) -> Square: # function
    copyOfThis = copy(self) # variable definition
    copyOfThis.x = value # set
    return copyOfThis
  def withY(self: Square, value: int) -> Square: # function
    copyOfThis = copy(self) # variable definition
    copyOfThis.y = value # set
    return copyOfThis
  def toString(self: Square) -> str: # function
    return f"{self.x}, {self.y}"


def test_clockTick(self) -> None:
  g1 = Game(Random()) # variable definition
  g2 = g1.withNewApple() # variable definition
  g3 = clockTick(g2, "s") # variable definition
  self.assertEqual(g3.head, Square(22, 16))
  self.assertEqual(g3.body.length(), 2)
  self.assertEqual(g3.priorTail, g2.body[0])
  self.assertEqual(g3.isOn, True)
  g4 = g3.withApple(Square(22, 17)) # variable definition
  g5 = clockTick(g4, "s") # variable definition
  self.assertEqual(g5.body.length(), 3)
  self.assertEqual(g5.priorTail, g4.priorTail)
  self.assertEqual(g5.isOn, True)
  g6 = g5.withHead(Square(22, 29)) # variable definition
  g7 = clockTick(g6, "s") # variable definition
  self.assertEqual(g7.isOn, False)

def test_updateGraphics(self) -> None:
  blocks = createBlockGraphics(white) # variable definition
  g1 = Game(Random()) # variable definition
  blocks = updateGraphics(g1, blocks) # set
  self.assertEqual(blocks[12][15], red)
  self.assertEqual(blocks[22][15], green)
  self.assertEqual(blocks[21][15], white)
  g3 = clockTick(g1, "d") # variable definition
  blocks = updateGraphics(g3, blocks) # set
  self.assertEqual(blocks[12][15], red)
  self.assertEqual(blocks[22][15], green)
  self.assertEqual(blocks[23][15], green)

def test_testnewApple(self) -> None:
  g1 = Game(Random()) # variable definition
  self.assertEqual(g1.apple, Square(12, 15))
  g2 = g1.withNewApple() # variable definition
  self.assertEqual(g2.apple, Square(12, 15))
  g3 = g2.withNewApple() # variable definition
  self.assertEqual(g3.apple, Square(10, 12))
  # test that apple is never over snake
  g4 = (Game(Random())) # variable definition
  g5 = g4.withBody([Square(10, 12)]) # variable definition
  g6 = g5.withNewApple() # variable definition
  self.assertEqual(g4.apple, Square(12, 15))

def test_score(self) -> None:
  g1 = Game(Random()) # variable definition
  self.assertEqual(score(g1), 0)
  g2 = g1.withBody([Square(4, 4), Square(5, 4)]) # variable definition
  self.assertEqual(score(g2), 0)
  g3 = g1.withBody([Square(3, 4), Square(4, 4), Square(5, 4)]) # variable definition
  self.assertEqual(score(g3), 1)
  g4 = g1.withBody([Square(3, 4), Square(4, 4), Square(5, 4), Square(5, 5)]) # variable definition
  self.assertEqual(score(g4), 2)

def test_moveSnake(self) -> None:
  g1 = Game(Random()) # variable definition
  g2 = g1.withKey("a") # variable definition
  g3 = moveSnake(g2) # variable definition
  self.assertEqual(g3.head, Square(21, 15))
  g4 = g1.withKey("d") # variable definition
  g5 = moveSnake(g4) # variable definition
  self.assertEqual(g5.head, Square(23, 15))
  g6 = g1.withKey("w") # variable definition
  g7 = moveSnake(g6) # variable definition
  self.assertEqual(g7.head, Square(22, 14))
  g8 = g1.withKey("s") # variable definition
  g9 = moveSnake(g8) # variable definition
  self.assertEqual(g9.head, Square(22, 16))

def test_eatAppleIfPoss(self) -> None:
  g1 = Game(Random()) # variable definition
  self.assertEqual(g1.body.length(), 2)
  # negative case
  g2 = g1.withApple(Square(23, 15)) # variable definition
  g3 = eatAppleIfPoss(g2) # variable definition
  self.assertEqual(g3.body.length(), 1)
  self.assertEqual(g3.apple, g2.apple)
  self.assertEqual(g3.priorTail, g2.body[0])
  # positive case
  g4 = g2.withHead(Square(23, 15)) # variable definition
  g5 = eatAppleIfPoss(g4) # variable definition
  self.assertEqual(g5.body.length(), 2)
  self.assertEqual(g5.apple, Square(12, 15))
  self.assertEqual(g5.priorTail, g1.priorTail)

def test_overApple(self) -> None:
  g1 = Game(Random()) # variable definition
  g2 = g1.withApple(Square(23, 15)) # variable definition
  self.assertEqual(headOverApple(g2), False)
  g3 = g2.withHead(Square(23, 15)) # variable definition
  self.assertEqual(headOverApple(g3), True)

def test_gameOver(self) -> None:
  g1 = Game((Random())) # variable definition
  self.assertEqual(gameOver(g1), False)
  g2 = g1.withHead(Square(0, 0)) # variable definition
  self.assertEqual(gameOver(g2), False)
  g3 = g1.withHead(Square(40, 15)) # variable definition
  self.assertEqual(gameOver(g3), True)
  g4 = g1.withHead(Square(21, 15)) # variable definition
  self.assertEqual(gameOver(g4), True)

def test_headIsAtEdge(self) -> None:
  g1 = Game(Random()) # variable definition
  self.assertEqual(hasHitEdge(g1), False)
  g2 = g1.withHead(Square(40, 15)) # variable definition
  self.assertEqual(hasHitEdge(g2), True)
  g3 = g1.withHead(Square(-1, 15)) # variable definition
  self.assertEqual(hasHitEdge(g3), True)
  g4 = g1.withHead(Square(20, 30)) # variable definition
  self.assertEqual(hasHitEdge(g4), True)
  g5 = g1.withHead(Square(20, -1)) # variable definition
  self.assertEqual(hasHitEdge(g5), True)

def test_newSquare(self) -> None:
  sq = Square(3, 4) # variable definition
  self.assertEqual(sq.x, 3)
  self.assertEqual(sq.y, 4)

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
