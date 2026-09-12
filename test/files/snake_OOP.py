# Python with Elan 2.0.0-beta4

# Use the W,A,S,D keys to change Snake direction

def main() -> None:
  board = Board() # variable definition
  game = Game(board) # variable definition
  while not game.over():
    game.clockTick(getKey()) # procedure call
    blocks = BlockGraphics() # variable definition
    game.updateBlocks(blocks) # procedure call
    displayBlockGraphics(blocks) # procedure call
    sleep_ms(150) # procedure call
  # end while
  print(f"Game Over! Score: {game.score()}")
# end main

class Game: # concrete class

  def __init__(self: Game, board: Board) -> None:
    self.board = board # assignment
    self.snake = Snake(board) # assignment
    self.currentDir = Direction.right # assignment
    self.newAppleNeeded = True # assignment
  # end constructor

  board: Board # property

  snake: Snake # private property

  currentDir: Direction # private property

  apple: int # private property

  newAppleNeeded: bool # private property

  def newAppleIfNeeded(self: Game) -> None: # procedure method
    while self.newAppleNeeded:
      self.apple = randint(0, self.board.maxSquareNo()) # assignment
      if not self.snake.bodyCovers(self.apple):
        self.newAppleNeeded = False # assignment
      # end if
    # end while
  # end procedure method

  def clockTick(self: Game, key: str) -> None: # procedure method
    self.newAppleIfNeeded() # procedure call
    self.setDirectionIfKeyPress(key) # procedure call
    #  TODO 3502
    snake = self.snake # variable definition
    snake.moveHead(self.currentDir) # procedure call
    if snake.bodyCovers(self.apple):
      self.newAppleNeeded = True # assignment
    elif not snake.dead: # else if
      snake.moveTail() # procedure call
    # end if
  # end procedure method

  def updateBlocks(self: Game, blocks: BlockGraphics) -> None: # procedure method
    #  TODO 3502
    snake = self.snake # variable definition
    snake.addToBlocks(blocks) # procedure call
    blocks.putBlockNo(self.apple, red) # procedure call
  # end procedure method

  def setDirectionIfKeyPress(self: Game, key: str) -> None: # procedure method
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

  def score(self: Game) -> int: # function method
    return self.snake.length() - 1
  # end function method

  def over(self: Game) -> bool: # function method
    return self.snake.dead
  # end function method

  def toString(self: Game) -> str: # function method
    return "undefined"
  # end function method

# end class

class Snake: # concrete class

  def __init__(self: Snake, board: Board) -> None:
    self.board = board # assignment
    self.body = [620, 619] # assignment
  # end constructor

  body: list[int] # private property

  board: Board # property

  dead: bool # property

  def moveHead(self: Snake, dir: Direction) -> None: # procedure method
    head = self.body[0] # variable definition
    col = self.board.col(head) # variable definition
    row = self.board.row(head) # variable definition
    if dir == Direction.left:
      col = col - 1 # assignment
    elif dir == Direction.right: # else if
      col = col + 1 # assignment
    elif dir == Direction.up: # else if
      row = row - 1 # assignment
    elif dir == Direction.down: # else if
      row = row + 1 # assignment
    # end if
    newHead = self.board.squareNo(col, row) # variable definition
    board = self.board # variable definition
    if not self.board.isInBounds(col, row) or self.body.contains(newHead):
      self.dead = True # assignment
    else:
      #  3502
      body = self.body # variable definition
      body.prepend(newHead) # procedure call
    # end if
  # end procedure method

  def moveTail(self: Snake) -> None: # procedure method
    # 3502
    body = self.body # variable definition
    body.removeAt(self.length() - 1) # procedure call
  # end procedure method

  def addToBlocks(self: Snake, blocks: BlockGraphics) -> None: # procedure method
    for block in self.body:
      blocks.putBlockNo(block, green) # procedure call
    # end for
  # end procedure method

  def bodyCovers(self: Snake, sq: int) -> bool: # function method
    return self.body.contains(sq)
  # end function method

  def length(self: Snake) -> int: # function method
    return self.body.length()
  # end function method

  def toString(self: Snake) -> str: # function method
    return f"a Snake of length{self.length()}"
  # end function method

# end class

class Board: # concrete class

  def __init__(self: Board) -> None:
    self.width = 40 # assignment
    self.height = 30 # assignment
  # end constructor

  width: int # private property

  height: int # private property

  def squareNo(self: Board, col: int, row: int) -> int: # function method
    return row*self.width + col
  # end function method

  def maxSquareNo(self: Board) -> int: # function method
    return self.width*self.height - 1
  # end function method

  def col(self: Board, squareNo: int) -> int: # function method
    return squareNo % self.width
  # end function method

  def row(self: Board, squareNo: int) -> int: # function method
    return divAsInt(squareNo, self.width)
  # end function method

  def isInBounds(self: Board, col: int, row: int) -> bool: # function method
    return (col >= 0) and (col < self.width) and (row >= 0) and (row < self.height)
  # end function method

  def toString(self: Board) -> str: # function method
    return "undefined"
  # end function method

# end class

class Direction(Enum):
  up = 1
  down = 2
  left = 3
  right = 4

main()
