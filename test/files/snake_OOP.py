# Python with Elan 2.0.0-beta1

# Use the W,A,S,D keys to change Snake direction

def main() -> None:
  blocks = createBlockGraphics(white) # variable definition
  snake = Snake() # variable definition
  apple = Apple() # variable definition
  apple.newRandomPosition(snake) # procedure call
  while not snake.gameOver():
    snake.updateBlocks(blocks) # procedure call
    apple.updateBlocks(blocks) # procedure call
    displayBlocks(blocks) # procedure call
    sleep_ms(150) # procedure call
    snake.clockTick(getKey(), apple) # procedure call
  # end while
  print(f"Game Over! Score: {snake.score()}")
# end main

class Snake: # concrete class

  def __init__(self: Snake) -> None:
    tail = Square(20, 15) # variable definition
    self.currentDir = Direction.right # assignment
    self.body = [tail] # assignment
    self.head = tail.getAdjacentSquare(self.currentDir) # assignment
    self.priorTail = tail # assignment
  # end constructor

  currentDir: Direction # private property

  head: Square # private property

  body: list[Square] # private property

  priorTail: Square # private property

  def clockTick(self: Snake, key: str, apple: Apple) -> None: # procedure method
    self.setDirection(key) # procedure call
    self.priorTail = self.body[0] # assignment
    body = self.body # variable definition
    body.append(self.head) # procedure call
    self.head = self.head.getAdjacentSquare(self.currentDir) # assignment
    if self.head.equals(apple.location):
      apple.newRandomPosition(self) # procedure call
    else:
      self.body = self.body.subList(1, self.body.length()) # assignment
    # end if
  # end procedure method

  def updateBlocks(self: Snake, blocks: list[list[int]]) -> None: # procedure method
    blocks[self.head.x][self.head.y] = green # assignment
    if not self.body[0].equals(self.priorTail):
      blocks[self.priorTail.x][self.priorTail.y] = white # assignment
    # end if
  # end procedure method

  def score(self: Snake) -> int: # function method
    return self.body.length() - 1
  # end function method

  def bodyCovers(self: Snake, sq: Square) -> bool: # function method
    result = False # variable definition
    for seg in self.body:
      if (seg.equals(sq)):
        result = True # assignment
      # end if
    # end for
    return result
  # end function method

  def gameOver(self: Snake) -> bool: # function method
    return self.bodyCovers(self.head) or self.head.hasHitEdge()
  # end function method

  def setDirection(self: Snake, key: str) -> None: # private procedure method
    if key.equals("w"):
      self.currentDir = Direction.up # assignment
    elif key.equals("s"): # else if
      self.currentDir = Direction.down # assignment
    elif key.equals("a"): # else if
      self.currentDir = Direction.left # assignment
    elif key.equals("d"): # else if
      self.currentDir = Direction.right # assignment
    # end if
  # end procedure method

  def toString(self: Snake) -> str: # function method
    return f"a Snake with head at {self.head}"
  # end function method

# end class

class Apple: # concrete class

  def __init__(self: Apple) -> None:
    self.location = Square(0, 0) # assignment
  # end constructor

  location: Square # property

  def newRandomPosition(self: Apple, snake: Snake) -> None: # procedure method
    changePosition = True # variable definition
    while changePosition:
      ranX = randint(0, 39) # variable definition
      ranY = randint(0, 29) # variable definition
      self.location = Square(ranX, ranY) # assignment
      if not snake.bodyCovers(self.location):
        changePosition = False # assignment
      # end if
    # end while
  # end procedure method

  def updateBlocks(self: Apple, blocks: list[list[int]]) -> None: # procedure method
    blocks[self.location.x][self.location.y] = red # assignment
  # end procedure method

  def toString(self: Apple) -> str: # function method
    return f"an Apple at {self.location}"
  # end function method

# end class

class Square: # concrete class

  def __init__(self: Square, x: int, y: int) -> None:
    self.x = x # assignment
    self.y = y # assignment
  # end constructor

  x: int # property

  y: int # property

  def getAdjacentSquare(self: Square, d: Direction) -> Square: # function method
    newX = self.x # variable definition
    newY = self.y # variable definition
    if d == Direction.left:
      newX = self.x - 1 # assignment
    elif d == Direction.right: # else if
      newX = self.x + 1 # assignment
    elif d == Direction.up: # else if
      newY = self.y - 1 # assignment
    elif d == Direction.down: # else if
      newY = self.y + 1 # assignment
    # end if
    return Square(newX, newY)
  # end function method

  def hasHitEdge(self: Square) -> bool: # function method
    return (self.x == -1) or (self.y == -1) or (self.x == 40) or (self.y == 30)
  # end function method

  def toString(self: Square) -> str: # function method
    return "{this.x}, {this.y}"
  # end function method

# end class

class Direction(Enum):
  up = 1
  down = 2
  left = 3
  right = 4

class Test_snake(unittest.TestCase):
 def test_snake(self) -> None:
  snake = Snake() # variable definition
  # bodyCovers
  self.assertEqual(snake.bodyCovers(Square(20, 15)), True)
  self.assertEqual(snake.bodyCovers(Square(21, 15)), False)
  # gameOver, score - can only test test_for default - which is not thorough test
  self.assertEqual(snake.gameOver(), False)
  self.assertEqual(snake.score(), 0)
# end test

class Test_apple(unittest.TestCase):
 def test_apple(self) -> None:
  # no tests
# end test

class Test_square(unittest.TestCase):
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
# end test

main()
