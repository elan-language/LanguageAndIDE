# Python with Elan 2.0.0-alpha5

# Use the W,A,S,D keys to change Snake direction

def main() -> None:
  blocks = createBlockGraphics(white) # variable definition
  snake = Snake() # variable definition
  apple = Apple() # variable definition
  apple.newRandomPosition(snake) # call procedure
  while not snake.gameOver():
    snake.updateBlocks(blocks) # call procedure
    apple.updateBlocks(blocks) # call procedure
    displayBlocks(blocks) # call procedure
    sleep_ms(150) # call procedure
    snake.clockTick(getKey(), apple) # call procedure
  print(f"Game Over! Score: {snake.score()}")

class Snake # concrete class

  def __init__(self: Snake) -> None:
    tail = Square(20, 15) # variable definition
    self.currentDir = Direction.right # re-assign variable
    self.body = [tail] # re-assign variable
    self.head = tail.getAdjacentSquare(self.currentDir) # re-assign variable
    self.priorTail = tail # re-assign variable
  def toString(self: Snake) -> str: # function method
    return ""
  currentDir: Direction # private property
  head: Square # private property
  body: list[Square] # private property
  priorTail: Square # private property
  def clockTick(self: Snake, key: str, apple: Apple) -> None: # procedure method
    self.setDirection(key) # call procedure
    self.priorTail = self.body[0] # re-assign variable
    body = self.body # variable definition
    body.append(self.head) # call procedure
    self.head = self.head.getAdjacentSquare(self.currentDir) # re-assign variable
    if self.head.equals(apple.location):
      apple.newRandomPosition(self) # call procedure
    else:
      self.body = self.body.subList(1, self.body.length()) # re-assign variable
  def updateBlocks(self: Snake, blocks: list[list[int]]) -> None: # procedure method
    blocks[self.head.x][self.head.y] = green # re-assign variable
    if not self.body[0].equals(self.priorTail):
      blocks[self.priorTail.x][self.priorTail.y] = white # re-assign variable
  def score(self: Snake) -> int: # function method
    return self.body.length() - 1
  def bodyCovers(self: Snake, sq: Square) -> bool: # function method
    result = False # variable definition
    for seg in self.body:
      if (seg.equals(sq)):
        result = True # re-assign variable
    return result
  def gameOver(self: Snake) -> bool: # function method
    return self.bodyCovers(self.head) or self.head.hasHitEdge()
  def setDirection(self: Snake, key: str) -> None: # private procedure method
    if key.equals("w"):
      self.currentDir = Direction.up # re-assign variable
    elif key.equals("s"): # else if
      self.currentDir = Direction.down # re-assign variable
    elif key.equals("a"): # else if
      self.currentDir = Direction.left # re-assign variable
    elif key.equals("d"): # else if
      self.currentDir = Direction.right # re-assign variable


class Apple # concrete class

  def __init__(self: Apple) -> None:
    self.location = Square(0, 0) # re-assign variable
  def toString(self: Apple) -> str: # function method
    return ""
  location: Square # property
  def newRandomPosition(self: Apple, snake: Snake) -> None: # procedure method
    changePosition = True # variable definition
    while changePosition:
      ranX = randint(0, 39) # variable definition
      ranY = randint(0, 29) # variable definition
      self.location = Square(ranX, ranY) # re-assign variable
      if not snake.bodyCovers(self.location):
        changePosition = False # re-assign variable
  def updateBlocks(self: Apple, blocks: list[list[int]]) -> None: # procedure method
    blocks[self.location.x][self.location.y] = red # re-assign variable


class Square # concrete class

  def __init__(self: Square, x: int, y: int) -> None:
    self.x = x # re-assign variable
    self.y = y # re-assign variable
  def toString(self: Square) -> str: # function method
    return ""
  x: int # property
  y: int # property
  def getAdjacentSquare(self: Square, d: Direction) -> Square: # function method
    newX = self.x # variable definition
    newY = self.y # variable definition
    if d == Direction.left:
      newX = self.x - 1 # re-assign variable
    elif d == Direction.right: # else if
      newX = self.x + 1 # re-assign variable
    elif d == Direction.up: # else if
      newY = self.y - 1 # re-assign variable
    elif d == Direction.down: # else if
      newY = self.y + 1 # re-assign variable
    return Square(newX, newY)
  def hasHitEdge(self: Square) -> bool: # function method
    return (self.x == -1) or (self.y == -1) or (self.x == 40) or (self.y == 30)


class Direction(Enum):
  up = 1
  down = 2
  left = 3
  right = 4

def test_snake(self) -> None:
  snake = Snake() # variable definition
  # bodyCovers
  self.assertEqual(snake.bodyCovers(Square(20, 15)), True)
  self.assertEqual(snake.bodyCovers(Square(21, 15)), False)
  # gameOver, score - can only test test_for default - which is not thorough test
  self.assertEqual(snake.gameOver(), False)
  self.assertEqual(snake.score(), 0)

def test_apple(self) -> None:
  # no tests

def test_square(self) -> None:
  # constructor - not testable as properties are private
  # getAdjacentSquare
  sq1 = Square(3, 4) # variable definition
  self.assertEqual(sq1.getAdjacentSquare(Direction.up), Square(3, 3))
  self.assertEqual(sq1.getAdjacentSquare(Direction.down), Square(3, 5))
  self.assertEqual(sq1.getAdjacentSquare(Direction.left), Square(2, 4))
  self.assertEqual(sq1.getAdjacentSquare(Direction.right), Square(4, 4))
  sq2 = Square(0, 0) # variable definition
  sq3 = Square(-1, 0) # variable definition
  self.assertEqual(sq2.getAdjacentSquare(Direction.left), sq3)
  # hasHitEdge
  self.assertEqual((Square(0, 0)).hasHitEdge(), False)
  self.assertEqual((Square(39, 20)).hasHitEdge(), False)
  self.assertEqual((Square(-1, 3)).hasHitEdge(), True)
  self.assertEqual((Square(3, -1)).hasHitEdge(), True)
  self.assertEqual((Square(40, 3)).hasHitEdge(), True)
  self.assertEqual((Square(3, 30)).hasHitEdge(), True)

main()
