# Python with Elan 2.0.0-beta4

# Use the w,a,s,d keys to change snake's direction

width = 40 # constant

height = 30 # constant

def main() -> None:
  bg = BlockGraphics() # variable definition
  head = 621 # variable definition
  snake = [head - 1, head] # variable definition
  currentDir = "d" # variable definition
  gameOn = True # variable definition
  apple = -1 # variable definition
  while gameOn:
    while (apple == -1) or snake.contains(apple):
      apple = randint(0, width*height) # assignment
    # end while
    updateDisplay(bg, snake, apple) # procedure call
    key = getKey() # variable definition
    if not key.equals("") and "wasd".contains(key):
      currentDir = key # assignment
    # end if
    head = getAdjacentBlock(head, currentDir) # assignment
    if (head == -1) or snake.contains(head):
      gameOn = False # assignment
    else:
      snake.append(head) # procedure call
    # end if
    if head.equals(apple):
      apple = -1 # assignment
    else:
      snake.removeAt(0) # procedure call
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

def getAdjacentBlock(bl: int, dir: str) -> int: # function
  adj = -1 # variable definition
  newCol = bl % width # variable definition
  newRow = divAsInt(bl, width) # variable definition
  if dir.equals("w"):
    newRow = newRow - 1 # assignment
  elif dir.equals("a"): # else if
    newCol = newCol - 1 # assignment
  elif dir.equals("s"): # else if
    newRow = newRow + 1 # assignment
  elif dir.equals("d"): # else if
    newCol = newCol + 1 # assignment
  # end if
  if (newCol >= 0) and (newCol < width) and (newRow >= 0) and (newRow < height):
    adj = newRow*width + newCol # assignment
  # end if
  return adj
# end function

class Test_getAdjacentBlock(unittest.TestCase):
 def test_getAdjacentBlock(self) -> None:
  bl = 617 # variable definition
  self.assertEqual(getAdjacentBlock(bl, "w"), 577)
  self.assertEqual(getAdjacentBlock(bl, "a"), 616)
  self.assertEqual(getAdjacentBlock(bl, "s"), 657)
  self.assertEqual(getAdjacentBlock(bl, "d"), 618)
  # boundary
  self.assertEqual(getAdjacentBlock(20, "w"), -1)
  self.assertEqual(getAdjacentBlock(40, "a"), -1)
  self.assertEqual(getAdjacentBlock(1180, "s"), -1)
  self.assertEqual(getAdjacentBlock(79, "d"), -1)
# end test

main()
