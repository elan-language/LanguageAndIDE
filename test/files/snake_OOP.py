# Python with Elan 2.0.0-beta5

# Use the W,A,S,D keys to change Snake direction

width = 40 # constant

height = 30 # constant

def main() -> None:
  game = Game() # variable definition
  while game.isOn:
    game.clockTick(getKey()) # procedure call
    blocks = BlockGraphics() # variable definition
    game.updateBlocks(blocks) # procedure call
    displayBlockGraphics(blocks) # procedure call
    sleep_ms(150) # procedure call
  # end while
  print(f"Game Over! Score: {game.score()}")
# end main

class Game: # concrete class

  def __init__(self: Game) -> None:
    self.snake = Snake(620) # assignment
    self.currentDir = "d" # assignment
    self.newAppleNeeded = True # assignment
    self.isOn = True # assignment
  # end constructor

  snake: Snake # private property

  currentDir: str # private property

  apple: int # private property

  newAppleNeeded: bool # private property

  isOn: bool # property

  def newAppleIfNeeded(self: Game) -> None: # procedure method
    while self.newAppleNeeded or self.snake.bodyCovers(self.apple):
      self.apple = randint(0, width*height - 1) # assignment
      self.newAppleNeeded = False # assignment
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
    if snake.dead:
      self.isOn = False # assignment
    # end if
  # end procedure method

  def updateBlocks(self: Game, blocks: BlockGraphics) -> None: # procedure method
    #  TODO 3502
    snake = self.snake # variable definition
    snake.addToBlocks(blocks) # procedure call
    blocks.putBlockNo(self.apple, red) # procedure call
  # end procedure method

  def setDirectionIfKeyPress(self: Game, key: str) -> None: # procedure method
    if not key.equals("") and "wasd".contains(key):
      self.currentDir = key # assignment
    # end if
  # end procedure method

  def score(self: Game) -> int: # function method
    return self.snake.length() - 1
  # end function method

  def toString(self: Game) -> str: # function method
    return "undefined"
  # end function method

# end class

class Snake: # concrete class

  def __init__(self: Snake, head: int) -> None:
    self.head = head # assignment
    self.body = [self.head - 1, self.head] # assignment
  # end constructor

  head: int # property

  body: list[int] # private property

  dead: bool # property

  def moveHead(self: Snake, dir: str) -> None: # procedure method
    newCol = self.head % width # variable definition
    newRow = divAsInt(self.head, width) # variable definition
    if dir.equals("w"):
      newRow = newRow - 1 # assignment
    elif dir.equals("a"): # else if
      newCol = newCol - 1 # assignment
    elif dir.equals("s"): # else if
      newRow = newRow + 1 # assignment
    elif dir.equals("d"): # else if
      newCol = newCol + 1 # assignment
    # end if
    self.head = -1 # assignment
    if (newCol >= 0) and (newCol < width) and (newRow >= 0) and (newRow < height):
      self.head = newRow*width + newCol # assignment
    # end if
    if (self.head == -1) or self.body.contains(self.head):
      self.dead = True # assignment
    else:
      #  3502
      body = self.body # variable definition
      body.append(self.head) # procedure call
    # end if
  # end procedure method

  def moveTail(self: Snake) -> None: # procedure method
    # 3502
    body = self.body # variable definition
    body.removeAt(0) # procedure call
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
    return f"a Snake"
  # end function method

# end class

main()
