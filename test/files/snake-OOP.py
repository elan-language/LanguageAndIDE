# Python with Elan 2.0.0-alpha1

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

class Snake

  def __init__(self: Snake) -> None:
    tail = Square(20, 15) # variable definition
    self.currentDir = Direction.right # change variable
    self.body = [tail] # change variable
    self.head = tail.getAdjacentSquare(self.currentDir) # change variable
    self.priorTail = tail # change variable
  def toString(self: Snake) -> str: # function
    return ""
  currentDir: Direction # private property
  head: Square # private property
  body: list[Square] # private property
  priorTail: Square # private property
  def clockTick(self: Snake, key: str, apple: Apple) -> None: # procedure
    self.setDirection(key) # call procedure
    self.priorTail = self.body[0] # change variable
    body = self.body # variable definition
    body.append(self.head) # call procedure
    self.head = self.head.getAdjacentSquare(self.currentDir) # change variable
    if self.head.equals(apple.location):
      apple.newRandomPosition(self) # call procedure
    else:
      self.body = self.body.subList(1, len(self.body)) # change variable
  def updateBlocks(self: Snake, blocks: list[list[int]]) -> None: # procedure
    blocks[self.head.x][self.head.y] = green # change variable
    if not self.body[0].equals(self.priorTail):
      blocks[self.priorTail.x][self.priorTail.y] = white # change variable
  def score(self: Snake) -> int: # function
    return len(self.body) - 1
  def bodyCovers(self: Snake, sq: Square) -> bool: # function
    result = False # variable definition
    for seg in self.body:
      if (seg.equals(sq)):
        result = True # change variable
    return result
  def gameOver(self: Snake) -> bool: # function
    return self.bodyCovers(self.head) or self.head.hasHitEdge()
  def setDirection(self: Snake, key: str) -> None: # private procedure
    if key.equals("w"):
      self.currentDir = Direction.up # change variable
    elif key.equals("s"):
      self.currentDir = Direction.down # change variable
    elif key.equals("a"):
      self.currentDir = Direction.left # change variable
    elif key.equals("d"):
      self.currentDir = Direction.right # change variable


class Apple

  def __init__(self: Apple) -> None:
    self.location = Square(0, 0) # change variable
  def toString(self: Apple) -> str: # function
    return ""
  location: Square # property
  def newRandomPosition(self: Apple, snake: Snake) -> None: # procedure
    changePosition = True # variable definition
    while changePosition:
      ranX = randint(0, 39) # constant
      ranY = randint(0, 29) # constant
      self.location = Square(ranX, ranY) # change variable
      if not snake.bodyCovers(self.location):
        changePosition = False # change variable
  def updateBlocks(self: Apple, blocks: list[list[int]]) -> None: # procedure
    blocks[self.location.x][self.location.y] = red # change variable


class Square

  def __init__(self: Square, x: int, y: int) -> None:
    self.x = x # change variable
    self.y = y # change variable
  def toString(self: Square) -> str: # function
    return ""
  x: int # property
  y: int # property
  def getAdjacentSquare(self: Square, d: Direction) -> Square: # function
    newX = self.x # variable definition
    newY = self.y # variable definition
    if d == Direction.left:
      newX = self.x - 1 # change variable
    elif d == Direction.right:
      newX = self.x + 1 # change variable
    elif d == Direction.up:
      newY = self.y - 1 # change variable
    elif d == Direction.down:
      newY = self.y + 1 # change variable
    return Square(newX, newY)
  def hasHitEdge(self: Square) -> bool: # function
    return (self.x == -1) or (self.y == -1) or (self.x == 40) or (self.y == 30)


Direction = Enum('Direction', 'up, down, left, right')

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
