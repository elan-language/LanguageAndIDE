# 4d2519e53e8c528698431c0e05721508bf5700070729f998138a6df46534ba40 Elan 1.9.0 guest default_profile valid

# Use the W,A,S,D keys to change Snake direction
def main -> None:  # [main]
  blocks = new Array2D<of Int>(40, 30, white) # [variable definition]
  rnd = new Random() # [variable definition]
  rnd.initialiseFromClock() # [call procedure]}
  game = newGame(rnd) # [variable definition]
  while game.isOn
    blocks = updateGraphics(game, blocks) # [assign variable]
    displayBlocks(blocks) # [call procedure]}
    pause(150) # [call procedure]}
    game = clockTick(game, getKey()) # [assign variable]
  print "Game Over! Score: {score(game)}"


def clockTick(g: Game, k: String) -> Game:  # [function]
  g2 = if k is "" then g else copy g with key set to k # [variable definition]
  g3 = moveSnake(g2) # [variable definition]
  g4 = eatAppleIfPoss(g3) # [variable definition]
  return if gameOver(g4) then copy g4 with isOn set to false else g4


def updateGraphics(g: Game, b: Array2D<of Int>) -> Array2D<of Int>:  # [function]
  b2 = b.withPut(g.apple.x, g.apple.y, red) # [variable definition]
  b3 = b2.withPut(g.head.x, g.head.y, green) # [variable definition]
  tail = g.body[0] # [variable definition]
  tailColour = if tail is g.priorTail then green else white # [variable definition]
  return b3.withPut(tail.x, tail.y, tailColour)


def newApple(g: Game) -> Game:  # [function]
  x, rnd2 = g.rnd.nextInt(0, 39) # [variable definition]
  y, rnd3 = rnd2.nextInt(0, 29) # [variable definition]
  apple2 = newSquare(x, y) # [variable definition]
  g2 = copy g with apple set to apple2, rnd set to rnd3 # [variable definition]
  return if g2.body.contains(apple2) then newApple(g2) else g2


def score(g: Game) -> Int:  # [function]
  return g.body.length() - 2


def moveSnake(g: Game) -> Game:  # [function]
  k = g.key # [variable definition]
  x, y = g.head # [variable definition]
  newX = if k is "a" then x - 1 else if k is "d" then x + 1 else x # [variable definition]
  newY = if k is "w" then y - 1 else if k is "s" then y + 1 else y # [variable definition]
  return copy g with body set to g.body.withAppend(g.head), head set to newSquare(newX, newY)


def eatAppleIfPoss(g: Game) -> Game:  # [function]
  tail = g.body[0] # [variable definition]
  moveTail = g.body[1..g.body.length()] # [variable definition]
  return if headOverApple(g) then newApple(g) else copy g with priorTail set to tail, body set to moveTail


def headOverApple(g: Game) -> Boolean:  # [function]
  return g.head is g.apple


def gameOver(g: Game) -> Boolean:  # [function]
  return g.body.contains(g.head) or hasHitEdge(g)


def hasHitEdge(g: Game) -> Boolean:  # [function]
  x, y = g.head # [variable definition]
  return (x is -1) or (y is -1) or (x is 40) or (y is 30)


def newGame(rnd: Random) -> Game:  # [function]
  g = new Game() with rnd set to rnd, head set to newSquare(22, 15), body set to {newSquare(20, 15), newSquare(21, 15)}, priorTail set to empty Square, key set to "d", isOn set to true # [variable definition]
  return newApple(g)


record Game
  head: Square = None # [property]

  body: ListImmutable<of Square> = None # [property]

  priorTail: Square = None # [property]

  apple: Square = None # [property]

  isOn: Boolean = None # [property]

  rnd: Random = None # [property]

  key: String = None # [property]

end record

def newSquare(x: Int, y: Int) -> Square:  # [function]
  return new Square() with x set to x, y set to y


record Square
  x: Int = None # [property]

  y: Int = None # [property]

  function asString() returns String
    return "{property.x}, {property.y}"
  end function

end record

def test_clockTick() -> None:  # [test]
  g1 = newGame(new Random()) # [variable definition]
  g2 = newApple(g1) # [variable definition]
  g3 = clockTick(g2, "s") # [variable definition]
  assertEqual(g3.head, newSquare(22, 16))  # [assert]
  assertEqual(g3.body.length(), 2)  # [assert]
  assertEqual(g3.priorTail, g2.body[0])  # [assert]
  assertEqual(g3.isOn, true)  # [assert]
  g4 = copy g3 with apple set to newSquare(22, 17) # [variable definition]
  g5 = clockTick(g4, "s") # [variable definition]
  assertEqual(g5.body.length(), 3)  # [assert]
  assertEqual(g5.priorTail, g4.priorTail)  # [assert]
  assertEqual(g5.isOn, true)  # [assert]
  g6 = copy g5 with head set to newSquare(22, 29) # [variable definition]
  g7 = clockTick(g6, "s") # [variable definition]
  assertEqual(g7.isOn, false)  # [assert]


def test_updateGraphics() -> None:  # [test]
  blocks = new Array2D<of Int>(40, 30, white) # [variable definition]
  g1 = newGame(new Random()) # [variable definition]
  blocks = updateGraphics(g1, blocks) # [assign variable]
  assertEqual(blocks[12, 15], red)  # [assert]
  assertEqual(blocks[22, 15], green)  # [assert]
  assertEqual(blocks[21, 15], white)  # [assert]
  g3 = clockTick(g1, "d") # [variable definition]
  blocks = updateGraphics(g3, blocks) # [assign variable]
  assertEqual(blocks[12, 15], red)  # [assert]
  assertEqual(blocks[22, 15], green)  # [assert]
  assertEqual(blocks[23, 15], green)  # [assert]


def test_newApple() -> None:  # [test]
  g1 = newGame(new Random()) # [variable definition]
  assertEqual(g1.apple, newSquare(12, 15))  # [assert]
  g2 = newApple(g1) # [variable definition]
  assertEqual(g2.apple, newSquare(10, 12))  # [assert]
  g3 = newApple(g2) # [variable definition]
  assertEqual(g3.apple, newSquare(28, 24))  # [assert]
  # test that apple is never over snake
  g4 = newGame(new Random()) # [variable definition]
  g5 = copy g4 with body set to {newSquare(10, 12)} # [variable definition]
  g6 = newApple(g5) # [variable definition]
  assertEqual(g6.apple, newSquare(28, 24))  # [assert]


def test_score() -> None:  # [test]
  g1 = newGame(new Random()) # [variable definition]
  assertEqual(score(g1), 0)  # [assert]
  g2 = copy g1 with body set to {newSquare(4, 4), newSquare(5, 4)} # [variable definition]
  assertEqual(score(g2), 0)  # [assert]
  g3 = copy g1 with body set to {newSquare(3, 4), newSquare(4, 4), newSquare(5, 4)} # [variable definition]
  assertEqual(score(g3), 1)  # [assert]
  g4 = copy g1 with body set to {newSquare(3, 4), newSquare(4, 4), newSquare(5, 4), newSquare(5, 5)} # [variable definition]
  assertEqual(score(g4), 2)  # [assert]


def test_moveSnake() -> None:  # [test]
  g1 = newGame(new Random()) # [variable definition]
  g2 = copy g1 with key set to "a" # [variable definition]
  g3 = moveSnake(g2) # [variable definition]
  assertEqual(g3.head, newSquare(21, 15))  # [assert]
  g4 = copy g1 with key set to "d" # [variable definition]
  g5 = moveSnake(g4) # [variable definition]
  assertEqual(g5.head, newSquare(23, 15))  # [assert]
  g6 = copy g1 with key set to "w" # [variable definition]
  g7 = moveSnake(g6) # [variable definition]
  assertEqual(g7.head, newSquare(22, 14))  # [assert]
  g8 = copy g1 with key set to "s" # [variable definition]
  g9 = moveSnake(g8) # [variable definition]
  assertEqual(g9.head, newSquare(22, 16))  # [assert]


def test_eatAppleIfPoss() -> None:  # [test]
  g1 = newGame(new Random()) # [variable definition]
  assertEqual(g1.body.length(), 2)  # [assert]
  # negative case
  g2 = copy g1 with apple set to newSquare(23, 15) # [variable definition]
  g3 = eatAppleIfPoss(g2) # [variable definition]
  assertEqual(g3.body.length(), 1)  # [assert]
  assertEqual(g3.apple, g2.apple)  # [assert]
  assertEqual(g3.priorTail, g2.body[0])  # [assert]
  # positive case
  g4 = copy g2 with head set to newSquare(23, 15) # [variable definition]
  g5 = eatAppleIfPoss(g4) # [variable definition]
  assertEqual(g5.body.length(), 2)  # [assert]
  assertEqual(g5.apple, newSquare(10, 12))  # [assert]
  assertEqual(g5.priorTail, g1.priorTail)  # [assert]


def test_overApple() -> None:  # [test]
  g1 = newGame(new Random()) # [variable definition]
  g2 = copy g1 with apple set to newSquare(23, 15) # [variable definition]
  assertEqual(headOverApple(g2), false)  # [assert]
  g3 = copy g2 with head set to newSquare(23, 15) # [variable definition]
  assertEqual(headOverApple(g3), true)  # [assert]


def test_gameOver() -> None:  # [test]
  g1 = newGame(new Random()) # [variable definition]
  assertEqual(gameOver(g1), false)  # [assert]
  g2 = copy g1 with head set to newSquare(0, 0) # [variable definition]
  assertEqual(gameOver(g2), false)  # [assert]
  g3 = copy g1 with head set to newSquare(40, 15) # [variable definition]
  assertEqual(gameOver(g3), true)  # [assert]
  g4 = copy g1 with head set to newSquare(21, 15) # [variable definition]
  assertEqual(gameOver(g4), true)  # [assert]


def test_headIsAtEdge() -> None:  # [test]
  g1 = newGame(new Random()) # [variable definition]
  assertEqual(hasHitEdge(g1), false)  # [assert]
  g2 = copy g1 with head set to newSquare(40, 15) # [variable definition]
  assertEqual(hasHitEdge(g2), true)  # [assert]
  g3 = copy g1 with head set to newSquare(-1, 15) # [variable definition]
  assertEqual(hasHitEdge(g3), true)  # [assert]
  g4 = copy g1 with head set to newSquare(20, 30) # [variable definition]
  assertEqual(hasHitEdge(g4), true)  # [assert]
  g5 = copy g1 with head set to newSquare(20, -1) # [variable definition]
  assertEqual(hasHitEdge(g5), true)  # [assert]


def test_newSquare() -> None:  # [test]
  sq = newSquare(3, 4) # [variable definition]
  assertEqual(sq.x, 3)  # [assert]
  assertEqual(sq.y, 4)  # [assert]


def test_newGame() -> None:  # [test]
  rnd = new Random() # [variable definition]
  game = newGame(rnd) # [variable definition]
  toTest = game.rnd is rnd # [variable definition]
  assertEqual(toTest, false)  # [assert]
  assertEqual(game.head, newSquare(22, 15))  # [assert]
  body = game.body # [variable definition]
  assertEqual(body.length(), 2)  # [assert]
  assertEqual(body[0], newSquare(20, 15))  # [assert]
  assertEqual(body[1], newSquare(21, 15))  # [assert]
  assertEqual(game.priorTail, newSquare(0, 0))  # [assert]
  assertEqual(game.key, "d")  # [assert]
  assertEqual(game.isOn, true)  # [assert]


