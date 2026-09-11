# Python with Elan 2.0.0-beta4

# Use the w,a,s,d keys to change snake's direction

def main() -> None:
  bg = BlockGraphics() # variable definition
  head = 620 # variable definition
  snake = [head, 619] # variable definition
  currentDir = "d" # variable definition
  gameOn = True # variable definition
  apple = 0 # variable definition
  newApple = True # variable definition
  while gameOn:
    while newApple:
      apple = bg.blockNo(randint(0, 39), randint(0, 29)) # assignment
      if not snake.contains(apple):
        newApple = False # assignment
      # end if
    # end while
    updateDisplay(bg, snake, apple) # procedure call
    key = getKey() # variable definition
    if not key.equals("") and "wasd".contains(key):
      currentDir = key # assignment
    # end if
    head = getAdjacentBlock(head, currentDir, bg) # assignment
    if (head == -1) or snake.contains(head):
      gameOn = False # assignment
    else:
      snake.prepend(head) # procedure call
    # end if
    if head.equals(apple):
      newApple = True # assignment
    else:
      snake.removeAt(snake.length() - 1) # procedure call
    # end if
    sleep_ms(150) # procedure call
  # end while
  print(f"Game Over! Score: {snake.length() - 1}")
# end main

def updateDisplay(bg: BlockGraphics, snake: list[int], apple: int) -> None: # procedure
  bg.colourAll(white) # procedure call
  for bl in snake:
    bg.putBlockNo(bl, green) # procedure call
  # end for
  bg.putBlockNo(apple, red) # procedure call
  displayBlockGraphics(bg) # procedure call
# end procedure

def getAdjacentBlock(bl: int, dir: str, bg: BlockGraphics) -> int: # function
  newCol = bg.col(bl) # variable definition
  newRow = bg.row(bl) # variable definition
  if dir.equals("a"):
    newCol = newCol - 1 # assignment
  elif dir.equals("d"): # else if
    newCol = newCol + 1 # assignment
  elif dir.equals("w"): # else if
    newRow = newRow - 1 # assignment
  elif dir.equals("s"): # else if
    newRow = newRow + 1 # assignment
  # end if
  return bg.blockNo(newCol, newRow)
# end function

class Test_getAdjacentBlock(unittest.TestCase):
 def test_getAdjacentBlock(self) -> None:
  bg = BlockGraphics() # variable definition
  bl = 617 # variable definition
  self.assertEqual(getAdjacentBlock(bl, "w", bg), 577)
  self.assertEqual(getAdjacentBlock(bl, "s", bg), 657)
  self.assertEqual(getAdjacentBlock(bl, "a", bg), 616)
  self.assertEqual(getAdjacentBlock(bl, "d", bg), 618)
  # boundary
  self.assertEqual(getAdjacentBlock(20, "w", bg), -1)
  self.assertEqual(getAdjacentBlock(1180, "s", bg), -1)
  self.assertEqual(getAdjacentBlock(40, "a", bg), -1)
  self.assertEqual(getAdjacentBlock(79, "d", bg), -1)
# end test

main()
