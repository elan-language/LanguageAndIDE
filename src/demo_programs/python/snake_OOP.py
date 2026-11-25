# c65daf398999bc3434bee71e263b1772fa536fab5a99135dd0eaf23e88fbc868 Python with Elan 3.0.0-alpha valid

width = 40

height = 30

def main() -> None:
  game = Game() # variable definition
  while game.isOn:
    game.clockTick(getKey())
    blocks = BlockGraphics() # variable definition
    game.updateBlocks(blocks)
    displayBlockGraphics(blocks)
    sleep_ms(150)
  # end while
  print(f"Game Over! Score: {game.score()}")
# end main

class Game:
  def __init__(self: <el-type>Game</el-type>, ) -> None:
    self.snake = Snake(620) # assignment
    self.currentDir = "d" # assignment
    self.newAppleNeeded = True # assignment
    self.isOn = True # assignment
  # end constructor

  snake: Snake # private

  currentDir: str # private

  apple: int # private

  newAppleNeeded: bool # private

  isOn: bool

  def newAppleIfNeeded(self: <el-type>Game</el-type>, ) -> None:
    while self.newAppleNeeded or self.snake.bodyCovers(self.apple):
      self.apple = randint(0, width*height - 1) # assignment
      self.newAppleNeeded = False # assignment
    # end while
  # end procedure

  def clockTick(self: <el-type>Game</el-type>, key: str) -> None:
    self.newAppleIfNeeded()
    self.setDirectionIfKeyPress(key)
    #  TODO 3502
    snake = self.snake # variable definition
    snake.moveHead(self.currentDir)
    if snake.bodyCovers(self.apple):
      self.newAppleNeeded = True # assignment
    elif not snake.dead:
      snake.moveTail()
    # end if
    if snake.dead:
      self.isOn = False # assignment
    # end if
  # end procedure

  def updateBlocks(self: <el-type>Game</el-type>, blocks: BlockGraphics) -> None:
    #  TODO 3502
    snake = self.snake # variable definition
    snake.addToBlocks(blocks)
    blocks.putBlockNo(self.apple, red)
  # end procedure

  def setDirectionIfKeyPress(self: <el-type>Game</el-type>, key: str) -> None:
    if not key.equals("") and "wasd".contains(key):
      self.currentDir = key # assignment
    # end if
  # end procedure

  def score(self: <el-type>Game</el-type>, ) -> int:
    return self.snake.length() - 1
  # end function

  def toString(self: <el-type>Game</el-type>, ) -> str:
    return "undefined"
  # end function

# end class

class Snake:
  def __init__(self: <el-type>Snake</el-type>, head: int) -> None:
    self.head = head # assignment
    self.body = [self.head - 1, self.head] # assignment
  # end constructor

  head: int

  body: list[int] # private

  dead: bool

  def moveHead(self: <el-type>Snake</el-type>, dir: str) -> None:
    newCol = self.head % width # variable definition
    newRow = divAsInt(self.head, width) # variable definition
    if dir.equals("w"):
      newRow = newRow - 1 # assignment
    elif dir.equals("a"):
      newCol = newCol - 1 # assignment
    elif dir.equals("s"):
      newRow = newRow + 1 # assignment
    elif dir.equals("d"):
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
      body.append(self.head)
    # end if
  # end procedure

  def moveTail(self: <el-type>Snake</el-type>, ) -> None:
    # 3502
    body = self.body # variable definition
    body.removeAt(0)
  # end procedure

  def addToBlocks(self: <el-type>Snake</el-type>, blocks: BlockGraphics) -> None:
    for block in self.body:
      blocks.putBlockNo(block, green)
    # end for
  # end procedure

  def bodyCovers(self: <el-type>Snake</el-type>, sq: int) -> bool:
    return self.body.contains(sq)
  # end function

  def length(self: <el-type>Snake</el-type>, ) -> int:
    return self.body.length()
  # end function

  def toString(self: <el-type>Snake</el-type>, ) -> str:
    return f"a Snake"
  # end function

# end class

main()
